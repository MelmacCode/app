import { Link } from "react-router-dom";
import { Coffee, ArrowLeft } from "lucide-react";

/**
 * NotFoundPage — La Taza Nómada
 * Página 404 personalizada con diseño elegante.
 * Muestra cuando el usuario accede a una URL inexistente.
 */
export default function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: "var(--taza-cream)" }}
    >
      <div className="text-center max-w-md">
        {/* Icono de café */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8"
          style={{ backgroundColor: "var(--taza-brown)" }}
        >
          <Coffee className="w-12 h-12" style={{ color: "var(--taza-cream)" }} />
        </div>

        {/* Código 404 */}
        <h1
          className="font-display text-8xl mb-4"
          style={{ color: "var(--taza-brown)" }}
        >
          404
        </h1>

        {/* Título */}
        <h2
          className="font-display text-3xl mb-4"
          style={{ color: "var(--taza-dark)" }}
        >
          Página no encontrada
        </h2>

        {/* Descripción */}
        <p className="font-body text-lg mb-8" style={{ color: "var(--taza-dark-light)" }}>
          Parece que esta taza se enfrió. La página que buscas no existe o fue
          movida a otra ruta.
        </p>

        {/* Botón volver */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-nav transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: "var(--taza-brown)",
            color: "var(--taza-cream)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--taza-brown-dark)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--taza-brown)";
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}