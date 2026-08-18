/**
 * URL base del sitio ya desplegado, usada para completar las URLs absolutas
 * que exigen las metaetiquetas Open Graph y el JSON-LD (las imagenes locales
 * se generan como rutas relativas, ver tools/generar.py).
 *
 * Se resuelve en este orden:
 *  1. NEXT_PUBLIC_SITE_URL, si se define (para un dominio propio).
 *  2. VERCEL_PROJECT_PRODUCTION_URL, que Vercel pone sola en producción.
 *  3. VERCEL_URL, para despliegues de preview.
 *  4. localhost, en desarrollo.
 */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercelHost) return `https://${vercelHost}`;
  return "http://localhost:3005";
}

export const SITE_URL = resolveSiteUrl();
