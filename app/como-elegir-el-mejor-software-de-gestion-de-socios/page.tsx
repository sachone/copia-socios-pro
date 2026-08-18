import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/como-elegir-el-mejor-software-de-gestion-de-socios.json";
import "@/styles/shared/astra-a15e2161.css";
import "@/styles/pages/como-elegir-el-mejor-software-de-gestion-de-socios.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular post-template-default single single-post postid-567 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-separate-container ast-two-container ast-no-sidebar astra-4.13.3 ast-blog-single-style-1 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-page-584 ast-normal-title-enabled elementor-default elementor-kit-5";

export const metadata: Metadata = {
  title: "Cómo elegir el mejor software de gestión de socios",
  description: "En 2025, digitalizar la gestión de socios ya no es una moda, es una cuestión de supervivencia",
  alternates: { canonical: "/como-elegir-el-mejor-software-de-gestion-de-socios/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Cómo elegir el mejor software de gestión de socios",
    description: "En 2025, digitalizar la gestión de socios ya no es una moda, es una cuestión de supervivencia",
    url: "https://socios.pro/como-elegir-el-mejor-software-de-gestion-de-socios/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2025-10-31T12:12:11+00:00",
    modifiedTime: "2026-06-01T11:19:47+00:00",
    images: [{"url": "/images/2025/10/mejor_software_gestion.jpg", "width": 1200, "height": 800, "type": "image/jpeg"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
