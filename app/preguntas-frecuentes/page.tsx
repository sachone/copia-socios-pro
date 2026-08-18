import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/preguntas-frecuentes.json";
import "@/styles/shared/astra-b0e46906.css";
import "@/styles/pages/preguntas-frecuentes.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular page-template-default page page-id-213 wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-page-builder-template ast-no-sidebar astra-4.13.3 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-default elementor-kit-5 elementor-page elementor-page-213";

export const metadata: Metadata = {
  title: "Preguntas frecuentes sobre el programa de contabilidad",
  description: "SOCIOS.PRO ⭐ Preguntas habituales y sus respuestas sobre nuestra herramienta de contabilidad para asociaciones sin ánimo de lucro",
  alternates: { canonical: "/preguntas-frecuentes/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Preguntas frecuentes sobre el programa de contabilidad",
    description: "SOCIOS.PRO ⭐ Preguntas habituales y sus respuestas sobre nuestra herramienta de contabilidad para asociaciones sin ánimo de lucro",
    url: "https://socios.pro/preguntas-frecuentes/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-06-18T08:49:29+00:00",
    images: [{"url": "https://socios.pro/wp-content/uploads/2025/06/preguntas_frecuentes_soft_socios-pro.webp", "width": 1200, "height": 737, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
