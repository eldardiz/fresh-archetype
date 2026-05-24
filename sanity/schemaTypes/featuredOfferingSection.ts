import { defineField, defineType } from 'sanity'

// Featured offering section — the signature product showcase.
//   Restaurant: brunch / signature dishes
//   Winery:     wine list / tasting flights
//   Bakery:     daily breads / pastry highlights
export const featuredOfferingSection = defineType({
  name: 'featuredOfferingSection',
  title: 'Featured Offering Section',
  type: 'document',
  // @ts-expect-error -- runtime field not typed in Sanity v3
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'body', title: 'Body copy', type: 'text', rows: 4 }),
    defineField({ name: 'hoursCallout', title: 'Hours callout', type: 'string', description: 'Optional time/availability note — e.g. "Saturday & Sunday · 10am – 3pm" or "New vintage released Tuesdays"' }),
    defineField({
      name: 'signatureItems',
      title: 'Signature items',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Featured items list — dish names, wine names, bread names',
    }),
    defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'ctaLabel', title: 'Primary CTA label', type: 'string' }),
    defineField({ name: 'menuCtaLabel', title: 'Secondary CTA label (menu/catalog)', type: 'string' }),
    defineField({
      name: 'menuCards',
      title: 'Highlight cards',
      description: 'Up to 4 highlighted items shown as photo cards (e.g. starter / signature / market / dessert — or red / white / rosé / sparkling)',
      type: 'array',
      of: [
        defineField({
          name: 'menuCard',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Category label', type: 'string', description: 'e.g. "the starter", "the signature", "the white"' }),
            defineField({ name: 'name', title: 'Item name', type: 'string', validation: (R) => R.required() }),
            defineField({ name: 'price', title: 'Price', type: 'string', description: 'e.g. "14 €" or "$32 / bottle"' }),
            defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } }),
          ],
          preview: { select: { title: 'name', subtitle: 'label', media: 'image' } },
        }),
      ],
    }),
  ],
  preview: { select: { title: 'heading', media: 'image' } },
})
