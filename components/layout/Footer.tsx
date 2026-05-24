import { brand } from '@/lib/brand'
import type { SiteSettingsData } from '@/lib/sanity.types'

export default function Footer({ settings }: { settings?: SiteSettingsData | null }) {
  const name = settings?.restaurantName ?? brand.identity.name
  const year = new Date().getFullYear()

  // 8 repeats matches the source HTML; CSS handles the seamless infinite slide.
  const repeats = Array.from({ length: 8 }, (_, i) => i)

  return (
    <footer>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {repeats.map((i) => (
            <span key={`a-${i}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 40 }}>
              <span>{name}</span>
              <span className="dot"></span>
            </span>
          ))}
          {repeats.map((i) => (
            <span key={`b-${i}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 40 }}>
              <span>{name}</span>
              <span className="dot"></span>
            </span>
          ))}
        </div>
      </div>
      <div className="foot-bot">
        <span className="made">
          <span className="dot"></span> © {year} {name}. All rights reserved.
        </span>
        <nav className="links">
          {brand.social.instagramUrl ? <a href={brand.social.instagramUrl}>Instagram</a> : <a href="#">Instagram</a>}
          <a href="#">Spotify</a>
          <a href="#">Press kit</a>
          <a href="/mentions-legales">Privacy</a>
        </nav>
      </div>
    </footer>
  )
}
