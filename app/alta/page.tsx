import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/alta.json";
import "@/styles/shared/astra-b0e46906.css";
import "@/styles/pages/alta.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular page-template-default page page-id-93 wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-page-builder-template ast-no-sidebar astra-4.13.3 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-default elementor-kit-5 elementor-page elementor-page-93";

export const metadata: Metadata = {
  title: "Registro en nuestro herramienta",
  description: "SOCIOS.PRO ⭐ ¡Regístrate ahora! Simplifica la gestión contable de tu asociación con nuestra herramienta profesional y accesible",
  alternates: { canonical: "/alta/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Registro en nuestro herramienta",
    description: "SOCIOS.PRO ⭐ ¡Regístrate ahora! Simplifica la gestión contable de tu asociación con nuestra herramienta profesional y accesible",
    url: "https://socios.pro/alta/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-10-21T08:49:48+00:00",
    images: [{"url": "/images/2025/04/registrate.webp", "width": 1350, "height": 1350, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
