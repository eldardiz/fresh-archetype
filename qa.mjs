import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const OUT = '/tmp/template-02-inspect/qa-out'
await mkdir(OUT, { recursive: true })

const VIEWPORT = { width: 1440, height: 900 }
const SECTIONS = [
  { id: 'hero', name: '01-hero' },
  { id: 'featured', name: '02-featured' },
  { id: 'artisans', name: '03-artisans' },
  { id: 'signature', name: '04-signature' },
  { id: 'about', name: '05-about' },
  { id: 'faq', name: '06-faq' },
  { id: 'testimonials', name: '07-reviews' },
  { id: 'contact', name: '08-contact' },
]

async function capture(targetUrl, label) {
  console.log(`\n— ${label} (${targetUrl})`)
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  const errors = []
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(`[console] ${msg.text()}`) })
  page.on('pageerror', (e) => errors.push(`[pageerror] ${e.message}`))
  page.on('requestfailed', (r) => errors.push(`[net] ${r.url()} ${r.failure()?.errorText}`))

  await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForTimeout(500)

  // Full-page screenshot for a holistic look
  await page.screenshot({ path: `${OUT}/${label}-full.png`, fullPage: true })

  // Per-section screenshots
  for (const s of SECTIONS) {
    const el = await page.$(`#${s.id}`)
    if (!el) {
      console.log(`  miss: #${s.id} not found`)
      continue
    }
    await el.scrollIntoViewIfNeeded()
    await page.waitForTimeout(250)
    await el.screenshot({ path: `${OUT}/${label}-${s.name}.png` })
    console.log(`  ok: ${s.name}`)
  }

  await browser.close()
  if (errors.length) {
    console.log(`\n  ${errors.length} runtime issues on ${label}:`)
    errors.slice(0, 20).forEach((e) => console.log(`    ${e}`))
  } else {
    console.log(`  no runtime errors on ${label}`)
  }
}

await capture('http://localhost:3000', 'dev')
await capture('file:///tmp/template-02-inspect/Fresh%20Homepage.html', 'src')
console.log(`\nDone. Output: ${OUT}`)
