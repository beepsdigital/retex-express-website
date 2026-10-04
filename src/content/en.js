'use strict';
// English content. Same shape as ar.js. Inline links use "@@/path/" so they resolve in both languages.
// Copy rules: no prices, no transit-time promises, brand = "RetEx Express", NAP identical to Google.

const WA = 'https://wa.me/966558736359';

module.exports = {
  lang: 'en',
  dir: 'ltr',
  locale: 'en_SA',
  fontHref: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;800&display=swap',

  schemaDescription: 'RetEx Express is a courier service and cargo company in Al Aziziyah, Riyadh, serving customers since 2016. We provide air cargo and road shipping for documents, parcels, business samples, e-commerce orders and commercial cargo, with pickup, door-to-door delivery and airport-to-airport cargo across Saudi Arabia, the GCC, Jordan, Syria, Egypt, China and worldwide.',

  strings: {
    skip: 'Skip to content',
    menu: 'Menu',
    langSwitch: 'العربية',
    langSwitchTitle: 'النسخة العربية',
    quickContact: 'Quick contact',
    bar: { call: 'Call', whatsapp: 'WhatsApp', quote: 'Quote', map: 'Map' },
    am: 'AM',
    pm: 'PM',
    days: { Saturday: 'Saturday', Sunday: 'Sunday', Monday: 'Monday', Tuesday: 'Tuesday', Wednesday: 'Wednesday', Thursday: 'Thursday', Friday: 'Friday' },
    nav: { main: 'Main navigation', home: 'Home', services: 'Services', destinations: 'Destinations', about: 'About', contact: 'Contact', quote: 'Get a quote', faq: 'FAQ', privacy: 'Privacy policy', terms: 'Terms of service' },
    cta: { whatsapp: 'WhatsApp us', call: 'Call now', quote: 'Get a quote', directions: 'Get directions', learnMore: 'Learn more', allServices: 'See all services', allDestinations: 'See all destinations', viewOnMaps: 'View on Google Maps', writeReview: 'Write a Google review', readReviews: 'Read our Google reviews' },
    footer: { blurb: 'Courier, cargo and logistics from Al Aziziyah, Riyadh to the GCC, Jordan, Syria, Egypt, China and worldwide. Serving customers since 2016.', hours: 'Opening hours', services: 'Services', destinations: 'Destinations', company: 'Company', rights: 'All rights reserved.' },
    labels: {
      trust: 'Why customers choose RetEx', plusCode: 'Plus code', address: 'Address', phone: 'Phone', whatsapp: 'WhatsApp', hours: 'Opening hours', contactDetails: 'Contact details',
      breadcrumb: 'Breadcrumb', breadcrumbHome: 'Home', faq: 'Frequently asked questions', relatedDestinations: 'Popular destinations for this service', relatedServices: 'Services available on this route',
      googleReview: 'Google review', air: 'Air', road: 'Road', sea: 'Sea', airLong: 'Air cargo available', roadLong: 'Road freight available', seaLong: 'Sea cargo available', lastUpdated: 'Last updated',
    },
  },

  home: {
    meta: {
      title: 'Courier & Cargo Company in Riyadh | RetEx Express',
      description: 'Courier, cargo and logistics company in Al Aziziyah, Riyadh since 2016. Air, road and sea shipping to the GCC, Jordan, Syria, Egypt, China and worldwide.',
    },
    hero: {
      eyebrow: 'RetEx Express · Al Aziziyah, Riyadh · Since 2016',
      h1: 'Courier, cargo and logistics from Riyadh to <em>anywhere in the world</em>',
      lead: 'Documents, parcels, commercial cargo and business samples shipped by air, road and sea to the GCC, Jordan, Syria, Egypt, China and beyond. We pick up from your door in Riyadh and deliver to the recipient’s doorstep.',
      tags: ['Fast', 'Safe', 'Reliable', 'Door to door'],
      badge: 'Connecting Riyadh to the world',
      imageAlt: 'RetEx Express branded truck, container ship and parcels ready for shipping from Riyadh',
    },
    trust: [
      { icon: 'shield', value: 'Since 2016', label: 'Serving Riyadh and the GCC' },
      { icon: 'truck', value: 'All GCC', label: 'By air and by road' },
      { icon: 'door', value: 'Door to door', label: 'Pickup in Riyadh, delivery abroad' },
      { icon: 'clock', value: '7 days a week', label: 'Sat–Thu 8:30 AM–11 PM, Fri 4–9:30 PM' },
    ],
    services: {
      title: 'Shipping services from Riyadh',
      lead: 'Choose the mode that fits your shipment: fast air cargo, cost-effective sea freight or secure road transport across the GCC. Every service includes pickup in Riyadh and door-to-door delivery.',
    },
    destinations: {
      title: 'Where we ship from Riyadh',
      lead: 'All GCC countries by air and road, plus Jordan, Syria, Egypt, China, every city in Saudi Arabia and worldwide destinations by air.',
    },
    steps: {
      title: 'How it works',
      lead: 'From your first message to delivery at the door, in four steps.',
      items: [
        { title: 'Send us the details', text: 'Tell us on WhatsApp what you are shipping, where it is going and the approximate weight or size.' },
        { title: 'Get your quote', text: 'We confirm the best option (air, road or sea), the price and any paperwork the destination needs.' },
        { title: 'We pick up and pack', text: 'Our team collects the shipment from your home, office or shop in Riyadh and packs it securely.' },
        { title: 'Delivered to the doorstep', text: 'Your shipment leaves on the next departure and is delivered to the recipient, with updates along the way.' },
      ],
    },
    why: {
      title: 'Why ship with RetEx Express',
      lead: 'A local team in Al Aziziyah that treats every parcel as if it were its own.',
      items: [
        { icon: 'bolt', title: 'Fast dispatch', text: 'Regular departures by air and road mean your shipment leaves Riyadh without waiting for a full load.' },
        { icon: 'shield', title: 'Safe handling', text: 'Careful packing, labelled consignments and secure handling from pickup to delivery.' },
        { icon: 'tag', title: 'Clear pricing', text: 'You get a quote before you ship. No surprise charges at delivery.' },
        { icon: 'door', title: 'Door to door', text: 'We collect from your door in Riyadh and deliver to the recipient’s address abroad or anywhere in Saudi Arabia.' },
        { icon: 'globe', title: 'GCC and worldwide', text: 'UAE, Qatar, Bahrain, Kuwait, Oman, Jordan, Syria, Egypt, China and worldwide destinations by air.' },
        { icon: 'chat', title: 'Real people, two languages', text: 'Talk to a person on WhatsApp in Arabic or English, seven days a week.' },
      ],
    },
    reviews: {
      title: 'What customers say',
      lead: 'Reviews left on our Google Business Profile.',
      items: [
        { text: 'Amazing experience! Low cost, on-time delivery to Dubai, and great service. Very trustworthy company. 100% recommended.', author: 'Google customer', route: 'Riyadh to Dubai' },
        { text: 'I had a smooth experience with RETEX AIR CARGO. Fast service, friendly staff, and timely delivery. Highly recommended.', author: 'Google customer', route: 'Air cargo' },
        { text: 'Excellent Service Home Delivery with in 10 hours jeddah', author: 'Google customer', route: 'Riyadh to Jeddah' },
      ],
    },
    faq: {
      title: 'Shipping from Riyadh: common questions',
      lead: 'Quick answers before you send your first shipment.',
      items: [
        { q: 'Do you pick up from my location in Riyadh?', a: 'Yes. We collect documents, parcels and cargo from homes, offices and shops across Riyadh. Send your location on WhatsApp and we will arrange a pickup time.' },
        { q: 'Which countries do you ship to?', a: 'All GCC countries (UAE, Qatar, Bahrain, Kuwait and Oman), Jordan, Syria, Egypt and China, plus worldwide destinations by air. We also deliver to every city in Saudi Arabia.' },
        { q: 'How do I get a price?', a: 'Message us on WhatsApp with the destination, what you are sending and the approximate weight or dimensions. We reply with a quote and the service we recommend.' },
        { q: 'What can I send?', a: 'Documents, personal parcels, gifts, clothing, electronics, commercial goods, e-commerce orders and business samples. Some items are restricted by airlines or customs, so ask us before you pack.' },
        { q: 'Where is RetEx Express located?', a: 'In Al Aziziyah, Riyadh (plus code HPXX+QCV Riyadh). We are open Saturday to Thursday from 8:30 AM to 11:00 PM and Friday from 4:00 PM to 9:30 PM.' },
      ],
    },
    cta: { title: 'Ready to ship from Riyadh?', text: 'Send your shipment details on WhatsApp and get a quote today. Pickup available across Riyadh.' },
  },

  servicesIndex: {
    meta: {
      title: 'Courier & Cargo Services in Riyadh | RetEx Express',
      description: 'Air cargo, sea freight, road transport to the GCC, express courier for documents, business sample shipping and door-to-door delivery from Riyadh. Get a quote.',
    },
    h1: 'Shipping services from Riyadh',
    lead: 'Six ways to move your shipment, all with pickup in Riyadh and delivery to the door. Not sure which one fits? Send us a message and we will recommend the fastest or the most economical option.',
    imageAlt: 'RetEx Express cargo truck on the road',
    sections: [
      { h2: 'One contact for every kind of shipment', paragraphs: ['Whether you are sending a single envelope to Dubai, a pallet of goods to Amman or product samples to a factory in China, the process is the same: message us, get a quote, hand over the shipment and track it to the door. We handle packing, labelling, export paperwork and the handover to the airline, trucking line or shipping line.', 'RetEx Express has operated from Al Aziziyah, Riyadh since 2016, serving families, small businesses, online sellers and companies that need a reliable partner for GCC and international freight.'] },
      { h2: 'Which service should I choose?', list: ['<strong>Air cargo</strong> when speed matters: documents, urgent parcels, samples and valuable goods.', '<strong>Road freight</strong> for the GCC and Jordan: the economical choice for heavier parcels, pallets and commercial goods.', '<strong>Sea cargo</strong> for large, heavy or non-urgent shipments such as household goods and bulk orders.', '<strong>Express courier</strong> for documents and small parcels that need to arrive quickly and safely.', '<strong>Business samples</strong> for traders and online sellers moving samples between Riyadh, China and the GCC.', '<strong>Door-to-door</strong> on every service: we pick up in Riyadh and deliver to the recipient.'] },
    ],
    faq: [
      { q: 'Do you handle both personal and commercial shipments?', a: 'Yes. We ship personal parcels and gifts as well as commercial cargo, e-commerce orders and business samples, with the paperwork each type requires.' },
      { q: 'Can you pack my shipment for me?', a: 'Yes. Our team packs documents, parcels and fragile items with suitable materials before dispatch. Bring the items as they are or ask for a pickup.' },
      { q: 'Do you offer airport-to-airport cargo?', a: 'Yes. For customers who prefer to collect at the destination airport, we offer airport-to-airport air cargo in addition to door-to-door delivery.' },
    ],
  },

  services: [
    {
      slug: 'air-cargo', name: 'Air Cargo', icon: 'plane', serviceType: 'Air cargo',
      short: 'Fast air freight from Riyadh to the GCC, Egypt, China and worldwide for urgent parcels and cargo.',
      image: { src: 'plane.jpg', alt: 'Cargo aircraft taking off, representing air cargo from Riyadh' },
      meta: { title: 'Air Cargo from Riyadh | Fast Air Freight | RetEx Express', description: 'Air cargo from Riyadh to the GCC, Jordan, Egypt, China and worldwide. Door-to-door and airport-to-airport air freight for parcels, commercial goods and samples.' },
      h1: 'Air cargo from Riyadh',
      lead: 'The fastest way to move parcels, documents and commercial goods from Riyadh to the GCC, Jordan, Egypt, China and the rest of the world. Door-to-door or airport-to-airport, with pickup from your location in Riyadh.',
      sections: [
        { h2: 'Who air cargo is for', paragraphs: ['Air cargo is the right choice when time matters more than weight: urgent documents, spare parts, electronics, medical items, product samples, gifts for an occasion and e-commerce orders that customers are waiting for. It is also the standard option for destinations that cannot be reached by road, such as Egypt, China, Europe and the Americas.'] },
        { h2: 'What we ship by air', list: ['Documents, contracts and certificates', 'Personal parcels, gifts, clothing and perfumes (within airline rules)', 'Electronics, phones and accessories', 'Commercial goods and e-commerce orders', 'Business samples and prototypes', 'Spare parts and small machinery'] },
        { h2: 'How air cargo with RetEx works', paragraphs: ['Send us the destination, contents and approximate weight on WhatsApp. We quote the air service, collect the shipment from your door in Riyadh, pack and label it, prepare the airway bill and hand it to the airline on the next available departure. At the destination it is either delivered to the recipient’s address or held at the airport for collection, whichever you chose.'] },
        { h2: 'Airport-to-airport or door-to-door?', paragraphs: ['<strong>Door-to-door</strong> is the simplest: one price, and the recipient receives the shipment at home or at work. <strong>Airport-to-airport</strong> suits businesses with their own customs agent at the destination, or customers who want the lowest cost and can collect at the airport. We offer both; tell us which you prefer when you ask for a quote.'] },
      ],
      relatedDestinations: ['uae', 'egypt', 'china', 'jordan', 'qatar', 'international'],
      faq: [
        { q: 'Is air cargo faster than courier?', a: 'Both travel by air. “Express courier” is our service for documents and small parcels, while “air cargo” covers heavier or commercial shipments that move on an airway bill. We recommend the right one based on what you are sending.' },
        { q: 'Which items cannot be sent by air?', a: 'Airlines restrict lithium batteries shipped loose, aerosols, flammable liquids, certain perfumes in bulk, and some foods and medicines. Tell us what you are sending and we will confirm before you pack.' },
        { q: 'Do you offer air cargo beyond the GCC and the Middle East?', a: 'Yes. We ship by air to worldwide destinations. Ask for a quote for your country and we will confirm the service.' },
      ],
    },
    {
      slug: 'sea-cargo', name: 'Sea Cargo', icon: 'ship', serviceType: 'Sea freight',
      short: 'Cost-effective sea freight for large, heavy or non-urgent shipments from Saudi Arabia.',
      image: { src: 'ship.jpg', alt: 'Container ship loaded with cargo, representing sea freight from Saudi Arabia' },
      meta: { title: 'Sea Cargo from Saudi Arabia | Sea Freight | RetEx Express', description: 'Cost-effective sea cargo from Riyadh for large, heavy or non-urgent shipments. Household goods, commercial cargo and bulk orders shipped by sea.' },
      h1: 'Sea cargo from Riyadh and Saudi Arabia',
      lead: 'When your shipment is big, heavy or not in a hurry, sea freight is the economical option. We collect in Riyadh, pack and consolidate, and ship through the Kingdom’s ports to worldwide destinations.',
      sections: [
        { h2: 'When sea cargo makes sense', paragraphs: ['Sea freight costs a fraction of air cargo per kilogram, which makes it the natural choice for household goods, furniture, bulk commercial orders, machinery and anything that is heavy relative to its value. It takes longer than air or road, so it suits shipments that can be planned in advance.'] },
        { h2: 'What we ship by sea', list: ['Household goods and personal effects', 'Furniture and appliances', 'Bulk commercial orders and stock', 'Machinery, tools and equipment', 'Boxes consolidated from several senders'] },
        { h2: 'How it works', paragraphs: ['Send us a list of what you want to ship, with approximate dimensions or the number of boxes. We quote by volume, collect from your location in Riyadh, pack and label everything, and book the cargo on the next sailing. We prepare the shipping documents and keep you informed until the cargo reaches the destination.'] },
        { h2: 'Packing for sea freight', paragraphs: ['Sea shipments are handled many times between Riyadh and delivery, so packing matters. We use double-wall cartons, stretch wrap and pallets where needed, and we can crate fragile or high-value items on request.'] },
      ],
      relatedDestinations: ['egypt', 'china', 'international', 'uae'],
      faq: [
        { q: 'Is there a minimum size for sea cargo?', a: 'Small shipments are consolidated with others, so there is no strict minimum. For very small or urgent parcels, air cargo or express courier is usually the better choice.' },
        { q: 'Can you ship household goods when I relocate?', a: 'Yes. We pack, list and ship personal effects by sea to many countries. Share the number of rooms or boxes and the destination city for a quote.' },
        { q: 'Do you handle customs paperwork for sea freight?', a: 'We prepare the export documents and shipping instructions. Import clearance at the destination depends on the country; we tell you what the recipient needs to provide before the cargo sails.' },
      ],
    },
    {
      slug: 'road-freight', name: 'Road Cargo (GCC)', icon: 'truck', serviceType: 'Road freight',
      short: 'Secure trucking from Riyadh to the UAE, Qatar, Bahrain, Kuwait, Oman and Jordan, door to door.',
      image: { src: 'truck.jpg', alt: 'RetEx Express branded truck carrying cargo by road from Riyadh' },
      meta: { title: 'Road Freight from Riyadh to the GCC & Jordan | RetEx Express', description: 'Road cargo from Riyadh to the UAE, Qatar, Bahrain, Kuwait, Oman and Jordan. Secure trucking for parcels, pallets and commercial goods, door to door.' },
      h1: 'Road freight from Riyadh to the GCC and Jordan',
      lead: 'The economical way to move parcels, pallets and commercial goods by land from Riyadh to Dubai, Doha, Manama, Kuwait City, Muscat and Amman. Regular departures, secure loading and delivery to the recipient’s door.',
      sections: [
        { h2: 'Where our trucks go', paragraphs: ['Road freight covers every Gulf country connected to Saudi Arabia by land, plus Jordan and onward to Syria: the United Arab Emirates (Dubai, Abu Dhabi, Sharjah), Qatar (Doha), Bahrain (Manama), Kuwait, Oman (Muscat, Salalah) and Jordan (Amman and other cities). For other destinations we recommend <a href="@@/services/air-cargo/">air cargo</a>.'] },
        { h2: 'What ships well by road', list: ['Parcels and boxes too heavy for courier rates', 'Pallets of commercial goods and stock for shops', 'E-commerce orders in volume', 'Furniture, appliances and household items', 'Exhibition materials and business samples', 'Building and workshop supplies'] },
        { h2: 'How road freight works', paragraphs: ['Send us the destination, the number of pieces and the approximate weight. We quote per shipment, collect from your location in Riyadh, wrap and label the goods and load them on the next truck. Our team manages the border paperwork and the shipment is delivered to the address in the destination country.'] },
        { h2: 'Road or air?', paragraphs: ['Road freight is usually the better value for anything heavier than a few kilograms going to the GCC or Jordan. Air cargo is faster and is the right choice for documents, urgent items and destinations beyond the land network. If you are not sure, tell us what you are sending and we will recommend one.'] },
      ],
      relatedDestinations: ['uae', 'qatar', 'bahrain', 'kuwait', 'oman', 'jordan', 'syria'],
      faq: [
        { q: 'Do you deliver to the recipient’s door in the destination country?', a: 'Yes. Our road freight service is door to door: we collect in Riyadh and deliver to the address you give us in the UAE, Qatar, Bahrain, Kuwait, Oman or Jordan.' },
        { q: 'What documents are needed for road freight to the GCC?', a: 'For personal parcels, a copy of the sender’s and recipient’s ID is usually enough. Commercial goods need an invoice and packing list. We tell you exactly what is required when we quote.' },
        { q: 'Can you ship a single box by road?', a: 'Yes. Single boxes are consolidated with other shipments on the same route, which keeps the price low.' },
      ],
    },
    {
      slug: 'express-courier', name: 'Express Courier & Documents', icon: 'document', serviceType: 'Courier service',
      short: 'Fast, careful delivery of documents, contracts, certificates and small parcels from Riyadh.',
      image: { src: 'boxes.jpg', alt: 'RetEx Express branded parcels ready for courier dispatch' },
      meta: { title: 'Express Courier Riyadh: Documents & Parcels | RetEx Express', description: 'Express courier in Riyadh for documents, certificates and small parcels. Pickup from your door and delivery across Saudi Arabia, the GCC and worldwide.' },
      h1: 'Express courier in Riyadh for documents and parcels',
      lead: 'Contracts, passports, certificates, invoices, gifts and small parcels collected from your door in Riyadh and delivered quickly and safely across Saudi Arabia, the GCC and worldwide.',
      sections: [
        { h2: 'Documents without the hassle', paragraphs: ['Legal papers, attested certificates, visa documents, tenders, bank papers and contracts need to arrive on time and intact. We pick up from your home or office, seal documents in protective envelopes, and dispatch them on the next departure. For attested documents and originals we recommend the fastest available service and signature on delivery.'] },
        { h2: 'Small parcels, big care', list: ['Gifts and personal items for family abroad', 'Phones, accessories and small electronics', 'Clothing, abayas, perfumes and cosmetics (within airline rules)', 'Medicines with a prescription where the destination allows', 'Online orders for your customers'] },
        { h2: 'Domestic express within Saudi Arabia', paragraphs: ['Riyadh to Jeddah, Dammam, Makkah, Madinah, Abha, Tabuk and every other city: our domestic courier service collects in Riyadh and delivers to the door anywhere in the Kingdom. Customers regularly tell us how quickly their parcels reached Jeddah. See the <a href="@@/destinations/saudi-arabia/">domestic shipping page</a> for details.'] },
        { h2: 'How to send a courier shipment', paragraphs: ['Message us the destination and what you are sending. We quote, collect the item (or you can drop it at our office in Al Aziziyah), pack it and dispatch it on the next available departure. We confirm on WhatsApp as soon as the shipment is on its way.'] },
      ],
      relatedDestinations: ['saudi-arabia', 'uae', 'jordan', 'egypt', 'international'],
      faq: [
        { q: 'Can you collect documents from my office in Riyadh?', a: 'Yes. Pickups are available across Riyadh during our opening hours. Send the location pin on WhatsApp and we will confirm a time.' },
        { q: 'Do you send courier shipments outside the Middle East?', a: 'Yes. Express courier is available to worldwide destinations by air. Ask for a quote for your destination and we will confirm the service.' },
        { q: 'Is signature on delivery available?', a: 'Yes. For documents and valuable parcels we can require the recipient’s signature at delivery. Tell us when you book.' },
      ],
    },
    {
      slug: 'business-samples', name: 'Business Samples', icon: 'box', serviceType: 'Sample shipping',
      short: 'Product samples, prototypes and small B2B orders between Riyadh, China, the GCC and worldwide.',
      image: { src: 'world-map.jpg', alt: 'World map with connected routes, representing international sample shipping' },
      meta: { title: 'Business Sample Shipping: Riyadh, China & GCC | RetEx Express', description: 'Ship product samples, prototypes and small B2B orders between Riyadh and China, the GCC and worldwide. Fast, documented and door-to-door for traders.' },
      h1: 'Business sample shipping between Riyadh, China and the GCC',
      lead: 'For importers, wholesalers, online sellers and manufacturers who need samples to move quickly and arrive with the right paperwork. We ship samples from Riyadh to suppliers and customers abroad, and bring samples from China and the GCC to your door in Riyadh.',
      sections: [
        { h2: 'Samples in both directions', paragraphs: ['Sourcing from China? We receive samples from your supplier and deliver them to you in Riyadh. Selling to the Gulf? We send your product samples to buyers in Dubai, Doha, Kuwait, Manama and Muscat. Preparing a tender or an exhibition? We ship demo units and marketing materials wherever the meeting is.'] },
        { h2: 'What counts as a business sample', list: ['Product samples from factories and suppliers', 'Prototypes and pre-production units', 'Fabric, material and colour swatches', 'Catalogues, brochures and marketing kits', 'Small B2B orders and reorders', 'Spare parts sent to customers'] },
        { h2: 'Paperwork done right', paragraphs: ['Samples still need a commercial or proforma invoice and a clear description for customs. We prepare the documents with you, label the shipment correctly and choose the service that balances speed and cost: express courier for a few pieces, <a href="@@/services/air-cargo/">air cargo</a> for larger consignments, <a href="@@/services/road-freight/">road freight</a> for samples to the GCC.'] },
        { h2: 'Built for e-commerce sellers', paragraphs: ['If you sell online in Saudi Arabia or the Gulf, we can also ship your customer orders: single parcels by courier, batches by road to the GCC, and restocking from China by air or sea. One contact, one quote, one invoice.'] },
      ],
      relatedDestinations: ['china', 'uae', 'qatar', 'kuwait', 'international'],
      faq: [
        { q: 'Can you receive samples from my supplier in China?', a: 'Yes. Share the supplier’s details and we coordinate the pickup in China and the delivery to your address in Riyadh.' },
        { q: 'Do samples pay customs duty?', a: 'It depends on the destination and the declared value. Low-value samples are often duty-free, but each country has its own rules. We advise you when preparing the invoice.' },
        { q: 'Can you ship samples to several customers at once?', a: 'Yes. Give us the list of recipients and we dispatch each parcel separately with its own documents and tracking.' },
      ],
    },
    {
      slug: 'door-to-door', name: 'Door-to-Door Delivery', icon: 'door', serviceType: 'Door-to-door delivery',
      short: 'Pickup from your home, office or shop in Riyadh and delivery to the recipient, abroad or in Saudi Arabia.',
      image: { src: 'truck.jpg', alt: 'RetEx Express truck collecting and delivering parcels door to door in Riyadh' },
      meta: { title: 'Door-to-Door Cargo & Pickup in Riyadh | RetEx Express', description: 'Door-to-door cargo from Riyadh: we pick up from your home or office and deliver to the recipient abroad or anywhere in Saudi Arabia. One price, one contact.' },
      h1: 'Door-to-door cargo and courier from Riyadh',
      lead: 'No trips to the airport, no waiting at depots. We collect your shipment anywhere in Riyadh and deliver it to the recipient’s address in the GCC, Jordan, Egypt, China, worldwide or inside Saudi Arabia.',
      sections: [
        { h2: 'What door-to-door includes', list: ['Pickup from your home, office, shop or warehouse in Riyadh', 'Packing and labelling by our team', 'Export documents and handover to the carrier', 'Transport by air, road or sea depending on the destination', 'Delivery to the recipient’s address, with a signature where requested', 'Updates on WhatsApp from pickup to delivery'] },
        { h2: 'Why customers prefer it', paragraphs: ['Door-to-door means one quote and one point of contact. You do not need to deal with the airline, the trucking company or a customs broker, and the recipient does not need to travel to collect the shipment. For families sending gifts, for busy offices and for online sellers, it is the simplest way to ship.'] },
        { h2: 'Pickup across Riyadh', paragraphs: ['We serve every district of Riyadh from our base in Al Aziziyah, including Al Olaya, Al Malaz, Al Batha, Al Naseem, Al Shifa, Al Rawdah, Al Sulay and the industrial areas. Share your location pin and we will confirm the pickup window.'] },
      ],
      relatedDestinations: ['uae', 'jordan', 'saudi-arabia', 'egypt', 'kuwait'],
      faq: [
        { q: 'Is there an extra charge for pickup in Riyadh?', a: 'Pickup is part of the door-to-door service. We confirm the full price, including pickup, when we quote.' },
        { q: 'Can I drop the shipment at your office instead?', a: 'Yes. You are welcome at our office in Al Aziziyah during opening hours. See the contact page for the map and times.' },
        { q: 'What if the recipient is not home?', a: 'The delivery agent contacts the recipient to arrange a convenient time, and we keep you informed on WhatsApp.' },
      ],
    },
  ],

  destinationsIndex: {
    meta: {
      title: 'Shipping from Riyadh to the GCC & Worldwide | RetEx Express',
      description: 'Destinations served by RetEx Express from Riyadh: UAE, Qatar, Bahrain, Kuwait, Oman, Jordan, Syria, Egypt, China, all Saudi cities and worldwide by air.',
    },
    h1: 'Where we ship from Riyadh',
    lead: 'All GCC countries by air and road, Jordan and Syria by road and air, Egypt and China by air and sea, every city in Saudi Arabia, and worldwide destinations by air. Pick your destination for the options and the paperwork.',
    imageAlt: 'World map with connected shipping routes from Riyadh',
    sections: [
      { h2: 'All GCC by air and road', paragraphs: ['The United Arab Emirates, Qatar, Bahrain, Kuwait and Oman are connected to Riyadh by land, so you can choose between economical road freight and faster air cargo. Both are door to door.'] },
      { h2: 'Jordan, Syria and Egypt', paragraphs: ['Jordan is served by road and air, with onward road delivery into Syria. Egypt is served by air for parcels and documents and by sea for larger cargo.'] },
      { h2: 'China and worldwide', paragraphs: ['Business samples and commercial cargo move between Riyadh and China by air and sea. For every other country we ship by air with door-to-door delivery; message us the destination and we will confirm the service.'] },
    ],
    faq: [
      { q: 'Do you ship to countries not listed here?', a: 'Yes. The pages cover our most requested routes. For any other country, message us the destination and we will confirm the service and quote.' },
      { q: 'Which destinations can be reached by road?', a: 'The UAE, Qatar, Bahrain, Kuwait, Oman, Jordan and Syria. All other destinations are served by air or sea.' },
      { q: 'Do you deliver inside Saudi Arabia?', a: 'Yes. Our domestic courier and cargo service delivers from Riyadh to every city in the Kingdom, including Jeddah, Dammam, Makkah and Madinah.' },
    ],
  },

  destinations: [
    {
      slug: 'uae', code: 'AE', name: 'United Arab Emirates', linkLabel: 'UAE', cardTitle: 'United Arab Emirates', schemaName: 'United Arab Emirates', serviceType: 'Shipping from Riyadh to the United Arab Emirates',
      cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'], modes: ['road', 'air'], image: 'truck.jpg', imageAlt: 'RetEx Express truck on the road from Riyadh to Dubai',
      meta: { title: 'Shipping from Riyadh to Dubai & UAE | Cargo | RetEx Express', description: 'Cargo and courier from Riyadh to Dubai, Abu Dhabi, Sharjah and all UAE by road and air. Door-to-door delivery for parcels, documents and commercial goods.' },
      h1: 'Shipping from Riyadh to Dubai and the UAE',
      lead: 'The UAE is our most popular route. Parcels, documents, e-commerce orders and commercial cargo leave Riyadh by road or by air and are delivered to the door in Dubai, Abu Dhabi, Sharjah, Ajman and the other emirates.',
      sections: [
        { h2: 'Road or air to the UAE?', paragraphs: ['<strong>Road freight</strong> is the economical choice for parcels heavier than a few kilograms, pallets and commercial goods. Trucks leave regularly and deliver door to door. <strong>Air cargo</strong> is the faster option for documents, urgent parcels and high-value items. Tell us what you are sending and we will recommend one.'] },
        { h2: 'What people send from Riyadh to Dubai', list: ['Gifts, clothing and personal parcels for family and friends', 'Documents, contracts and company papers', 'E-commerce orders for customers in the UAE', 'Stock and samples for shops and traders', 'Furniture, appliances and household items when relocating', 'Exhibition materials for events in Dubai'] },
        { h2: 'How it works', paragraphs: ['Message us the destination emirate, the contents and the approximate weight. We quote, collect from your location in Riyadh, pack and label the shipment, prepare the documents and dispatch it on the next truck or flight. The shipment is delivered to the address in the UAE and we update you along the way.'] },
        { h2: 'Documents and restrictions', paragraphs: ['Personal parcels usually need copies of the sender’s and recipient’s ID. Commercial goods need an invoice and a packing list. Some items, such as certain medicines, are restricted; ask us before you pack. Full details are confirmed with your quote.'] },
      ],
      relatedServices: ['road-freight', 'air-cargo', 'door-to-door', 'business-samples'],
      faq: [
        { q: 'Do you deliver to Abu Dhabi, Sharjah and the other emirates?', a: 'Yes. We deliver door to door across the UAE, including Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah and Umm Al Quwain.' },
        { q: 'Can I send a single box from Riyadh to Dubai?', a: 'Yes. Single boxes travel with other shipments on the same route, which keeps the cost low, and are still delivered to the door.' },
        { q: 'Do you ship from Dubai to Riyadh as well?', a: 'Yes. We arrange shipments in both directions, including samples and stock from suppliers in the UAE to your address in Riyadh.' },
      ],
    },
    {
      slug: 'qatar', code: 'QA', name: 'Qatar', linkLabel: 'Qatar', schemaName: 'Qatar', serviceType: 'Shipping from Riyadh to Qatar',
      cities: ['Doha', 'Al Wakrah', 'Al Rayyan', 'Lusail'], modes: ['road', 'air'], image: 'truck.jpg', imageAlt: 'Road freight truck heading from Riyadh to Doha',
      meta: { title: 'Shipping from Riyadh to Qatar (Doha) | Cargo | RetEx Express', description: 'Road and air cargo from Riyadh to Doha and all of Qatar. Parcels, documents, e-commerce orders and commercial shipments delivered door to door by RetEx Express.' },
      h1: 'Shipping from Riyadh to Qatar',
      lead: 'Door-to-door cargo and courier from Riyadh to Doha, Al Wakrah, Al Rayyan, Lusail and every city in Qatar, by road for the best value or by air for speed.',
      sections: [
        { h2: 'Options from Riyadh to Doha', paragraphs: ['Qatar is connected to Saudi Arabia by land, so road freight is the economical choice for parcels, pallets and commercial goods. Air cargo and express courier are available for documents and urgent items.'] },
        { h2: 'Commonly shipped items', list: ['Personal parcels and gifts', 'Documents and company papers', 'E-commerce orders and stock for shops', 'Business samples and exhibition materials', 'Household goods and appliances'] },
        { h2: 'How it works', paragraphs: ['Send us the destination and the shipment details on WhatsApp. We quote, collect from your location in Riyadh, pack and label the goods, handle the border paperwork and deliver to the recipient in Qatar.'] },
        { h2: 'Documents and restrictions', paragraphs: ['Copies of the sender’s and recipient’s ID for personal parcels; invoice and packing list for commercial goods. Restricted items are confirmed before pickup.'] },
      ],
      relatedServices: ['road-freight', 'air-cargo', 'door-to-door', 'business-samples'],
      faq: [
        { q: 'Is road freight available from Riyadh to Doha?', a: 'Yes. Road freight is our most economical service to Qatar and it is delivered door to door.' },
        { q: 'Can you deliver to an office or shop in Doha?', a: 'Yes. We deliver to residential and commercial addresses across Qatar.' },
        { q: 'Do you ship commercial goods to Qatar?', a: 'Yes. Commercial shipments need an invoice and packing list; we prepare the paperwork with you.' },
      ],
    },
    {
      slug: 'bahrain', code: 'BH', name: 'Bahrain', linkLabel: 'Bahrain', schemaName: 'Bahrain', serviceType: 'Shipping from Riyadh to Bahrain',
      cities: ['Manama', 'Muharraq', 'Riffa', 'Isa Town'], modes: ['road', 'air'], image: 'truck.jpg', imageAlt: 'Cargo truck travelling from Riyadh to Bahrain',
      meta: { title: 'Shipping from Riyadh to Bahrain | Cargo & Courier | RetEx Express', description: 'Cargo and courier from Riyadh to Manama and all of Bahrain by road and air. Door-to-door delivery for parcels, documents and commercial shipments.' },
      h1: 'Shipping from Riyadh to Bahrain',
      lead: 'Bahrain is a short road journey from the Eastern Province, which makes road freight from Riyadh to Manama fast and economical. Air cargo and express courier are available for documents and urgent parcels.',
      sections: [
        { h2: 'Options from Riyadh to Manama', paragraphs: ['Road freight for parcels, pallets and commercial goods, delivered to the door across Bahrain. Air cargo and express courier for documents and time-critical items.'] },
        { h2: 'Commonly shipped items', list: ['Gifts and personal parcels', 'Documents and contracts', 'Stock and e-commerce orders for Bahraini customers', 'Business samples', 'Household items'] },
        { h2: 'How it works', paragraphs: ['Message us the details, get a quote, and we collect from your location in Riyadh. We pack, label and dispatch the shipment and deliver it to the recipient in Manama, Muharraq, Riffa or any other city.'] },
        { h2: 'Documents and restrictions', paragraphs: ['ID copies for personal parcels; invoice and packing list for commercial goods. Ask us about restricted items before you pack.'] },
      ],
      relatedServices: ['road-freight', 'express-courier', 'door-to-door', 'air-cargo'],
      faq: [
        { q: 'How do I send a parcel from Riyadh to Bahrain?', a: 'Send us the destination and contents on WhatsApp, receive a quote, and we pick up from your door in Riyadh. The parcel is delivered to the address in Bahrain.' },
        { q: 'Can I send documents to Bahrain?', a: 'Yes. Our express courier service carries documents and small parcels with signature on delivery if required.' },
        { q: 'Do you deliver everywhere in Bahrain?', a: 'Yes. We deliver door to door across the kingdom, including Manama, Muharraq, Riffa, Isa Town and Hamad Town.' },
      ],
    },
    {
      slug: 'kuwait', code: 'KW', name: 'Kuwait', linkLabel: 'Kuwait', schemaName: 'Kuwait', serviceType: 'Shipping from Riyadh to Kuwait',
      cities: ['Kuwait City', 'Hawalli', 'Al Ahmadi', 'Farwaniya'], modes: ['road', 'air'], image: 'truck.jpg', imageAlt: 'Road cargo truck on the route from Riyadh to Kuwait',
      meta: { title: 'Shipping from Riyadh to Kuwait | Cargo & Courier | RetEx Express', description: 'Road and air cargo from Riyadh to Kuwait City, Hawalli, Al Ahmadi and all of Kuwait. Door-to-door delivery of parcels, documents and commercial goods.' },
      h1: 'Shipping from Riyadh to Kuwait',
      lead: 'Regular road departures from Riyadh to Kuwait for parcels, pallets and commercial goods, plus air cargo and express courier for documents and urgent items. Delivered to the door anywhere in Kuwait.',
      sections: [
        { h2: 'Options from Riyadh to Kuwait', paragraphs: ['Road freight is the best value for most shipments to Kuwait. Air cargo and express courier are available when speed is the priority.'] },
        { h2: 'Commonly shipped items', list: ['Personal parcels, gifts and clothing', 'Documents and company papers', 'E-commerce orders and shop stock', 'Business samples and marketing materials', 'Household goods and appliances'] },
        { h2: 'How it works', paragraphs: ['Share the destination and shipment details, get a quote, and we collect from your location in Riyadh. We pack, label and dispatch, manage the border paperwork and deliver to the recipient in Kuwait.'] },
        { h2: 'Documents and restrictions', paragraphs: ['ID copies for personal parcels; invoice and packing list for commercial goods. We confirm restricted items with you before pickup.'] },
      ],
      relatedServices: ['road-freight', 'air-cargo', 'door-to-door', 'express-courier'],
      faq: [
        { q: 'Is there a cheap way to send a parcel from Riyadh to Kuwait?', a: 'Road freight is our most economical service to Kuwait, especially for parcels heavier than a few kilograms, and it is still door to door.' },
        { q: 'Can I ship stock for my shop in Kuwait?', a: 'Yes. We ship commercial goods by road with the invoice and packing list prepared with you.' },
        { q: 'Do you deliver outside Kuwait City?', a: 'Yes. We deliver door to door across all governorates of Kuwait.' },
      ],
    },
    {
      slug: 'oman', code: 'OM', name: 'Oman', linkLabel: 'Oman', schemaName: 'Oman', serviceType: 'Shipping from Riyadh to Oman',
      cities: ['Muscat', 'Salalah', 'Sohar', 'Nizwa'], modes: ['road', 'air'], image: 'truck.jpg', imageAlt: 'Cargo truck on the road from Riyadh to Muscat',
      meta: { title: 'Shipping from Riyadh to Oman (Muscat) | Cargo | RetEx Express', description: 'Road and air cargo from Riyadh to Muscat, Salalah, Sohar and all of Oman. Door-to-door delivery of parcels, documents and commercial shipments.' },
      h1: 'Shipping from Riyadh to Oman',
      lead: 'Door-to-door cargo from Riyadh to Muscat, Salalah, Sohar, Nizwa and every region of Oman, by road for value or by air for speed.',
      sections: [
        { h2: 'Options from Riyadh to Muscat', paragraphs: ['Oman is reachable by road from Saudi Arabia, so road freight is the economical choice for parcels, pallets and commercial goods. Air cargo and express courier cover documents and urgent shipments.'] },
        { h2: 'Commonly shipped items', list: ['Personal parcels and gifts', 'Documents and contracts', 'Commercial goods and e-commerce orders', 'Business samples', 'Household goods'] },
        { h2: 'How it works', paragraphs: ['Message us the details, receive a quote, and we collect from your location in Riyadh. We pack, label and dispatch the shipment and deliver it to the recipient in Oman.'] },
        { h2: 'Documents and restrictions', paragraphs: ['ID copies for personal parcels; invoice and packing list for commercial goods. We confirm any restricted items before pickup.'] },
      ],
      relatedServices: ['road-freight', 'air-cargo', 'door-to-door', 'business-samples'],
      faq: [
        { q: 'Do you deliver to Salalah and Sohar as well as Muscat?', a: 'Yes. Door-to-door delivery is available across Oman, including Muscat, Salalah, Sohar, Nizwa and Sur.' },
        { q: 'Can I send a parcel from Riyadh to Oman by road?', a: 'Yes. Road freight is our most economical service to Oman and is delivered to the door.' },
        { q: 'Do you ship samples to buyers in Oman?', a: 'Yes. Business samples and small B2B orders are shipped by road or by express courier with the right documents.' },
      ],
    },
    {
      slug: 'jordan', code: 'JO', name: 'Jordan', linkLabel: 'Jordan', schemaName: 'Jordan', serviceType: 'Shipping from Riyadh to Jordan',
      cities: ['Amman', 'Zarqa', 'Irbid', 'Aqaba'], modes: ['road', 'air'], image: 'boxes.jpg', imageAlt: 'RetEx Express parcels prepared for shipping from Riyadh to Amman',
      meta: { title: 'Shipping from Riyadh to Jordan (Amman) | Cargo | RetEx Express', description: 'Cargo and courier from Riyadh to Amman, Zarqa, Irbid, Aqaba and all of Jordan by road and air. Door-to-door delivery for parcels, documents and goods.' },
      h1: 'Shipping from Riyadh to Jordan',
      lead: 'Parcels for family, documents, commercial goods and household items shipped from Riyadh to Amman, Zarqa, Irbid, Aqaba and every governorate of Jordan, by road or by air, delivered to the door.',
      sections: [
        { h2: 'Road or air to Amman?', paragraphs: ['Road freight is the economical option for boxes, gifts, clothing and commercial goods. Air cargo and express courier are faster and suit documents and urgent items. Many customers in Riyadh send regular parcels to family in Jordan by road and documents by courier.'] },
        { h2: 'What people send to Jordan', list: ['Gifts, clothing and parcels for family', 'Documents, certificates and papers', 'Household goods when relocating', 'Commercial goods and stock', 'Business samples and exhibition items'] },
        { h2: 'How it works', paragraphs: ['Send us the destination city and the shipment details. We quote, collect from your location in Riyadh, pack and label the goods, handle the export paperwork and deliver to the address in Jordan.'] },
        { h2: 'Documents and restrictions', paragraphs: ['ID copies for personal parcels; invoice and packing list for commercial goods. Some items are restricted at the border; we confirm with you before pickup.'] },
      ],
      relatedServices: ['road-freight', 'air-cargo', 'express-courier', 'door-to-door'],
      faq: [
        { q: 'Can I send a box of gifts from Riyadh to Amman?', a: 'Yes. Boxes of gifts and personal items are shipped by road and delivered to the door in Amman and other cities.' },
        { q: 'Do you deliver to Irbid, Zarqa and Aqaba?', a: 'Yes. Door-to-door delivery is available across Jordan.' },
        { q: 'Can you ship documents to Jordan quickly?', a: 'Yes. Express courier by air is available for documents and small parcels, with signature on delivery if required.' },
      ],
    },
    {
      slug: 'syria', code: 'SY', name: 'Syria', linkLabel: 'Syria', schemaName: 'Syria', serviceType: 'Shipping from Riyadh to Syria',
      cities: ['Damascus', 'Aleppo', 'Homs', 'Latakia'], modes: ['road', 'air'], image: 'boxes.jpg', imageAlt: 'Parcels packed by RetEx Express for shipping from Riyadh to Syria',
      meta: { title: 'Shipping from Riyadh to Syria (Damascus) | RetEx Express', description: 'Cargo and parcel shipping from Riyadh to Damascus, Aleppo, Homs and other Syrian cities by road and air. Door-to-door delivery with the right paperwork.' },
      h1: 'Shipping from Riyadh to Syria',
      lead: 'Parcels for family, personal effects, documents and commercial goods shipped from Riyadh to Damascus, Aleppo, Homs, Latakia and other cities, by road through Jordan or by air, with delivery to the door.',
      sections: [
        { h2: 'Options from Riyadh to Syria', paragraphs: ['Road freight via Jordan is the economical choice for boxes, clothing, household items and commercial goods. Air cargo is available for documents and urgent parcels. Routes and requirements can change; we confirm the current options when you ask for a quote.'] },
        { h2: 'What people send to Syria', list: ['Clothing, gifts and personal parcels for family', 'Household items and personal effects', 'Documents and certificates', 'Commercial goods and stock', 'Medical supplies where regulations allow'] },
        { h2: 'How it works', paragraphs: ['Send us the destination city and the contents. We quote, collect from your location in Riyadh, pack and label the shipment, prepare the paperwork and deliver it to the recipient in Syria.'] },
        { h2: 'Documents and restrictions', paragraphs: ['ID copies for personal parcels; invoice and packing list for commercial goods. Some items are restricted; we confirm the current rules before pickup.'] },
      ],
      relatedServices: ['road-freight', 'air-cargo', 'door-to-door', 'express-courier'],
      faq: [
        { q: 'Do you ship parcels from Riyadh to Damascus?', a: 'Yes. We ship parcels and cargo to Damascus and other Syrian cities by road and by air, delivered to the door.' },
        { q: 'Can I send clothing and gifts to family in Syria?', a: 'Yes. Clothing, gifts and personal items are among the most common shipments on this route.' },
        { q: 'Are there items I cannot send to Syria?', a: 'Yes, some items are restricted at the border or by the airline. Share your list before packing and we will confirm what can travel.' },
      ],
    },
    {
      slug: 'egypt', code: 'EG', name: 'Egypt', linkLabel: 'Egypt', schemaName: 'Egypt', serviceType: 'Shipping from Riyadh to Egypt',
      cities: ['Cairo', 'Alexandria', 'Giza', 'Mansoura'], modes: ['air', 'sea'], image: 'plane.jpg', imageAlt: 'Aircraft representing air cargo from Riyadh to Cairo',
      meta: { title: 'Shipping from Riyadh to Egypt (Cairo) | Cargo | RetEx Express', description: 'Air cargo, courier and sea freight from Riyadh to Cairo, Alexandria, Giza and all of Egypt. Door-to-door delivery for parcels, documents and household goods.' },
      h1: 'Shipping from Riyadh to Egypt',
      lead: 'Air cargo and express courier for parcels and documents, and sea freight for household goods and larger cargo, from Riyadh to Cairo, Alexandria, Giza, Mansoura and every governorate of Egypt.',
      sections: [
        { h2: 'Air or sea to Egypt?', paragraphs: ['<strong>Air cargo</strong> and <strong>express courier</strong> are the fast options for documents, gifts, electronics and parcels. <strong>Sea freight</strong> is the economical option for furniture, appliances, personal effects and bulk commercial cargo.'] },
        { h2: 'What people send to Egypt', list: ['Gifts, clothing and parcels for family', 'Documents, certificates and papers', 'Electronics and phones', 'Household goods and appliances when relocating', 'Commercial goods and samples'] },
        { h2: 'How it works', paragraphs: ['Send us the destination city and the shipment details. We quote the air or sea option, collect from your location in Riyadh, pack and label everything, prepare the documents and deliver to the recipient in Egypt.'] },
        { h2: 'Documents and restrictions', paragraphs: ['ID copies for personal parcels; invoice and packing list for commercial goods. Egyptian customs restrict certain items, so share your list before packing.'] },
      ],
      relatedServices: ['air-cargo', 'sea-cargo', 'express-courier', 'door-to-door'],
      faq: [
        { q: 'Can I send a parcel from Riyadh to Cairo by air?', a: 'Yes. Air cargo and express courier are available to Cairo and all of Egypt, delivered to the door.' },
        { q: 'Do you ship household goods to Egypt by sea?', a: 'Yes. Sea freight is the economical choice for furniture, appliances and personal effects. Share the list of items for a quote.' },
        { q: 'Do you deliver outside Cairo?', a: 'Yes. Door-to-door delivery is available across Egypt, including Alexandria, Giza, Mansoura, Tanta and Upper Egypt.' },
      ],
    },
    {
      slug: 'china', code: 'CN', name: 'China', linkLabel: 'China', schemaName: 'China', serviceType: 'Shipping between Riyadh and China',
      cities: ['Guangzhou', 'Shenzhen', 'Yiwu', 'Shanghai'], modes: ['air', 'sea'], image: 'world-map.jpg', imageAlt: 'World map with routes between Riyadh and China',
      meta: { title: 'Cargo & Samples Between Riyadh and China | RetEx Express', description: 'Business samples, e-commerce stock and cargo between Riyadh and China by air and sea. Pickup from suppliers in China, delivery to your door in Riyadh.' },
      h1: 'Shipping between Riyadh and China',
      lead: 'For importers, online sellers and traders in Riyadh: samples and stock from suppliers in Guangzhou, Shenzhen, Yiwu and Shanghai delivered to your door, and samples or goods from Riyadh sent to partners in China. By air for speed, by sea for volume.',
      sections: [
        { h2: 'China to Riyadh', paragraphs: ['Share your supplier’s details and we coordinate the collection in China, the air or sea transport, the import paperwork and the delivery to your home, shop or warehouse in Riyadh. Small sample batches move by air; larger restocking orders move by sea.'] },
        { h2: 'Riyadh to China', paragraphs: ['Send product samples, returns, documents or marketing materials from Riyadh to your partners in China. We pack, prepare the commercial or proforma invoice and ship by air.'] },
        { h2: 'What moves on this route', list: ['Product samples and prototypes', 'E-commerce stock and restocking orders', 'Electronics, accessories and small goods', 'Fabrics, swatches and materials', 'Catalogues and marketing kits', 'Spare parts'] },
        { h2: 'Paperwork', paragraphs: ['Every shipment needs a clear description, an invoice and, for commercial imports into Saudi Arabia, the documents required by customs. We tell you exactly what is needed before the shipment moves.'] },
      ],
      relatedServices: ['business-samples', 'air-cargo', 'sea-cargo', 'door-to-door'],
      faq: [
        { q: 'Can you collect a sample from my supplier in Guangzhou or Yiwu?', a: 'Yes. Share the supplier’s contact and address and we arrange the pickup in China and the delivery to you in Riyadh.' },
        { q: 'Is sea freight from China to Riyadh available for bigger orders?', a: 'Yes. Restocking orders and bulk goods move by sea at a lower cost per kilogram. Share the volume for a quote.' },
        { q: 'Do you help with import paperwork in Saudi Arabia?', a: 'We advise on the documents needed for your type of goods and prepare the shipping paperwork with you.' },
      ],
    },
    {
      slug: 'saudi-arabia', code: 'SA', name: 'Saudi Arabia (domestic)', linkLabel: 'Within Saudi Arabia', cardTitle: 'Within Saudi Arabia', schemaName: 'Saudi Arabia', serviceType: 'Domestic courier and cargo from Riyadh',
      cities: ['Jeddah', 'Dammam', 'Makkah', 'Madinah'], modes: ['road', 'air'], image: 'boxes.jpg', imageAlt: 'RetEx Express parcels for domestic delivery across Saudi Arabia',
      meta: { title: 'Courier from Riyadh to Jeddah, Dammam & All KSA | RetEx Express', description: 'Domestic courier and cargo from Riyadh to Jeddah, Dammam, Makkah, Madinah, Abha, Tabuk and every city in Saudi Arabia. Pickup in Riyadh, delivery to the door.' },
      h1: 'Courier and cargo from Riyadh to every city in Saudi Arabia',
      lead: 'Documents, parcels and cargo collected from your door in Riyadh and delivered to Jeddah, Dammam, Al Khobar, Makkah, Madinah, Abha, Tabuk, Al Qassim and every other city in the Kingdom.',
      sections: [
        { h2: 'Fast domestic delivery', paragraphs: ['Our domestic service moves parcels by road and, for urgent shipments, by air. Customers regularly tell us how quickly their parcels reached Jeddah. Whether it is a document for a government office in Dammam or a box of stock for a shop in Abha, we collect in Riyadh and deliver to the address.'] },
        { h2: 'What we deliver within Saudi Arabia', list: ['Documents, contracts and certificates', 'Parcels and gifts', 'E-commerce orders to your customers', 'Stock and samples for shops and businesses', 'Boxes and household items', 'Larger cargo by road'] },
        { h2: 'How it works', paragraphs: ['Message us the destination city and what you are sending. We quote, collect from your location in Riyadh, pack and label the shipment and deliver it to the door.'] },
      ],
      relatedServices: ['express-courier', 'door-to-door', 'road-freight', 'air-cargo'],
      faq: [
        { q: 'Do you deliver from Riyadh to Jeddah?', a: 'Yes. Riyadh to Jeddah is one of our most frequent domestic routes, with delivery to the door.' },
        { q: 'Can you ship to Dammam and Al Khobar?', a: 'Yes. We deliver across the Eastern Province, including Dammam, Al Khobar, Dhahran, Jubail and Al Ahsa.' },
        { q: 'Do you deliver within Riyadh as well?', a: 'Yes. Same-city courier within Riyadh is available for documents and parcels.' },
      ],
    },
    {
      slug: 'international', code: 'WW', name: 'Worldwide', linkLabel: 'Worldwide', cardTitle: 'Worldwide', schemaName: 'Worldwide', schemaType: 'Place', serviceType: 'International courier and cargo from Riyadh',
      cities: ['South Asia', 'Southeast Asia', 'Europe', 'Americas'], modes: ['air', 'sea'], image: 'plane.jpg', imageAlt: 'Aircraft representing international air cargo from Riyadh',
      meta: { title: 'International Courier & Cargo from Riyadh | RetEx Express', description: 'International courier and air cargo from Riyadh to destinations across Asia, Europe and the Americas. Door-to-door delivery. Ask for a quote for your country.' },
      h1: 'International shipping from Riyadh to the rest of the world',
      lead: 'Beyond the GCC and the Middle East, RetEx Express ships documents, parcels and cargo by air to worldwide destinations, with sea freight for larger shipments to selected countries. Message us your destination and we will confirm the service.',
      sections: [
        { h2: 'Worldwide coverage from Riyadh', paragraphs: ['Ask for a quote for any country in the regions below; we confirm the available service before you book:'], list: ['South Asia and the Indian subcontinent', 'Southeast Asia', 'Europe and the United Kingdom', 'North America', 'Africa', 'Turkey and the wider Middle East'] },
        { h2: 'What people send abroad', paragraphs: ['Gifts and clothing for family, documents and certificates, electronics, personal effects when moving home, and commercial goods and samples for business partners. For heavy household shipments we also offer sea freight to selected countries.'] },
        { h2: 'How it works', paragraphs: ['Message us the country and city, the contents and the approximate weight. We quote the courier, air cargo or sea freight option, collect from your location in Riyadh, pack and label the shipment, prepare the export documents and deliver it to the recipient.'] },
        { h2: 'Documents and restrictions', paragraphs: ['Every country has its own import rules. Personal parcels usually need ID copies; commercial goods need an invoice and packing list. Some items, such as certain foods, medicines and batteries, are restricted by airlines or customs. Ask us before you pack.'] },
      ],
      relatedServices: ['air-cargo', 'express-courier', 'sea-cargo', 'door-to-door'],
      faq: [
        { q: 'Do you ship to India, Pakistan and other countries in Asia?', a: 'We ship worldwide by air. Message us the country and city and we will confirm the service and quote for that destination.' },
        { q: 'Is sea freight available for large international shipments?', a: 'For selected countries, yes. Share the destination and the volume and we will confirm whether sea freight is available.' },
        { q: 'Is my country covered if it is not listed?', a: 'We ship by air to most countries in the world. Message us the destination and we will confirm the service.' },
      ],
    },
  ],

  about: {
    meta: {
      title: 'About RetEx Express | Courier & Cargo in Al Aziziyah, Riyadh',
      description: 'RetEx Express has shipped parcels and cargo from Al Aziziyah, Riyadh since 2016. Air, road and sea freight to the GCC, Jordan, Egypt, China and worldwide.',
    },
    h1: 'About RetEx Express',
    lead: 'A courier and cargo company from Al Aziziyah, Riyadh, serving families, businesses and online sellers since 2016. Our promise is simple: your trust is our priority.',
    heroAlt: 'RetEx Express branded parcels',
    sections: [
      { h2: 'Who we are', paragraphs: ['RetEx Express started in 2016 in Al Aziziyah, in the south of Riyadh, with one goal: make it easy for people in the city to send things home and for businesses to move goods across borders without stress. Today we ship documents, parcels, commercial cargo and business samples by air, road and sea to the GCC, Jordan, Syria, Egypt, China and worldwide, and we deliver across every city in Saudi Arabia.'] },
      { h2: 'What we do', paragraphs: ['We pick up from your door in Riyadh, pack and label the shipment, prepare the paperwork and hand it to the right carrier: an airline for <a href="@@/services/air-cargo/">air cargo</a>, our trucking partners for <a href="@@/services/road-freight/">road freight</a> to the GCC and Jordan, or a shipping line for <a href="@@/services/sea-cargo/">sea cargo</a>. At the destination the shipment is delivered to the recipient’s door.'] },
      { h2: 'Who we serve', list: ['Families in Riyadh sending gifts and parcels to relatives in the Gulf, Jordan, Syria, Egypt and abroad', 'Small businesses and shops moving stock between Riyadh and the GCC', 'Online sellers who need reliable delivery to customers and restocking from China', 'Companies sending documents, samples and exhibition materials', 'Anyone relocating who needs household goods shipped by sea or road'] },
      { h2: 'Our promise', paragraphs: ['Fast, safe and reliable. We quote clearly before you ship, we handle every parcel with care, and we keep you informed on WhatsApp from pickup to delivery. Our customers’ reviews on Google say it better than we can.'] },
    ],
    factsTitle: 'At a glance',
    facts: [
      { label: 'Founded', value: '2016' },
      { label: 'Location', value: 'Al Aziziyah, Riyadh, Saudi Arabia' },
      { label: 'Services', value: 'Air cargo, sea cargo, road freight, express courier, business samples, door-to-door' },
      { label: 'Destinations', value: 'GCC, Jordan, Syria, Egypt, China, all Saudi cities, worldwide' },
      { label: 'Languages', value: 'Arabic and English' },
      { label: 'Google listing', value: '<a href="https://www.google.com/maps/place/?q=place_id:ChIJd82CJPAJLz4RzwIZFy9osBE" rel="noopener" target="_blank">RETEX Express Shipping on Google Maps</a>' },
    ],
    imageAlt: 'RetEx Express flyer: anywhere in the world, we deliver to your doorstep. All GCC by air and road.',
    imageCaption: 'Our services and destinations at a glance.',
  },

  contact: {
    meta: {
      title: 'Contact RetEx Express | Al Aziziyah, Riyadh | WhatsApp & Phone',
      description: 'Contact RetEx Express in Al Aziziyah, Riyadh. Call or WhatsApp +966 55 873 6359. Open Sat–Thu 8:30 AM–11 PM, Fri 4–9:30 PM. Map and directions.',
    },
    h1: 'Contact RetEx Express in Riyadh',
    lead: 'The fastest way to reach us is WhatsApp. Send your shipment details and location and we reply with a quote and a pickup time. You are also welcome at our office in Al Aziziyah.',
    directionsText: 'We are in Al Aziziyah, south Riyadh. Open the map for turn-by-turn directions, or send us a message and we will share the exact location pin.',
    mapTitle: 'Map showing the location of RetEx Express in Al Aziziyah, Riyadh',
    sections: [
      { h2: 'Before you visit', paragraphs: ['Bring the items unpacked or packed, as you prefer; we can pack them for you. For international shipments bring a copy of your ID and the recipient’s full address and phone number. For commercial goods bring the invoice and packing list, or send them on WhatsApp in advance.'] },
      { h2: 'Prefer a pickup?', paragraphs: ['We collect from homes, offices and shops across Riyadh during opening hours. Share your location pin on WhatsApp and we will confirm a window. Learn more about <a href="@@/services/door-to-door/">door-to-door delivery</a>.'] },
    ],
    faq: [
      { q: 'What are your opening hours?', a: 'Saturday to Thursday from 8:30 AM to 11:00 PM and Friday from 4:00 PM to 9:30 PM.' },
      { q: 'Which number should I use for WhatsApp?', a: 'WhatsApp +966 55 873 6359. You can also call +966 53 235 0108.' },
      { q: 'Where exactly are you located?', a: 'In Al Aziziyah, Riyadh 14512. The plus code is HPXX+QCV Riyadh; open the map on this page for directions.' },
    ],
  },

  quote: {
    meta: {
      title: 'Get a Shipping Quote from Riyadh | RetEx Express',
      description: 'Request a cargo or courier quote from RetEx Express in Riyadh. Tell us the destination, shipment type and weight and receive a price on WhatsApp.',
    },
    h1: 'Get a shipping quote',
    lead: 'Fill in the form and your details open in WhatsApp, ready to send. We reply with the price, the recommended service and the next pickup time.',
    paragraphs: ['Quotes depend on the destination, the weight and dimensions, and whether the shipment is personal or commercial. The more detail you give, the faster we can confirm.'],
    points: ['Destination country and city', 'What you are sending (documents, parcel, cargo, samples)', 'Approximate weight or number of boxes', 'Pickup address in Riyadh, or drop-off at our office'],
    form: {
      name: 'Your name', phone: 'Phone / WhatsApp', destination: 'Destination', choose: 'Choose a destination', type: 'Shipment type',
      types: ['Documents', 'Parcel / gift', 'Commercial cargo', 'Business samples', 'Household goods', 'Other'],
      weight: 'Approximate weight (kg)', weightPlaceholder: 'e.g. 5', notes: 'Details (contents, pickup address, dates)', submit: 'Send on WhatsApp',
      help: 'Prefer to type it yourself? Message us directly on', helpLink: 'WhatsApp',
      waIntro: 'Hello RetEx Express, I would like a shipping quote:',
      errors: { name: 'Please enter your name.', phone: 'Please enter a valid phone number.' },
    },
    faq: [
      { q: 'How quickly will I get a quote?', a: 'We reply as quickly as we can during opening hours. Outside those hours we reply when we open.' },
      { q: 'Does the quote include pickup and delivery?', a: 'Yes. Our door-to-door quotes include pickup in Riyadh and delivery to the recipient’s address.' },
      { q: 'How can I pay?', a: 'We confirm the accepted payment methods with your quote. Payment is made when the shipment is booked.' },
    ],
  },

  faqPage: {
    meta: {
      title: 'Shipping FAQ: Cargo & Courier from Riyadh | RetEx Express',
      description: 'Answers to common questions about shipping from Riyadh with RetEx Express: pickup, destinations, packing, documents, restricted items, quotes and payment.',
    },
    h1: 'Frequently asked questions',
    lead: 'Everything customers ask before shipping from Riyadh with RetEx Express. Still have a question? Message us on WhatsApp.',
    groups: [
      { title: 'Booking and pickup', items: [
        { q: 'How do I book a shipment?', a: 'Message us on WhatsApp with the destination, the contents and the approximate weight. We reply with a quote, and once you confirm we arrange the pickup or you drop the shipment at our office in Al Aziziyah.' },
        { q: 'Do you pick up from anywhere in Riyadh?', a: 'Yes. We collect from homes, offices, shops and warehouses across Riyadh during opening hours.' },
        { q: 'Can I drop off at your office?', a: 'Yes. We are in Al Aziziyah, Riyadh, open Saturday to Thursday 8:30 AM to 11:00 PM and Friday 4:00 PM to 9:30 PM.' },
        { q: 'Do I need to be present at pickup?', a: 'Someone needs to hand over the shipment and, for international parcels, a copy of the sender’s ID.' },
      ] },
      { title: 'Destinations and services', items: [
        { q: 'Which countries do you ship to?', a: 'All GCC countries, Jordan, Syria, Egypt and China, every city in Saudi Arabia, and worldwide destinations by air.' },
        { q: 'Which countries can be reached by road?', a: 'The UAE, Qatar, Bahrain, Kuwait, Oman, Jordan and Syria.' },
        { q: 'What is the difference between courier and cargo?', a: 'Courier is for documents and small parcels that move quickly on express services. Cargo covers heavier or commercial shipments by air, road or sea. We recommend the right one for what you send.' },
        { q: 'Do you offer airport-to-airport service?', a: 'Yes, for air cargo customers who prefer to collect at the destination airport.' },
      ] },
      { title: 'Packing, documents and restrictions', items: [
        { q: 'Do you pack shipments?', a: 'Yes. Our team packs documents, parcels and fragile items with suitable materials before dispatch.' },
        { q: 'What documents do I need?', a: 'Personal parcels: copies of the sender’s and recipient’s ID. Commercial goods: an invoice and packing list. Some destinations have extra requirements that we confirm with your quote.' },
        { q: 'Which items are restricted?', a: 'Airlines and customs restrict items such as loose lithium batteries, aerosols, flammable liquids, certain medicines and foods. Share your list before packing and we will confirm what can travel.' },
        { q: 'Can you ship perfumes and cosmetics?', a: 'Often yes, within airline and destination rules. Tell us the quantity and we will confirm.' },
      ] },
      { title: 'Prices, updates and payment', items: [
        { q: 'How are prices calculated?', a: 'By destination, service (air, road or sea), weight or volume, and whether the shipment is personal or commercial. You receive the full price before you ship.' },
        { q: 'How do I know where my shipment is?', a: 'We keep you updated on WhatsApp from pickup to delivery, and we share the carrier reference when one is available.' },
        { q: 'How do I pay?', a: 'We confirm the accepted payment methods with your quote. Payment is made when the shipment is booked.' },
      ] },
    ],
  },

  privacy: {
    meta: { title: 'Privacy Policy | RetEx Express, Riyadh', description: 'How RetEx Express collects, uses and protects the personal information you share when you request a quote, book a shipment or contact us from Riyadh.' },
    h1: 'Privacy policy',
    updated: '4 October 2026',
    sections: [
      { h2: 'Who we are', paragraphs: ['RetEx Express (listed on Google as RETEX Express Shipping) is a courier and cargo company located in Al Aziziyah, Riyadh, Saudi Arabia. This policy explains how we handle personal information collected through this website and our customer channels.'] },
      { h2: 'What we collect', paragraphs: ['When you request a quote or book a shipment we collect the information needed to move it: your name, phone number, pickup address, the recipient’s name, address and phone number, and a description of the contents. The quote form on this website does not store data on our servers; it opens a pre-filled message in WhatsApp that you choose to send.'] },
      { h2: 'How we use it', paragraphs: ['We use your information to quote, collect, document, transport and deliver shipments, to comply with customs and carrier requirements, and to contact you about your shipment. We share it only with the carriers, customs authorities and partners involved in delivering your shipment.'] },
      { h2: 'Cookies and analytics', paragraphs: ['This website sets no tracking cookies of its own. Embedded services such as Google Maps and Google Fonts may set their own cookies according to their policies.'] },
      { h2: 'Your rights', paragraphs: ['You may ask us to correct or delete the personal information we hold about you, subject to the records we must keep for customs and legal purposes. Contact us on WhatsApp or by phone to make a request.'] },
    ],
  },

  terms: {
    meta: { title: 'Terms of Service | RetEx Express, Riyadh', description: 'Terms that apply when you ship documents, parcels or cargo with RetEx Express from Riyadh: quotes, packing, prohibited items, documents, liability and delivery.' },
    h1: 'Terms of service',
    updated: '4 October 2026',
    sections: [
      { h2: 'Quotes and bookings', paragraphs: ['Quotes are based on the information you provide (destination, weight, dimensions and contents). If the shipment differs at pickup, the price may be adjusted before dispatch. A booking is confirmed when the shipment is handed over and the agreed payment is made.'] },
      { h2: 'Contents and prohibited items', paragraphs: ['You are responsible for declaring the contents accurately. Items prohibited by Saudi law, the destination country, the airline, trucking line or shipping line cannot be carried. Undeclared or prohibited items may be refused, returned or handed to the authorities, and any resulting costs are borne by the sender.'] },
      { h2: 'Documents and customs', paragraphs: ['The sender must provide the documents required for export and import. Customs duties, taxes and inspection fees in the destination country are the responsibility of the sender or recipient unless agreed otherwise in writing.'] },
      { h2: 'Delivery', paragraphs: ['We dispatch shipments on the next available departure for the chosen service. Transit times are estimates and depend on carriers, customs and local conditions; they are not guaranteed.'] },
      { h2: 'Liability', paragraphs: ['We handle every shipment with care. Our liability for loss or damage is limited to the terms agreed at booking and the applicable carrier conditions. Additional cover can be arranged on request before dispatch.'] },
      { h2: 'Contact', paragraphs: ['Questions about these terms can be sent on WhatsApp to +966 55 873 6359 or raised at our office in Al Aziziyah, Riyadh.'] },
    ],
  },

  notFound: {
    meta: { title: 'Page Not Found (404) | RetEx Express Riyadh', description: 'The page you requested does not exist on the RetEx Express website. Go back to the home page, browse our services and destinations, or contact us on WhatsApp.' },
    h1: 'We could not find that page',
    text: 'The link may be out of date. Use the buttons below to find what you need, or message us on WhatsApp and we will help.',
  },
};
