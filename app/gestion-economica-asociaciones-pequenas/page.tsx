import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/gestion-economica-asociaciones-pequenas.json";
import "@/styles/shared/astra-a15e2161.css";
import "@/styles/pages/gestion-economica-asociaciones-pequenas.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular post-template-default single single-post postid-1002 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-separate-container ast-two-container ast-no-sidebar astra-4.13.3 ast-blog-single-style-1 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-page-584 ast-normal-title-enabled elementor-default elementor-kit-5";

export const metadata: Metadata = {
  title: "Gestión económica para asociaciones | Profesionalízala fácil",
  description: "Descubre cómo profesionalizar la gestión económica de tu asociación sin crear un departamento financiero con Socios.pro.",
  alternates: { canonical: "/gestion-economica-asociaciones-pequenas/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Gestión económica para asociaciones | Profesionalízala fácil",
    description: "Descubre cómo profesionalizar la gestión económica de tu asociación sin crear un departamento financiero con Socios.pro.",
    url: "https://socios.pro/gestion-economica-asociaciones-pequenas/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2026-07-23T14:00:20+00:00",
    images: [{"url": "https://socios.pro/wp-content/uploads/2026/07/profesionalizar_gestion_economica.webp", "width": 1536, "height": 1024, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
