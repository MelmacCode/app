import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, ArrowRight } from "lucide-react";

interface VideoIntroProps {
  onComplete: () => void;
}

export default function VideoIntro({ onComplete }: VideoIntroProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [canSkip, setCanSkip] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loadStatus, setLoadStatus] = useState("Cargando video...");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setCanSkip(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    setLoadStatus("Video terminado");
  };

  const handleLoaded = () => {
    setLoadStatus("✅ Video cargado");
    console.log("Video cargado correctamente");
  };

  const handleCanPlay = () => {
    setLoadStatus("▶️ Listo para reproducir");
    console.log("Video listo para reproducir");
  };

  const handleError = () => {
    setLoadStatus("❌ Error: El video no se puede reproducir. Verifica formato H.264.");
    console.error("Error al cargar video. Posible causa: codec no compatible.");
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
      {/* Video */}
      <video
        ref={videoRef}
        src="/videos/intro.mp4"
        autoPlay
        muted={isMuted}
        playsInline
        preload="auto"
        onEnded={handleVideoEnd}
        onLoadedData={handleLoaded}
        onCanPlay={handleCanPlay}
        onError={handleError}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Estado de carga (debug visual) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center">
        <p className="font-body text-sm text-white/80 mb-2">{loadStatus}</p>
        <p className="font-caption text-xs text-white/50">
          Si ves este mensaje por más de 3 segundos, el video no se está cargando.
        </p>
      </div>

      {/* Logo arriba */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
        <img src="/logo.png" alt="La Taza Nomada" className="h-12 w-auto opacity-80" />
      </div>

      {/* Controles abajo */}
      <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between z-10">
        <button
          onClick={() => {
            setIsMuted(!isMuted);
            if (videoRef.current) {
              videoRef.current.muted = !isMuted;
            }
          }}
          className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>

        <button
          onClick={handleSkip}
          disabled={!canSkip}
          className={`flex items-center gap-2 px-8 py-4 rounded-lg font-nav text-sm tracking-widest uppercase transition-all duration-300 ${
            canSkip
              ? "bg-[#63341F] text-[#F0EAD6] hover:scale-105 hover:bg-[#4A2716]"
              : "bg-white/10 text-white/50 cursor-not-allowed"
          }`}
        >
          {videoEnded ? "Entrar al sitio" : canSkip ? "Saltar intro" : "Cargando..."}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}