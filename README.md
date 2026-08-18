# socios.pro — clon en Next.js

Réplica de [socios.pro](https://socios.pro) con el App Router de Next.js 15.
Reproduce el diseño, los textos, las imágenes, las URLs y las etiquetas SEO del
sitio original, que está hecho con WordPress + tema Astra + Elementor Pro.

```bash
npm install
npm run dev      # http://localhost:3005
npm run build && npm start
```

## Qué hay dentro

| Ruta | Qué es |
|---|---|
| `app/<slug>/page.tsx` | Una carpeta por cada URL del original (50 en total), con su `metadata` |
| `app/layout.tsx` | `<html>`, `<body>`, cabecera, pie y los datos estructurados |
| `components/` | Cabecera, pie y la capa de JavaScript que sustituye a la de Elementor |
| `content/` | El HTML de cada página, la cabecera, el pie y el JSON-LD |
| `styles/shared/common.css` | El CSS idéntico en las 50 páginas (tema, Elementor, tipografías, kit global); se importa una vez desde `app/layout.tsx` y el navegador lo cachea en toda la navegación |
| `styles/shared/astra-*.css` | Las 5 variantes del CSS inline de Astra, deduplicadas por contenido |
| `styles/pages/` | Solo lo que cambia en cada página frente a lo anterior: su CSS propio de Elementor |
| `styles/site-overrides.css` | Lo único de `styles/` escrito a mano: reglas que suplen al JS de Elementor |
| `public/fonts/` | Poppins, Roboto y Roboto Slab, ya recortadas a los pesos que se usan de verdad |
| `public/widgets/` | El JS que Elementor lleva incrustado en algún widget HTML |
| `tools/` | Los scripts que descargan el original y regeneran todo lo anterior |

Todo lo que hay en `app/*/page.tsx`, `content/`, `styles/shared/`, `styles/pages/`,
`public/fonts/`, `public/widgets/`, `lib/routes.json` y `lib/preload-fonts.json`
**está generado**: no lo edites a mano, se sobrescribe. Lo escrito a mano es
`app/layout.tsx`, `components/`, `styles/site-overrides.css` y `tools/`.

## Regenerar desde el original

```bash
python3 tools/descargar.py   # vuelca el sitio en tools/.cache/
python3 tools/generar.py     # reescribe rutas, contenido, CSS y tipografías
```

`descargar.py` recorre el sitemap de Yoast y añade las tres páginas legales, que
Yoast excluye por llevar `noindex`. Solo hace falta volver a lanzarlo cuando
cambie el original; `generar.py` trabaja siempre sobre la caché.

## Decisiones que conviene conocer

**Las imágenes apuntan a socios.pro.** Tal y como se pidió: ningún `.webp` se ha
copiado al proyecto. Si algún día quieres que el clon sea autónomo, hay que
descargar `/wp-content/uploads/` y reescribir los `src`.

**Las tipografías sí son locales.** El original las sirve sin cabeceras CORS, así
que desde cualquier otro dominio fallan. Se descargan a `public/fonts/` y
`tools/generar.py` reescribe las rutas del CSS.

**El HTML se inyecta tal cual.** Cada página conserva el marcado que genera
Elementor, con sus clases, para que el CSS original encaje sin retoques. La
alternativa —reescribir 50 páginas de Elementor como componentes React— no
habría dado un resultado idéntico.

**No se ha traído el JavaScript de WordPress.** En vez de cargar jQuery,
SmartMenus y el bundle de Elementor (~500 KB), `components/ElementorRuntime.tsx`
y `components/Header.tsx` reimplementan lo poco que hace falta:

- menú hamburguesa y submenús desplegables (`Header.tsx`);
- animaciones de entrada `fadeInDown` / `fadeInRight` al entrar en pantalla;
- proporción fija de las miniaturas del widget de entradas;
- clases de `<body>` propias de cada página.

El acordeón de preguntas frecuentes usa `<details>` nativo y no necesita nada.

## Optimizaciones sobre el original

El sitio en WordPress carga, de media, **436 KB de CSS en cada página**, sin
compartir nada entre una y otra (cada URL genera su propia hoja). Antes de
desplegar a Vercel se le hicieron cuatro recortes, todos verificados
comparando cada página contra el original (altura del documento, imágenes
rotas, fuente y peso computados) para no perder fidelidad visual:

1. **CSS muerto, fuera.** El banner de cookies (Complianz) y el lazy-load de
   WP Rocket no se usan en el clon —el banner no está en el DOM, las imágenes
   ya salen con su `src` real (ver `unlazy()` en `tools/generar.py`)— así que
   sus hojas se descartan. También `wp-includes/.../block-library/style.min.css`
   (~128 KB en las 19 páginas de blog): es CSS de los bloques de Gutenberg,
   y el sitio no usa ni un solo `wp-block-*` (se comprobó por las 50 páginas
   antes de quitarlo).
2. **Tipografías recortadas a lo que se usa.** El original descarga 3
   tipografías completas —9 pesos × 2 estilos × 9 subconjuntos de idioma cada
   una, unos 950 KB en 61 ficheros—, pero el sitio en español solo usa un
   puñado de combinaciones (`scan_needed_fonts()` las detecta recorriendo
   todo el CSS). El resultado: 5 ficheros, 100 KB.
3. **Lo común, una sola vez.** El tema, Elementor, el kit global y las
   tipografías son *byte a byte* idénticos en las 50 páginas; solo el CSS
   inline de Astra tiene variantes (5 en total) y el CSS propio de cada
   post/página es distinto de verdad. Por eso el CSS se reparte en tres
   capas: `styles/shared/common.css` (194 KB, se importa una vez desde
   `app/layout.tsx` y el navegador lo cachea en el resto de la navegación),
   `styles/shared/astra-*.css` (la variante que le toca a cada página, 5
   ficheros compartidos en vez de 50 copias) y `styles/pages/<ruta>.css`
   (solo lo genuinamente propio de esa página: ~14 KB de media, antes 436 KB).
4. **Solo se precargan 2 tipografías**, no las 5: la del titular (Poppins
   600) y la del texto (Roboto 400), calculadas en cada regeneración
   (`lib/preload-fonts.json`) para que el `<link rel="preload">` nunca quede
   apuntando a un fichero que ya no existe.

En `next.config.ts` también se marcan `/fonts/*` como cacheables para siempre
(los nombres de Google Fonts ya incluyen un hash de su contenido) y
`/widgets/*` con una caché corta con revalidación (su nombre es el slug de la
página, no un hash, así que sí puede cambiar de contenido en una
regeneración).

## Lo que no se ha replicado

- **Google Tag Manager** (`GTM-KHHWG3R6`) y **reCAPTCHA**: son scripts de
  seguimiento; se han dejado fuera a propósito. Si los quieres, añade
  `next/script` en `app/layout.tsx` con tu propio identificador.
- **El banner de cookies (Complianz)**: es un plugin de WordPress con su propio
  backend de consentimiento. Habría que sustituirlo por una solución propia.
- **Los formularios**: en el original hacen POST a `admin-ajax.php`. Aquí se
  interceptan y avisan de que no hay backend
  (`components/ElementorRuntime.tsx`). Conéctalos a una Route Handler de Next o
  a un servicio externo.
- **Los feeds RSS** (`/feed/`, `/comments/feed/`).
- **Motion FX** (el ligero efecto de inclinación al mover el ratón sobre la
  imagen de portada).

`/precio/` se resuelve con una redirección 301 a `/planes-y-precios/`, igual que
en el original (ver `next.config.ts`).

## Desplegar

El proyecto no necesita configuración especial en Vercel: detecta Next.js
automáticamente. Solo dos cosas a tener en cuenta:

- Las imágenes siguen apuntando a `socios.pro` (ver "Decisiones que conviene
  conocer" más abajo), así que ese dominio tiene que seguir accesible; no hace
  falta ninguna variable de entorno.
- Si repites el proceso de regenerar (`tools/generar.py`) y vuelves a
  desplegar, revisa que `public/fonts/` y `styles/shared/` no se hayan quedado
  con ficheros de una ejecución anterior mezclados con los nuevos — el script
  ya limpia esas carpetas antes de escribir, pero si tocas algo a mano
  conviene borrarlas primero.

## Aviso

El contenido, las imágenes y la marca son de Socios.Pro. Este proyecto sirve como
base de trabajo o referencia técnica; publicarlo tal cual con la marca ajena no
sería legal.
