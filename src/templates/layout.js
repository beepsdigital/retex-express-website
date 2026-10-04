'use strict';
// Page shell: <head> with every SEO tag, header, footer, scripts.
const { esc, attrs, altLang, absUrl, jsonLd } = require('./util');
const { icon, hoursRows, imgTag } = require('./components');

function layout(ctx, { slug, meta, body, schema = [], preload = [], bodyClass = '' }) {
  const { cfg, content, lang, buildId } = ctx;
  const t = content.strings;
  const alt = altLang(cfg, lang);
  const url = absUrl(cfg, lang, slug);
  const altUrl = absUrl(cfg, alt, slug);
  const enUrl = absUrl(cfg, 'en', slug);
  const arUrl = absUrl(cfg, 'ar', slug);
  const ogImage = cfg.siteUrl + (meta.image || '/assets/img/og-image.jpg');
  const noindex = !!meta.noindex;
  const wa = `https://wa.me/${cfg.contact.whatsapp}`;
  const tel = `tel:${cfg.contact.phone}`;
  // aria-current="page" only for the exact page; "true" marks the section a sub-page belongs to.
  const current = (s) => (slug === s ? ' aria-current="page"' : (s !== '' && slug.startsWith(s)) ? ' aria-current="true"' : '');

  const navItems = [
    ['', t.nav.home], ['services/', t.nav.services], ['destinations/', t.nav.destinations],
    ['about/', t.nav.about], ['faq/', t.nav.faq], ['contact/', t.nav.contact],
  ];

  const head = `<!DOCTYPE html>
<html lang="${content.lang}" dir="${content.dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>document.documentElement.classList.add('js')</script>
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.description)}">
<meta name="robots" content="${noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}">
${noindex ? '' : `<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="en" href="${enUrl}">
<link rel="alternate" hreflang="ar" href="${arUrl}">
<link rel="alternate" hreflang="x-default" href="${enUrl}">`}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(cfg.brand.name)}">
<meta property="og:locale" content="${content.locale}">
<meta property="og:locale:alternate" content="${lang === 'en' ? 'ar_SA' : 'en_SA'}">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(meta.title)}">
<meta property="og:description" content="${esc(meta.description)}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(meta.title)}">
<meta name="twitter:description" content="${esc(meta.description)}">
<meta name="twitter:image" content="${ogImage}">
<meta name="theme-color" content="#2A1BE8">
<meta name="geo.region" content="SA-01">
<meta name="geo.placename" content="${esc(cfg.address.city.en)}">
<meta name="geo.position" content="${cfg.address.geo.lat};${cfg.address.geo.lng}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${content.fontHref}">
<link rel="stylesheet" href="/assets/css/main.css?v=${buildId}">
${preload.map((p) => `<link rel="preload" as="image" href="${esc(p)}" fetchpriority="high">`).join('\n')}
${schema.map(jsonLd).join('\n')}
${cfg.analytics.gtagId ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(cfg.analytics.gtagId)}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${esc(cfg.analytics.gtagId)}');</script>` : ''}
</head>`;

  const header = `<a class="skip-link" href="#main">${esc(t.skip)}</a>
<header class="site-header" id="top">
  <div class="container site-header__inner">
    <a class="brand" href="${ctx.url('')}" aria-label="${esc(cfg.brand.name)} – ${esc(t.nav.home)}">
      ${imgTag(ctx, 'logo.png', cfg.brand.name, { width: 160, class: 'brand__logo', loading: 'eager', srcset: '/assets/img/logo.png 480w, /assets/img/logo-2x.png 960w', sizes: '160px' })}
    </a>
    <nav class="site-nav" id="site-nav" aria-label="${esc(t.nav.main)}">
      <ul>
        ${navItems.map(([s, label]) => `<li><a href="${ctx.url(s)}"${current(s)}>${esc(label)}</a></li>`).join('')}
        <li class="site-nav__quote"><a class="btn btn--primary btn--sm" href="${ctx.url('quote/')}">${esc(t.cta.quote)}</a></li>
      </ul>
    </nav>
    <div class="site-header__actions">
      <a class="lang-switch" href="${altUrl}" hreflang="${alt}" lang="${alt}" title="${esc(t.langSwitchTitle)}">${esc(t.langSwitch)}</a>
      <a class="btn btn--whatsapp btn--sm" href="${wa}" rel="noopener">${icon('whatsapp')}<span>${esc(t.cta.whatsapp)}</span></a>
      <button class="nav-toggle" type="button" aria-controls="site-nav" aria-expanded="false" aria-label="${esc(t.menu)}"><span class="nav-toggle__inner">${icon('menu', 'icon icon--menu')}${icon('close', 'icon icon--close')}</span></button>
    </div>
  </div>
</header>`;

  const a = cfg.address;
  const sep = lang === 'ar' ? '، ' : ', ';
  const addressLine = [a.street, a.district[lang], `${a.city[lang]} ${a.postalCode}`, a.country[lang]].filter(Boolean).join(sep);

  const footer = `<footer class="site-footer">
  <div class="container footer__grid">
    <div class="footer__brand">
      ${imgTag(ctx, 'logo-white.png', cfg.brand.name, { width: 180, class: 'footer__logo' })}
      <p>${t.footer.blurb}</p>
      <address class="footer__address">
        <span class="footer__line">${icon('pin')}<span>${esc(addressLine)}<br><small>${esc(t.labels.plusCode)}: ${esc(a.plusCode)} ${esc(a.city[lang])}</small></span></span>
        <a class="footer__line" href="${tel}">${icon('phone')}<span dir="ltr">${esc(cfg.contact.phoneDisplay)}</span></a>
        <a class="footer__line" href="tel:${cfg.contact.phone2}">${icon('phone')}<span dir="ltr">${esc(cfg.contact.phone2Display)}</span></a>
        <a class="footer__line" href="${wa}" rel="noopener">${icon('whatsapp')}<span>${esc(t.cta.whatsapp)}</span></a>
      </address>
    </div>
    <div class="footer__col">
      <p class="footer__title">${esc(t.footer.services)}</p>
      <ul>${content.services.map((s) => `<li><a href="${ctx.url(`services/${s.slug}/`)}">${esc(s.name)}</a></li>`).join('')}</ul>
    </div>
    <div class="footer__col">
      <p class="footer__title">${esc(t.footer.destinations)}</p>
      <ul>${content.destinations.map((d) => `<li><a href="${ctx.url(`destinations/${d.slug}/`)}">${esc(d.linkLabel || d.name)}</a></li>`).join('')}</ul>
    </div>
    <div class="footer__col">
      <p class="footer__title">${esc(t.footer.hours)}</p>
      <table class="hours hours--footer"><tbody>${hoursRows(ctx)}</tbody></table>
      <p class="footer__title">${esc(t.footer.company)}</p>
      <ul>
        <li><a href="${ctx.url('about/')}">${esc(t.nav.about)}</a></li>
        <li><a href="${ctx.url('quote/')}">${esc(t.cta.quote)}</a></li>
        <li><a href="${cfg.google.mapsUrl}" rel="noopener" target="_blank">${esc(t.cta.viewOnMaps)}</a></li>
        <li><a href="${cfg.google.reviewUrl}" rel="noopener" target="_blank">${esc(t.cta.writeReview)}</a></li>
      </ul>
    </div>
  </div>
  <div class="footer__bottom">
    <div class="container footer__bottom-inner">
      <p>&copy; <span data-year>${new Date().getFullYear()}</span> ${esc(cfg.brand.name)}. ${esc(t.footer.rights)}</p>
      <ul class="footer__legal">
        <li><a href="${ctx.url('privacy-policy/')}">${esc(t.nav.privacy)}</a></li>
        <li><a href="${ctx.url('terms/')}">${esc(t.nav.terms)}</a></li>
        <li><a href="${altUrl}" hreflang="${alt}" lang="${alt}">${esc(t.langSwitch)}</a></li>
      </ul>
    </div>
  </div>
</footer>
<div class="mobile-bar" role="navigation" aria-label="${esc(t.quickContact)}">
  <a href="${tel}">${icon('phone')}<span>${esc(t.bar.call)}</span></a>
  <a class="mobile-bar__wa" href="${wa}" rel="noopener">${icon('whatsapp')}<span>${esc(t.bar.whatsapp)}</span></a>
  <a href="${ctx.url('quote/')}">${icon('document')}<span>${esc(t.bar.quote)}</span></a>
  <a href="${cfg.google.mapsUrl}" rel="noopener" target="_blank">${icon('pin')}<span>${esc(t.bar.map)}</span></a>
</div>
<script src="/assets/js/main.js?v=${buildId}" defer></script>
</body>
</html>`;

  return `${head}
<body class="${esc(bodyClass)}">
${header}
<main id="main" tabindex="-1">
${body}
</main>
${footer}
`;
}

module.exports = { layout };
