import { defineField, defineType } from 'sanity'

// Site-wide settings. Singleton — one document per site.
// Field names retain "restaurantName" for backward-compat with existing components
// across all archetypes; field titles shown in Studio are business-agnostic.
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // @ts-expect-error -- runtime field not typed in Sanity v3
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'restaurantName', title: 'Business name', type: 'string' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'description', title: 'Description (SEO meta)', type: 'text', rows: 3 }),
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'object',
      fields: [
        defineField({ name: 'phone', title: 'Phone', type: 'string' }),
        defineField({ name: 'email', title: 'Email', type: 'string' }),
        defineField({ name: 'address', title: 'Address', type: 'string' }),
        defineField({ name: 'googleMapsUrl', title: 'Google Maps URL', type: 'url' }),
        defineField({ name: 'googleMapsEmbedSrc', title: 'Google Maps embed (iframe src)', type: 'string' }),
      ],
    }),
    defineField({
      name: 'hours',
      title: 'Opening hours',
      type: 'object',
      fields: [
        defineField({ name: 'full', title: 'Full hours summary', type: 'string', description: 'e.g. "Daily 6:30am – 2:00am"' }),
        defineField({ name: 'brunch', title: 'Featured hours (brunch / tasting / morning)', type: 'string', description: 'e.g. "Weekends 10am – 3pm"' }),
        defineField({ name: 'closedOn', title: 'Closed', type: 'string' }),
      ],
    }),
    defineField({
      name: 'booking',
      title: 'Booking',
      type: 'object',
      fields: [
        defineField({ name: 'url', title: 'Booking URL', type: 'url' }),
        defineField({ name: 'ctaLabel', title: 'Button label', type: 'string' }),
      ],
    }),
    defineField({
      name: 'social',
      title: 'Social',
      type: 'object',
      fields: [
        defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram handle (without @)', type: 'string' }),
        defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
        defineField({ name: 'tripadvisor', title: 'TripAdvisor URL', type: 'url' }),
      ],
    }),
  ],
  preview: { select: { title: 'restaurantName' } },
})
