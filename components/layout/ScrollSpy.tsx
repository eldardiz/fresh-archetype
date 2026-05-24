'use client'

import { useEffect } from 'react'

// Marks the current sidebar nav link as active based on which section is
// crossing the middle of the viewport. Ports the inline IIFE from the source HTML.
export default function ScrollSpy() {
  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>('.rail-nav a[href^="#"]')
    const map = new Map<Element, HTMLAnchorElement>()
    links.forEach((a) => {
      const id = a.getAttribute('href')!.slice(1)
      const el = document.getElementById(id)
      if (el) map.set(el, a)
    })

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            links.forEach((l) => l.classList.remove('active'))
            const a = map.get(e.target)
            if (a) a.classList.add('active')
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )

    map.forEach((_, el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return null
}
