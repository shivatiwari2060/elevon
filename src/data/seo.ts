import { FAQS } from '@/data/faqs';
import { SERVICES } from '@/data/services';
import { SITE } from '@/data/site';

export interface PageSeo {
  title: string;
  description: string;
  /** Name shown in breadcrumb structured data. Omitted for the home page. */
  crumb?: string;
  noindex?: boolean;
}

/** Search metadata per route. Titles stay under ~60 characters, descriptions under ~155. */
export const PAGES: Record<string, PageSeo> = {
  '/': {
    title: 'Elevon | Web Development, SEO & Digital Marketing in Nepal',
    description:
      'Elevon builds fast, professional websites and grows your search visibility with SEO and digital marketing. Based in Lalitpur, Nepal, serving clients worldwide.',
  },
  '/about': {
    title: 'About Elevon | Digital Solutions Company in Lalitpur, Nepal',
    description:
      'Learn about Elevon Private Limited: our mission, vision, values, and how we work with clients in Nepal and internationally.',
    crumb: 'About',
  },
  '/services': {
    title: 'Web Development, SEO & Digital Marketing Services | Elevon',
    description:
      'Website design and development, SEO, and digital marketing for small businesses, startups, and growing companies in Nepal and worldwide.',
    crumb: 'Services',
  },
  '/work': {
    title: 'Our Work | Elevon Private Limited',
    description:
      'Explore Elevon’s concept projects demonstrating our approach to website design, SEO, and digital marketing.',
    crumb: 'Our Work',
  },
  '/contact': {
    title: 'Contact Elevon | Start Your Project',
    description:
      'Tell Elevon about your project. Request a quote for website development, SEO, or digital marketing.',
    crumb: 'Contact',
  },
  '/privacy': {
    title: 'Privacy Notice | Elevon Private Limited',
    description: 'How Elevon Private Limited handles information submitted through its website.',
    crumb: 'Privacy Notice',
  },
  '/404': {
    title: 'Page not found | Elevon Private Limited',
    description: 'The page you were looking for could not be found.',
    noindex: true,
  },
};

/** Routes that are crawled and listed in the sitemap. */
export const INDEXABLE_PATHS = Object.keys(PAGES).filter((path) => !PAGES[path].noindex);

export const NOT_FOUND_PATH = '/404';

/** Normalizes `/about/` to `/about`; unknown paths fall back to the 404 entry. */
export function resolvePath(pathname: string): string {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return clean in PAGES ? clean : NOT_FOUND_PATH;
}

/** Absolute URL for a path, or undefined until `VITE_SITE_URL` is configured. */
export function absoluteUrl(path: string): string | undefined {
  return SITE.url ? `${SITE.url}${path === '/' ? '/' : path}` : undefined;
}

export interface HeadData {
  title: string;
  description: string;
  robots: string;
  canonical?: string;
  image?: string;
  jsonLd: object[];
}

const compact = <T extends object>(value: T): T =>
  Object.fromEntries(Object.entries(value).filter(([, v]) => v !== undefined)) as T;

function organization() {
  return compact({
    '@type': ['Organization', 'ProfessionalService'],
    '@id': SITE.url ? `${SITE.url}/#organization` : undefined,
    name: SITE.name,
    slogan: SITE.tagline,
    url: absoluteUrl('/'),
    logo: SITE.url ? `${SITE.url}/logo.png` : undefined,
    image: SITE.url ? `${SITE.url}/og-image.png` : undefined,
    email: SITE.email,
    description: SITE.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lalitpur',
      addressCountry: 'NP',
    },
    areaServed: ['Nepal', 'Worldwide'],
    knowsAbout: ['Website development', 'Search engine optimization', 'Digital marketing'],
    sameAs: SITE.sameAs.length ? SITE.sameAs : undefined,
  });
}

function jsonLdFor(path: string, page: PageSeo): object[] {
  const graph: object[] = [];

  if (path === '/') {
    graph.push(organization());
    graph.push(
      compact({
        '@type': 'WebSite',
        name: SITE.name,
        url: absoluteUrl('/'),
        inLanguage: 'en',
        publisher: SITE.url ? { '@id': `${SITE.url}/#organization` } : undefined,
      }),
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    );
  }

  if (path === '/services') {
    graph.push({
      '@type': 'ItemList',
      itemListElement: SERVICES.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: compact({
          '@type': 'Service',
          name: service.title,
          description: service.summary,
          serviceType: service.name,
          areaServed: ['Nepal', 'Worldwide'],
          provider: SITE.url
            ? { '@id': `${SITE.url}/#organization` }
            : { '@type': 'Organization', name: SITE.name },
        }),
      })),
    });
  }

  if (path === '/about' || path === '/contact') {
    graph.push(organization());
  }

  if (page.crumb && SITE.url) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
        { '@type': 'ListItem', position: 2, name: page.crumb, item: absoluteUrl(path) },
      ],
    });
  }

  return graph.map((node) => ({ '@context': 'https://schema.org', ...node }));
}

export function buildHead(pathname: string): HeadData {
  const path = resolvePath(pathname);
  const page = PAGES[path];
  return {
    title: page.title,
    description: page.description,
    robots: page.noindex
      ? 'noindex, follow'
      : 'index, follow, max-image-preview:large, max-snippet:-1',
    canonical: page.noindex ? undefined : absoluteUrl(path),
    image: SITE.url ? `${SITE.url}/og-image.png` : undefined,
    jsonLd: jsonLdFor(path, page),
  };
}
