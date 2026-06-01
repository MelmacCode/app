import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * useAnalytics — Google Analytics 4
 * Inicializa GA4 y trackea automaticamente cada cambio de ruta.
 *
 * ID de medicion: G-9RYL6904XS
 */
const GA_MEASUREMENT_ID = "G-9RYL6904XS";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function initGA() {
  if (typeof window === "undefined") return;
  if (window.gtag) return;

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
 * Hook que trackea automaticamente navegacion
 * Usar en App.tsx
 */
export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname, document.title);
  }, [location.pathname, location.search]);
}