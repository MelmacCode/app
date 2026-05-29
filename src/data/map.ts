export interface Location {
  name: string;
  type: 'cafe' | 'cacao';
  coords: { lat: number; lng: number };
  description: string;
  reviews: Review[];
}

export interface Review {
  author: string;
  date: string;
  rating: number;
  comment: string;
}

export interface MapState {
  id: string;
  name: string;
  svgPath: string;
  locations: Location[];
}

export const venezuelaStates: MapState[] = [
  {
    id: 'merida',
    name: 'Merida',
    svgPath: 'M180,220 L185,210 L195,205 L200,210 L205,215 L200,225 L195,230 L185,228 Z',
    locations: [
      {
        name: 'Finca La Trinidad',
        type: 'cafe',
        coords: { lat: 8.5894, lng: -71.1561 },
        description: 'Plantacion de cafe arabica a 1,800m de altitud con vistas espectaculares de los Andes.',
        reviews: [
          { author: 'Ana R.', date: '2025-01-15', rating: 5, comment: 'Increible experiencia. El cafe es excepcional y las vistas son de otro mundo.' },
        ],
      },
      {
        name: 'Finca La Cebolla',
        type: 'cafe',
        coords: { lat: 8.65, lng: -71.2 },
        description: 'Cultivo tradicional de cafe en las laderas andinas con procesamiento honey.',
        reviews: [],
      },
    ],
  },
  {
    id: 'trujillo',
    name: 'Trujillo',
    svgPath: 'M190,205 L200,198 L210,200 L215,208 L210,215 L200,218 L192,212 Z',
    locations: [
      {
        name: 'Finca La Candelaria',
        type: 'cafe',
        coords: { lat: 9.3658, lng: -70.4353 },
        description: 'Una de las fincas mas antiguas de la region, con arboles de mas de 50 anos.',
        reviews: [
          { author: 'Carlos M.', date: '2025-02-10', rating: 4, comment: 'Muy buen cafe, excelente atencion del personal.' },
        ],
      },
      {
        name: 'Finca La Esperanza',
        type: 'cafe',
        coords: { lat: 9.4, lng: -70.38 },
        description: 'Cafe de altura con certificacion de comercio justo.',
        reviews: [],
      },
    ],
  },
  {
    id: 'tachira',
    name: 'Tachira',
    svgPath: 'M175,235 L182,225 L192,225 L195,232 L190,240 L180,242 Z',
    locations: [
      {
        name: 'Finca La Providencia',
        type: 'cafe',
        coords: { lat: 7.8939, lng: -72.5019 },
        description: 'Bordeando el paramo de Tama, cafe de altura con cuerpo intenso.',
        reviews: [],
      },
    ],
  },
  {
    id: 'lara',
    name: 'Lara',
    svgPath: 'M220,200 L235,195 L245,200 L248,208 L240,215 L225,212 Z',
    locations: [
      {
        name: 'Finca La Victoria',
        type: 'cafe',
        coords: { lat: 9.9971, lng: -69.2884 },
        description: 'Cultivo en la sierra de Lara con microclima unico.',
        reviews: [],
      },
    ],
  },
  {
    id: 'carabobo',
    name: 'Carabobo',
    svgPath: 'M285,240 L295,235 L305,240 L308,248 L300,255 L288,252 Z',
    locations: [
      {
        name: 'Finca La Trinidad',
        type: 'cafe',
        coords: { lat: 10.2511, lng: -68.006 },
        description: 'Cafe de la cordillera de la Costa con notas de chocolate.',
        reviews: [
          { author: 'Maria L.', date: '2025-01-20', rating: 5, comment: 'El mejor cafe que he probado. Volvere sin duda.' },
        ],
      },
      {
        name: 'Cafe Caracas 1794',
        type: 'cafe',
        coords: { lat: 10.2, lng: -67.98 },
        description: 'Tostadero historico que preserva la tradicion cafetera venezolana.',
        reviews: [],
      },
    ],
  },
  {
    id: 'distrito-capital',
    name: 'Distrito Capital',
    svgPath: 'M300,225 L310,222 L315,228 L312,235 L302,233 Z',
    locations: [
      {
        name: 'Cafe Caracas 1794',
        type: 'cafe',
        coords: { lat: 10.4806, lng: -66.9036 },
        description: 'El cafe mas antiguo de Venezuela, en el corazon de Caracas desde 1794.',
        reviews: [
          { author: 'Pedro G.', date: '2025-03-01', rating: 5, comment: 'Una institucion. El cafe es increible y la historia es fascinante.' },
        ],
      },
      {
        name: 'Tostion Caracas',
        type: 'cafe',
        coords: { lat: 10.49, lng: -66.91 },
        description: 'Tostadero artesanal con degustaciones guiadas.',
        reviews: [],
      },
    ],
  },
  {
    id: 'miranda',
    name: 'Miranda',
    svgPath: 'M315,225 L328,218 L338,225 L335,235 L322,238 L315,232 Z',
    locations: [
      {
        name: 'Hacienda La Trinidad',
        type: 'cacao',
        coords: { lat: 10.4196, lng: -66.8259 },
        description: 'Hacienda historica con plantacion de cacao criollo.',
        reviews: [],
      },
    ],
  },
  {
    id: 'anzoategui',
    name: 'Anzoategui',
    svgPath: 'M380,220 L395,215 L405,220 L408,230 L400,238 L385,235 Z',
    locations: [
      {
        name: 'Finca La Candelaria',
        type: 'cacao',
        coords: { lat: 9.45, lng: -64.63 },
        description: 'Cacao de la region oriental con fermentacion controlada.',
        reviews: [],
      },
    ],
  },
  {
    id: 'bolivar',
    name: 'Bolivar',
    svgPath: 'M300,280 L330,270 L360,275 L380,290 L370,315 L340,320 L310,310 L295,295 Z',
    locations: [
      {
        name: 'Finca La Candelaria',
        type: 'cacao',
        coords: { lat: 6.5, lng: -63.2 },
        description: 'Cacao amazonico cultivado en el escudo guayanes.',
        reviews: [],
      },
    ],
  },
  {
    id: 'amazonas',
    name: 'Amazonas',
    svgPath: 'M250,320 L290,310 L320,320 L310,355 L280,365 L255,350 Z',
    locations: [
      {
        name: 'Finca La Victoria',
        type: 'cacao',
        coords: { lat: 3.0, lng: -65.5 },
        description: 'Cacao silvestre recolectado en la selva amazonica.',
        reviews: [],
      },
    ],
  },
];

export const allStates = [
  { id: 'zulia', name: 'Zulia', svgPath: 'M140,150 L170,145 L185,155 L180,175 L155,180 L138,168 Z' },
  { id: 'falcon', name: 'Falcon', svgPath: 'M180,175 L195,170 L200,185 L190,195 L178,188 Z' },
  { id: 'lara', name: 'Lara', svgPath: 'M220,200 L235,195 L245,200 L248,208 L240,215 L225,212 Z' },
  { id: 'yaracuy', name: 'Yaracuy', svgPath: 'M260,215 L275,210 L282,218 L278,228 L262,225 Z' },
  { id: 'carabobo', name: 'Carabobo', svgPath: 'M285,240 L295,235 L305,240 L308,248 L300,255 L288,252 Z' },
  { id: 'aragua', name: 'Aragua', svgPath: 'M295,225 L308,220 L315,228 L310,238 L298,235 Z' },
  { id: 'miranda', name: 'Miranda', svgPath: 'M315,225 L328,218 L338,225 L335,235 L322,238 L315,232 Z' },
  { id: 'vargas', name: 'Vargas', svgPath: 'M300,215 L310,212 L315,218 L310,222 L302,220 Z' },
  { id: 'distrito-capital', name: 'Distrito Capital', svgPath: 'M300,225 L310,222 L315,228 L312,235 L302,233 Z' },
  { id: 'merida', name: 'Merida', svgPath: 'M180,220 L185,210 L195,205 L200,210 L205,215 L200,225 L195,230 L185,228 Z' },
  { id: 'trujillo', name: 'Trujillo', svgPath: 'M190,205 L200,198 L210,200 L215,208 L210,215 L200,218 L192,212 Z' },
  { id: 'tachira', name: 'Tachira', svgPath: 'M175,235 L182,225 L192,225 L195,232 L190,240 L180,242 Z' },
  { id: 'barinas', name: 'Barinas', svgPath: 'M200,240 L215,235 L225,242 L222,252 L208,255 L198,248 Z' },
  { id: 'portuguesa', name: 'Portuguesa', svgPath: 'M215,215 L232,210 L240,218 L238,228 L220,230 L212,222 Z' },
  { id: 'apure', name: 'Apure', svgPath: 'M210,265 L250,255 L270,268 L262,290 L228,295 L208,280 Z' },
  { id: 'guarico', name: 'Guarico', svgPath: 'M275,245 L310,238 L325,250 L318,270 L285,275 L270,260 Z' },
  { id: 'sucre', name: 'Sucre', svgPath: 'M360,210 L375,205 L385,215 L380,225 L362,220 Z' },
  { id: 'monagas', name: 'Monagas', svgPath: 'M385,210 L400,205 L410,215 L405,228 L390,225 Z' },
  { id: 'anzoategui', name: 'Anzoategui', svgPath: 'M380,220 L395,215 L405,220 L408,230 L400,238 L385,235 Z' },
  { id: 'delta-amacuro', name: 'Delta Amacuro', svgPath: 'M410,205 L435,200 L445,218 L435,240 L418,235 L410,220 Z' },
  { id: 'bolivar', name: 'Bolivar', svgPath: 'M300,280 L330,270 L360,275 L380,290 L370,315 L340,320 L310,310 L295,295 Z' },
  { id: 'amazonas', name: 'Amazonas', svgPath: 'M250,320 L290,310 L320,320 L310,355 L280,365 L255,350 Z' },
  { id: 'nueva-esparta', name: 'Nueva Esparta', svgPath: 'M400,170 L408,165 L415,172 L410,180 L402,178 Z' },
];
