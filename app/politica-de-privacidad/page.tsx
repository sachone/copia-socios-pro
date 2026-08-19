import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/politica-de-privacidad.json";
import "@/styles/shared/tema-d3458fce.css";
import "@/styles/pages/politica-de-privacidad.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "privacy-policy s-singular page s-custom-logo s-embed-responsive s-tema tema-desktop tema-page-builder-template tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5 bl-page";

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
