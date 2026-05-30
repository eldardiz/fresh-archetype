'use client'

import { useEffect, useState } from 'react'
import { brand } from '@/lib/brand'

const ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'Menu', href: '#featured' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
] as const

export default function MobileNav() {
  const [active, setActive] = useState(false)
  const status = active ? 'active' : 'not-active'

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && active) setActive(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [active])

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [active])

  const ctaHref = brand.booking?.url || '#contact'
  const ctaLabel = brand.booking?.ctaLabel || 'Book a table'

  return (
    <nav data-navigation-status={status} className="centered-nav-root">
      <div
        data-navigation-toggle="close"
        className="centered-nav-backdrop"
        onClick={() => setActive(false)}
        aria-hidden="true"
      />
      <div className="centered-nav">
        <div className="centered-nav__bg" />
        <div className="centered-nav__header">
          <a href="#hero" className="centered-nav__logo" onClick={() => setActive(false)}>
            {brand.identity.name}
          </a>
          <button
            data-navigation-toggle="toggle"
            className="centered-nav__toggle"
            aria-label={active ? 'Close menu' : 'Open menu'}
            aria-expanded={active}
            onClick={() => setActive((v) => !v)}
          >
            <span className="centered-nav__toggle-bar" />
            <span className="centered-nav__toggle-bar" />
          </button>
        </div>
        <div className="centered-nav__content">
          <div className="centered-nav__inner">
            <ul className="centered-nav__ul">
              {ITEMS.map((item, i) => (
                <li
                  key={item.label}
                  data-navigation-item
                  className="centered-nav__li"
                  style={{ transitionDelay: `${i * 0.05}s` }}
                >
                  <a
                    href={item.href}
                    className="centered-nav__a"
                    onClick={() => setActive(false)}
                  >
                    <span className="centered-nav__p">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div
              data-navigation-item
              className="centered-nav__banner-w"
              style={{ transitionDelay: `${ITEMS.length * 0.05}s` }}
            >
              <a
                href={ctaHref}
                className="centered-nav__banner"
                onClick={() => setActive(false)}
              >
                <div className="centered-nav__banner-row">
                  <div data-css-marquee-list className="centered-nav__banner-item">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={`a-${i}`} className="centered-nav__banner-inner">
                        <span className="centered-nav__banner-text">{ctaLabel}</span>
                      </span>
                    ))}
                  </div>
                  <div data-css-marquee-list className="centered-nav__banner-item">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={`b-${i}`} className="centered-nav__banner-inner">
                        <span className="centered-nav__banner-text">{ctaLabel}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
