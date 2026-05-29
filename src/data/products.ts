export interface Product {
  id: string;
  name: string;
  category: 'cafe' | 'cacao' | 'merchandising' | 'experiencias';
  price: number;
  description: string;
  image: string;
}

export const products: Product[] = [
  {
    id: 'cafe-caracas',
    name: 'Cafe Caracas 1794',
    category: 'cafe',
    price: 15.0,
    description: 'Cafe de especialidad con notas de chocolate, caramelo y frutas secas. Tostado medio en Caracas desde 1794.',
    image: '/images/product-cafe-caracas.jpg',
  },
  {
    id: 'cafe-trujillo',
    name: 'Cafe Trujillo Andino',
    category: 'cafe',
    price: 18.0,
    description: 'Cafe de altura cultivado en los Andes trujillanos a 1,800m. Notas florales, cítricas y cuerpo sedoso.',
    image: '/images/product-cafe-trujillo.jpg',
  },
  {
    id: 'cafe-merida',
    name: 'Cafe Merida Premium',
    category: 'cafe',
    price: 20.0,
    description: 'Edicion limitada de los mejores lotes de Merida. Procesamiento honey, acidez brillante y dulzor excepcional.',
    image: '/images/product-cafe-trujillo.jpg',
  },
  {
    id: 'cacao-barlovento',
    name: 'Cacao en Polvo Barlovento',
    category: 'cacao',
    price: 16.0,
    description: 'Cacao en polvo 100% natural de Barlovento. Ideal para bebidas y reposteria.',
    image: '/images/product-chocolate-paria.jpg',
  },
  {
    id: 'chocolate-paria',
    name: 'Chocolate Paria 70%',
    category: 'cacao',
    price: 12.0,
    description: 'Chocolate oscuro artesanal con cacao criollo de la Peninsula de Paria. 70% cacao, notas de frutas tropicales.',
    image: '/images/product-chocolate-paria.jpg',
  },
  {
    id: 'cacao-polvo',
    name: 'Cacao en Polvo Puro',
    category: 'cacao',
    price: 10.0,
    description: 'Cacao en polvo puro, sin azucar anadido. Perfecto para preparar chocolate caliente tradicional.',
    image: '/images/product-chocolate-paria.jpg',
  },
  {
    id: 'taza-nomada',
    name: 'Taza Nomada Edicion',
    category: 'merchandising',
    price: 25.0,
    description: 'Taza artesanal de ceramica terracota hecha a mano. Edicion exclusiva La Taza Nomada.',
    image: '/images/product-merch-taza.jpg',
  },
  {
    id: 'camiseta-cafe',
    name: 'Camiseta Cafe Lover',
    category: 'merchandising',
    price: 22.0,
    description: 'Camiseta 100% algodon organico con diseno de planta de cafe en serigrafia terracota.',
    image: '/images/product-merch-camiseta.jpg',
  },
  {
    id: 'bolsa-tela',
    name: 'Bolsa de Tela Reutilizable',
    category: 'merchandising',
    price: 8.0,
    description: 'Bolsa de lona ecologica con logo La Taza Nomada. Perfecta para tus compras de cafe.',
    image: '/images/product-merch-camiseta.jpg',
  },
  {
    id: 'delantal-barista',
    name: 'Delantal Barista',
    category: 'merchandising',
    price: 30.0,
    description: 'Delantal de mezclilla con correas de cuero y bordado del logo. Para los amantes del cafe.',
    image: '/images/product-merch-camiseta.jpg',
  },
  {
    id: 'taller-catacion',
    name: 'Taller de Catacion',
    category: 'experiencias',
    price: 45.0,
    description: 'Aprende a degustar cafe como un experto. 3 horas de teoria y practica con nuestros catadores.',
    image: '/images/service-itinerarios.jpg',
  },
  {
    id: 'ruta-experiencia',
    name: 'Ruta Cafe & Cacao',
    category: 'experiencias',
    price: 120.0,
    description: 'Experiencia completa de 2 dias recorriendo plantaciones de cafe y cacao con hospedaje incluido.',
    image: '/images/product-ruta-experiencia.jpg',
  },
];

export const categories = ['todos', 'cafe', 'cacao', 'merchandising', 'experiencias'] as const;
export type Category = (typeof categories)[number];
