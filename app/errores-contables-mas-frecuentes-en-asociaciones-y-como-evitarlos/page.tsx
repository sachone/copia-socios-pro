import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/errores-contables-mas-frecuentes-en-asociaciones-y-como-evitarlos.json";
import "@/styles/shared/tema-1d9dcc8c.css";
import "@/styles/pages/errores-contables-mas-frecuentes-en-asociaciones-y-como-evitarlos.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular single single-post postid-646 single-format-standard s-custom-logo s-embed-responsive s-tema tema-desktop tema-separate-container tema-two-container tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5";

export const metadata: Metadata = {
  title: "Errores contables más frecuentes en asociaciones (y cómo evitarlos)",
  description: "Evita los errores contables más frecuentes en asociaciones pequeñas. Descubre sus consecuencias y cómo corregirlos con una gestión económica más profesional.",
  alternates: { canonical: "/errores-contables-mas-frecuentes-en-asociaciones-y-como-evitarlos/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Errores contables más frecuentes en asociaciones (y cómo evitarlos)",
    description: "Evita los errores contables más frecuentes en asociaciones pequeñas. Descubre sus consecuencias y cómo corregirlos con una gestión económica más profesional.",
    url: "https://socios.pro/errores-contables-mas-frecuentes-en-asociaciones-y-como-evitarlos/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2025-12-04T09:10:06+00:00",
    modifiedTime: "2026-06-01T11:27:08+00:00",
    images: [{"url": "/images/2025/12/revisando-errores-de-contabilidad.webp", "width": 1536, "height": 1024, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
