import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El sitio original sirve todas sus URLs con barra final (https://socios.pro/que-es/)
  trailingSlash: true,
  async redirects() {
    return [
      // El original responde 301 en esta URL antigua.
      { source: "/precio", destination: "/planes-y-precios/", statusCode: 301 },
    ];
  },
  async headers() {
    return [
      {
        // El nombre de cada fichero lo genera Google Fonts a partir de su
        // contenido: si la tipografía cambiara, cambiaría también el nombre.
        // Se puede cachear para siempre sin riesgo de servir una versión vieja.
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        // Aquí el nombre de fichero es el slug de la página (no un hash de
        // contenido), así que una regeneración del sitio SÍ puede cambiar lo
        // que hay dentro sin cambiar la URL. Cache corta con revalidación en
        // segundo plano, en vez de "immutable".
        source: "/widgets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" }],
      },
      {
        // Igual que /widgets/: el nombre lo pone WordPress (no es un hash de
        // contenido), así que si el original cambia una imagen sin renombrarla
        // conviene revalidar en vez de fiarse para siempre.
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
