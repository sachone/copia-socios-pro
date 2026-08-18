import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/plan-contable-fundaciones.json";
import "@/styles/shared/astra-b0e46906.css";
import "@/styles/pages/plan-contable-fundaciones.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular page-template-default page page-id-122 wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-page-builder-template ast-no-sidebar astra-4.13.3 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-default elementor-kit-5 elementor-page elementor-page-122";

export const metadata: Metadata = {
  title: "Plan contabilidad asociaciones sin ánimo de lucro",
  description: "SOCIOS.PRO ⭐ Plan de contabilidad adaptado a asociaciones sin ánimo de lucro. Gestiona tus finanzas con claridad y cumplimiento legal",
  alternates: { canonical: "/plan-contable-fundaciones/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Plan contabilidad asociaciones sin ánimo de lucro",
    description: "SOCIOS.PRO ⭐ Plan de contabilidad adaptado a asociaciones sin ánimo de lucro. Gestiona tus finanzas con claridad y cumplimiento legal",
    url: "https://socios.pro/plan-contable-fundaciones/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2026-06-26T11:45:01+00:00",
    images: [{"url": "/images/2025/04/plan_contabilida.webp", "width": 1011, "height": 602, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
