import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/obligaciones-contables-minimas-de-una-asociacion-pequena.json";
import "@/styles/shared/astra-bfdddc8d.css";
import "@/styles/pages/obligaciones-contables-minimas-de-una-asociacion-pequena.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular post-template-default single single-post postid-644 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-separate-container ast-two-container ast-no-sidebar astra-4.13.3 ast-blog-single-style-1 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-page-584 ast-normal-title-enabled elementor-default elementor-kit-5";

export const metadata: Metadata = {
  title: "Obligaciones contables mínimas de una asociación pequeña",
  description: "Descubre las obligaciones contables mínimas de una asociación pequeña y cómo llevar libros y registros al día de forma sencilla y sin errores.",
  alternates: { canonical: "/obligaciones-contables-minimas-de-una-asociacion-pequena/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Obligaciones contables mínimas de una asociación pequeña",
    description: "Descubre las obligaciones contables mínimas de una asociación pequeña y cómo llevar libros y registros al día de forma sencilla y sin errores.",
    url: "https://socios.pro/obligaciones-contables-minimas-de-una-asociacion-pequena/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2025-11-21T15:02:08+00:00",
    modifiedTime: "2026-06-01T11:25:46+00:00",
    images: [{"url": "https://socios.pro/wp-content/uploads/2025/11/contabilidad-en-equipo-con-ordenador-y-documentos-sobre-la-mesa.webp", "width": 1536, "height": 1024, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
