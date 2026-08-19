import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/planes-y-precios.json";
import "@/styles/shared/tema-d3458fce.css";
import "@/styles/pages/planes-y-precios.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular page s-custom-logo s-embed-responsive s-tema tema-desktop tema-page-builder-template tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5 bl-page";

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
