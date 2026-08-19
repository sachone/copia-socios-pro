import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/alta-socios-asociacion.json";
import "@/styles/shared/tema-dc171bc6.css";
import "@/styles/pages/alta-socios-asociacion.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular single single-post postid-855 single-format-standard s-custom-logo s-embed-responsive s-tema tema-desktop tema-separate-container tema-two-container tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5";

export const metadata: Metadata = {
  title: "Alta de socios en una asociación: proceso sencillo y efectivo",
  description: "Aprende a crear un proceso de alta de socios claro y rápido: formulario, automatización, cuotas y buenas prácticas para asociaciones.",
  alternates: { canonical: "/alta-socios-asociacion/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Alta de socios en una asociación: proceso sencillo y efectivo",
    description: "Aprende a crear un proceso de alta de socios claro y rápido: formulario, automatización, cuotas y buenas prácticas para asociaciones.",
    url: "https://socios.pro/alta-socios-asociacion/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2026-05-12T09:34:49+00:00",
    images: [{"url": "/images/2026/03/proceso-alta-socios-asociacion-mesa-oficina-portatil.webp", "width": 1376, "height": 768, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
