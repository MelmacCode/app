src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── layout/          # Header, Footer, Layout
│   ├── seo/             # SEO, SchemaOrg
│   └── shared/          # Componentes reutilizables
├── pages/
│   ├── HomePage.tsx
│   ├── TiendaPage.tsx
│   ├── BlogPage.tsx
│   ├── RutaPage.tsx
│   ├── RedesPage.tsx
│   ├── ContactoPage.tsx
│   └── admin/           # Panel admin (Fase 3)
│       ├── Dashboard.tsx
│       ├── Products.tsx
│       └── Orders.tsx
├── hooks/
│   ├── useCart.ts
│   ├── useProducts.ts
│   └── useAuth.ts
├── stores/
│   ├── cartStore.ts
│   ├── authStore.ts     # Fase 2
│   └── uiStore.ts
├── lib/
│   ├── utils.ts
│   ├── supabase.ts      # Fase 2
│   ├── sanity.ts        # Fase 2
│   └── whatsapp.ts      # Fase 1
├── types/
│   ├── product.ts
│   ├── order.ts
│   └── user.ts
├── data/                # Datos estáticos (Fase 1)
│   ├── products.ts
│   ├── blog.ts
│   └── map.ts
└── styles/
    └── index.css
