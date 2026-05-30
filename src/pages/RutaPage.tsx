import { useState, useRef, useEffect } from 'react';
import { SEO } from '@/hooks/useSEO';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const locations = [
  {
    name: 'Merida',
    state: 'Merida',
    description: 'Tierras altas andinas donde el cafe crece a 1,800m de altitud. Notas de chocolate, caramelo y frutas rojas.',
    image: '/images/ruta-merida.jpg',
    reviews: [
      { author: 'Juan P.', rating: 5, text: 'El paisaje es espectacular y el cafe de altura tiene un sabor unico.' },
    ]
  },
  {
    name: 'Barlovento',
    state: 'Miranda',
    description: 'Region costera famosa por su cacao Criollo, considerado el mejor del mundo. Experiencia de selva y playa.',
    image: '/images/ruta-barlovento.jpg',
    reviews: [
      { author: 'Maria G.', rating: 5, text: 'El cacao criollo es otro nivel. La experiencia en la finca fue inolvidable.' },
    ]
  },
  {
    name: 'Tovar',
    state: 'Aragua',
    description: 'Pueblo de montana con tradicion cafetera centenaria. Cafe de sombra bajo arboles nativos.',
    image: '/images/ruta-tovar.jpg',
    reviews: [
      { author: 'Carlos R.', rating: 4, text: 'Un pueblo magico con cafe excepcional. Recomiendo el tour de tostado.' },
    ]
  },
];

export default function RutaPage() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewState, setReviewState] = useState({ name: '', rating: 5, text: '' });
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ruta-header > *', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });
      gsap.fromTo('.ruta-card', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.ruta-cards', start: 'top 80%' }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <SEO
        title="Ruta Cafe & Cacao"
        description="Sigue nuestra ruta por las mejores zonas cafetaleras y cacaoteras. Un viaje sensorial unico."
        url="/ruta-cafe-cacao"
        type="article"
      />
      <section ref={sectionRef} className="pt-24 pb-24 md:pb-32 bg-[#F0EAD6]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="ruta-header text-center mb-16">
            <p className="font-label text-[#63341F] mb-4">Ruta 2025</p>
            <h1 className="font-display text-5xl md:text-6xl text-[#38201E] mb-6">
              Ruta Cafe & Cacao
            </h1>
            <p className="font-body text-lg text-[#38201E]/70 max-w-2xl mx-auto">
              Un recorrido por los estados productores de cafe y cacao de Venezuela. Descubre el origen de tu taza.
            </p>
          </div>

          <div className="ruta-cards grid md:grid-cols-3 gap-8">
            {locations.map((loc) => (
              <div key={loc.name} className="ruta-card bg-white/50 rounded-xl overflow-hidden border border-[rgba(56,32,30,0.08)]">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <p className="font-caption text-[#63341F] mb-1">{loc.state}</p>
                  <h3 className="font-display text-2xl text-[#38201E] mb-3">{loc.name}</h3>
                  <p className="font-body text-sm text-[#38201E]/70 mb-4">{loc.description}</p>

                  <button
                    onClick={() => {
                      setSelectedLocation(selectedLocation === loc.name ? null : loc.name);
                      setShowReviewForm(false);
                    }}
                    className="text-sm font-nav text-[#63341F] hover:text-[#4A2716] transition-colors"
                  >
                    {selectedLocation === loc.name ? 'Ocultar resenas' : 'Ver resenas'}
                  </button>

                  {selectedLocation === loc.name && (
                    <div className="mt-4 pt-4 border-t border-[rgba(56,32,30,0.08)]">
                      {loc.reviews.map((review, i) => (
                        <div key={i} className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-sm text-[#38201E]">{review.author}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, r) => (
                                <svg key={r} width="14" height="14" viewBox="0 0 24 24" fill={r < review.rating ? '#D5B073' : 'none'} stroke="#D5B073" strokeWidth="2">
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="font-body text-sm text-[#38201E]/70">{review.text}</p>
                        </div>
                      ))}

                      {!showReviewForm && (
                        <button
                          onClick={() => setShowReviewForm(true)}
                          className="text-sm font-nav text-[#63341F] hover:text-[#4A2716] transition-colors"
                        >
                          + Escribir resena
                        </button>
                      )}

                      {showReviewForm && (
                        <div className="mt-4">
                          <h4 className="font-display text-lg text-[#38201E] mb-3">Nueva Resena</h4>
                          <input
                            type="text"
                            placeholder="Tu nombre"
                            value={reviewState.name}
                            onChange={(e) => setReviewState({ ...reviewState, name: e.target.value })}
                            className="w-full px-3 py-2 mb-3 text-sm rounded border bg-transparent"
                            style={{ borderColor: 'rgba(56,32,30,0.08)', color: '#38201E' }}
                          />
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm text-[#38201E]">Calificacion:</span>
                            {[1, 2, 3, 4, 5].map((r) => (
                              <button
                                key={r}
                                onClick={() => setReviewState({ ...reviewState, rating: r })}
                                className="p-1"
                              >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill={r <= reviewState.rating ? '#D5B073' : 'none'} stroke="#D5B073" strokeWidth="2">
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                              </button>
                            ))}
                          </div>
                          <textarea
                            placeholder="Comparte tu experiencia..."
                            value={reviewState.text}
                            onChange={(e) => setReviewState({ ...reviewState, text: e.target.value })}
                            rows={3}
                            className="w-full px-3 py-2 mb-3 text-sm rounded border bg-transparent resize-none"
                            style={{ borderColor: 'rgba(56,32,30,0.08)', color: '#38201E' }}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => setShowReviewForm(false)}
                              className="px-4 py-2 text-sm font-nav border border-[rgba(56,32,30,0.08)] text-[#38201E] rounded hover:border-[#63341F] transition-colors"
                            >
                              Cancelar
                            </button>
                            <button
                              onClick={() => {
                                setShowReviewForm(false);
                                setReviewState({ name: '', rating: 5, text: '' });
                              }}
                              className="px-4 py-2 text-sm font-nav bg-[#63341F] text-[#F0EAD6] rounded hover:bg-[#4A2716] transition-colors"
                            >
                              Enviar resena
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}