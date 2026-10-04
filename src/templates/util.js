'use strict';
// Small helpers shared by templates and the build.

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const stripTags = (s) => String(s == null ? '' : s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

// Build an attribute string from an object; true → bare attribute, falsy/empty → omitted.
const attrs = (o) => Object.entries(o)
  .filter(([, v]) => v !== undefined && v !== null && v !== false && v !== '')
  .map(([k, v]) => (v === true ? k : `${k}="${esc(v)}"`))
  .join(' ');

// '/' for the default language, '/ar/' for others; slug is '' or 'about/' etc.
function langPath(cfg, lang, slug) {
  const base = lang === cfg.defaultLang ? '/' : `/${lang}/`;
  return base + (slug || '');
}

function absUrl(cfg, lang, slug) {
  return cfg.siteUrl.replace(/\/+$/, '') + langPath(cfg, lang, slug);
}

function altLang(cfg, lang) {
  return cfg.langs.find((l) => l !== lang) || lang;
}

const paragraphs = (arr = []) => arr.map((p) => `<p>${p}</p>`).join('\n');

const list = (arr = [], cls = '') => (arr.length ? `<ul${cls ? ` class="${cls}"` : ''}>${arr.map((i) => `<li>${i}</li>`).join('')}</ul>` : '');

// Serialise JSON-LD safely inside a <script> element.
const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/<\//g, '<\\/')}</script>`;

module.exports = { esc, stripTags, attrs, langPath, absUrl, altLang, paragraphs, list, jsonLd };
