import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/quienes-somos.json";
import "@/styles/shared/tema-d3458fce.css";
import "@/styles/pages/quienes-somos.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular page s-custom-logo s-embed-responsive s-tema tema-desktop tema-page-builder-template tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5 bl-page";

export const metadata: Metadata = {
  title: "¿Quiénes somos?",
  description: "SOCIOS.PRO ⭐ Conoce al equipo detrás de Socios.Pro. Expertos en contabilidad para asociaciones y entidades sin ánimo de lucro",
  alternates: { canonical: "/quienes-somos/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "¿Quiénes somos?",
    description: "SOCIOS.PRO ⭐ Conoce al equipo detrás de Socios.Pro. Expertos en contabilidad para asociaciones y entidades sin ánimo de lucro",
    url: "https://socios.pro/quienes-somos/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-10-21T08:46:41+00:00",
    images: [{"url": "/images/2025/04/quienes_somos.webp", "width": 1585, "height": 779, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
