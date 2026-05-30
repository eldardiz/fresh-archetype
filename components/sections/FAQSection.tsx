interface FaqItem {
  num: string
  q: string
  a: React.ReactNode
}

const FALLBACK: FaqItem[] = [
  {
    num: '01',
    q: 'Do you take reservations?',
    a: 'Tables of four or more, yes, book through the table-booking button bottom-right. Walk-ins always welcome, and the counter is first-come.',
  },
  {
    num: '02',
    q: 'Is everything gluten-free or vegan?',
    a: "Plenty is, none of it is by accident. Every menu item is tagged for gluten, dairy, nut and refined-sugar content. Ask any staff member, they're trained on the full ingredient list.",
  },
  {
    num: '03',
    q: 'Can you cater an event?',
    a: (
      <>
        Weddings, offices, birthdays, baby showers, we cater anything from twelve to two-hundred. Email <b>cater@fresh.co</b> at least seven days ahead and we&apos;ll send a menu and a quote within forty-eight hours.
      </>
    ),
  },
  {
    num: '04',
    q: 'Do you bake gluten-free?',
    a: 'Two gluten-free items run every day, a buckwheat loaf and a flourless chocolate cake, both made on a separate bench. We are not a fully gluten-free kitchen, so trace contact is possible.',
  },
  {
    num: '05',
    q: 'Can I pre-order a custom cake?',
    a: (
      <>
        Yes, with five days notice. Tell us the headcount, the occasion, and any allergies; we&apos;ll send back two or three options with prices. Pickup only, no delivery for cakes.
      </>
    ),
  },
  {
    num: '06',
    q: 'Are dogs allowed?',
    a: 'On the terrace, always. Inside, only assistance dogs. Water bowls live by the front door, and the croissant crumbs are on the house.',
  },
  {
    num: '07',
    q: 'What time does the morning bake come out?',
    a: 'Croissants and pain au chocolat at 7am sharp. Sourdough and country loaves around 8:30. Cinnamon buns when the timer goes off, usually before 9. If something matters to you, call ahead and we&apos;ll set one aside.',
  },
]

export default function FAQSection() {
  return (
    <section id="faq" className="faq wrap">
      <div className="faq-grid">
        <div className="faq-side">
          <span className="hex-pill">
            <svg className="hex"><use href="#i-hex" /></svg>
            FAQ
          </span>
          <h2>Things people ask us at the counter.</h2>
          <p className="lede">Can&apos;t find what you&apos;re looking for? Call us, we actually pick up.</p>
        </div>

        <div className="bento faq-card">
          {FALLBACK.map((item, i) => (
            <details key={item.num} className="faq-item" open={i === 0}>
              <summary>
                <span className="q-num">{item.num}</span>
                <span className="q-text">{item.q}</span>
                <span className="toggle"><svg><use href="#i-plus" /></svg></span>
              </summary>
              <div className="ans">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
