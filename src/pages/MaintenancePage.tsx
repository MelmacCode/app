import { Coffee, Wrench } from "lucide-react";

export default function MaintenancePage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: "var(--taza-dark)" }}
    >
      <div className="text-center max-w-lg">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: "var(--taza-gold)" }}
        >
          <Wrench className="w-10 h-10" style={{ color: "var(--taza-dark)" }} />
        </div>

        <Coffee className="w-12 h-12 mx-auto mb-6" style={{ color: "var(--taza-gold)" }} />

        <h1
          className="font-display text-4xl md:text-5xl mb-4"
          style={{ color: "var(--taza-cream)" }}
        >
          Volvemos pronto
        </h1>

        <p className="font-body text-lg mb-8" style={{ color: "var(--taza-cream)", opacity: 0.8 }}>
          Estamos preparando algo especial para ti. La Taza Nómada está en mantenimiento.
          Vuelve a visitarnos en unas horas.
        </p>

        <div
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-nav text-xs tracking-widest uppercase"
          style={{ border: "1px solid var(--taza-gold)", color: "var(--taza-gold)" }}
        >
          <Coffee className="w-4 h-4" />
          Gracias por tu paciencia
        </div>
      </div>
    </div>
  );
}