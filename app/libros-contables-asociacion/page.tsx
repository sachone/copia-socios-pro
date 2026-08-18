import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/libros-contables-asociacion.json";
import "@/styles/shared/astra-b0e46906.css";
import "@/styles/pages/libros-contables-asociacion.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular page-template-default page page-id-231 wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-page-builder-template ast-no-sidebar astra-4.13.3 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-default elementor-kit-5 elementor-page elementor-page-231";

export const metadata: Metadata = {
  title: "Libros contables asociaciones sin fines de lucro",
  description: "SOCIOS.PRO ⭐ Gestión de libros contables para asociaciones sin ánimo de lucro. Organiza tus registros financieros de forma eficiente",
  alternates: { canonical: "/libros-contables-asociacion/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Libros contables asociaciones sin fines de lucro",
    description: "SOCIOS.PRO ⭐ Gestión de libros contables para asociaciones sin ánimo de lucro. Organiza tus registros financieros de forma eficiente",
    url: "https://socios.pro/libros-contables-asociacion/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-04-08T09:57:10+00:00",
    images: [{"url": "https://socios.pro/wp-content/uploads/2025/04/libros_Contables.webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
