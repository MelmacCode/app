/**
 * useSEO — Hook personalizado para gestionar meta tags dinamicos
 * Compatible con React 19. Sin dependencias externas.
 * Reemplaza completamente a react-helmet-async.
 */

import { useEffect } from 'react';

export interface SEOOptions {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'product' | 'article' | 'store';
  schema?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
  lang?: string;
}

const SITE_NAME = 'La Taza Nomada';
const DEFAULT_DESCRIPTION = 'Cafe de origen seleccionado de las mejores regiones cafetaleras. Una experiencia sensorial unica que viaja contigo.';
const DEFAULT_KEYWORDS = 'cafe especial, cafe de origen, cafe nomada, cafe artesanal, cafe venezolano, cafe mexicano, comprar cafe online';
const DEFAULT_IMAGE = '/og-image.jpg';

function updateTitle(title: string) {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  document.title = fullTitle;
  return fullTitle;
}

function setMetaTag(name: string, content: string, property = false) {
  const attr = property ? 'property' : 'name';
  let tag = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setLinkTag(rel: string, href: string) {
  let tag = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;

  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
}

function setSchemaScript(schema: Record<string, unknown> | Record<string, unknown>[]) {
  const existingScripts = document.querySelectorAll('script[data-seo-schema]');
  existingScripts.forEach((s) => s.remove());

  const schemas = Array.isArray(schema) ? schema : [schema];

  schemas.forEach((s) => {
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-seo-schema', 'true');
    script.textContent = JSON.stringify(s);
    document.head.appendChild(script);
  });
}

export function useSEO({
  title = SITE_NAME,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  schema,
  noindex = false,
  lang = 'es',
}: SEOOptions) {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://latazanomada.com';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;
  const fullTitle = updateTitle(title);

  useEffect(() => {
    document.documentElement.lang = lang;

    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    setMetaTag('author', 'La Taza Nomada');
    setMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');

    setLinkTag('canonical', fullUrl);

    setMetaTag('og:title', fullTitle, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:image', fullImage, true);
    setMetaTag('og:image:width', '1200', true);
    setMetaTag('og:image:height', '630', true);
    setMetaTag('og:url', fullUrl, true);
    setMetaTag('og:type', type, true);
    setMetaTag('og:site_name', SITE_NAME, true);
    setMetaTag('og:locale', 'es_ES', true);

    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', fullTitle);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', fullImage);
    setMetaTag('twitter:site', '@latazanomada');
    setMetaTag('twitter:creator', '@latazanomada');

    if (schema) {
      setSchemaScript(schema);
    }
  }, [title, description, keywords, image, url, type, schema, noindex, lang, fullUrl, fullImage, fullTitle]);
}

export function SEO(props: SEOOptions) {
  useSEO(props);
  return null;
}

export const HomeSEO = () => (
  <SEO
    title="La Taza Nomada"
    description="Cafe de origen seleccionado de las mejores regiones cafetaleras. Una experiencia sensorial unica que viaja contigo."
    url="/"
    type="website"
  />
);

export const TiendaSEO = () => (
  <SEO
    title="Tienda"
    description="Descubre nuestros cafes de origen seleccionados. Envio a todo el pais. Compra cafe artesanal de especialidad online."
    url="/tienda"
    type="store"
  />
);

export const BlogSEO = () => (
  <SEO
    title="Blog"
    description="Historias, rutas y secretos del mundo del cafe. Aprende sobre origen, tostado y preparacion."
    url="/blog"
    type="website"
  />
);

export const RutaSEO = () => (
  <SEO
    title="Ruta Cafe & Cacao"
    description="Sigue nuestra ruta por las mejores zonas cafetaleras y cacaoteras. Un viaje sensorial unico."
    url="/ruta-cafe-cacao"
    type="article"
  />
);

export const RedesSEO = () => (
  <SEO
    title="Redes Sociales"
    description="Conecta con La Taza Nomada en Instagram, TikTok y Facebook. Unete a nuestra comunidad cafetera."
    url="/redes"
    type="website"
  />
);

export const ContactoSEO = () => (
  <SEO
    title="Contacto"
    description="Tienes preguntas? Escribenos. Estamos aqui para ayudarte a encontrar tu cafe perfecto."
    url="/contacto"
    type="website"
  />
);