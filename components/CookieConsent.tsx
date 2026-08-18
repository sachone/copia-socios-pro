"use client";

import { useEffect, useState } from "react";
import { readConsent, writeConsent } from "@/lib/consent";
import styles from "./CookieConsent.module.css";

type Choice = { analytics: boolean; marketing: boolean };

const REOPEN_EVENT = "cookieconsent:open";

/** Desde cualquier sitio (p. ej. un enlace en el pie), reabre el panel. */
export function openCookiePreferences() {
  window.dispatchEvent(new Event(REOPEN_EVENT));
}

export default function CookieConsent() {
  // "closed" | "banner" | "details"
  const [view, setView] = useState<"closed" | "banner" | "details">("closed");
  const [choice, setChoice] = useState<Choice>({ analytics: false, marketing: false });

  useEffect(() => {
    const existing = readConsent();
    setView(existing ? "closed" : "banner");
    if (existing) setChoice({ analytics: existing.analytics, marketing: existing.marketing });

    const onReopen = () => {
      const c = readConsent();
      if (c) setChoice({ analytics: c.analytics, marketing: c.marketing });
      setView("details");
    };
    window.addEventListener(REOPEN_EVENT, onReopen);
    return () => window.removeEventListener(REOPEN_EVENT, onReopen);
  }, []);

  if (view === "closed") return <ReopenButton onOpen={() => setView("details")} />;

  const save = (next: Choice) => {
    writeConsent(next);
    setChoice(next);
    setView("closed");
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Preferencias de cookies">
      <div className={styles.panel}>
        <p className={styles.text}>
          Usamos cookies necesarias para que la web funcione y, si nos das permiso,
          cookies de analítica y de marketing para entender el uso del sitio y
          mostrar contenido relevante. Puedes cambiar tu decisión cuando quieras
          desde el icono 🍪 de la esquina inferior izquierda.{" "}
          <a href="/politica-de-cookies/">Más información</a>.
        </p>

        {view === "details" && (
          <fieldset className={styles.categories}>
            <label className={styles.category}>
              <input type="checkbox" checked disabled />
              <span>
                <strong>Necesarias</strong> — imprescindibles para que la web funcione.
                Siempre activas.
              </span>
            </label>
            <label className={styles.category}>
              <input
                type="checkbox"
                checked={choice.analytics}
                onChange={(e) => setChoice((c) => ({ ...c, analytics: e.target.checked }))}
              />
              <span>
                <strong>Analítica</strong> — nos ayuda a entender cómo se usa la web
                (p. ej. Google Analytics).
              </span>
            </label>
            <label className={styles.category}>
              <input
                type="checkbox"
                checked={choice.marketing}
                onChange={(e) => setChoice((c) => ({ ...c, marketing: e.target.checked }))}
              />
              <span>
                <strong>Marketing</strong> — para mostrar contenido y anuncios
                relevantes.
              </span>
            </label>
          </fieldset>
        )}

        <div className={styles.actions}>
          {view === "banner" && (
            <button
              type="button"
              className={styles.linkButton}
              onClick={() => setView("details")}
            >
              Personalizar
            </button>
          )}
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => save({ analytics: false, marketing: false })}
          >
            Rechazar todo
          </button>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() =>
              view === "details" ? save(choice) : save({ analytics: true, marketing: true })
            }
          >
            {view === "details" ? "Guardar preferencias" : "Aceptar todo"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ReopenButton({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      className={styles.reopenButton}
      onClick={onOpen}
      aria-label="Preferencias de cookies"
      title="Preferencias de cookies"
    >
      🍪
    </button>
  );
}
