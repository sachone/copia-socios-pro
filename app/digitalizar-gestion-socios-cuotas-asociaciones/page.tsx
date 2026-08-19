import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/digitalizar-gestion-socios-cuotas-asociaciones.json";
import "@/styles/shared/tema-dc171bc6.css";
import "@/styles/pages/digitalizar-gestion-socios-cuotas-asociaciones.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular single single-post postid-759 single-format-standard s-custom-logo s-embed-responsive s-tema tema-desktop tema-separate-container tema-two-container tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5";

export const metadata: Metadata = {
  title: "Digitalizar la gestión de socios y cuotas en 2026",
  description: "Digitalizar la gestión de socios y cuotas es el paso natural para cualquier asociación que ha crecido",
  alternates: { canonical: "/digitalizar-gestion-socios-cuotas-asociaciones/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Digitalizar la gestión de socios y cuotas en 2026",
    description: "Digitalizar la gestión de socios y cuotas es el paso natural para cualquier asociación que ha crecido",
    url: "https://socios.pro/digitalizar-gestion-socios-cuotas-asociaciones/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2026-01-27T12:58:53+00:00",
    modifiedTime: "2026-06-01T11:18:50+00:00",
    images: [{"url": "/images/2026/01/asociaciones_excel_papel.webp", "width": 1200, "height": 809, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
