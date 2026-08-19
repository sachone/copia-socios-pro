import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/como-gestionar-el-portal-del-socio-guia-socios-hagan-gestiones-solos.json";
import "@/styles/shared/tema-dc171bc6.css";
import "@/styles/pages/como-gestionar-el-portal-del-socio-guia-socios-hagan-gestiones-solos.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular single single-post postid-845 single-format-standard s-custom-logo s-embed-responsive s-tema tema-desktop tema-separate-container tema-two-container tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5";

export const metadata: Metadata = {
  title: "Cómo gestionar el portal del socio: guía para tus socios",
  description: "En esta guía te explicamos qué es el portal del socio, qué puede hacer este desde su propio acceso y que ventajas tiene.",
  alternates: { canonical: "/como-gestionar-el-portal-del-socio-guia-socios-hagan-gestiones-solos/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Cómo gestionar el portal del socio: guía para tus socios",
    description: "En esta guía te explicamos qué es el portal del socio, qué puede hacer este desde su propio acceso y que ventajas tiene.",
    url: "https://socios.pro/como-gestionar-el-portal-del-socio-guia-socios-hagan-gestiones-solos/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2026-03-02T15:05:15+00:00",
    modifiedTime: "2026-06-01T11:08:37+00:00",
    images: [{"url": "/images/2026/03/guia_portal_socios.webp", "width": 1536, "height": 1024, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
