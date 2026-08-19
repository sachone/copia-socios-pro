import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/contabilidad-asociaciones-religiosas.json";
import "@/styles/shared/tema-d3458fce.css";
import "@/styles/pages/contabilidad-asociaciones-religiosas.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular page s-custom-logo s-embed-responsive s-tema tema-desktop tema-page-builder-template tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5 bl-page";

export const metadata: Metadata = {
  title: "Software asociación religiosa. Programa contabilidad",
  description: "SOCIOS.PRO ⭐ Programa de gestión y contabilidad diseñado para asociaciones religiosas. Simplifica la gestión de tu comunidad religiosa",
  alternates: { canonical: "/contabilidad-asociaciones-religiosas/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Software asociación religiosa. Programa contabilidad",
    description: "SOCIOS.PRO ⭐ Programa de gestión y contabilidad diseñado para asociaciones religiosas. Simplifica la gestión de tu comunidad religiosa",
    url: "https://socios.pro/contabilidad-asociaciones-religiosas/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-11-11T11:17:27+00:00",
    images: [{"url": "/images/2025/04/asociaciones_religiosas.webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
