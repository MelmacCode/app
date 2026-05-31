import { Instagram, Facebook, Twitter, Youtube, ExternalLink } from "lucide-react";
import { SEO } from "@/hooks/useSEO";
import LazyImage from "@/components/LazyImage";

const socials = [
  {
    name: "Instagram",
    handle: "@latazanomada",
    url: "https://instagram.com/latazanomada",
    icon: Instagram,
    color: "#E4405F",
    followers: "12.5K",
    description: "Fotos diarias de nuestras rutas, productos y detras de camaras.",
    image: "/images/social-instagram.jpg",
  },
  {
    name: "Facebook",
    handle: "La Taza Nomada",
    url: "https://facebook.com/latazanomada",
    icon: Facebook,
    color: "#1877F2",
    followers: "8.2K",
    description: "Eventos, livestreams de catacion y comunidad de amantes del cafe.",
    image: "/images/social-facebook.jpg",
  },
  {
    name: "TikTok",
    handle: "@latazanomada",
    url: "https://tiktok.com/@latazanomada",
    icon: Youtube,
    color: "#000000",
    followers: "24K",
    description: "Videos cortos de recetas, tips de barismo y humor cafetero.",
    image: "/images/social-tiktok.jpg",
  },
  {
    name: "YouTube",
    handle: "La Taza Nomada",
    url: "https://youtube.com/@latazanomada",
    icon: Youtube,
    color: "#FF0000",
    followers: "3.1K",
    description: "Documentales de nuestras rutas, tutales y entrevistas a productores.",
    image: "/images/social-youtube.jpg",
  },
];

export default function RedesPage() {
  return (
    <div className="pt-32 pb-20" style={{ backgroundColor: "var(--taza-cream)" }}>
      <SEO
        title="Redes Sociales | La Taza Nomada"
        description="Siguenos en Instagram, Facebook, TikTok y YouTube. Contenido diario sobre cafe, cacao y aventuras venezolanas."
        url="/redes"
        image="/og-image.jpg"
      />

      <div className="content-max-width">
        <div className="text-center mb-16">
          <p className="font-label mb-4" style={{ color: "var(--taza-brown)" }}>Comunidad</p>
          <h1 className="font-display text-5xl md:text-6xl mb-6" style={{ color: "var(--taza-dark)" }}>
            Siguenos en Redes
          </h1>
          <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: "var(--taza-dark-light)" }}>
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
              className="group rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-lg"
              style={{ borderColor: "var(--taza-border)", backgroundColor: "var(--taza-cream)" }}
            >
              <div className="aspect-[16/9] overflow-hidden">
                <LazyImage
                  src={social.image}
                  alt={social.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: social.color }}
                    >
                      <social.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-white">{social.name}</h3>
                      <p className="font-caption text-white/80">{social.handle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl text-white">{social.followers}</p>
                    <p className="font-caption text-white/80">seguidores</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="font-body mb-4" style={{ color: "var(--taza-dark-light)" }}>
                  {social.description}
                </p>
                <div className="flex items-center gap-2 font-nav text-xs" style={{ color: "var(--taza-brown)" }}>
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