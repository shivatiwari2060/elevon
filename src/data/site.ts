import type { NavItem } from '@/types';

export const SITE = {
  name: 'Elevon Private Limited',
  tagline: 'Elevate. Evolve. Excel.',
  email: 'elevonnp@gmail.com',
  location: 'Lalitpur, Nepal',
  /** Public origin without a trailing slash, e.g. https://example.com. Set via VITE_SITE_URL. */
  url: (import.meta.env.VITE_SITE_URL ?? '').trim().replace(/\/+$/, ''),
  /** Official profile URLs (LinkedIn, Facebook, ...) used in structured data. */
  sameAs: [] as string[],
  description:
    'Elevon helps businesses in Nepal and around the world strengthen their digital presence through website development, SEO, and digital marketing.',
} as const;

export const NAV: NavItem[] = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Our Work' },
  { to: '/contact', label: 'Contact' },
];
