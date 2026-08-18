import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/guia-comunicacion-interna-asociaciones.json";
import "@/styles/shared/astra-a15e2161.css";
import "@/styles/pages/guia-comunicacion-interna-asociaciones.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular post-template-default single single-post postid-982 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-separate-container ast-two-container ast-no-sidebar astra-4.13.3 ast-blog-single-style-1 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-page-584 ast-normal-title-enabled elementor-default elementor-kit-5";

export const metadata: Metadata = {
  title: "Comunicación interna para asociaciones: guía práctica",
  description: "Aprende a organizar la comunicación interna de tu asociación con un portal del socio, avisos automatizados y menos trabajo manual.",
  alternates: { canonical: "/guia-comunicacion-interna-asociaciones/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Comunicación interna para asociaciones: guía práctica",
    description: "Aprende a organizar la comunicación interna de tu asociación con un portal del socio, avisos automatizados y menos trabajo manual.",
    url: "https://socios.pro/guia-comunicacion-interna-asociaciones/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2026-07-02T13:22:01+00:00",
    images: [{"url": "https://socios.pro/wp-content/uploads/2026/07/comunicacion_interna_asociaciones.webp", "width": 1536, "height": 1024, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
