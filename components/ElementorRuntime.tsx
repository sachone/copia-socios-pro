"use client";

import { useEffect } from "react";

/**
 * Sustituye al bundle de JavaScript de Elementor. Cubre lo unico que el sitio
 * original necesita para verse igual:
 *
 *  1. Clases de <body> propias de cada pagina (Astra las usa para el layout).
 *  2. Animaciones de entrada (`fadeInDown`, `fadeInRight`, ...): Elementor deja
 *     los elementos con `elementor-invisible` hasta que entran en pantalla.
 *  3. Widget de entradas con proporcion fija: Elementor marca el contenedor y
 *     decide, imagen a imagen, si debe recortarse a lo alto o a lo ancho.
 *  4. Formularios de Elementor Pro, que en el original envian a WordPress.
 */
export default function ElementorRuntime({ bodyClass }: { bodyClass: string }) {
  useEffect(() => {
    document.body.className = bodyClass;
  }, [bodyClass]);

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(".elementor-invisible[data-settings]"),
    );

    const reveal = (el: HTMLElement) => {
      let animation = "";
      try {
        animation = JSON.parse(el.dataset.settings || "{}")._animation || "";
      } catch {
        /* data-settings malformado: se muestra sin animacion */
      }
      el.classList.remove("elementor-invisible");
      if (animation) el.classList.add("animated", animation);
    };

    if (!("IntersectionObserver" in window)) {
      targets.forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target as HTMLElement);
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });

  useEffect(() => {
    // Widget "Entradas" con proporcion de imagen fija. El CSS de la pagina define
    // `padding-bottom: calc(<ratio> * 100%)` en la miniatura; Elementor marca
    // entonces el contenedor y ajusta cada imagen segun su propia proporcion.
    const containers = document.querySelectorAll<HTMLElement>(".elementor-posts-container");

    const fitThumbnails = (container: HTMLElement, ratio: number) => {
      container.querySelectorAll<HTMLElement>(".elementor-post__thumbnail").forEach((thumb) => {
        const img = thumb.querySelector("img");
        if (!img) return;
        const apply = () => {
          if (!img.naturalWidth) return;
          thumb.classList.toggle(
            "elementor-fit-height",
            img.naturalHeight / img.naturalWidth < ratio,
          );
        };
        if (img.complete) apply();
        else img.addEventListener("load", apply, { once: true });
      });
    };

    containers.forEach((container) => {
      const thumb = container.querySelector<HTMLElement>(".elementor-post__thumbnail");
      if (!thumb) return;
      const padding = parseFloat(getComputedStyle(thumb).paddingBottom);
      if (!padding || !thumb.offsetWidth) return;
      const ratio = padding / thumb.offsetWidth;
      container.classList.add("elementor-has-item-ratio");
      fitThumbnails(container, ratio);
    });
  }, []);

  useEffect(() => {
    // Los formularios del original hacen POST a WordPress (admin-ajax).
    // Aqui no hay backend, asi que se evita la navegacion y se avisa.
    const onSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement;
      if (!form.classList?.contains("elementor-form")) return;
      e.preventDefault();
      const box = form.querySelector<HTMLElement>(".elementor-message-danger");
      if (box) {
        box.textContent =
          "Este formulario es una copia estatica: conectalo a tu propio backend.";
        box.style.display = "block";
      } else {
        console.warn("[clon socios.pro] Formulario sin backend:", form.name);
      }
    };
    document.addEventListener("submit", onSubmit);
    return () => document.removeEventListener("submit", onSubmit);
  }, []);

  return null;
}
