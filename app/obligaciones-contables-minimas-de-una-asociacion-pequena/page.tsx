import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/obligaciones-contables-minimas-de-una-asociacion-pequena.json";
import "@/styles/shared/tema-1d9dcc8c.css";
import "@/styles/pages/obligaciones-contables-minimas-de-una-asociacion-pequena.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular single single-post postid-644 single-format-standard s-custom-logo s-embed-responsive s-tema tema-desktop tema-separate-container tema-two-container tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5";

export const metadata: Metadata = {
  title: "Obligaciones contables mínimas de una asociación pequeña",
  description: "Descubre las obligaciones contables mínimas de una asociación pequeña y cómo llevar libros y registros al día de forma sencilla y sin errores.",
  alternates: { canonical: "/obligaciones-contables-minimas-de-una-asociacion-pequena/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Obligaciones contables mínimas de una asociación pequeña",
    description: "Descubre las obligaciones contables mínimas de una asociación pequeña y cómo llevar libros y registros al día de forma sencilla y sin errores.",
    url: "https://socios.pro/obligaciones-contables-minimas-de-una-asociacion-pequena/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2025-11-21T15:02:08+00:00",
    modifiedTime: "2026-06-01T11:25:46+00:00",
    images: [{"url": "/images/2025/11/contabilidad-en-equipo-con-ordenador-y-documentos-sobre-la-mesa.webp", "width": 1536, "height": 1024, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
