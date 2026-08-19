import type { MetadataRoute } from "next";
import { PERMITIR_INDEXACION } from "@/lib/indexacion";
import { SITE_URL } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  // Mientras el sitio no sea publico: nada de rastreo y, sobre todo, ningun
  // `sitemap`, que seria justo el mapa para encontrarlo todo. Las otras dos
  // barreras (meta robots y cabecera X-Robots-Tag) estan en lib/indexacion.ts.
  if (!PERMITIR_INDEXACION) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        // `/api/` no tiene nada que indexar y es el unico punto que acepta
        // datos: fuera del rastreo aunque el resto del sitio ya sea publico.
        disallow: ["/wp-admin/", "/api/"],
        allow: ["/wp-admin/admin-ajax.php"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
