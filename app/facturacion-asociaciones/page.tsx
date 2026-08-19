import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/facturacion-asociaciones.json";
import "@/styles/shared/astra-b0e46906.css";
import "@/styles/pages/facturacion-asociaciones.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular page-template-default page page-id-109 wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-page-builder-template ast-no-sidebar astra-4.13.3 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-default elementor-kit-5 elementor-page elementor-page-109";

export const metadata: Metadata = {
  title: "Facturación asociaciones sin ánimo de lucro y fundaciones",
  description: "SOCIOS.PRO ⭐ Soluciones completas para la facturación de asociaciones y fundaciones sin ánimo de lucro. Eficiencia y legalidad garantizadas",
  alternates: { canonical: "/facturacion-asociaciones/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Facturación asociaciones sin ánimo de lucro y fundaciones",
    description: "SOCIOS.PRO ⭐ Soluciones completas para la facturación de asociaciones y fundaciones sin ánimo de lucro. Eficiencia y legalidad garantizadas",
    url: "https://socios.pro/facturacion-asociaciones/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-11-21T14:49:40+00:00",
    images: [{"url": "/images/2025/04/facturacion.webp", "width": 1200, "height": 974, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
