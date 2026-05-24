import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

const SINGLETON_TYPES = new Set([
  'siteSettings',
  'heroSection',
  'featuredOfferingSection',
  'aboutSection',
])

const SINGLETON_ACTIONS = new Set(['update', 'discardChanges', 'restore'])

// Per-project: override projectId + name with the project's actual Sanity instance.
// Defaults below are placeholders so the Studio loads in archetype dev only.
export default defineConfig({
  name: 'fresh-archetype',
  title: 'Fresh Archetype',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'PLACEHOLDER',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            S.listItem()
              .title('Hero')
              .id('heroSection')
              .child(S.document().schemaType('heroSection').documentId('heroSection')),
            S.listItem()
              .title('Featured Offering')
              .id('featuredOfferingSection')
              .child(S.document().schemaType('featuredOfferingSection').documentId('featuredOfferingSection')),
            S.listItem()
              .title('About')
              .id('aboutSection')
              .child(S.document().schemaType('aboutSection').documentId('aboutSection')),
            S.divider(),
            S.documentTypeListItem('testimonial').title('Testimonials'),
          ]),
    }),
  ],

  schema: { types: schemaTypes },

  document: {
    newDocumentOptions: (prev) =>
      prev.filter((opt) => !SINGLETON_TYPES.has(opt.templateId)),
    actions: (prev, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? prev.filter(({ action }) => action && SINGLETON_ACTIONS.has(action))
        : prev,
  },
})
