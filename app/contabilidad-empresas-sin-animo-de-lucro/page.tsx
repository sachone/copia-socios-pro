import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/contabilidad-empresas-sin-animo-de-lucro.json";
import "@/styles/shared/tema-d3458fce.css";
import "@/styles/pages/contabilidad-empresas-sin-animo-de-lucro.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular page s-custom-logo s-embed-responsive s-tema tema-desktop tema-page-builder-template tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5 bl-page";

export const metadata: Metadata = {
  title: "Software entidades sin ánimo de lucro. Contabilidad empresas",
  description: "SOCIOS.PRO ⭐ Programa de gestión para entidades sin ánimo de lucro. Controla tu empresa con nuestra plataforma eficaz",
  alternates: { canonical: "/contabilidad-empresas-sin-animo-de-lucro/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Software entidades sin ánimo de lucro. Contabilidad empresas",
    description: "SOCIOS.PRO ⭐ Programa de gestión para entidades sin ánimo de lucro. Controla tu empresa con nuestra plataforma eficaz",
    url: "https://socios.pro/contabilidad-empresas-sin-animo-de-lucro/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-11-21T14:47:47+00:00",
    images: [{"url": "/images/2025/04/empresas_sin_animo_de_lucro.webp", "width": 512, "height": 512, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
