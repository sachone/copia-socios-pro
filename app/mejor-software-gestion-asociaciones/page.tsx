import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/mejor-software-gestion-asociaciones.json";
import "@/styles/shared/astra-a15e2161.css";
import "@/styles/pages/mejor-software-gestion-asociaciones.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular post-template-default single single-post postid-988 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-separate-container ast-two-container ast-no-sidebar astra-4.13.3 ast-blog-single-style-1 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-page-584 ast-normal-title-enabled elementor-default elementor-kit-5";

export const metadata: Metadata = {
  title: "Cómo elegir el mejor software de gestión para asociaciones",
  description: "Descubre cómo elegir el mejor software de gestión para tu asociación y evita los errores más comunes al digitalizar tu entidad.",
  alternates: { canonical: "/mejor-software-gestion-asociaciones/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Cómo elegir el mejor software de gestión para asociaciones",
    description: "Descubre cómo elegir el mejor software de gestión para tu asociación y evita los errores más comunes al digitalizar tu entidad.",
    url: "https://socios.pro/mejor-software-gestion-asociaciones/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2026-07-09T10:00:55+00:00",
    images: [{"url": "/images/2026/07/software_gestion_asociacion.webp", "width": 1536, "height": 1024, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
