import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/contabilidad-fundaciones.json";
import "@/styles/shared/tema-d3458fce.css";
import "@/styles/pages/contabilidad-fundaciones.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular page s-custom-logo s-embed-responsive s-tema tema-desktop tema-page-builder-template tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5 bl-page";

export const metadata: Metadata = {
  title: "Software fundaciones. Contabilidad fundación sin ánimo de lucro",
  description: "SOCIOS.PRO ⭐ Programa de gestión y contabilidad para fundaciones sin ánimo de lucro. Gestión eficiente y cumplimiento con la normativa vigente",
  alternates: { canonical: "/contabilidad-fundaciones/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Software fundaciones. Contabilidad fundación sin ánimo de lucro",
    description: "SOCIOS.PRO ⭐ Programa de gestión y contabilidad para fundaciones sin ánimo de lucro. Gestión eficiente y cumplimiento con la normativa vigente",
    url: "https://socios.pro/contabilidad-fundaciones/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-12-04T11:45:10+00:00",
    images: [{"url": "/images/2025/04/contabilidad_sin_animo_de_lucro.webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
