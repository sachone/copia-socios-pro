import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { clientIp, rateLimit } from "@/lib/rate-limit";

/**
 * Recibe los envíos de los formularios de contacto (`.bl-form`, ver
 * `components/BloquesRuntime.tsx`) y los manda por email con Resend.
 *
 * En el original, estos formularios hacían POST a `admin-ajax.php` de
 * WordPress. Aquí no hay WordPress, así que este endpoint ocupa su lugar.
 *
 * Variables de entorno necesarias (ver .env.example): sin ellas, el
 * formulario sigue funcionando en el navegador pero este endpoint responde
 * con un error claro en vez de un email real, para que se note en desarrollo
 * que falta configurarlo — no falla en silencio.
 *
 * Es el único punto del sitio que acepta datos de fuera y que además cuesta
 * dinero (cuota de Resend), así que lleva varias capas de contención: mismo
 * origen, tamaño acotado, límite de tasa por IP y global, y tope de campos.
 * Ver los comentarios de cada bloque.
 */

// Las claves internas de Elementor (`field_27ae107`, ...) no dicen nada en un
// email: se traducen a la etiqueta visible que tenían en el formulario.
const FIELD_LABELS: Record<string, string> = {
  name: "Nombre",
  field_27ae107: "Asociación",
  email: "Email",
  field_af213c6: "Teléfono",
  field_110dd53: "Ciudad",
  field_87e2921: "Plan de interés",
  message: "Comentarios",
  field_b1a68a0: "Acepta publicidad",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Tamaño máximo del cuerpo. El formulario más grande no llega a 2 KB. */
const MAX_BODY_BYTES = 32 * 1024;
/** El formulario más largo tiene 8 campos; 25 deja margen de sobra. */
const MAX_FIELDS = 25;
/** Muy por encima de cualquier mensaje real, pero acota el tamaño del email. */
const MAX_FIELD_LENGTH = 5_000;
/** Longitud del asunto, que lleva texto escrito por quien envía. */
const MAX_SUBJECT_LENGTH = 150;

// Dos ventanas distintas sobre la misma IP: una amplia contra el machaqueo
// (incluidos los intentos que ni llegan a validar) y otra estrecha sobre los
// emails que de verdad salen. Así, equivocarse rellenando el formulario no
// gasta el cupo de envíos, pero un bot tampoco puede vaciar la cuota.
const REQUESTS_PER_IP = { limit: 20, windowMs: 10 * 60 * 1000 };
const SENDS_PER_IP = { limit: 5, windowMs: 60 * 60 * 1000 };
// Techo global: protege la cuota de Resend aunque el abuso venga repartido
// entre muchas IPs. Un formulario de contacto legítimo no se acerca a esto.
const SENDS_GLOBAL = { limit: 100, windowMs: 60 * 60 * 1000 };

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/**
 * Deja el texto en una sola línea y acotado, para lo que va en el asunto.
 * Resend habla JSON sobre HTTPS, así que un salto de línea no inyecta
 * cabeceras como haría en SMTP directo, pero no hay razón para dejar pasar
 * saltos ni caracteres de control a un campo que se muestra tal cual.
 */
function sanitizeHeaderText(value: string, maxLength: number): string {
  const flat = value
    // eslint-disable-next-line no-control-regex
    .replace(/[\x00-\x1f\x7f]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return flat.length > maxLength ? `${flat.slice(0, maxLength - 1)}…` : flat;
}

function tooManyRequests(retryAfter: number) {
  return NextResponse.json(
    {
      ok: false,
      error: "Has hecho demasiados envíos seguidos. Espera unos minutos e inténtalo de nuevo.",
    },
    { status: 429, headers: { "Retry-After": String(retryAfter) } },
  );
}

/**
 * Solo se aceptan envíos desde el propio sitio. Un `<form>` alojado en
 * cualquier otro dominio puede hacer POST aquí sin que el navegador lo impida
 * (multipart es una petición «simple», no dispara comprobación previa CORS);
 * sin sesiones no hay CSRF con privilegios, pero sí serviría para amplificar
 * el spam. Los navegadores mandan `Origin` en todo POST, también del mismo
 * origen, así que su ausencia significa que quien llama no es un navegador.
 */
function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (!host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  if (!apiKey || !to) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "El formulario no tiene backend configurado todavía. " +
          "Añade RESEND_API_KEY y CONTACT_EMAIL_TO en las variables de entorno de Vercel (ver .env.example).",
      },
      { status: 503 },
    );
  }

  if (!isSameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "Origen no permitido." }, { status: 403 });
  }

  // Se mira antes de leer el cuerpo: así una petición enorme se descarta sin
  // llegar a cargarla en memoria.
  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "El formulario enviado es demasiado grande." },
      { status: 413 },
    );
  }

  const ip = clientIp(request.headers);
  const perIp = rateLimit(`req:${ip}`, REQUESTS_PER_IP.limit, REQUESTS_PER_IP.windowMs);
  if (!perIp.ok) return tooManyRequests(perIp.retryAfter);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Formulario inválido." }, { status: 400 });
  }

  // Honeypot: un campo invisible para personas, que los rellenarios rellenan
  // solos. No sustituye a un CAPTCHA, pero para el clon (sin CAPTCHA por
  // ahora, ver README) filtra el spam más básico sin fricción para el usuario.
  if (form.get("website")) {
    return NextResponse.json({ ok: true }); // se finge éxito, sin enviar nada
  }

  const email = String(form.get("campos[email]") || "").trim();
  const name = String(form.get("campos[name]") || "").trim();
  if (!name || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Revisa el nombre y el email: son obligatorios." },
      { status: 400 },
    );
  }

  const formName = sanitizeHeaderText(
    String(form.get("__form_name") || "") || "Formulario de contacto",
    MAX_SUBJECT_LENGTH,
  );

  const rows: string[] = [];
  for (const [key, value] of form.entries()) {
    if (!key.startsWith("campos[") || !key.endsWith("]")) continue;
    const text = String(value);
    if (!text.trim()) continue;
    // Se rechaza en vez de recortar: recortar en silencio le comería texto a
    // quien escribe un mensaje largo sin que se entere de nada.
    if (text.length > MAX_FIELD_LENGTH) {
      return NextResponse.json(
        {
          ok: false,
          error: "Alguno de los campos es demasiado largo. Acorta el mensaje e inténtalo de nuevo.",
        },
        { status: 400 },
      );
    }
    if (rows.length >= MAX_FIELDS) {
      return NextResponse.json({ ok: false, error: "Formulario inválido." }, { status: 400 });
    }
    const field = key.slice("campos[".length, -1);
    rows.push(`<tr><td style="padding:4px 12px 4px 0"><strong>${escapeHtml(FIELD_LABELS[field] || field)}</strong></td><td>${escapeHtml(text)}</td></tr>`);
  }

  if (!rows.length) {
    return NextResponse.json({ ok: false, error: "Formulario vacío." }, { status: 400 });
  }

  // Los cupos de envío se consumen aquí, ya con el formulario validado, para
  // que un error de tecleo no le gaste a nadie su cuota de mensajes reales.
  const sendPerIp = rateLimit(`send:${ip}`, SENDS_PER_IP.limit, SENDS_PER_IP.windowMs);
  if (!sendPerIp.ok) return tooManyRequests(sendPerIp.retryAfter);
  const sendGlobal = rateLimit("send:global", SENDS_GLOBAL.limit, SENDS_GLOBAL.windowMs);
  if (!sendGlobal.ok) {
    console.warn("[api/contact] techo global de envíos alcanzado");
    return tooManyRequests(sendGlobal.retryAfter);
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_EMAIL_FROM || "Web Socios.Pro <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `${formName} — ${sanitizeHeaderText(name, 80)}`,
    html: `<table cellpadding="0" cellspacing="0">${rows.join("")}</table>`,
  });

  if (error) {
    console.error("[api/contact] Resend error:", error);
    return NextResponse.json(
      { ok: false, error: "No se ha podido enviar el mensaje. Inténtalo de nuevo en unos minutos." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
