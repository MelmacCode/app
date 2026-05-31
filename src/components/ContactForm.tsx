import { useState } from "react";
import { Send, Loader2, CheckCircle } from "lucide-react";

interface ContactFormProps {
  onSuccess?: () => void;
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formId = import.meta.env.VITE_FORMSPREE_ID;

    // Si no hay Formspree ID, simular envio exitoso para demo
    if (!formId || formId === "your_form_id_here") {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSent(true);
      if (onSuccess) onSuccess();
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          telefono: form.telefono,
          asunto: form.asunto,
          mensaje: form.mensaje,
        }),
      });

      if (response.ok) {
        setIsSent(true);
        if (onSuccess) onSuccess();
      } else {
        setError("Hubo un error al enviar el mensaje. Intenta de nuevo.");
      }
    } catch {
      setError("Error de conexion. Verifica tu internet e intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSent) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: "var(--taza-turquoise)" }} />
        <p className="font-display text-xl" style={{ color: "var(--taza-dark)" }}>
          Mensaje enviado
        </p>
        <p className="font-body text-sm mt-2" style={{ color: "var(--taza-dark-light)" }}>
          Gracias por contactarnos. Te responderemos pronto.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: "rgba(196, 69, 54, 0.1)", color: "var(--taza-error)" }}>
          {error}
        </div>
      )}

      <div>
        <label className="font-caption block mb-2" style={{ color: "var(--taza-dark)" }}>Nombre</label>
        <input
          type="text"
          required
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          placeholder="Tu nombre"
          className="w-full px-4 py-3 rounded-lg border bg-white/50 font-body focus:outline-none focus:border-taza-brown focus:ring-1 focus:ring-taza-brown transition-colors"
          style={{ borderColor: "var(--taza-border)", color: "var(--taza-dark)" }}
        />
      </div>

      <div>
        <label className="font-caption block mb-2" style={{ color: "var(--taza-dark)" }}>Email</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="tu@email.com"
          className="w-full px-4 py-3 rounded-lg border bg-white/50 font-body focus:outline-none focus:border-taza-brown focus:ring-1 focus:ring-taza-brown transition-colors"
          style={{ borderColor: "var(--taza-border)", color: "var(--taza-dark)" }}
        />
      </div>

      <div>
        <label className="font-caption block mb-2" style={{ color: "var(--taza-dark)" }}>Telefono</label>
        <input
          type="tel"
          value={form.telefono}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })}
          placeholder="+58 412-6094680"
          className="w-full px-4 py-3 rounded-lg border bg-white/50 font-body focus:outline-none focus:border-taza-brown focus:ring-1 focus:ring-taza-brown transition-colors"
          style={{ borderColor: "var(--taza-border)", color: "var(--taza-dark)" }}
        />
      </div>

      <div>
        <label className="font-caption block mb-2" style={{ color: "var(--taza-dark)" }}>Asunto</label>
        <input
          type="text"
          required
          value={form.asunto}
          onChange={(e) => setForm({ ...form, asunto: e.target.value })}
          placeholder="Pedido, reserva, consulta..."
          className="w-full px-4 py-3 rounded-lg border bg-white/50 font-body focus:outline-none focus:border-taza-brown focus:ring-1 focus:ring-taza-brown transition-colors"
          style={{ borderColor: "var(--taza-border)", color: "var(--taza-dark)" }}
        />
      </div>

      <div>
        <label className="font-caption block mb-2" style={{ color: "var(--taza-dark)" }}>Mensaje</label>
        <textarea
          required
          rows={4}
          value={form.mensaje}
          onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
          placeholder="Escribe tu mensaje aqui..."
          className="w-full px-4 py-3 rounded-lg border bg-white/50 font-body focus:outline-none focus:border-taza-brown focus:ring-1 focus:ring-taza-brown transition-colors resize-none"
          style={{ borderColor: "var(--taza-border)", color: "var(--taza-dark)" }}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 rounded-lg font-nav flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ backgroundColor: "var(--taza-brown)", color: "var(--taza-cream)" }}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Enviar mensaje
          </>
        )}
      </button>
    </form>
  );
}