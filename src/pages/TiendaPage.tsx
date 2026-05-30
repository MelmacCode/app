import { useState } from 'react';
import { SEO } from '@/hooks/useSEO';
import { generateProductSchema } from '@/lib/seo';
import { products } from '@/data/products';
import { useCartStore } from '@/stores/cartStore';

export default function TiendaPage() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const addItem = useCartStore((s) => s.addItem);

  const categories = ['todos', ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered = selectedCategory === 'todos'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const productSchemas = products.map((product) =>
    generateProductSchema({
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
      currency: 'USD',
      availability: 'InStock',
      sku: product.id,
      category: product.category,
    })
  );

  return (
    <>
      <SEO
        title="Tienda"
        description="Descubre nuestros cafes de origen seleccionados. Envio a todo el pais. Compra cafe artesanal de especialidad online."
        url="/tienda"
        type="store"
        schema={productSchemas}
      />
      <section className="pt-24 pb-24 md:pb-32 bg-[#F0EAD6]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-label text-[#63341F] mb-4">Tienda</p>
            <h1 className="font-display text-5xl md:text-6xl text-[#38201E] mb-6">
              Nuestros Cafes
            </h1>
            <p className="font-body text-lg text-[#38201E]/70 max-w-2xl mx-auto">
              Seleccion de cafes de origen, tostados artesanalmente y enviados frescos a tu puerta.
            </p>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full font-nav text-sm transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#63341F] text-[#F0EAD6]'
                    : 'bg-white/50 text-[#38201E] border border-[rgba(56,32,30,0.08)] hover:border-[#63341F]'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Productos */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product) => (
              <div key={product.id} className="bg-white/50 rounded-xl overflow-hidden border border-[rgba(56,32,30,0.08)] group">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="font-caption text-[#63341F] mb-1">{product.category}</p>
                  <h3 className="font-display text-xl text-[#38201E] mb-2">{product.name}</h3>
                  <p className="font-body text-sm text-[#38201E]/70 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl text-[#63341F]">${product.price.toFixed(2)}</span>
                    <button
                      onClick={() => addItem(product.id)}
                      className="px-5 py-2 bg-[#63341F] text-[#F0EAD6] font-nav text-sm rounded hover:bg-[#4A2716] transition-colors"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}