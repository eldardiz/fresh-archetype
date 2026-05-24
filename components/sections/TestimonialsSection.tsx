import type { TestimonialData } from '@/lib/sanity.types'

interface Review {
  initials: string
  quote: string
  name: string
  role: string
}

const FALLBACK: Review[] = [
  {
    initials: 'MR',
    quote: 'I came in for a coffee and walked out with a sandwich, two pastries, and a Tuesday-morning ritual.',
    name: 'Maya Reyes',
    role: 'Local · 3 years',
  },
  {
    initials: 'DK',
    quote: "The kouign-amann is the closest thing to Paris I've found below 14th. Get there before 10.",
    name: 'David Kim',
    role: 'Food writer',
  },
  {
    initials: 'AO',
    quote: "Brought my parents. They've already booked the back room for their anniversary. That's the review.",
    name: 'Aisha Okafor',
    role: 'Brooklyn',
  },
]

function Stars() {
  return (
    <div className="stars" aria-label="5 out of 5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i}><use href="#i-star" /></svg>
      ))}
    </div>
  )
}

function initialsFrom(name: string) {
  const parts = name.trim().split(/\s+/)
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? parts[0]?.[1] ?? '')).toUpperCase() || '★'
}

export default function TestimonialsSection({ data }: { data?: TestimonialData[] }) {
  const reviews: Review[] = data && data.length > 0
    ? data.slice(0, 3).map((t) => ({
        initials: initialsFrom(t.name),
        quote: t.quote,
        name: t.name,
        role: t.source || '',
      }))
    : FALLBACK

  return (
    <section id="testimonials" className="tmnl wrap">
      <header className="section-head">
        <div className="title-block">
          <span className="hex-pill">
            <svg className="hex"><use href="#i-hex" /></svg>
            Reviews
          </span>
          <h2>What the regulars say.</h2>
        </div>
        <div className="meta">
          <b>4.9 / 5</b>
          <span>Based on 612 Google reviews</span>
        </div>
      </header>

      <div className="tmnl-grid">
        {reviews.map((r, i) => (
          <article key={i} className="bento tmnl-card">
            <Stars />
            <blockquote>&ldquo;{r.quote}&rdquo;</blockquote>
            <div className="byline">
              <span className="avi">{r.initials}</span>
              <div className="who">
                <b>{r.name}</b>
                <span>{r.role}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
