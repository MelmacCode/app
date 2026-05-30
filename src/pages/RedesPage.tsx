import { SEO } from '@/hooks/useSEO';

const socialLinks = [
  {
    name: 'Instagram',
    handle: '@latazanomada',
    url: 'https://www.instagram.com/latazanomada/',
    followers: '12.5K',
    description: 'Fotos de nuestras rutas, productores y momentos detras de camaras.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    color: '#E4405F'
  },
  {
    name: 'TikTok',
    handle: '@latazanomada',
    url: 'https://www.tiktok.com/@latazanomada',
    followers: '8.2K',
    description: 'Videos cortos de experiencias, recetas y tips de preparacion.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" />
      </svg>
    ),
    color: '#000000'
  },
  {
    name: 'Facebook',
    handle: 'La Taza Nomada',
    url: 'https://www.facebook.com/latazanomada',
    followers: '5.1K',
    description: 'Eventos, comunidad y noticias sobre el mundo del cafe venezolano.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
    color: '#1877F2'
  },
];

export default function RedesPage() {
  return (
    <>
      <SEO
        title="Redes Sociales"
        description="Conecta con La Taza Nomada en Instagram, TikTok y Facebook. Unete a nuestra comunidad cafetera."
        url="/redes"
        type="website"
      />
      <section className="pt-24 pb-24 md:pb-32 bg-[#F0EAD6]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-label text-[#63341F] mb-4">Comunidad</p>
            <h1 className="font-display text-5xl md:text-6xl text-[#38201E] mb-6">
              Siguenos
            </h1>
            <p className="font-body text-lg text-[#38201E]/70 max-w-2xl mx-auto">
              Unete a nuestra comunidad de amantes del cafe. Comparte tu experiencia y descubre contenido exclusivo.
            </p>
          </div>

          <div className="space-y-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-6 p-6 bg-white/50 rounded-xl border border-[rgba(56,32,30,0.08)] hover:border-[#63341F] transition-all group"
              >
                <div className="text-[#38201E] group-hover:text-[#63341F] transition-colors">
                  {social.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-display text-xl text-[#38201E]">{social.name}</h3>
                    <span className="font-caption text-[#63341F]">{social.followers} seguidores</span>
                  </div>
                  <p className="font-body text-sm text-[#38201E]/70">{social.description}</p>
                  <p className="font-caption text-[#63341F] mt-1">{social.handle}</p>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#38201E]/40 group-hover:text-[#63341F] transition-colors">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}