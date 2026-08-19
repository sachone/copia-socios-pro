import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/contacto.json";
import "@/styles/shared/tema-d3458fce.css";
import "@/styles/pages/contacto.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular page s-custom-logo s-embed-responsive s-tema tema-desktop tema-page-builder-template tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5 bl-page";

export const metadata: Metadata = {
  title: "Contáctanos ya para resolver tus dudas o pedir presupuesto",
  description: "SOCIOS.PRO ⭐ ¡Contáctanos ahora! Resuelve dudas o solicita presupuesto para gestionar la contabilidad de tu asociación",
  alternates: { canonical: "/contacto/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Contáctanos ya para resolver tus dudas o pedir presupuesto",
    description: "SOCIOS.PRO ⭐ ¡Contáctanos ahora! Resuelve dudas o solicita presupuesto para gestionar la contabilidad de tu asociación",
    url: "https://socios.pro/contacto/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2026-07-14T07:39:20+00:00",
    images: [{"url": "/images/2025/04/contacto.webp", "width": 600, "height": 600, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
