export interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'cafe-caracas-historia',
    title: 'El Cafe de Caracas: 225 anos de historia',
    category: 'cafe',
    excerpt: 'Descubre la historia del cafe mas antiguo de Venezuela, desde 1794 hasta hoy. Una tradicion que ha resistido el paso del tiempo.',
    date: '15 Ene 2025',
    readTime: '8 min',
    image: '/images/hero-background-1.jpg',
    featured: true,
  },
  {
    id: 'ruta-cacao-barlovento',
    title: 'Ruta del Cacao en Barlovento',
    category: 'cacao',
    excerpt: 'Un recorrido por las plantaciones de cacao mas exoticas de la costa venezolana.',
    date: '10 Ene 2025',
    readTime: '6 min',
    image: '/images/hero-background-2.jpg',
  },
  {
    id: 'preparar-cafe-casa',
    title: 'Como preparar el mejor cafe en casa',
    category: 'recetas',
    excerpt: 'Secretos y tecnicas para extraer el maximo sabor de tus granos de cafe.',
    date: '5 Ene 2025',
    readTime: '5 min',
    image: '/images/grid-toma-cafe.jpg',
  },
  {
    id: 'productores-merida',
    title: 'Conociendo a los productores de Merida',
    category: 'productores',
    excerpt: 'Entrevista con las familias caficultoras que cultivan los mejores granos andinos.',
    date: '28 Dic 2024',
    readTime: '7 min',
    image: '/images/about-background.jpg',
  },
  {
    id: 'recetas-chocolate',
    title: 'Tres recetas con chocolate venezolano',
    category: 'recetas',
    excerpt: 'Deliciosas preparaciones que destacan el sabor unico del cacao de Paria.',
    date: '20 Dic 2024',
    readTime: '4 min',
    image: '/images/product-chocolate-paria.jpg',
  },
  {
    id: 'ruta-cafe-andes',
    title: 'La Ruta del Cafe en los Andes',
    category: 'viajes',
    excerpt: 'Guia de viaje por los pueblos cafeteros mas pintorescos de Venezuela.',
    date: '15 Dic 2024',
    readTime: '10 min',
    image: '/images/product-ruta-experiencia.jpg',
  },
  {
    id: 'cata-principiantes',
    title: 'Cata de cafe: Guia para principiantes',
    category: 'cafe',
    excerpt: 'Aprende a degustar cafe como un experto con nuestra guia paso a paso.',
    date: '8 Dic 2024',
    readTime: '6 min',
    image: '/images/service-itinerarios.jpg',
  },
  {
    id: 'cacao-criollo',
    title: 'El cacao criollo: joya de Venezuela',
    category: 'cacao',
    excerpt: 'Todo sobre la variedad de cacao mas preciada del mundo, originaria de nuestra tierra.',
    date: '1 Dic 2024',
    readTime: '7 min',
    image: '/images/journey-background.jpg',
  },
  {
    id: 'turismo-sostenible',
    title: 'Turismo sostenible en zonas cafeteras',
    category: 'viajes',
    excerpt: 'Como el turismo responsable esta transformando las comunidades productoras.',
    date: '25 Nov 2024',
    readTime: '5 min',
    image: '/images/about-background.jpg',
  },
];

export const blogCategories = ['todos', 'cafe', 'cacao', 'recetas', 'viajes', 'productores'] as const;
