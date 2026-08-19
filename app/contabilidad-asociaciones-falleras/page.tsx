import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/contabilidad-asociaciones-falleras.json";
import "@/styles/shared/tema-d3458fce.css";
import "@/styles/pages/contabilidad-asociaciones-falleras.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular page s-custom-logo s-embed-responsive s-tema tema-desktop tema-page-builder-template tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5 bl-page";

export const metadata: Metadata = {
  title: "Software asociación fallera. Programa de contabilidad",
  description: "SOCIOS.PRO ⭐ Software de gestión de asociación fallera. Optimiza la gestión económica de tu falla con una herramienta clara y legal",
  alternates: { canonical: "/contabilidad-asociaciones-falleras/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Software asociación fallera. Programa de contabilidad",
    description: "SOCIOS.PRO ⭐ Software de gestión de asociación fallera. Optimiza la gestión económica de tu falla con una herramienta clara y legal",
    url: "https://socios.pro/contabilidad-asociaciones-falleras/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-11-21T13:51:32+00:00",
    images: [{"url": "/images/2025/06/contabilidad_asociaciones_falleras.webp", "width": 459, "height": 544, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
