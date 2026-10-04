#!/usr/bin/env node
'use strict';
// Post-build SEO and integrity checks for dist/. Usage: node test.js
const fs = require('fs');
const path = require('path');
const cfg = require('./site.config.js');

const DIST = path.join(__dirname, 'dist');
const failures = [];
const fail = (file, msg) => failures.push(`${file}: ${msg}`);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out); else out.push(p);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Unit checks on sources (run before the dist/ checks)
// ---------------------------------------------------------------------------
const assert = (cond, msg) => { if (!cond) failures.push(`unit: ${msg}`); };

// 1. Quote form must navigate exactly once (window.open with "noopener" returns null → double navigation).
(function unitQuoteForm() {
  const src = fs.readFileSync(path.join(__dirname, 'src', 'assets', 'js', 'main.js'), 'utf8');
  const el = (o = {}) => Object.assign({
    classList: { toggle() {}, add() {}, remove() {}, contains() { return false; } },
    setAttribute() {}, getAttribute() { return null; }, addEventListener() {}, querySelector() { return null; },
    querySelectorAll() { return []; }, focus() {}, textContent: '', className: '', value: '', required: false, name: '',
  }, o);
  const fieldAttrs = (label) => (k) => ({ 'data-label': label, 'data-error': `${label}?` }[k] || null);
  const fields = [
    el({ name: 'name', value: 'Test', required: true, getAttribute: fieldAttrs('Name') }),
    el({ name: 'phone', value: '0558736359', required: true, getAttribute: fieldAttrs('Phone') }),
  ];
  let submit = null;
  const form = el({
    getAttribute: (k) => ({ 'data-wa': '966558736359', 'data-intro': 'Hi' }[k] || null),
    addEventListener: (t, fn) => { if (t === 'submit') submit = fn; },
    querySelectorAll: () => fields,
  });
  const msg = el();
  const calls = { open: [], href: null };
  const fakeWindow = {
    matchMedia: () => ({ matches: false, addEventListener() {} }), addEventListener() {}, scrollY: 0,
    open: (...args) => { calls.open.push(args); return { opener: 'x' }; },
    location: { set href(v) { calls.href = v; } },
  };
  const fakeDocument = {
    querySelector: () => null, querySelectorAll: () => [], addEventListener() {},
    getElementById: (id) => (id === 'quote-form' ? form : id === 'quote-msg' ? msg : null),
    documentElement: el(), body: el(),
  };
  try {
    new Function('window', 'document', src)(fakeWindow, fakeDocument);
    assert(typeof submit === 'function', 'quote form submit handler registered');
    if (submit) submit({ preventDefault() {} });
    assert(calls.open.length === 1, `window.open called ${calls.open.length} times (want 1)`);
    assert(calls.open[0] && !/noopener/.test(String(calls.open[0][2] || '')), 'window.open must not pass "noopener" (it returns null and triggers the location fallback)');
    assert(calls.href === null, 'location.href must not be set when the WhatsApp tab opened');
    assert(calls.open[0] && /wa\.me\/966558736359\?text=/.test(calls.open[0][0]), 'WhatsApp URL built');
  } catch (e) { assert(false, `main.js threw in the DOM stub: ${e.message}`); }
})();

// 2. Content validator: missing keys in one language must be reported before anything renders.
(function unitValidator() {
  let validateContent;
  try { ({ validateContent } = require('./src/templates/validate.js')); } catch (e) { assert(false, 'src/templates/validate.js missing'); return; }
  const en = require('./src/content/en.js');
  const ar = require('./src/content/ar.js');
  const broken = JSON.parse(JSON.stringify(ar));
  delete broken.services[0].lead;
  const errs = validateContent({ en, ar: broken }, ['en', 'ar']);
  assert(errs.some((e) => /services\[air-cargo\]\.lead/.test(e)), `validator must name the missing key (got: ${errs.slice(0, 2).join('; ') || 'nothing'})`);
  const real = validateContent({ en, ar }, ['en', 'ar']);
  assert(real.length === 0, `real content must validate (${real.slice(0, 3).join('; ')})`);
})();

// 3. CSS: reveal-on-scroll must not hide content when JS is unavailable; print must keep it; contrast tokens.
(function unitCss() {
  const css = fs.readFileSync(path.join(__dirname, 'src', 'assets', 'css', 'main.css'), 'utf8');
  assert(!/(^|\n)\s*\.reveal\s*\{[^}]*opacity:\s*0/.test(css), '.reveal is hidden without a .js guard');
  assert(/\.js \.reveal\s*\{[^}]*opacity:\s*0/.test(css), 'hidden reveal state must be scoped under .js');
  const print = css.slice(css.indexOf('@media print'));
  const hidingRules = (print.match(/[^{}]+\{[^}]*display:\s*none[^}]*\}/g) || []).filter((r) => /\.reveal/.test(r));
  assert(print && hidingRules.length === 0, 'print styles must not hide .reveal content');
  const token = (name) => (css.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6})`)) || [])[1];
  const lum = (hex) => { const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
  const contrast = (a, b) => { const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x); return (l1 + 0.05) / (l2 + 0.05); };
  const wa = token('--wa'); const pinkText = token('--pink-text'); const blue = token('--blue');
  assert(wa && contrast('#ffffff', wa) >= 4.5, `white on --wa (${wa}) is ${wa ? contrast('#ffffff', wa).toFixed(2) : '?'}:1, need 4.5`);
  assert(pinkText && contrast('#ffffff', pinkText) >= 4.5, `white on --pink-text is below 4.5:1`);
  assert(/\.steps__num\s*\{[^}]*var\(--pink-text\)/.test(css), '.steps__num must use --pink-text for 4.5:1 contrast');
  assert(/:focus-visible\s*\{[^}]*var\(--blue\)/.test(css) && blue && contrast('#ffffff', blue) >= 3, 'focus ring must be --blue (≥3:1 on white)');
})();

if (!fs.existsSync(DIST)) { console.error('dist/ not found. Run `node build.js` first.'); process.exit(1); }

const htmlFiles = walk(DIST).filter((f) => f.endsWith('.html'));
const relOf = (f) => path.relative(DIST, f).split(path.sep).join('/');

// Map a site-root URL path to a file in dist/.
function resolveLocal(urlPath) {
  const clean = urlPath.split('#')[0].split('?')[0];
  if (!clean.startsWith('/')) return null;
  const p = path.join(DIST, clean);
  if (clean.endsWith('/')) return fs.existsSync(path.join(p, 'index.html'));
  if (fs.existsSync(p) && fs.statSync(p).isFile()) return true;
  return fs.existsSync(path.join(p, 'index.html')); // tolerated, but canonical form is trailing slash
}

const sitemap = fs.existsSync(path.join(DIST, 'sitemap.xml')) ? fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8') : '';
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!sitemap) fail('sitemap.xml', 'missing');
if (!fs.existsSync(path.join(DIST, 'robots.txt'))) fail('robots.txt', 'missing');
if (!fs.existsSync(path.join(DIST, 'llms.txt'))) fail('llms.txt', 'missing');

const pagesByLang = { en: new Set(), ar: new Set() };

for (const file of htmlFiles) {
  const rel = relOf(file);
  const html = fs.readFileSync(file, 'utf8');
  const is404 = rel.endsWith('404.html');
  const lang = rel.startsWith('ar/') ? 'ar' : 'en';
  const slug = is404 ? '404.html' : rel.replace(/^ar\//, '').replace(/index\.html$/, '');
  pagesByLang[lang].add(slug);

  // html attributes
  const htmlTag = html.match(/<html[^>]*>/);
  if (!htmlTag || !/lang="(en|ar)"/.test(htmlTag[0])) fail(rel, 'missing lang attribute');
  if (!htmlTag || !/dir="(ltr|rtl)"/.test(htmlTag[0])) fail(rel, 'missing dir attribute');
  if (lang === 'ar' && htmlTag && !/dir="rtl"/.test(htmlTag[0])) fail(rel, 'Arabic page is not rtl');

  // h1
  const h1s = html.match(/<h1[\s>]/g) || [];
  if (h1s.length !== 1) fail(rel, `expected 1 <h1>, found ${h1s.length}`);

  // title + description (lengths measured on decoded text, as a search engine sees it)
  const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  const title = decode((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '');
  if (!title) fail(rel, 'missing <title>');
  else if (title.length < 35 || title.length > 65) fail(rel, `title length ${title.length} (want 35–65): "${title}"`);
  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
  if (!desc) fail(rel, 'missing meta description');
  else if (desc.length < 80 || desc.length > 160) fail(rel, `description length ${desc.length} (want 80–160)`);

  // canonical + hreflang
  const canonical = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  const expected = `${cfg.siteUrl}${lang === 'en' ? '/' : '/ar/'}${slug === '404.html' ? '' : slug}`;
  if (is404) {
    if (canonical) fail(rel, '404 page must not have a canonical');
    if (!/<meta name="robots" content="noindex/.test(html)) fail(rel, '404 page must be noindex');
  } else {
    if (canonical !== expected) fail(rel, `canonical "${canonical}" != "${expected}"`);
    for (const hl of ['en', 'ar', 'x-default']) {
      if (!new RegExp(`<link rel="alternate" hreflang="${hl}" href="[^"]+"`).test(html)) fail(rel, `missing hreflang ${hl}`);
    }
    if (!/<meta name="robots" content="index/.test(html)) fail(rel, 'indexable page missing robots index');
    const url = expected;
    if (!sitemapUrls.includes(url)) fail(rel, `not in sitemap: ${url}`);
  }

  // Open Graph
  if (!/<meta property="og:image" content="https?:\/\//.test(html)) fail(rel, 'missing og:image');

  // Progressive enhancement hook: reveal styles are gated on html.js
  if (!html.includes("classList.add('js')")) fail(rel, 'missing html.js class script (reveal content would be hidden without JS)');

  // Phone numbers must be stored in logical order, never visually reversed for RTL
  if (/\d{4} \d{3} \d{2} 966\+/.test(html)) fail(rel, 'phone number written in reversed (visual) order');
  if (rel === 'ar/contact/index.html' && !html.includes('dir="ltr">+966 55 873 6359')) fail(rel, 'Arabic contact page must isolate the phone with dir="ltr"');

  // Latin-script review quotes inside RTL pages need their own direction
  if (lang === 'ar') {
    const reviews = html.match(/<blockquote class="review[^"]*">\s*<p[^>]*>/g) || [];
    reviews.forEach((r) => { if (!/dir="(auto|ltr)"/.test(r)) fail(rel, 'review quote lacks dir="auto" on an RTL page'); });
  }

  // aria-current="page" only on the link to this very page
  const pagePath = `${lang === 'en' ? '/' : '/ar/'}${slug === '404.html' ? '' : slug}`;
  for (const m2 of html.matchAll(/<a href="([^"]+)" aria-current="page"/g)) {
    if (m2[1] !== pagePath) fail(rel, `aria-current="page" on ${m2[1]} (page is ${pagePath})`);
  }

  // links and assets
  const attrsRe = /\s(?:href|src)="([^"]+)"/g;
  let m;
  while ((m = attrsRe.exec(html))) {
    const v = m[1];
    if (/^(https?:|mailto:|tel:|#|data:|\/\/)/.test(v)) continue;
    if (!v.startsWith('/')) { fail(rel, `relative URL should be root-relative: ${v}`); continue; }
    if (!resolveLocal(v)) fail(rel, `broken internal link: ${v}`);
  }
  const srcsetRe = /\ssrcset="([^"]+)"/g;
  while ((m = srcsetRe.exec(html))) {
    m[1].split(',').map((s) => s.trim().split(/\s+/)[0]).forEach((u) => { if (!resolveLocal(u)) fail(rel, `broken srcset url: ${u}`); });
  }

  // images
  const imgs = html.match(/<img\b[^>]*>/g) || [];
  imgs.forEach((tag) => {
    if (!/\salt="/.test(tag)) fail(rel, `img without alt: ${tag.slice(0, 80)}`);
    if (!/\swidth="\d+"/.test(tag) || !/\sheight="\d+"/.test(tag)) fail(rel, `img without width/height: ${tag.slice(0, 80)}`);
  });

  // JSON-LD
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!is404 && ld.length === 0) fail(rel, 'no JSON-LD');
  let faqNodes = 0;
  ld.forEach((b) => {
    try {
      const o = JSON.parse(b[1]);
      if (!o['@type']) fail(rel, 'JSON-LD without @type');
      if (o['@type'] === 'FAQPage') {
        faqNodes++;
        if (!Array.isArray(o.mainEntity) || !o.mainEntity.length) fail(rel, 'FAQPage node without mainEntity (Rich Results error)');
      }
    } catch (e) { fail(rel, `invalid JSON-LD: ${e.message}`); }
  });
  if (faqNodes > 1) fail(rel, `${faqNodes} FAQPage nodes on one page (want at most 1)`);
}

// Sitemap entries must exist
for (const u of sitemapUrls) {
  const p = u.replace(cfg.siteUrl, '');
  if (!resolveLocal(p)) fail('sitemap.xml', `entry has no file: ${u}`);
}

// Language parity
for (const s of pagesByLang.en) if (!pagesByLang.ar.has(s)) fail('parity', `missing Arabic page for ${s || '/'}`);
for (const s of pagesByLang.ar) if (!pagesByLang.en.has(s)) fail('parity', `missing English page for ${s || '/'}`);

if (failures.length) {
  console.error(`FAIL (${failures.length})\n` + failures.map((f) => ' - ' + f).join('\n'));
  process.exit(1);
}
console.log(`PASS ${htmlFiles.length} pages checked, ${sitemapUrls.length} sitemap URLs`);
