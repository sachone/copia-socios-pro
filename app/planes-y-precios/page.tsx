import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/planes-y-precios.json";
import "@/styles/shared/astra-b0e46906.css";
import "@/styles/pages/planes-y-precios.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular page-template-default page page-id-775 wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-page-builder-template ast-no-sidebar astra-4.13.3 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-default elementor-kit-5 elementor-page elementor-page-775";

export const metadata: Metadata = {
  title: "Planes y precios",
  description: "Gestiona tu asociación! Socios.pro Gestión 19,95 €/mes La solución profesional esencial para tu asociación. Gestión integral de socios Facturas de",
  alternates: { canonical: "/planes-y-precios/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Planes y precios",
    description: "Gestiona tu asociación! Socios.pro Gestión 19,95 €/mes La solución profesional esencial para tu asociación. Gestión integral de socios Facturas de",
    url: "https://socios.pro/planes-y-precios/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2026-06-26T09:10:59+00:00",
    images: [{"url": "/images/2025/04/precio_sociospro.webp", "width": 1024, "height": 1024, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} scripts={["/widgets/planes-y-precios.js"]} />;
}
