import { useState, useRef, useEffect } from 'react';
import { venezuelaStates, allStates, type MapState, type Review } from '@/data/map';
import { useReviewsStore } from '@/stores/reviewsStore';
import gsap from 'gsap';

function StarRating({ rating, onRate }: { rating: number; onRate?: (r: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          onClick={() => onRate?.(s)}
          className={onRate ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}
          disabled={!onRate}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={s <= rating ? '#C17A47' : 'none'} stroke="#C17A47" strokeWidth="1.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      ))}
    </div>
  );
}

export default function RutaPage() {
  const [selectedState, setSelectedState] = useState<MapState | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewState, setReviewState] = useState({ name: '', rating: 0, comment: '' });
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [copiedCoords, setCopiedCoords] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const { reviews, addReview } = useReviewsStore();

  const routeStates = new Set(venezuelaStates.map((s) => s.id));

  useEffect(() => {
    gsap.fromTo('.ruta-hero > *', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' });
  }, []);

  useEffect(() => {
    if (copiedCoords) {
      const t = setTimeout(() => setCopiedCoords(null), 2000);
      return () => clearTimeout(t);
    }
  }, [copiedCoords]);

  const handleStateClick = (state: MapState) => {
    if (routeStates.has(state.id)) {
      const vs = venezuelaStates.find((s) => s.id === state.id);
      if (vs) setSelectedState(vs);
    }
  };

  const handleAddReview = (stateId: string, locationName: string) => {
    if (!reviewState.name || !reviewState.rating || !reviewState.comment) return;
    const key = `${stateId}-${locationName}`;
    const newReview: Review = {
      author: reviewState.name,
      date: new Date().toISOString().split('T')[0],
      rating: reviewState.rating,
      comment: reviewState.comment,
    };
    addReview(key, newReview);
    setReviewState({ name: '', rating: 0, comment: '' });
    setShowReviewForm(false);
  };

  const copyCoords = (coords: { lat: number; lng: number }) => {
    const text = `${coords.lat.toFixed(4)}°N, ${Math.abs(coords.lng).toFixed(4)}°W`;
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedCoords(text);
  };

  const getLocationReviews = (stateId: string, locName: string) => {
    return reviews[`${stateId}-${locName}`] || [];
  };

  const getAverageRating = (stateId: string, locName: string) => {
    const revs = getLocationReviews(stateId, locName);
    if (!revs.length) return 0;
    return revs.reduce((s, r) => s + r.rating, 0) / revs.length;
  };

  return (
    <div style={{ backgroundColor: 'var(--cream)' }} className="pt-24 pb-24">
      <div className="content-max-width ruta-hero">
        <p className="font-label" style={{ color: 'var(--terracotta)' }}>Proximamente</p>
        <h1 className="font-display text-5xl md:text-7xl mt-4" style={{ color: 'var(--dark-coffee)' }}>
          Ruta Cafe & Cacao 2025
        </h1>
        <p className="font-body mt-6 max-w-2xl" style={{ color: 'var(--warm-brown)', opacity: 0.8 }}>
          Un recorrido por los estados productores de cafe y cacao de Venezuela. Descubre locales extraordinarios, conoce a los productores y comparte tu experiencia.
        </p>
      </div>

      {/* Map */}
      <div className="content-max-width mt-16" ref={mapRef}>
        <div className="relative mx-auto" style={{ maxWidth: '900px' }}>
          <svg viewBox="0 0 500 500" className="w-full h-auto">
            {allStates.map((state) => {
              const isRoute = routeStates.has(state.id);
              const isHovered = hoveredState === state.id;
              const isSelected = selectedState?.id === state.id;
              return (
                <path
                  key={state.id}
                  d={state.svgPath}
                  fill={
                    isSelected ? '#C17A47' :
                    isHovered && isRoute ? 'rgba(193,122,71,0.6)' :
                    isRoute ? 'rgba(193,122,71,0.4)' :
                    '#E8E0D4'
                  }
                  stroke={isRoute ? '#C17A47' : 'rgba(26,20,16,0.3)'}
                  strokeWidth={isSelected ? 2 : 1}
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={(e) => {
                    setHoveredState(state.id);
                    setTooltipPos({ x: (e as any).clientX, y: (e as any).clientY });
                  }}
                  onMouseMove={(e) => setTooltipPos({ x: e.clientX, y: e.clientY })}
                  onMouseLeave={() => setHoveredState(null)}
                  onClick={() => {
                    const vs = venezuelaStates.find((s) => s.id === state.id);
                    if (vs) handleStateClick(vs);
                  }}
                />
              );
            })}

            {/* Location dots for route states */}
            {venezuelaStates.map((state) =>
              state.locations.map((loc, i) => {
                const centroid = getCentroid(state.svgPath);
                const offsetX = (i - state.locations.length / 2) * 15;
                return (
                  <circle
                    key={`${state.id}-${loc.name}`}
                    cx={centroid.x + offsetX}
                    cy={centroid.y}
                    r="4"
                    fill={loc.type === 'cafe' ? '#C17A47' : '#5A7D4A'}
                    stroke="white"
                    strokeWidth="1"
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedState(state);
                      setSelectedLocation(loc.name);
                    }}
                  />
                );
              })
            )}
          </svg>

          {/* Tooltip */}
          {hoveredState && (
            <div
              className="fixed pointer-events-none z-50 px-4 py-2 rounded-lg text-sm font-medium"
              style={{
                left: tooltipPos.x + 15,
                top: tooltipPos.y - 10,
                backgroundColor: 'var(--cream)',
                color: 'var(--dark-coffee)',
                border: '1px solid rgba(26,20,16,0.15)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            >
              {allStates.find((s) => s.id === hoveredState)?.name}
            </div>
          )}

          {/* Legend */}
          <div className="flex flex-wrap gap-6 mt-8 justify-center">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-sm inline-block" style={{ backgroundColor: 'rgba(193,122,71,0.4)' }} />
              <span className="font-caption text-xs" style={{ color: 'var(--warm-brown)' }}>Ruta Cafe & Cacao</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: '#C17A47' }} />
              <span className="font-caption text-xs" style={{ color: 'var(--warm-brown)' }}>Cafe</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: '#5A7D4A' }} />
              <span className="font-caption text-xs" style={{ color: 'var(--warm-brown)' }}>Cacao</span>
            </div>
          </div>
        </div>
      </div>

      {/* State Detail Panel */}
      {selectedState && (
        <>
          <div className="fixed inset-0 z-[60] bg-[#1A1410]/30" onClick={() => { setSelectedState(null); setShowReviewForm(false); }} />
          <div
            className="fixed top-0 right-0 h-full z-[70] overflow-y-auto"
            style={{
              width: 'clamp(320px, 90vw, 500px)',
              backgroundColor: 'var(--cream)',
            }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-3xl" style={{ color: 'var(--dark-coffee)' }}>{selectedState.name}</h2>
                <button
                  onClick={() => { setSelectedState(null); setShowReviewForm(false); }}
                  className="p-2 hover:text-terracotta transition-colors"
                  style={{ color: 'var(--dark-coffee)' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {selectedState.locations.map((loc) => {
                const locReviews = getLocationReviews(selectedState.id, loc.name);
                const avgRating = getAverageRating(selectedState.id, loc.name);
                return (
                  <div key={loc.name} className="mb-8 pb-8" style={{ borderBottom: '1px solid var(--light-border)' }}>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display text-xl" style={{ color: 'var(--dark-coffee)' }}>{loc.name}</h3>
                      <span
                        className="px-2 py-0.5 rounded-full font-caption text-xs"
                        style={{
                          backgroundColor: loc.type === 'cafe' ? 'var(--terracotta)' : '#5A7D4A',
                          color: 'white',
                        }}
                      >
                        {loc.type === 'cafe' ? 'Cafe' : 'Cacao'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-caption text-xs" style={{ color: 'var(--warm-brown)', opacity: 0.7 }}>
                        {loc.coords.lat.toFixed(4)}°N, {Math.abs(loc.coords.lng).toFixed(4)}°W
                      </p>
                      <button
                        onClick={() => copyCoords(loc.coords)}
                        className="p-1 hover:text-terracotta transition-colors"
                        style={{ color: 'var(--warm-brown)', opacity: 0.5 }}
                        title="Copiar coordenadas"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                        </svg>
                      </button>
                    </div>
                    {copiedCoords && (
                      <p className="font-caption text-xs mb-2" style={{ color: 'var(--success)' }}>Coordenadas copiadas</p>
                    )}

                    <p className="font-body text-sm" style={{ color: 'var(--warm-brown)' }}>{loc.description}</p>

                    {/* Reviews */}
                    <div className="mt-4">
                      <div className="flex items-center gap-3">
                        <StarRating rating={Math.round(avgRating)} />
                        <span className="font-caption text-xs" style={{ color: 'var(--warm-brown)' }}>({locReviews.length} resenas)</span>
                      </div>

                      {locReviews.length > 0 && (
                        <div className="mt-4 space-y-3">
                          {locReviews.map((rev, ri) => (
                            <div key={ri} className="bg-[rgba(26,20,16,0.03)] p-4 rounded-lg">
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-sm" style={{ color: 'var(--dark-coffee)' }}>{rev.author}</span>
                                <span className="font-caption text-xs" style={{ color: 'var(--warm-brown)', opacity: 0.5 }}>{rev.date}</span>
                              </div>
                              <StarRating rating={rev.rating} />
                              <p className="font-body text-sm mt-2" style={{ color: 'var(--warm-brown)' }}>{rev.comment}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {!showReviewForm && (
                        <button
                          onClick={() => { setShowReviewForm(true); setSelectedLocation(loc.name); }}
                          className="mt-4 font-nav text-xs transition-colors hover:text-terracotta"
                          style={{ color: 'var(--dark-coffee)' }}
                        >
                          Escribir Resena
                        </button>
                      )}

                      {showReviewForm && selectedLocation === loc.name && (
                        <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: 'rgba(26,20,16,0.03)' }}>
                          <h4 className="font-semibold text-sm mb-3" style={{ color: 'var(--dark-coffee)' }}>Nueva Resena</h4>
                          <input
                            type="text"
                            placeholder="Tu nombre"
                            value={reviewState.name}
                            onChange={(e) => setReviewState({ ...reviewState, name: e.target.value })}
                            className="w-full px-3 py-2 mb-3 text-sm rounded border bg-transparent"
                            style={{ borderColor: 'var(--light-border)', color: 'var(--dark-coffee)' }}
                          />
                          <div className="mb-3">
                            <p className="font-caption text-xs mb-1" style={{ color: 'var(--warm-brown)' }}>Calificacion</p>
                            <StarRating
                              rating={reviewState.rating}
                              onRate={(r) => setReviewState({ ...reviewState, rating: r })}
                            />
                          </div>
                          <textarea
                            placeholder="Comparte tu experiencia..."
                            value={reviewState.comment}
                            onChange={(e) => setReviewState({ ...reviewState, comment: e.target.value })}
                            className="w-full px-3 py-2 mb-3 text-sm rounded border bg-transparent resize-none"
                            style={{ borderColor: 'var(--light-border)', color: 'var(--dark-coffee)', minHeight: '80px' }}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAddReview(selectedState.id, loc.name)}
                              className="px-4 py-2 text-white font-nav text-xs"
                              style={{ backgroundColor: 'var(--terracotta)' }}
                            >
                              Enviar Resena
                            </button>
                            <button
                              onClick={() => setShowReviewForm(false)}
                              className="px-4 py-2 font-nav text-xs"
                              style={{ color: 'var(--warm-brown)' }}
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Timeline */}
      <div className="content-max-width mt-24">
        <h2 className="font-display text-3xl mb-12 text-center" style={{ color: 'var(--dark-coffee)' }}>Cronograma de la Ruta</h2>
        <div className="relative max-w-lg mx-auto">
          <div className="absolute left-4 top-0 bottom-0 w-0.5" style={{ backgroundColor: 'var(--terracotta)' }} />
          {venezuelaStates.flatMap((s) => s.locations).map((loc, i) => (
            <div key={`${loc.name}-${i}`} className="relative flex items-start gap-6 mb-8 ml-4">
              <div
                className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-1 ${i === 0 ? 'animate-pulse' : ''}`}
                style={{
                  backgroundColor: i < 3 ? 'var(--terracotta)' : 'transparent',
                  borderColor: 'var(--terracotta)',
                }}
              />
              <div>
                <p className="font-caption text-xs" style={{ color: 'var(--terracotta)' }}>
                  {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'][i % 5]} 2025
                </p>
                <h4 className="font-display text-lg" style={{ color: 'var(--dark-coffee)' }}>{loc.name}</h4>
                <p className="font-body text-sm" style={{ color: 'var(--warm-brown)' }}>{loc.description.slice(0, 60)}...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function getCentroid(pathD: string): { x: number; y: number } {
  const matches = pathD.match(/[\d.]+/g);
  if (!matches) return { x: 250, y: 250 };
  const nums = matches.map(Number);
  let sumX = 0, sumY = 0, count = 0;
  for (let i = 0; i < nums.length; i += 2) {
    sumX += nums[i];
    sumY += nums[i + 1] || 0;
    count++;
  }
  return { x: sumX / count, y: sumY / count };
}
