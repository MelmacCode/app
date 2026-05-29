import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  { title: 'Toma del cafe', location: 'Andes venezolanos', image: '/images/grid-toma-cafe.jpg' },
  { title: 'Cultivo de cacao', location: 'Barlovento', image: '/images/hero-background-2.jpg' },
  { title: 'Proceso natural', location: 'Finca Las Mercedes', image: '/images/about-background.jpg' },
  { title: 'Recorrido por el cafetal', location: 'Merida', image: '/images/product-ruta-experiencia.jpg' },
  { title: 'Cosecha de cacao', location: 'Paria', image: '/images/journey-background.jpg' },
  { title: 'Tostion artesanal', location: 'Caracas', image: '/images/hero-background-1.jpg' },
  { title: 'Empaque de cafe', location: 'Trujillo', image: '/images/product-cafe-trujillo.jpg' },
  { title: 'Preparacion de chocolate', location: 'Carupano', image: '/images/product-chocolate-paria.jpg' },
  { title: 'Degustacion guiada', location: 'Barquisimeto', image: '/images/service-itinerarios.jpg' },
];

const services = [
  { num: '01', name: 'Itinerarios de Cafe y Cacao', desc: 'Creamos experiencias inolvidables que incluyen talleres, degustaciones y encuentros con los agricultores.', image: '/images/service-itinerarios.jpg' },
  { num: '02', name: 'Apoyo a Productores Locales', desc: 'Facilitamos la conexion entre caficultores y consumidores, asegurando comercio justo.', image: '/images/hero-background-1.jpg' },
  { num: '03', name: 'Tienda Online', desc: 'Descubre nuestra seleccion de merchandising y productos exclusivos.', image: '/images/product-cafe-caracas.jpg' },
  { num: '04', name: 'Turismo Responsable', desc: 'Promovemos un turismo que resalta la cultura y biodiversidad de Venezuela.', image: '/images/about-background.jpg' },
  { num: '05', name: 'Degustaciones de Cafe', desc: 'Vive la experiencia de degustar y aprender sobre diferentes variedades de cafe venezolano.', image: '/images/grid-toma-cafe.jpg' },
  { num: '06', name: 'Experiencias Personalizadas', desc: 'Ofrecemos recorridos adaptados a tus gustos y preferencias.', image: '/images/product-ruta-experiencia.jpg' },
];

const testimonials = [
  { quote: 'Viajar con La Taza Nomada fue magico. El cafe y el cacao son una explosion de sabores que no te puedes perder.', author: 'Maria, viajera apasionada' },
  { quote: 'Cada tour es una nueva aventura. Aprendi tanto sobre el cafe y conoci a productores que son verdaderos artistas.', author: 'Juan, amante del cafe' },
  { quote: 'Fui por el cafe, pero volvi con recuerdos inolvidables y nuevos amigos. Es mas que un viaje, es una conexion cultural.', author: 'Ana, blogger de viajes' },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo('.hero-label', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 });
      gsap.fromTo('.hero-headline', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.4 });
      gsap.fromTo('.hero-divider', { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power3.inOut', delay: 0.6 });
      gsap.fromTo('.hero-caption', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.9 });

      // About section
      gsap.fromTo('.about-card', { opacity: 0, x: -60 }, {
        opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: aboutRef.current, start: 'top 80%' }
      });
      gsap.fromTo('.service-col', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.service-col-wrapper', start: 'top 80%' }
      });

      // Grid section
      gsap.fromTo('.grid-section-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' }
      });
      gsap.fromTo('.exp-grid-item', { opacity: 0, scale: 0.95 }, {
        opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.exp-grid', start: 'top 80%' }
      });

      // Journey banner
      gsap.fromTo('.journey-content > *', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.journey-section', start: 'top 80%' }
      });

      // Services
      gsap.fromTo('.services-header > *', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: servicesRef.current, start: 'top 80%' }
      });
      gsap.utils.toArray<HTMLElement>('.service-row').forEach((row) => {
        gsap.fromTo(row.querySelector('.service-img'), { opacity: 0, x: -60 }, {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 80%' }
        });
        gsap.fromTo(row.querySelector('.service-text'), { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 80%' }
        });
      });

      // Testimonials
      gsap.fromTo('.testimonial-card', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: testimonialsRef.current, start: 'top 80%' }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: 'var(--cream)' }}
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-background-1.jpg"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="content-max-width relative z-10 pt-24">
          <p className="hero-label font-label opacity-0" style={{ color: 'var(--warm-brown)', opacity: 0.7 }}>
            La Taza Nomada — Viajes de Cafe y Cacao
          </p>
          <h1 className="hero-headline font-display mt-6 opacity-0" style={{ fontSize: 'clamp(48px, 8vw, 96px)', color: 'var(--dark-coffee)' }}>
            Descubre los secretos del{' '}
            <span style={{ color: 'var(--terracotta)' }}>cafe</span> y cacao venezolano.
          </h1>
          <div
            className="hero-divider my-12 h-px origin-center"
            style={{ backgroundColor: 'var(--dark-coffee)', opacity: 0.2 }}
          />
          <p className="hero-caption font-body max-w-md opacity-0" style={{ color: 'var(--warm-brown)', opacity: 0.8, fontSize: 'clamp(16px, 1.2vw, 18px)' }}>
            Explora paisajes extraordinarios, conecta con productores locales y disfruta de experiencias unicas que despertaran tus sentidos.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="section-padding relative overflow-hidden" style={{ backgroundColor: 'var(--cream)' }}>
        <div className="absolute inset-0 z-0">
          <img src="/images/about-background.jpg" alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, var(--cream) 0%, transparent 30%, transparent 70%, var(--cream) 100%)' }} />
        </div>
        <div className="content-max-width relative z-10">
          <div className="flex flex-col md:flex-row gap-6 mb-16">
            <div className="about-card bg-[rgba(250,247,242,0.85)] backdrop-blur-sm p-6 rounded-lg">
              <p className="font-label" style={{ color: 'var(--terracotta)' }}>Sobre Nosotros</p>
            </div>
            <div className="about-card bg-[rgba(250,247,242,0.85)] backdrop-blur-sm p-6 rounded-lg md:mt-8">
              <h2 className="font-display text-2xl md:text-4xl" style={{ color: 'var(--dark-coffee)' }}>
                Nuestra historia, tu proxima aventura.
              </h2>
            </div>
          </div>
          <div className="service-col-wrapper grid md:grid-cols-3 gap-8">
            {[
              { title: 'Itinerarios', text: 'Creamos experiencias inolvidables que incluyen talleres, degustaciones y encuentros con los agricultores. Ven y descubre de donde proviene el autentico sabor.' },
              { title: 'Productores', text: 'Facilitamos la conexion entre caficultores y consumidores, asegurando que cada producto llegue de manera justa y sostenible.' },
              { title: 'Tienda Online', text: 'Descubre nuestra seleccion de merchandising y productos exclusivos directamente desde el corazon de la tradicion cafetera.' },
            ].map((col) => (
              <div key={col.title} className="service-col p-6 rounded-lg transition-colors hover:bg-[rgba(26,20,16,0.02)]" style={{ borderTop: '1px solid var(--light-border)' }}>
                <h3 className="font-label mb-4" style={{ color: 'var(--terracotta)' }}>{col.title}</h3>
                <p className="font-body text-sm" style={{ color: 'var(--warm-brown)' }}>{col.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Grid */}
      <section ref={gridRef} className="section-padding" style={{ backgroundColor: 'var(--cream)' }}>
        <div className="content-max-width">
          <h2 className="grid-section-header font-display text-3xl md:text-5xl mb-12" style={{ color: 'var(--dark-coffee)' }}>
            Experiencias Inolvidables
          </h2>
          <div className="exp-grid grid grid-cols-2 md:grid-cols-3 gap-1">
            {experiences.map((exp, i) => (
              <div key={i} className="exp-grid-item relative overflow-hidden group" style={{ aspectRatio: '4/5' }}>
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#1A1410]/20 transition-opacity group-hover:bg-[#1A1410]/10" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300" style={{ background: 'linear-gradient(to top, rgba(26,20,16,0.8), transparent)' }}>
                  <p className="font-label text-xs" style={{ color: 'var(--muted-gold)' }}>{exp.location}</p>
                  <p className="font-display text-lg mt-1" style={{ color: 'var(--light-text)' }}>{exp.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Banner */}
      <section className="journey-section relative min-h-[80vh] flex items-center justify-center overflow-hidden" style={{ minHeight: '600px' }}>
        <div className="absolute inset-0 z-0">
          <img
            src="/images/journey-background.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.5)' }}
          />
        </div>
        <div className="content-max-width relative z-10 text-center journey-content">
          <p className="font-label mb-6" style={{ color: 'var(--muted-gold)' }}>Proxima Aventura</p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl" style={{ color: 'var(--light-text)', maxWidth: '900px', margin: '0 auto' }}>
            Ruta Cafe & Cacao por Venezuela.
          </h2>
          <p className="font-body mt-6 max-w-xl mx-auto" style={{ color: 'rgba(245,237,224,0.8)' }}>
            Un recorrido unico por los estados productores de cafe y cacao. Descubre locales extraordinarios, conoce a los productores y deja tu resena en cada parada.
          </p>
          <Link
            to="/ruta-cafe-cacao"
            className="inline-block mt-8 px-10 py-4 text-white font-nav text-sm transition-all hover:scale-[1.02]"
            style={{ backgroundColor: 'var(--terracotta)', letterSpacing: '1px' }}
          >
            Explorar la Ruta
          </Link>
        </div>
      </section>

      {/* Services */}
      <section ref={servicesRef} className="section-padding" style={{ backgroundColor: 'var(--cream)' }}>
        <div className="content-max-width">
          <div className="services-header mb-16">
            <p className="font-label mb-4" style={{ color: 'var(--terracotta)' }}>Nuestros Servicios</p>
            <h2 className="font-display text-3xl md:text-5xl" style={{ color: 'var(--dark-coffee)' }}>
              Todo lo que necesitas para tu aventura cafetera.
            </h2>
          </div>
          <div className="flex flex-col gap-24">
            {services.map((svc, i) => (
              <div
                key={svc.num}
                className={`service-row grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? 'md:[direction:rtl]' : ''}`}
              >
                <div className={`service-img relative overflow-hidden rounded-lg ${i % 2 === 1 ? 'md:[direction:ltr]' : ''}`} style={{ aspectRatio: '4/3' }}>
                  <span className="absolute top-4 left-4 font-display text-8xl z-10 pointer-events-none" style={{ color: 'rgba(26,20,16,0.06)' }}>{svc.num}</span>
                  <img src={svc.image} alt={svc.name} className="w-full h-full object-cover" />
                </div>
                <div className={`service-text ${i % 2 === 1 ? 'md:[direction:ltr]' : ''}`}>
                  <span className="font-display text-7xl" style={{ color: 'rgba(26,20,16,0.06)' }}>{svc.num}</span>
                  <h3 className="font-label mt-4 mb-4" style={{ color: 'var(--terracotta)' }}>{svc.name}</h3>
                  <p className="font-body" style={{ color: 'var(--warm-brown)' }}>{svc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="py-24" style={{ backgroundColor: 'var(--warm-overlay)' }}>
        <div className="content-max-width">
          <p className="font-label text-center mb-4" style={{ color: 'var(--terracotta)' }}>Testimonios</p>
          <h2 className="font-display text-3xl md:text-4xl text-center mb-16" style={{ color: 'var(--dark-coffee)' }}>
            Lo que dicen nuestros viajeros
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card bg-white p-10 rounded-lg" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
                <p className="font-display text-xl italic" style={{ color: 'var(--warm-brown)' }}>"{t.quote}"</p>
                <p className="font-caption mt-6" style={{ color: 'var(--terracotta)' }}>{t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
