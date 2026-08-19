import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/contabilidad-fundaciones.json";
import "@/styles/shared/astra-b0e46906.css";
import "@/styles/pages/contabilidad-fundaciones.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular page-template-default page page-id-132 wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-page-builder-template ast-no-sidebar astra-4.13.3 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-default elementor-kit-5 elementor-page elementor-page-132";

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
