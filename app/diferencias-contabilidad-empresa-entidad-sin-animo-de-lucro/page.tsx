import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/diferencias-contabilidad-empresa-entidad-sin-animo-de-lucro.json";
import "@/styles/shared/astra-a15e2161.css";
import "@/styles/pages/diferencias-contabilidad-empresa-entidad-sin-animo-de-lucro.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular post-template-default single single-post postid-655 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-separate-container ast-two-container ast-no-sidebar astra-4.13.3 ast-blog-single-style-1 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-page-584 ast-normal-title-enabled elementor-default elementor-kit-5";

export const metadata: Metadata = {
  title: "Diferencias entre la contabilidad de una empresa y de una entidad sin ánimo de lucro",
  description: "La contabilidad de una empresa no es igual que la de una entidad sin ánimo de lucro. Descubre las principales diferencias y cómo gestionarlas correctamente.",
  alternates: { canonical: "/diferencias-contabilidad-empresa-entidad-sin-animo-de-lucro/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Diferencias entre la contabilidad de una empresa y de una entidad sin ánimo de lucro",
    description: "La contabilidad de una empresa no es igual que la de una entidad sin ánimo de lucro. Descubre las principales diferencias y cómo gestionarlas correctamente.",
    url: "https://socios.pro/diferencias-contabilidad-empresa-entidad-sin-animo-de-lucro/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2026-01-29T08:28:11+00:00",
    modifiedTime: "2026-06-01T11:29:03+00:00",
    images: [{"url": "https://socios.pro/wp-content/uploads/2025/11/Contabilidad-de-empresa-vs-entidad-sin-animo-de-lucro.webp", "width": 1536, "height": 1024, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
