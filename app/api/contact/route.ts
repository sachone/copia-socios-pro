import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Recibe los envíos de los formularios de contacto (`.elementor-form`, ver
 * `components/ElementorRuntime.tsx`) y los manda por email con Resend.
 *
 * En el original, estos formularios hacían POST a `admin-ajax.php` de
 * WordPress. Aquí no hay WordPress, así que este endpoint ocupa su lugar.
 *
 * Variables de entorno necesarias (ver .env.example): sin ellas, el
 * formulario sigue funcionando en el navegador pero este endpoint responde
 * con un error claro en vez de un email real, para que se note en desarrollo
 * que falta configurarlo — no falla en silencio.
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

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
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

  const email = String(form.get("form_fields[email]") || "").trim();
  const name = String(form.get("form_fields[name]") || "").trim();
  if (!name || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Revisa el nombre y el email: son obligatorios." },
      { status: 400 },
    );
  }

  const formName = String(form.get("__form_name") || "Formulario de contacto");
  const rows: string[] = [];
  for (const [key, value] of form.entries()) {
    if (!key.startsWith("form_fields[") || !String(value).trim()) continue;
    const field = key.slice("form_fields[".length, -1);
    rows.push(`<tr><td style="padding:4px 12px 4px 0"><strong>${escapeHtml(FIELD_LABELS[field] || field)}</strong></td><td>${escapeHtml(String(value))}</td></tr>`);
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_EMAIL_FROM || "Web Socios.Pro <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `${formName} — ${name}`,
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
