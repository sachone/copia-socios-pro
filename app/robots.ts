import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", disallow: ["/wp-admin/"], allow: ["/wp-admin/admin-ajax.php"] }],
    sitemap: "https://socios.pro/sitemap.xml",
  };
}
