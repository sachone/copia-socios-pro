import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/socios-pro-gestion.json";
import "@/styles/shared/astra-b0e46906.css";
import "@/styles/pages/socios-pro-gestion.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular page-template-default page page-id-830 wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-page-builder-template ast-no-sidebar astra-4.13.3 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-default elementor-kit-5 elementor-page elementor-page-830";

export const metadata: Metadata = {
  title: "Socios pro Gestión - Socios Pro",
  alternates: { canonical: "/socios-pro-gestion/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Socios pro Gestión - Socios Pro",
    description: "Socios.pro Gestión Toma el control total de tu asociación y olvídate del caos administrativo Solicita una DEMO gratuita ahora! Deja […]",
    url: "https://socios.pro/socios-pro-gestion/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2026-03-11T12:08:41+00:00",
    images: [{"url": "/images/2025/04/socios_pro-removebg-preview.webp", "width": 866, "height": 288, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
