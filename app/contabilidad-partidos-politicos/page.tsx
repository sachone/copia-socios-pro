import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/contabilidad-partidos-politicos.json";
import "@/styles/shared/astra-b0e46906.css";
import "@/styles/pages/contabilidad-partidos-politicos.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular page-template-default page page-id-146 wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-page-builder-template ast-no-sidebar astra-4.13.3 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-default elementor-kit-5 elementor-page elementor-page-146";

export const metadata: Metadata = {
  title: "Software partido político. Programa contabilidad partido político",
  description: "SOCIOS.PRO ⭐ Software de gestión, contabilidad y facturación para partidos políticos. Soluciones legales y transparentes para gestionar tus recursos",
  alternates: { canonical: "/contabilidad-partidos-politicos/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Software partido político. Programa contabilidad partido político",
    description: "SOCIOS.PRO ⭐ Software de gestión, contabilidad y facturación para partidos políticos. Soluciones legales y transparentes para gestionar tus recursos",
    url: "https://socios.pro/contabilidad-partidos-politicos/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-11-21T13:55:23+00:00",
    images: [{"url": "/images/2025/04/partido_politico.webp", "width": 450, "height": 450, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
