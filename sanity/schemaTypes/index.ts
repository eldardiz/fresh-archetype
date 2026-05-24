import { siteSettings } from './siteSettings'
import { heroSection } from './heroSection'
import { featuredOfferingSection } from './featuredOfferingSection'
import { aboutSection } from './aboutSection'
import { testimonial } from './testimonial'

export const schemaTypes = [
  // Singletons (one document per site)
  siteSettings,
  heroSection,
  featuredOfferingSection,
  aboutSection,
  // Collections (multiple documents)
  testimonial,
]
