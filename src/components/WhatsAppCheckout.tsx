import { useState } from "react";
import { X, CheckCircle, ArrowRight, User, Phone, MapPin, MessageSquare } from "lucide-react";
import { generateWhatsAppCheckoutUrl, validateCustomerInfo, getWhatsAppNumber } from "@/lib/whatsapp";
import type { CartItem, CustomerInfo } from "@/lib/whatsapp";

interface WhatsAppCheckoutProps {
  items: CartItem[];
  total?: number;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function WhatsAppCheckout({ items, total, onClose, onSuccess }: WhatsAppCheckoutProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });
  const [errors, setErrors] = useState<string[]>([]);

  const calculatedTotal = total ?? items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const phoneNumber = getWhatsAppNumber();

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
    setErrors([]);
  };

  const validateStep1 = () => {
    const validation = validateCustomerInfo(customer);
    if (!validation.valid) {
      setErrors(validation.errors);
      return false;
    }
    return true;
  };

  const handleSend = () => {
    if (!validateStep1()) return;
    if (!phoneNumber) {
      setErrors(["El numero de WhatsApp no esta configurado. Contacta al administrador."]);
      return;
    }

    const url = generateWhatsAppCheckoutUrl(items, customer, phoneNumber);
    window.open(url, "_blank");

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="max-w-lg w-full rounded-2xl p-6 md:p-8 relative max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: "var(--taza-cream)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors"
        >
          <X className="w-5 h-5" style={{ color: "var(--taza-dark)" }} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "var(--taza-turquoise)" }}
          >
            <MessageSquare className="w-8 h-8" style={{ color: "var(--taza-cream)" }} />
          </div>
          <h2 className="font-display text-2xl" style={{ color: "var(--taza-dark)" }}>
            Finalizar por WhatsApp
          </h2>
          <p className="font-body text-sm mt-2" style={{ color: "var(--taza-dark-light)" }}>
            Te redirigiremos a WhatsApp con tu pedido pre-cargado. Solo envia el mensaje.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all"
                style={{
                  backgroundColor: step >= s ? "var(--taza-brown)" : "var(--taza-border)",
                  color: step >= s ? "var(--taza-cream)" : "var(--taza-dark-light)",
                }}
              >
                {step > s ? <CheckCircle className="w-4 h-4" /> : s}
              </div>
              {s < 3 && (
                <div
                  className="w-12 h-[2px]"
                  style={{ backgroundColor: step > s ? "var(--taza-brown)" : "var(--taza-border)" }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: "rgba(196, 69, 54, 0.1)" }}>
            {errors.map((err, i) => (
              <p key={i} className="font-body text-sm" style={{ color: "var(--taza-error)" }}>
                {err}
              </p>
            ))}
          </div>
        )}

        {/* Step 1: Datos */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="font-caption mb-2 block" style={{ color: "var(--taza-dark)" }}>
                <User className="w-3 h-3 inline mr-1" />
                Nombre completo *
              </label>
              <input
                type="text"
                value={customer.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border bg-white/50 text-taza-dark font-body focus:outline-none focus:border-taza-brown focus:ring-1 focus:ring-taza-brown transition-colors"
                style={{ borderColor: "var(--taza-border)" }}
                placeholder="Ej: Maria Gonzalez"
              />
            </div>
            <div>
              <label className="font-caption mb-2 block" style={{ color: "var(--taza-dark)" }}>
                <Phone className="w-3 h-3 inline mr-1" />
                Telefono *
              </label>
              <input
                type="tel"
                value={customer.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border bg-white/50 text-taza-dark font-body focus:outline-none focus:border-taza-brown focus:ring-1 focus:ring-taza-brown transition-colors"
                style={{ borderColor: "var(--taza-border)" }}
                placeholder="Ej: 0412-1234567"
              />
            </div>
            <div>
              <label className="font-caption mb-2 block" style={{ color: "var(--taza-dark)" }}>
                <MapPin className="w-3 h-3 inline mr-1" />
                Direccion completa *
              </label>
              <input
                type="text"
                value={customer.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border bg-white/50 text-taza-dark font-body focus:outline-none focus:border-taza-brown focus:ring-1 focus:ring-taza-brown transition-colors"
                style={{ borderColor: "var(--taza-border)" }}
                placeholder="Ej: Av. Principal, Edificio XYZ, Piso 2"
              />
            </div>
            <div>
              <label className="font-caption mb-2 block" style={{ color: "var(--taza-dark-light)" }}>
                Ciudad (opcional)
              </label>
              <input
                type="text"
                value={customer.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border bg-white/50 text-taza-dark font-body focus:outline-none focus:border-taza-brown focus:ring-1 focus:ring-taza-brown transition-colors"
                style={{ borderColor: "var(--taza-border)" }}
                placeholder="Ej: Caracas"
              />
            </div>
            <div>
              <label className="font-caption mb-2 block" style={{ color: "var(--taza-dark-light)" }}>
                Notas (opcional)
              </label>
              <textarea
                value={customer.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                rows={2}
                className="w-full px-4 py-3 rounded-lg border bg-white/50 text-taza-dark font-body focus:outline-none focus:border-taza-brown focus:ring-1 focus:ring-taza-brown transition-colors resize-none"
                style={{ borderColor: "var(--taza-border)" }}
                placeholder="Ej: Entregar en la manana"
              />
            </div>
            <button
              onClick={() => validateStep1() && setStep(2)}
              className="w-full py-4 rounded-lg font-nav flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
              style={{ backgroundColor: "var(--taza-brown)", color: "var(--taza-cream)" }}
            >
              Revisar pedido
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Revision */}
        {step === 2 && (
          <div>
            <h3 className="font-display text-xl mb-4" style={{ color: "var(--taza-dark)" }}>Resumen del pedido</h3>
            <div className="space-y-3 mb-6">
              {items.map((item, i) => (
                <div key={item.id} className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: "var(--taza-cream-light)" }}>
                  <div>
                    <p className="font-body text-sm" style={{ color: "var(--taza-dark)" }}>
                      {i + 1}. {item.name}
                    </p>
                    <p className="font-caption" style={{ color: "var(--taza-dark-light)" }}>
                      {item.quantity}x ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-body font-medium" style={{ color: "var(--taza-brown)" }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 mb-6" style={{ borderColor: "var(--taza-border)" }}>
              <div className="flex justify-between items-center">
                <span className="font-body" style={{ color: "var(--taza-dark-light)" }}>Total ({totalItems} articulos)</span>
                <span className="font-display text-2xl" style={{ color: "var(--taza-dark)" }}>
                  ${calculatedTotal.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-lg font-nav border transition-all"
                style={{ borderColor: "var(--taza-border)", color: "var(--taza-dark)" }}
              >
                Atras
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 rounded-lg font-nav transition-all duration-300 hover:scale-[1.02]"
                style={{ backgroundColor: "var(--taza-brown)", color: "var(--taza-cream)" }}
              >
                Confirmar
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmacion */}
        {step === 3 && (
          <div className="text-center">
            <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: "var(--taza-cream-light)" }}>
              <p className="font-body text-sm mb-2" style={{ color: "var(--taza-dark-light)" }}>Enviaremos tu pedido a:</p>
              <p className="font-body font-medium" style={{ color: "var(--taza-dark)" }}>WhatsApp +{phoneNumber}</p>
            </div>
            <p className="font-body text-sm mb-6" style={{ color: "var(--taza-dark-light)" }}>
              Al hacer clic en "Enviar por WhatsApp", se abrira una nueva pestana con tu pedido pre-cargado.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3 rounded-lg font-nav border transition-all"
                style={{ borderColor: "var(--taza-border)", color: "var(--taza-dark)" }}
              >
                Atras
              </button>
              <button
                onClick={handleSend}
                className="flex-1 py-3 rounded-lg font-nav flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
                style={{ backgroundColor: "var(--taza-turquoise)", color: "var(--taza-cream)" }}
              >
                <MessageSquare className="w-4 h-4" />
                Enviar por WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}