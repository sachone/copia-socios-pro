import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/rgpd-asociaciones.json";
import "@/styles/shared/tema-dc171bc6.css";
import "@/styles/pages/rgpd-asociaciones.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular single single-post postid-848 single-format-standard s-custom-logo s-embed-responsive s-tema tema-desktop tema-separate-container tema-two-container tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5";

export const metadata: Metadata = {
  title: "RGPD en asociaciones: guía práctica para datos de socios",
  description: "Checklist y pasos para cumplir RGPD en asociaciones: información, bases legales, seguridad, derechos y gestión ordenada de datos de socios.",
  alternates: { canonical: "/rgpd-asociaciones/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "RGPD en asociaciones: guía práctica para datos de socios",
    description: "Checklist y pasos para cumplir RGPD en asociaciones: información, bases legales, seguridad, derechos y gestión ordenada de datos de socios.",
    url: "https://socios.pro/rgpd-asociaciones/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2026-03-05T13:12:16+00:00",
    modifiedTime: "2026-06-01T11:31:07+00:00",
    images: [{"url": "/images/2026/03/salon-elegante-de-asociacion-exclusiva-con-decoracion-clasica-y-grandes-ventanales.webp", "width": 1376, "height": 768, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
