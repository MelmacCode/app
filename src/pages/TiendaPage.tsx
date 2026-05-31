import { useState } from "react";
import { ShoppingBag, Plus, Filter } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { products, categories, type Category } from "@/data/products";
import { SEO } from "@/hooks/useSEO";
import LazyImage from "@/components/LazyImage";
import { toast } from "sonner";

export default function TiendaPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("todos");
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setIsOpen);

  const filtered = activeCategory === "todos"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const handleAdd = (productId: string, productName: string) => {
    addItem(productId);
    toast.success(`${productName} agregado al carrito`, {
      description: "Haz clic en el icono del carrito para ver tu pedido",
      action: {
        label: "Ver carrito",
        onClick: () => setCartOpen(true),
      },
    });
  };

  return (
    <div className="pt-32 pb-20" style={{ backgroundColor: "var(--taza-cream)" }}>
      <SEO
        title="Tienda | La Taza Nomada"
        description="Cafe de especialidad, cacao artesanal y merchandising exclusivo. Productos directamente desde el corazon de la tradicion cafetera venezolana."
        url="/tienda"
        image="/og-image.jpg"
      />

      <div className="content-max-width">
        <div className="text-center mb-16">
          <p className="font-label mb-4" style={{ color: "var(--taza-brown)" }}>Nuestra Seleccion</p>
          <h1 className="font-display text-5xl md:text-6xl mb-6" style={{ color: "var(--taza-dark)" }}>
            Tienda Online
          </h1>
          <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: "var(--taza-dark-light)" }}>
            Productos de origen seleccionados de las mejores regiones cafetaleras y cacaoteras de Venezuela.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <Filter className="w-4 h-4 mr-2 self-center" style={{ color: "var(--taza-dark-light)" }} />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-full font-nav text-xs transition-all duration-300"
              style={{
                backgroundColor: activeCategory === cat ? "var(--taza-brown)" : "transparent",
                color: activeCategory === cat ? "var(--taza-cream)" : "var(--taza-dark)",
                border: `1px solid ${activeCategory === cat ? "var(--taza-brown)" : "var(--taza-border)"}`,
              }}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-lg"
              style={{ borderColor: "var(--taza-border)", backgroundColor: "var(--taza-cream)" }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <LazyImage
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  containerClassName="w-full h-full"
                />
              </div>
              <div className="p-6">
                <p className="font-caption mb-2" style={{ color: "var(--taza-brown)" }}>
                  {product.category}
                </p>
                <h3 className="font-display text-xl mb-2" style={{ color: "var(--taza-dark)" }}>
                  {product.name}
                </h3>
                <p className="font-body text-sm mb-4 line-clamp-2" style={{ color: "var(--taza-dark-light)" }}>
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl" style={{ color: "var(--taza-brown)" }}>
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleAdd(product.id, product.name)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-nav text-xs transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: "var(--taza-brown)", color: "var(--taza-cream)" }}
                  >
                    <Plus className="w-4 h-4" />
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-20" style={{ color: "var(--taza-dark)" }} />
            <p className="font-body" style={{ color: "var(--taza-dark-light)" }}>
              No hay productos en esta categoria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}