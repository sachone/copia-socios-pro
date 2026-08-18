import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/como-gestionar-el-portal-del-socio-guia-socios-hagan-gestiones-solos.json";
import "@/styles/shared/astra-a15e2161.css";
import "@/styles/pages/como-gestionar-el-portal-del-socio-guia-socios-hagan-gestiones-solos.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular post-template-default single single-post postid-845 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-separate-container ast-two-container ast-no-sidebar astra-4.13.3 ast-blog-single-style-1 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-page-584 ast-normal-title-enabled elementor-default elementor-kit-5";

export const metadata: Metadata = {
  title: "Cómo gestionar el portal del socio: guía para tus socios",
  description: "En esta guía te explicamos qué es el portal del socio, qué puede hacer este desde su propio acceso y que ventajas tiene.",
  alternates: { canonical: "/como-gestionar-el-portal-del-socio-guia-socios-hagan-gestiones-solos/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Cómo gestionar el portal del socio: guía para tus socios",
    description: "En esta guía te explicamos qué es el portal del socio, qué puede hacer este desde su propio acceso y que ventajas tiene.",
    url: "https://socios.pro/como-gestionar-el-portal-del-socio-guia-socios-hagan-gestiones-solos/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2026-03-02T15:05:15+00:00",
    modifiedTime: "2026-06-01T11:08:37+00:00",
    images: [{"url": "https://socios.pro/wp-content/uploads/2026/03/guia_portal_socios.webp", "width": 1536, "height": 1024, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
