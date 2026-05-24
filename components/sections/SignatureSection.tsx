'use client'

import { useEffect, useRef, useState } from 'react'

const ITEMS = [
  'Sourdough',
  'Focaccia',
  'Brioche',
  'Croissant',
  'Cheesecake',
  'Muffins',
  'Tarts & Pies',
] as const

const PHOTOS = [
  { className: 'p1', src: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80' },
  { className: 'p2', src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80' },
  { className: 'p3', src: 'https://images.unsplash.com/photo-1568827999250-3f6afff96e66?auto=format&fit=crop&w=600&q=80' },
] as const

export default function SignatureSection() {
  // Initial highlight matches the source: index 2 (Brioche).
  const [active, setActive] = useState(2)
  const [paused, setPaused] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)
  const inView = useInView(sectionRef)

  useEffect(() => {
    if (!inView || paused) return
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % ITEMS.length)
    }, 1800)
    return () => window.clearInterval(id)
  }, [inView, paused])

  return (
    <section id="signature" className="signature" ref={sectionRef}>
      <div className="sig-eyebrow">
        <span className="hex-pill">
          <svg className="hex"><use href="#i-hex" /></svg>
          Signature
        </span>
        <span className="lbl">Signature bakes, on the counter daily</span>
      </div>

      <div className="stage">
        <div className="sig-photos" aria-hidden="true">
          {PHOTOS.map((p) => (
            <div key={p.className} className={`sig-photo ${p.className}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt="" />
            </div>
          ))}
        </div>

        <ul className="sig-list" id="sigList">
          {ITEMS.map((label, i) => (
            <li
              key={label}
              data-i={i}
              className={i === active ? 'is-active' : undefined}
              onMouseEnter={() => {
                setPaused(true)
                setActive(i)
              }}
              onMouseLeave={() => setPaused(false)}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="sig-foot">
        <span className="count">
          <span className="dotline"></span>
          <span>
            <b id="sigNum">{String(active + 1).padStart(2, '0')}</b> / {String(ITEMS.length).padStart(2, '0')}
          </span>
        </span>
        <a href="#" className="menu-link">
          See the full menu <svg><use href="#i-arr" /></svg>
        </a>
      </div>
    </section>
  )
}

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
  return inView
}
