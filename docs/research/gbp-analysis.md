# RetEx Express — Google Business Profile & Search Landscape Analysis

Prepared: 4 October 2026
Scope: everything retrievable about the client's Google Business Profile (GBP), the brand assets supplied, the local map-pack competition in Riyadh, competitor websites, and keyword demand in Saudi Arabia. This document drives the website design in `docs/superpowers/specs/2026-10-04-retex-website-design.md`.

Data sources: Google Maps listing data (place preview endpoint), Google local-pack results for Riyadh, Google autocomplete for Saudi Arabia (English and Arabic), competitor homepages, Arabic directory blogs, Google Play. Ahrefs keyword volumes were not available on the connected plan, so demand is ranked from Google's own autocomplete suggestions, which reflect real query popularity in the country.

---

## 1. The Google Business Profile as it stands

| Field | Value on Google |
|---|---|
| Listing name | **RETEX Express Shipping** |
| Primary category | Courier service |
| Additional categories | Shipping service, Logistics service |
| Address shown | HPXX+QCV, Al Aziziyah, Riyadh 14512 (plus code only, **no street address**) |
| Coordinates | 24.5994375, 46.7485625 |
| Phone | +966 55 873 6359 (also the WhatsApp number behind the short link `wa.link/sjr9vd`) |
| Second phone (flyer only, not on GBP) | 053 235 0108 |
| Hours | Sat–Thu 8:30 AM – 11:00 PM, Fri 4:00 PM – 9:30 PM |
| Website | **None** |
| Reviews | **18 reviews** (the aggregate star value is not exposed by the data endpoint; every visible review is a glowing recommendation) |
| Owner replies | Present ("RETEX Express Shipping (Owner)" responses exist) |
| Posts | 2 updates published |
| Photos | Only 2 customer-visible photos were found |
| Established | 2016 (stated in the owner's own description) |
| Place ID | `ChIJd82CJPAJLz4RzwIZFy9osBE` |
| CID (ludocid) | `1274633246006117071` (hex `0x11b0682f171902cf`) |
| Maps link | https://www.google.com/maps/place/?q=place_id:ChIJd82CJPAJLz4RzwIZFy9osBE |
| Write-a-review link | https://search.google.com/local/writereview?placeid=ChIJd82CJPAJLz4RzwIZFy9osBE |
| Created with | Google Business app on Android |

### Owner description (verbatim, bilingual)

> RetEx is a courier service and cargo company in Al Aziziyah, Riyadh, serving customers since 2016. We provide air cargo and road shipping for documents, parcels, business samples, e-commerce orders and commercial cargo. Services include express shipping, pickup, door-to-door delivery, airport-to-airport cargo, large shipments and business sample shipping to and from China across Saudi Arabia, the GCC, Egypt and worldwide.
>
> ريتكس شركة شحن وكورير في حي العزيزية بالرياض، تخدم العملاء منذ عام 2016. نقدم الشحن السريع والجوي والبري للمستندات والطرود والعينات التجارية وشحنات التجارة الإلكترونية والبضائع. تشمل خدماتنا استلام الشحنات، والتوصيل من الباب إلى الباب، والشحن من مطار إلى مطار، والشحنات الكبيرة...

This is a strong, keyword-rich description. It names the services, the neighbourhood, the founding year, and the markets (Saudi Arabia, GCC, Egypt, China, worldwide). The website reuses this positioning rather than inventing a new one.

### Google Posts (verbatim)

1. "Every parcel carries something that matters. 📦💙 With RetEx, care goes into every delivery—from the first seal to the final doorstep. 🌍 Worldwide Express Delivery 📍 Aziziyah, Riyadh"
2. "Reliable Shipping Solutions You Can Trust! ✈️🚛📦 RetEx provides fast, secure, and dependable local & international shipping, courier services, and airport-to-airport cargo solutions. 📞 Contact us today: +966 55 873 6359" (links to WhatsApp)

### What customers say

Review excerpts retrieved from the listing:

- "I had a smooth experience with RETEX AIR CARGO. Fast service, friendly staff, and timely delivery. Highly recommended."
- "Amazing experience! Low cost, on-time delivery to Dubai, and great service. Very trustworthy company. 100% recommended."
- "Excellent Service Home Delivery with in 10 hours jeddah"
- "Best choice in Riyadh to send courier"

Themes customers volunteer: speed (same-day to Jeddah), the Dubai route, low cost, friendly staff, trust. Customers call the company "RETEX AIR CARGO" and "courier", which confirms the vocabulary the site should rank for.

---

## 2. Brand assets supplied

**Logo file** — "RetEx" wordmark: heavy italic sans, "Ret" in vivid blue (about `#2A1BE8`), "Ex" in pink-red (about `#F31A5A`), tagline "Worldwide Express Delivery" with a blue/pink double chevron. White background JPG; a trimmed transparent PNG has been produced for the site.

**Flyer** — headline "Anywhere in the world, we deliver to your doorstep", support line "Fast • Safe • Reliable", badge "Your Trust, Our Priority", banner "ALL GCC — AIR & ROAD", destination row UAE, Qatar, Bahrain, Kuwait, Oman, Jordan, Syria, service row Air Cargo (Fast & Global), Sea Cargo (Cost Effective), Road Cargo (Safe & Secure), Documents (No Hassle), Business Samples (Small or Large), footer "Aziziyah, Riyadh — Kingdom of Saudi Arabia", "Call / WhatsApp 0558736359", "0532350108", slogans "Connecting Riyadh To The World" and "Send More, Worry Less".

**Naming inconsistency to fix.** The three sources use three names: the logo says "RetEx", the flyer says "RetEx EXPRESS — Logistics | Courier | Cargo", Google says "RETEX Express Shipping". The website standardises on **RetEx Express** as the brand, lists "RETEX Express Shipping" as the alternate (registered listing) name in structured data, and the recommendation is to make the GBP name match the brand.

---

## 3. Brand-name collision (important)

A different, older company trades as **ريتكس / Retex Express** in Riyadh: a domestic parcel-delivery operator for merchants, with an Android app (`retex.express`, published by Vision Soft), phones 0538775771 / 0112130323 / 0571137825, email retex-express@hotmail.com, and at least two other Google listings in Riyadh ("Retex Express" on Dirab Road, Al Marwah: 4.6 stars, 9 reviews; "Retex Express" in Ar Rawdah: 4 reviews, +966 51 030 7645). Arabic directory blogs (telooa, mobasatinfo, afdil-better, hoootline, 3rodhcity) describe that company, also placing it in Al Aziziyah on the Southern Ring Road.

Why this matters:

- A search for "retex express" today surfaces the other company's app and directory write-ups, not the client.
- Google Maps shows three "Retex" pins in Riyadh; customers can call the wrong one.
- The site must build unambiguous entity signals: consistent name + address + phone everywhere, structured data that links the site to the client's own Place ID, the neighbourhood and founding year in copy, and the client's own reviews on the page.

Assumption carried into the build: the two businesses are **not** the same company. If they are related, say so and the copy will be adjusted.

---

## 4. Local competition (Google map pack, Riyadh)

### Courier listings in Al Aziziyah

| Business | Rating | Reviews | Notes |
|---|---|---|---|
| ABC Cargo (Azizia branch) | 4.5 | 103 | Has a website (abccargogcc.com), tracking, quote form; HQ in Batha |
| **RETEX Express Shipping** | n/a | 18 | No website, plus-code address |
| Mu'assasat Al Bareed Al Saree (مؤسسة البريد السريع التجارية) | 4.2 | 19 | Shipping service |
| Nasma Al Resala (نسما الرساله للشحن السريع) | 3.8 | 11 | Courier service |
| Excellence Express Air Cargo | n/a | 7 | Same block as RetEx (plus code HPXX+RG4) |

### Who appears for broader queries

- "international cargo Riyadh": Captain Cargo (4.8, 39), Aman Cargo (4.5, 17), BAFCO (4.2, 19), Saudia Cargo Terminal (3.7, 950).
- "cargo to Dubai Riyadh": AB Cargo & Travels (4.9, 16), Captain Cargo, Aman Cargo.
- "shipping to Jordan Riyadh": Platinum Shipping (3.8, 16), Al Fayez Transport (3.7, 835) and **RETEX Express Shipping already appears in this pack**.

Reading: RetEx is mid-pack on review count. ABC Cargo dominates the neighbourhood with 103 reviews and a website. Review velocity plus a website with real route pages are the two levers that move the client up.

---

## 5. Competitor websites

| Site | Languages | Strengths | Weaknesses |
|---|---|---|---|
| utdexpress.com (United Express, Riyadh) | EN + AR | "172 countries", partner logos (Emirates, Maersk, GACA), six-step process, WhatsApp CTA | Generic copy, no route pages |
| arabsas.com (Arab Sas, since 1983) | EN only | 40-year history, IATA/FIATA, blog, FAQ, named testimonials | No Arabic, targets expats only (India, Pakistan, Philippines, UK, USA) |
| abccargogcc.com (ABC Cargo) | EN (+ regional sites) | Tracking portal, quote form, ticketing, big trust numbers | Vague H1, thin service copy |
| bmcargoksa.com (BM Cargo) | EN only | Fleet claims, 24/7 | Title tag is literally "Bm cargo"; weak SEO |
| expressarabia.com | EN + AR + 12 more | Corporate freight, HS-code database, tracking | Enterprise tone, not for walk-in parcel customers |

Gaps the RetEx site can own: proper Arabic pages, one page per route (Riyadh → UAE, Qatar, Bahrain, Kuwait, Oman, Jordan, Syria, Egypt, China), neighbourhood-level local SEO for Al Aziziyah, FAQ content with structured data, fast mobile pages with WhatsApp first.

---

## 6. Keyword demand (Google autocomplete, Saudi Arabia)

### English clusters

| Cluster | Representative queries |
|---|---|
| Generic local | courier service riyadh, courier service riyadh near me, cargo service riyadh, cargo in riyadh, parcel service riyadh, best cargo service in riyadh, riyadh courier companies |
| International generic | international courier riyadh, international shipping riyadh, international shipping companies in saudi arabia |
| GCC routes | shipping from riyadh to dubai, cargo from riyadh to dubai, cargo service from riyadh to dubai, courier riyadh to dubai, shipping from riyadh to bahrain, cargo from saudi to uae / qatar / bahrain / oman, shipping from saudi to kuwait |
| Door to door | door to door cargo riyadh, door to door cargo riyadh to india / pakistan / sri lanka, door to door cargo near me |
| Modes | air cargo riyadh, air cargo riyadh to philippines price, sea cargo riyadh, sea cargo from riyadh to philippines |
| Expat corridors (largest volume) | cargo riyadh to india / pakistan / philippines / bangladesh / sri lanka / indonesia, courier service riyadh to india price, cheapest cargo to pakistan from saudi arabia |
| Domestic | courier riyadh to jeddah, courier service riyadh to dammam, cargo riyadh to jeddah, next day delivery riyadh |

### Arabic clusters

| Cluster | Representative queries |
|---|---|
| Generic | شركة شحن الرياض, شركات شحن الرياض, شحن دولي الرياض, شركة شحن دولي الرياض, شركة شحن قريبة مني, شركة شحن العزيزية |
| GCC routes | شركة شحن من الرياض الى الامارات, شحن بري من الرياض الى دبي, شركة شحن من الرياض الى الكويت, شحن بري من الرياض الى قطر, شركة شحن من السعودية الى البحرين, شحن من السعودية الى عمان, شحن بري من الرياض الى مسقط |
| Levant & Egypt | شركة شحن من الرياض الى الاردن, شحن بري من الرياض الى الاردن, شركات شحن من الرياض الى سوريا, مكاتب شحن من الرياض الى سوريا, شركة شحن من الرياض الى مصر, شحن جوي من الرياض لمصر |
| Price intent | ارخص شركة شحن دولي في السعودية, ارخص شحن من السعودية الى الامارات, ارخص شركة شحن من السعودية الى الكويت |
| Service intent | شحن من الباب الى الباب, شحن مستندات دولي, شحن سريع الرياض, شحن طرود من الرياض الى جدة |
| Brand | شركة ريتكس للشحن (currently resolves to the other company) |

### Keyword → page mapping used in the build

| Page | Primary targets |
|---|---|
| Home | courier service riyadh, cargo service riyadh, شركة شحن الرياض, شحن دولي الرياض |
| Air cargo | air cargo riyadh, شحن جوي الرياض |
| Sea cargo | sea cargo riyadh, شحن بحري الرياض |
| Road freight | road cargo riyadh, land freight saudi to uae, شحن بري الرياض |
| Express courier & documents | courier riyadh, document courier, شحن مستندات دولي, شحن سريع الرياض |
| Business samples | business samples shipping china saudi, شحن عينات تجارية |
| Door to door | door to door cargo riyadh, شحن من الباب الى الباب |
| UAE | shipping from riyadh to dubai, cargo from riyadh to dubai, شركة شحن من الرياض الى الامارات, شحن بري من الرياض الى دبي |
| Qatar / Bahrain / Kuwait / Oman | cargo from saudi to {country}, شحن بري من الرياض الى {الدوحة / البحرين / الكويت / مسقط} |
| Jordan / Syria / Egypt | shipping from saudi arabia to jordan, شركة شحن من الرياض الى الاردن / سوريا / مصر |
| China | business samples from china to saudi, شحن من الصين الى الرياض |
| Saudi Arabia (domestic) | courier riyadh to jeddah / dammam, شحن طرود من الرياض الى جدة |
| International | international courier riyadh, cargo riyadh to india / pakistan / philippines |

---

## 7. GBP optimisation checklist (do these alongside the launch)

1. **Add a street address.** The listing only has a plus code. A real address (street, building, district) improves proximity ranking, trust, and lets the site and listing match exactly.
2. **Add the website URL** as soon as the domain is live, with a UTM tag (for example `?utm_source=google&utm_medium=organic&utm_campaign=gbp`).
3. **Align the business name** with the brand ("RetEx Express"). Keep "Shipping" only if it is part of the registered trade name.
4. **Fill the Services section** with the six services used on the site, each with a short description and, if possible, "from" prices.
5. **Photos:** upload 15–20 real photos (shopfront with signage, counter, packing area, vehicles, team at work, the flyer) plus a logo and cover image. Two photos is far below every competitor.
6. **Reviews:** target 50+ within six months. Print a QR code to the write-a-review link, ask every customer at pickup, and keep replying to every review (replies already exist, keep it up). Ask customers to mention the route ("to Dubai", "to Amman") in their reviews.
7. **Weekly Google Posts:** route schedules, seasonal offers (Ramadan, Eid, back-to-school shipping), new destinations.
8. **Q&A:** seed the Questions section with the same FAQs used on the site (pickup, documents needed, prohibited items, how to pay).
9. **Attributes:** enable messaging, add the second phone number, mark the opening date (2016), set accepted payment methods.
10. **Products:** create one "product" per route (Riyadh → Dubai road freight, Riyadh → Amman, business samples from China) with a photo and a WhatsApp link.
11. **Description:** keep the current bilingual text; add the route phrasing customers search for (شركة شحن من الرياض إلى الإمارات والأردن والكويت).
12. **Citations:** list the business with identical NAP on Apple Maps, Bing Places, Snapchat/Instagram bios, and Saudi directories (Daleeli, Yellow Pages KSA) to separate it from the namesake company.

---

## 8. Domain

No live website exists on any obvious domain (retexexpress.com, retex-express.com, retex.sa, retexexpress.sa, retexksa.com, retex.express, retexcargo.com all fail to resolve). Registration status could not be confirmed from here. Recommended order of preference: `retexexpress.com` (international customers, matches the brand), then `retex.sa` (strong local signal; requires a Saudi commercial registration). The build uses `https://retexexpress.com` as a placeholder in one config value, `siteUrl` in `site.config.js`.
