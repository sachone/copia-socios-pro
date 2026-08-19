import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/cuotas-por-sepa-sin-morosidad.json";
import "@/styles/shared/astra-bfdddc8d.css";
import "@/styles/pages/cuotas-por-sepa-sin-morosidad.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular post-template-default single single-post postid-571 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-separate-container ast-two-container ast-no-sidebar astra-4.13.3 ast-blog-single-style-1 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-page-584 ast-normal-title-enabled elementor-default elementor-kit-5";

export const metadata: Metadata = {
  title: "Cuotas por SEPA sin morosidad",
  description: "Gestionar las cuotas de socio es una de esas tareas que parecen sencillas…hasta que llegan los primeros impagos",
  alternates: { canonical: "/cuotas-por-sepa-sin-morosidad/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Cuotas por SEPA sin morosidad",
    description: "Gestionar las cuotas de socio es una de esas tareas que parecen sencillas…hasta que llegan los primeros impagos",
    url: "https://socios.pro/cuotas-por-sepa-sin-morosidad/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2025-10-31T12:21:21+00:00",
    modifiedTime: "2026-06-01T11:20:24+00:00",
    images: [{"url": "/images/2025/10/cuotas_por_SEPA.jpg", "width": 1200, "height": 800, "type": "image/jpeg"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
