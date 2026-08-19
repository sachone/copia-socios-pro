import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/diferencias-contabilidad-empresa-entidad-sin-animo-de-lucro.json";
import "@/styles/shared/tema-dc171bc6.css";
import "@/styles/pages/diferencias-contabilidad-empresa-entidad-sin-animo-de-lucro.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular single single-post postid-655 single-format-standard s-custom-logo s-embed-responsive s-tema tema-desktop tema-separate-container tema-two-container tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5";

export const metadata: Metadata = {
  title: "Diferencias entre la contabilidad de una empresa y de una entidad sin ánimo de lucro",
  description: "La contabilidad de una empresa no es igual que la de una entidad sin ánimo de lucro. Descubre las principales diferencias y cómo gestionarlas correctamente.",
  alternates: { canonical: "/diferencias-contabilidad-empresa-entidad-sin-animo-de-lucro/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Diferencias entre la contabilidad de una empresa y de una entidad sin ánimo de lucro",
    description: "La contabilidad de una empresa no es igual que la de una entidad sin ánimo de lucro. Descubre las principales diferencias y cómo gestionarlas correctamente.",
    url: "https://socios.pro/diferencias-contabilidad-empresa-entidad-sin-animo-de-lucro/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    publishedTime: "2026-01-29T08:28:11+00:00",
    modifiedTime: "2026-06-01T11:29:03+00:00",
    images: [{"url": "/images/2025/11/Contabilidad-de-empresa-vs-entidad-sin-animo-de-lucro.webp", "width": 1536, "height": 1024, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
