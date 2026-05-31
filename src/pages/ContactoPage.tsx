import { useState } from "react";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";
import { SEO } from "@/hooks/useSEO";
import { ContactForm } from "@/components/ContactForm";

export default function ContactoPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="pt-32 pb-20" style={{ backgroundColor: "var(--taza-cream)" }}>
      <SEO
        title="Contacto | La Taza Nomada"
        description="Contactanos para reservar tu experiencia, comprar nuestros productos o simplemente charlar sobre cafe y cacao."
        url="/contacto"
        image="/og-image.jpg"
      />

      <div className="content-max-width">
        <div className="text-center mb-16">
          <p className="font-label mb-4" style={{ color: "var(--taza-brown)" }}>Contacto</p>
          <h1 className="font-display text-5xl md:text-6xl mb-6" style={{ color: "var(--taza-dark)" }}>
            Hablemos de Cafe
          </h1>
          <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: "var(--taza-dark-light)" }}>
            Estamos aqui para responder tus preguntas, recibir tus pedidos y planear tu proxima aventura cafetera.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <h2 className="font-display text-3xl mb-8" style={{ color: "var(--taza-dark)" }}>
              Informacion de Contacto
            </h2>

            <div className="space-y-6">
              {[
                { icon: MapPin, label: "Direccion", value: "Caracas, Venezuela" },
                { icon: Phone, label: "WhatsApp", value: "+58 412-6094680" },
                { icon: Mail, label: "Email", value: "hola@latazanomada.com" },
                { icon: Clock, label: "Horario", value: "Lun - Vie: 9:00 - 18:00" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "var(--taza-brown)" }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: "var(--taza-cream)" }} />
                  </div>
                  <div>
                    <p className="font-caption mb-1" style={{ color: "var(--taza-brown)" }}>{item.label}</p>
                    <p className="font-body" style={{ color: "var(--taza-dark)" }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="mt-12">
              <h3 className="font-display text-xl mb-4" style={{ color: "var(--taza-dark)" }}>Siguenos</h3>
              <div className="flex gap-4">
                {["Instagram", "Facebook", "TikTok"].map((social) => (
                  <a
                    key={social}
                    href={`https://${social.toLowerCase()}.com/latazanomada`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full font-nav text-xs border transition-all duration-300 hover:scale-105"
                    style={{ borderColor: "var(--taza-border)", color: "var(--taza-dark)" }}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div
            className="rounded-2xl border p-8"
            style={{ borderColor: "var(--taza-border)", backgroundColor: "var(--taza-cream-light)" }}
          >
            {sent ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: "var(--taza-turquoise)" }} />
                <h3 className="font-display text-2xl mb-2" style={{ color: "var(--taza-dark)" }}>
                  Mensaje enviado
                </h3>
                <p className="font-body" style={{ color: "var(--taza-dark-light)" }}>
                  Gracias por contactarnos. Te responderemos en menos de 24 horas.
                </p>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl mb-6" style={{ color: "var(--taza-dark)" }}>
                  Envia un mensaje
                </h2>
                <ContactForm onSuccess={() => setSent(true)} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}