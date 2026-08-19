import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/politica-de-privacidad.json";
import "@/styles/shared/astra-b0e46906.css";
import "@/styles/pages/politica-de-privacidad.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "privacy-policy wp-singular page-template-default page page-id-313 wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-page-builder-template ast-no-sidebar astra-4.13.3 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-default elementor-kit-5 elementor-page elementor-page-313";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "SOCIOS PRO. Te detallamos nuestras políticas de privacidad asociadas y aplicadas en nuestro sitio web para cada usuario y sus datos",
  alternates: { canonical: "/politica-de-privacidad/" },
  robots: robotsMeta({
    index: false,
    follow: true,
    googleBot: { index: false, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Política de privacidad",
    description: "SOCIOS PRO. Te detallamos nuestras políticas de privacidad asociadas y aplicadas en nuestro sitio web para cada usuario y sus datos",
    url: "https://socios.pro/politica-de-privacidad/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-10-21T07:35:07+00:00",
    images: [{"url": "/images/2025/04/socios_pro-removebg-preview.webp", "width": 866, "height": 288, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
