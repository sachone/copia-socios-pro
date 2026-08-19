import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/calendario-fiscal-anual-para-asociaciones-sin-animo-de-lucro.json";
import "@/styles/shared/astra-bfdddc8d.css";
import "@/styles/pages/calendario-fiscal-anual-para-asociaciones-sin-animo-de-lucro.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular post-template-default single single-post postid-722 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-separate-container ast-two-container ast-no-sidebar astra-4.13.3 ast-blog-single-style-1 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-page-584 ast-normal-title-enabled elementor-default elementor-kit-5";

export const metadata: Metadata = {
  title: "Calendario fiscal anual para asociaciones sin ánimo de lucro",
  description: "Presentamos un calendario fiscal anual pensado para asociaciones sin ánimo de lucro, para que la junta directiva lo tenga claro",
  alternates: { canonical: "/calendario-fiscal-anual-para-asociaciones-sin-animo-de-lucro/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Calendario fiscal anual para asociaciones sin ánimo de lucro",
    description: "Presentamos un calendario fiscal anual pensado para asociaciones sin ánimo de lucro, para que la junta directiva lo tenga claro",
    url: "https://socios.pro/calendario-fiscal-anual-para-asociaciones-sin-animo-de-lucro/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2025-11-28T11:55:14+00:00",
    modifiedTime: "2026-06-01T11:30:25+00:00",
    images: [{"url": "/images/2025/11/calendario_fiscal_anual.webp", "width": 1024, "height": 1024, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
