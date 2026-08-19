import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/gestion-economica-asociaciones-pequenas.json";
import "@/styles/shared/tema-dc171bc6.css";
import "@/styles/pages/gestion-economica-asociaciones-pequenas.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular single single-post postid-1002 single-format-standard s-custom-logo s-embed-responsive s-tema tema-desktop tema-separate-container tema-two-container tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5";

export const metadata: Metadata = {
  title: "Gestión económica para asociaciones | Profesionalízala fácil",
  description: "Descubre cómo profesionalizar la gestión económica de tu asociación sin crear un departamento financiero con Socios.pro.",
  alternates: { canonical: "/gestion-economica-asociaciones-pequenas/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Gestión económica para asociaciones | Profesionalízala fácil",
    description: "Descubre cómo profesionalizar la gestión económica de tu asociación sin crear un departamento financiero con Socios.pro.",
    url: "https://socios.pro/gestion-economica-asociaciones-pequenas/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2026-07-23T14:00:20+00:00",
    images: [{"url": "/images/2026/07/profesionalizar_gestion_economica.webp", "width": 1536, "height": 1024, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
