import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * useAnalytics — Google Analytics 4
 * Inicializa GA4 y trackea automáticamente cada cambio de ruta.
 * Reemplaza el ID de medición con el tuyo cuando lo tengas.
 *
 * Para obtener tu GA4 ID:
 * 1. Ve a https://analytics.google.com
 * 2. Crea una propiedad para "La Taza Nómada"
 * 3. Copia el ID de medición (formato: G-XXXXXXXXXX)
 * 4. Reemplaza abajo
 */
const GA_MEASUREMENT_ID = "G-PLACEHOLDER"; // ← REEMPLAZAR CUANDO TENGAS GA4

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function initGA() {
  if (typeof window === "undefined") return;
  if (window.gtag) return; // Ya inicializado

  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
    send_page_view: true,
  });
}

export function trackPageView(path: string, title: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  });
}

export function trackEvent(
  action: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", action, params);
}

/**
 * Hook que trackea automáticamente navegación
 * Usar en App.tsx
 */
export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname, document.title);
  }, [location.pathname, location.search]);
}