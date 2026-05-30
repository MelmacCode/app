/**
 * SEO Helpers — Schema.org generators
 * Datos estructurados para mejorar indexación en Google
 */

export interface ProductSchema {
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  availability: 'InStock' | 'OutOfStock' | 'PreOrder';
  sku: string;
  category?: string;
}

export interface OrganizationSchema {
  name: string;
  url: string;
  logo: string;
  sameAs?: string[];
  contactPoint?: {
    telephone: string;
    contactType: string;
    areaServed: string;
  };
}

/**
 * Genera Schema.org JSON-LD para un producto
 */
export function generateProductSchema(product: ProductSchema): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'La Taza Nómada',
    },
    offers: {
      '@type': 'Offer',
      url: `${import.meta.env.VITE_SITE_URL || 'https://latazanomada.com'}/tienda`,
      priceCurrency: product.currency,
      price: product.price.toFixed(2),
      availability: `https://schema.org/${product.availability}`,
      seller: {
        '@type': 'Organization',
        name: 'La Taza Nómada',
      },
    },
    category: product.category || 'Café',
  };
}

/**
 * Genera Schema.org para la organización (HomePage)
 */
export function generateOrganizationSchema(org: OrganizationSchema): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name,
    url: org.url,
    logo: org.logo,
    sameAs: org.sameAs || [],
    contactPoint: org.contactPoint
      ? {
          '@type': 'ContactPoint',
          telephone: org.contactPoint.telephone,
          contactType: org.contactPoint.contactType,
          areaServed: org.contactPoint.areaServed,
        }
      : undefined,
  };
}

/**
 * Genera Schema.org para LocalBusiness
 */
export function generateLocalBusinessSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'La Taza Nómada',
    image: `${import.meta.env.VITE_SITE_URL || 'https://latazanomada.com'}/og-image.jpg`,
    '@id': `${import.meta.env.VITE_SITE_URL || 'https://latazanomada.com'}`,
    url: import.meta.env.VITE_SITE_URL || 'https://latazanomada.com',
    telephone: '+58-412-1234567',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Caracas',
      addressCountry: 'VE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.4806,
      longitude: -66.9036,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '10:00',
        closes: '14:00',
      },
    ],
  };
}

/**
 * Genera Schema.org para BreadcrumbList
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}