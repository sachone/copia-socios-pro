import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/modelos-aeat-para-asociaciones-guia-practica.json";
import "@/styles/shared/astra-4e03e7e2.css";
import "@/styles/pages/modelos-aeat-para-asociaciones-guia-practica.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular post-template post-template-elementor_header_footer single single-post postid-574 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-separate-container ast-two-container ast-no-sidebar astra-4.13.3 ast-blog-single-style-1 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-page-584 ast-normal-title-enabled elementor-default elementor-template-full-width elementor-kit-5 elementor-page elementor-page-574";

export const metadata: Metadata = {
  title: "Modelos AEAT para asociaciones: guía práctica",
  description: "Esta guía te ayudará a entender, sin tecnicismos innecesarios, qué modelos debe presentar tu asociación.",
  alternates: { canonical: "/modelos-aeat-para-asociaciones-guia-practica/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Modelos AEAT para asociaciones: guía práctica",
    description: "Esta guía te ayudará a entender, sin tecnicismos innecesarios, qué modelos debe presentar tu asociación.",
    url: "https://socios.pro/modelos-aeat-para-asociaciones-guia-practica/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2025-10-31T12:24:51+00:00",
    modifiedTime: "2026-06-01T11:24:46+00:00",
    images: [{"url": "/images/2025/10/modelos_AEAT_asociaciones.jpg", "width": 1200, "height": 798, "type": "image/jpeg"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
