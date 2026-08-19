import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/como-automatizar-cuotas-socios-y-donaciones.json";
import "@/styles/shared/astra-bfdddc8d.css";
import "@/styles/pages/como-automatizar-cuotas-socios-y-donaciones.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular post-template-default single single-post postid-657 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-separate-container ast-two-container ast-no-sidebar astra-4.13.3 ast-blog-single-style-1 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-page-584 ast-normal-title-enabled elementor-default elementor-kit-5";

export const metadata: Metadata = {
  title: "Cómo automatizar las cuotas de socios y donaciones sin morir en el intento",
  description: "Automatiza las cuotas de socios y donaciones de tu asociación para reducir la morosidad, ahorrar tiempo al tesorero y mantener una contabilidad siempre al día.",
  alternates: { canonical: "/como-automatizar-cuotas-socios-y-donaciones/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Cómo automatizar las cuotas de socios y donaciones sin morir en el intento",
    description: "Automatiza las cuotas de socios y donaciones de tu asociación para reducir la morosidad, ahorrar tiempo al tesorero y mantener una contabilidad siempre al día.",
    url: "https://socios.pro/como-automatizar-cuotas-socios-y-donaciones/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2026-02-12T08:33:45+00:00",
    modifiedTime: "2026-06-01T11:29:44+00:00",
    images: [{"url": "/images/2025/11/Automatizacion-de-cuotas-y-donaciones-en-una-asociacion.webp", "width": 1536, "height": 1024, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
