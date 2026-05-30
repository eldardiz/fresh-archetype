'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { CustomEase } from 'gsap/CustomEase'
import { horizontalLoop } from '@/lib/horizontalLoop'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin, CustomEase)
  if (!CustomEase.get?.('osmo-ease')) {
    CustomEase.create('osmo-ease', '0.625, 0.05, 0, 1')
  }
}

interface Review {
  initials: string
  quote: string
  name: string
  role: string
}

const FALLBACK: Review[] = [
  {
    initials: 'MR',
    quote: 'I came in for a coffee and walked out with a sandwich, two pastries, and a Tuesday-morning ritual.',
    name: 'Maya Reyes',
    role: 'Local · 3 years',
  },
  {
    initials: 'DK',
    quote: "The kouign-amann is the closest thing to Paris I've found below 14th. Get there before 10.",
    name: 'David Kim',
    role: 'Food writer',
  },
  {
    initials: 'AO',
    quote: "Brought my parents. They've already booked the back room for their anniversary. That's the review.",
    name: 'Aisha Okafor',
    role: 'Brooklyn',
  },
  {
    initials: 'JT',
    quote: 'Bread that smells like the place it came from. I bring a loaf home every Saturday and the kids fight over the crust.',
    name: 'Jamie Tan',
    role: 'Saturday regular',
  },
  {
    initials: 'EM',
    quote: 'Coffee is no joke, pastry is no joke, staff actually remember your name after the third visit. Hard to find this combo.',
    name: 'Elena Marchetti',
    role: 'Neighborhood',
  },
  {
    initials: 'RP',
    quote: 'Catered our office launch with thirty minutes notice. Showed up with everything labeled, packed, and warm. Lifesavers.',
    name: 'Ravi Patel',
    role: 'Office manager',
  },
]

function Stars() {
  return (
    <div className="stars" aria-label="5 out of 5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i}><use href="#i-star" /></svg>
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  const reviews: Review[] = FALLBACK

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const slides = Array.from(wrapper.querySelectorAll<HTMLElement>('[data-centered-slider="slide"]'))
    const bullets = Array.from(wrapper.querySelectorAll<HTMLElement>('[data-centered-slider="bullet"]'))
    const prevButton = wrapper.querySelector<HTMLElement>('[data-centered-slider="prev-button"]')
    const nextButton = wrapper.querySelector<HTMLElement>('[data-centered-slider="next-button"]')

    if (slides.length === 0) return

    let activeElement: HTMLElement | null = null
    let activeBullet: HTMLElement | null = null
    let currentIndex = 0
    let autoplay: ReturnType<typeof gsap.delayedCall> | null = null

    const autoplayEnabled = wrapper.getAttribute('data-slider-autoplay') === 'true'
    const autoplayDuration = autoplayEnabled
      ? parseFloat(wrapper.getAttribute('data-slider-autoplay-duration') || '0') || 0
      : 0

    slides.forEach((slide, i) => {
      slide.setAttribute('id', `tmnl-slide-${i}`)
    })

    bullets.forEach((bullet, i) => {
      bullet.setAttribute('aria-controls', `tmnl-slide-${i}`)
      bullet.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false')
    })

    const loop = horizontalLoop(slides, {
      paused: true,
      draggable: true,
      center: true,
      onChange: (element: HTMLElement, index: number) => {
        currentIndex = index
        if (activeElement) activeElement.classList.remove('active')
        element.classList.add('active')
        activeElement = element

        if (bullets.length > 0) {
          if (activeBullet) activeBullet.classList.remove('active')
          if (bullets[index]) {
            bullets[index].classList.add('active')
            activeBullet = bullets[index]
          }
          bullets.forEach((bullet, i) => {
            bullet.setAttribute('aria-selected', i === index ? 'true' : 'false')
          })
        }
      },
    })

    loop.toIndex(2, { duration: 0.01 })

    function startAutoplay() {
      if (autoplayDuration > 0 && !autoplay) {
        const repeat = () => {
          loop.next({ ease: 'osmo-ease', duration: 0.725 })
          autoplay = gsap.delayedCall(autoplayDuration, repeat)
        }
        autoplay = gsap.delayedCall(autoplayDuration, repeat)
      }
    }

    function stopAutoplay() {
      if (autoplay) {
        autoplay.kill()
        autoplay = null
      }
    }

    const trigger = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: startAutoplay,
      onLeave: stopAutoplay,
      onEnterBack: startAutoplay,
      onLeaveBack: stopAutoplay,
    })

    const onMouseEnter = () => stopAutoplay()
    const onMouseLeave = () => {
      if (ScrollTrigger.isInViewport(wrapper)) startAutoplay()
    }
    wrapper.addEventListener('mouseenter', onMouseEnter)
    wrapper.addEventListener('mouseleave', onMouseLeave)

    const slideClickHandlers: Array<() => void> = []
    slides.forEach((slide, i) => {
      const handler = () => loop.toIndex(i, { ease: 'osmo-ease', duration: 0.725 })
      slide.addEventListener('click', handler)
      slideClickHandlers.push(handler)
    })

    const bulletClickHandlers: Array<() => void> = []
    bullets.forEach((bullet, i) => {
      const handler = () => {
        loop.toIndex(i, { ease: 'osmo-ease', duration: 0.725 })
        if (activeBullet) activeBullet.classList.remove('active')
        bullet.classList.add('active')
        activeBullet = bullet
        bullets.forEach((b, j) => {
          b.setAttribute('aria-selected', j === i ? 'true' : 'false')
        })
      }
      bullet.addEventListener('click', handler)
      bulletClickHandlers.push(handler)
    })

    const prevHandler = () => {
      let newIndex = currentIndex - 1
      if (newIndex < 0) newIndex = slides.length - 1
      loop.toIndex(newIndex, { ease: 'osmo-ease', duration: 0.725 })
    }
    const nextHandler = () => {
      let newIndex = currentIndex + 1
      if (newIndex >= slides.length) newIndex = 0
      loop.toIndex(newIndex, { ease: 'osmo-ease', duration: 0.725 })
    }
    if (prevButton) prevButton.addEventListener('click', prevHandler)
    if (nextButton) nextButton.addEventListener('click', nextHandler)

    return () => {
      stopAutoplay()
      trigger.kill()
      wrapper.removeEventListener('mouseenter', onMouseEnter)
      wrapper.removeEventListener('mouseleave', onMouseLeave)
      slides.forEach((slide, i) => slide.removeEventListener('click', slideClickHandlers[i]))
      bullets.forEach((bullet, i) => bullet.removeEventListener('click', bulletClickHandlers[i]))
      if (prevButton) prevButton.removeEventListener('click', prevHandler)
      if (nextButton) nextButton.removeEventListener('click', nextHandler)
      if (loop) loop.kill()
    }
  }, [reviews.length])

  return (
    <section id="testimonials" className="tmnl wrap">
      <header className="section-head">
        <div className="title-block">
          <span className="hex-pill">
            <svg className="hex"><use href="#i-hex" /></svg>
            Reviews
          </span>
          <h2>What the regulars say.</h2>
        </div>
        <div className="meta">
          <b>4.9 / 5</b>
          <span>Based on 612 Google reviews</span>
        </div>
      </header>

      <div
        ref={wrapperRef}
        className="tmnl-slider"
        data-centered-slider="wrapper"
        data-slider-autoplay="true"
        data-slider-autoplay-duration="4"
        aria-label="Customer testimonials"
      >
        <div className="tmnl-bullets-row">
          <ul role="tablist" className="tmnl-bullet-list">
            {reviews.map((r, i) => (
              <li key={i} className="tmnl-bullet-item">
                <button
                  type="button"
                  data-centered-slider="bullet"
                  role="tab"
                  aria-selected="false"
                  className="tmnl-bullet"
                  aria-label={`Show review by ${r.name}`}
                >
                  <span className="tmnl-bullet-text">{r.initials}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="tmnl-track">
          <div
            aria-label="Testimonials"
            data-centered-slider="list"
            role="group"
            className="tmnl-slider-list"
          >
            {reviews.map((r, i) => (
              <div key={i} data-centered-slider="slide" className="tmnl-slide">
                <article className="bento tmnl-card">
                  <Stars />
                  <blockquote>&ldquo;{r.quote}&rdquo;</blockquote>
                  <div className="byline">
                    <span className="avi">{r.initials}</span>
                    <div className="who">
                      <b>{r.name}</b>
                      <span>{r.role}</span>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="tmnl-controls">
          <button
            type="button"
            aria-label="Previous review"
            data-centered-slider="prev-button"
            className="tmnl-button is-prev"
          >
            <svg viewBox="0 0 24 24" fill="none" className="tmnl-arrow">
              <path d="M14 19L21 12L14 5" stroke="currentColor" strokeMiterlimit="10" />
              <path d="M21 12H2" stroke="currentColor" strokeMiterlimit="10" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next review"
            data-centered-slider="next-button"
            className="tmnl-button"
          >
            <svg viewBox="0 0 24 24" fill="none" className="tmnl-arrow">
              <path d="M14 19L21 12L14 5" stroke="currentColor" strokeMiterlimit="10" />
              <path d="M21 12H2" stroke="currentColor" strokeMiterlimit="10" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
