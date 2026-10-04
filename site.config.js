// Single source of truth for business facts and site-wide settings.
// Values come from the Google Business Profile (see docs/research/gbp-analysis.md)
// and the client's flyer. Change siteUrl once the domain is live, then rebuild.
module.exports = {
  siteUrl: 'https://logistics-demo.beepsdigital.com', // demo domain; switch to the client's domain at launch
  defaultLang: 'en',
  langs: ['en', 'ar'],

  brand: {
    name: 'RetEx Express',
    legalName: 'RETEX Express Shipping', // name as it appears on the Google listing
    foundingDate: '2016',
    tagline: { en: 'Worldwide Express Delivery', ar: 'توصيل سريع حول العالم' },
  },

  contact: {
    phone: '+966558736359',
    phoneDisplay: '+966 55 873 6359',
    phone2: '+966532350108',
    phone2Display: '+966 53 235 0108',
    whatsapp: '966558736359', // digits only, used for wa.me links
    email: '', // not published on the GBP; add when the client confirms one
  },

  address: {
    street: '', // GBP shows a plus code only; add the street address when confirmed
    district: { en: 'Al Aziziyah', ar: 'حي العزيزية' },
    city: { en: 'Riyadh', ar: 'الرياض' },
    region: { en: 'Riyadh Province', ar: 'منطقة الرياض' },
    postalCode: '14512',
    countryCode: 'SA',
    country: { en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' },
    plusCode: 'HPXX+QCV',
    geo: { lat: 24.5994375, lng: 46.7485625 },
  },

  // Opening hours exactly as listed on Google.
  hours: [
    { days: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '08:30', closes: '23:00' },
    { days: ['Friday'], opens: '16:00', closes: '21:30' },
  ],

  google: {
    placeId: 'ChIJd82CJPAJLz4RzwIZFy9osBE',
    cid: '1274633246006117071',
    mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJd82CJPAJLz4RzwIZFy9osBE',
    reviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJd82CJPAJLz4RzwIZFy9osBE',
    reviewsUrl: 'https://search.google.com/local/reviews?placeid=ChIJd82CJPAJLz4RzwIZFy9osBE',
    embedUrl: 'https://maps.google.com/maps?q=24.5994375,46.7485625&z=16&output=embed',
  },

  // Fill in when the client shares profile URLs; they are added to schema sameAs and the footer.
  social: {
    instagram: '',
    snapchat: '',
    tiktok: '',
    facebook: '',
    x: '',
  },

  // Optional analytics. Leave empty to ship no third-party script.
  analytics: {
    gtagId: '',
  },
};
