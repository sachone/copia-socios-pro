import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/calendario-fiscal-anual-para-asociaciones-sin-animo-de-lucro.json";
import "@/styles/shared/tema-1d9dcc8c.css";
import "@/styles/pages/calendario-fiscal-anual-para-asociaciones-sin-animo-de-lucro.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular single single-post postid-722 single-format-standard s-custom-logo s-embed-responsive s-tema tema-desktop tema-separate-container tema-two-container tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5";

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
