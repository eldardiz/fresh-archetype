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
