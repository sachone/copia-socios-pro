import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/modelos-aeat-para-asociaciones-guia-practica.json";
import "@/styles/shared/tema-de943210.css";
import "@/styles/pages/modelos-aeat-para-asociaciones-guia-practica.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular single single-post postid-574 single-format-standard s-custom-logo s-embed-responsive s-tema tema-desktop tema-separate-container tema-two-container tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-template-full-width bl-kit-5 bl-page";

export const metadata: Metadata = {
  title: "Modelos AEAT para asociaciones: guía práctica",
  description: "Esta guía te ayudará a entender, sin tecnicismos innecesarios, qué modelos debe presentar tu asociación.",
  alternates: { canonical: "/modelos-aeat-para-asociaciones-guia-practica/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Modelos AEAT para asociaciones: guía práctica",
    description: "Esta guía te ayudará a entender, sin tecnicismos innecesarios, qué modelos debe presentar tu asociación.",
    url: "https://socios.pro/modelos-aeat-para-asociaciones-guia-practica/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2025-10-31T12:24:51+00:00",
    modifiedTime: "2026-06-01T11:24:46+00:00",
    images: [{"url": "/images/2025/10/modelos_AEAT_asociaciones.jpg", "width": 1200, "height": 798, "type": "image/jpeg"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
