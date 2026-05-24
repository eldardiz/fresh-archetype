import type { AboutData } from '@/lib/sanity.types'

interface AboutCard {
  icon: 'i-leaf' | 'i-clock' | 'i-spark'
  heading: string
  body: string
}

const DEFAULT_CARDS: AboutCard[] = [
  {
    icon: 'i-leaf',
    heading: 'Grown nearby, mostly.',
    body: "Produce from three farms within sixty miles, picked the day before it's pressed. Anything we can't source local, we don't put on the menu.",
  },
  {
    icon: 'i-clock',
    heading: 'Slow, on purpose.',
    body: 'Sourdough rests for forty-eight hours before it sees the oven. Cold brew steeps overnight. The good stuff takes the time it takes.',
  },
  {
    icon: 'i-spark',
    heading: 'New every week.',
    body: 'The menu shifts with the season, figs in August, citrus in February. The classics stay; the specials keep us awake at night.',
  },
]

const DEFAULT_VISUAL = 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1400&q=80'

export default function AboutSection({ data }: { data?: AboutData | null }) {
  const heading = data?.heading || 'A small kitchen with loud opinions.'
  const lede = "We bake with stone-milled flour, press citrus a block from where it's served, and don't believe in shortcuts you can taste."
  const meta = data?.meta && data.meta.length > 0
    ? data.meta.slice(0, 2)
    : [{ label: 'Since', value: '2019' }, { label: '', value: 'Family-run' }]

  return (
    <section id="about" className="about wrap">
      <header className="section-head">
        <div className="title-block">
          <span className="hex-pill">
            <svg className="hex"><use href="#i-hex" /></svg>
            About
          </span>
          <h2>{heading}</h2>
          <p className="lede">{lede}</p>
        </div>
        <div className="meta">
          <b>{meta[0]?.label} {meta[0]?.value}</b>
          <span>{meta[1]?.value}</span>
        </div>
      </header>

      <div className="about-grid">
        <div className="about-stack">
          {DEFAULT_CARDS.map((c) => (
            <article key={c.heading} className="bento about-card">
              <span className="ic"><svg><use href={`#${c.icon}`} /></svg></span>
              <div>
                <h3>{c.heading}</h3>
                <p>{c.body}</p>
              </div>
            </article>
          ))}
        </div>

        <aside
          className="about-visual"
          aria-hidden="true"
          style={{ backgroundImage: `url("${DEFAULT_VISUAL}")` }}
        >
          <div className="stamp">
            <div className="yr"><small>Est.</small>2019</div>
            <div className="by">Built by two siblings who couldn&apos;t find a good loaf in the neighborhood.</div>
          </div>
        </aside>
      </div>
    </section>
  )
}
