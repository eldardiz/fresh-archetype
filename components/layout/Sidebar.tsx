import ScrollSpy from './ScrollSpy'

const ICONS = [
  { href: '#hero', label: 'Home', icon: 'i-home' },
  { href: '#featured', label: 'Menu', icon: 'i-menu' },
  { href: '#artisans', label: 'Artisans', icon: 'i-leaf' },
  { href: '#signature', label: 'Signature', icon: 'i-spark' },
  { href: '#about', label: 'About', icon: 'i-about' },
  { href: '#faq', label: 'FAQ', icon: 'i-about' },
  { href: '#testimonials', label: 'Reviews', icon: 'i-gallery' },
  { href: '#contact', label: 'Visit', icon: 'i-contact' },
] as const

export default function Sidebar() {
  return (
    <aside className="rail" aria-label="Primary">
      <a href="#hero" className="rail-pill" aria-label="Home">
        <svg className="mark"><use href="#i-mark" /></svg>
      </a>
      <nav className="rail-nav" aria-label="Sections">
        {ICONS.map((item, i) => (
          <a
            key={item.href + i}
            href={item.href}
            className={i === 0 ? 'active' : undefined}
            data-label={item.label}
          >
            <svg><use href={`#${item.icon}`} /></svg>
          </a>
        ))}
      </nav>
      <a href="#contact" className="rail-pill bottom" aria-label="Visit">
        <svg className="mark"><use href="#i-mark" /></svg>
      </a>
      <ScrollSpy />
    </aside>
  )
}
