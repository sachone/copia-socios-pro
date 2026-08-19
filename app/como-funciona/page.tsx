import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/como-funciona.json";
import "@/styles/shared/tema-d3458fce.css";
import "@/styles/pages/como-funciona.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular page s-custom-logo s-embed-responsive s-tema tema-desktop tema-page-builder-template tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-kit-5 bl-page";

export const metadata: Metadata = {
  title: "¿Cómo funciona nuestro programa de contabilidad?",
  description: "SOCIOS.PRO ⭐ Aprende cómo funciona nuestro programa de contabilidad para asociaciones. Simplifica tus cuentas en pocos pasos",
  alternates: { canonical: "/como-funciona/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "¿Cómo funciona nuestro programa de contabilidad?",
    description: "SOCIOS.PRO ⭐ Aprende cómo funciona nuestro programa de contabilidad para asociaciones. Simplifica tus cuentas en pocos pasos",
    url: "https://socios.pro/como-funciona/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-11-21T14:49:06+00:00",
    images: [{"url": "/images/2025/04/como_funciona.webp", "width": 1000, "height": 1000, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
