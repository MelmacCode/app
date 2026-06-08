import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie, X, Sparkles } from "lucide-react";

/**
 * CookieConsent — La Taza Nomada
 * Banner de cookies con colores alegres de la marca.
 * Dorado, crema y turquesa para una experiencia cálida y acogedora.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("latazanomada-cookies");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("latazanomada-cookies", "all");
    setVisible(false);
  };

  const acceptEssential = () => {
    localStorage.setItem("latazanomada-cookies", "essential");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] p-4 md:p-6">
      <div
        className="max-w-4xl mx-auto rounded-2xl border p-6 shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #F0EAD6 0%, #FAF7F2 100%)",
          borderColor: "#D5B073",
          borderWidth: "2px",
        }}
      >
        <div className="flex items-start gap-4">
          {/* Icono animado */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
            style={{ backgroundColor: "#D5B073" }}
          >
            <Sparkles className="w-6 h-6 text-white animate-pulse" />
          </div>

          <div className="flex-1">
            <h3
              className="font-display text-lg mb-2"
              style={{ color: "#63341F" }}
            >
              ¡Bienvenido a La Taza Nómada! ☕
            </h3>
            <p
              className="font-body text-sm mb-4"
              style={{ color: "#38201E" }}
            >
              Usamos cookies esenciales para el carrito y el idioma, y cookies
              analíticas (Google Analytics) para mejorar tu experiencia. Al
              continuar, aceptas nuestra{" "}
              <Link
                to="/privacidad"
                className="underline font-medium hover:no-underline transition-colors"
                style={{ color: "#63341F" }}
              >
                Política de Privacidad
              </Link>
              .
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={acceptAll}
                className="px-5 py-2.5 rounded-lg font-nav text-sm transition-all hover:scale-105 shadow-md"
                style={{
                  backgroundColor: "#63341F",
                  color: "#F0EAD6",
                }}
              >
                Aceptar todas 🍪
              </button>
              <button
                onClick={acceptEssential}
                className="px-5 py-2.5 rounded-lg font-nav text-sm border-2 transition-all hover:scale-105"
                style={{
                  borderColor: "#54B9A8",
                  color: "#38201E",
                  backgroundColor: "rgba(84,185,168,0.1)",
                }}
              >
                Solo esenciales
              </button>
              <Link
                to="/privacidad"
                className="px-5 py-2.5 rounded-lg font-nav text-sm transition-all hover:underline flex items-center gap-1"
                style={{ color: "#63341F" }}
              >
                Ver política
              </Link>
            </div>
          </div>

          <button
            onClick={acceptEssential}
            className="p-2 rounded-full hover:bg-[#D5B073]/20 transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" style={{ color: "#63341F" }} />
          </button>
        </div>
      </div>
    </div>
  );
}