"use client";

/**
 * Estado de consentimiento de cookies (RGPD): nada no esencial se carga hasta
 * que la persona decide. Ver components/CookieConsent.tsx para el banner, y
 * useConsent()/hasConsent() aquí para que cualquier script futuro (Google
 * Analytics, Meta Pixel, etc.) sepa si puede cargarse.
 *
 * Ejemplo de uso al añadir analítica:
 *
 *   "use client";
 *   import { useConsent } from "@/lib/consent";
 *   import Script from "next/script";
 *
 *   export default function Analytics() {
 *     const { analytics } = useConsent();
 *     if (!analytics) return null;
 *     return <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXX" />;
 *   }
 */
import { useEffect, useState } from "react";

export type ConsentCategory = "analytics" | "marketing";

export type Consent = {
  necessary: true; // no es opcional: cookies imprescindibles para que el sitio funcione
  analytics: boolean;
  marketing: boolean;
  decidedAt: string;
};

const COOKIE_NAME = "cookie_consent";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 180; // 180 días, como el original (Complianz)
const CHANGE_EVENT = "cookieconsentchange";

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)cookie_consent=([^;]*)/);
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

export function writeConsent(choice: { analytics: boolean; marketing: boolean }): void {
  const consent: Consent = { necessary: true, ...choice, decidedAt: new Date().toISOString() };
  document.cookie =
    `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(consent))}; ` +
    `max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: consent }));
}

/** Borra la decisión guardada: la próxima carga vuelve a mostrar el banner. */
export function resetConsent(): void {
  document.cookie = `${COOKIE_NAME}=; max-age=0; path=/`;
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: null }));
}

export function hasConsent(category: ConsentCategory): boolean {
  return readConsent()?.[category] === true;
}

/** Hook para componentes cliente: se re-renderiza cuando cambia el consentimiento. */
export function useConsent(): { analytics: boolean; marketing: boolean; decided: boolean } {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [decided, setDecided] = useState(false);

  useEffect(() => {
    const sync = () => {
      const c = readConsent();
      setConsent(c);
      setDecided(c !== null);
    };
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    return () => window.removeEventListener(CHANGE_EVENT, sync);
  }, []);

  return { analytics: consent?.analytics ?? false, marketing: consent?.marketing ?? false, decided };
}

export const COOKIE_CONSENT_CHANGE_EVENT = CHANGE_EVENT;
