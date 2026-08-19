import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/libros-contables-asociacion.json";
import "@/styles/shared/tema-d3458fce.css";
import "@/styles/pages/libros-contables-asociacion.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular page s-custom-logo s-embed-responsive s-tema tema-desktop tema-page-builder-template tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5 bl-page";

export const metadata: Metadata = {
  title: "Libros contables asociaciones sin fines de lucro",
  description: "SOCIOS.PRO ⭐ Gestión de libros contables para asociaciones sin ánimo de lucro. Organiza tus registros financieros de forma eficiente",
  alternates: { canonical: "/libros-contables-asociacion/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Libros contables asociaciones sin fines de lucro",
    description: "SOCIOS.PRO ⭐ Gestión de libros contables para asociaciones sin ánimo de lucro. Organiza tus registros financieros de forma eficiente",
    url: "https://socios.pro/libros-contables-asociacion/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-04-08T09:57:10+00:00",
    images: [{"url": "/images/2025/04/libros_Contables.webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
