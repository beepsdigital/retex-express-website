'use strict';
// JSON-LD builders. Every function returns a plain object; layout() serialises them.
const { stripTags } = require('./util');

const SCHEMA = 'https://schema.org';

function businessId(cfg) { return `${cfg.siteUrl}/#business`; }
function websiteId(cfg) { return `${cfg.siteUrl}/#website`; }

function areaServed(content) {
  return content.destinations.map((d) => (d.schemaType === 'Place'
    ? { '@type': 'Place', name: d.schemaName }
    : { '@type': 'Country', name: d.schemaName }));
}

function localBusiness(ctx) {
  const { cfg, content, lang } = ctx;
  const a = cfg.address;
  const sameAs = [cfg.google.mapsUrl, ...Object.values(cfg.social).filter(Boolean)];
  return {
    '@context': SCHEMA,
    '@type': 'LocalBusiness',
    '@id': businessId(cfg),
    name: cfg.brand.name,
    alternateName: cfg.brand.legalName,
    legalName: cfg.brand.legalName,
    description: content.schemaDescription,
    url: ctx.abs(''),
    logo: `${cfg.siteUrl}/assets/img/logo.png`,
    image: [`${cfg.siteUrl}/assets/img/og-image.jpg`],
    telephone: cfg.contact.phone,
    contactPoint: [{
      '@type': 'ContactPoint',
      telephone: cfg.contact.phone,
      contactType: 'customer service',
      availableLanguage: ['en', 'ar'],
      areaServed: 'SA',
    }],
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street || `${a.district[lang]} (${a.plusCode})`,
      addressLocality: a.city[lang],
      addressRegion: a.region[lang],
      postalCode: a.postalCode,
      addressCountry: a.countryCode,
    },
    geo: { '@type': 'GeoCoordinates', latitude: a.geo.lat, longitude: a.geo.lng },
    hasMap: cfg.google.mapsUrl,
    sameAs,
    openingHoursSpecification: cfg.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes,
    })),
    areaServed: areaServed(content),
    knowsLanguage: ['en', 'ar'],
    foundingDate: cfg.brand.foundingDate,
    currenciesAccepted: 'SAR',
    makesOffer: content.services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.name, url: ctx.abs(`services/${s.slug}/`) },
    })),
  };
}

function webSite(ctx) {
  const { cfg, content } = ctx;
  return {
    '@context': SCHEMA,
    '@type': 'WebSite',
    '@id': websiteId(cfg),
    url: ctx.abs(''),
    name: cfg.brand.name,
    inLanguage: content.lang,
    publisher: { '@id': businessId(cfg) },
  };
}

function webPage(ctx, { slug, meta, type = 'WebPage', hasBreadcrumb = true, image }) {
  const { cfg, content } = ctx;
  const url = ctx.abs(slug);
  const page = {
    '@context': SCHEMA,
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name: stripTags(meta.title),
    description: stripTags(meta.description),
    inLanguage: content.lang,
    isPartOf: { '@id': websiteId(cfg) },
    about: { '@id': businessId(cfg) },
    primaryImageOfPage: { '@type': 'ImageObject', url: cfg.siteUrl + (image || '/assets/img/og-image.jpg') },
  };
  if (hasBreadcrumb) page.breadcrumb = { '@id': `${url}#breadcrumb` };
  return page;
}

// items: [{ name, slug }] in order, starting with Home.
function breadcrumb(ctx, slug, items) {
  return {
    '@context': SCHEMA,
    '@type': 'BreadcrumbList',
    '@id': `${ctx.abs(slug)}#breadcrumb`,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem', position: i + 1, name: stripTags(it.name), item: ctx.abs(it.slug),
    })),
  };
}

function service(ctx, { slug, name, description, serviceType, areaServed: area }) {
  const { cfg, content } = ctx;
  return {
    '@context': SCHEMA,
    '@type': 'Service',
    '@id': `${ctx.abs(slug)}#service`,
    name: stripTags(name),
    description: stripTags(description),
    serviceType: serviceType || stripTags(name),
    url: ctx.abs(slug),
    provider: { '@id': businessId(cfg) },
    areaServed: area || areaServed(content),
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: ctx.abs('quote/'),
      servicePhone: { '@type': 'ContactPoint', telephone: cfg.contact.phone, contactType: 'customer service' },
    },
  };
}

function faqPage(items) {
  return {
    '@context': SCHEMA,
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question', name: stripTags(q), acceptedAnswer: { '@type': 'Answer', text: stripTags(a) },
    })),
  };
}

module.exports = { localBusiness, webSite, webPage, breadcrumb, service, faqPage, businessId };
