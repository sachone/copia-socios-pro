import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/index.json";
import "@/styles/shared/tema-d3458fce.css";
import "@/styles/pages/index.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "home s-singular page s-custom-logo s-embed-responsive s-tema tema-desktop tema-page-builder-template tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5 bl-page";

export const metadata: Metadata = {
  title: "Software gestión asociaciones. Programa de contabilidad",
  description: "SOCIOS.PRO ⭐ Programa de gestión y contabilidad diseñado para asociaciones sin fines de lucro. Gestión fácil y profesional de tu asociación",
  alternates: { canonical: "/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Software gestión asociaciones. Programa de contabilidad",
    description: "SOCIOS.PRO ⭐ Programa de gestión y contabilidad diseñado para asociaciones sin fines de lucro. Gestión fácil y profesional de tu asociación",
    url: "https://socios.pro/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "website",
    images: [{"url": "/images/2025/04/sin_animo_de_lucro.webp", "width": 900, "height": 600, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
