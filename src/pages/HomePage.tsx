import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '@/hooks/useSEO';
import { generateOrganizationSchema, generateLocalBusinessSchema } from '@/lib/seo';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  { location: 'Merida, Venezuela', title: 'Tour del Cafe Andino', image: '/images/exp1.jpg' },
  { location: 'Barlovento, Venezuela', title: 'Ruta del Cacao Criollo', image: '/images/exp2.jpg' },
  { location: 'Caracas, Venezuela', title: 'Experiencia Sensorial Urbana', image: '/images/exp3.jpg' },
  { location: 'Tovar, Venezuela', title: 'Cosecha y Tueste Artesanal', image: '/images/exp4.jpg' },
];

const services = [
  { num: '01', name: 'Tours Guiados', desc: 'Recorridos personalizados por fincas cafetaleras y cacaoteras con guias expertos.', image: '/images/svc1.jpg' },
  { num: '02', name: 'Talleres', desc: 'Aprende desde la siembra hasta la taza. Degustaciones, tostado y preparacion.', image: '/images/svc2.jpg' },
  { num: '03', name: 'Tienda Online', desc: 'Productos seleccionados directamente de nuestros productores aliados.', image: '/images/svc3.jpg' },
];

const testimonials = [
  { quote: 'Una experiencia que cambio mi forma de ver el cafe. Conocer a los productores fue increible.', author: 'Ana Maria R.' },
  { quote: 'La ruta del cacao en Barlovento fue magica. Recomiendo 100%.', author: 'Carlos G.' },
  { quote: 'El tour en Merida supero todas mis expectativas. Paisajes y cafe de otro nivel.', author: 'Laura P.' },
];

export default function HomePage() {
  const aboutRef = useRef(null);
  const gridRef = useRef(null);
  const servicesRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-label', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 });
      gsap.fromTo('.hero-headline', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.4 });
      gsap.fromTo('.hero-divider', { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power3.inOut', delay: 0.6 });
      gsap.fromTo('.hero-caption', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.9 });

      gsap.fromTo('.about-card', { opacity: 0, x: -60 }, {
        opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: aboutRef.current, start: 'top 80%' }
      });
      gsap.fromTo('.service-col', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.service-col-wrapper', start: 'top 80%' }
      });

      gsap.fromTo('.grid-section-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' }
      });
      gsap.fromTo('.exp-grid-item', { opacity: 0, scale: 0.95 }, {
        opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.exp-grid', start: 'top 80%' }
      });

      gsap.fromTo('.journey-content > *', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.journey-section', start: 'top 80%' }
      });

      gsap.fromTo('.services-header > *', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: servicesRef.current, start: 'top 80%' }
      });

      const serviceRows = gsap.utils.toArray('.service-row') as HTMLElement[];
      serviceRows.forEach((row) => {
        const imgEl = row.querySelector('.service-img');
        const textEl = row.querySelector('.service-text');
        if (imgEl) {
          gsap.fromTo(imgEl, { opacity: 0, x: -60 }, {
            opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 80%' }
          });
        }
        if (textEl) {
          gsap.fromTo(textEl, { opacity: 0, y: 40 }, {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 80%' }
          });
        }
      });

      gsap.fromTo('.testimonial-card', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: testimonialsRef.current, start: 'top 80%' }
      });
    });

    return () => ctx.revert();
  }, []);

  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://latazanomada.com';

  const schemas = [
    generateOrganizationSchema({
      name: 'La Taza Nomada',
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      sameAs: [
        'https://www.instagram.com/latazanomada/',
        'https://www.tiktok.com/@latazanomada',
        'https://www.facebook.com/latazanomada',
      ],
      contactPoint: {
        telephone: '+58-412-1234567',
        contactType: 'customer service',
        areaServed: 'VE, MX',
      },
    }),
    generateLocalBusinessSchema(),
  ];

  return (
    <>
      <SEO
        title="La Taza Nomada"
        description="Cafe de origen seleccionado de las mejores regiones cafetaleras. Una experiencia sensorial unica que viaja contigo."
        url="/"
        type="website"
        schema={schemas}
      />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#38201E]">
        <div className="absolute inset-0 opacity-40">
          <img src="/images/hero.jpg" alt="Cafe y cacao" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <p className="hero-label font-label text-[#D5B073] mb-4 opacity-0">Descubre los secretos del cafe y cacao venezolano.</p>
          <h1 className="hero-headline font-display text-5xl md:text-7xl lg:text-8xl text-[#F0EAD6] mb-6 opacity-0">
            La Taza Nomada
          </h1>
          <div className="hero-divider w-24 h-px bg-[#D5B073] mx-auto mb-6 origin-center" />
          <p className="hero-caption font-body text-lg text-[#F0EAD6]/80 max-w-2xl mx-auto opacity-0">
            Explora paisajes extraordinarios, conecta con productores locales y disfruta de experiencias unicas que despertaran tus sentidos.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-24 md:py-32 bg-[#F0EAD6]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-label text-[#63341F] mb-4">Sobre Nosotros</p>
              <h2 className="font-display text-4xl md:text-5xl text-[#38201E] mb-6">
                Nuestra historia, tu proxima aventura.
              </h2>
            </div>
            <div className="space-y-8">
              {[
                { title: 'Itinerarios', text: 'Creamos experiencias inolvidables que incluyen talleres, degustaciones y encuentros con los agricultores. Ven y descubre de donde proviene el autentico sabor.' },
                { title: 'Productores', text: 'Facilitamos la conexion entre caficultores y consumidores, asegurando que cada producto llegue de manera justa y sostenible.' },
                { title: 'Tienda Online', text: 'Descubre nuestra seleccion de merchandising y productos exclusivos directamente desde el corazon de la tradicion cafetera.' },
              ].map((col) => (
                <div key={col.title} className="about-card border-l-2 border-[#63341F] pl-6">
                  <h3 className="font-display text-xl text-[#38201E] mb-2">{col.title}</h3>
                  <p className="font-body text-[#38201E]/70">{col.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Grid */}
      <section ref={gridRef} className="py-24 md:py-32 bg-[#38201E]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid-section-header text-center mb-16">
            <p className="font-label text-[#D5B073] mb-4">Experiencias</p>
            <h2 className="font-display text-4xl md:text-5xl text-[#F0EAD6]">
              Experiencias Inolvidables
            </h2>
          </div>
          <div className="exp-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((exp, i) => (
              <div key={i} className="exp-grid-item group relative overflow-hidden rounded-lg aspect-[3/4] cursor-pointer">
                <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#38201E]/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="font-caption text-[#D5B073] mb-1">{exp.location}</p>
                  <h3 className="font-display text-xl text-[#F0EAD6]">{exp.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Banner */}
      <section className="journey-section py-24 md:py-32 bg-[#63341F]">
        <div className="journey-content max-w-4xl mx-auto px-6 text-center">
          <p className="font-label text-[#D5B073] mb-4">Proxima Aventura</p>
          <h2 className="font-display text-4xl md:text-5xl text-[#F0EAD6] mb-6">
            Ruta Cafe & Cacao por Venezuela.
          </h2>
          <p className="font-body text-lg text-[#F0EAD6]/80 mb-8">
            Un recorrido unico por los estados productores de cafe y cacao. Descubre el origen de tu taza.
          </p>
          <Link
            to="/ruta-cafe-cacao"
            className="inline-block px-8 py-4 border border-[#F0EAD6] text-[#F0EAD6] font-nav text-sm hover:bg-[#F0EAD6] hover:text-[#38201E] transition-all duration-300"
          >
            Explorar la Ruta
          </Link>
        </div>
      </section>

      {/* Services */}
      <section ref={servicesRef} className="py-24 md:py-32 bg-[#F0EAD6]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="services-header text-center mb-16">
            <p className="font-label text-[#63341F] mb-4">Nuestros Servicios</p>
            <h2 className="font-display text-4xl md:text-5xl text-[#38201E]">
              Todo lo que necesitas para tu aventura cafetera.
            </h2>
          </div>
          <div className="space-y-16">
            {services.map((svc, i) => (
              <div key={i} className={`service-row grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className={`service-img overflow-hidden rounded-lg ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                  <img src={svc.image} alt={svc.name} className="w-full h-80 object-cover" />
                </div>
                <div className={`service-text ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                  <span className="font-display text-6xl text-[#63341F]/20">{svc.num}</span>
                  <h3 className="font-display text-2xl text-[#38201E] mt-2 mb-4">{svc.name}</h3>
                  <p className="font-body text-[#38201E]/70">{svc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="py-24 md:py-32 bg-[#38201E]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-label text-[#D5B073] mb-4">Testimonios</p>
            <h2 className="font-display text-4xl md:text-5xl text-[#F0EAD6]">
              Lo que dicen nuestros viajeros
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card bg-[#F0EAD6]/5 border border-[#F0EAD6]/10 rounded-lg p-8">
                <p className="font-body text-[#F0EAD6]/90 italic mb-6">"{t.quote}"</p>
                <p className="font-caption text-[#D5B073]">— {t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}