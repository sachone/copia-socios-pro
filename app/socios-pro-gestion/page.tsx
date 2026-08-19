import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/socios-pro-gestion.json";
import "@/styles/shared/tema-d3458fce.css";
import "@/styles/pages/socios-pro-gestion.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular page s-custom-logo s-embed-responsive s-tema tema-desktop tema-page-builder-template tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5 bl-page";

export const metadata: Metadata = {
  title: "Socios pro Gestión - Socios Pro",
  alternates: { canonical: "/socios-pro-gestion/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Socios pro Gestión - Socios Pro",
    description: "Socios.pro Gestión Toma el control total de tu asociación y olvídate del caos administrativo Solicita una DEMO gratuita ahora! Deja […]",
    url: "https://socios.pro/socios-pro-gestion/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2026-03-11T12:08:41+00:00",
    images: [{"url": "/images/2025/04/socios_pro-removebg-preview.webp", "width": 866, "height": 288, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
