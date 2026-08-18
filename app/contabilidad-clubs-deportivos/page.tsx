import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/contabilidad-clubs-deportivos.json";
import "@/styles/shared/astra-b0e46906.css";
import "@/styles/pages/contabilidad-clubs-deportivos.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular page-template-default page page-id-167 wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-page-builder-template ast-no-sidebar astra-4.13.3 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-default elementor-kit-5 elementor-page elementor-page-167";

export const metadata: Metadata = {
  title: "Software club deportivo. Programa contabilidad club deportivo",
  description: "SOCIOS.PRO ⭐ Software de gestión para club deportivo. Organiza tu club con soluciones fáciles y seguras",
  alternates: { canonical: "/contabilidad-clubs-deportivos/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Software club deportivo. Programa contabilidad club deportivo",
    description: "SOCIOS.PRO ⭐ Software de gestión para club deportivo. Organiza tu club con soluciones fáciles y seguras",
    url: "https://socios.pro/contabilidad-clubs-deportivos/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-11-21T14:47:00+00:00",
    images: [{"url": "https://socios.pro/wp-content/uploads/2025/04/asociacion_deportivas.webp", "width": 600, "height": 600, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
