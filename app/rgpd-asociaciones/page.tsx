import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/rgpd-asociaciones.json";
import "@/styles/shared/astra-a15e2161.css";
import "@/styles/pages/rgpd-asociaciones.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular post-template-default single single-post postid-848 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-separate-container ast-two-container ast-no-sidebar astra-4.13.3 ast-blog-single-style-1 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-page-584 ast-normal-title-enabled elementor-default elementor-kit-5";

export const metadata: Metadata = {
  title: "RGPD en asociaciones: guía práctica para datos de socios",
  description: "Checklist y pasos para cumplir RGPD en asociaciones: información, bases legales, seguridad, derechos y gestión ordenada de datos de socios.",
  alternates: { canonical: "/rgpd-asociaciones/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "RGPD en asociaciones: guía práctica para datos de socios",
    description: "Checklist y pasos para cumplir RGPD en asociaciones: información, bases legales, seguridad, derechos y gestión ordenada de datos de socios.",
    url: "https://socios.pro/rgpd-asociaciones/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2026-03-05T13:12:16+00:00",
    modifiedTime: "2026-06-01T11:31:07+00:00",
    images: [{"url": "/images/2026/03/salon-elegante-de-asociacion-exclusiva-con-decoracion-clasica-y-grandes-ventanales.webp", "width": 1376, "height": 768, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
