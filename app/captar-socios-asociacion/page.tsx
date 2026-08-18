import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/captar-socios-asociacion.json";
import "@/styles/shared/astra-a15e2161.css";
import "@/styles/pages/captar-socios-asociacion.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular post-template-default single single-post postid-852 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-separate-container ast-two-container ast-no-sidebar astra-4.13.3 ast-blog-single-style-1 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-page-584 ast-normal-title-enabled elementor-default elementor-kit-5";

export const metadata: Metadata = {
  title: "Cómo captar socios para una asociación: estrategias efectivas",
  description: "Descubre cómo captar socios para una asociación con estrategias digitales, visibilidad online y gestión eficiente de miembros paso a paso.",
  alternates: { canonical: "/captar-socios-asociacion/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Cómo captar socios para una asociación: estrategias efectivas",
    description: "Descubre cómo captar socios para una asociación con estrategias digitales, visibilidad online y gestión eficiente de miembros paso a paso.",
    url: "https://socios.pro/captar-socios-asociacion/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2026-04-08T08:21:11+00:00",
    modifiedTime: "2026-06-01T11:31:38+00:00",
    images: [{"url": "/images/2026/03/bienvenida-nuevos-socios-entrada-asociacion.webp", "width": 1408, "height": 768, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
