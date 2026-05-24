import { defineField, defineType } from 'sanity'

// About / origin story section — universal across business types.
export const aboutSection = defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'document',
  // @ts-expect-error -- runtime field not typed in Sanity v3
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'body',
      title: 'Body (rich text)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Supports bold, italic, and links',
    }),
    defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'meta',
      title: 'Meta facts (right rail)',
      description: 'Optional key/value pairs shown alongside the story (e.g. "Opened: April 2024", "Chef: …")',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Label', type: 'string' }),
          defineField({ name: 'value', title: 'Value', type: 'string' }),
        ],
      }],
    }),
  ],
  preview: { select: { title: 'heading', media: 'image' } },
})
