/**
 * Limitador de tasa en memoria, sin dependencias ni servicios externos.
 *
 * Alcance real, para que quede claro: en Vercel cada instancia de la función
 * tiene su propia memoria, así que el límite es *por instancia*, no global de
 * verdad. Eso frena en seco el abuso trivial (un script machacando el
 * formulario desde una IP) pero no un ataque repartido entre muchas IPs con
 * suficiente tráfico como para levantar varias instancias. Si algún día hace
 * falta esa garantía, el cambio es sustituir este módulo por Vercel KV o
 * Upstash Redis manteniendo la misma firma.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

// Tope de entradas vivas: sin esto, quien rote de IP haría crecer el Map sin
// límite hasta agotar la memoria de la instancia.
const MAX_BUCKETS = 10_000;

function purgeExpired(now: number): void {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
  // Si ni aun así baja (todas vigentes), se descarta todo: perder el estado
  // del limitador es preferible a quedarse sin memoria.
  if (buckets.size > MAX_BUCKETS) buckets.clear();
}

export type RateLimitResult = {
  ok: boolean;
  /** Segundos que faltan para que la ventana se reinicie (0 si `ok`). */
  retryAfter: number;
};

/**
 * Consume una unidad de la ventana de `key`. Devuelve `ok: false` cuando ya
 * se han gastado `limit` peticiones dentro de `windowMs`.
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  if (buckets.size > MAX_BUCKETS) purgeExpired(now);

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  if (bucket.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { ok: true, retryAfter: 0 };
}

/**
 * IP del cliente detrás del proxy de Vercel.
 *
 * `x-vercel-forwarded-for` la escribe Vercel y no se puede falsear desde
 * fuera; `x-forwarded-for` sí es manipulable si el sitio se despliega en otro
 * sitio sin proxy delante, por eso va la última y solo se toma el primer
 * salto. Si no hay ninguna, todo el tráfico anónimo comparte un mismo cubo:
 * más restrictivo, nunca más permisivo.
 */
export function clientIp(headers: Headers): string {
  const vercel = headers.get("x-vercel-forwarded-for");
  if (vercel) return vercel.split(",")[0].trim();
  const real = headers.get("x-real-ip");
  if (real) return real.trim();
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "desconocida";
}
