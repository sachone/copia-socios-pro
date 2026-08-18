import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/alta-socios-asociacion.json";
import "@/styles/shared/astra-a15e2161.css";
import "@/styles/pages/alta-socios-asociacion.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular post-template-default single single-post postid-855 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-separate-container ast-two-container ast-no-sidebar astra-4.13.3 ast-blog-single-style-1 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-page-584 ast-normal-title-enabled elementor-default elementor-kit-5";

export const metadata: Metadata = {
  title: "Alta de socios en una asociación: proceso sencillo y efectivo",
  description: "Aprende a crear un proceso de alta de socios claro y rápido: formulario, automatización, cuotas y buenas prácticas para asociaciones.",
  alternates: { canonical: "/alta-socios-asociacion/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Alta de socios en una asociación: proceso sencillo y efectivo",
    description: "Aprende a crear un proceso de alta de socios claro y rápido: formulario, automatización, cuotas y buenas prácticas para asociaciones.",
    url: "https://socios.pro/alta-socios-asociacion/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2026-05-12T09:34:49+00:00",
    images: [{"url": "https://socios.pro/wp-content/uploads/2026/03/proceso-alta-socios-asociacion-mesa-oficina-portatil.webp", "width": 1376, "height": 768, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
