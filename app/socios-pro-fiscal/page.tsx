import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/socios-pro-fiscal.json";
import "@/styles/shared/tema-5d6830ce.css";
import "@/styles/pages/socios-pro-fiscal.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular page s-custom-logo s-embed-responsive s-tema tema-desktop tema-page-builder-template tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5 bl-page";

export const metadata: Metadata = {
  title: "PLAN FISCAL - Socios Pro",
  alternates: { canonical: "/socios-pro-fiscal/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "PLAN FISCAL - Socios Pro",
    description: "Socios.pro Fiscal Gestiona toda la contabilidad de tu asociación, así como los modelos de la AEAT, en una sola aplicación […]",
    url: "https://socios.pro/socios-pro-fiscal/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2026-07-08T12:12:46+00:00",
    images: [{"url": "/images/2025/04/socios_pro-removebg-preview.webp", "width": 866, "height": 288, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
