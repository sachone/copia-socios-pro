import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/contabilidad-otras-asociaciones.json";
import "@/styles/shared/tema-d3458fce.css";
import "@/styles/pages/contabilidad-otras-asociaciones.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular page s-custom-logo s-embed-responsive s-tema tema-desktop tema-page-builder-template tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5 bl-page";

export const metadata: Metadata = {
  title: "Software para asociaciones culturales, festivas y más",
  description: "SOCIOS.PRO ⭐ Programa de gestión y contabilidad para asociaciones de cualquier tipo: culturales, festivas, de animales, tradicionales…",
  alternates: { canonical: "/contabilidad-otras-asociaciones/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Software para asociaciones culturales, festivas y más",
    description: "SOCIOS.PRO ⭐ Programa de gestión y contabilidad para asociaciones de cualquier tipo: culturales, festivas, de animales, tradicionales…",
    url: "https://socios.pro/contabilidad-otras-asociaciones/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-11-21T13:54:13+00:00",
    images: [{"url": "/images/2025/04/otras_asociaciones.webp", "width": 731, "height": 450, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
