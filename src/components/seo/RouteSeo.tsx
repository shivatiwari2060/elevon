import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { buildHead } from '@/data/seo';

function upsert(selector: string, create: () => HTMLElement, set: (el: HTMLElement) => void) {
  let element = document.head.querySelector<HTMLElement>(selector);
  if (!element) {
    element = create();
    document.head.appendChild(element);
  }
  set(element);
}

function meta(attribute: 'name' | 'property', key: string, content: string | undefined) {
  const selector = `meta[${attribute}="${key}"]`;
  if (!content) {
    document.head.querySelector(selector)?.remove();
    return;
  }
  upsert(
    selector,
    () => {
      const el = document.createElement('meta');
      el.setAttribute(attribute, key);
      return el;
    },
    (el) => el.setAttribute('content', content),
  );
}

/**
 * Keeps the head in sync on client-side navigation. The build step already writes the same tags
 * into each route's static HTML, so crawlers never depend on this running.
 */
export function RouteSeo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const head = buildHead(pathname);
    document.title = head.title;
    meta('name', 'description', head.description);
    meta('name', 'robots', head.robots);
    meta('property', 'og:title', head.title);
    meta('property', 'og:description', head.description);
    meta('property', 'og:url', head.canonical);
    meta('property', 'og:image', head.image);
    meta('name', 'twitter:title', head.title);
    meta('name', 'twitter:description', head.description);

    if (head.canonical) {
      const href = head.canonical;
      upsert(
        'link[rel="canonical"]',
        () => Object.assign(document.createElement('link'), { rel: 'canonical' }),
        (el) => el.setAttribute('href', href),
      );
    } else {
      document.head.querySelector('link[rel="canonical"]')?.remove();
    }

    document.head.querySelectorAll('script[data-seo-jsonld]').forEach((el) => el.remove());
    head.jsonLd.forEach((node) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seoJsonld = '';
      script.textContent = JSON.stringify(node);
      document.head.appendChild(script);
    });
  }, [pathname]);
  return null;
}
