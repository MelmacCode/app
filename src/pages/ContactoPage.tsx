import { useState } from 'react';

export default function ContactoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: 'var(--cream)' }} className="pt-24 pb-24">
      <div className="content-max-width">
        <p className="font-label" style={{ color: 'var(--terracotta)' }}>Contacto</p>
        <h1 className="font-display text-5xl md:text-7xl mt-4" style={{ color: 'var(--dark-coffee)' }}>
          Hablemos de Cafe
        </h1>
        <p className="font-body mt-4 max-w-lg" style={{ color: 'var(--warm-brown)', opacity: 0.7 }}>
          Queres formar parte de nuestra proxima ruta? Tienes preguntas sobre nuestros productos? Estamos aqui para ayudarte.
        </p>
      </div>

      <div className="content-max-width grid md:grid-cols-2 gap-16 mt-16">
        {/* Form */}
        <div>
          {submitted ? (
            <div className="text-center py-16">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#5A7D4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-6">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <h3 className="font-display text-2xl" style={{ color: 'var(--dark-coffee)' }}>Gracias por contactarnos</h3>
              <p className="font-body mt-2" style={{ color: 'var(--warm-brown)' }}>Te responderemos pronto.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="font-caption text-xs block mb-2" style={{ color: 'var(--warm-brown)' }}>Nombre</label>
                <input
                  type="text"
                  required
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  placeholder="Tu nombre"
                  className="w-full px-0 py-3 bg-transparent text-lg focus:outline-none"
                  style={{ borderBottom: '1px solid rgba(26,20,16,0.3)', color: 'var(--dark-coffee)' }}
                />
              </div>
              <div>
                <label className="font-caption text-xs block mb-2" style={{ color: 'var(--warm-brown)' }}>Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="tu@email.com"
                  className="w-full px-0 py-3 bg-transparent text-lg focus:outline-none"
                  style={{ borderBottom: '1px solid rgba(26,20,16,0.3)', color: 'var(--dark-coffee)' }}
                />
              </div>
              <div>
                <label className="font-caption text-xs block mb-2" style={{ color: 'var(--warm-brown)' }}>Telefono</label>
                <input
                  type="tel"
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  placeholder="+58 412-1234567"
                  className="w-full px-0 py-3 bg-transparent text-lg focus:outline-none"
                  style={{ borderBottom: '1px solid rgba(26,20,16,0.3)', color: 'var(--dark-coffee)' }}
                />
              </div>
              <div>
                <label className="font-caption text-xs block mb-2" style={{ color: 'var(--warm-brown)' }}>Asunto</label>
                <select
                  value={form.asunto}
                  onChange={(e) => setForm({ ...form, asunto: e.target.value })}
                  className="w-full px-0 py-3 bg-transparent text-lg focus:outline-none cursor-pointer"
                  style={{ borderBottom: '1px solid rgba(26,20,16,0.3)', color: form.asunto ? 'var(--dark-coffee)' : 'rgba(26,20,16,0.4)' }}
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="general">Informacion general</option>
                  <option value="reserva">Reservar experiencia</option>
                  <option value="productos">Productos</option>
                  <option value="ruta">Ruta Cafe & Cacao</option>
                  <option value="colaboraciones">Colaboraciones</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div>
                <label className="font-caption text-xs block mb-2" style={{ color: 'var(--warm-brown)' }}>Mensaje</label>
                <textarea
                  required
                  value={form.mensaje}
                  onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                  placeholder="Contanos como podemos ayudarte..."
                  rows={4}
                  className="w-full px-0 py-3 bg-transparent text-lg focus:outline-none resize-none"
                  style={{ borderBottom: '1px solid rgba(26,20,16,0.3)', color: 'var(--dark-coffee)' }}
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 text-white font-nav text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: 'var(--terracotta)' }}
              >
                Enviar Mensaje
              </button>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          {[
            { label: 'Direccion', value: 'Caracas, Venezuela', icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
            )},
            { label: 'Telefono', value: '+58 412-1234567', icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>
            )},
            { label: 'Email', value: 'info@latazanomada.com', icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            )},
            { label: 'Horario', value: 'Lunes a Viernes: 9:00 AM - 6:00 PM', icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            )},
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-4">
              <div className="mt-1" style={{ color: 'var(--terracotta)' }}>{item.icon}</div>
              <div>
                <p className="font-caption text-xs mb-1" style={{ color: 'var(--warm-brown)' }}>{item.label}</p>
                <p className="font-body" style={{ color: 'var(--dark-coffee)' }}>{item.value}</p>
              </div>
            </div>
          ))}

          {/* Social */}
          <div className="pt-8" style={{ borderTop: '1px solid var(--light-border)' }}>
            <p className="font-caption text-xs mb-4" style={{ color: 'var(--warm-brown)' }}>Redes Sociales</p>
            <div className="space-y-3">
              {[
                { name: 'Instagram', handle: '@latazanomada', url: 'https://www.instagram.com/latazanomada/' },
                { name: 'TikTok', handle: '@latazanomada', url: 'https://www.tiktok.com/@latazanomada' },
                { name: 'Facebook', handle: '/latazanomada', url: 'https://www.facebook.com/latazanomada' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-2 group"
                >
                  <span className="font-body text-sm transition-colors group-hover:text-terracotta" style={{ color: 'var(--dark-coffee)' }}>
                    {social.name}
                  </span>
                  <span className="font-body text-sm transition-colors group-hover:text-terracotta" style={{ color: 'var(--warm-brown)', opacity: 0.6 }}>
                    {social.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="mt-8 rounded-lg overflow-hidden" style={{ aspectRatio: '4/3' }}>
            <img
              src="/images/hero-background-1.jpg"
              alt="Caracas, Venezuela"
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.7)' }}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-8 h-8 rounded-full bg-[#C17A47] flex items-center justify-center" style={{ boxShadow: '0 0 0 8px rgba(193,122,71,0.3)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
