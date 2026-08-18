import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/contabilidad-asociaciones-religiosas.json";
import "@/styles/shared/astra-b0e46906.css";
import "@/styles/pages/contabilidad-asociaciones-religiosas.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular page-template-default page page-id-174 wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-page-builder-template ast-no-sidebar astra-4.13.3 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-default elementor-kit-5 elementor-page elementor-page-174";

export const metadata: Metadata = {
  title: "Software asociación religiosa. Programa contabilidad",
  description: "SOCIOS.PRO ⭐ Programa de gestión y contabilidad diseñado para asociaciones religiosas. Simplifica la gestión de tu comunidad religiosa",
  alternates: { canonical: "/contabilidad-asociaciones-religiosas/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Software asociación religiosa. Programa contabilidad",
    description: "SOCIOS.PRO ⭐ Programa de gestión y contabilidad diseñado para asociaciones religiosas. Simplifica la gestión de tu comunidad religiosa",
    url: "https://socios.pro/contabilidad-asociaciones-religiosas/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-11-11T11:17:27+00:00",
    images: [{"url": "https://socios.pro/wp-content/uploads/2025/04/asociaciones_religiosas.webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
