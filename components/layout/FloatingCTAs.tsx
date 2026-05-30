import { brand } from '@/lib/brand'

export default function FloatingCTAs() {
  const phone = brand.contact.phone
  const bookingLabel = brand.booking.ctaLabel || 'Book a table'

  return (
    <div className="cta-cluster" aria-label="Quick actions">
      {phone ? (
        <a href={`tel:${phone.replace(/\s/g, '')}`} className="cta-phone" aria-label={`Call ${brand.identity.name}`}>
          <svg><use href="#i-phone" /></svg>
        </a>
      ) : null}
      <a href="#contact" className="cta-book">
        <span className="dot"><svg><use href="#i-cal" /></svg></span>
        {bookingLabel}
      </a>
    </div>
  )
}
