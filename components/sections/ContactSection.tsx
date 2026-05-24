'use client'

import { useState, type FormEvent } from 'react'
import { brand } from '@/lib/brand'
import type { SiteSettingsData } from '@/lib/sanity.types'

export default function ContactSection({ settings }: { settings?: SiteSettingsData | null }) {
  const phone = settings?.contact?.phone || brand.contact.phone || '(212) 555-0100'
  const email = settings?.contact?.email || brand.contact.email || 'hello@fresh.co'
  const address = settings?.contact?.address || brand.contact.address || '412 Hudson St, NY 10014'
  const neighborhood = brand.contact.cityShort || 'Hudson & Charles'

  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="contact wrap">
      <header className="section-head">
        <div className="title-block">
          <span className="hex-pill">
            <svg className="hex"><use href="#i-hex" /></svg>
            Visit
          </span>
          <h2>Come by. Stay a while.</h2>
          <p className="lede">We&apos;re easy to find, corner of Hudson and Charles, look for the lime awning. Drop a line ahead, or just walk in.</p>
        </div>
        <div className="meta">
          <b>{neighborhood}</b>
          <span>West Village, NYC</span>
        </div>
      </header>

      <div className="contact-grid">
        <div className="contact-stack">
          <article className="bento contact-card">
            <span className="ic"><svg><use href="#i-phone" /></svg></span>
            <div>
              <div className="lbl">Phone</div>
              <div className="val">{phone}</div>
            </div>
            <a className="more" href={`tel:${phone.replace(/\s/g, '')}`} aria-label="Call"><svg><use href="#i-arr" /></svg></a>
          </article>
          <article className="bento contact-card">
            <span className="ic"><svg><use href="#i-contact" /></svg></span>
            <div>
              <div className="lbl">Email</div>
              <div className="val">{email}</div>
            </div>
            <a className="more" href={`mailto:${email}`} aria-label="Email"><svg><use href="#i-arr" /></svg></a>
          </article>
          <article className="bento contact-card">
            <span className="ic"><svg><use href="#i-pin" /></svg></span>
            <div>
              <div className="lbl">Address</div>
              <div className="val">{address}</div>
            </div>
            <a className="more" href={settings?.contact?.googleMapsUrl || brand.contact.googleMapsUrl || '#'} target="_blank" rel="noopener noreferrer" aria-label="Get directions">
              <svg><use href="#i-arr" /></svg>
            </a>
          </article>
        </div>

        <form className="bento form-card" onSubmit={handleSubmit}>
          <h3>Drop us a line.</h3>
          <div className="row">
            <div className="field">
              <label htmlFor="f-name">Name</label>
              <input id="f-name" type="text" placeholder="Your name" required />
            </div>
            <div className="field">
              <label htmlFor="f-email">Email</label>
              <input id="f-email" type="email" placeholder="you@email.com" required />
            </div>
          </div>
          <div className="row">
            <div className="field">
              <label htmlFor="f-topic">Topic</label>
              <select id="f-topic">
                <option>Reservation</option>
                <option>Catering</option>
                <option>Press &amp; partnerships</option>
                <option>Something else</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-party">Party size</label>
              <input id="f-party" type="text" placeholder="e.g. 4" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="f-msg">Message</label>
            <textarea id="f-msg" placeholder="Tell us what you have in mind..." />
          </div>
          <div className="submit-row">
            <p className="fine">We reply within one business day. No newsletters, no spam, promise.</p>
            <button type="submit" className="btn-submit">
              {sent ? (
                <>
                  <span className="arr"><svg><use href="#i-arr" /></svg></span>
                  Sent, see you soon
                </>
              ) : (
                <>
                  Send message
                  <span className="arr"><svg><use href="#i-arr" /></svg></span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
