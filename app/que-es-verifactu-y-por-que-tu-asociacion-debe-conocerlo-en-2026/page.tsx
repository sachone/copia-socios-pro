import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/que-es-verifactu-y-por-que-tu-asociacion-debe-conocerlo-en-2026.json";
import "@/styles/shared/astra-a15e2161.css";
import "@/styles/pages/que-es-verifactu-y-por-que-tu-asociacion-debe-conocerlo-en-2026.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular post-template-default single single-post postid-878 single-format-standard wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-separate-container ast-two-container ast-no-sidebar astra-4.13.3 ast-blog-single-style-1 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-page-584 ast-normal-title-enabled elementor-default elementor-kit-5";

export const metadata: Metadata = {
  title: "Qué es VeriFactu y por qué tu asociación debe conocerlo en 2026",
  description: "Si gestionas una asociación, una AMPA, un club deportivo o una ONG, es probable que hayas oído hablar de VeriFactu en los últimos meses",
  alternates: { canonical: "/que-es-verifactu-y-por-que-tu-asociacion-debe-conocerlo-en-2026/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Qué es VeriFactu y por qué tu asociación debe conocerlo en 2026",
    description: "Si gestionas una asociación, una AMPA, un club deportivo o una ONG, es probable que hayas oído hablar de VeriFactu en los últimos meses",
    url: "https://socios.pro/que-es-verifactu-y-por-que-tu-asociacion-debe-conocerlo-en-2026/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2026-04-27T08:37:42+00:00",
    modifiedTime: "2026-06-01T11:32:50+00:00",
    images: [{"url": "/images/2026/04/verifactu_para_asociaciones.webp", "width": 1536, "height": 1024, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
