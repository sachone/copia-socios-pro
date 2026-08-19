import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/mejor-software-gestion-asociaciones.json";
import "@/styles/shared/tema-dc171bc6.css";
import "@/styles/pages/mejor-software-gestion-asociaciones.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular single single-post postid-988 single-format-standard s-custom-logo s-embed-responsive s-tema tema-desktop tema-separate-container tema-two-container tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5";

export const metadata: Metadata = {
  title: "Cómo elegir el mejor software de gestión para asociaciones",
  description: "Descubre cómo elegir el mejor software de gestión para tu asociación y evita los errores más comunes al digitalizar tu entidad.",
  alternates: { canonical: "/mejor-software-gestion-asociaciones/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Cómo elegir el mejor software de gestión para asociaciones",
    description: "Descubre cómo elegir el mejor software de gestión para tu asociación y evita los errores más comunes al digitalizar tu entidad.",
    url: "https://socios.pro/mejor-software-gestion-asociaciones/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2026-07-09T10:00:55+00:00",
    images: [{"url": "/images/2026/07/software_gestion_asociacion.webp", "width": 1536, "height": 1024, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
