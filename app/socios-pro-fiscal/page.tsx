import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/socios-pro-fiscal.json";
import "@/styles/shared/astra-5efbf537.css";
import "@/styles/pages/socios-pro-fiscal.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular page-template-default page page-id-947 wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-page-builder-template ast-no-sidebar astra-4.13.3 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header ast-normal-title-enabled elementor-default elementor-kit-5 elementor-page elementor-page-947";

export const metadata: Metadata = {
  title: "PLAN FISCAL - Socios Pro",
  alternates: { canonical: "/socios-pro-fiscal/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "PLAN FISCAL - Socios Pro",
    description: "Socios.pro Fiscal Gestiona toda la contabilidad de tu asociación, así como los modelos de la AEAT, en una sola aplicación […]",
    url: "https://socios.pro/socios-pro-fiscal/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2026-07-08T12:12:46+00:00",
    images: [{"url": "/images/2025/04/socios_pro-removebg-preview.webp", "width": 866, "height": 288, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
