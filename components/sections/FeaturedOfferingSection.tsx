import Image from 'next/image'

interface FeatCard {
  href: string
  img: string
  alt: string
  cornerTag: string
  name: string
  sub: string
}

const DEFAULT_CARDS: FeatCard[] = [
  {
    href: '#',
    img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1400&q=80',
    alt: 'Stack of croissants and pastries',
    cornerTag: 'From 7am',
    name: 'Pastry',
    sub: 'Croissants · Kouign-amann · Morning buns',
  },
  {
    href: '#',
    img: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=1400&q=80',
    alt: 'Glasses of fresh juice',
    cornerTag: 'Pressed today',
    name: 'Juice',
    sub: 'Citrus · Greens · Roots · Tonics',
  },
  {
    href: '#',
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80',
    alt: 'Espresso being poured',
    cornerTag: 'All day',
    name: 'Coffee',
    sub: 'Espresso · Filter · Cold brew · Matcha',
  },
  {
    href: '#',
    img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1400&q=80',
    alt: 'Brunch plate of fresh food',
    cornerTag: 'Til 3pm',
    name: 'Kitchen',
    sub: 'Toasts · Bowls · Soups · Sandwiches',
  },
]

export default function FeaturedOfferingSection() {
  const heading = 'Made this morning, gone by noon.'
  const lede = 'Four corners of the counter, picked daily. Pastry from the oven, juice from the press, salads from the cold case, sandwiches built to order.'
  const cards = DEFAULT_CARDS

  return (
    <section id="featured" className="featured wrap">
      <header className="section-head">
        <div className="title-block">
          <span className="hex-pill">
            <svg className="hex"><use href="#i-hex" /></svg>
            Featured
          </span>
          <h2>{heading}</h2>
          <p className="lede">{lede}</p>
        </div>
        <div className="meta">
          <b>04 categories</b>
          <span>Updated daily</span>
        </div>
      </header>

      <div className="featured-grid">
        {cards.map((c, i) => (
          <a key={i} href={c.href} className="feat-card">
            <Image src={c.img} alt={c.alt} fill sizes="(max-width:1100px) 100vw, 50vw" />
            <span className="corner-tag">{c.cornerTag}</span>
            <div className="label">
              <div>
                <h3>{c.name}</h3>
                <div className="sub">{c.sub}</div>
              </div>
              <span className="arrow-btn"><svg><use href="#i-arr" /></svg></span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
