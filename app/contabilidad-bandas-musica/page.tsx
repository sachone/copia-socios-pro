import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/contabilidad-bandas-musica.json";
import "@/styles/shared/tema-d3458fce.css";
import "@/styles/pages/contabilidad-bandas-musica.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular page s-custom-logo s-embed-responsive s-tema tema-desktop tema-page-builder-template tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5 bl-page";

export const metadata: Metadata = {
  title: "Software gestión banda de música. Programa de contabilidad",
  description: "SOCIOS.PRO ⭐ Programa de gestión y contabilidad para bandas de música. Controla ingresos, salidas y subvenciones con transparencia y facilidad",
  alternates: { canonical: "/contabilidad-bandas-musica/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Software gestión banda de música. Programa de contabilidad",
    description: "SOCIOS.PRO ⭐ Programa de gestión y contabilidad para bandas de música. Controla ingresos, salidas y subvenciones con transparencia y facilidad",
    url: "https://socios.pro/contabilidad-bandas-musica/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-11-11T11:17:47+00:00",
    images: [{"url": "/images/2025/06/banda_de_musica.webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
