import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/contabilidad-asociaciones-festeras.json";
import "@/styles/shared/tema-d3458fce.css";
import "@/styles/pages/contabilidad-asociaciones-festeras.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular page s-custom-logo s-embed-responsive s-tema tema-desktop tema-page-builder-template tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5 bl-page";

export const metadata: Metadata = {
  title: "Software asociación festera. Programa de contabilidad",
  description: "SOCIOS.PRO ⭐ Software de gestión y contabilidad para asociaciones festeras. Gestiona gastos, cuotas y eventos con eficacia y conforme a la normativa",
  alternates: { canonical: "/contabilidad-asociaciones-festeras/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Software asociación festera. Programa de contabilidad",
    description: "SOCIOS.PRO ⭐ Software de gestión y contabilidad para asociaciones festeras. Gestiona gastos, cuotas y eventos con eficacia y conforme a la normativa",
    url: "https://socios.pro/contabilidad-asociaciones-festeras/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-11-11T11:16:59+00:00",
    images: [{"url": "/images/2025/06/contabilidad_asociaciones_festeras.webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
