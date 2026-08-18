import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/preparar-asociacion-auditoria-economica.json";
import "@/styles/shared/astra-a15e2161.css";
import "@/styles/pages/preparar-asociacion-auditoria-economica.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular post-template-default single single-post postid-985 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-separate-container ast-two-container ast-no-sidebar astra-4.13.3 ast-blog-single-style-1 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-page-584 ast-normal-title-enabled elementor-default elementor-kit-5";

export const metadata: Metadata = {
  title: "Cómo preparar una asociación para una auditoría económica",
  description: "Descubre cómo preparar tu asociación para una auditoría económica con procesos, documentación y herramientas digitales.",
  alternates: { canonical: "/preparar-asociacion-auditoria-economica/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Cómo preparar una asociación para una auditoría económica",
    description: "Descubre cómo preparar tu asociación para una auditoría económica con procesos, documentación y herramientas digitales.",
    url: "https://socios.pro/preparar-asociacion-auditoria-economica/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2026-07-07T10:00:58+00:00",
    images: [{"url": "https://socios.pro/wp-content/uploads/2026/07/auditoria_economica_asociaciones.webp", "width": 1536, "height": 1024, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
