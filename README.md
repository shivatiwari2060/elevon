# Elevon website

Marketing site for Elevon Private Limited. React 18, TypeScript (strict), Zustand, Framer Motion, React Router, built with Vite.

## Scripts

```bash
npm install
npm run dev        # local development
npm run build      # type-check + production build into dist/
npm run typecheck  # tsc --noEmit
npm run lint       # ESLint (typescript-eslint, react-hooks)
npm run format     # Prettier
npm test           # Vitest unit tests
```

## Project structure

```
src/
  app/               App shell and lazy-loaded routes
  pages/             One file per route; compose features, no logic
  features/
    home/            Hero, services showcase, process timeline, FAQ ...
    services/        Service detail blocks
    work/            Concept project cards and previews
    contact/         Form, validation, submission, success state
  components/
    ui/              Design-system primitives (Button, Card, Section, Accordion ...)
    layout/          Header, MobileMenu, Footer, PageHero, CtaSection, Layout
    brand/           Logo and the traced Elevon mark
  data/              All site copy, typed (services, company, work, faqs, site)
  store/             Zustand stores (ui, services showcase, inquiry form)
  hooks/ lib/        usePageMeta, motion presets, cn helper
  styles/            tokens.css, tones.css, base.css
  types/             Shared domain types
```

## Design system

- `styles/tokens.css` holds the palette, spacing scale, radii and layout sizes.
- `styles/tones.css` defines section tones (`light`, `subtle`, `dark`, `darker`). A `<Section tone="dark">` re-themes everything inside it through CSS variables, so components never hard-code colours.
- Components own their styles through CSS Modules (`*.module.css`).
- Shared motion settings live in `lib/motion.ts`; reduced-motion preferences are respected globally.

## State

- `useUiStore` mobile navigation.
- `useServicesStore` selected service in the home showcase.
- `useInquiryStore` contact form values, errors and submission status. Validation and submission are pure functions in `features/contact/` and are unit tested.

## SEO

`npm run build` prerenders every route to static HTML (`scripts/prerender.mjs`, using `src/entry-server.tsx`), so crawlers get full content without running JavaScript; the browser then hydrates it.

- Per-page title, description, robots and canonical come from `src/data/seo.ts`. Add new routes there.
- Structured data (Organization, WebSite, FAQPage, Service list, BreadcrumbList) is built in the same file from real site data.
- With `VITE_SITE_URL` set, the build also writes `sitemap.xml` and `robots.txt` and emits canonical and Open Graph URLs. Without it the build warns and skips them.
- Unknown URLs get a real `404.html` (noindex). Do not add a catch-all SPA rewrite on the host, or 404s will return 200.
- Social image and icons: `public/og-image.png` (1200x630), `public/logo.png`, `public/apple-touch-icon.png`.

## Before launch

1. **Domain:** set `VITE_SITE_URL` (e.g. `https://yourdomain.com`) in the host's build environment. Optionally list official profile URLs in `SITE.sameAs` (`src/data/site.ts`).
2. **Contact form:** set `VITE_FORM_ENDPOINT` (Formspree, Netlify, or your own backend). Without it the form opens the visitor's email app.
3. **Privacy notice:** have it reviewed, then remove the draft callout in `src/pages/Privacy.tsx`.
4. **Search Console:** add the site, submit `/sitemap.xml`, and request indexing for the home page.
5. **Google Business Profile:** create one for Elevon (Lalitpur) and keep name, address and phone identical everywhere.
6. **Case studies:** replace the concept projects in `src/data/work.ts` with real client work as it is completed. Real content and links from other sites drive rankings more than any technical setting.
7. **Hosting:** any static host works (Netlify, Cloudflare Pages, Vercel). Serve `dist/`; each route is a folder with its own `index.html`.

`legacy-html/` contains the earlier static HTML version and can be deleted.
