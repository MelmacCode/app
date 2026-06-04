import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, ArrowRight } from "lucide-react";

interface VideoIntroProps {
  onComplete: () => void;
}

export default function VideoIntro({ onComplete }: VideoIntroProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [canSkip, setCanSkip] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setCanSkip(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    console.log("Video cargado correctamente");
  };

  const handleVideoError = () => {
    console.error("Error al cargar el video. Mostrando fallback.");
    setVideoFailed(true);
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
      {/* INTENTO: Cargar video (oculto hasta que cargue) */}
      {!videoFailed && (
        <video
          ref={videoRef}
          src="/videos/intro.mp4"
          autoPlay
          muted={isMuted}
          playsInline
          preload="auto"
          onEnded={handleVideoEnd}
          onLoadedData={handleVideoLoaded}
          onError={handleVideoError}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: videoLoaded ? 1 : 0, transition: "opacity 1s ease" }}
        />
      )}

      {/* FALLBACK: Logo animado si el video falla */}
      {videoFailed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#38201E]">
          <div className="animate-pulse mb-6">
            <img
              src="/logo.png"
              alt="La Taza Nomada"
              className="h-24 w-auto md:h-32"
              style={{ filter: "drop-shadow(0 0 20px rgba(213,176,115,0.3))" }}
            />
          </div>
          <h1 className="font-display text-3xl md:text-5xl text-[#F0EAD6] mb-2">
            La Taza Nómada
          </h1>
          <p className="font-body text-[#D5B073] text-sm tracking-widest uppercase mb-8">
            Cafe y Cacao de Origen
          </p>
        </div>
      )}

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      {/* Controles abajo */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-end justify-between z-10">
        {!videoFailed && (
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
        )}

        {videoFailed && <div />}

        <button
          onClick={handleSkip}
          disabled={!canSkip}
          className={`flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-lg font-nav text-xs md:text-sm tracking-widest uppercase transition-all duration-300 ${
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