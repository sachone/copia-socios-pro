import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/contabilidad-ampa.json";
import "@/styles/shared/tema-d3458fce.css";
import "@/styles/pages/contabilidad-ampa.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular page s-custom-logo s-embed-responsive s-tema tema-desktop tema-page-builder-template tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5 bl-page";

export const metadata: Metadata = {
  title: "Software gestión AMPA. Programa contabilidad AMPA",
  description: "SOCIOS.PRO ⭐ Software AMPA. Herramienta de contabilidad para AMPA. Facilita la gestión de la asociación de padres y madres",
  alternates: { canonical: "/contabilidad-ampa/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Software gestión AMPA. Programa contabilidad AMPA",
    description: "SOCIOS.PRO ⭐ Software AMPA. Herramienta de contabilidad para AMPA. Facilita la gestión de la asociación de padres y madres",
    url: "https://socios.pro/contabilidad-ampa/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-11-11T11:15:46+00:00",
    images: [{"url": "/images/2025/06/programa_contabilidad_ampa.webp", "width": 1200, "height": 737, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
