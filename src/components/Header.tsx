import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore } from '@/stores/cartStore';

const navLinks = [
  { label: 'Inicio', href: '/', type: 'page' },
  { label: 'Tienda', href: '/tienda', type: 'page' },
  { label: 'Blog', href: '/blog', type: 'page' },
  { label: 'Ruta', href: '/ruta-cafe-cacao', type: 'page' },
  { label: 'Redes', href: '/redes', type: 'page' },
  { label: 'Contacto', href: '/contacto', type: 'page' },
];

function CoffeeCupLogo({ className = '', color = '#C17A47' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M8 18C8 18 8 30 14 32H26C32 30 32 18 32 18H8Z"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 14H34V18H6V14Z"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
      />
      <path
        d="M32 16C32 16 38 16 38 22C38 28 32 28 32 28"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M14 10C14 10 14 4 18 4C18 4 18 8 22 8C22 8 22 4 26 4C26 4 26 10 26 10"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const cartTotalItems = useCartStore((s) => s.totalItems());
  const setCartOpen = useCartStore((s) => s.setIsOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#FAF7F2]/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-5 lg:px-10 h-16">
          <Link to="/" className="flex items-center gap-2">
            <CoffeeCupLogo className="w-8 h-8" />
            <span className="font-label text-sm hidden sm:block" style={{ color: 'var(--dark-coffee)' }}>
              La Taza Nomada
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-nav relative group"
                style={{ color: 'var(--dark-coffee)' }}
              >
                <span className="group-hover:text-terracotta transition-colors duration-250">
                  {link.label}
                </span>
                <span
                  className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: 'var(--terracotta)' }}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 hover:text-terracotta transition-colors"
              style={{ color: 'var(--dark-coffee)' }}
              aria-label="Carrito"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {cartTotalItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center text-white"
                  style={{ backgroundColor: 'var(--terracotta)', fontSize: '10px' }}
                >
                  {cartTotalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2"
              style={{ color: 'var(--dark-coffee)' }}
              aria-label="Menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#FAF7F2] pt-20 px-8" onClick={() => setMobileMenuOpen(false)}>
          <nav className="flex flex-col gap-6" onClick={(e) => e.stopPropagation()}>
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-display text-4xl transition-colors"
                style={{
                  color: 'var(--dark-coffee)',
                  animationDelay: `${i * 0.05}s`,
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-6 mt-8 pt-8" style={{ borderTop: '1px solid var(--light-border)' }}>
              <a href="https://www.instagram.com/latazanomada/" target="_blank" rel="noopener noreferrer" className="hover:text-terracotta transition-colors" style={{ color: 'var(--warm-brown)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="https://www.tiktok.com/@latazanomada" target="_blank" rel="noopener noreferrer" className="hover:text-terracotta transition-colors" style={{ color: 'var(--warm-brown)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" />
                </svg>
              </a>
              <a href="https://www.facebook.com/latazanomada" target="_blank" rel="noopener noreferrer" className="hover:text-terracotta transition-colors" style={{ color: 'var(--warm-brown)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

export { CoffeeCupLogo };
