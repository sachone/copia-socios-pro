import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/plan-contable-fundaciones.json";
import "@/styles/shared/tema-d3458fce.css";
import "@/styles/pages/plan-contable-fundaciones.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular page s-custom-logo s-embed-responsive s-tema tema-desktop tema-page-builder-template tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5 bl-page";

export const metadata: Metadata = {
  title: "Plan contabilidad asociaciones sin ánimo de lucro",
  description: "SOCIOS.PRO ⭐ Plan de contabilidad adaptado a asociaciones sin ánimo de lucro. Gestiona tus finanzas con claridad y cumplimiento legal",
  alternates: { canonical: "/plan-contable-fundaciones/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Plan contabilidad asociaciones sin ánimo de lucro",
    description: "SOCIOS.PRO ⭐ Plan de contabilidad adaptado a asociaciones sin ánimo de lucro. Gestiona tus finanzas con claridad y cumplimiento legal",
    url: "https://socios.pro/plan-contable-fundaciones/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2026-06-26T11:45:01+00:00",
    images: [{"url": "/images/2025/04/plan_contabilida.webp", "width": 1011, "height": 602, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
