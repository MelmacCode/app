import { SEO } from '@/hooks/useSEO';
import { ContactForm } from '@/components/ContactForm';

export default function ContactoPage() {
  return (
    <>
      <SEO
        title="Contacto"
        description="Tienes preguntas? Escribenos. Estamos aqui para ayudarte a encontrar tu cafe perfecto."
        url="/contacto"
        type="website"
      />
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 pt-24">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <p className="font-label text-[#D5B073] mb-4">Contacto</p>
            <h1 className="font-display text-5xl md:text-6xl text-[#38201E] mb-6">
              Hablemos de cafe
            </h1>
            <p className="font-body text-lg text-[#38201E]/70 mb-8">
              Tienes preguntas sobre nuestros productos, envios o simplemente quieres saludar? 
              Estamos aqui para ayudarte.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#63341F]/10 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#63341F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="font-caption text-[#38201E]/50">Email</p>
                  <a href="mailto:info@latazanomada.com" className="font-body text-[#38201E] hover:text-[#63341F] transition-colors">
                    info@latazanomada.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#63341F]/10 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#63341F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="font-caption text-[#38201E]/50">Telefono</p>
                  <a href="tel:+584121234567" className="font-body text-[#38201E] hover:text-[#63341F] transition-colors">
                    +58 412-1234567
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white/30 rounded-xl p-8 border border-[rgba(56,32,30,0.08)]">
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}