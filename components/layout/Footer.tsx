import { brand } from '@/lib/brand'

export default function Footer() {
  const name = brand.identity.name
  const year = new Date().getFullYear()

  const pages = [
    { label: 'Home', href: '#hero' },
    { label: 'Menu', href: '#featured' },
    { label: 'About', href: '#about' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ]

  const socials: Array<{ label: string; href: string }> = []
  if (brand.social.instagramUrl) socials.push({ label: 'Instagram', href: brand.social.instagramUrl })
  if (brand.social.facebook) socials.push({ label: 'Facebook', href: brand.social.facebook })
  if (brand.social.tripadvisor) socials.push({ label: 'Tripadvisor', href: brand.social.tripadvisor })
  if (brand.social.yelp) socials.push({ label: 'Yelp', href: brand.social.yelp })
  if (socials.length === 0) socials.push({ label: 'Instagram', href: '#' })

  return (
    <footer className="fresh-footer">
      <div className="fresh-footer__links-row">
        <div className="fresh-footer__col">
          <p className="footer-eyebrow">( Pages )</p>
          <div className="fresh-footer__links">
            {pages.map((p) => (
              <a key={p.label} href={p.href} className="fresh-footer__a">{p.label}</a>
            ))}
          </div>
        </div>
        <div className="fresh-footer__col">
          <p className="footer-eyebrow">( Socials )</p>
          <div className="fresh-footer__links">
            {socials.map((s) => (
              <a key={s.label} href={s.href} className="fresh-footer__a">{s.label}</a>
            ))}
          </div>
        </div>
        <div className="fresh-footer__col">
          <p className="footer-eyebrow">( Contact )</p>
          <div className="fresh-footer__links">
            <a href={`mailto:${brand.contact.email}`} className="fresh-footer__a">{brand.contact.email}</a>
            <a href={`tel:${brand.contact.phone.replace(/\s+/g, '')}`} className="fresh-footer__a">{brand.contact.phone}</a>
            <span className="fresh-footer__a fresh-footer__addr">{brand.contact.address}</span>
          </div>
        </div>
      </div>

      <div className="fresh-footer__bottom">
        <div className="fresh-footer__bottom-row">
          <p className="footer-eyebrow">Made fresh, every morning.</p>
          <p className="footer-eyebrow">© {year} {name}</p>
        </div>
        <div className="fresh-footer__wordmark" aria-hidden="true">{name.toUpperCase()}</div>
      </div>
    </footer>
  )
}
