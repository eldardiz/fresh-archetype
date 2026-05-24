// GROQ queries — one per Sanity document type
// All image fields return { asset: { _ref } } — use urlFor() from lib/sanity.ts

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    restaurantName, tagline, description,
    contact { phone, email, address, googleMapsUrl, googleMapsEmbedSrc },
    hours { full, brunch, closedOn },
    booking { url, ctaLabel },
    social { instagram, instagramUrl, facebook, tripadvisor }
  }
`

export const HERO_QUERY = `
  *[_type == "heroSection"][0] {
    eyebrow, heading, subheading, ctaLabel, discoverLabel,
    image { asset, hotspot, crop }
  }
`

export const FEATURED_OFFERING_QUERY = `
  *[_type == "featuredOfferingSection"][0] {
    eyebrow, heading, body, hoursCallout, signatureItems, ctaLabel, menuCtaLabel,
    image { asset, hotspot, crop },
    menuCards[]{label, name, price, image{asset, hotspot, crop}}
  }
`

export const ABOUT_QUERY = `
  *[_type == "aboutSection"][0] {
    eyebrow, heading, body, meta,
    image { asset, hotspot, crop }
  }
`

export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(order asc) {
    _id, quote, name, source, rating
  }
`
