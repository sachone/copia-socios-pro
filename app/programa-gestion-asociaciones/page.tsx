import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/programa-gestion-asociaciones.json";
import "@/styles/shared/tema-d3458fce.css";
import "@/styles/pages/programa-gestion-asociaciones.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular page s-custom-logo s-embed-responsive s-tema tema-desktop tema-page-builder-template tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5 bl-page";

export const metadata: Metadata = {
  title: "Software gestión asociaciones",
  description: "SOCIOS.PRO ⭐ El mejor software de gestión para asociaciones. Centraliza contabilidad, socios y actividades en una sola plataforma",
  alternates: { canonical: "/programa-gestion-asociaciones/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Software gestión asociaciones",
    description: "SOCIOS.PRO ⭐ El mejor software de gestión para asociaciones. Centraliza contabilidad, socios y actividades en una sola plataforma",
    url: "https://socios.pro/programa-gestion-asociaciones/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-11-07T12:59:51+00:00",
    images: [{"url": "/images/2025/10/modelos_AEAT_asociaciones.jpg", "width": 1200, "height": 798, "type": "image/jpeg"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
