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

## Before launch

1. **Contact form:** copy `.env.example` to `.env` and set `VITE_FORM_ENDPOINT` (Formspree, Netlify, or your own backend). Without it the form opens the visitor's email app.
2. **Domain:** replace `YOUR-DOMAIN` in `public/robots.txt` and add a sitemap once the domain is final.
3. **Privacy notice:** have it reviewed, then remove the draft callout in `src/pages/Privacy.tsx`.
4. **Hosting:** any static host works. `public/_redirects` handles client-side routing on Netlify; on Vercel add a rewrite to `/index.html`.
5. **Case studies:** replace the concept projects in `src/data/work.ts` with real client work as it is completed.

`legacy-html/` contains the earlier static HTML version and can be deleted.
