import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/contabilidad-empresas-sin-animo-de-lucro.json";
import "@/styles/shared/astra-b0e46906.css";
import "@/styles/pages/contabilidad-empresas-sin-animo-de-lucro.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular page-template-default page page-id-160 wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-page-builder-template ast-no-sidebar astra-4.13.3 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-default elementor-kit-5 elementor-page elementor-page-160";

export const metadata: Metadata = {
  title: "Software entidades sin ánimo de lucro. Contabilidad empresas",
  description: "SOCIOS.PRO ⭐ Programa de gestión para entidades sin ánimo de lucro. Controla tu empresa con nuestra plataforma eficaz",
  alternates: { canonical: "/contabilidad-empresas-sin-animo-de-lucro/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Software entidades sin ánimo de lucro. Contabilidad empresas",
    description: "SOCIOS.PRO ⭐ Programa de gestión para entidades sin ánimo de lucro. Controla tu empresa con nuestra plataforma eficaz",
    url: "https://socios.pro/contabilidad-empresas-sin-animo-de-lucro/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-11-21T14:47:47+00:00",
    images: [{"url": "/images/2025/04/empresas_sin_animo_de_lucro.webp", "width": 512, "height": 512, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
