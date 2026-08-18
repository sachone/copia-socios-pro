import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/contabilidad-otras-asociaciones.json";
import "@/styles/shared/astra-b0e46906.css";
import "@/styles/pages/contabilidad-otras-asociaciones.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular page-template-default page page-id-181 wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-page-builder-template ast-no-sidebar astra-4.13.3 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-default elementor-kit-5 elementor-page elementor-page-181";

export const metadata: Metadata = {
  title: "Software para asociaciones culturales, festivas y más",
  description: "SOCIOS.PRO ⭐ Programa de gestión y contabilidad para asociaciones de cualquier tipo: culturales, festivas, de animales, tradicionales…",
  alternates: { canonical: "/contabilidad-otras-asociaciones/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Software para asociaciones culturales, festivas y más",
    description: "SOCIOS.PRO ⭐ Programa de gestión y contabilidad para asociaciones de cualquier tipo: culturales, festivas, de animales, tradicionales…",
    url: "https://socios.pro/contabilidad-otras-asociaciones/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-11-21T13:54:13+00:00",
    images: [{"url": "/images/2025/04/otras_asociaciones.webp", "width": 731, "height": 450, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
