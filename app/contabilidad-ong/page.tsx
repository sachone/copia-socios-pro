import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/contabilidad-ong.json";
import "@/styles/shared/astra-b0e46906.css";
import "@/styles/pages/contabilidad-ong.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular page-template-default page page-id-139 wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-page-builder-template ast-no-sidebar astra-4.13.3 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-default elementor-kit-5 elementor-page elementor-page-139";

export const metadata: Metadata = {
  title: "Programa gestión ONG. Programa contabilidad ONG",
  description: "SOCIOS.PRO ⭐ Software ONG de gestión y contabilidad. Gestiona de forma sencilla una Organización no Gubernamental optimizando recursos y tiempo",
  alternates: { canonical: "/contabilidad-ong/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: "Programa gestión ONG. Programa contabilidad ONG",
    description: "SOCIOS.PRO ⭐ Software ONG de gestión y contabilidad. Gestiona de forma sencilla una Organización no Gubernamental optimizando recursos y tiempo",
    url: "https://socios.pro/contabilidad-ong/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-11-11T11:19:32+00:00",
    images: [{"url": "/images/2025/04/ong-1.webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
