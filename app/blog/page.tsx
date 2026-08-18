import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import content from "@/content/pages/blog.json";
import "@/styles/shared/astra-b0e46906.css";
import "@/styles/pages/blog.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular page-template page-template-elementor_header_footer page page-id-564 wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-page-builder-template ast-no-sidebar astra-4.13.3 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-default elementor-template-full-width elementor-kit-5 elementor-page elementor-page-564";

export const metadata: Metadata = {
  title: "Blog",
  description: "Las últimas noticias en Socios.pro",
  alternates: { canonical: "/blog/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
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
