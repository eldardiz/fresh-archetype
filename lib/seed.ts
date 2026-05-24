/**
 * One-time seed script — pushes placeholder homepage content into Sanity.
 *
 * Run with:  npm run seed:sanity
 *
 * Fresh archetype only needs four singletons + a testimonials collection:
 *   siteSettings, heroSection, featuredOfferingSection, aboutSection
 *   + testimonial[] (collection)
 *
 * Edit placeholder values before running for per-lead mockups.
 *
 * Requires SANITY_API_TOKEN in .env.local with Editor (write) permissions.
 * Idempotent — uses createOrReplace with stable IDs.
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { config } from 'dotenv'

config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local')
  process.exit(1)
}
if (!token) {
  console.error(`
Missing SANITY_API_TOKEN in .env.local.

Create one in Sanity Manage for project ${projectId}, choose Editor role,
paste it into .env.local as:
  SANITY_API_TOKEN=sk...
`)
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const PUBLIC_DIR = join(process.cwd(), 'public')

async function uploadImage(relativePath: string): Promise<{ _type: 'image'; asset: { _type: 'reference'; _ref: string } } | null> {
  const fullPath = join(PUBLIC_DIR, relativePath.replace(/^\//, ''))
  try {
    const buf = readFileSync(fullPath)
    const filename = relativePath.split('/').pop() ?? 'image.jpg'
    const asset = await client.assets.upload('image', buf, { filename })
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
  } catch (err) {
    console.warn(`  ! could not upload ${relativePath}:`, (err as Error).message)
    return null
  }
}

async function seed() {
  console.log(`\nSeeding Sanity dataset "${dataset}" on project ${projectId}...\n`)

  console.log('Uploading images...')
  const heroImage = await uploadImage('/images/hero/placeholder.jpg')
  const aboutImage = await uploadImage('/images/about/placeholder.jpg')
  const featuredImage = await uploadImage('/images/featured/card-01.jpg')
  console.log('  image uploads complete\n')

  const docs = [
    {
      _id: 'siteSettings',
      _type: 'siteSettings',
      restaurantName: 'Business Name',
      tagline: 'Crafting fresh flavors with a twist',
      description: 'Short SEO description, around 140 to 160 characters. Replace before launch.',
      contact: {
        phone: '+00 000 000 000',
        email: 'hello@example.com',
        address: 'Street 1, City, Country',
        googleMapsUrl: '',
        googleMapsEmbedSrc: '',
      },
      hours: {
        full: 'Daily 9am to 10pm',
        brunch: 'Saturday and Sunday 10am to 3pm',
        closedOn: '',
      },
      booking: {
        url: '#',
        ctaLabel: 'Book',
      },
      social: {
        instagram: '',
        instagramUrl: '',
        facebook: '',
        tripadvisor: '',
      },
    },
    {
      _id: 'heroSection',
      _type: 'heroSection',
      eyebrow: 'Crafting fresh flavors with a twist',
      heading: 'FRESH',
      subheading: '',
      ctaLabel: 'Book',
      discoverLabel: 'Scroll',
      ...(heroImage ? { image: heroImage } : {}),
    },
    {
      _id: 'aboutSection',
      _type: 'aboutSection',
      eyebrow: 'who we are',
      heading: 'A short, vivid origin sentence.',
      body: [
        { _type: 'block', _key: 'p1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: 'First paragraph, the why behind the place. What you want a first time visitor to feel before they arrive. Keep it under fifty words.' }] },
      ],
      meta: [],
      ...(aboutImage ? { image: aboutImage } : {}),
    },
    {
      _id: 'featuredOfferingSection',
      _type: 'featuredOfferingSection',
      eyebrow: 'on the menu',
      heading: 'Seasonal highlights.',
      body: 'Short copy describing the featured offering.',
      hoursCallout: '',
      signatureItems: ['Cakes', 'Breads', 'Cookies', 'Drinks'],
      ctaLabel: 'Order',
      menuCtaLabel: 'View menu',
      ...(featuredImage ? { image: featuredImage } : {}),
      menuCards: [
        { _key: 'c1', _type: 'menuCard', label: 'category one', name: 'Cakes', price: '' },
        { _key: 'c2', _type: 'menuCard', label: 'category two', name: 'Breads and Rolls', price: '' },
        { _key: 'c3', _type: 'menuCard', label: 'category three', name: 'Cookies', price: '' },
        { _key: 'c4', _type: 'menuCard', label: 'category four', name: 'Drinks', price: '' },
      ],
    },
  ]

  const testimonials = [
    { _id: 'testimonial.placeholder-1', quote: 'A short, specific compliment. Detail-first; avoid superlatives.', name: 'Emily R.', source: '', rating: 5, order: 1 },
    { _id: 'testimonial.placeholder-2', quote: 'Another quote in a different voice. Mix critics and regulars when possible.', name: 'James P.', source: '', rating: 5, order: 2 },
    { _id: 'testimonial.placeholder-3', quote: 'A third voice rounds out the row.', name: 'Sofia M.', source: '', rating: 5, order: 3 },
  ].map((t) => ({ ...t, _type: 'testimonial' }))

  console.log('Creating documents...')
  for (const doc of [...docs, ...testimonials]) {
    await client.createOrReplace(doc)
    console.log(`  ${doc._id}`)
  }

  console.log(`\nDone. Open Studio: http://localhost:3000/studio`)
}

seed().catch((err) => {
  console.error('\nSeed failed:', err)
  process.exit(1)
})
