import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/contabilidad-clubs-deportivos.json";
import "@/styles/shared/tema-d3458fce.css";
import "@/styles/pages/contabilidad-clubs-deportivos.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular page s-custom-logo s-embed-responsive s-tema tema-desktop tema-page-builder-template tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5 bl-page";

export const metadata: Metadata = {
  title: "Software club deportivo. Programa contabilidad club deportivo",
  description: "SOCIOS.PRO ⭐ Software de gestión para club deportivo. Organiza tu club con soluciones fáciles y seguras",
  alternates: { canonical: "/contabilidad-clubs-deportivos/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Software club deportivo. Programa contabilidad club deportivo",
    description: "SOCIOS.PRO ⭐ Software de gestión para club deportivo. Organiza tu club con soluciones fáciles y seguras",
    url: "https://socios.pro/contabilidad-clubs-deportivos/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-11-21T14:47:00+00:00",
    images: [{"url": "/images/2025/04/asociacion_deportivas.webp", "width": 600, "height": 600, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
