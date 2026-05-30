export default function Footer() {
  return (
    <footer className="bg-taza-dark">
      <div className="content-max-width section-padding">
        <div className="max-w-lg">
          <p className="font-label mb-6 text-taza-gold">Contacto</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-taza-light" style={{ lineHeight: 1.15 }}>
            Sumérgete en una experiencia sensorial única.
          </h2>
          <a
            href="mailto:info@latazanomada.com"
            className="inline-block mt-8 font-body text-lg transition-all hover:underline underline-offset-4 text-taza-gold"
          >
            Escríbenos
          </a>
        </div>

        <div className="mt-16 flex flex-col md:flex-row gap-8 md:gap-0 items-start text-taza-light/60">
          <div className="md:w-1/3">
            <p className="font-caption mb-1">Dirección</p>
            <p className="font-body text-sm">Caracas, Venezuela</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-taza-light/15" />
          <div className="md:w-1/3">
            <p className="font-caption mb-1">Teléfono</p>
            <p className="font-body text-sm">+58 412-1234567</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-taza-light/15" />
          <div className="md:w-1/3">
            <p className="font-caption mb-1">Email</p>
            <a href="mailto:info@latazanomada.com" className="font-body text-sm hover:text-taza-gold transition-colors">
              info@latazanomada.com
            </a>
          </div>
        </div>
      </div>

      <div className="content-max-width pb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-taza-light/10">
          <p className="font-caption text-taza-light/40">
            La Taza Nómada
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/latazanomada/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-caption transition-colors hover:text-taza-gold text-taza-light/40"
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@latazanomada"
              target="_blank"
              rel="noopener noreferrer"
              className="font-caption transition-colors hover:text-taza-gold text-taza-light/40"
            >
              TikTok
            </a>
            <a
              href="https://www.facebook.com/latazanomada"
              target="_blank"
              rel="noopener noreferrer"
              className="font-caption transition-colors hover:text-taza-gold text-taza-light/40"
            >
              Facebook
            </a>
          </div>

          <p className="font-caption text-taza-light/40">
            Privacy Policy
          </p>
        </div>
      </div>
    </footer>
  );
}