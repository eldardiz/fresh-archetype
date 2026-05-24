export default function ArtisansSection() {
  const heading = 'Behind the counter.'
  const lede = "Five pairs of hands, three ovens, one rule, bake what you'd serve your family. Our team has been doing this together for the better part of a decade, and it shows in the crumb."
  const img = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=2200&q=80'

  return (
    <section id="artisans" className="artisans">
      <div className="wrap-inner">
        <div className="hex-wrap">
          <span className="hex-pill">
            <svg className="hex"><use href="#i-hex" /></svg>
            Artisans
          </span>
        </div>
        <h2>{heading}</h2>
        <p className="lede">{lede}</p>
        <div className="scroll-dot" aria-hidden="true"><i></i></div>
      </div>

      <figure className="artisans-figure">
        <aside className="artisans-quote left" aria-hidden="true">
          <span className="tick"></span>
          <span className="q">Sourdough is patience, not technique.</span>
        </aside>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt="The team prepping in the open kitchen" loading="lazy" />

        <aside className="artisans-quote right" aria-hidden="true">
          <span className="tick"></span>
          <span className="q">Baking is our love language, share it.</span>
        </aside>

        <figcaption className="artisans-credit">
          <b>The crew</b> &nbsp;·&nbsp; Tuesday, 5:42am
        </figcaption>
      </figure>
    </section>
  )
}
