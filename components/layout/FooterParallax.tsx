'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function FooterParallax({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const inner = innerRef.current
    if (!wrap || !inner) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { yPercent: -50 },
        {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: wrap,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
          },
        },
      )
    }, wrap)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} data-footer-parallax className="footer-wrap">
      <div ref={innerRef} data-footer-parallax-inner className="footer-parallax-inner">
        {children}
      </div>
    </div>
  )
}
