import type { CaseStudy } from '@/types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    kind: 'local',
    title: 'Local service business website',
    objective: 'A clean, mobile-first website for a fictional local service provider.',
    need: 'A credible site that turns searches into calls.',
    solution: 'Clear service pages, an inquiry form, and local SEO structure.',
    services: 'Web design & development, on-page SEO',
  },
  {
    kind: 'landing',
    title: 'Startup landing page',
    objective: 'A single-page launch site for a fictional product.',
    need: 'Explain the offer quickly and capture leads.',
    solution: 'Focused messaging, strong calls to action, and fast load times.',
    services: 'Landing page, conversion design',
  },
  {
    kind: 'firm',
    title: 'Professional firm redesign',
    objective: 'A redesign concept for a fictional consultancy.',
    need: 'A dated site that doesn’t reflect the firm’s quality.',
    solution: 'Modern layout, structured content, and search-friendly pages.',
    services: 'Redesign, SEO audit approach',
  },
];
