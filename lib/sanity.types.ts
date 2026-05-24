import type { SanityImageSource } from '@sanity/image-url'

export type { SanityImageSource }

export interface SanityImage {
  asset: { _ref: string; _type: string }
  hotspot?: { x: number; y: number; width: number; height: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

export interface SiteSettingsData {
  restaurantName: string
  tagline: string
  description: string
  contact: {
    phone: string
    email: string
    address: string
    googleMapsUrl: string
    googleMapsEmbedSrc: string
  }
  hours: { full: string; brunch: string; closedOn: string }
  booking: { url: string; ctaLabel: string }
  social: { instagram: string; instagramUrl: string; facebook: string; tripadvisor: string }
}

export interface HeroData {
  eyebrow: string
  heading: string
  subheading: string
  ctaLabel: string
  discoverLabel: string
  image: SanityImage
}

export interface MenuCardData {
  label?: string
  name: string
  price?: string
  image?: SanityImage
}

export interface FeaturedOfferingData {
  eyebrow: string
  heading: string
  body: string
  hoursCallout: string
  signatureItems: string[]
  ctaLabel: string
  menuCtaLabel: string
  image: SanityImage
  menuCards?: MenuCardData[]
}

export interface AboutMetaFact {
  label: string
  value: string
}

export interface AboutData {
  eyebrow: string
  heading: string
  body: Array<{ _type: string; children: Array<{ text: string }> }>
  meta?: AboutMetaFact[]
  image: SanityImage
}

export interface TestimonialData {
  _id: string
  quote: string
  name: string
  source: string
  rating: number
}
