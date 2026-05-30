import { SEO } from '@/hooks/useSEO';
import { blogPosts } from '@/data/blog';

export default function BlogPage() {
  return (
    <>
      <SEO
        title="Blog"
        description="Historias, rutas y secretos del mundo del cafe. Aprende sobre origen, tostado y preparacion."
        url="/blog"
        type="website"
      />
      <section className="pt-24 pb-24 md:pb-32 bg-[#F0EAD6]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-label text-[#63341F] mb-4">Blog</p>
            <h1 className="font-display text-5xl md:text-6xl text-[#38201E] mb-6">
              Historias del Cafe
            </h1>
            <p className="font-body text-lg text-[#38201E]/70 max-w-2xl mx-auto">
              Descubre historias, guias y secretos del mundo del cafe y cacao.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white/50 rounded-xl overflow-hidden border border-[rgba(56,32,30,0.08)] group cursor-pointer">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="font-caption text-[#63341F] mb-2">{post.category} — {post.date}</p>
                  <h2 className="font-display text-xl text-[#38201E] mb-3 group-hover:text-[#63341F] transition-colors">
                    {post.title}
                  </h2>
                  <p className="font-body text-sm text-[#38201E]/70 line-clamp-3">{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}