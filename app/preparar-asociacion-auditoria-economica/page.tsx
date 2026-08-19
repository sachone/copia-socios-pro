import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/preparar-asociacion-auditoria-economica.json";
import "@/styles/shared/tema-dc171bc6.css";
import "@/styles/pages/preparar-asociacion-auditoria-economica.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular single single-post postid-985 single-format-standard s-custom-logo s-embed-responsive s-tema tema-desktop tema-separate-container tema-two-container tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5";

export const metadata: Metadata = {
  title: "Cómo preparar una asociación para una auditoría económica",
  description: "Descubre cómo preparar tu asociación para una auditoría económica con procesos, documentación y herramientas digitales.",
  alternates: { canonical: "/preparar-asociacion-auditoria-economica/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Cómo preparar una asociación para una auditoría económica",
    description: "Descubre cómo preparar tu asociación para una auditoría económica con procesos, documentación y herramientas digitales.",
    url: "https://socios.pro/preparar-asociacion-auditoria-economica/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2026-07-07T10:00:58+00:00",
    images: [{"url": "/images/2026/07/auditoria_economica_asociaciones.webp", "width": 1536, "height": 1024, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
