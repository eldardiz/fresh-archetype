import { client } from './sanity'
import type {
  SiteSettingsData, HeroData, FeaturedOfferingData, AboutData,
  TestimonialData,
} from './sanity.types'

export interface HomepageData {
  siteSettings: SiteSettingsData | null
  hero: HeroData | null
  featuredOffering: FeaturedOfferingData | null
  about: AboutData | null
  testimonials: TestimonialData[]
}

const HOMEPAGE_QUERY = `{
  "siteSettings": *[_type == "siteSettings"][0]{
    restaurantName, tagline, description,
    contact{phone, email, address, googleMapsUrl, googleMapsEmbedSrc},
    hours{full, brunch, closedOn},
    booking{url, ctaLabel},
    social{instagram, instagramUrl, facebook, tripadvisor}
  },
  "hero": *[_type == "heroSection"][0]{
    eyebrow, heading, subheading, ctaLabel, discoverLabel,
    image{asset, hotspot, crop}
  },
  "featuredOffering": *[_type == "featuredOfferingSection"][0]{
    eyebrow, heading, body, hoursCallout, signatureItems, ctaLabel, menuCtaLabel,
    image{asset, hotspot, crop},
    menuCards[]{label, name, price, image{asset, hotspot, crop}}
  },
  "about": *[_type == "aboutSection"][0]{
    eyebrow, heading, body, meta,
    image{asset, hotspot, crop}
  },
  "testimonials": *[_type == "testimonial"] | order(order asc){
    _id, quote, name, source, rating
  }
}`

const EMPTY: HomepageData = {
  siteSettings: null,
  hero: null,
  featuredOffering: null,
  about: null,
  testimonials: [],
}

export async function getHomepage(): Promise<HomepageData> {
  if (!client) return EMPTY
  try {
    const data = await client.fetch<HomepageData>(HOMEPAGE_QUERY, {}, {
      next: { revalidate: 60, tags: ['homepage'] },
    })
    return {
      ...EMPTY,
      ...data,
      testimonials: data?.testimonials ?? [],
    }
  } catch (err) {
    console.error('[sanity] getHomepage failed, falling back to hardcoded content:', err)
    return EMPTY
  }
}

export async function getSiteSettings(): Promise<SiteSettingsData | null> {
  if (!client) return null
  try {
    return await client.fetch<SiteSettingsData | null>(
      `*[_type == "siteSettings"][0]{
        restaurantName, tagline, description,
        contact{phone, email, address, googleMapsUrl, googleMapsEmbedSrc},
        hours{full, brunch, closedOn},
        booking{url, ctaLabel},
        social{instagram, instagramUrl, facebook, tripadvisor}
      }`,
      {},
      { next: { revalidate: 60, tags: ['siteSettings'] } },
    )
  } catch (err) {
    console.error('[sanity] getSiteSettings failed:', err)
    return null
  }
}
