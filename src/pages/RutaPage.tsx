import { useState } from "react";
import { MapPin, Star, Send, X } from "lucide-react";
import { venezuelaStates, type Review } from "@/data/map";
import { SEO } from "@/hooks/useSEO";
import LazyImage from "@/components/LazyImage";

export default function RutaPage() {
  const [selectedState, setSelectedState] = useState(venezuelaStates[0]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewState, setReviewState] = useState({ name: "", rating: 5, comment: "" });
  const [reviews, setReviews] = useState<Record<string, Review[]>>({});

  const addReview = (locationName: string) => {
    if (!reviewState.name.trim() || !reviewState.comment.trim()) return;
    const newReview: Review = {
      author: reviewState.name,
      date: new Date().toISOString().split("T")[0],
      rating: reviewState.rating,
      comment: reviewState.comment,
    };
    setReviews((prev) => ({
      ...prev,
      [locationName]: [...(prev[locationName] || []), newReview],
    }));
    setReviewState({ name: "", rating: 5, comment: "" });
    setShowReviewForm(false);
  };

  return (
    <div className="pt-32 pb-20" style={{ backgroundColor: "var(--taza-cream)" }}>
      <SEO
        title="Ruta Cafe & Cacao | La Taza Nomada"
        description="Recorre los estados productores de cafe y cacao de Venezuela. Descubre fincas, tostaderos y plantaciones con nuestra ruta interactiva."
        url="/ruta"
        image="/og-image.jpg"
      />

      <div className="content-max-width">
        <div className="text-center mb-16">
          <p className="font-label mb-4" style={{ color: "var(--taza-brown)" }}>Ruta Interactiva</p>
          <h1 className="font-display text-5xl md:text-6xl mb-6" style={{ color: "var(--taza-dark)" }}>
            Ruta Cafe & Cacao 2025
          </h1>
          <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: "var(--taza-dark-light)" }}>
            Explora las regiones productoras de cafe y cacao de Venezuela. Haz clic en un estado para descubrir sus fincas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map */}
          <div className="rounded-2xl border p-8" style={{ borderColor: "var(--taza-border)", backgroundColor: "var(--taza-cream-light)" }}>
            <svg viewBox="0 0 500 400" className="w-full h-auto">
              {venezuelaStates.map((state) => (
                <path
                  key={state.id}
                  d={state.svgPath}
                  onClick={() => {
                    setSelectedState(state);
                    setSelectedLocation(null);
                    setShowReviewForm(false);
                  }}
                  className="cursor-pointer transition-all duration-300"
                  style={{
                    fill: selectedState.id === state.id ? "var(--taza-brown)" : "var(--taza-cream)",
                    stroke: "var(--taza-dark)",
                    strokeWidth: 1.5,
                    opacity: selectedState.id === state.id ? 1 : 0.6,
                  }}
                  onMouseEnter={(e) => {
                    if (selectedState.id !== state.id) {
                      e.currentTarget.style.fill = "var(--taza-gold)";
                      e.currentTarget.style.opacity = "0.8";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedState.id !== state.id) {
                      e.currentTarget.style.fill = "var(--taza-cream)";
                      e.currentTarget.style.opacity = "0.6";
                    }
                  }}
                />
              ))}
            </svg>
            <p className="font-caption text-center mt-4" style={{ color: "var(--taza-dark-light)" }}>
              Haz clic en un estado para explorar
            </p>
          </div>

          {/* Locations */}
          <div>
            <h2 className="font-display text-3xl mb-6" style={{ color: "var(--taza-dark)" }}>
              {selectedState.name}
            </h2>
            <div className="space-y-6">
              {selectedState.locations.map((loc) => (
                <div
                  key={loc.name}
                  className="rounded-xl border p-6 transition-all duration-300 hover:shadow-md"
                  style={{ borderColor: "var(--taza-border)", backgroundColor: "var(--taza-cream)" }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: loc.type === "cafe" ? "var(--taza-brown)" : "var(--taza-gold)" }}
                    >
                      <MapPin className="w-5 h-5" style={{ color: "var(--taza-cream)" }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl" style={{ color: "var(--taza-dark)" }}>{loc.name}</h3>
                      <p className="font-body text-sm mt-1" style={{ color: "var(--taza-dark-light)" }}>{loc.description}</p>
                      <p className="font-caption mt-2 flex items-center gap-1" style={{ color: "var(--taza-brown)" }}>
                        <MapPin className="w-3 h-3" />
                        {loc.coords.lat.toFixed(4)}, {loc.coords.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>

                  {/* Reviews */}
                  <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--taza-border)" }}>
                    {(reviews[loc.name] || loc.reviews).map((review, idx) => (
                      <div key={idx} className="mb-3 last:mb-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-caption" style={{ color: "var(--taza-dark)" }}>{review.author}</span>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3"
                                style={{ color: i < review.rating ? "var(--taza-gold)" : "var(--taza-border)" }}
                                fill={i < review.rating ? "var(--taza-gold)" : "none"}
                              />
                            ))}
                          </div>
                          <span className="font-caption ml-auto" style={{ color: "var(--taza-dark-light)" }}>{review.date}</span>
                        </div>
                        <p className="font-body text-sm" style={{ color: "var(--taza-dark-light)" }}>{review.comment}</p>
                      </div>
                    ))}

                    {!showReviewForm && (
                      <button
                        onClick={() => {
                          setSelectedLocation(loc.name);
                          setShowReviewForm(true);
                        }}
                        className="mt-3 font-nav text-xs transition-colors hover:underline"
                        style={{ color: "var(--taza-brown)" }}
                      >
                        Escribir una resena
                      </button>
                    )}

                    {showReviewForm && selectedLocation === loc.name && (
                      <div className="mt-4 p-4 rounded-lg border" style={{ borderColor: "var(--taza-border)", backgroundColor: "var(--taza-cream-light)" }}>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-display text-lg" style={{ color: "var(--taza-dark)" }}>Nueva Resena</h4>
                          <button onClick={() => setShowReviewForm(false)}>
                            <X className="w-4 h-4" style={{ color: "var(--taza-dark-light)" }} />
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Tu nombre"
                          value={reviewState.name}
                          onChange={(e) => setReviewState({ ...reviewState, name: e.target.value })}
                          className="w-full px-3 py-2 mb-3 text-sm rounded border bg-transparent"
                          style={{ borderColor: "var(--taza-border-strong)", color: "var(--taza-dark)" }}
                        />
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-caption" style={{ color: "var(--taza-dark-light)" }}>Calificacion:</span>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((r) => (
                              <button
                                key={r}
                                onClick={() => setReviewState({ ...reviewState, rating: r })}
                              >
                                <Star
                                  className="w-4 h-4"
                                  style={{ color: r <= reviewState.rating ? "var(--taza-gold)" : "var(--taza-border)" }}
                                  fill={r <= reviewState.rating ? "var(--taza-gold)" : "none"}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        <textarea
                          placeholder="Tu comentario..."
                          value={reviewState.comment}
                          onChange={(e) => setReviewState({ ...reviewState, comment: e.target.value })}
                          rows={3}
                          className="w-full px-3 py-2 mb-3 text-sm rounded border bg-transparent resize-none"
                          style={{ borderColor: "var(--taza-border-strong)", color: "var(--taza-dark)" }}
                        />
                        <button
                          onClick={() => addReview(loc.name)}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg font-nav text-xs transition-all hover:scale-105"
                          style={{ backgroundColor: "var(--taza-brown)", color: "var(--taza-cream)" }}
                        >
                          <Send className="w-3 h-3" />
                          Enviar resena
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}