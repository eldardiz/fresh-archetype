'use client'

import { useEffect, useRef, useState } from 'react'

type Item = { label: string; photos: [string, string, string] }

const ITEMS: readonly Item[] = [
  {
    label: 'Sourdough',
    photos: [
      'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=600&q=80',
    ],
  },
  {
    label: 'Focaccia',
    photos: [
      'https://images.unsplash.com/photo-1612369090154-0a6cb117f6dd?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1620921568790-c1cf8984624c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1605976909068-b21cba1ec61c?auto=format&fit=crop&w=600&q=80',
    ],
  },
  {
    label: 'Brioche',
    photos: [
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1568827999250-3f6afff96e66?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=600&q=80',
    ],
  },
  {
    label: 'Croissant',
    photos: [
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1568827999250-3f6afff96e66?auto=format&fit=crop&w=600&q=80',
    ],
  },
  {
    label: 'Cheesecake',
    photos: [
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80',
    ],
  },
  {
    label: 'Muffins',
    photos: [
      'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1612203985729-70726954388c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1604423043492-41922be9c4b1?auto=format&fit=crop&w=600&q=80',
    ],
  },
  {
    label: 'Tarts & Pies',
    photos: [
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1464195244916-405fa0a82545?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=600&q=80',
    ],
  },
]

const SLOTS = ['p1', 'p2', 'p3'] as const

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
    }, 1000)
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
          {SLOTS.map((slot, idx) => {
            const src = ITEMS[active].photos[idx]
            return (
              <div key={slot} className={`sig-photo ${slot}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img key={src} src={src} alt="" />
              </div>
            )
          })}
        </div>

        <ul className="sig-list" id="sigList">
          {ITEMS.map((item, i) => (
            <li
              key={item.label}
              data-i={i}
              className={i === active ? 'is-active' : undefined}
              onMouseEnter={() => {
                setPaused(true)
                setActive(i)
              }}
              onMouseLeave={() => setPaused(false)}
            >
              {item.label}
            </li>
          ))}
        </ul>

        <div className="sig-mobile-photo" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={ITEMS[active].photos[0]} src={ITEMS[active].photos[0]} alt="" />
        </div>
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
