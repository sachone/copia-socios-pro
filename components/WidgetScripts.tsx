"use client";

import Script from "next/script";

/**
 * Carga el JavaScript que algunos widgets HTML de Elementor traen incrustado
 * (en el original, la tabla comparativa de `/planes-y-precios/` se genera asi).
 * Se cargan como <Script> porque el contenido de la pagina se inyecta con
 * `innerHTML`, y los <script> insertados de esa forma no se ejecutan.
 */
export default function WidgetScripts({ scripts }: { scripts: string[] }) {
  return (
    <>
      {scripts.map((src) => (
        <Script key={src} src={src} strategy="afterInteractive" />
      ))}
    </>
  );
}
