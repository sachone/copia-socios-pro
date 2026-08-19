import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/blog.json";
import "@/styles/shared/tema-d3458fce.css";
import "@/styles/pages/blog.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = "s-singular plantilla page s-custom-logo s-embed-responsive s-tema tema-desktop tema-page-builder-template tema-no-sidebar tema-single-post tema-inherit-site-logo-transparent tema-hfb-header bl-default bl-template-full-width bl-kit-5 bl-page";

export const metadata: Metadata = {
  title: "Blog",
  description: "Las últimas noticias en Socios.pro",
  alternates: { canonical: "/blog/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Blog",
    description: "Las últimas noticias en Socios.pro",
    url: "https://socios.pro/blog/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2025-11-21T13:47:15+00:00",
    images: [{"url": "/images/2025/04/socios_pro-removebg-preview.webp", "width": 866, "height": 288, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
