// Inline SVG sprite — referenced via <use href="#i-name"/> throughout the site.
// One source of truth for icons; renders once at the top of <body>.

export default function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <symbol id="i-mark" viewBox="0 0 32 32">
          <path fill="currentColor" d="M16 0 C 16 9.5 22.5 16 32 16 C 22.5 16 16 22.5 16 32 C 16 22.5 9.5 16 0 16 C 9.5 16 16 9.5 16 0 Z" />
        </symbol>
        <symbol id="i-hex" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 1.6 21 6.8 21 17.2 12 22.4 3 17.2 3 6.8z" />
        </symbol>
        <symbol id="i-home" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3.5 11 12 4l8.5 7M5.5 9.8V20h5v-6h3v6h5V9.8" />
        </symbol>
        <symbol id="i-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6h16M4 12h16M4 18h10" />
        </symbol>
        <symbol id="i-about" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v.01M11 12h1v5h1" />
        </symbol>
        <symbol id="i-gallery" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3.5" y="4" width="17" height="14" rx="2" />
          <path d="M3.5 14l4-3.5 4 3 3.5-2.5 5.5 4" />
          <circle cx="9" cy="9" r="1.2" />
        </symbol>
        <symbol id="i-contact" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
          <path d="M4 7l8 6 8-6" />
        </symbol>
        <symbol id="i-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </symbol>
        <symbol id="i-leaf" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 4c0 8-5.5 13-13 13H4c0-8 5.5-13 13-13h3z" />
          <path d="M4 20c4-5 9-8 14-9" />
        </symbol>
        <symbol id="i-spark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
        </symbol>
        <symbol id="i-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 4.5h3l1.5 4-2 1.2c1 2.2 2.8 4 5 5l1.2-2 4 1.5v3a2 2 0 0 1-2 2A14 14 0 0 1 3 6.5a2 2 0 0 1 2-2z" />
        </symbol>
        <symbol id="i-cal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3.5" y="5" width="17" height="15" rx="2" />
          <path d="M3.5 10h17M8 3.5v3M16 3.5v3" />
        </symbol>
        <symbol id="i-arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </symbol>
        <symbol id="i-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2">
          <path d="M12 5v14M6 13l6 6 6-6" />
        </symbol>
        <symbol id="i-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2">
          <path d="M12 5v14M5 12h14" />
        </symbol>
        <symbol id="i-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
          <circle cx="12" cy="9.5" r="2.4" />
        </symbol>
        <symbol id="i-star" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 2.5 14.85 9l7.15.6-5.4 4.7 1.6 7-6.2-3.8L5.8 21.3l1.6-7L2 9.6 9.15 9z" />
        </symbol>
      </defs>
    </svg>
  )
}
