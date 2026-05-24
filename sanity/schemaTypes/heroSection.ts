import { defineField, defineType } from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Section Hero',
  type: 'document',
  // @ts-expect-error -- runtime field not typed in Sanity v3
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'eyebrow', title: 'Texte eyebrow', type: 'string', description: 'Ex: Paris 1er · Place du Marché Saint-Honoré' }),
    defineField({ name: 'heading', title: 'Titre principal', type: 'string' }),
    defineField({ name: 'subheading', title: 'Sous-titre', type: 'string' }),
    defineField({ name: 'ctaLabel', title: 'Bouton CTA', type: 'string' }),
    defineField({ name: 'discoverLabel', title: 'Lien "Découvrir"', type: 'string' }),
    defineField({ name: 'image', title: 'Image hero', type: 'image', options: { hotspot: true } }),
  ],
  preview: { select: { title: 'heading', media: 'image' } },
})
