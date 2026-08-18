import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/errores-contables-mas-frecuentes-en-asociaciones-y-como-evitarlos.json";
import "@/styles/shared/astra-bfdddc8d.css";
import "@/styles/pages/errores-contables-mas-frecuentes-en-asociaciones-y-como-evitarlos.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular post-template-default single single-post postid-646 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-separate-container ast-two-container ast-no-sidebar astra-4.13.3 ast-blog-single-style-1 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-page-584 ast-normal-title-enabled elementor-default elementor-kit-5";

export const metadata: Metadata = {
  title: "Errores contables más frecuentes en asociaciones (y cómo evitarlos)",
  description: "Evita los errores contables más frecuentes en asociaciones pequeñas. Descubre sus consecuencias y cómo corregirlos con una gestión económica más profesional.",
  alternates: { canonical: "/errores-contables-mas-frecuentes-en-asociaciones-y-como-evitarlos/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
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
