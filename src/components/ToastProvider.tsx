import { Toaster } from "sonner";

/**
 * ToastProvider — La Taza Nómada
 * Envuelve la app con notificaciones estilizadas.
 * Usa Sonner (ya instalado en package.json v2.0.7)
 */
export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "var(--taza-cream)",
          color: "var(--taza-dark)",
          border: "1px solid var(--taza-border-strong)",
          fontFamily: "'Jost', sans-serif",
          fontSize: "14px",
        },
      }}
      icons={{
        success: (
          <span style={{ color: "var(--taza-turquoise)" }}>●</span>
        ),
        error: (
          <span style={{ color: "var(--taza-error)" }}>●</span>
        ),
        warning: (
          <span style={{ color: "var(--taza-gold)" }}>●</span>
        ),
        info: (
          <span style={{ color: "var(--taza-brown)" }}>●</span>
        ),
      }}
    />
  );
}