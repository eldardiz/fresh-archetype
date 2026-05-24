# Fresh Archetype — Template Brain

This is the **Fresh archetype** for the Axamo productized website system, inspired by [Zest Light](https://zestlight.framer.website). White + lemon-yellow palette, persistent left sidebar nav, yellow-bordered bento cards, hexagon-pill section labels. All sans-serif.

It is a **template**, not a live client site. It is one of four sibling archetypes:

1. **Editorial · Warm** — Le Passage Saint-Honoré palette
2. **Editorial · Blue** — Günay (Vienna) palette
3. **Fresh** (this one) — white + yellow, modular bento, sidebar nav
4. **Atelier** — monochrome + 1 accent, typography-led grid (planned)

Editorial Warm and Editorial Blue share the same skeleton (token swap only). Fresh and Atelier are **structurally different templates** — different nav patterns, different section anatomy, different visual rhythm. They share the same `lib/brand.ts` interface and Sanity schema family, but the visual/structural layer is bespoke per archetype.

## Structural identity (what makes Fresh feel like Fresh)

- **Persistent left vertical sidebar nav** — 88px wide rail with brand pill top + bottom, line-icon links in the middle. Always visible on desktop, hidden on mobile.
- **Floating bottom-right CTA cluster** — Phone + Book pill buttons that stick to the viewport. Yellow primary CTA.
- **White background everywhere** — no dark sections, no atmospheric photography backdrops. Hero is the only photo-led surface.
- **Yellow-bordered bento cards** — every content block is a rounded card (24px radius) with a 1.5px lemon-yellow hairline border. Subtle shadow, generous padding, white interior.
- **Hexagon-pill section labels** — `○ About Us`, `○ Menu`, `○ FAQ`, `○ Reviews`, `○ Contact Details`, `○ Contact Form`. Outlined yellow pill, hexagon icon, all caps, small.
- **Sans-serif throughout** — Inter at 700–900 weight for headings. No serifs, no italics, no script.
- **One accent color** — lemon yellow `#F5DC4D` is the only non-neutral. Swap via `figma-tokens.css` to terracotta, sage, or any single accent for a different lead.

## Section composition (homepage)

```
Hero               → full-bleed photo, oversized sans logo, tagline
FeaturedOffering   → 2x2 photo card grid (e.g. Cakes / Breads / Cookies / Drinks)
About              → 3 bento cards stacked vertically with icon + heading + body
FAQ                → yellow-bordered accordion card with 3 questions
Testimonials       → 3 bento cards in a row, each with name + stars + quote
Contact            → 2-col: left bento details (phone/email/address), right bento form
Footer             → marquee with brand name repeated + yellow dot dividers, copyright
```

## Best for

- Modern bakeries, juice bars, brunch spots
- Third-wave coffee, casual cafés
- Design-forward food brands
- Anything that wants "today" energy rather than "heritage" energy

## Stack

- Next.js 16.2.4, TypeScript, Tailwind CSS v4
- Sanity CMS (singletons: hero / featuredOffering / about / siteSettings + testimonial collection)
- Vercel deploy
- **Lead-gen homepage only.** No private hire, no careers, no forms-with-server-actions. Contact form is decorative (no submission wired yet).
- **No GSAP, no Lenis, no scroll-rich motion.** Fresh is intentionally modular and static — hover lifts on cards, marquee on footer, that's it. The visual personality carries weight without scroll choreography.

## Files of structural importance

```
lib/brand.ts                         ← single source of business data
lib/sanity.types.ts                  ← TS types
lib/queries.ts                       ← GROQ queries (4 singletons + testimonial collection)
lib/getHomepage.ts                   ← combined homepage fetch + fallback
lib/seed.ts                          ← placeholder seed (npm run seed:sanity)
sanity/schemaTypes/                  ← 4 singleton schemas + testimonial
sanity/sanity.config.ts              ← Sanity Studio config
styles/figma-tokens.css              ← CSS variables (palette + typography + radii)
styles/claude-design.css             ← all application styles, reads from tokens
components/layout/Sidebar.tsx        ← persistent left vertical nav
components/layout/FloatingCTAs.tsx   ← bottom-right Phone + Book cluster
components/layout/Footer.tsx         ← marquee + copyright
components/ui/BentoCard.tsx          ← yellow-bordered rounded card primitive
components/ui/PillLabel.tsx          ← ○ hexagon-icon section label
components/sections/HeroSection.tsx          ← full-bleed photo + giant sans logo
components/sections/FeaturedOfferingSection.tsx ← 2x2 photo card grid
components/sections/AboutSection.tsx         ← 3 stacked bento cards with icons
components/sections/FAQSection.tsx           ← accordion (client component for open/close)
components/sections/TestimonialsSection.tsx  ← 3 bento cards with stars
components/sections/ContactSection.tsx       ← left details cards + right form
app/page.tsx                         ← homepage composition
app/layout.tsx                       ← root with Sidebar + main + FloatingCTAs shell
```

## Spawning a new Fresh-archetype site for a lead

1. Clone this directory to `vibe-coding/mockups/[lead-slug]/`
2. Edit `lib/brand.ts`:
   - Set `identity.name`, `identity.tagline`, `identity.description`
   - Set `businessType` (`restaurant` / `winery` / `bakery`)
   - Set `archetype: 'fresh'`
   - Set `contact.*`, `hours.*`, `booking.*`, `social.*`
3. Swap `public/images/`:
   - `hero/placeholder.jpg` — full-bleed hero photo
   - `featured/card-01.jpg` through `card-04.jpg` — 4 category photos
   - `about/placeholder.jpg` — (optional, About section uses icons by default)
4. Optionally swap accent color in `styles/figma-tokens.css`:
   - `--color-accent` — the main accent (currently lemon yellow)
   - `--color-accent-soft` — semi-transparent border tint
   - `--color-accent-bg` — faint wash for hover states
   - `--color-accent-hover` — darker hover variant
5. Optional: `npm run seed:sanity` to push placeholder copy into Sanity. Then edit via `/studio`.

## Critical pitfalls

- **No PortableText body imports in About** — Fresh's AboutSection uses 3 fixed bento cards, not free-form rich text. If a lead really wants rich text about-copy, swap the section, don't try to retrofit it.
- **No em dashes in user-facing copy** — workspace rule, applies here.
- **Sidebar requires viewport ≥ 720px** — mobile hides it. Verify mobile flow makes sense before shipping a mockup.
- **Yellow accent saturation matters** — if you swap to a muted brand color, also adjust `--color-accent-soft` and `--color-accent-bg` so the bento borders still read as decorative, not faded.

## Git rules

This archetype lives inside the workspace repo. Don't create a separate remote for it. Commit changes with prefix `archetype/fresh: …`.
