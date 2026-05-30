import { brand } from '@/lib/brand'

const DEFAULT_HERO_IMG = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=2200&q=80'

export default function HeroSection() {
  const businessName = brand.identity.name
  const tagline = brand.identity.description || brand.identity.tagline
  const categoryPill = brand.hero?.categoryPill || 'Bakery · Juice · Café'
  const openPill = brand.hero?.openPill || `Open today · ${brand.hours.full || '7am – 9pm'}`
  const chips = brand.hero?.chips || ['Est. 2019', 'West Village, NYC', 'B-Corp']
  const tickerLeft = brand.hero?.tickerLeft || { label: 'Now pouring', value: 'Cold-pressed grapefruit · ginger · rosemary' }
  const tickerRight = brand.hero?.tickerRight || ['Sourdough drops at 8am', 'Croissants Sat & Sun']
  const imgUrl = DEFAULT_HERO_IMG

  return (
    <section id="hero" className="hero">
      <div
        className="hero-frame"
        style={imgUrl ? { backgroundImage: `url("${imgUrl}")` } : undefined}
      >
        <div className="hero-top">
          <span className="hex-pill pill-light">
            <svg className="hex"><use href="#i-hex" /></svg>
            {categoryPill}
          </span>
          <span className="open-dot">
            <i></i> {openPill}
          </span>
        </div>

        <div className="hero-center">
          <div className="mega">{businessName}<span className="dot"></span></div>
          {tagline ? <p className="tagline">{tagline}</p> : null}
        </div>

        <a href="#featured" className="hero-scroll">
          <span className="arrow"><svg><use href="#i-down" /></svg></span>
          Scroll to taste
        </a>

        <div className="hero-meta">
          {chips.map((c) => (
            <span key={c} className="chip">{c}</span>
          ))}
        </div>
      </div>

      <div className="hero-strip">
        <div className="strip-l">
          <b>{tickerLeft.label}</b>
          <span className="sep">●</span>
          <span>{tickerLeft.value}</span>
        </div>
        <div className="strip-r">
          {tickerRight.map((item, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 18 }}>
              {i > 0 ? <span className="sep">●</span> : null}
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
