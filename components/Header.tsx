"use client";

import { useMemo, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import header from "@/content/header.json";

/**
 * Cabecera del sitio (plantilla de Elementor `elementor-location-header`).
 *
 * El HTML se inyecta tal cual salio de WordPress para conservar el diseno
 * exacto. Lo unico que se calcula aqui es:
 *  - las clases de "pagina activa" del menu, en funcion de la ruta actual;
 *  - la apertura del menu hamburguesa y de los submenus en movil.
 */

/** Marca el elemento del menu que corresponde a la ruta actual. */
function withActiveState(html: string, pathname: string): string {
  const path = pathname.endsWith("/") ? pathname : pathname + "/";

  return html.replace(
    /<li class="(menu-item[^"]*)"><a ([^>]*?)href="([^"]*)"([^>]*)>/g,
    (match, liClass: string, pre: string, href: string, post: string) => {
      const target = href.endsWith("/") ? href : href + "/";
      if (target !== path) return match;

      const isSub = /elementor-sub-item/.test(pre + post);
      const nextLi = `${liClass} current-menu-item current_page_item`;
      const nextA = `${pre}href="${href}" aria-current="page"${post}`.replace(
        /class="([^"]*)"/,
        (_m, c: string) => `class="${c}${isSub ? "" : " elementor-item-active"}"`,
      );
      return `<li class="${nextLi}"><a ${nextA}>`;
    },
  );
}

export default function Header() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  const html = useMemo(() => withActiveState(header.html, pathname), [pathname]);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const toggle = root.querySelector<HTMLElement>(".elementor-menu-toggle");
    // Ojo: `.elementor-nav-menu--dropdown` tambien lo llevan los <ul> de submenu,
    // asi que hay que apuntar al <nav> contenedor del menu movil.
    const dropdown = root.querySelector<HTMLElement>("nav.elementor-nav-menu--dropdown");

    // El widget lleva la clase `elementor-nav-menu--stretch`: en el original,
    // el desplegable del movil ocupa todo el ancho de la ventana. Pero quien
    // lo estira es el JavaScript de Elementor, que este clon no carga (ver
    // README), asi que el desplegable se quedaba tomando como referencia el
    // boton de la hamburguesa -36 px de ancho, pegado al borde derecho- y se
    // salia de la pantalla: de 375 px solo se veian los 71 ultimos, y con eso
    // no habia forma de navegar.
    //
    // Se reproduce el mismo calculo que hace el original: ancho de la ventana,
    // un desplazamiento negativo que lo devuelve al borde izquierdo, y bajarlo
    // justo por debajo del boton.
    const stretchDropdown = () => {
      const widget = dropdown?.closest<HTMLElement>(".elementor-nav-menu--stretch");
      if (!dropdown || !widget) return;
      dropdown.style.width = `${document.documentElement.clientWidth}px`;
      dropdown.style.left = `${-widget.getBoundingClientRect().left}px`;
      dropdown.style.top = `${widget.offsetHeight}px`;
    };

    const closeAll = () => {
      toggle?.classList.remove("elementor-active");
      toggle?.setAttribute("aria-expanded", "false");
      dropdown?.setAttribute("aria-hidden", "true");
    };

    const onToggle = () => {
      if (!toggle || !dropdown) return;
      const open = !toggle.classList.contains("elementor-active");
      // Se recalcula al abrir, no solo al montar: entre medias ha podido
      // cambiar el ancho de la ventana o aparecer la barra de scroll.
      if (open) stretchDropdown();
      toggle.classList.toggle("elementor-active", open);
      toggle.setAttribute("aria-expanded", String(open));
      dropdown.setAttribute("aria-hidden", String(!open));
      // Elementor limita la altura del desplegable con esta variable; el
      // original la fija en `1000vmax`, es decir, sin limite practico.
      dropdown.style.setProperty("--menu-height", open ? "1000vmax" : "0px");
    };

    // Submenus dentro del desplegable movil.
    const onDropdownClick = (e: Event) => {
      const arrow = (e.target as HTMLElement).closest(".sub-arrow");
      const link = (e.target as HTMLElement).closest("a");
      const li = (e.target as HTMLElement).closest("li.menu-item-has-children");
      if (!li) return;

      // Un enlace de primer nivel sin href tambien despliega su submenu.
      const isBareParent = link && !link.getAttribute("href");
      if (!arrow && !isBareParent) return;

      e.preventDefault();
      const open = !li.classList.contains("menu-item-open");
      li.classList.toggle("menu-item-open", open);
      li.querySelector("a")?.setAttribute("aria-expanded", String(open));
    };

    const onResize = () => stretchDropdown();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    toggle?.addEventListener("click", onToggle);
    toggle?.addEventListener("keydown", (e) => {
      const k = (e as KeyboardEvent).key;
      if (k === "Enter" || k === " ") {
        e.preventDefault();
        onToggle();
      }
    });
    dropdown?.addEventListener("click", onDropdownClick);

    closeAll();
    stretchDropdown();
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      toggle?.removeEventListener("click", onToggle);
      dropdown?.removeEventListener("click", onDropdownClick);
    };
  }, [html]);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}
