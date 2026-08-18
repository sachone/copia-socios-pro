import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/contabilidad-bandas-musica.json";
import "@/styles/shared/astra-b0e46906.css";
import "@/styles/pages/contabilidad-bandas-musica.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular page-template-default page page-id-438 wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-page-builder-template ast-no-sidebar astra-4.13.3 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-default elementor-kit-5 elementor-page elementor-page-438";

export const metadata: Metadata = {
  title: "Software gestión banda de música. Programa de contabilidad",
  description: "SOCIOS.PRO ⭐ Programa de gestión y contabilidad para bandas de música. Controla ingresos, salidas y subvenciones con transparencia y facilidad",
  alternates: { canonical: "/contabilidad-bandas-musica/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Software gestión banda de música. Programa de contabilidad",
    description: "SOCIOS.PRO ⭐ Programa de gestión y contabilidad para bandas de música. Controla ingresos, salidas y subvenciones con transparencia y facilidad",
    url: "https://socios.pro/contabilidad-bandas-musica/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-11-11T11:17:47+00:00",
    images: [{"url": "/images/2025/06/banda_de_musica.webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
