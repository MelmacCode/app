import { Instagram, ExternalLink } from "lucide-react";
import { SEO } from "@/hooks/useSEO";
import LazyImage from "@/components/LazyImage";

/**
 * TikTokIcon — SVG inline del logo de TikTok
 * Lucide-react no incluye icono de TikTok, así que usamos SVG nativo.
 */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.89 2.89 2.89 0 0 1 2.88-2.89c.2 0 .39.02.58.05V9.4a6.36 6.36 0 0 0-.58-.03A6.38 6.38 0 0 0 2.91 15.75a6.38 6.38 0 0 0 6.38 6.38 6.38 6.38 0 0 0 6.38-6.38V8.83a8.35 8.35 0 0 0 4.92 1.6V7.08a4.93 4.93 0 0 1-1-.03z" />
    </svg>
  );
}

const socials = [
  {
    name: "Instagram",
    handle: "@latazanomada",
    url: "https://instagram.com/latazanomada",
    icon: Instagram,
    color: "#E4405F",
    followers: "12.5K",
    description: "Fotos diarias de nuestras rutas, productos y detras de camaras.",
    image: "/images/instagram-profile.jpg", // ← Sube una captura de tu perfil
  },
  {
    name: "TikTok",
    handle: "@latazanomada",
    url: "https://tiktok.com/@latazanomada",
    icon: TikTokIcon,
    color: "#000000",
    followers: "24K",
    description: "Videos cortos de recetas, tips de barismo y humor cafetero.",
    image: "/images/tiktok-profile.jpg", // ← Sube una captura de tu perfil
  },
];

export default function RedesPage() {
  return (
    <div className="pt-32 pb-20" style={{ backgroundColor: "var(--taza-cream)" }}>
      <SEO
        title="Redes Sociales | La Taza Nomada"
        description="Siguenos en Instagram y TikTok. Contenido diario sobre cafe, cacao y aventuras venezolanas."
        url="/redes"
        image="/og-image.jpg"
      />

      <div className="content-max-width">
        <div className="text-center mb-16">
          <p className="font-label mb-4" style={{ color: "var(--taza-brown)" }}>
            Comunidad
          </p>
          <h1
            className="font-display text-5xl md:text-6xl mb-6"
            style={{ color: "var(--taza-dark)" }}
          >
            Siguenos en Redes
          </h1>
          <p
            className="font-body text-lg max-w-2xl mx-auto"
            style={{ color: "var(--taza-dark-light)" }}
          >
            Unete a nuestra comunidad de amantes del cafe y cacao. Contenido fresco todos los dias.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{
                borderColor: "var(--taza-border)",
                backgroundColor: "var(--taza-cream)",
              }}
            >
              {/* Imagen de perfil */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <LazyImage
                  src={social.image}
                  alt={`Perfil de ${social.name} de La Taza Nomada`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Info superpuesta */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: social.color }}
                    >
                      <social.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-white">
                        {social.name}
                      </h3>
                      <p className="font-caption text-white/80">
                        {social.handle}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl text-white">
                      {social.followers}
                    </p>
                    <p className="font-caption text-white/80">seguidores</p>
                  </div>
                </div>
              </div>

              {/* Descripción */}
              <div className="p-6">
                <p
                  className="font-body mb-4"
                  style={{ color: "var(--taza-dark-light)" }}
                >
                  {social.description}
                </p>
                <div
                  className="flex items-center gap-2 font-nav text-xs transition-all duration-300 group-hover:gap-3"
                  style={{ color: "var(--taza-brown)" }}
                >
                  Visitar perfil
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}