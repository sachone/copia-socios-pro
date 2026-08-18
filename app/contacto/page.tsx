import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/contacto.json";
import "@/styles/shared/astra-b0e46906.css";
import "@/styles/pages/contacto.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular page-template-default page page-id-241 wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-page-builder-template ast-no-sidebar astra-4.13.3 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-default elementor-kit-5 elementor-page elementor-page-241";

export const metadata: Metadata = {
  title: "Contáctanos ya para resolver tus dudas o pedir presupuesto",
  description: "SOCIOS.PRO ⭐ ¡Contáctanos ahora! Resuelve dudas o solicita presupuesto para gestionar la contabilidad de tu asociación",
  alternates: { canonical: "/contacto/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Contáctanos ya para resolver tus dudas o pedir presupuesto",
    description: "SOCIOS.PRO ⭐ ¡Contáctanos ahora! Resuelve dudas o solicita presupuesto para gestionar la contabilidad de tu asociación",
    url: "https://socios.pro/contacto/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2026-07-14T07:39:20+00:00",
    images: [{"url": "https://socios.pro/wp-content/uploads/2025/04/contacto.webp", "width": 600, "height": 600, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
