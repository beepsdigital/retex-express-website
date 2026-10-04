'use strict';
// Structural validation of the content modules: every language must expose the same keys,
// arrays of objects must line up (matched by slug where present), and no value may be empty.
// Returns an array of human-readable error strings (empty when valid).

function typeOf(v) { return Array.isArray(v) ? 'array' : v === null ? 'null' : typeof v; }
function isEmpty(v) { const t = typeOf(v); return t === 'undefined' || t === 'null' || (t === 'string' && v.trim() === ''); }

function validateContent(contents, langs) {
  const errors = [];
  const base = langs[0];

  // Base language: no empty values anywhere.
  const checkEmpty = (v, p) => {
    if (isEmpty(v)) { errors.push(`${base}: missing value at ${p}`); return; }
    const t = typeOf(v);
    if (t === 'object') Object.keys(v).forEach((k) => checkEmpty(v[k], `${p}.${k}`));
    else if (t === 'array') v.forEach((x, i) => checkEmpty(x, `${p}[${(x && x.slug) || i}]`));
  };
  checkEmpty(contents[base], base);

  // Other languages: same shape as base.
  const walk = (a, b, p, lang) => {
    if (isEmpty(b)) { errors.push(`${lang}: missing value at ${p}`); return; }
    const ta = typeOf(a); const tb = typeOf(b);
    if (ta !== tb) { errors.push(`${lang}: expected ${ta} at ${p}, got ${tb}`); return; }
    if (ta === 'object') {
      Object.keys(a).forEach((k) => walk(a[k], b[k], `${p}.${k}`, lang));
      Object.keys(b).forEach((k) => { if (!(k in a)) errors.push(`${lang}: unexpected key ${p}.${k} (not in ${base})`); });
    } else if (ta === 'array') {
      const objects = a.some((x) => typeOf(x) === 'object');
      if (!objects) { b.forEach((x, i) => { if (isEmpty(x)) errors.push(`${lang}: empty value at ${p}[${i}]`); }); return; }
      if (a.length !== b.length) errors.push(`${lang}: ${p} has ${b.length} items, ${base} has ${a.length}`);
      a.forEach((item, i) => {
        const match = item && item.slug ? b.find((x) => x && x.slug === item.slug) : b[i];
        const label = `${p}[${(item && item.slug) || i}]`;
        if (!match) { errors.push(`${lang}: missing ${label}`); return; }
        walk(item, match, label, lang);
      });
    }
  };
  langs.slice(1).forEach((lang) => {
    if (!contents[lang]) { errors.push(`${lang}: content module missing`); return; }
    walk(contents[base], contents[lang], lang, lang);
  });
  return errors;
}

module.exports = { validateContent };
