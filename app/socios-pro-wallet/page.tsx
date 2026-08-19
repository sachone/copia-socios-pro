import type { Metadata } from "next";
import PageBody from "@/components/PageBody";
import { robotsMeta } from "@/lib/indexacion";
import content from "@/content/pages/socios-pro-wallet.json";
import "@/styles/shared/astra-b0e46906.css";
import "@/styles/pages/socios-pro-wallet.css";

// Clases que WordPress/Astra ponen en <body> para esta pagina concreta.
const BODY_CLASS = "wp-singular page-template-default page page-id-831 wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop ast-page-builder-template ast-no-sidebar astra-4.13.3 ast-single-post ast-inherit-site-logo-transparent ast-hfb-header elementor-default elementor-kit-5 elementor-page elementor-page-831";

export const metadata: Metadata = {
  title: "Socios pro Wallet - Socios Pro",
  alternates: { canonical: "/socios-pro-wallet/" },
  robots: robotsMeta({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  }),
  openGraph: {
    title: "Socios pro Wallet - Socios Pro",
    description: "Socios.pro Wallet Revolucionad vuestros eventos y barra con tecnología NFC y TPV Solicita una DEMO gratuita ahora! Lleva tu asociación […]",
    url: "https://socios.pro/socios-pro-wallet/",
    siteName: "Socios Pro",
    locale: "es_ES",
    type: "article",
    modifiedTime: "2026-03-11T12:08:29+00:00",
    images: [{"url": "/images/2025/04/socios_pro-removebg-preview.webp", "width": 866, "height": 288, "type": "image/webp"}],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  return <PageBody html={content.html} bodyClass={BODY_CLASS} />;
}
