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
 *  4. Formularios de Elementor Pro: se envian a app/api/contact/route.ts en
 *     vez de a WordPress (ver ese fichero para el backend real, con Resend).
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
    // Los formularios del original hacen POST a admin-ajax.php de WordPress.
    // Aqui envian a app/api/contact/route.ts, que reenvia el mensaje por
    // email con Resend (ver ese fichero y .env.example).
    const forms = Array.from(document.querySelectorAll<HTMLFormElement>(".elementor-form"));

    // Un campo invisible para personas: los bots que rellenan formularios a
    // ciegas suelen completar todo lo que encuentran en el HTML. No sustituye
    // a un CAPTCHA (no hay, ver README), pero frena el spam mas basico.
    forms.forEach((form) => {
      if (form.querySelector("input[name=website]")) return;
      const honeypot = document.createElement("input");
      honeypot.type = "text";
      honeypot.name = "website";
      honeypot.autocomplete = "off";
      honeypot.tabIndex = -1;
      honeypot.setAttribute("aria-hidden", "true");
      honeypot.style.cssText = "position:absolute;left:-9999px;width:1px;height:1px;opacity:0;";
      form.appendChild(honeypot);
    });

    const messageBox = (form: HTMLFormElement, kind: "success" | "danger") => {
      const cls = `elementor-message-${kind}`;
      let box = form.querySelector<HTMLElement>(`.${cls}`);
      if (!box) {
        box = document.createElement("div");
        box.className = `elementor-message ${cls}`;
        box.setAttribute("role", "alert");
        form.appendChild(box);
      }
      form.querySelectorAll(".elementor-message").forEach((el) => {
        if (el !== box) el.remove();
      });
      return box;
    };

    const onSubmit = async (e: Event) => {
      const form = e.target as HTMLFormElement;
      if (!form.classList?.contains("elementor-form")) return;
      e.preventDefault();

      const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
      if (submitBtn?.disabled) return; // ya se esta enviando

      const data = new FormData(form);
      data.set("__form_name", form.getAttribute("name") || "Formulario de contacto");

      submitBtn?.setAttribute("disabled", "true");
      try {
        const res = await fetch("/api/contact", { method: "POST", body: data });
        const json = await res.json().catch(() => ({ ok: false, error: "Respuesta inválida del servidor." }));
        if (json.ok) {
          messageBox(form, "success").textContent = "¡Gracias! Hemos recibido tu mensaje.";
          form.reset();
        } else {
          messageBox(form, "danger").textContent = json.error || "No se ha podido enviar el formulario.";
        }
      } catch {
        messageBox(form, "danger").textContent =
          "No se ha podido contactar con el servidor. Comprueba tu conexión e inténtalo de nuevo.";
      } finally {
        submitBtn?.removeAttribute("disabled");
      }
    };

    document.addEventListener("submit", onSubmit);
    return () => document.removeEventListener("submit", onSubmit);
  }, []);

  return null;
}
