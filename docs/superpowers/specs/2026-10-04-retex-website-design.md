# RetEx Express Website — Design Spec

Date: 2026-10-04
Status: built under stated assumptions (see §2); awaiting client confirmation of the flagged items.
Research input: `docs/research/gbp-analysis.md`.

## 1. Purpose and success criteria

**Purpose.** Give RetEx Express (courier, cargo and logistics, Al Aziziyah, Riyadh) its first website, built to rank for courier/cargo searches in Riyadh and for "Riyadh to {country}" shipping routes, in Arabic and English, and to turn visitors into WhatsApp conversations.

**Who it is for.** Two audiences: (1) individuals in Riyadh sending parcels and documents to the GCC, Jordan, Syria, Egypt and abroad, who search mostly in Arabic and act on WhatsApp; (2) small businesses and e-commerce sellers shipping commercial cargo and samples (notably to and from China), who search in English and Arabic.

**Success looks like.**
- Every page has a unique, keyword-targeted title and description, correct canonical and hreflang, valid structured data, and loads fast on a mid-range phone (no framework JS, images sized, single small stylesheet).
- Name, address, phone and hours on the site match the Google Business Profile exactly, so Google can tie the site to the listing and away from the namesake company.
- One tap to WhatsApp or call from every page; a quote form that lands in WhatsApp with the details pre-filled.
- The agency can edit copy without touching templates (content lives in two language files), and can deploy `dist/` to any static host or cPanel.

## 2. Assumptions (flagged for confirmation)

| # | Assumption | Why | If wrong |
|---|---|---|---|
| A1 | Brand name is **RetEx Express**; "RETEX Express Shipping" is the Google listing's name | Logo and flyer both say RetEx; GBP adds "Shipping" | Change `brand.name`/`brand.legalName` in `site.config.js` |
| A2 | The domestic "ريتكس / Retex Express" company (app, other Riyadh pins) is a **different business** | Different phones, email, model | Copy about "since 2016 in Aziziyah" stays; add cross-references |
| A3 | Domain placeholder `https://retexexpress.com` | No live domain found | Change `siteUrl` once; rebuild |
| A4 | Destinations with their own page: UAE, Qatar, Bahrain, Kuwait, Oman, Jordan, Syria, Egypt, China, Saudi Arabia (domestic), International (everything else) | Flyer lists the first seven; GBP description adds Egypt, China, KSA, worldwide | Add/remove entries in the destinations array of each content file |
| A5 | No prices or transit-time promises on the site | Not provided; wrong numbers would harm trust | Add to the destination/service entries when the client confirms |
| A6 | WhatsApp number = +966 55 873 6359 (GBP phone and `wa.link` target); second line 053 235 0108 is call-only | From GBP post + flyer | Edit `contact` in `site.config.js` |
| A7 | No tracking system, no payments, no CMS, no blog at launch | Not in scope; nothing exists to integrate | Phase 2 |
| A8 | Street address unknown; site shows district + plus code + map pin | GBP has plus code only | Add `address.street` in config when known |

## 3. Approaches considered

1. **Zero-dependency Node static generator (chosen).** Templates are plain JS template literals; content is JS data per language; `node build.js` writes `dist/`. Pros: nothing to install, builds in under a second, output is plain HTML/CSS that runs on any host, total control over markup for SEO, easy for an agency to edit. Cons: no plugin ecosystem; we write our own (small) link/meta tests.
2. **Astro.** Excellent static output and i18n routing, but adds a toolchain and hundreds of packages for a 26-page brochure site, and the client's hosting is unknown.
3. **WordPress.** Familiar to many clients, but slower, needs hosting with PHP, plugins for SEO/i18n, and ongoing maintenance; overkill for the content volume.

## 4. Site map and URLs

English at the root, Arabic under `/ar/`, identical slugs, trailing slashes, one `index.html` per folder.

```
/                           Home
/services/                  Services index
/services/air-cargo/        Air cargo from Riyadh
/services/sea-cargo/        Sea cargo
/services/road-freight/     Road freight to the GCC and Levant
/services/express-courier/  Express courier for documents and parcels
/services/business-samples/ Business sample shipping (China and B2B)
/services/door-to-door/     Pickup and door-to-door delivery
/destinations/              Destinations index
/destinations/{uae|qatar|bahrain|kuwait|oman|jordan|syria|egypt|china|saudi-arabia|international}/
/about/                     About RetEx (since 2016, Aziziyah, team promise)
/contact/                   NAP, hours, map, WhatsApp, directions
/quote/                     Get a quote (form → WhatsApp)
/faq/                       Frequently asked questions
/privacy-policy/            Privacy policy
/terms/                     Terms of service
/404.html                   Not found (one per language)
```

Arabic mirror: `/ar/`, `/ar/services/air-cargo/`, … `/ar/404.html`.

Supporting files at the root: `sitemap.xml` (all URLs with `xhtml:link` hreflang alternates), `robots.txt`, `llms.txt`, `manifest.webmanifest`, `favicon.svg` + PNG icons, `_headers` (Netlify/Cloudflare Pages), `.htaccess` (Apache/cPanel).

## 5. Architecture

```
site.config.js        brand, siteUrl, NAP, phones, hours, geo, GBP ids, social
build.js              renders all pages for en + ar into dist/, copies assets, writes sitemap/robots/llms
test.js               post-build checks (see §10)
serve.js              tiny local static server for preview (no deps)
src/
  content/en.js       all English copy + page data (same shape as ar.js)
  content/ar.js       all Arabic copy + page data
  templates/
    layout.js         <html> shell: head (meta, hreflang, OG, JSON-LD), header, footer, scripts
    components.js     hero, cards, grids, steps, reviews, faq, cta, breadcrumbs, contact card, quote form
    pages.js          one render function per page type (home, services index, service, destinations index, destination, about, contact, quote, faq, legal, 404)
    schema.js         JSON-LD builders (LocalBusiness/Organization, WebSite, Service, FAQPage, BreadcrumbList, WebPage)
  assets/
    css/main.css      design tokens, layout, components, RTL rules, print
    js/main.js        nav toggle, quote form → WhatsApp, reveal-on-scroll, year
    img/              processed images (see tools/images.ps1)
  static/             robots.txt, llms.txt, _headers, .htaccess, manifest.webmanifest, favicon.svg
tools/
  ImgTools.cs         GDI+ helper compiled at runtime
  images.ps1          generates every image in src/assets/img from source-assets/
source-assets/        original flyer and logo
docs/                 research, spec, plan
dist/                 build output (deployable as-is)
```

**Data flow.** `build.js` loads `site.config.js` and both content modules, then for each language and each page entry calls the page renderer, wraps it in `layout()`, and writes the file. Page metadata (title, description, slug, type) lives with the page content so SEO fields are edited where the copy is. Cross-language alternates are computed from the shared slug.

**Why one content file per language.** The two files export the same object shape (`strings`, `nav`, `home`, `services[]`, `destinations[]`, `about`, `contact`, `quote`, `faq[]`, `legal`). A missing key in one language fails the build loudly rather than rendering an empty section.

## 6. Page templates

- **Home:** hero (headline, sub, WhatsApp + call CTAs, hero image), trust strip (since 2016, Aziziyah Riyadh, Google reviews link, 7-day pickup hours), services grid (6), destinations grid (11), "how it works" (4 steps), why RetEx (6 points), Google reviews (3 verbatim quotes + link), FAQ (5), final CTA.
- **Service:** H1, intro, "what we ship", "how it works", suited-for list, related destinations, FAQ (3–4), CTA. Schema: `Service` + `FAQPage` + `BreadcrumbList`.
- **Destination:** H1 "Shipping from Riyadh to {Country}", modes available (air/road/sea), what people typically send, process, related services, FAQ (3–4), CTA. Schema: `Service` with `areaServed` = Country + FAQ + breadcrumbs.
- **About:** story, what we do, service area, values, flyer image, CTA. Schema: `AboutPage`.
- **Contact:** NAP card, hours table, WhatsApp/call/directions buttons, embedded map (lazy iframe, no API key), review link. Schema: `LocalBusiness` (full) + `ContactPage`.
- **Quote:** form (name, phone, destination, shipment type, weight, notes) → opens WhatsApp with a composed message; no backend. No-JS fallback: WhatsApp and call links beside the form.
- **FAQ:** grouped questions. Schema: `FAQPage`.
- **Legal:** privacy, terms (plain, honest, no fabricated company registration numbers).
- **404:** links to home, services, destinations, WhatsApp.

## 7. SEO rules baked into the templates

- `<title>` 35–65 characters, unique per page and language, brand suffix " | RetEx Express".
- Meta description 80–160 characters, unique, includes the route or service and "Riyadh".
- One `<h1>` per page; headings follow a logical outline.
- Canonical to the absolute URL; `hreflang` for `en`, `ar`, and `x-default` (English) on every page, reciprocal.
- `lang` and `dir` attributes per language; Arabic uses logical CSS properties so layout mirrors correctly.
- Open Graph + Twitter card tags with a 1200×630 image; `og:locale` en_SA / ar_SA.
- JSON-LD: `Organization`/`LocalBusiness` with `@id`, `sameAs` → Google Maps place URL, `hasMap`, `geo`, `openingHoursSpecification`, `areaServed`, `knowsLanguage`, `foundingDate`. Per page type: `WebPage`, `BreadcrumbList`, `Service`, `FAQPage`, `AboutPage`, `ContactPage`, `WebSite` (home only). No `aggregateRating` (Google-sourced reviews must not be self-marked-up).
- Internal links: header nav, footer link blocks (services, destinations), related-links block on every service/destination page, breadcrumbs, in-copy links. Every page is reachable within two clicks of home.
- Images: descriptive `alt`, explicit `width`/`height`, lazy loading below the fold, hero image preloaded with `fetchpriority="high"`.
- `sitemap.xml` with hreflang alternates; `robots.txt` allows all and names the sitemap; `llms.txt` summarises the business for AI crawlers.
- NAP in the footer of every page, identical to the GBP string, with `tel:` and `https://wa.me/` links.

## 8. Design system

- **Colors.** Brand blue `#2A1BE8`, brand pink `#F31A5A` (graphic use), text pink `#D4104A` (meets 4.5:1 on white), navy `#0F1446` for footer/hero backgrounds, ink `#101828`, slate `#475467`, surface `#F5F6FA`, line `#E4E7EC`, accent yellow `#FFC83D` (from the flyer; used sparingly as a highlight).
- **Type.** Latin: Plus Jakarta Sans (400/700/800). Arabic: Cairo (400/700/800). Loaded from Google Fonts with `preconnect` and `display=swap`; two weights each to keep requests small. Headline scale: 2.6rem desktop / 2rem mobile.
- **Layout.** 1200px container, 16px gutters, 8px spacing scale, cards with 16px radius and hairline borders, generous whitespace, sticky header with WhatsApp button, mobile nav drawer.
- **Motion.** Subtle reveal on scroll (opacity/transform), disabled under `prefers-reduced-motion`.
- **Accessibility.** Skip link, visible focus rings, 4.5:1 contrast for text, buttons ≥ 44px tall, `aria-expanded` on the nav toggle, native `<details>` for FAQs.

## 9. Error handling

- Build fails with a clear message if a content key is missing, a page slug has no counterpart in the other language, or an image referenced by content does not exist.
- Quote form validates name/phone client-side, shows inline messages, and never blocks the WhatsApp/call links.
- Map iframe is lazy and wrapped in a container with a static "Open in Google Maps" link in case the embed is blocked.
- 404 pages are static files that work on any host (`.htaccess` and `_headers` map them).

## 10. Testing

`node test.js` runs after each build and fails on:
- missing/duplicate `<h1>`, title or description outside length bounds, missing canonical/hreflang/`lang`/`dir`;
- any internal link or image that does not resolve inside `dist/`; images without `alt`, `width`, `height`;
- JSON-LD blocks that do not parse; sitemap entries that do not exist as files; pages missing from the sitemap;
- English/Arabic slug sets that differ.

Manual checks before launch: Google Rich Results test on home, one service and one destination page; Lighthouse mobile ≥ 90 performance/SEO/accessibility; open every page in RTL.

## 11. Deployment

Upload `dist/` to the host root. For Netlify/Cloudflare Pages the included `_headers` applies security and caching headers and the 404 is picked up automatically. For Apache/cPanel, `.htaccess` enforces HTTPS, trailing slashes, caching and the 404s. After launch: add the live URL to the GBP, submit the sitemap in Search Console (both language folders), and verify the LocalBusiness markup.

## 12. Out of scope (recommended phase 2)

Shipment tracking, online payment, a blog with route guides and prohibited-items articles, dedicated pages for India/Pakistan/Philippines/Bangladesh corridors once the client confirms it serves them, Instagram/Snapchat feed, review-collection automation, analytics (a GA4 or Plausible snippet can be added in `layout.js` in one place).
