import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/digitalizar-gestion-socios-cuotas-asociaciones.json";
import "@/styles/shared/astra-a15e2161.css";
import "@/styles/pages/digitalizar-gestion-socios-cuotas-asociaciones.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular post-template-default single single-post postid-759 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-separate-container ast-two-container ast-no-sidebar astra-4.13.3 ast-blog-single-style-1 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-page-584 ast-normal-title-enabled elementor-default elementor-kit-5";

export const metadata: Metadata = {
  title: "Digitalizar la gestión de socios y cuotas en 2026",
  description: "Digitalizar la gestión de socios y cuotas es el paso natural para cualquier asociación que ha crecido",
  alternates: { canonical: "/digitalizar-gestion-socios-cuotas-asociaciones/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Digitalizar la gestión de socios y cuotas en 2026",
    description: "Digitalizar la gestión de socios y cuotas es el paso natural para cualquier asociación que ha crecido",
    url: "https://socios.pro/digitalizar-gestion-socios-cuotas-asociaciones/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2026-01-27T12:58:53+00:00",
    modifiedTime: "2026-06-01T11:18:50+00:00",
    images: [{"url": "https://socios.pro/wp-content/uploads/2026/01/asociaciones_excel_papel.webp", "width": 1200, "height": 809, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
