import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/captar-socios-asociacion.json";
import "@/styles/shared/tema-dc171bc6.css";
import "@/styles/pages/captar-socios-asociacion.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular single single-post postid-852 single-format-standard s-custom-logo s-embed-responsive s-tema tema-desktop tema-separate-container tema-two-container tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5";

export const metadata: Metadata = {
  title: "Cómo captar socios para una asociación: estrategias efectivas",
  description: "Descubre cómo captar socios para una asociación con estrategias digitales, visibilidad online y gestión eficiente de miembros paso a paso.",
  alternates: { canonical: "/captar-socios-asociacion/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Cómo captar socios para una asociación: estrategias efectivas",
    description: "Descubre cómo captar socios para una asociación con estrategias digitales, visibilidad online y gestión eficiente de miembros paso a paso.",
    url: "https://socios.pro/captar-socios-asociacion/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2026-04-08T08:21:11+00:00",
    modifiedTime: "2026-06-01T11:31:38+00:00",
    images: [{"url": "/images/2026/03/bienvenida-nuevos-socios-entrada-asociacion.webp", "width": 1408, "height": 768, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
