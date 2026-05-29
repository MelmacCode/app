import { useState, useRef, useEffect } from 'react';
import { blogPosts, blogCategories } from '@/data/blog';
import gsap from 'gsap';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('todos');
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === 'todos'
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  const featured = blogPosts.find((p) => p.featured);
  const regular = filtered.filter((p) => !p.featured);

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(gridRef.current.children, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 });
    }
  }, [activeCategory]);

  return (
    <div style={{ backgroundColor: 'var(--cream)' }} className="pt-24 pb-24">
      <div className="content-max-width">
        <p className="font-label mb-4" style={{ color: 'var(--terracotta)' }}>El Blog</p>
        <h1 className="font-display text-5xl md:text-7xl" style={{ color: 'var(--dark-coffee)' }}>
          La Taza Nomada
        </h1>
        <p className="font-body mt-4 max-w-lg" style={{ color: 'var(--warm-brown)', opacity: 0.7 }}>
          Historias, recetas y secretos del cafe y cacao venezolano.
        </p>
      </div>

      {/* Featured Article */}
      {featured && (
        <div className="content-max-width mt-12">
          <div className="relative overflow-hidden rounded-lg group" style={{ aspectRatio: '16/9' }}>
            <img src={featured.image} alt={featured.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,20,16,0.8) 0%, transparent 60%)' }} />
            <div className="absolute bottom-0 left-0 p-8 md:p-12">
              <span className="font-label text-xs px-3 py-1 rounded-full inline-block mb-4" style={{ backgroundColor: 'var(--terracotta)', color: 'var(--light-text)' }}>
                {featured.category}
              </span>
              <h2 className="font-display text-2xl md:text-4xl" style={{ color: 'var(--light-text)' }}>{featured.title}</h2>
              <p className="font-body text-sm mt-2" style={{ color: 'rgba(245,237,224,0.7)' }}>{featured.date} · {featured.readTime}</p>
            </div>
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="content-max-width mt-12">
        <div className="flex flex-wrap gap-3">
          {blogCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="font-nav text-xs pb-1 transition-all"
              style={{
                color: activeCategory === cat ? 'var(--terracotta)' : 'var(--dark-coffee)',
                borderBottom: activeCategory === cat ? '2px solid var(--terracotta)' : '2px solid transparent',
              }}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Article Grid */}
      <div ref={gridRef} className="content-max-width grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
        {regular.map((post) => (
          <article key={post.id} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: '16/10' }}>
              <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-[#1A1410]/10" />
            </div>
            <span className="font-label text-xs mt-4 inline-block" style={{ color: 'var(--terracotta)' }}>{post.category}</span>
            <h3 className="font-display text-xl mt-2 transition-colors group-hover:text-terracotta" style={{ color: 'var(--dark-coffee)' }}>
              {post.title}
            </h3>
            <p className="font-body text-sm mt-2 line-clamp-2" style={{ color: 'var(--warm-brown)', opacity: 0.7 }}>{post.excerpt}</p>
            <p className="font-caption mt-3" style={{ color: 'var(--warm-brown)', opacity: 0.5 }}>{post.date}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
