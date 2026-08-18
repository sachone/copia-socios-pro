import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/programa-gestion-asociaciones.json";
import "@/styles/shared/astra-b0e46906.css";
import "@/styles/pages/programa-gestion-asociaciones.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular page-template-default page page-id-592 wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-page-builder-template ast-no-sidebar astra-4.13.3 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-default elementor-kit-5 elementor-page elementor-page-592";

export const metadata: Metadata = {
  title: "Software gestión asociaciones",
  description: "SOCIOS.PRO ⭐ El mejor software de gestión para asociaciones. Centraliza contabilidad, socios y actividades en una sola plataforma",
  alternates: { canonical: "/programa-gestion-asociaciones/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Software gestión asociaciones",
    description: "SOCIOS.PRO ⭐ El mejor software de gestión para asociaciones. Centraliza contabilidad, socios y actividades en una sola plataforma",
    url: "https://socios.pro/programa-gestion-asociaciones/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-11-07T12:59:51+00:00",
    images: [{"url": "https://socios.pro/wp-content/uploads/2025/10/modelos_AEAT_asociaciones.jpg", "width": 1200, "height": 798, "type": "image/jpeg"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
