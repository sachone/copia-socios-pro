/**
 * Interruptor único para dejar el sitio fuera de los buscadores mientras se
 * termina.
 *
 * **Para publicarlo, pon esto a `true` y despliega.** Es lo único que hay que
 * tocar: `next.config.ts` lee esta constante y, mientras esté en `false`,
 * añade la cabecera `X-Robots-Tag: noindex, nofollow` a todas las respuestas.
 *
 * Va por cabecera HTTP y no por `<meta name="robots">` a propósito: las 50
 * páginas traen su propio bloque `robots` en el `metadata` (generado desde el
 * original, ver tools/generar.py), así que una etiqueta puesta en el layout
 * quedaría pisada por la de cada página, y no tiene sentido editar a mano 50
 * ficheros que se sobrescriben en cada regeneración. La cabecera se aplica a
 * todo por igual y, cuando dos directivas se contradicen, los buscadores se
 * quedan con la más restrictiva.
 *
 * Ojo con la tentación de resolverlo con `Disallow: /` en robots.txt: eso
 * impide *rastrear*, que no es lo mismo que impedir *indexar*. Un buscador que
 * no puede entrar tampoco puede leer el `noindex`, así que una URL ya conocida
 * puede seguir apareciendo en los resultados (sin descripción) durante mucho
 * tiempo. Por eso se deja el rastreo abierto y se bloquea la indexación.
 */
export const PERMITIR_INDEXACION = false;
