import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore } from '@/stores/cartStore';

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Tienda', href: '/tienda' },
  { label: 'Blog', href: '/blog' },
  { label: 'Ruta', href: '/ruta-cafe-cacao' },
  { label: 'Redes', href: '/redes' },
  { label: 'Contacto', href: '/contacto' },
];

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
          scrolled ? 'bg-[#F0EAD6]/95 backdrop-blur-sm shadow-[0_4px_20px_rgba(99,52,31,0.15)]' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-5 lg:px-10 h-16">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo.jpeg"
              alt="La Taza Nomada"
              className="h-10 w-auto"
            />
            <span className="font-label text-sm hidden sm:block text-[#38201E]">
              La Taza Nomada
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-nav relative group text-[#38201E]"
              >
                <span className="group-hover:text-[#63341F] transition-colors duration-250">
                  {link.label}
                </span>
                <span className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300 bg-[#63341F]" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-[#38201E] hover:text-[#63341F] transition-colors"
              aria-label="Carrito"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {cartTotalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center text-[#F0EAD6] bg-[#63341F] font-medium">
                  {cartTotalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#38201E]"
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
        <div className="fixed inset-0 z-40 bg-[#F0EAD6] pt-20 px-8" onClick={() => setMobileMenuOpen(false)}>
          <nav className="flex flex-col gap-6" onClick={(e) => e.stopPropagation()}>
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-display text-4xl transition-colors text-[#38201E] hover:text-[#63341F]"
                style={{ animationDelay: `${i * 0.05}s` }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-6 mt-8 pt-8 border-t border-[rgba(56,32,30,0.08)]">
              <a href="https://www.instagram.com/latazanomada/" target="_blank" rel="noopener noreferrer" className="text-[#38201E] hover:text-[#63341F] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="https://www.tiktok.com/@latazanomada" target="_blank" rel="noopener noreferrer" className="text-[#38201E] hover:text-[#63341F] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" />
                </svg>
              </a>
              <a href="https://www.facebook.com/latazanomada" target="_blank" rel="noopener noreferrer" className="text-[#38201E] hover:text-[#63341F] transition-colors">
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