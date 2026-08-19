import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/como-preparar-la-contabilidad-de-tu-ong-para-pedir-subvenciones.json";
import "@/styles/shared/tema-dc171bc6.css";
import "@/styles/pages/como-preparar-la-contabilidad-de-tu-ong-para-pedir-subvenciones.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular single single-post postid-651 single-format-standard s-custom-logo s-embed-responsive s-tema tema-desktop tema-separate-container tema-two-container tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5";

export const metadata: Metadata = {
  title: "Cómo preparar la contabilidad de tu ONG para pedir subvenciones",
  description: "Aprende cómo preparar la contabilidad de tu ONG para solicitar y justificar subvenciones con éxito, evitando errores y mejorando la transparencia económica.",
  alternates: { canonical: "/como-preparar-la-contabilidad-de-tu-ong-para-pedir-subvenciones/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Cómo preparar la contabilidad de tu ONG para pedir subvenciones",
    description: "Aprende cómo preparar la contabilidad de tu ONG para solicitar y justificar subvenciones con éxito, evitando errores y mejorando la transparencia económica.",
    url: "https://socios.pro/como-preparar-la-contabilidad-de-tu-ong-para-pedir-subvenciones/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2025-12-27T15:31:16+00:00",
    modifiedTime: "2026-06-01T11:27:54+00:00",
    images: [{"url": "/images/2025/11/Preparar-contabilidad-para-subvenciones-ONG.webp", "width": 1536, "height": 1024, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
