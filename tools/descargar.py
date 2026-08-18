#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Descarga el sitio original a tools/.cache/ (HTML, CSS y tipografias).

    python3 tools/descargar.py

Se apoya en el sitemap de Yoast y anade a mano las URLs que este deja fuera
(las paginas legales llevan `noindex`). Solo hace falta volver a ejecutarlo
cuando cambie el original.
"""
import os
import re
import json
import urllib.request
import urllib.error
from concurrent.futures import ThreadPoolExecutor

ORIGIN = "https://socios.pro"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(ROOT, "tools", ".cache")
RAW, CSSDIR = os.path.join(CACHE, "raw"), os.path.join(CACHE, "css")

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/125.0 Safari/537.36")

# Paginas enlazadas desde el pie que Yoast excluye del sitemap por `noindex`.
EXTRA_PATHS = ["/aviso-legal/", "/politica-de-privacidad/", "/politica-de-cookies/"]


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def slug_of(url):
    path = url[len(ORIGIN):].strip("/")
    return path or "__home"


def sitemap_urls():
    index = get(ORIGIN + "/sitemap_index.xml").decode("utf-8")
    urls = []
    for sm in re.findall(r"<loc>([^<]+)</loc>", index):
        urls += re.findall(r"<loc>([^<]+)</loc>", get(sm).decode("utf-8"))
    urls += [ORIGIN + p for p in EXTRA_PATHS]
    return sorted(set(urls))


def main():
    for d in (RAW, CSSDIR):
        os.makedirs(d, exist_ok=True)

    urls = sitemap_urls()
    print("URLs a descargar:", len(urls))

    def fetch_page(url):
        path = os.path.join(RAW, slug_of(url) + ".html")
        open(path, "wb").write(get(url))
        return url

    with ThreadPoolExecutor(max_workers=6) as pool:
        list(pool.map(fetch_page, urls))

    # Hojas de estilo referenciadas por cualquiera de las paginas.
    sheets, order = set(), {}
    for name in sorted(os.listdir(RAW)):
        html = open(os.path.join(RAW, name), encoding="utf-8").read()
        head = html[: html.find("<body")]
        items = []
        for m in re.finditer(
            r"<link[^>]*rel='stylesheet'[^>]*>|<style[^>]*id=\"([a-z0-9\-]+)\"[^>]*>", head
        ):
            tag = m.group(0)
            if tag.startswith("<link"):
                href = re.search(r"href='([^']+)'", tag)
                if href:
                    sheets.add(href.group(1))
                    items.append(["link", href.group(1).split("?")[0]])
            else:
                items.append(["inline", m.group(1)])
        order[name[:-5]] = items

    def fetch_css(url):
        local = url.replace(ORIGIN + "/", "").split("?")[0].replace("/", "__")
        open(os.path.join(CSSDIR, local), "wb").write(get(url))

    with ThreadPoolExecutor(max_workers=8) as pool:
        list(pool.map(fetch_css, sorted(sheets)))

    json.dump(order, open(os.path.join(CACHE, "orden-css.json"), "w"))
    print("paginas: %d | hojas de estilo: %d" % (len(urls), len(sheets)))
    print("cache en", CACHE)


if __name__ == "__main__":
    main()
