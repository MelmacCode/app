import { useState, useEffect, useRef } from 'react';
import { products, categories, type Category } from '@/data/products';
import { useCartStore } from '@/stores/cartStore';
import gsap from 'gsap';

export default function TiendaPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('todos');
  const [sortBy, setSortBy] = useState<'relevancia' | 'precio-asc' | 'precio-desc'>('relevancia');
  const addItem = useCartStore((s) => s.addItem);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === 'todos'
    ? [...products]
    : products.filter((p) => p.category === activeCategory);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'precio-asc') return a.price - b.price;
    if (sortBy === 'precio-desc') return b.price - a.price;
    return 0;
  });

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out' }
      );
    }
  }, [activeCategory, sortBy]);

  return (
    <div style={{ backgroundColor: 'var(--cream)' }} className="pt-24">
      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <img src="/images/hero-background-2.jpg" alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.6)' }} />
        <div className="absolute inset-0 flex items-end pb-8 content-max-width">
          <h1 className="font-display text-5xl md:text-7xl" style={{ color: 'var(--light-text)' }}>Tienda</h1>
        </div>
      </div>

      <div className="content-max-width py-8">
        <p className="font-caption mb-8" style={{ color: 'var(--warm-brown)', opacity: 0.6 }}>Inicio / Tienda</p>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-full font-nav text-xs transition-all"
                style={{
                  backgroundColor: activeCategory === cat ? 'var(--terracotta)' : 'transparent',
                  color: activeCategory === cat ? 'var(--light-text)' : 'var(--dark-coffee)',
                  border: activeCategory === cat ? 'none' : '1px solid var(--light-border)',
                }}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-4 py-2 rounded-full font-nav text-xs bg-transparent cursor-pointer"
            style={{ border: '1px solid var(--light-border)', color: 'var(--dark-coffee)' }}
          >
            <option value="relevancia">Ordenar por: Relevancia</option>
            <option value="precio-asc">Precio: Menor a Mayor</option>
            <option value="precio-desc">Precio: Mayor a Menor</option>
          </select>
        </div>

        {/* Product Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
          {sorted.map((product) => (
            <div key={product.id} className="group">
              <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: '3/4' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[#1A1410]/15" />
                <button
                  onClick={() => addItem(product.id)}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 text-white font-nav text-xs opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 whitespace-nowrap"
                  style={{ backgroundColor: 'var(--terracotta)' }}
                >
                  Agregar al Carrito
                </button>
              </div>
              <h3 className="mt-3 font-display text-lg" style={{ color: 'var(--dark-coffee)' }}>{product.name}</h3>
              <p className="mt-1 font-display text-lg" style={{ color: 'var(--terracotta)' }}>${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
