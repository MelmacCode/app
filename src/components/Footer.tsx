export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--dark-coffee)' }}>
      <div className="content-max-width section-padding">
        <div className="max-w-lg">
          <p className="font-label mb-6" style={{ color: 'var(--terracotta)' }}>Contacto</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl" style={{ color: 'var(--light-text)', lineHeight: 1.15 }}>
            Sumergete en una experiencia sensorial unica.
          </h2>
          <a
            href="mailto:info@latazanomada.com"
            className="inline-block mt-8 font-body text-lg transition-all hover:underline underline-offset-4"
            style={{ color: 'var(--terracotta)' }}
          >
            Escribenos
          </a>
        </div>

        <div className="mt-16 flex flex-col md:flex-row gap-8 md:gap-0 items-start" style={{ color: 'rgba(245,237,224,0.6)' }}>
          <div className="md:w-1/3">
            <p className="font-caption mb-1">Direccion</p>
            <p className="font-body text-sm">Caracas, Venezuela</p>
          </div>
          <div className="hidden md:block w-px h-12" style={{ backgroundColor: 'rgba(245,237,224,0.15)' }} />
          <div className="md:w-1/3">
            <p className="font-caption mb-1">Telefono</p>
            <p className="font-body text-sm">+58 412-1234567</p>
          </div>
          <div className="hidden md:block w-px h-12" style={{ backgroundColor: 'rgba(245,237,224,0.15)' }} />
          <div className="md:w-1/3">
            <p className="font-caption mb-1">Email</p>
            <a href="mailto:info@latazanomada.com" className="font-body text-sm hover:text-terracotta transition-colors">
              info@latazanomada.com
            </a>
          </div>
        </div>
      </div>

      <div className="content-max-width pb-8">
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(245,237,224,0.1)' }}
        >
          <p className="font-caption" style={{ color: 'rgba(245,237,224,0.4)' }}>
            La Taza Nomada
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/latazanomada/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-caption transition-colors hover:text-terracotta"
              style={{ color: 'rgba(245,237,224,0.4)' }}
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@latazanomada"
              target="_blank"
              rel="noopener noreferrer"
              className="font-caption transition-colors hover:text-terracotta"
              style={{ color: 'rgba(245,237,224,0.4)' }}
            >
              TikTok
            </a>
            <a
              href="https://www.facebook.com/latazanomada"
              target="_blank"
              rel="noopener noreferrer"
              className="font-caption transition-colors hover:text-terracotta"
              style={{ color: 'rgba(245,237,224,0.4)' }}
            >
              Facebook
            </a>
          </div>

          <p className="font-caption" style={{ color: 'rgba(245,237,224,0.4)' }}>
            Privacy Policy
          </p>
        </div>
      </div>
    </footer>
  );
}
