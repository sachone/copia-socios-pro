import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/index.json";
import "@/styles/shared/astra-b0e46906.css";
import "@/styles/pages/index.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "home wp-singular page-template-default page page-id-10 wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-page-builder-template ast-no-sidebar astra-4.13.3 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-default elementor-kit-5 elementor-page elementor-page-10";

export const metadata: Metadata = {
  title: "Software gestión asociaciones. Programa de contabilidad",
  description: "SOCIOS.PRO ⭐ Programa de gestión y contabilidad diseñado para asociaciones sin fines de lucro. Gestión fácil y profesional de tu asociación",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Software gestión asociaciones. Programa de contabilidad",
    description: "SOCIOS.PRO ⭐ Programa de gestión y contabilidad diseñado para asociaciones sin fines de lucro. Gestión fácil y profesional de tu asociación",
    url: "https://socios.pro/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "website",
    images: [{"url": "https://socios.pro/wp-content/uploads/2025/04/sin_animo_de_lucro.webp", "width": 900, "height": 600, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
