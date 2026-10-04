'use strict';
// One renderer per page type. Each returns { meta, body, schema, preload, bodyClass }.
const c = require('./components');
const s = require('./schema');
const { esc, paragraphs } = require('./util');

function bySlug(arr, slugs) { return slugs.map((x) => arr.find((i) => i.slug === x)).filter(Boolean); }

const render = {
  home(ctx) {
    const { content } = ctx;
    const h = content.home;
    const body = [
      c.hero(ctx, h.hero),
      c.trustStrip(ctx, h.trust),
      c.serviceCards(ctx, content.services, { title: h.services.title, lead: h.services.lead }),
      c.destinationGrid(ctx, content.destinations, { title: h.destinations.title, lead: h.destinations.lead }),
      c.steps(ctx, h.steps),
      c.whyGrid(ctx, h.why),
      c.reviews(ctx, h.reviews),
      c.faq(ctx, h.faq.items, { title: h.faq.title, lead: h.faq.lead }),
      c.ctaBand(ctx, h.cta),
    ].join('\n');
    return {
      meta: h.meta,
      body,
      preload: ['/assets/img/hero-band.jpg'],
      bodyClass: 'page-home',
      schema: [
        s.localBusiness(ctx),
        s.webSite(ctx),
        s.webPage(ctx, { slug: '', meta: h.meta, hasBreadcrumb: false }),
        s.faqPage(h.faq.items),
      ],
    };
  },

  servicesIndex(ctx) {
    const { content } = ctx;
    const p = content.servicesIndex;
    const crumbs = [{ name: content.strings.labels.breadcrumbHome, slug: '' }, { name: content.strings.nav.services, slug: 'services/' }];
    const body = [
      c.pageIntro(ctx, { h1: p.h1, lead: p.lead, image: 'truck.jpg', imageAlt: p.imageAlt, crumbs }),
      c.serviceCards(ctx, content.services, { showAll: false }),
      c.sections(ctx, p.sections),
      c.faq(ctx, p.faq, { title: content.strings.labels.faq }),
      c.ctaBand(ctx, content.home.cta),
    ].join('\n');
    return {
      meta: p.meta, body, preload: ['/assets/img/truck.jpg'],
      schema: [s.webPage(ctx, { slug: 'services/', meta: p.meta, type: 'CollectionPage' }), s.breadcrumb(ctx, 'services/', crumbs), s.faqPage(p.faq)],
    };
  },

  service(ctx, sv) {
    const { content } = ctx;
    const t = content.strings;
    const slug = `services/${sv.slug}/`;
    const crumbs = [{ name: t.labels.breadcrumbHome, slug: '' }, { name: t.nav.services, slug: 'services/' }, { name: sv.name, slug }];
    const related = bySlug(content.destinations, sv.relatedDestinations);
    const body = [
      c.pageIntro(ctx, { h1: sv.h1, lead: sv.lead, image: sv.image.src, imageAlt: sv.image.alt, crumbs }),
      c.sections(ctx, sv.sections),
      c.relatedLinks(ctx, t.labels.relatedDestinations, related, 'destinations'),
      c.faq(ctx, sv.faq, { title: t.labels.faq }),
      c.ctaBand(ctx, sv.cta || content.home.cta),
    ].join('\n');
    return {
      meta: sv.meta, body, preload: [`/assets/img/${sv.image.src}`],
      schema: [
        s.webPage(ctx, { slug, meta: sv.meta }),
        s.breadcrumb(ctx, slug, crumbs),
        s.service(ctx, { slug, name: sv.name, description: sv.meta.description, serviceType: sv.serviceType }),
        s.faqPage(sv.faq),
      ],
    };
  },

  destinationsIndex(ctx) {
    const { content } = ctx;
    const p = content.destinationsIndex;
    const t = content.strings;
    const crumbs = [{ name: t.labels.breadcrumbHome, slug: '' }, { name: t.nav.destinations, slug: 'destinations/' }];
    const body = [
      c.pageIntro(ctx, { h1: p.h1, lead: p.lead, image: 'world-map.jpg', imageAlt: p.imageAlt, crumbs }),
      c.destinationGrid(ctx, content.destinations, { showAll: false }),
      c.sections(ctx, p.sections),
      c.faq(ctx, p.faq, { title: t.labels.faq }),
      c.ctaBand(ctx, content.home.cta),
    ].join('\n');
    return {
      meta: p.meta, body, preload: ['/assets/img/world-map.jpg'],
      schema: [s.webPage(ctx, { slug: 'destinations/', meta: p.meta, type: 'CollectionPage' }), s.breadcrumb(ctx, 'destinations/', crumbs), s.faqPage(p.faq)],
    };
  },

  destination(ctx, d) {
    const { content } = ctx;
    const t = content.strings;
    const slug = `destinations/${d.slug}/`;
    const crumbs = [{ name: t.labels.breadcrumbHome, slug: '' }, { name: t.nav.destinations, slug: 'destinations/' }, { name: d.linkLabel || d.name, slug }];
    const related = bySlug(content.services, d.relatedServices);
    const modes = `<section class="section section--tight"><div class="container"><ul class="modes">${d.modes.map((m) => `<li>${c.icon(m === 'air' ? 'plane' : m === 'sea' ? 'ship' : 'truck')}<span>${esc(t.labels[m + 'Long'])}</span></li>`).join('')}</ul></div></section>`;
    const body = [
      c.pageIntro(ctx, { h1: d.h1, lead: d.lead, image: d.image || 'plane.jpg', imageAlt: d.imageAlt || d.name, crumbs }),
      modes,
      c.sections(ctx, d.sections),
      c.relatedLinks(ctx, t.labels.relatedServices, related, 'services'),
      c.faq(ctx, d.faq, { title: t.labels.faq }),
      c.ctaBand(ctx, d.cta || content.home.cta),
    ].join('\n');
    const area = d.schemaType === 'Place' ? [{ '@type': 'Place', name: d.schemaName }] : [{ '@type': 'Country', name: d.schemaName }];
    return {
      meta: d.meta, body, preload: [`/assets/img/${d.image || 'plane.jpg'}`],
      schema: [
        s.webPage(ctx, { slug, meta: d.meta }),
        s.breadcrumb(ctx, slug, crumbs),
        s.service(ctx, { slug, name: d.h1, description: d.meta.description, serviceType: d.serviceType, areaServed: area }),
        s.faqPage(d.faq),
      ],
    };
  },

  about(ctx) {
    const { content } = ctx;
    const p = content.about;
    const t = content.strings;
    const crumbs = [{ name: t.labels.breadcrumbHome, slug: '' }, { name: t.nav.about, slug: 'about/' }];
    const flyer = `<section class="section section--soft"><div class="container about__flyer"><figure>${c.imgTag(ctx, 'flyer.jpg', p.imageAlt, { class: 'about__flyer-img', srcset: '/assets/img/flyer-480.jpg 480w, /assets/img/flyer.jpg 1024w', sizes: '(max-width: 700px) 92vw, 420px' })}<figcaption>${esc(p.imageCaption)}</figcaption></figure><div class="about__facts"><h2>${esc(p.factsTitle)}</h2><dl>${p.facts.map((f) => `<div><dt>${esc(f.label)}</dt><dd>${f.value}</dd></div>`).join('')}</dl>${c.ctaButtons(ctx)}</div></div></section>`;
    const body = [
      c.pageIntro(ctx, { h1: p.h1, lead: p.lead, image: 'boxes.jpg', imageAlt: p.heroAlt, crumbs }),
      c.sections(ctx, p.sections),
      flyer,
      c.serviceCards(ctx, content.services, { title: content.home.services.title, lead: content.home.services.lead }),
      c.ctaBand(ctx, content.home.cta),
    ].join('\n');
    return {
      meta: p.meta, body, preload: ['/assets/img/boxes.jpg'],
      schema: [s.webPage(ctx, { slug: 'about/', meta: p.meta, type: 'AboutPage' }), s.breadcrumb(ctx, 'about/', crumbs)],
    };
  },

  contact(ctx) {
    const { content } = ctx;
    const p = content.contact;
    const t = content.strings;
    const crumbs = [{ name: t.labels.breadcrumbHome, slug: '' }, { name: t.nav.contact, slug: 'contact/' }];
    const body = [
      c.breadcrumbs(ctx, crumbs),
      `<section class="section"><div class="container"><div class="section__head"><h1>${p.h1}</h1><p class="section__lead">${p.lead}</p></div><div class="contact-grid">${c.contactCard(ctx, p)}${c.mapEmbed(ctx, p.mapTitle)}</div></div></section>`,
      c.sections(ctx, p.sections),
      c.faq(ctx, p.faq, { title: t.labels.faq }),
    ].join('\n');
    return {
      meta: p.meta, body,
      schema: [s.webPage(ctx, { slug: 'contact/', meta: p.meta, type: 'ContactPage' }), s.breadcrumb(ctx, 'contact/', crumbs), s.localBusiness(ctx), s.faqPage(p.faq)],
    };
  },

  quote(ctx) {
    const { content } = ctx;
    const p = content.quote;
    const t = content.strings;
    const crumbs = [{ name: t.labels.breadcrumbHome, slug: '' }, { name: t.cta.quote, slug: 'quote/' }];
    const body = [
      c.breadcrumbs(ctx, crumbs),
      `<section class="section"><div class="container quote-grid"><div><h1>${p.h1}</h1><p class="lead">${p.lead}</p>${paragraphs(p.paragraphs)}<ul class="checklist">${p.points.map((x) => `<li>${x}</li>`).join('')}</ul></div>${c.quoteForm(ctx, p.form)}</div></section>`,
      c.faq(ctx, p.faq, { title: t.labels.faq, cls: 'section--soft' }),
    ].join('\n');
    return {
      meta: p.meta, body,
      schema: [s.webPage(ctx, { slug: 'quote/', meta: p.meta }), s.breadcrumb(ctx, 'quote/', crumbs), s.faqPage(p.faq)],
    };
  },

  faq(ctx) {
    const { content } = ctx;
    const p = content.faqPage;
    const t = content.strings;
    const crumbs = [{ name: t.labels.breadcrumbHome, slug: '' }, { name: t.nav.faq, slug: 'faq/' }];
    const all = p.groups.flatMap((g) => g.items);
    const body = [
      c.breadcrumbs(ctx, crumbs),
      `<section class="section"><div class="container container--narrow"><div class="section__head"><h1>${p.h1}</h1><p class="section__lead">${p.lead}</p></div></div></section>`,
      ...p.groups.map((g) => c.faq(ctx, g.items, { title: g.title, cls: 'section--tight' })),
      c.ctaBand(ctx, content.home.cta),
    ].join('\n');
    return {
      meta: p.meta, body,
      // The page node stays a WebPage; the single FAQPage node below carries mainEntity (two FAQPage nodes trip Rich Results).
      schema: [s.webPage(ctx, { slug: 'faq/', meta: p.meta, type: 'WebPage' }), s.breadcrumb(ctx, 'faq/', crumbs), s.faqPage(all)],
    };
  },

  legal(ctx, p, slug) {
    const { content } = ctx;
    const t = content.strings;
    const crumbs = [{ name: t.labels.breadcrumbHome, slug: '' }, { name: p.h1, slug }];
    const body = [
      c.breadcrumbs(ctx, crumbs),
      `<section class="section"><div class="container container--narrow prose"><h1>${p.h1}</h1><p class="meta-line">${esc(t.labels.lastUpdated)}: ${esc(p.updated)}</p>${p.sections.map((x) => `<h2>${x.h2}</h2>${paragraphs(x.paragraphs)}`).join('')}</div></section>`,
    ].join('\n');
    return { meta: p.meta, body, schema: [s.webPage(ctx, { slug, meta: p.meta }), s.breadcrumb(ctx, slug, crumbs)] };
  },
  privacy(ctx) { return render.legal(ctx, ctx.content.privacy, 'privacy-policy/'); },
  terms(ctx) { return render.legal(ctx, ctx.content.terms, 'terms/'); },

  notFound(ctx) {
    const { content } = ctx;
    const p = content.notFound;
    const t = content.strings;
    const body = `<section class="section"><div class="container container--narrow not-found"><p class="eyebrow">404</p><h1>${p.h1}</h1><p class="lead">${p.text}</p><div class="actions"><a class="btn btn--primary" href="${ctx.url('')}">${esc(t.nav.home)}</a><a class="btn btn--outline" href="${ctx.url('services/')}">${esc(t.nav.services)}</a><a class="btn btn--outline" href="${ctx.url('destinations/')}">${esc(t.nav.destinations)}</a></div>${c.ctaButtons(ctx, { quote: false })}</div></section>`;
    return { meta: { ...p.meta, noindex: true }, body, schema: [] };
  },
};

module.exports = { render: (type, ctx, data) => render[type](ctx, data) };
