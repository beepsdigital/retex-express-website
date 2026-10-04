#!/usr/bin/env node
'use strict';
// Builds the static site into dist/. Usage: node build.js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const cfg = require('./site.config.js');
const { layout } = require('./src/templates/layout.js');
const { render } = require('./src/templates/pages.js');
const { langPath, absUrl, stripTags } = require('./src/templates/util.js');
const { validateContent } = require('./src/templates/validate.js');

// When siteUrl has a path (e.g. a GitHub Pages project site), every root-relative URL gets this prefix.
const BASE = new URL(cfg.siteUrl).pathname.replace(/\/+$/, '');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const IMG_DIR = path.join(SRC, 'assets', 'img');

// ---------- image dimensions (PNG + JPEG headers, no dependencies) ----------
const dimsCache = new Map();
function imageDims(name) {
  if (dimsCache.has(name)) return dimsCache.get(name);
  const file = path.join(IMG_DIR, name);
  if (!fs.existsSync(file)) throw new Error(`Image not found: src/assets/img/${name}`);
  const buf = fs.readFileSync(file);
  let d;
  if (buf.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    d = { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  } else if (buf[0] === 0xff && buf[1] === 0xd8) {
    let off = 2;
    while (off < buf.length) {
      if (buf[off] !== 0xff) { off++; continue; }
      const marker = buf[off + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        d = { height: buf.readUInt16BE(off + 5), width: buf.readUInt16BE(off + 7) };
        break;
      }
      off += 2 + buf.readUInt16BE(off + 2);
    }
  }
  if (!d) throw new Error(`Cannot read dimensions of ${name}`);
  dimsCache.set(name, d);
  return d;
}

// ---------- helpers ----------
function rmrf(p) { if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true }); }
function writeFile(rel, data) {
  const file = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, data);
}
function hashOf(...files) {
  const h = crypto.createHash('md5');
  files.forEach((f) => h.update(fs.readFileSync(f)));
  return h.digest('hex').slice(0, 8);
}
const today = new Date().toISOString().slice(0, 10);
const fmt12 = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`; };

// ---------- page registry ----------
function registry(content) {
  const pages = [
    { type: 'home', slug: '' },
    { type: 'servicesIndex', slug: 'services/' },
    ...content.services.map((sv) => ({ type: 'service', slug: `services/${sv.slug}/`, data: sv })),
    { type: 'destinationsIndex', slug: 'destinations/' },
    ...content.destinations.map((d) => ({ type: 'destination', slug: `destinations/${d.slug}/`, data: d })),
    { type: 'about', slug: 'about/' },
    { type: 'contact', slug: 'contact/' },
    { type: 'quote', slug: 'quote/' },
    { type: 'faq', slug: 'faq/' },
    { type: 'privacy', slug: 'privacy-policy/' },
    { type: 'terms', slug: 'terms/' },
    { type: 'notFound', slug: '404.html', file: '404.html', noindex: true },
  ];
  return pages;
}

function main() {
  const start = Date.now();
  const contents = Object.fromEntries(cfg.langs.map((l) => [l, require(`./src/content/${l}.js`)]));

  // Shape: every language must define the same keys with no empty values (spec §9).
  const contentErrors = validateContent(contents, cfg.langs);
  if (contentErrors.length) throw new Error(`Content validation failed:\n - ${contentErrors.join('\n - ')}`);

  // Parity: every language must define the same page set.
  const slugSets = cfg.langs.map((l) => registry(contents[l]).map((p) => p.slug));
  const [first, ...rest] = slugSets;
  rest.forEach((set, i) => {
    const lang = cfg.langs[i + 1];
    first.forEach((s) => { if (!set.includes(s)) throw new Error(`Missing in ${lang}: ${s}`); });
    set.forEach((s) => { if (!first.includes(s)) throw new Error(`Missing in ${cfg.langs[0]}: ${s}`); });
  });

  rmrf(DIST);
  fs.mkdirSync(DIST, { recursive: true });
  fs.cpSync(path.join(SRC, 'assets'), path.join(DIST, 'assets'), { recursive: true });
  fs.cpSync(path.join(SRC, 'static'), DIST, { recursive: true });

  const buildId = hashOf(path.join(SRC, 'assets', 'css', 'main.css'), path.join(SRC, 'assets', 'js', 'main.js'));
  const sitemapEntries = [];
  let count = 0;

  for (const lang of cfg.langs) {
    const content = contents[lang];
    const ctx = {
      cfg, content, lang, buildId,
      url: (slug) => langPath(cfg, lang, slug),
      abs: (slug) => absUrl(cfg, lang, slug),
      dims: imageDims,
    };
    for (const page of registry(content)) {
      const out = render(page.type, ctx, page.data);
      let html = layout(ctx, { slug: page.slug, meta: out.meta, body: out.body, schema: out.schema, preload: out.preload || [], bodyClass: out.bodyClass || `page-${page.type}` });
      // Copy may cross-link with "@@/path/" tokens; resolve them to the language's base path.
      html = html.replace(/@@\//g, langPath(cfg, lang, ''));
      if (BASE) {
        html = html.replace(/\s(href|src|action)="\/(?!\/)/g, (m, attr) => ` ${attr}="${BASE}/`);
        html = html.replace(/\ssrcset="([^"]*)"/g, (m, v) => ` srcset="${v.replace(/(^|,\s*)\/(?!\/)/g, `$1${BASE}/`)}"`);
      }
      if (/\bundefined\b|\[object Object\]/.test(html)) throw new Error(`Template leak ("undefined" or "[object Object]") in ${lang}/${page.slug || 'home'}`);
      const rel = page.file ? path.join(lang === cfg.defaultLang ? '' : lang, page.file) : path.join(langPath(cfg, lang, page.slug), 'index.html');
      writeFile(rel, html);
      count++;
      if (!page.noindex && !out.meta.noindex) sitemapEntries.push({ slug: page.slug, lang });
    }
  }

  // sitemap.xml with hreflang alternates
  const bySlug = new Map();
  sitemapEntries.forEach((e) => { if (!bySlug.has(e.slug)) bySlug.set(e.slug, []); bySlug.get(e.slug).push(e.lang); });
  const urls = [];
  for (const [slug, langs] of bySlug) {
    for (const lang of langs) {
      const alternates = langs.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${absUrl(cfg, l, slug)}"/>`).join('\n');
      const xdefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${absUrl(cfg, cfg.defaultLang, slug)}"/>`;
      const priority = slug === '' ? '1.0' : /^(services|destinations)\/[^/]+\/$/.test(slug) ? '0.8' : /^(privacy-policy|terms)\//.test(slug) ? '0.3' : '0.7';
      urls.push(`  <url>\n    <loc>${absUrl(cfg, lang, slug)}</loc>\n${alternates}\n${xdefault}\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`);
    }
  }
  writeFile('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`);

  writeFile('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${cfg.siteUrl}/sitemap.xml\n`);

  // GitHub Pages custom domain (harmless on other hosts); .nojekyll keeps Pages from running Jekyll.
  const host = new URL(cfg.siteUrl).host;
  if (!host.endsWith('github.io')) writeFile('CNAME', `${host}\n`);
  writeFile('.nojekyll', '');

  // Web app manifest (generated so icon paths respect the base path).
  writeFile('manifest.webmanifest', JSON.stringify({
    name: cfg.brand.name,
    short_name: 'RetEx',
    description: 'Courier, cargo and logistics from Riyadh to the GCC and worldwide.',
    start_url: `${BASE}/`,
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#2A1BE8',
    icons: [
      { src: `${BASE}/assets/img/icon-192.png`, sizes: '192x192', type: 'image/png' },
      { src: `${BASE}/assets/img/icon-512.png`, sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
    ],
  }, null, 2) + '\n');

  // llms.txt – plain-language summary for AI crawlers
  const en = contents.en;
  const lines = [
    `# ${cfg.brand.name}`,
    '',
    `> ${stripTags(en.schemaDescription)}`,
    '',
    `- Business name on Google: ${cfg.brand.legalName}`,
    `- Location: ${cfg.address.district.en}, ${cfg.address.city.en} ${cfg.address.postalCode}, ${cfg.address.country.en} (plus code ${cfg.address.plusCode} ${cfg.address.city.en})`,
    `- Phone / WhatsApp: ${cfg.contact.phoneDisplay}`,
    `- Hours: ${cfg.hours.map((h) => `${h.days[0]}${h.days.length > 1 ? ` to ${h.days[h.days.length - 1]}` : ''} ${fmt12(h.opens)} to ${fmt12(h.closes)}`).join(', ')}`,
    `- Founded: ${cfg.brand.foundingDate}`,
    `- Languages: English, Arabic`,
    `- Google Maps: ${cfg.google.mapsUrl}`,
    '',
    '## Services',
    ...en.services.map((sv) => `- [${sv.name}](${absUrl(cfg, 'en', `services/${sv.slug}/`)}): ${stripTags(sv.short)}`),
    '',
    '## Destinations',
    ...en.destinations.map((d) => `- [${d.h1}](${absUrl(cfg, 'en', `destinations/${d.slug}/`)}): ${stripTags(d.meta.description)}`),
    '',
    '## Key pages',
    `- [About](${absUrl(cfg, 'en', 'about/')})`,
    `- [Contact](${absUrl(cfg, 'en', 'contact/')})`,
    `- [Get a quote](${absUrl(cfg, 'en', 'quote/')})`,
    `- [FAQ](${absUrl(cfg, 'en', 'faq/')})`,
    `- [Arabic site](${absUrl(cfg, 'ar', '')})`,
    '',
  ];
  writeFile('llms.txt', lines.join('\n'));

  console.log(`Built ${count} pages in ${Date.now() - start} ms → ${DIST}`);
}

main();
