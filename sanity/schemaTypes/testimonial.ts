import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Avis client',
  type: 'document',
  fields: [
    defineField({ name: 'quote', title: 'Citation', type: 'text', rows: 3, validation: (r) => r.required() }),
    defineField({ name: 'name', title: 'Nom', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'source', title: 'Source (ex: Google)', type: 'string' }),
    defineField({
      name: 'rating',
      title: 'Note',
      type: 'number',
      options: { list: [1, 2, 3, 4, 5] },
      initialValue: 5,
    }),
    defineField({ name: 'order', title: 'Ordre d\'affichage', type: 'number' }),
  ],
  orderings: [{ title: 'Ordre', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'quote' } },
})
