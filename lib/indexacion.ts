import type { Metadata } from "next";

/**
 * Interruptor único para dejar el sitio fuera de los buscadores mientras se
 * termina.
 *
 * **Cerrado por defecto a propósito**: desplegar sin configurar nada deja el
 * sitio protegido, y no al revés. Para publicarlo, define `SITIO_INDEXABLE=true`
 * en las variables de entorno de Vercel y vuelve a desplegar — no hace falta
 * tocar código.
 *
 * Mientras esté cerrado, se levantan tres barreras, porque cada una cubre lo
 * que a las otras se les escapa:
 *
 *  1. `<meta name="robots" content="noindex, nofollow">` en cada página, vía
 *     `robotsMeta()` (las 50 páginas traen del original su propio `index,
 *     follow`, así que hay que pisarlo pagina a pagina, no desde el layout).
 *  2. La cabecera `X-Robots-Tag` (ver next.config.ts), la única que alcanza a
 *     lo que no es HTML: sitemap.xml, imágenes, PDFs.
 *  3. `Disallow: /` en robots.txt (ver app/robots.ts).
 *
 * Un matiz que conviene tener presente sobre la tercera: `Disallow` impide
 * *rastrear*, no *indexar*. Un buscador que no entra tampoco lee el `noindex`,
 * así que una URL que ya conociera por un enlace externo podría seguir
 * saliendo en resultados, sin descripción. Para una URL de vista previa recién
 * creada y sin enlaces entrantes compensa —corta el rastreo antes de que
 * empiece—, pero si este sitio llegara a estar ya indexado, lo correcto sería
 * quitar el `Disallow` y dejar que rastreen y lean el `noindex`, que es lo que
 * de verdad lo saca del índice.
 */
export const PERMITIR_INDEXACION = process.env.SITIO_INDEXABLE === "true";

/**
 * Devuelve los `robots` que le tocan a una página: los suyos del original
 * cuando el sitio es público, y `noindex, nofollow` mientras no lo sea.
 *
 * Lo usan las 50 `page.tsx` generadas (ver `metadata_block()` en
 * tools/generar.py), de modo que al abrir la indexación cada página recupera
 * sus valores originales sin tener que regenerar nada.
 */
export function robotsMeta(original: Metadata["robots"]): Metadata["robots"] {
  if (PERMITIR_INDEXACION) return original;
  return {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  };
}
