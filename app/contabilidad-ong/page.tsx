import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/contabilidad-ong.json";
import "@/styles/shared/tema-d3458fce.css";
import "@/styles/pages/contabilidad-ong.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular page s-custom-logo s-embed-responsive s-tema tema-desktop tema-page-builder-template tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5 bl-page";

export const metadata: Metadata = {
  title: "Programa gestión ONG. Programa contabilidad ONG",
  description: "SOCIOS.PRO ⭐ Software ONG de gestión y contabilidad. Gestiona de forma sencilla una Organización no Gubernamental optimizando recursos y tiempo",
  alternates: { canonical: "/contabilidad-ong/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Programa gestión ONG. Programa contabilidad ONG",
    description: "SOCIOS.PRO ⭐ Software ONG de gestión y contabilidad. Gestiona de forma sencilla una Organización no Gubernamental optimizando recursos y tiempo",
    url: "https://socios.pro/contabilidad-ong/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-11-11T11:19:32+00:00",
    images: [{"url": "/images/2025/04/ong-1.webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
