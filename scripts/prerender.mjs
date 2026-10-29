// Writes real HTML for every route into dist/, plus 404.html, sitemap.xml and robots.txt.
// Run by `npm run build` after the client (dist/) and server (dist-server/) bundles exist.
import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const { render, buildHead, INDEXABLE_PATHS, NOT_FOUND_PATH, SITE } = await import(
  pathToFileURL(join(root, 'dist-server', 'entry-server.js')).href
);

const escapeHtml = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const jsonForScript = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

const template = await readFile(join(dist, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>')) {
  throw new Error('dist/index.html is already prerendered; run a fresh `vite build` first.');
}

// Preload the Latin font subsets so text paints in the final typeface without a swap.
const assets = await readdir(join(dist, 'assets'));
const fontPreloads = assets
  .filter((file) => /^(inter|montserrat)-latin-wght-normal-.*\.woff2$/.test(file))
  .map(
    (file) =>
      `    <link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`,
  );

function headTags(path) {
  const head = buildHead(path);
  const tags = [
    `<title>${escapeHtml(head.title)}</title>`,
    `<meta name="description" content="${escapeHtml(head.description)}" />`,
    `<meta name="robots" content="${head.robots}" />`,
    head.canonical && `<link rel="canonical" href="${head.canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE.name)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${escapeHtml(head.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(head.description)}" />`,
    head.canonical && `<meta property="og:url" content="${head.canonical}" />`,
    head.image && `<meta property="og:image" content="${head.image}" />`,
    head.image && `<meta property="og:image:width" content="1200" />`,
    head.image && `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="${head.image ? 'summary_large_image' : 'summary'}" />`,
    `<meta name="twitter:title" content="${escapeHtml(head.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(head.description)}" />`,
    head.image && `<meta name="twitter:image" content="${head.image}" />`,
    ...head.jsonLd.map(
      (node) =>
        `<script type="application/ld+json" data-seo-jsonld>${jsonForScript(node)}</script>`,
    ),
  ].filter(Boolean);
  return `<!--seo:start-->\n${[...fontPreloads, ...tags.map((tag) => `    ${tag}`)].join('\n')}\n    <!--seo:end-->`;
}

async function writePage(path, file) {
  const html = await render(path);
  const page = template
    .replace(/<!--seo:start-->[\s\S]*<!--seo:end-->/, headTags(path))
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, page);
  console.log(`prerendered ${path} -> ${file.replace(`${root}/`, '')}`);
}

for (const path of INDEXABLE_PATHS) {
  await writePage(path, path === '/' ? join(dist, 'index.html') : join(dist, path, 'index.html'));
}
await writePage(NOT_FOUND_PATH, join(dist, '404.html'));

if (SITE.url) {
  const urls = INDEXABLE_PATHS.map((path) => `  <url><loc>${SITE.url}${path}</loc></url>`).join(
    '\n',
  );
  await writeFile(
    join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
  await writeFile(
    join(dist, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`,
  );
  console.log(`sitemap.xml and robots.txt written for ${SITE.url}`);
} else {
  console.warn(
    '\n⚠ VITE_SITE_URL is not set: canonical URLs, Open Graph URLs and sitemap.xml were skipped.\n' +
      '  Set it to the final domain (e.g. https://example.com) before deploying.\n',
  );
}
