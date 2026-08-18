import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import jsonld from "@/content/jsonld.json";
import preloadFonts from "@/lib/preload-fonts.json";
import favicons from "@/lib/favicons.json";
import { SITE_URL } from "@/lib/site-url";

// El CSS identico en las 50 paginas (tema Astra, Elementor, tipografias, kit
// global) vive aqui: al importarse desde el layout raiz, Next.js lo sirve
// como un unico recurso compartido que el navegador cachea en toda la
// navegacion. Cada `page.tsx` solo carga, aparte, lo que cambia en esa
// pagina en concreto (ver tools/generar.py).
import "@/styles/shared/common.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Software gestión asociaciones. Programa de contabilidad",
    template: "%s",
  },
  icons: {
    icon: favicons.icons.map((i) => ({ url: i.url, sizes: i.sizes })),
    apple: favicons.apple,
  },
  other: {
    "msapplication-TileImage": favicons.tile,
  },
};

// El JSON-LD (ver content/jsonld.json) trae las imagenes ya en rutas locales
// (/images/...), pero schema.org exige URLs absolutas: se completan aqui con
// el dominio real, resuelto en tiempo de ejecucion (ver lib/site-url.ts) en
// vez de quedar fijado al generar el sitio.
const jsonldAbsolute = jsonld.raw
  .replaceAll('"/images/', `"${SITE_URL}/images/`)
  // Neutraliza un "</script>" que viniera dentro del JSON-LD: cerraria el
  // bloque antes de tiempo y el resto se interpretaria como marcado.
  .replaceAll("<", "\\u003c");

// Clases de <body> comunes a todas las paginas. Cada pagina anade las suyas
// (ver `BODY_CLASS` en cada `page.tsx`).
const BASE_BODY_CLASS =
  "wp-singular wp-custom-logo wp-embed-responsive wp-theme-astra ast-desktop " +
  "ast-no-sidebar astra-4.13.3 ast-single-post ast-inherit-site-logo-transparent " +
  "ast-hfb-header elementor-default elementor-kit-5";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* Solo se precargan las 2 tipografias mas criticas -titular y texto-,
            no las 5 que se usan en total: precargarlas todas competiria por
            ancho de banda con la propia imagen de portada. Los nombres los
            calcula tools/generar.py (ver lib/preload-fonts.json) para que
            nunca queden desincronizados si cambia el recorte de pesos. */}
        {preloadFonts.heading && (
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin=""
            href={`/fonts/${preloadFonts.heading}`}
          />
        )}
        {preloadFonts.text && preloadFonts.text !== preloadFonts.heading && (
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin=""
            href={`/fonts/${preloadFonts.text}`}
          />
        )}
        {/* Datos estructurados del original (identicos en las 47 URLs). */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonldAbsolute }}
        />
      </head>
      <body
        className={BASE_BODY_CLASS}
        itemScope
        itemType="https://schema.org/WebPage"
        // Cada pagina ajusta las clases de <body> desde su propio script.
        suppressHydrationWarning
      >
        <a
          className="skip-link screen-reader-text"
          href="#content"
          role="link"
          title="Ir al contenido"
        >
          Ir al contenido
        </a>
        <div className="hfeed site" id="page">
          <Header />
          {children}
          <Footer />
        </div>
        <CookieConsent />
      </body>
    </html>
  );
}
