import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, MapPin, Coffee, Bean, ShoppingBag, Star } from "lucide-react";
import { SEO } from "@/hooks/useSEO";
import LazyImage from "@/components/LazyImage";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  { location: "Merida, Venezuela", title: "Cata en los Andes", image: "/images/grid-toma-cafe.jpg" },
  { location: "Barlovento, Miranda", title: "Ruta del Cacao", image: "/images/grid-cacao.jpg" },
  { location: "Caracas, D.C.", title: "Tostadero Historico", image: "/images/grid-tostado.jpg" },
  { location: "Trujillo, Venezuela", title: "Finca La Candelaria", image: "/images/grid-finca.jpg" },
];

const services = [
  { num: "01", name: "Itinerarios", desc: "Disenamos rutas personalizadas por las zonas cafeteras y cacaoteras de Venezuela." },
  { num: "02", name: "Productores", desc: "Conectamos a pequenos productores con mercados justos y sostenibles." },
  { num: "03", name: "Tienda Online", desc: "Productos seleccionados directamente desde el corazon de la tradicion." },
  { num: "04", name: "Talleres", desc: "Capacitacion en catacion, barismo y procesamiento de cacao." },
];

const testimonials = [
  { quote: "La experiencia en Merida fue transformadora. Conocer de cerca el proceso del cafe cambio mi forma de consumirlo.", author: "Ana Rodriguez, Caracas" },
  { quote: "Un viaje que recomiendo a todos los amantes del cacao. La atencion y el conocimiento de los guias es excepcional.", author: "Carlos Mendez, Valencia" },
  { quote: "La Taza Nomada no es solo cafe, es una conexion con nuestra tierra. Volvere sin duda.", author: "Maria Lopez, Maracaibo" },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.from(".hero-title", { opacity: 0, y: 60, duration: 1.2, ease: "power3.out" });
      gsap.from(".hero-subtitle", { opacity: 0, y: 40, duration: 1, delay: 0.3, ease: "power3.out" });
      gsap.from(".hero-cta", { opacity: 0, y: 30, duration: 0.8, delay: 0.6, ease: "power3.out" });

      // About
      gsap.from(".about-col", {
        scrollTrigger: { trigger: aboutRef.current, start: "top 80%" },
        opacity: 0, y: 50, duration: 0.8, stagger: 0.2, ease: "power3.out",
      });

      // Services — FIX: cast explícito a HTMLElement[]
      const rows = gsap.utils.toArray(".service-row") as HTMLElement[];
      rows.forEach((row) => {
        gsap.from(row, {
          scrollTrigger: { trigger: row, start: "top 85%" },
          opacity: 0, x: -30, duration: 0.7, ease: "power3.out",
        });
      });

      // Testimonials
      gsap.from(".testimonial-card", {
        scrollTrigger: { trigger: ".testimonials-grid", start: "top 80%" },
        opacity: 0, y: 40, duration: 0.8, stagger: 0.15, ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <SEO
        title="La Taza Nomada | Cafe y Cacao de Origen"
        description="Descubre los secretos del cafe y cacao venezolano. Experiencias sensoriales unicas, productos de origen y rutas por las mejores regiones cafetaleras."
        url="/"
        image="/og-image.jpg"
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <LazyImage
            src="/images/hero-background-1.jpg"
            alt="Paisaje cafetalero venezolano"
            className="w-full h-full object-cover"
            containerClassName="w-full h-full"
          />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(56, 32, 30, 0.45)" }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="hero-subtitle font-label mb-6" style={{ color: "var(--taza-gold)" }}>
            Descubre los secretos del cafe y cacao venezolano.
          </p>
          <h1 className="hero-title font-display text-5xl md:text-7xl lg:text-8xl mb-8" style={{ color: "var(--taza-cream)" }}>
            La Taza Nomada
          </h1>
          <p className="hero-subtitle font-body text-lg md:text-xl max-w-2xl mx-auto mb-10" style={{ color: "rgba(240, 234, 214, 0.85)" }}>
            Explora paisajes extraordinarios, conecta con productores locales y disfruta de experiencias unicas que despertaran tus sentidos.
          </p>
          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tienda"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-nav transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: "var(--taza-brown)", color: "var(--taza-cream)" }}
            >
              <ShoppingBag className="w-4 h-4" />
              Explorar tienda
            </Link>
            <Link
              to="/ruta"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-nav border transition-all duration-300 hover:scale-105"
              style={{ borderColor: "var(--taza-cream)", color: "var(--taza-cream)" }}
            >
              <MapPin className="w-4 h-4" />
              Ver la ruta
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="section-padding" style={{ backgroundColor: "var(--taza-cream)" }}>
        <div className="content-max-width">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <p className="font-label mb-4" style={{ color: "var(--taza-brown)" }}>Sobre Nosotros</p>
              <h2 className="font-display text-4xl md:text-5xl" style={{ color: "var(--taza-dark)" }}>
                Nuestra historia, tu proxima aventura.
              </h2>
            </div>
            <p className="font-body text-lg" style={{ color: "var(--taza-dark-light)" }}>
              Somos una marca venezolana dedicada a celebrar el cafe y el cacao de origen. Conectamos a los productores locales con los amantes de estas bebidas, creando experiencias autenticas y sostenibles.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Itinerarios", text: "Creamos experiencias inolvidables que incluyen talleres, degustaciones y encuentros con los agricultores. Ven y descubre de donde proviene el autentico sabor." },
              { title: "Productores", text: "Facilitamos la conexion entre caficultores y consumidores, asegurando que cada producto llegue de manera justa y sostenible." },
              { title: "Tienda Online", text: "Descubre nuestra seleccion de merchandising y productos exclusivos directamente desde el corazon de la tradicion cafetera." },
            ].map((col) => (
              <div key={col.title} className="about-col p-8 rounded-xl border" style={{ borderColor: "var(--taza-border)" }}>
                <h3 className="font-display text-2xl mb-4" style={{ color: "var(--taza-dark)" }}>{col.title}</h3>
                <p className="font-body" style={{ color: "var(--taza-dark-light)" }}>{col.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Grid */}
      <section className="section-padding" style={{ backgroundColor: "var(--taza-dark)" }}>
        <div className="content-max-width">
          <p className="font-label mb-4" style={{ color: "var(--taza-gold)" }}>Experiencias</p>
          <h2 className="font-display text-4xl md:text-5xl mb-12" style={{ color: "var(--taza-cream)" }}>
            Experiencias Inolvidables
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-xl aspect-[4/5] cursor-pointer"
              >
                <LazyImage
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-caption mb-2 flex items-center gap-1" style={{ color: "var(--taza-gold)" }}>
                    <MapPin className="w-3 h-3" />
                    {exp.location}
                  </p>
                  <h3 className="font-display text-xl" style={{ color: "var(--taza-cream)" }}>{exp.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Banner */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <LazyImage
            src="/images/journey-background.jpg"
            alt="Ruta del cafe y cacao"
            className="w-full h-full object-cover"
            containerClassName="w-full h-full"
          />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(56, 32, 30, 0.6)" }} />
        </div>
        <div className="relative z-10 content-max-width text-center">
          <p className="font-label mb-4" style={{ color: "var(--taza-gold)" }}>Proxima Aventura</p>
          <h2 className="font-display text-4xl md:text-6xl mb-6" style={{ color: "var(--taza-cream)" }}>
            Ruta Cafe & Cacao por Venezuela.
          </h2>
          <p className="font-body text-lg max-w-2xl mx-auto mb-10" style={{ color: "rgba(240, 234, 214, 0.85)" }}>
            Un recorrido unico por los estados productores de cafe y cacao. Descubre el origen de tu taza.
          </p>
          <Link
            to="/ruta"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-nav transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: "var(--taza-brown)", color: "var(--taza-cream)" }}
          >
            Explorar la Ruta
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Services */}
      <section ref={servicesRef} className="section-padding" style={{ backgroundColor: "var(--taza-cream)" }}>
        <div className="content-max-width">
          <p className="font-label mb-4" style={{ color: "var(--taza-brown)" }}>Nuestros Servicios</p>
          <h2 className="font-display text-4xl md:text-5xl mb-16" style={{ color: "var(--taza-dark)" }}>
            Todo lo que necesitas para tu aventura cafetera.
          </h2>

          <div className="space-y-8">
            {services.map((svc) => (
              <div
                key={svc.num}
                className="service-row flex flex-col md:flex-row md:items-center gap-6 p-8 rounded-xl border transition-all duration-300 hover:shadow-md"
                style={{ borderColor: "var(--taza-border)" }}
              >
                <span className="font-display text-4xl md:text-5xl flex-shrink-0 w-20" style={{ color: "var(--taza-gold)" }}>
                  {svc.num}
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-2xl mb-2" style={{ color: "var(--taza-dark)" }}>{svc.name}</h3>
                  <p className="font-body" style={{ color: "var(--taza-dark-light)" }}>{svc.desc}</p>
                </div>
                <div className="flex-shrink-0">
                  {svc.num === "01" && <Coffee className="w-8 h-8" style={{ color: "var(--taza-brown)" }} />}
                  {svc.num === "02" && <Bean className="w-8 h-8" style={{ color: "var(--taza-brown)" }} />}
                  {svc.num === "03" && <ShoppingBag className="w-8 h-8" style={{ color: "var(--taza-brown)" }} />}
                  {svc.num === "04" && <Star className="w-8 h-8" style={{ color: "var(--taza-brown)" }} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding" style={{ backgroundColor: "var(--taza-cream-light)" }}>
        <div className="content-max-width">
          <p className="font-label mb-4" style={{ color: "var(--taza-brown)" }}>Testimonios</p>
          <h2 className="font-display text-4xl md:text-5xl mb-12" style={{ color: "var(--taza-dark)" }}>
            Lo que dicen nuestros viajeros
          </h2>

          <div className="testimonials-grid grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="testimonial-card p-8 rounded-xl border"
                style={{ borderColor: "var(--taza-border)", backgroundColor: "var(--taza-cream)" }}
              >
                <p className="font-body text-lg mb-6 italic" style={{ color: "var(--taza-dark)" }}>
                  "{t.quote}"
                </p>
                <p className="font-caption" style={{ color: "var(--taza-brown)" }}>
                  — {t.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}