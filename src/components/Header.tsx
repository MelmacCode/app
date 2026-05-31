import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/tienda", label: "Tienda" },
  { to: "/blog", label: "Blog" },
  { to: "/ruta", label: "Ruta" },
  { to: "/redes", label: "Redes" },
  { to: "/contacto", label: "Contacto" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const totalItems = useCartStore((s) => s.totalItems());
  const setCartOpen = useCartStore((s) => s.setIsOpen);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "shadow-md backdrop-blur-md"
            : ""
        }`}
        style={{
          height: "80px",
          backgroundColor: isScrolled
            ? "rgba(240, 234, 214, 0.95)"
            : "transparent",
        }}
      >
        <div className="h-full flex items-center justify-between content-max-width">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo.jpeg"
              alt="La Taza Nomada"
              className="h-14 w-auto object-contain"
              style={{ maxHeight: "56px" }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-nav relative group"
                style={{ color: "var(--taza-dark)" }}
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: "var(--taza-brown)" }}
                />
              </Link>
            ))}
          </nav>

          {/* Cart + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-full transition-colors"
              style={{ color: "var(--taza-dark)" }}
              aria-label="Abrir carrito"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center font-medium"
                  style={{
                    backgroundColor: "var(--taza-brown)",
                    color: "var(--taza-cream)",
                  }}
                >
                  {totalItems}
                </span>
              )}
            </button>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: "var(--taza-dark)" }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden pt-20"
          style={{ backgroundColor: "var(--taza-cream)" }}
        >
          <nav className="flex flex-col items-center gap-8 pt-12">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-nav text-lg"
                style={{ color: "var(--taza-dark)" }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}