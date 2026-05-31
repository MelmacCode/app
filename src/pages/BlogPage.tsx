import { useState } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts, blogCategories, type BlogPost } from "@/data/blog";
import { SEO } from "@/hooks/useSEO";
import LazyImage from "@/components/LazyImage";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("todos");

  const filtered = activeCategory === "todos"
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  const featured = blogPosts.find((p) => p.featured);

  return (
    <div className="pt-32 pb-20" style={{ backgroundColor: "var(--taza-cream)" }}>
      <SEO
        title="Blog | La Taza Nomada"
        description="Historias, recetas y guias sobre el cafe y cacao venezolano. Descubre el origen de tu taza."
        url="/blog"
        image="/og-image.jpg"
      />

      <div className="content-max-width">
        <div className="text-center mb-16">
          <p className="font-label mb-4" style={{ color: "var(--taza-brown)" }}>Nuestro Blog</p>
          <h1 className="font-display text-5xl md:text-6xl mb-6" style={{ color: "var(--taza-dark)" }}>
            Historias de Origen
          </h1>
          <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: "var(--taza-dark-light)" }}>
            Descubre las historias detras de cada grano, las recetas tradicionales y los viajes que inspiran nuestra pasion.
          </p>
        </div>

        {/* Featured */}
        {featured && (
          <div className="mb-16 rounded-2xl overflow-hidden border group" style={{ borderColor: "var(--taza-border)" }}>
            <div className="grid md:grid-cols-2">
              <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                <LazyImage
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  containerClassName="w-full h-full"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center" style={{ backgroundColor: "var(--taza-cream-light)" }}>
                <p className="font-caption mb-3" style={{ color: "var(--taza-brown)" }}>Destacado</p>
                <h2 className="font-display text-3xl mb-4" style={{ color: "var(--taza-dark)" }}>{featured.title}</h2>
                <p className="font-body mb-6" style={{ color: "var(--taza-dark-light)" }}>{featured.excerpt}</p>
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-caption flex items-center gap-1" style={{ color: "var(--taza-dark-light)" }}>
                    <Calendar className="w-3 h-3" />
                    {featured.date}
                  </span>
                  <span className="font-caption flex items-center gap-1" style={{ color: "var(--taza-dark-light)" }}>
                    <Clock className="w-3 h-3" />
                    {featured.readTime}
                  </span>
                </div>
                <Link
                  to={`/blog/${featured.id}`}
                  className="inline-flex items-center gap-2 font-nav text-sm transition-colors hover:underline"
                  style={{ color: "var(--taza-brown)" }}
                >
                  Leer articulo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {blogCategories.map((cat) => (
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

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post) => (
            <article
              key={post.id}
              className="group rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-lg"
              style={{ borderColor: "var(--taza-border)", backgroundColor: "var(--taza-cream)" }}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <LazyImage
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  containerClassName="w-full h-full"
                />
              </div>
              <div className="p-6">
                <p className="font-caption mb-2" style={{ color: "var(--taza-brown)" }}>{post.category}</p>
                <h3 className="font-display text-xl mb-3" style={{ color: "var(--taza-dark)" }}>{post.title}</h3>
                <p className="font-body text-sm mb-4 line-clamp-2" style={{ color: "var(--taza-dark-light)" }}>{post.excerpt}</p>
                <div className="flex items-center gap-4">
                  <span className="font-caption flex items-center gap-1" style={{ color: "var(--taza-dark-light)" }}>
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span className="font-caption flex items-center gap-1" style={{ color: "var(--taza-dark-light)" }}>
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}