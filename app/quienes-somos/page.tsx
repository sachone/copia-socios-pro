import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/quienes-somos.json";
import "@/styles/shared/astra-b0e46906.css";
import "@/styles/pages/quienes-somos.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular page-template-default page page-id-86 wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-page-builder-template ast-no-sidebar astra-4.13.3 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-default elementor-kit-5 elementor-page elementor-page-86";

export const metadata: Metadata = {
  title: "¿Quiénes somos?",
  description: "SOCIOS.PRO ⭐ Conoce al equipo detrás de Socios.Pro. Expertos en contabilidad para asociaciones y entidades sin ánimo de lucro",
  alternates: { canonical: "/quienes-somos/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "¿Quiénes somos?",
    description: "SOCIOS.PRO ⭐ Conoce al equipo detrás de Socios.Pro. Expertos en contabilidad para asociaciones y entidades sin ánimo de lucro",
    url: "https://socios.pro/quienes-somos/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-10-21T08:46:41+00:00",
    images: [{"url": "https://socios.pro/wp-content/uploads/2025/04/quienes_somos.webp", "width": 1585, "height": 779, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
