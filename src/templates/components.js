'use strict';
// Reusable HTML blocks. Every function returns a string. `ctx` is created in build.js.
const { esc, attrs, paragraphs, list } = require('./util');

const ICONS = {
  plane: '<path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>',
  ship: '<path d="M4 16.5 2.6 11H21.4L20 16.5H4zM6 10V6h4.5V4h3v2H18v4H6zM2 18c1 .7 2 1 3 1s2-.3 3-1c1 .7 2 1 3 1s2-.3 3-1c1 .7 2 1 3 1s2-.3 3-1h2v2.2c-1 .6-2 .8-3 .8s-2-.3-3-1c-1 .7-2 1-3 1s-2-.3-3-1c-1 .7-2 1-3 1s-2-.3-3-1c-1 .7-2 1-3 1V18h2z"/>',
  truck: '<path d="M2 5h12v9h1.5l2.5-3.5H21v6h-1.3a2.5 2.5 0 1 1-4.9 0H9.2a2.5 2.5 0 1 1-4.9 0H2V5zm15 7.5-1.6 2H20v-2h-3zM6.8 18.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm10.5 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>',
  document: '<path d="M6 2h8l5 5v15H6V2zm7 1.5V8h4.5L13 3.5zM8 11h8v1.6H8V11zm0 3.2h8v1.6H8v-1.6zm0 3.2h5V19H8v-1.6z"/>',
  box: '<path d="M12 2l9 4.5v11L12 22l-9-4.5v-11L12 2zm0 2.2L5.4 7.5 12 10.8l6.6-3.3L12 4.2zM5 9.2v7.1l6 3v-7.1l-6-3zm14 0-6 3v7.1l6-3V9.2z"/>',
  door: '<path d="M12 3l9 8h-2.5v9h-5v-6h-3v6h-5v-9H3l9-8zm0 2.6L7.5 9.6V18h1v-6h7v6h1V9.6L12 5.6z"/>',
  whatsapp: '<path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-1 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.3c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.3 8.3 0 1 1 12 20.3z"/>',
  phone: '<path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/>',
  pin: '<path d="M12 2a7 7 0 0 0-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>',
  clock: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm.8-13H11v6.2l5.2 3.1.9-1.4-4.3-2.6V7z"/>',
  check: '<path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/>',
  arrow: '<path d="M12 4l-1.4 1.4L16.2 11H4v2h12.2l-5.6 5.6L12 20l8-8z"/>',
  globe: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 9h-2.9a15.6 15.6 0 0 0-1.4-6A8 8 0 0 1 18.9 11zM12 4c1 1.3 1.8 3.7 2 7h-4c.2-3.3 1-5.7 2-7zM4.3 13h2.9c.1 2.2.6 4.2 1.4 6A8 8 0 0 1 4.3 13zm2.9-2H4.3a8 8 0 0 1 4.3-6c-.8 1.8-1.3 3.8-1.4 6zM12 20c-1-1.3-1.8-3.7-2-7h4c-.2 3.3-1 5.7-2 7zm2.6-1c.8-1.8 1.3-3.8 1.4-6h2.9a8 8 0 0 1-4.3 6z"/>',
  shield: '<path d="M12 2l8 3v6c0 5-3.4 9.3-8 11-4.6-1.7-8-6-8-11V5l8-3zm-1 13 6-6-1.4-1.4L11 12.2 8.4 9.6 7 11l4 4z"/>',
  bolt: '<path d="M13 2 4 14h6l-1 8 9-12h-6z"/>',
  chat: '<path d="M4 4h16v12H7l-3 3V4zm2 2v9.2L6.2 14H18V6H6z"/>',
  star: '<path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
  tag: '<path d="M2 12V2h10l10 10-10 10L2 12zm5-6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>',
  menu: '<path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z"/>',
  close: '<path d="M6.4 5 5 6.4l5.6 5.6L5 17.6 6.4 19l5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6L19 6.4 17.6 5 12 10.6z"/>',
  google: '<path d="M21.6 12.2c0-.7-.1-1.3-.2-1.9H12v3.7h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z"/><path d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z"/><path d="M6.4 13.9A6 6 0 0 1 6.1 12c0-.7.1-1.3.3-1.9V7.5H3.1a10 10 0 0 0 0 9l3.3-2.6z"/><path d="M12 6c1.5 0 2.8.5 3.8 1.5l2.8-2.8A10 10 0 0 0 3.1 7.5l3.3 2.6C7.2 7.8 9.4 6 12 6z"/>',
  scale: '<path d="M12 2a1.5 1.5 0 0 1 1.5 1.5V5h5.7l3.3 7a4 4 0 0 1-8 0l2.8-6H13v12h5v2H6v-2h5V6H6.7l2.8 6a4 4 0 0 1-8 0L4.8 5h5.7V3.5A1.5 1.5 0 0 1 12 2zM4.2 12h3.6L6 8.2 4.2 12zm12 0h3.6L18 8.2 16.2 12z"/>',
};

// Verbatim quotes keep their own language; Latin-script text gets lang="en" so RTL pages render it correctly.
const isLatin = (s) => /[A-Za-z]/.test(s) && !/[؀-ۿ]/.test(s);

function icon(name, cls = 'icon') {
  return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[name] || ICONS.box}</svg>`;
}

// <img> with real dimensions from the build's image index.
function imgTag(ctx, src, alt, opts = {}) {
  const d = ctx.dims(src);
  const w = opts.width || d.width;
  const h = opts.height || Math.round(d.height * (w / d.width));
  const a = {
    src: `/assets/img/${src}`,
    alt: alt || '',
    width: w,
    height: h,
    loading: opts.loading || 'lazy',
    decoding: 'async',
    class: opts.class,
    srcset: opts.srcset,
    sizes: opts.sizes,
    fetchpriority: opts.fetchpriority,
  };
  return `<img ${attrs(a)}>`;
}

function formatTime(ctx, hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const t = ctx.content.strings;
  const suffix = h >= 12 ? t.pm : t.am;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
}

function hoursRows(ctx) {
  const t = ctx.content.strings;
  return ctx.cfg.hours.map((h) => {
    const days = h.days.length > 1 ? `${t.days[h.days[0]]} – ${t.days[h.days[h.days.length - 1]]}` : t.days[h.days[0]];
    return `<tr><th scope="row">${esc(days)}</th><td><span dir="ltr">${esc(formatTime(ctx, h.opens))} – ${esc(formatTime(ctx, h.closes))}</span></td></tr>`;
  }).join('');
}

function ctaButtons(ctx, { quote = true, cls = '' } = {}) {
  const t = ctx.content.strings;
  const wa = `https://wa.me/${ctx.cfg.contact.whatsapp}`;
  return `<div class="actions ${cls}">
    <a class="btn btn--whatsapp" href="${wa}" rel="noopener">${icon('whatsapp')}<span>${esc(t.cta.whatsapp)}</span></a>
    <a class="btn btn--outline" href="tel:${ctx.cfg.contact.phone}">${icon('phone')}<span>${esc(t.cta.call)}</span></a>
    ${quote ? `<a class="btn btn--link" href="${ctx.url('quote/')}">${esc(t.cta.quote)} ${icon('arrow', 'icon icon--arrow')}</a>` : ''}
  </div>`;
}

function hero(ctx, h) {
  return `<section class="hero">
  <div class="container hero__grid">
    <div class="hero__copy">
      <p class="eyebrow">${esc(h.eyebrow)}</p>
      <h1>${h.h1}</h1>
      <p class="lead">${h.lead}</p>
      ${ctaButtons(ctx)}
      <ul class="hero__tags">${h.tags.map((x) => `<li>${icon('check')}${esc(x)}</li>`).join('')}</ul>
    </div>
    <div class="hero__media">
      ${imgTag(ctx, 'hero-band.jpg', h.imageAlt, { loading: 'eager', fetchpriority: 'high', class: 'hero__img' })}
      <div class="hero__badge">${icon('globe')}<span>${esc(h.badge)}</span></div>
    </div>
  </div>
</section>`;
}

function trustStrip(ctx, items) {
  return `<section class="trust" aria-label="${esc(ctx.content.strings.labels.trust)}">
  <div class="container trust__grid">
    ${items.map((i) => `<div class="trust__item">${icon(i.icon || 'check')}<div><strong>${esc(i.value)}</strong><span>${esc(i.label)}</span></div></div>`).join('')}
  </div>
</section>`;
}

function sectionHead(title, lead, tag = 'h2') {
  return `<div class="section__head"><${tag}>${title}</${tag}>${lead ? `<p class="section__lead">${lead}</p>` : ''}</div>`;
}

function serviceCards(ctx, services, { title, lead, tag = 'h2', showAll = true } = {}) {
  const t = ctx.content.strings;
  return `<section class="section">
  <div class="container">
    ${title ? sectionHead(title, lead, tag) : ''}
    <div class="cards cards--services">
      ${services.map((s) => `<a class="card card--service reveal" href="${ctx.url(`services/${s.slug}/`)}">
        <span class="card__icon">${icon(s.icon)}</span>
        <span class="card__title">${esc(s.name)}</span>
        <span class="card__text">${esc(s.short)}</span>
        <span class="card__more">${esc(t.cta.learnMore)} ${icon('arrow', 'icon icon--arrow')}</span>
      </a>`).join('')}
    </div>
    ${showAll ? `<p class="section__foot"><a class="btn btn--outline" href="${ctx.url('services/')}">${esc(t.cta.allServices)}</a></p>` : ''}
  </div>
</section>`;
}

function destinationGrid(ctx, destinations, { title, lead, tag = 'h2', showAll = true, cls = '' } = {}) {
  const t = ctx.content.strings;
  return `<section class="section section--soft ${cls}">
  <div class="container">
    ${title ? sectionHead(title, lead, tag) : ''}
    <div class="cards cards--destinations">
      ${destinations.map((d) => `<a class="card card--destination reveal" href="${ctx.url(`destinations/${d.slug}/`)}">
        <span class="badge badge--code" aria-hidden="true">${esc(d.code)}</span>
        <span class="card__title">${esc(d.cardTitle || d.name)}</span>
        <span class="card__text">${esc(d.cities.join(' · '))}</span>
        <span class="chips">${d.modes.map((m) => `<span class="chip">${icon(m === 'air' ? 'plane' : m === 'sea' ? 'ship' : 'truck')}${esc(t.labels[m])}</span>`).join('')}</span>
      </a>`).join('')}
    </div>
    ${showAll ? `<p class="section__foot"><a class="btn btn--outline" href="${ctx.url('destinations/')}">${esc(t.cta.allDestinations)}</a></p>` : ''}
  </div>
</section>`;
}

function steps(ctx, data) {
  return `<section class="section">
  <div class="container">
    ${sectionHead(data.title, data.lead)}
    <ol class="steps">
      ${data.items.map((s, i) => `<li class="steps__item reveal"><span class="steps__num">${i + 1}</span><h3>${esc(s.title)}</h3><p>${s.text}</p></li>`).join('')}
    </ol>
  </div>
</section>`;
}

function whyGrid(ctx, data) {
  return `<section class="section section--navy">
  <div class="container">
    ${sectionHead(data.title, data.lead)}
    <div class="why">
      ${data.items.map((w) => `<div class="why__item reveal">${icon(w.icon || 'check')}<h3>${esc(w.title)}</h3><p>${w.text}</p></div>`).join('')}
    </div>
  </div>
</section>`;
}

function reviews(ctx, data) {
  const t = ctx.content.strings;
  return `<section class="section">
  <div class="container">
    ${sectionHead(data.title, data.lead)}
    <div class="reviews">
      ${data.items.map((r) => `<blockquote class="review reveal">
        <p dir="auto"${isLatin(r.text) ? ' lang="en"' : ''}>“${esc(r.text)}”</p>
        <footer><span class="review__author">${esc(r.author)}</span>${r.route ? `<span class="review__route">${esc(r.route)}</span>` : ''}<span class="review__source">${icon('google')}${esc(t.labels.googleReview)}</span></footer>
      </blockquote>`).join('')}
    </div>
    <p class="section__foot section__foot--split">
      <a class="btn btn--outline" href="${ctx.cfg.google.reviewsUrl}" rel="noopener" target="_blank">${esc(t.cta.readReviews)}</a>
      <a class="btn btn--link" href="${ctx.cfg.google.reviewUrl}" rel="noopener" target="_blank">${esc(t.cta.writeReview)} ${icon('arrow', 'icon icon--arrow')}</a>
    </p>
  </div>
</section>`;
}

function faq(ctx, items, { title, lead, tag = 'h2', cls = '' } = {}) {
  if (!items || !items.length) return '';
  return `<section class="section ${cls}">
  <div class="container container--narrow">
    ${title ? sectionHead(title, lead, tag) : ''}
    <div class="faq">
      ${items.map((f) => `<details class="faq__item"><summary>${esc(f.q)}</summary><div class="faq__a">${f.a.startsWith('<') ? f.a : `<p>${f.a}</p>`}</div></details>`).join('')}
    </div>
  </div>
</section>`;
}

function ctaBand(ctx, data) {
  return `<section class="cta-band">
  <div class="container cta-band__inner">
    <div><h2>${data.title}</h2><p>${data.text}</p></div>
    ${ctaButtons(ctx, { cls: 'actions--light' })}
  </div>
</section>`;
}

function breadcrumbs(ctx, items) {
  const t = ctx.content.strings;
  return `<nav class="breadcrumbs" aria-label="${esc(t.labels.breadcrumb)}">
  <div class="container"><ol>
    ${items.map((it, i) => (i === items.length - 1
      ? `<li aria-current="page">${esc(it.name)}</li>`
      : `<li><a href="${ctx.url(it.slug)}">${esc(it.name)}</a></li>`)).join('')}
  </ol></div>
</nav>`;
}

// Page header used by inner pages.
function pageIntro(ctx, { h1, lead, image, imageAlt, crumbs }) {
  return `${breadcrumbs(ctx, crumbs)}
<section class="page-intro">
  <div class="container page-intro__grid">
    <div class="page-intro__copy">
      <h1>${h1}</h1>
      <p class="lead">${lead}</p>
      ${ctaButtons(ctx)}
    </div>
    ${image ? `<div class="page-intro__media">${imgTag(ctx, image, imageAlt, { loading: 'eager', fetchpriority: 'high', class: 'page-intro__img' })}</div>` : ''}
  </div>
</section>`;
}

// sections: [{ h2, paragraphs:[], list:[], h3? }]
function sections(ctx, items, { cls = '' } = {}) {
  return `<section class="section section--prose ${cls}">
  <div class="container container--narrow prose">
    ${items.map((s) => `${s.h2 ? `<h2>${s.h2}</h2>` : ''}${s.h3 ? `<h3>${s.h3}</h3>` : ''}${paragraphs(s.paragraphs)}${list(s.list, 'checklist')}`).join('\n')}
  </div>
</section>`;
}

function relatedLinks(ctx, title, items, base) {
  if (!items || !items.length) return '';
  return `<section class="section section--soft">
  <div class="container">
    ${sectionHead(title)}
    <div class="related">
      ${items.map((it) => `<a class="related__item" href="${ctx.url(`${base}/${it.slug}/`)}">${it.icon ? icon(it.icon) : `<span class="badge badge--code" aria-hidden="true">${esc(it.code)}</span>`}<span><strong>${esc(it.linkLabel || it.name)}</strong><small>${esc(it.short || it.cities.join(' · '))}</small></span>${icon('arrow', 'icon icon--arrow')}</a>`).join('')}
    </div>
  </div>
</section>`;
}

function contactCard(ctx, c) {
  const { cfg, lang } = ctx;
  const t = ctx.content.strings;
  const a = cfg.address;
  const wa = `https://wa.me/${cfg.contact.whatsapp}`;
  return `<div class="contact-card">
    <h2>${esc(t.labels.contactDetails)}</h2>
    <dl class="contact-list">
      <div><dt>${icon('pin')}${esc(t.labels.address)}</dt><dd>${a.street ? esc(a.street) + '<br>' : ''}${esc(a.district[lang])}, ${esc(a.city[lang])} ${esc(a.postalCode)}<br>${esc(a.country[lang])}<br><small>${esc(t.labels.plusCode)}: ${esc(a.plusCode)} ${esc(a.city[lang])}</small></dd></div>
      <div><dt>${icon('phone')}${esc(t.labels.phone)}</dt><dd><a href="tel:${cfg.contact.phone}" dir="ltr">${esc(cfg.contact.phoneDisplay)}</a><br><a href="tel:${cfg.contact.phone2}" dir="ltr">${esc(cfg.contact.phone2Display)}</a></dd></div>
      <div><dt>${icon('whatsapp')}${esc(t.labels.whatsapp)}</dt><dd><a href="${wa}" rel="noopener" dir="ltr">${esc(cfg.contact.phoneDisplay)}</a></dd></div>
      <div><dt>${icon('clock')}${esc(t.labels.hours)}</dt><dd><table class="hours"><tbody>${hoursRows(ctx)}</tbody></table></dd></div>
    </dl>
    <div class="actions">
      <a class="btn btn--whatsapp" href="${wa}" rel="noopener">${icon('whatsapp')}<span>${esc(t.cta.whatsapp)}</span></a>
      <a class="btn btn--outline" href="${cfg.google.mapsUrl}" rel="noopener" target="_blank">${icon('pin')}<span>${esc(t.cta.directions)}</span></a>
    </div>
    <p class="contact-card__note">${c.directionsText}</p>
  </div>`;
}

function mapEmbed(ctx, title) {
  const { cfg } = ctx;
  const t = ctx.content.strings;
  const hl = ctx.lang === 'ar' ? 'ar' : 'en';
  return `<div class="map">
    <iframe src="${cfg.google.embedUrl}&hl=${hl}" width="600" height="420" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="${esc(title)}" allowfullscreen></iframe>
    <a class="map__link" href="${cfg.google.mapsUrl}" rel="noopener" target="_blank">${icon('pin')}${esc(t.cta.viewOnMaps)}</a>
  </div>`;
}

function quoteForm(ctx, f) {
  const { cfg } = ctx;
  const t = ctx.content.strings;
  const wa = `https://wa.me/${cfg.contact.whatsapp}`;
  const dests = ctx.content.destinations.map((d) => `<option value="${esc(d.linkLabel || d.name)}">${esc(d.linkLabel || d.name)}</option>`).join('');
  return `<form class="quote-form" id="quote-form" data-wa="${cfg.contact.whatsapp}" data-intro="${esc(f.waIntro)}" novalidate>
    <div class="field"><label for="q-name">${esc(f.name)}</label><input id="q-name" name="name" type="text" required autocomplete="name" data-label="${esc(f.name)}" data-error="${esc(f.errors.name)}"></div>
    <div class="field"><label for="q-phone">${esc(f.phone)}</label><input id="q-phone" name="phone" type="tel" required autocomplete="tel" inputmode="tel" dir="ltr" placeholder="05xxxxxxxx" data-label="${esc(f.phone)}" data-error="${esc(f.errors.phone)}"></div>
    <div class="field"><label for="q-dest">${esc(f.destination)}</label><select id="q-dest" name="destination" data-label="${esc(f.destination)}"><option value="">${esc(f.choose)}</option>${dests}</select></div>
    <div class="field"><label for="q-type">${esc(f.type)}</label><select id="q-type" name="type" data-label="${esc(f.type)}">${f.types.map((x) => `<option value="${esc(x)}">${esc(x)}</option>`).join('')}</select></div>
    <div class="field"><label for="q-weight">${esc(f.weight)}</label><input id="q-weight" name="weight" type="text" inputmode="decimal" dir="ltr" placeholder="${esc(f.weightPlaceholder)}" data-label="${esc(f.weight)}"></div>
    <div class="field field--full"><label for="q-notes">${esc(f.notes)}</label><textarea id="q-notes" name="notes" rows="4" data-label="${esc(f.notes)}"></textarea></div>
    <p class="form-msg" id="quote-msg" aria-live="polite"></p>
    <div class="field field--full actions">
      <button class="btn btn--whatsapp" type="submit">${icon('whatsapp')}<span>${esc(f.submit)}</span></button>
      <a class="btn btn--outline" href="tel:${cfg.contact.phone}">${icon('phone')}<span>${esc(t.cta.call)}</span></a>
    </div>
    <p class="form-help">${f.help} <a href="${wa}" rel="noopener">${esc(f.helpLink)}</a>.</p>
  </form>`;
}

module.exports = {
  icon, imgTag, hoursRows, ctaButtons, hero, trustStrip, sectionHead, serviceCards, destinationGrid, steps, whyGrid,
  reviews, faq, ctaBand, breadcrumbs, pageIntro, sections, relatedLinks, contactCard, mapEmbed, quoteForm,
};
