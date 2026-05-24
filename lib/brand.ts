// Brand config — the single source of truth for every site spawned from this archetype.
// All components read from here. NEVER hardcode business-specific data in components.
//
// To spin up a new mockup or production site, edit ONLY this file (and swap images
// under public/images/). The component layer should not need changes.
//
// Defaults below match the Claude Design Template 02 output (a bakery/juice/café
// in NYC's West Village). Replace per project — these are placeholders that
// demonstrate what a fully-populated Fresh site looks like.

export const brand = {
  // ── Identity ────────────────────────────────────────────────────────────────
  identity: {
    name: 'Fresh',
    legalName: 'Fresh Bakery & Juice Co.',
    tagline: 'Bakery, juice bar & café',
    description: 'A bakery, juice bar & café on the corner of Hudson & Charles. Sourdough from 7, espresso always, oat milk on the house.',
    established: 'MMXIX',
    coordinates: {
      lat: '',
      lng: '',
    },
    locale: 'en' as 'en' | 'fr' | 'de' | 'es' | 'it',
  },

  // ── Productization metadata ─────────────────────────────────────────────────
  businessType: 'bakery' as 'restaurant' | 'winery' | 'bakery',
  archetype: 'fresh' as 'editorial' | 'maison' | 'atelier' | 'fresh',

  // ── Contact ─────────────────────────────────────────────────────────────────
  contact: {
    phone: '(212) 555-0100',
    email: 'hello@fresh.co',
    address: '412 Hudson St, NY 10014',
    cityShort: 'Hudson & Charles',
    googleMapsUrl: '',
    googleMapsEmbedSrc: '',
  },

  // ── Hours ───────────────────────────────────────────────────────────────────
  hours: {
    full: '7am – 9pm',
    lunch: '',
    dinner: '',
    featured: '',
    closedOn: '',
  },

  // ── Booking / reservation ───────────────────────────────────────────────────
  booking: {
    system: 'url' as 'thefork' | 'resy' | 'opentable' | 'tock' | 'phone' | 'url' | 'none',
    widgetId: '',
    url: '',
    ctaLabel: 'Book a table',
  },

  // ── Social ──────────────────────────────────────────────────────────────────
  social: {
    instagram: '',
    instagramUrl: '',
    facebook: '',
    tripadvisor: '',
    yelp: '',
  },

  // ── Hero-specific content (Fresh archetype) ─────────────────────────────────
  // These drive the small decorations around the giant brand name in the hero.
  hero: {
    categoryPill: 'Bakery · Juice · Café',
    openPill: 'Open today · 7am – 9pm',
    chips: ['Est. 2019', 'West Village, NYC', 'B-Corp'] as readonly string[],
    tickerLeft: {
      label: 'Now pouring',
      value: 'Cold-pressed grapefruit · ginger · rosemary',
    },
    tickerRight: ['Sourdough drops at 8am', 'Croissants Sat & Sun'] as readonly string[],
  },

  // ── Section flags ───────────────────────────────────────────────────────────
  sections: {
    featuredOffering: true,
    artisans: true,
    signature: true,
    about: true,
    faq: true,
    testimonials: true,
    contact: true,
  },

  // ── Featured offering ───────────────────────────────────────────────────────
  featuredOffering: {
    sectionLabel: 'Featured',
  },

  // ── Menu / catalog ──────────────────────────────────────────────────────────
  menu: {
    type: 'pdf' as 'pdf' | 'photo' | 'url',
    src: '',
  },

  // ── Instagram feed ──────────────────────────────────────────────────────────
  instagram: {
    handle: '',
    embedId: '',
  },

  // ── Meta / analytics ────────────────────────────────────────────────────────
  meta: {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com',
    gaId: '',
    metaPixelId: '',
  },
} as const

export const FEATURED_OFFERING_LABEL: Record<typeof brand.businessType, string> = {
  restaurant: 'Signature',
  winery: 'Our wines',
  bakery: 'Daily selection',
}

export const LOCATION_SHOWCASE_LABEL: Record<typeof brand.businessType, string> = {
  restaurant: 'Terrace',
  winery: 'Tasting room',
  bakery: 'The café',
}
