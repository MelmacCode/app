import { useState } from "react";
import { generateWhatsAppCheckoutUrl, validateCustomerInfo, getWhatsAppNumber } from "@/lib/whatsapp";
import { CheckCircle, AlertCircle, MessageCircle, Truck, User, MapPin, Phone, FileText } from "lucide-react";

interface WhatsAppCheckoutProps {
  items: { id: string; name: string; price: number; quantity: number }[];
  total: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function WhatsAppCheckout({ items, total, onClose, onSuccess }: WhatsAppCheckoutProps) {
  const [step, setStep] = useState<"form" | "review" | "success">("form");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors([]);
  };

  const handleContinue = () => {
    const validation = validateCustomerInfo(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setStep("review");
  };

  const handleSendOrder = () => {
    setIsSubmitting(true);
    const phoneNumber = getWhatsAppNumber();
    if (!phoneNumber) {
      setErrors(["Numero de WhatsApp no configurado. Contacta al administrador."]);
      setIsSubmitting(false);
      return;
    }

    const url = generateWhatsAppCheckoutUrl(items, formData, phoneNumber);
    window.open(url, "_blank");
    setIsSubmitting(false);
    setStep("success");
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-taza-dark/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-xl overflow-hidden bg-taza-cream shadow-taza-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-taza-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-taza-turquoise/10 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-taza-turquoise" />
            </div>
            <div>
              <h3 className="font-display text-xl text-taza-dark">Checkout WhatsApp</h3>
              <p className="text-xs text-taza-dark/60 font-body">Pedido rapido sin registro</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-taza-dark hover:text-taza-brown transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex items-center px-6 py-4 gap-2">
          {["Datos", "Revision", "Confirmacion"].map((label, i) => {
            const stepIndex = ["form", "review", "success"].indexOf(step);
            const isActive = i === stepIndex;
            const isCompleted = i < stepIndex;
            return (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  isActive ? "bg-taza-brown text-white" : isCompleted ? "bg-taza-turquoise text-white" : "bg-taza-border text-taza-dark/50"
                }`}>
                  {isCompleted ? <CheckCircle size={14} /> : i + 1}
                </div>
                <span className={`text-xs font-body ${isActive ? "text-taza-dark" : "text-taza-dark/50"}`}>{label}</span>
                {i < 2 && <div className={`w-8 h-px ${isCompleted ? "bg-taza-turquoise" : "bg-taza-border"}`} />}
              </div>
            );
          })}
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {step === "form" && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-taza-gold/10 rounded-lg p-4 mb-4">
                <p className="text-sm text-taza-dark font-body">
                  💬 Te redirigiremos a WhatsApp con tu pedido pre-cargado. Solo envia el mensaje.
                </p>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-label text-taza-dark">
                  <User size={14} /> Nombre completo *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-taza-border bg-white/50 text-taza-dark font-body focus:outline-none focus:border-taza-brown focus:ring-1 focus:ring-taza-brown transition-colors"
                  placeholder="Ej: Maria Gonzalez"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-label text-taza-dark">
                  <Phone size={14} /> Telefono *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-taza-border bg-white/50 text-taza-dark font-body focus:outline-none focus:border-taza-brown focus:ring-1 focus:ring-taza-brown transition-colors"
                  placeholder="Ej: 0412-1234567"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-label text-taza-dark">
                  <MapPin size={14} /> Direccion completa *
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 rounded-lg border border-taza-border bg-white/50 text-taza-dark font-body focus:outline-none focus:border-taza-brown focus:ring-1 focus:ring-taza-brown transition-colors resize-none"
                  placeholder="Calle, numero, apartamento, urbanizacion..."
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-label text-taza-dark">
                  <Truck size={14} /> Ciudad
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-taza-border bg-white/50 text-taza-dark font-body focus:outline-none focus:border-taza-brown focus:ring-1 focus:ring-taza-brown transition-colors"
                  placeholder="Ej: Caracas"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-label text-taza-dark">
                  <FileText size={14} /> Notas adicionales
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 rounded-lg border border-taza-border bg-white/50 text-taza-dark font-body focus:outline-none focus:border-taza-brown focus:ring-1 focus:ring-taza-brown transition-colors resize-none"
                  placeholder="Instrucciones especiales de entrega..."
                />
              </div>

              {errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-red-600 mb-1">
                    <AlertCircle size={16} />
                    <span className="text-sm font-medium">Corrige los siguientes errores:</span>
                  </div>
                  <ul className="text-sm text-red-600 font-body list-disc list-inside">
                    {errors.map((err, i) => <li key={i}>{err}</li>)}
                  </ul>
                </div>
              )}

              <button
                onClick={handleContinue}
                className="w-full py-4 text-white font-nav bg-taza-brown hover:bg-taza-brown-dark transition-colors rounded-lg"
              >
                Revisar Pedido →
              </button>
            </div>
          )}

          {step === "review" && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-white/50 rounded-lg p-4 border border-taza-border">
                <h4 className="font-label text-sm text-taza-dark mb-3">Resumen del pedido</h4>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm font-body">
                      <span className="text-taza-dark">{item.name} x{item.quantity}</span>
                      <span className="text-taza-brown font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-taza-border mt-3 pt-3 flex justify-between">
                  <span className="font-label text-taza-dark">Total</span>
                  <span className="font-display text-xl text-taza-brown">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-white/50 rounded-lg p-4 border border-taza-border">
                <h4 className="font-label text-sm text-taza-dark mb-2">Datos de envio</h4>
                <p className="text-sm font-body text-taza-dark"><strong>{formData.name}</strong></p>
                <p className="text-sm font-body text-taza-dark/70">{formData.phone}</p>
                <p className="text-sm font-body text-taza-dark/70">{formData.address}</p>
                {formData.city && <p className="text-sm font-body text-taza-dark/70">{formData.city}</p>}
                {formData.notes && <p className="text-sm font-body text-taza-dark/50 mt-1 italic">{formData.notes}</p>}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("form")}
                  className="flex-1 py-3 border border-taza-border text-taza-dark font-nav text-sm hover:border-taza-brown transition-colors rounded-lg"
                >
                  ← Volver
                </button>
                <button
                  onClick={handleSendOrder}
                  disabled={isSubmitting}
                  className="flex-[2] py-3 text-white font-nav bg-taza-turquoise hover:bg-taza-turquoise-dark transition-colors rounded-lg flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                  {isSubmitting ? "Abriendo WhatsApp..." : "Enviar por WhatsApp"}
                </button>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-8 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-taza-turquoise/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-taza-turquoise" />
              </div>
              <h4 className="font-display text-2xl text-taza-dark mb-2">¡Pedido enviado!</h4>
              <p className="font-body text-taza-dark/70 mb-4">
                Se abrio WhatsApp con tu pedido. Solo presiona enviar y te contactaremos para confirmar.
              </p>
              <div className="bg-taza-gold/10 rounded-lg p-3 inline-block">
                <p className="text-sm text-taza-dark font-body">
                  ⏱️ Tiempo de respuesta: 15-30 minutos
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}