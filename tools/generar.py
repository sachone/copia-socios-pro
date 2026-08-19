#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Genera el proyecto Next.js a partir del volcado que deja tools/descargar.py.

    python3 tools/descargar.py     # una vez (o cuando cambie el original)
    python3 tools/generar.py

Escribe (sobrescribiendo lo que hubiera):

    app/<ruta>/page.tsx     una ruta por cada URL del original, con su metadata
    content/pages/*.json    el HTML de cada pagina, ya limpio
    content/header.json     cabecera y pie, compartidos por todas las rutas
    content/footer.json
    content/jsonld.json     los datos estructurados del original
    styles/shared/common.css  el CSS identico en las 50 paginas (tema, Elementor,
                               tipografias, kit global), importado una vez desde
                               app/layout.tsx para que el navegador lo cachee
    styles/shared/astra-*.css las 5 variantes del CSS inline de Astra,
                               deduplicadas por contenido
    styles/pages/*.css      solo lo que de verdad es propio de cada pagina
    public/fonts/           las tipografias, ya recortadas a los pesos usados
                             (el origen las sirve sin CORS, hay que autoalojarlas)
    public/images/          todas las imagenes referenciadas, descargadas del
                             original en vez de enlazadas
    public/widgets/*.js     el JS incrustado en widgets HTML de Elementor
    lib/routes.json         indice de rutas, que alimenta el sitemap
    lib/preload-fonts.json  que tipografias precargar en app/layout.tsx
    lib/favicons.json       los favicons, para app/layout.tsx

Lo unico que se escribe a mano es components/, app/layout.tsx,
lib/site-url.ts y styles/site-overrides.css.
"""
import glob
import hashlib
import html as htmlmod
import json
import os
import re
import shutil
import subprocess
import tempfile
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor

ORIGIN = "https://socios.pro"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(ROOT, "tools", ".cache")
RAW, CSSDIR = os.path.join(CACHE, "raw"), os.path.join(CACHE, "css")


# --------------------------------------------------------------- rutas

def slug_of(path):
    name = os.path.basename(path)[:-5]
    return "index" if name == "__home" else name


def route_of(key):
    return "/" if key == "index" else "/%s/" % key


def ts(value):
    """Serializa a un literal valido en TypeScript."""
    return json.dumps(value, ensure_ascii=False)


# ------------------------------------------------------------ limpieza

RE_ROCKET_ATTR = re.compile(r'\s+data-(rocket|wpr)-[a-z0-9-]+="[^"]*"')
RE_NOSCRIPT = re.compile(r"<noscript>.*?</noscript>", re.S)
RE_SCRIPT = re.compile(r"<script\b[^>]*>.*?</script>", re.S)
RE_COMMENT = re.compile(r"<!--(?!\[if).*?-->", re.S)


def unlazy(match):
    """Deshace el lazy-load de WP Rocket: el src real vuelve a su sitio."""
    tag = match.group(0)
    real = re.search(r'data-lazy-src="([^"]*)"', tag)
    if not real:
        return tag
    tag = re.sub(r'\ssrc="[^"]*"', lambda _: ' src="%s"' % real.group(1), tag, count=1)
    tag = re.sub(r'\sdata-lazy-srcset="([^"]*)"', lambda m: ' srcset="%s"' % m.group(1), tag)
    tag = re.sub(r'\sdata-lazy-sizes="([^"]*)"', lambda m: ' sizes="%s"' % m.group(1), tag)
    return re.sub(r'\sdata-lazy-src="[^"]*"', "", tag)


def internalize_links(html):
    """Los enlaces al propio dominio pasan a ser rutas relativas, para que la
    navegacion se quede dentro del clon. Los ficheros de /wp-content que no
    sean imagenes (por ejemplo si quedara algun CSS/JS suelto) siguen
    apuntando al original; las imagenes las trata `localize_images()`."""
    def repl(m):
        attr, path = m.group(1), m.group(2)
        if path.startswith(("/wp-content/", "/wp-admin/", "/wp-json/", "/wp-includes/", "/feed")):
            return m.group(0)
        return '%s="%s"' % (attr, path or "/")

    return re.sub(r'\b(href|action)="%s([^"]*)"' % re.escape(ORIGIN), repl, html)


# ---------------------------------------------------------------- imagenes

IMAGES = set()  # rutas relativas a /wp-content/uploads/, sin el propio prefijo
IMAGE_RE = re.compile(
    r"https://socios\.pro/wp-content/uploads/([^\"'\s\\)]+\.(?:webp|jpe?g|png|gif|svg))", re.I
)


def localize_images(text):
    """Las imagenes se descargan a public/images/ (en vez de enlazarlas al
    original) para que el sitio sea autonomo. Se usa la misma ruta que tenian
    en /wp-content/uploads/ para no chocar entre ficheros del mismo nombre
    subidos en fechas distintas."""
    def repl(m):
        rel = m.group(1)
        IMAGES.add(rel)
        return "/images/%s" % rel

    return IMAGE_RE.sub(repl, text)


def strip_nested_document(html):
    """Algunos widgets HTML de Elementor traen pegado un documento entero
    (<html><head><title>...). El navegador descarta html/head/body al insertarlo
    con innerHTML, pero conserva el <title>, que le robaria el titulo a la
    pagina. Se quitan esas etiquetas y se mantiene lo util (<style>, <link>)."""
    html = re.sub(r"</?(?:html|head|body)\b[^>]*>", "", html)
    html = re.sub(r"<title>.*?</title>", "", html, flags=re.S)
    return re.sub(r'<meta\s+(?:charset|name="viewport")[^>]*>', "", html)


def remove_balanced_div(html, marca):
    """Elimina el <div> que contiene `marca` junto con todo su contenido,
    contando anidamientos.

    Un `<div[^>]*>.*?</div>` perezoso cortaria en el primer </div>, dejando
    sueltos los cierres de los divs internos: el navegador repara ese
    desbalance en silencio, asi que la pagina sigue viendose bien mientras el
    DOM real no es el que se escribio (y un cierre de mas puede cerrar antes
    de tiempo el <form> que lo envuelve, dejando el boton de enviar fuera).
    """
    while True:
        m = re.search(r"<div\b[^>]*%s[^>]*>" % re.escape(marca), html)
        if not m:
            return html
        i, profundidad = m.end(), 1
        for t in re.finditer(r"<div\b|</div>", html[m.end():]):
            profundidad += 1 if t.group(0) != "</div>" else -1
            if profundidad == 0:
                i = m.end() + t.end()
                break
        else:
            return html  # sin cierre: no se toca, mejor dejarlo que romperlo
        html = html[:m.start()] + html[i:]


def clean(html):
    html = RE_SCRIPT.sub("", html)
    html = RE_NOSCRIPT.sub("", html)
    html = RE_ROCKET_ATTR.sub("", html)
    html = re.sub(r"<img\b[^>]*>", unlazy, html)
    html = re.sub(r'(\sclass="[^"]*?)\s*\brocket-lazyload\b', r"\1", html)
    html = RE_COMMENT.sub("", html)
    html = internalize_links(html)
    html = localize_images(html)
    # El banner de cookies (Complianz) depende de su propio JS: se elimina.
    html = re.sub(r'<div id="cmplz-cookiebanner-container">.*', "", html, flags=re.S)
    # El widget de reCAPTCHA se queda en un nodo vacio -su JS no se carga, ver
    # README- pero arrastraba en el marcado la clave de sitio de socios.pro.
    # Esa clave es de su duena y esta atada a su dominio: no pinta nada
    # republicada aqui, asi que se quita el campo entero del formulario.
    html = remove_balanced_div(html, "elementor-field-type-recaptcha")
    # Campos ocultos que el constructor de formularios usaba para hablar con
    # su propio backend: `post_id`/`queried_id` llevan ademas el ID del post en
    # el WordPress original. Aqui no los lee nadie (ver app/api/contact), y son
    # de las cosas que mas delatan de donde sale esto.
    html = re.sub(
        r'<input[^>]*\btype="hidden"[^>]*\bname="(?:post_id|form_id|referer_title|queried_id)"[^>]*>',
        "", html)
    # El patron del campo telefono es una regex invalida en el modo "v" de
    # los navegadores modernos (error en consola en cada envio, aunque no
    # llega a bloquear el formulario). Es un fallo del propio original que no
    # se arregla reordenando caracteres -se probo y sigue rechazandola-, asi
    # que se quita: `type="tel"` ya basta como pista semantica del campo.
    html = re.sub(r'\s*pattern="\[0-9\(\)#&amp;\+\*-=\.\]\+"\s*title="Only numbers[^"]*"', "", html)
    return strip_nested_document(html).strip()


def grab(pattern, html):
    m = re.search(pattern, html, re.S)
    return m.group(0) if m else None


# -------------------------------------------------------------- metadata

def extract_meta(head):
    def tag(pattern):
        m = re.search(pattern, head, re.S)
        return htmlmod.unescape(m.group(1).strip()) if m else None

    meta = {
        "title": tag(r"<title>(.*?)</title>"),
        "description": tag(r'<meta name="description" content="(.*?)"\s*/?>'),
        "robots": tag(r"<meta name='robots' content='(.*?)'"),
        "canonical": tag(r'<link rel="canonical" href="(.*?)"'),
        "og": {},
        "twitter": {},
    }
    for m in re.finditer(r'<meta property="(og:[^"]+|article:[^"]+)" content="(.*?)"\s*/?>', head, re.S):
        meta["og"][m.group(1)] = htmlmod.unescape(m.group(2))
    for m in re.finditer(r'<meta name="(twitter:[^"]+)" content="(.*?)"\s*/?>', head, re.S):
        meta["twitter"][m.group(1)] = htmlmod.unescape(m.group(2))

    # El JSON-LD del original lleva comentarios `//`, asi que no es JSON valido:
    # se copia tal cual en lugar de reserializarlo.
    schema = re.search(r'<script type="application/ld\+json"[^>]*>(.*?)</script>', head, re.S)
    meta["schema_raw"] = schema.group(1).strip() if schema else None
    return meta


def metadata_block(meta, route):
    og, tw = meta["og"], meta["twitter"]
    out = ["export const metadata: Metadata = {", "  title: %s," % ts(meta["title"])]
    if meta["description"]:
        out.append("  description: %s," % ts(meta["description"]))
    out.append("  alternates: { canonical: %s }," % ts(route))

    if meta["robots"]:
        index = "noindex" not in meta["robots"]
        follow = "nofollow" not in meta["robots"]
        # Envuelto en robotsMeta(): mientras el sitio no sea publico devuelve
        # noindex, y al abrirlo cada pagina recupera estos valores sin
        # regenerar nada (ver lib/indexacion.ts).
        out += [
            "  robots: robotsMeta({",
            "    index: %s," % str(index).lower(),
            "    follow: %s," % str(follow).lower(),
            "    googleBot: { index: %s, follow: %s, \"max-image-preview\": \"large\", "
            "\"max-snippet\": -1, \"max-video-preview\": -1 }," % (str(index).lower(), str(follow).lower()),
            "  }),",
        ]

    if og:
        kind = og.get("og:type", "website")
        kind = kind if kind in ("website", "article") else "website"
        out.append("  openGraph: {")
        for key, prop in (("title", "og:title"), ("description", "og:description"),
                          ("url", "og:url"), ("siteName", "og:site_name"), ("locale", "og:locale")):
            if og.get(prop):
                out.append("    %s: %s," % (key, ts(og[prop])))
        out.append("    type: %s," % ts(kind))
        if kind == "article":
            for key, prop in (("publishedTime", "article:published_time"),
                              ("modifiedTime", "article:modified_time")):
                if og.get(prop):
                    out.append("    %s: %s," % (key, ts(og[prop])))
        if og.get("og:image"):
            image = {"url": localize_images(og["og:image"])}
            for key, prop in (("width", "og:image:width"), ("height", "og:image:height")):
                if og.get(prop):
                    image[key] = int(og[prop])
            if og.get("og:image:type"):
                image["type"] = og["og:image:type"]
            out.append("    images: [%s]," % ts(image))
        out.append("  },")

    if tw:
        out += ["  twitter: {", "    card: %s," % ts(tw.get("twitter:card", "summary_large_image")), "  },"]

    out.append("};")
    return "\n".join(out)


# ------------------------------------------------------------------- CSS

# CSS que no aporta nada al clon: el banner de cookies no existe en el DOM
# (se quita en `clean()`), y el mecanismo de lazy-load de WP Rocket tampoco
# se usa (las imagenes ya salen con su `src` real, ver `unlazy()`).
DEAD_LINKS = ("cookieblocker.min.css", "block-library/style.min.css")
DEAD_INLINE = {"rocket-lazyload-inline-css", "rocket-lazyload-nojs-css",
               "wpr-lazyload-bg-container", "wpr-lazyload-bg-exclusion",
               "wpr-lazyload-bg-nostyle"}

# Aunque esta hoja esta presente en las 50 paginas, su contenido cambia segun
# la pagina (5 variantes) - nunca se puede compartir en el CSS comun.
PAGE_SPECIFIC_INLINE = {"astra-theme-css-inline-css"}


def is_dead(item):
    kind, value = item
    if kind == "link":
        return any(d in value for d in DEAD_LINKS)
    return value in DEAD_INLINE


GOOGLE_FONT_FAMILY = {
    "google-fonts/css/poppins.css": "Poppins",
    "google-fonts/css/roboto.css": "Roboto",
    "google-fonts/css/robotoslab.css": "Roboto Slab",
}


def scan_needed_fonts(files):
    """Recorre todo el CSS (tema, Elementor, cada post-XXX.css y las 5
    variantes de astra-theme-css-inline-css) para saber que combinaciones de
    (familia, peso) llegan realmente a usarse. El original descarga las 3
    tipografias completas -9 pesos x 2 estilos x 9 subconjuntos de idioma
    cada una-, pero el sitio en español solo usa un puñado de pesos."""
    families = ("Poppins", "Roboto Slab", "Roboto")
    needed = {f: set() for f in families}

    def scan(css):
        for block in re.findall(r"\{[^{}]*\}", css):
            for fam in families:
                if '"%s"' % fam not in block and "'%s'" % fam not in block:
                    continue
                w = re.search(r"font-weight:\s*(\d+)", block)
                needed[fam].add(int(w.group(1)) if w else 400)

    for path in glob.glob(os.path.join(CSSDIR, "*.css")):
        if "google-fonts" not in path:
            scan(open(path, encoding="utf-8").read())

    for path in files:
        html = open(path, encoding="utf-8").read()
        m = re.search(r'<style id="astra-theme-css-inline-css"[^>]*>(.*?)</style>', html, re.S)
        if m:
            scan(m.group(1))

    # Red de seguridad: los 4 roles tipograficos globales del kit de Elementor
    # (post-5.css) se aplican via var(), asi que el escaneo de arriba no los ve.
    kit = open(os.path.join(CSSDIR, "wp-content__uploads__elementor__css__post-5.css"),
              encoding="utf-8").read()
    for fam_m, w_m in zip(
        re.finditer(r'--e-global-typography-(\w+)-font-family:"([^"]+)"', kit),
        re.finditer(r'--e-global-typography-(\w+)-font-weight:(\d+)', kit),
    ):
        fam, weight = fam_m.group(2), int(w_m.group(2))
        if fam in needed:
            needed[fam].add(weight)

    return needed


FONTS = set()
FONT_RE = re.compile(
    r"url\((['\"]?)(https://socios\.pro/[^)'\"]+\.(?:woff2|woff|ttf|eot|otf))([^)'\"]*)\1\)", re.I
)


def extract_favicons(head):
    """Los favicons se referencian a mano en app/layout.tsx (no se regenera),
    asi que aqui se localizan y se vuelcan a lib/favicons.json: layout.tsx los
    importa, y asi nunca quedan desincronizados si el original cambia de icono."""
    favicons = {"icons": []}
    for m in re.finditer(r'<link rel="icon" href="([^"]+)" sizes="([^"]+)"', head):
        favicons["icons"].append({"url": localize_images(m.group(1)), "sizes": m.group(2)})
    m = re.search(r'<link rel="apple-touch-icon" href="([^"]+)"', head)
    if m:
        favicons["apple"] = localize_images(m.group(1))
    m = re.search(r'<meta name="msapplication-TileImage" content="([^"]+)"', head)
    if m:
        favicons["tile"] = localize_images(m.group(1))
    return favicons


def pick_preload_font(css, weight):
    """Nombre de fichero para el peso dado (subconjunto latin, sin cursiva).
    Sirve para precargar solo la tipografia mas critica (el titular, primer
    contenido visible): precargar las 5 seria contraproducente."""
    for block in re.findall(r"@font-face\{[^}]*\}", css):
        if 'font-style:italic' in block or 'U+0000-00FF' not in block:
            continue
        if 'font-weight:%d' % weight not in block:
            continue
        m = re.search(r"url\(([^)]+)\)", block)
        if m:
            return m.group(1).rsplit("/", 1)[-1]
    return None


def subset_google_font_css(css, needed_weights):
    """De los ~162 `@font-face` que trae cada hoja de Google Fonts (9 pesos x
    2 estilos x 9 subconjuntos Unicode), deja solo los pesos que hacen falta,
    sin cursiva (no se usa en ningun sitio) y con el subconjunto "latin"
    (cubre also los acentos y la ñ del español, en U+00C0-00FF)."""
    def keep(block):
        if 'font-style:italic' in block:
            return False
        if 'U+0000-00FF' not in block:
            return False
        w = re.search(r"font-weight:(\d+)", block)
        return bool(w) and int(w.group(1)) in needed_weights

    blocks = re.findall(r"@font-face\{[^}]*\}", css)
    return "".join(b for b in blocks if keep(b))


def absolutize_css(css, base_url):
    """Las rutas relativas del CSS original pasan a ser absolutas al origen."""
    base_dir = base_url.rsplit("/", 1)[0] + "/"

    def repl(m):
        quote, url = m.group(1), m.group(2).strip()
        if url.startswith(("http://", "https://", "data:", "#", "//")):
            return m.group(0)
        prefix = ORIGIN if url.startswith("/") else base_dir
        return "url(%s%s%s%s)" % (quote, prefix, url, quote)

    return re.sub(r"url\(([\"']?)([^)\"']+)\1\)", repl, css)


def localize_fonts(css):
    """El origen sirve las tipografias sin cabeceras CORS, asi que desde otro
    dominio no se pueden usar: se descargan a public/fonts y se reescribe la
    ruta."""
    def repl(m):
        url = m.group(2)
        FONTS.add(url)
        return "url(/fonts/%s%s)" % (url.rsplit("/", 1)[-1], m.group(3))

    return FONT_RE.sub(repl, css)


def quitar_source_url(css):
    """Quita los `/*# sourceURL=... */`. Son una ayuda para depurar del CSS
    original y nombran la hoja del tema de la que salio cada bloque."""
    return re.sub(r"/\*#\s*sourceURL=[^*]*\*/", "", css)


def quitar_banners(css):
    """Elimina los comentarios `/*! ... */` del proveedor.

    Son los que los minificadores respetan a proposito, asi que llegaban
    intactos al navegador: nombraban el constructor y hasta la version de su
    licencia Pro. Son comentarios: quitarlos no cambia una sola regla.
    """
    return re.sub(r"/\*![^*]*\*+(?:[^/*][^*]*\*+)*/", "", css)


def build_css(items, head, needed_fonts):
    """Concatena las hojas de una pagina en el orden en que aparecen en su <head>."""
    out = []
    for kind, value in items:
        if kind == "link":
            local = value.replace(ORIGIN + "/", "").split("?")[0].replace("/", "__")
            css = open(os.path.join(CSSDIR, local), encoding="utf-8").read()
            for suffix, family in GOOGLE_FONT_FAMILY.items():
                if value.endswith(suffix):
                    css = subset_google_font_css(css, needed_fonts[family])
                    break
            # Solo el nombre del fichero, no su ruta: la ruta completa
            # (/wp-content/plugins/<constructor>/...) era de lo que mas
            # delataba el origen, y para orientarse basta el nombre.
            out.append("/* === %s === */\n%s"
                       % (value.rsplit("/", 1)[-1].split("?")[0],
                          quitar_banners(localize_fonts(absolutize_css(css, value)))))
        else:
            m = re.search(r'<style id="%s"[^>]*>(.*?)</style>' % re.escape(value), head, re.S)
            if m and m.group(1).strip():
                out.append("/* === inline: %s === */\n%s"
                           % (traducir_token(value),
                              quitar_source_url(localize_fonts(absolutize_css(m.group(1), ORIGIN + "/")))))
    return "\n\n".join(out)


# Google sirve woff2 solo si el User-Agent le parece un navegador moderno; con
# el de urllib devuelve ttf, mucho mas pesado.
UA_MODERNO = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
              "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

_GOOGLE_CSS_CACHE = {}


def localize_google_font_css(url):
    """Descarga una hoja de Google Fonts y devuelve sus @font-face ya
    localizados.

    El original deja un <link> a fonts.googleapis.com. Servirlo asi tiene dos
    pegas: el sitio deja de ser autonomo (era el motivo de bajar imagenes y
    tipografias, ver localize_images/localize_fonts) y cada visita le entrega
    su IP a Google sin haber consentido nada, que es justo lo que el banner de
    components/CookieConsent.tsx existe para evitar. Asi que se hace lo mismo
    que con las demas: recortar al subconjunto latino sin cursiva y traerse
    los .woff2 a public/fonts.
    """
    if url in _GOOGLE_CSS_CACHE:
        return _GOOGLE_CSS_CACHE[url]

    req = urllib.request.Request(url, headers={"User-Agent": UA_MODERNO})
    with urllib.request.urlopen(req, timeout=60) as r:
        css = r.read().decode("utf-8")

    def local_url(m):
        font_url = m.group(1)
        FONTS.add(font_url)
        return "url(/fonts/%s)" % font_url.rsplit("/", 1)[-1]

    blocks = []
    for block in re.findall(r"@font-face\s*\{[^}]*\}", css):
        if re.search(r"font-style:\s*italic", block):
            continue
        # "U+0000-00FF" identifica el subconjunto latino, que ya cubre los
        # acentos y la ñ del español (mismo criterio que subset_google_font_css).
        if "U+0000-00FF" not in block:
            continue
        blocks.append(re.sub(r"url\((https://fonts\.gstatic\.com/[^)]+)\)", local_url, block))

    _GOOGLE_CSS_CACHE[url] = "\n".join(blocks)
    return _GOOGLE_CSS_CACHE[url]


def external_font_imports(head):
    """Hojas externas (Google Fonts) que WP Rocket sube al <head>, ya traidas
    al sitio (ver localize_google_font_css)."""
    urls = re.findall(r'<link[^>]*href="(https://fonts\.googleapis\.com/[^"]+)"[^>]*rel="stylesheet"', head)
    urls += re.findall(r'<link[^>]*rel="stylesheet"[^>]*href="(https://fonts\.googleapis\.com/[^"]+)"', head)
    seen = []
    for url in urls:
        url = htmlmod.unescape(url)
        if url not in seen:
            seen.append(url)
    return "\n".join(b for b in (localize_google_font_css(u) for u in seen) if b)


# ------------------------------------------------- scripts de widgets HTML

TAILWIND_CDN = "cdn.tailwindcss.com"


def precompile_tailwind(html, widget_js):
    """Genera el CSS de Tailwind de una pagina, en vez de compilarlo en el
    navegador.

    El original carga cdn.tailwindcss.com (el "Play CDN") dentro del <body>:
    son ~400 KB de JavaScript que, ya en el navegador, rastrean el DOM y
    fabrican el CSS al vuelo. Hasta que termina, los 622 iconos SVG de la
    tabla comparativa se pintan a tamaño natural -enormes- y la maqueta baila.
    Tailwind trae una CLI que hace ese mismo trabajo aqui, una sola vez: el
    CSS entra con el resto de la hoja de la pagina y no hay nada que esperar.

    Se le dan como fuentes el HTML de la pagina y el JS del widget, porque la
    tabla se construye desde JavaScript y las clases solo aparecen ahi.
    """
    with tempfile.TemporaryDirectory() as tmp:
        fuente_html = os.path.join(tmp, "pagina.html")
        open(fuente_html, "w", encoding="utf-8").write(html)
        fuentes = [fuente_html]

        if widget_js:
            fuente_js = os.path.join(tmp, "widget.js")
            open(fuente_js, "w", encoding="utf-8").write(widget_js)
            fuentes.append(fuente_js)

        config = os.path.join(tmp, "tailwind.config.js")
        open(config, "w", encoding="utf-8").write(
            "module.exports = { content: %s };\n" % json.dumps(fuentes))

        entrada = os.path.join(tmp, "entrada.css")
        open(entrada, "w", encoding="utf-8").write(
            "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n")

        salida = os.path.join(tmp, "salida.css")
        subprocess.run(
            ["npx", "tailwindcss", "-c", config, "-i", entrada, "-o", salida, "--minify"],
            cwd=ROOT, check=True, capture_output=True,
        )
        return open(salida, encoding="utf-8").read()


def vendor_script_name(url):
    """Nombre local para un script de terceros. `https://cdn.tailwindcss.com`
    no tiene ruta, asi que en ese caso el nombre sale del dominio."""
    parsed = urllib.parse.urlparse(url)
    base = os.path.basename(parsed.path)
    if not base:
        partes = [p for p in parsed.netloc.split(".") if p not in ("www", "cdn", "com", "org", "net")]
        base = partes[-1] if partes else "vendor"
    if not base.endswith(".js"):
        base += ".js"
    return re.sub(r"[^A-Za-z0-9._-]", "-", base)


# Fontaneria de WordPress y sus plugins: nada de esto hace falta en el clon.
NOISE = ("rocket_pairs", "lazyLoadThumb", "lazyloadRunObserver", "wpr_", "wprRemoveCPCSS",
         "elementorFrontendConfig", "ElementorProFrontendConfig", "astra", "cmplz",
         "complianz", "dataLayer", "trident|msie", "ast-header")

VENDOR = ("socios.pro/wp-", "googletagmanager", "google.com/recaptcha", "i.ytimg.com")


def extract_widget_scripts(middle):
    """Los widgets `HTML` de Elementor pueden traer JS propio (asi se construye
    la tabla comparativa de precios). `clean()` borra todos los <script>, de modo
    que lo que sea logica de la pagina se rescata antes."""
    external, inline, declared = [], [], set()

    for m in re.finditer(r'<script[^>]*\bsrc="([^"]+)"[^>]*>', middle):
        url = m.group(1)
        if not any(v in url for v in VENDOR) and url not in external:
            external.append(url)

    for m in re.finditer(r"<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>", middle, re.S):
        code = m.group(1)
        if len(code.strip()) < 80 or any(n in code for n in NOISE):
            continue
        # El navegador aborta un script que redeclara un `const` global. El
        # original tiene copias del mismo bloque en widgets ocultos, que por eso
        # nunca llegan a ejecutarse.
        names = set(re.findall(r"^\s*(?:const|let|var)\s+([A-Za-z_$][\w$]*)", code, re.M))
        if names & declared:
            continue
        declared |= names
        inline.append(code.strip())

    return external, inline


# ------------------------------------------------------------------ menu

def add_submenu_arrows(header):
    """SmartMenus (el JS de Elementor Pro) inyecta en caliente un
    `<span class="sub-arrow">` con el icono configurado en `submenu_icon`.
    Se anade aqui al HTML para que el menu ocupe exactamente lo mismo."""
    m = re.search(r'data-settings="([^"]*submenu_icon[^"]*)"', header)
    if not m:
        return header
    icon = json.loads(htmlmod.unescape(m.group(1))).get("submenu_icon", {}).get("value", "")
    if not icon:
        return header
    arrow = '<span class="sub-arrow">%s</span>' % icon

    def repl(match):
        li_open, inner = match.group(1), match.group(2)
        if "menu-item-has-children" not in li_open:
            return match.group(0)
        return li_open + re.sub(r"</a>", arrow + "</a>", inner, count=1)

    return re.sub(r'(<li class="[^"]*">)(<a\b.*?</a>)', repl, header, flags=re.S)


# ------------------------------------------------------------------ main


# ------------------------------------------------- huella del CMS

# El clon delataba su origen en cada div: `elementor-element`, `ast-desktop`,
# `wp-image-123`. No es una vulnerabilidad -detras de un host estatico no hay
# PHP que atacar- pero lo primero que hace cualquier escaner es identificar la
# pila, y no se gana nada confirmandole la sospecha. Ademas lee como un
# volcado, y son muchos bytes: "elementor" son diez caracteres repetidos miles
# de veces entre HTML y CSS.
#
# Se hace aqui, mecanicamente, porque HTML y CSS salen de la misma pasada y no
# pueden descuadrarse. A mano se descuadrarian a la primera.

# Traducciones por PREFIJO DE TOKEN, de lo mas especifico a lo menos: si "wp"
# fuera antes que "wp-image", `wp-image-12` acabaria como `s-image-12`.
SUSTITUCIONES = [
    # Aqui el nombre va de sufijo, no de prefijo: es el icono social de esa
    # marca. La clase no la usa ninguna pagina, pero seguia nombrandola.
    ("elementor-social-icon-elementor", "bl-social-icon-marca"),
    ("elementor-social-icon-wordpress", "bl-social-icon-cms"),
    ("elementor", "bl"),          # bl = bloque
    ("eicon", "icono"),
    ("astra", "tema"),
    ("wp-image", "img"),
    ("wp-theme-astra", "s-tema"),      # el nombre del tema iba dentro del token
    ("page-template", "plantilla"),
    ("page-id", "pag"),
    ("current-menu-ancestor", "nav-item-ancestro"),
    ("current-menu-parent", "nav-item-padre"),
    ("current-menu-item", "nav-item-actual"),
    ("current_page_item", "pagina-actual"),
    ("menu-item", "nav-item"),
    ("post", "entrada"),
    ("wp", "s"),                  # s = sitio
    ("ast", "tema"),
    # Destino distinto al de "elementor" a proposito: los dos prefijos existen
    # en paralelo (`e-grid` y `elementor-grid` son clases diferentes) y
    # mandarlos al mismo sitio fusionaria estilos sin relacion. Lo caza
    # comprobar_colisiones(), que es justo para lo que esta.
    ("e", "ui"),
]

# `data-*` que conserva nuestro propio JS (ver components/): el resto de los
# que delatan al CMS se quedan igual porque ninguno lo hace.
ATRIBUTOS_CON_ID = ("for", "aria-controls", "aria-labelledby")

# `data-*` que delatan al constructor. Los dos primeros los selecciona el CSS
# (`[data-elementor-type="loop-item"]`, `[data-elementor-id]`), asi que se
# renombran a la vez en HTML y CSS; el tercero no lo usa nadie y se va entero.
# Los demas data-* del original (`data-id`, `data-settings`, `data-widget_type`)
# no llevan el nombre del proveedor y los lee el CSS o components/, asi que se
# quedan como estan.
ATRIBUTOS_RENOMBRADOS = {"data-elementor-type": "data-bl-type",
                         "data-elementor-id": "data-bl-id"}
ATRIBUTOS_ELIMINADOS = ("data-elementor-post-type",)


def traducir_token(token):
    """Traduce un token si empieza por uno de los prefijos.

    La coincidencia es por *prefijo de token*, nunca por subcadena: un
    reemplazo ciego de "wp" por "s" convertiria `swiper` en `ssiper`. Por eso
    se exige que el prefijo empiece en la posicion 0 y que lo siguiente sea
    `-`, `_` o el final del token.
    """
    for viejo, nuevo in SUSTITUCIONES:
        if token == viejo:
            return nuevo
        if token.startswith(viejo) and token[len(viejo)] in "-_":
            return nuevo + token[len(viejo):]
    return token


def comprobar_colisiones(tokens):
    """Dos tokens distintos que acaben con el mismo nombre fundirian estilos
    que no tienen nada que ver. Barato de comprobar, caro de descubrir tarde."""
    destino = {}
    choques = []
    for t in sorted(tokens):
        n = traducir_token(t)
        if n == t:
            continue
        if n in destino and destino[n] != t:
            choques.append((destino[n], t, n))
        destino[n] = t
    return choques


def normalizar_comillas(html):
    """Todos los atributos con comillas dobles.

    Va antes que nada porque elimina una familia entera de fallos silenciosos:
    el CMS mezcla `class="x"` y `class='x'`, y cada regex que lea atributos
    tendria que cubrir las dos o se dejaria alguno por el camino sin avisar.
    Solo se tocan los valores que no contienen comillas dobles dentro.
    """
    return re.sub(r"(\s[\w:-]+)='([^'\"]*)'", r'\1="\2"', html)


def tokens_de_clase(html):
    vistos = set()
    for m in re.finditer(r'class="([^"]*)"', html):
        vistos.update(m.group(1).split())
    return vistos


def debrand_html(html, inertes):
    """Poda las clases que no pinta nadie y traduce las que si."""
    html = normalizar_comillas(html)

    def clase(m):
        vivos = [traducir_token(t) for t in m.group(1).split() if t not in inertes]
        return 'class="%s"' % " ".join(vivos) if vivos else ""

    html = re.sub(r'class="([^"]*)"', clase, html)
    html = re.sub(r'id="([^"]*)"', lambda m: 'id="%s"' % traducir_token(m.group(1)), html)
    for attr in ATRIBUTOS_CON_ID:
        html = re.sub(r'%s="([^"]*)"' % attr,
                      lambda m, a=attr: '%s="%s"' % (a, traducir_token(m.group(1))), html)
    # `form_fields[...]` es la convencion del constructor de formularios; el
    # backend propio la lee en app/api/contact/route.ts, que se renombra igual.
    html = html.replace('name="form_fields[', 'name="campos[')
    for attr in ATRIBUTOS_ELIMINADOS:
        html = re.sub(r'\s*%s="[^"]*"' % re.escape(attr), "", html)
    for viejo, nuevo in ATRIBUTOS_RENOMBRADOS.items():
        html = re.sub(r'%s="([^"]*)"' % re.escape(viejo),
                      lambda m, n=nuevo: '%s="%s"' % (n, traducir_token(m.group(1))), html)
    return html


def debrand_css(css, keyframes):
    """Traduce selectores de clase, custom properties, nombres de animacion y
    los selectores por subcadena, que si se quedan sin traducir dejan de
    coincidir con las clases que se acaban de renombrar."""
    partes, resto = [], css
    # Se salta el contenido de url(): una imagen cuyo nombre empezara por un
    # prefijo mapeado se renombraria en la referencia pero no en el disco.
    for trozo in re.split(r"(url\([^)]*\))", resto):
        if trozo.startswith("url("):
            partes.append(trozo)
            continue
        trozo = re.sub(r"\.(-?[_a-zA-Z][\w-]*)",
                       lambda m: "." + traducir_token(m.group(1)), trozo)
        trozo = re.sub(r"--([\w-]+)",
                       lambda m: "--" + traducir_token(m.group(1)), trozo)
        # Selectores de id. Los colores hexadecimales no se ven afectados: en
        # `#eee` o `#e0e0e0` el caracter que sigue al prefijo no es `-` ni `_`,
        # asi que traducir_token() los deja igual.
        trozo = re.sub(r"#(-?[_a-zA-Z][\w-]*)",
                       lambda m: "#" + traducir_token(m.group(1)), trozo)
        # Familias de iconos del tema. Ningun @font-face las declara -solo se
        # bajaron Poppins, Roboto, Roboto Slab e Inter-, asi que son referencias
        # muertas y renombrarlas no cambia lo que se pinta.
        for viejo, nuevo in (("Astra", "tema"), ("eicons", "iconos")):
            trozo = re.sub(r"(font-family:\s*)%s\b" % viejo, r"\g<1>" + nuevo, trozo)
        trozo = re.sub(r'(\[class[\^$*~|]?=)("?)([^"\]]+)\2\]',
                       lambda m: "%s%s%s%s]" % (m.group(1), m.group(2),
                                                traducir_token(m.group(3)), m.group(2)), trozo)
        for viejo, nuevo in ATRIBUTOS_RENOMBRADOS.items():
            trozo = trozo.replace("[" + viejo, "[" + nuevo)
        for viejo, nuevo in keyframes.items():
            trozo = re.sub(r"\b%s\b" % re.escape(viejo), nuevo, trozo)
        partes.append(trozo)
    return "".join(partes)


PAGE_TEMPLATE = '''import type {{ Metadata }} from "next";
import PageBody from "@/components/PageBody";
import {{ robotsMeta }} from "@/lib/indexacion";
import content from "@/content/pages/{key}.json";
{astra_import}import "@/styles/pages/{key}.css";

// Clases que el original pone en <body> para esta pagina concreta.
const BODY_CLASS = {body_class};

{metadata}

export default function Page() {{
  return <PageBody html={{content.html}} bodyClass={{BODY_CLASS}}{scripts} />;
}}
'''


def main():
    order = json.load(open(os.path.join(CACHE, "orden-css.json")))
    files = sorted(glob.glob(os.path.join(RAW, "*.html")))
    if not files:
        raise SystemExit("no hay volcado: ejecuta antes tools/descargar.py")

    pages, body_classes = {}, {}
    header_html = footer_html = jsonld = None

    for path in files:
        key = slug_of(path)
        raw = open(path, encoding="utf-8").read()
        head, body = raw[: raw.find("<body")], raw[raw.find("<body"):]

        match = re.search(r'<body[^>]*\sclass="([^"]*)"', body)
        body_classes[key] = match.group(1) if match else ""

        header = grab(r'<header\s[^>]*data-elementor-type="header".*?</header>', body)
        footer = grab(r'<footer\s[^>]*data-elementor-type="footer".*?</footer>', body)
        middle = body[body.find(header) + len(header): body.find(footer)]
        external, inline = extract_widget_scripts(middle)

        if key == "index":
            header_html = add_submenu_arrows(clean(header))
            footer_html = clean(footer)

        meta = extract_meta(head)
        # El JSON-LD trae comentarios `//`, no es JSON valido: se localiza como
        # texto. La URL del logo queda relativa (/images/...); layout.tsx la
        # completa con el dominio real en tiempo de ejecucion (ver SITE_URL).
        jsonld = jsonld or (localize_images(meta["schema_raw"]) if meta["schema_raw"] else None)
        raw_items = [tuple(x) for x in order["__home" if key == "index" else key]]
        pages[key] = {
            "route": route_of(key),
            "meta": meta,
            "html": clean(middle),
            "head": head,
            # El banner de cookies y el lazy-load de WP Rocket no hacen falta:
            # ver DEAD_LINKS/DEAD_INLINE.
            "css_items": [it for it in raw_items if not is_dead(it)],
            "ext_scripts": external,
            "inline_scripts": inline,
        }

    # --- contenido
    out_pages = os.path.join(ROOT, "content", "pages")
    shutil.rmtree(out_pages, ignore_errors=True)
    os.makedirs(out_pages, exist_ok=True)
    for key, page in pages.items():
        json.dump({"html": page["html"]},
                  open(os.path.join(out_pages, key + ".json"), "w", encoding="utf-8"),
                  ensure_ascii=False)

    for name, payload in (("header.json", {"html": header_html}),
                          ("footer.json", {"html": footer_html}),
                          ("jsonld.json", {"raw": jsonld})):
        json.dump(payload, open(os.path.join(ROOT, "content", name), "w", encoding="utf-8"),
                  ensure_ascii=False)

    # --- CSS. WordPress genera hojas ligeramente distintas por pagina (Astra
    # inyecta ~5 variantes de su CSS inline segun la plantilla), pero la
    # inmensa mayoria del peso (tema, Elementor, tipografias, kit global) es
    # BYTE A BYTE identico en las 50 paginas. Ese tronco comun se separa en
    # styles/shared/common.css, importado una sola vez desde app/layout.tsx:
    # el navegador lo descarga una vez y lo reutiliza en el resto de la
    # navegacion. Solo lo que de verdad cambia por pagina (la variante de
    # Astra + el CSS propio de ese post/pagina en Elementor) va en
    # styles/pages/<ruta>.css.
    needed_fonts = scan_needed_fonts(files)

    item_pages = {}
    for key, page in pages.items():
        for item in page["css_items"]:
            item_pages.setdefault(item, set()).add(key)
    common_keys = {item for item, keys in item_pages.items()
                   if len(keys) == len(pages) and item[1] not in PAGE_SPECIFIC_INLINE}

    out_shared = os.path.join(ROOT, "styles", "shared")
    shutil.rmtree(out_shared, ignore_errors=True)
    os.makedirs(out_shared, exist_ok=True)
    overrides = open(os.path.join(ROOT, "styles", "site-overrides.css"), encoding="utf-8").read()
    common_order = [it for it in pages["index"]["css_items"] if it in common_keys]
    common_css = (
        "/* Generado por tools/generar.py: no editar a mano.\n"
        "   Hojas identicas en las 50 paginas del original: tema, "
        "constructor,\n   tipografias (ya recortadas a los pesos usados) y el kit "
        "global.\n   Se importa una sola vez desde app/layout.tsx para que el "
        "navegador\n   la cachee en toda la navegacion. */\n\n"
        + build_css(common_order, pages["index"]["head"], needed_fonts)
        + "\n\n/* === styles/site-overrides.css === */\n" + overrides
    )
    open(os.path.join(out_shared, "common.css"), "w", encoding="utf-8").write(common_css)

    # La variante de Astra (~5 en total, ~65 KB cada una) es, con diferencia,
    # lo mas pesado de lo que queda fuera del comun. Como solo hay 5 variantes
    # distintas, se deduplican por contenido en vez de repetirlas en las 50
    # paginas: cada pagina importa el fichero compartido que le corresponde.
    astra_variants = {}  # hash -> nombre de fichero

    def astra_shared_file(page):
        variant_items = [it for it in page["css_items"] if it[1] in PAGE_SPECIFIC_INLINE]
        if not variant_items:
            return None
        css = build_css(variant_items, page["head"], needed_fonts)
        digest = hashlib.md5(css.encode()).hexdigest()[:8]
        name = "tema-%s.css" % digest
        if digest not in astra_variants:
            astra_variants[digest] = name
            open(os.path.join(out_shared, name), "w", encoding="utf-8").write(
                "/* Generado por tools/generar.py: no editar a mano.\n"
                "   Una de las variantes del CSS inline del tema: cambia segun la\n"
                "   plantilla, pero solo hay 5 distintas en las 50 paginas, asi que\n"
                "   se comparte un fichero por variante en vez de repetirla. */\n\n"
                + css)
        return name

    out_css = os.path.join(ROOT, "styles", "pages")
    shutil.rmtree(out_css, ignore_errors=True)
    os.makedirs(out_css, exist_ok=True)
    for key, page in pages.items():
        page["astra_file"] = astra_shared_file(page)
        page_items = [it for it in page["css_items"]
                      if it not in common_keys and it[1] not in PAGE_SPECIFIC_INLINE]
        blocks = [
            "/* Generado por tools/generar.py: no editar a mano.\n"
            "   El CSS propio de esta pagina: lo unico que no comparte con\n"
            "   ninguna otra. El grueso esta en styles/shared/common.css\n"
            "   (importado desde app/layout.tsx) y en\n"
            "   %s (la variante de tema de esta plantilla). */"
            % (page["astra_file"] or "(sin variante de Astra)"),
            external_font_imports(page["head"]),
            build_css(page_items, page["head"], needed_fonts),
        ]
        open(os.path.join(out_css, key + ".css"), "w", encoding="utf-8").write(
            "\n\n".join(b for b in blocks if b))

    print("variantes de Astra deduplicadas: %d ficheros para %d paginas" % (len(astra_variants), len(pages)))

    # --- favicons (se referencian a mano en app/layout.tsx via este JSON)
    favicons = extract_favicons(pages["index"]["head"])
    json.dump(favicons, open(os.path.join(ROOT, "lib", "favicons.json"), "w", encoding="utf-8"))

    # --- imagenes: se descargan a public/images/ en vez de enlazarlas al
    # original (ver localize_images e IMAGES, que se han ido rellenando al
    # limpiar cada pagina, el header/footer, los og:image y el JSON-LD).
    # Se preserva la ruta que tenian bajo /wp-content/uploads/ para no chocar
    # entre ficheros del mismo nombre subidos en carpetas de fecha distintas.
    out_images = os.path.join(ROOT, "public", "images")
    shutil.rmtree(out_images, ignore_errors=True)
    os.makedirs(out_images, exist_ok=True)

    def fetch_image(rel):
        dest = os.path.join(out_images, rel)
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        url = ORIGIN + "/wp-content/uploads/" + rel
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=60) as r:
            open(dest, "wb").write(r.read())

    with ThreadPoolExecutor(max_workers=8) as pool:
        list(pool.map(fetch_image, sorted(IMAGES)))

    # --- tipografias: solo las que de verdad hacen falta (ver
    # subset_google_font_css). Se limpia la carpeta antes de escribir para no
    # dejar sueltos ficheros de un recorte anterior menos agresivo.
    out_fonts = os.path.join(ROOT, "public", "fonts")
    shutil.rmtree(out_fonts, ignore_errors=True)
    os.makedirs(out_fonts, exist_ok=True)

    def fetch_font(url):
        dest = os.path.join(out_fonts, url.rsplit("/", 1)[-1])
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=60) as r:
            open(dest, "wb").write(r.read())

    with ThreadPoolExecutor(max_workers=8) as pool:
        list(pool.map(fetch_font, sorted(FONTS)))

    # --- que precargar con <link rel="preload"> (ver app/layout.tsx). Solo
    # las 2 mas criticas: el titular (Poppins 600) y el texto (Roboto 400).
    # Se recalculan aqui, en vez de dejarlas escritas a mano, para que nunca
    # queden desincronizadas si un futuro recorte de pesos cambia de fichero.
    poppins_css = open(os.path.join(
        CSSDIR, "wp-content__cache__min__1__wp-content__uploads__elementor__google-fonts__css__poppins.css"
    ), encoding="utf-8").read()
    roboto_css = open(os.path.join(
        CSSDIR, "wp-content__cache__min__1__wp-content__uploads__elementor__google-fonts__css__roboto.css"
    ), encoding="utf-8").read()
    preload_fonts = {
        "heading": pick_preload_font(poppins_css, 600),
        "text": pick_preload_font(roboto_css, 400),
    }
    json.dump(preload_fonts, open(os.path.join(ROOT, "lib", "preload-fonts.json"), "w", encoding="utf-8"))

    # --- JS incrustado en widgets
    out_widgets = os.path.join(ROOT, "public", "widgets")
    shutil.rmtree(out_widgets, ignore_errors=True)
    os.makedirs(out_widgets, exist_ok=True)

    # --- JS de terceros que cargaban algunos widgets (la tabla comparativa de
    # /planes-y-precios/ tira de Tailwind). Se trae al sitio en vez de dejarlo
    # apuntando a su CDN: un <script> de un dominio ajeno se ejecuta con todos
    # los permisos sobre la pagina, asi que si ese CDN cayera o le tocaran el
    # fichero, se lo comerian todas las visitas. Ademas, sirviendolo desde el
    # propio dominio, la CSP de next.config.ts puede quedarse en 'self' sin
    # tener que abrir la mano a hosts externos.
    vendor_dir = os.path.join(out_widgets, "vendor")
    os.makedirs(vendor_dir, exist_ok=True)
    vendored = {}
    descartados = {}
    for key, page in pages.items():
        for url in page["ext_scripts"]:
            if not url.startswith(("http://", "https://")):
                continue
            if url in vendored or url in descartados:
                continue

            # Tailwind no se trae: se compila aqui y su CSS se pega al de la
            # pagina, de modo que el script sobra por completo (ver
            # precompile_tailwind).
            if TAILWIND_CDN in url:
                widget_js = "\n\n".join(page["inline_scripts"])
                css = precompile_tailwind(page["html"], widget_js)
                hoja = os.path.join(out_css, key + ".css")
                with open(hoja, "a", encoding="utf-8") as f:
                    f.write("\n\n/* === Tailwind, compilado por tools/generar.py ===\n"
                            "   El original lo generaba en el navegador con %s;\n"
                            "   aqui viene ya hecho, asi no hay destello mientras compila. */\n%s"
                            % (url, css))
                descartados[url] = True
                continue

            nombre = vendor_script_name(url)
            req = urllib.request.Request(url, headers={"User-Agent": UA_MODERNO})
            with urllib.request.urlopen(req, timeout=60) as r:
                datos = r.read()
            banner = ("// Copia local de %s, descargada por tools/generar.py.\n"
                      "// No editar a mano: se sobrescribe en cada regeneracion.\n"
                      % url).encode("utf-8")
            open(os.path.join(vendor_dir, nombre), "wb").write(banner + datos)
            vendored[url] = "/widgets/vendor/" + nombre

    if not os.listdir(vendor_dir):
        os.rmdir(vendor_dir)
    for key, page in pages.items():
        if not page["inline_scripts"]:
            continue
        banner = ("// Extraido de los widgets HTML de %s en el sitio original.\n"
                  "// Va en un fichero aparte porque el HTML se inyecta con innerHTML\n"
                  "// y los <script> insertados asi no se ejecutan.\n\n" % page["route"])
        open(os.path.join(out_widgets, key + ".js"), "w", encoding="utf-8").write(
            banner + "\n\n".join(page["inline_scripts"]))

    # --- indice de rutas (lo usa app/sitemap.ts)
    routes = [{
        "key": key,
        "route": page["route"],
        "title": page["meta"]["title"],
        "lastmod": page["meta"]["og"].get("article:modified_time"),
        "indexable": "noindex" not in (page["meta"]["robots"] or ""),
        "type": "post" if "single " in body_classes[key] else "page",
    } for key, page in sorted(pages.items(), key=lambda kv: kv[1]["route"])]
    json.dump(routes, open(os.path.join(ROOT, "lib", "routes.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=2)

    # --- una carpeta de ruta por pagina
    for key, page in pages.items():
        folder = os.path.join(ROOT, "app") if key == "index" else os.path.join(ROOT, "app", key)
        os.makedirs(folder, exist_ok=True)
        scripts = [vendored.get(u, u) for u in page["ext_scripts"] if u not in descartados]
        if page["inline_scripts"]:
            scripts.append("/widgets/%s.js" % key)
        open(os.path.join(folder, "page.tsx"), "w", encoding="utf-8").write(
            PAGE_TEMPLATE.format(
                key=key,
                body_class=ts(body_classes[key]),
                metadata=metadata_block(page["meta"], page["route"]),
                scripts=(" scripts={%s}" % ts(scripts)) if scripts else "",
                astra_import=('import "@/styles/shared/%s";\n' % page["astra_file"]
                              if page["astra_file"] else ""),
            ))

    # --- borrar la huella del CMS (ver SUSTITUCIONES y debrand_html/_css)
    #
    # Va al final, sobre lo ya generado, porque todo lo anterior busca en el
    # marcado del original por sus nombres de siempre: si se renombrara antes,
    # cada regex de limpieza dejaria de encontrar lo que busca.
    ficheros_html = ([os.path.join(ROOT, "content", "pages", k + ".json") for k in pages]
                     + [os.path.join(ROOT, "content", "header.json"),
                        os.path.join(ROOT, "content", "footer.json")])
    css_generado = (glob.glob(os.path.join(ROOT, "styles", "shared", "*.css"))
                    + glob.glob(os.path.join(ROOT, "styles", "pages", "*.css")))

    # Que clases pinta algo: las que aparecen en algun selector del CSS final,
    # las que referencia codigo propio (por su nombre viejo o por el nuevo, que
    # es como quedan tras este paso) y las que caza un selector por subcadena.
    css_todo = "".join(open(f, encoding="utf-8").read() for f in css_generado)
    css_todo += open(os.path.join(ROOT, "styles", "site-overrides.css"), encoding="utf-8").read()
    en_css = set(re.findall(r"\.(-?[_a-zA-Z][\w-]*)", css_todo))
    subcadenas = set(re.findall(r'\[class[\^$*~|]?=["\']?([^"\']+?)["\']?\]', css_todo))
    propio = ""
    for patron in ("components/*.tsx", "lib/*.ts", "app/layout.tsx", "public/widgets/*.js",
                   "styles/site-overrides.css"):
        for f in glob.glob(os.path.join(ROOT, patron)):
            propio += open(f, encoding="utf-8").read()

    todos_tokens = set()
    for f in ficheros_html:
        todos_tokens |= tokens_de_clase(normalizar_comillas(json.load(open(f, encoding="utf-8"))["html"]))
    for clases in body_classes.values():
        todos_tokens |= set(clases.split())

    def esta_viva(t):
        return (t in en_css or t in propio or traducir_token(t) in propio
                or any(sc and sc in t for sc in subcadenas))

    # Solo se podan las que delatan al CMS: las clases propias del sitio
    # (`card-wallet`, `btn-accent`...) son vocabulario de su dueno, no huella,
    # y no cuesta nada dejarlas.
    inertes = {t for t in todos_tokens if not esta_viva(t) and traducir_token(t) != t}

    choques = comprobar_colisiones(todos_tokens - inertes)
    if choques:
        print("AVISO - dos tokens distintos acabarian con el mismo nombre:")
        for a, b, n in choques:
            print("   %s + %s -> %s" % (a, b, n))
        raise SystemExit("colision de nombres: revisa SUSTITUCIONES antes de seguir")

    keyframes = {}
    for nombre in set(re.findall(r"@keyframes\s+([\w-]+)", css_todo)):
        nuevo = traducir_token(nombre)
        if nuevo != nombre:
            keyframes[nombre] = nuevo

    for f in ficheros_html:
        datos = json.load(open(f, encoding="utf-8"))
        datos["html"] = debrand_html(datos["html"], inertes)
        json.dump(datos, open(f, "w", encoding="utf-8"), ensure_ascii=False)

    for f in css_generado:
        # Leer a una variable antes de abrir en escritura: `open(f,"w").write(
        # leer(f))` trunca el fichero al evaluar el open, antes de que la
        # lectura llegue a ocurrir, y deja la hoja vacia sin dar ningun error.
        css_hoja = open(f, encoding="utf-8").read()
        open(f, "w", encoding="utf-8").write(debrand_css(css_hoja, keyframes))

    # Las clases de <body> viven en una constante de cada page.tsx.
    for key in pages:
        f = os.path.join(ROOT, "app", "page.tsx") if key == "index" else os.path.join(ROOT, "app", key, "page.tsx")
        txt = open(f, encoding="utf-8").read()
        txt = re.sub(r'(const BODY_CLASS = ")([^"]*)(")',
                     lambda m: m.group(1) + " ".join(
                         traducir_token(t) for t in m.group(2).split() if t not in inertes) + m.group(3),
                     txt)
        open(f, "w", encoding="utf-8").write(txt)

    print("clases inertes del CMS podadas: %d de %d tokens" % (len(inertes), len(todos_tokens)))

    common_kb = os.path.getsize(os.path.join(out_shared, "common.css")) / 1024
    media_kb = sum(os.path.getsize(os.path.join(out_css, k + ".css")) for k in pages) / len(pages) / 1024
    print("paginas generadas: %d" % len(pages))
    print("styles/shared/common.css: %.0f KB (una sola descarga, cacheada en toda la navegacion)" % common_kb)
    print("css especifico por pagina: %.0f KB de media" % media_kb)
    print("tipografias localizadas en public/fonts: %d ficheros" % len(FONTS))
    print("imagenes descargadas a public/images: %d ficheros" % len(IMAGES))
    if vendored:
        print("scripts de terceros traidos a public/widgets/vendor: %d" % len(vendored))
    if descartados:
        print("scripts de terceros sustituidos por CSS compilado: %d" % len(descartados))


if __name__ == "__main__":
    main()
