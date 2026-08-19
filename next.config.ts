import type { NextConfig } from "next";
import { PERMITIR_INDEXACION } from "./lib/indexacion";

const isProd = process.env.NODE_ENV === "production";

/**
 * Política de seguridad de contenido.
 *
 * Todo el cuerpo de las 50 páginas se inyecta con `dangerouslySetInnerHTML`
 * (ver components/PageBody.tsx), así que esta cabecera es la red de seguridad
 * si alguna regeneración desde el original trajera algo que no debería.
 *
 * Se comprobó, antes de fijarla, que el HTML generado no carga ni un solo
 * subrecurso externo: las únicas URLs de fuera son `<a href>` de navegación
 * (LinkedIn, YouTube, Instagram...) y las de `content/jsonld.json`, que no se
 * descargan. Imágenes, tipografías, CSS y JS son todos locales.
 *
 * Dos concesiones, ambas obligadas por el marcado de Elementor:
 *  - `style-src 'unsafe-inline'`: el contenido trae 16 atributos `style=` y
 *    10 bloques `<style>`.
 *  - `script-src 'unsafe-inline'`: hay dos scripts en línea propios (las
 *    clases de <body> en PageBody.tsx y el JSON-LD en layout.tsx). Un nonce
 *    obligaría a renderizar cada página en cada petición, que es justo lo que
 *    este clon evita. Aun con la concesión, la cabecera sigue bloqueando lo
 *    importante: cargar script de un dominio ajeno, <object>/<embed>, mover
 *    el <base>, enviar formularios fuera y que nos metan en un iframe.
 *
 * `data:` en img-src lo piden 4 fondos SVG del CSS del tema.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  // En desarrollo, el recargado en caliente de Next.js usa eval() y un websocket.
  `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"}`,
  `connect-src 'self'${isProd ? "" : " ws:"}`,
  ...(isProd ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Impide que el navegador adivine el tipo de un fichero y lo ejecute como otra cosa.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // No filtra la ruta completa como referer al salir a un dominio de terceros.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Equivalente antiguo de frame-ancestors, para navegadores sin CSP nivel 2.
  { key: "X-Frame-Options", value: "DENY" },
  // El sitio no usa ninguna de estas capacidades: se renuncia a ellas explícitamente.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  // Solo en producción: en local se sirve por http y el navegador la ignoraría.
  // Sin `preload`, que es un compromiso difícil de revertir y hay que solicitar aparte.
  ...(isProd
    ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }]
    : []),
  // Mientras el sitio no esté terminado, fuera de los buscadores.
  // Para publicarlo: pon PERMITIR_INDEXACION a true en lib/indexacion.ts.
  ...(PERMITIR_INDEXACION
    ? []
    : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
];

const nextConfig: NextConfig = {
  // El sitio original sirve todas sus URLs con barra final (https://socios.pro/que-es/)
  trailingSlash: true,
  async redirects() {
    return [
      // El original responde 301 en esta URL antigua.
      { source: "/precio", destination: "/planes-y-precios/", statusCode: 301 },
    ];
  },
  async headers() {
    return [
      {
        // Se aplican a todo el sitio, incluida /api/.
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // El nombre de cada fichero lo genera Google Fonts a partir de su
        // contenido: si la tipografía cambiara, cambiaría también el nombre.
        // Se puede cachear para siempre sin riesgo de servir una versión vieja.
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        // Aquí el nombre de fichero es el slug de la página (no un hash de
        // contenido), así que una regeneración del sitio SÍ puede cambiar lo
        // que hay dentro sin cambiar la URL. Cache corta con revalidación en
        // segundo plano, en vez de "immutable".
        source: "/widgets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" }],
      },
      {
        // Igual que /widgets/: el nombre lo pone WordPress (no es un hash de
        // contenido), así que si el original cambia una imagen sin renombrarla
        // conviene revalidar en vez de fiarse para siempre.
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
