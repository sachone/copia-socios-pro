import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/cierre-contable-anual-de-una-asociacion-paso-a-paso.json";
import "@/styles/shared/astra-a15e2161.css";
import "@/styles/pages/cierre-contable-anual-de-una-asociacion-paso-a-paso.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular post-template-default single single-post postid-653 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-separate-container ast-two-container ast-no-sidebar astra-4.13.3 ast-blog-single-style-1 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-page-584 ast-normal-title-enabled elementor-default elementor-kit-5";

export const metadata: Metadata = {
  title: "Cierre contable anual de una asociación paso a paso",
  description: "Descubre cómo hacer el cierre contable anual de una asociación paso a paso, cumplir con la normativa y presentar unas cuentas claras y transparentes a tus socios.",
  alternates: { canonical: "/cierre-contable-anual-de-una-asociacion-paso-a-paso/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Cierre contable anual de una asociación paso a paso",
    description: "Descubre cómo hacer el cierre contable anual de una asociación paso a paso, cumplir con la normativa y presentar unas cuentas claras y transparentes a tus socios.",
    url: "https://socios.pro/cierre-contable-anual-de-una-asociacion-paso-a-paso/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2026-01-08T09:40:26+00:00",
    modifiedTime: "2026-06-01T11:28:24+00:00",
    images: [{"url": "https://socios.pro/wp-content/uploads/2025/11/Cierre-contable-de-fin-de-ano-en-la-asociacion.webp", "width": 1536, "height": 1024, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
