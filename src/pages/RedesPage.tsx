import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const socialStats = [
  { platform: 'Instagram', handle: '@latazanomada', followers: '15K', icon: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )},
  { platform: 'TikTok', handle: '@latazanomada', followers: '8.2K', icon: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" />
    </svg>
  )},
  { platform: 'Facebook', handle: '/latazanomada', followers: '5.4K', icon: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  )},
  { platform: 'YouTube', handle: 'La Taza Nomada', followers: '1.2K', icon: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.13c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.46z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  )},
];

const instagramGrid = [
  '/images/grid-toma-cafe.jpg',
  '/images/hero-background-1.jpg',
  '/images/product-cafe-caracas.jpg',
  '/images/about-background.jpg',
  '/images/journey-background.jpg',
  '/images/product-chocolate-paria.jpg',
  '/images/service-itinerarios.jpg',
  '/images/grid-toma-cafe.jpg',
  '/images/hero-background-2.jpg',
];

const tiktokVideos = [
  { thumb: '/images/grid-toma-cafe.jpg', caption: 'Como hacer latte art perfecto', views: '12.5K' },
  { thumb: '/images/about-background.jpg', caption: 'Cosecha de cacao en Barlovento', views: '8.3K' },
  { thumb: '/images/service-itinerarios.jpg', caption: 'Nuestra ruta por los Andes', views: '15.2K' },
  { thumb: '/images/product-chocolate-paria.jpg', caption: 'Probando chocolate 70% cacao', views: '6.7K' },
];

export default function RedesPage() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo('.redes-header > *', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' });
    if (statsRef.current) {
      gsap.fromTo(statsRef.current.children, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.4 });
    }
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--cream)' }} className="pt-24 pb-24">
      <div className="content-max-width redes-header">
        <p className="font-label" style={{ color: 'var(--terracotta)' }}>Siguenos</p>
        <h1 className="font-display text-5xl md:text-7xl mt-4" style={{ color: 'var(--dark-coffee)' }}>
          Nuestras Redes Sociales
        </h1>
        <p className="font-body mt-4 max-w-lg" style={{ color: 'var(--warm-brown)', opacity: 0.7 }}>
          Mantente conectado con nuestras ultimas aventuras, historias y contenido exclusivo del mundo del cafe y cacao.
        </p>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="content-max-width grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
        {socialStats.map((stat) => (
          <div key={stat.platform} className="bg-white p-8 rounded-lg text-center" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
            <div className="flex justify-center mb-4" style={{ color: 'var(--terracotta)' }}>{stat.icon}</div>
            <p className="font-display text-3xl" style={{ color: 'var(--dark-coffee)' }}>{stat.followers}</p>
            <p className="font-caption text-xs mt-1" style={{ color: 'var(--warm-brown)' }}>{stat.platform}</p>
          </div>
        ))}
      </div>

      {/* Instagram Section */}
      <div className="content-max-width mt-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl" style={{ color: 'var(--dark-coffee)' }}>Instagram</h2>
            <a href="https://www.instagram.com/latazanomada/" target="_blank" rel="noopener noreferrer" className="font-body text-sm hover:text-terracotta transition-colors" style={{ color: 'var(--terracotta)' }}>
              @latazanomada
            </a>
          </div>
          <a href="https://www.instagram.com/latazanomada/" target="_blank" rel="noopener noreferrer" className="font-nav text-xs px-4 py-2 border rounded-full transition-colors hover:border-terracotta" style={{ borderColor: 'var(--light-border)', color: 'var(--dark-coffee)' }}>
            Seguir
          </a>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {instagramGrid.map((img, i) => (
            <a
              key={i}
              href="https://www.instagram.com/latazanomada/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square group overflow-hidden"
            >
              <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[#1A1410]/0 group-hover:bg-[#1A1410]/40 transition-colors flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* TikTok Section */}
      <div className="content-max-width mt-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl" style={{ color: 'var(--dark-coffee)' }}>TikTok</h2>
            <a href="https://www.tiktok.com/@latazanomada" target="_blank" rel="noopener noreferrer" className="font-body text-sm hover:text-terracotta transition-colors" style={{ color: 'var(--terracotta)' }}>
              @latazanomada
            </a>
          </div>
          <a href="https://www.tiktok.com/@latazanomada" target="_blank" rel="noopener noreferrer" className="font-nav text-xs px-4 py-2 border rounded-full transition-colors hover:border-terracotta" style={{ borderColor: 'var(--light-border)', color: 'var(--dark-coffee)' }}>
            Seguir
          </a>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {tiktokVideos.map((video, i) => (
            <a
              key={i}
              href="https://www.tiktok.com/@latazanomada"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-56 snap-start group"
            >
              <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: '9/16' }}>
                <img src={video.thumb} alt={video.caption} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-body text-sm text-white">{video.caption}</p>
                  <p className="font-caption text-xs text-white/70 mt-1">{video.views} vistas</p>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="none"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="content-max-width mt-24">
        <div className="rounded-2xl p-12 md:p-16 text-center" style={{ backgroundColor: 'var(--dark-coffee)' }}>
          <h2 className="font-display text-3xl md:text-4xl" style={{ color: 'var(--light-text)' }}>
            Unete a la comunidad de amantes del cafe y cacao
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a
              href="https://www.instagram.com/latazanomada/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 text-white font-nav text-sm transition-all hover:scale-[1.02] inline-flex items-center justify-center gap-2"
              style={{ backgroundColor: 'var(--terracotta)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              Seguir en Instagram
            </a>
            <a
              href="https://www.tiktok.com/@latazanomada"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 font-nav text-sm transition-all hover:scale-[1.02] inline-flex items-center justify-center gap-2"
              style={{ backgroundColor: 'var(--light-text)', color: 'var(--dark-coffee)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" />
              </svg>
              Seguir en TikTok
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
