import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/cierre-contable-anual-de-una-asociacion-paso-a-paso.json";
import "@/styles/shared/tema-dc171bc6.css";
import "@/styles/pages/cierre-contable-anual-de-una-asociacion-paso-a-paso.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular single single-post postid-653 single-format-standard s-custom-logo s-embed-responsive s-tema tema-desktop tema-separate-container tema-two-container tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5";

export const metadata: Metadata = {
  title: "Cierre contable anual de una asociación paso a paso",
  description: "Descubre cómo hacer el cierre contable anual de una asociación paso a paso, cumplir con la normativa y presentar unas cuentas claras y transparentes a tus socios.",
  alternates: { canonical: "/cierre-contable-anual-de-una-asociacion-paso-a-paso/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Cierre contable anual de una asociación paso a paso",
    description: "Descubre cómo hacer el cierre contable anual de una asociación paso a paso, cumplir con la normativa y presentar unas cuentas claras y transparentes a tus socios.",
    url: "https://socios.pro/cierre-contable-anual-de-una-asociacion-paso-a-paso/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2026-01-08T09:40:26+00:00",
    modifiedTime: "2026-06-01T11:28:24+00:00",
    images: [{"url": "/images/2025/11/Cierre-contable-de-fin-de-ano-en-la-asociacion.webp", "width": 1536, "height": 1024, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
