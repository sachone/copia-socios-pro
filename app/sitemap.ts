import type { MetadataRoute } from "next";
import routes from "@/lib/routes.json";

const ORIGIN = "https://socios.pro";

/** Reproduce el sitemap que genera Yoast SEO en el sitio original. */
export default function sitemap(): MetadataRoute.Sitemap {
  return routes
    .filter((r) => r.indexable)
    .map((r) => ({
      url: ORIGIN + r.route,
      lastModified: r.lastmod ? new Date(r.lastmod) : undefined,
      changeFrequency: "monthly" as const,
      priority: r.route === "/" ? 1 : 0.8,
    }));
}
