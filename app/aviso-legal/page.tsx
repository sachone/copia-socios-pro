import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/aviso-legal.json";
import "@/styles/shared/tema-d3458fce.css";
import "@/styles/pages/aviso-legal.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular page s-custom-logo s-embed-responsive s-tema tema-desktop tema-page-builder-template tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5 bl-page";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "SOCIOS PRO. Conoce detalle y como aplicamos la Ley Protección de Datos de Carácter Personal en nuestro sitio web",
  alternates: { canonical: "/aviso-legal/" },
  robots: robotsMeta({
    index: false,
    follow: true,
    googleBot: { index: false, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Aviso legal",
    description: "SOCIOS PRO. Conoce detalle y como aplicamos la Ley Protección de Datos de Carácter Personal en nuestro sitio web",
    url: "https://socios.pro/aviso-legal/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-10-21T07:34:45+00:00",
    images: [{"url": "/images/2025/04/socios_pro-removebg-preview.webp", "width": 866, "height": 288, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
