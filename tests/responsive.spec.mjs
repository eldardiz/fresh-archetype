import { test, expect } from '@playwright/test'

const VIEWPORTS = [
  { name: '01-mobile-sm', width: 375, height: 812 },
  { name: '02-mobile-lg', width: 414, height: 896 },
  { name: '03-tablet-p',  width: 768, height: 1024 },
  { name: '04-tablet-l',  width: 1024, height: 768 },
  { name: '05-laptop',    width: 1280, height: 800 },
  { name: '06-desktop',   width: 1440, height: 900 },
]

const SECTIONS = ['hero', 'featured', 'artisans', 'signature', 'about', 'faq', 'testimonials', 'contact']

// Ignore noise: Next dev hydration warning from browser extensions, and Unsplash
// 404s on placeholder photo URLs that are part of the design system seed.
const IGNORED_ERROR_PATTERNS = [
  /A tree hydrated/i,
  /unsplash\.com.*404/i,
  /Failed to load resource.*unsplash/i,
  /upstream image response failed/i,
  // generic 404 from <img> tags for placeholder photos — verified via request failure logging
  /^Failed to load resource:.*status of 404/i,
]

function isIgnoredError(text) {
  return IGNORED_ERROR_PATTERNS.some((p) => p.test(text))
}

for (const vp of VIEWPORTS) {
  test.describe(`${vp.name} (${vp.width}×${vp.height})`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } })

    test('renders without horizontal overflow + captures screenshots', async ({ page }) => {
      const errors = []
      page.on('pageerror', (e) => { if (!isIgnoredError(e.message)) errors.push(`[pageerror] ${e.message}`) })
      page.on('console', (m) => {
        if (m.type() === 'error' && !isIgnoredError(m.text())) errors.push(`[console] ${m.text()}`)
      })

      await page.goto('/', { waitUntil: 'networkidle' })

      // Screenshots first so we always have evidence regardless of later assertion failures.
      await page.screenshot({ path: `test-results/${vp.name}/full.png`, fullPage: true })
      for (const id of SECTIONS) {
        const el = page.locator(`#${id}`).first()
        if ((await el.count()) === 0) continue
        await el.scrollIntoViewIfNeeded()
        await page.waitForTimeout(180)
        await el.screenshot({ path: `test-results/${vp.name}/${id}.png` })
      }

      // Overflow check + diagnostics
      const overflow = await page.evaluate(() => {
        const html = document.documentElement
        const diff = html.scrollWidth - html.clientWidth
        if (diff <= 1) return { diff, offenders: [] }
        // Find elements wider than viewport — top 10 by overflow amount
        const all = Array.from(document.querySelectorAll('*'))
        const offenders = all
          .map((el) => {
            const r = el.getBoundingClientRect()
            return { tag: el.tagName.toLowerCase(), cls: (el.className && el.className.toString().slice(0, 50)) || '', right: r.right, width: r.width }
          })
          .filter((o) => o.right > html.clientWidth + 1)
          .sort((a, b) => b.right - a.right)
          .slice(0, 10)
        return { diff, offenders }
      })
      expect(overflow.diff, `horizontal overflow at ${vp.width}px (offenders: ${JSON.stringify(overflow.offenders)})`).toBeLessThanOrEqual(1)

      expect(errors, `console/page errors at ${vp.width}px:\n${errors.join('\n')}`).toEqual([])
    })

    test('sidebar visibility matches viewport rule', async ({ page }) => {
      await page.goto('/')
      const rail = page.locator('.rail').first()
      const displayed = await rail.evaluate((el) => {
        if (!el) return false
        const style = window.getComputedStyle(el)
        return style.display !== 'none' && style.visibility !== 'hidden'
      }).catch(() => false)

      if (vp.width >= 900) {
        expect(displayed, `rail should be visible at ${vp.width}px`).toBe(true)
      } else {
        expect(displayed, `rail should be hidden at ${vp.width}px`).toBe(false)
      }
    })

    test('floating CTA cluster is reachable', async ({ page }) => {
      await page.goto('/')
      const cta = page.locator('.cta-cluster').first()
      await expect(cta).toBeVisible()
      const box = await cta.boundingBox()
      expect(box, 'cta-cluster bounding box exists').not.toBeNull()
      if (box) {
        expect(box.x + box.width).toBeLessThanOrEqual(vp.width + 1)
        expect(box.y + box.height).toBeLessThanOrEqual(vp.height + 1)
      }
    })

    test('FAQ accordion toggles', async ({ page }) => {
      await page.goto('/')
      const second = page.locator('#faq details').nth(1)
      await second.scrollIntoViewIfNeeded()
      const before = await second.evaluate((d) => d.open)
      await second.locator('summary').click()
      const after = await second.evaluate((d) => d.open)
      expect(after).toBe(!before)
    })

    test('testimonial slider has 6 slides, 6 bullets, prev/next', async ({ page }) => {
      await page.goto('/')
      await page.locator('#testimonials').scrollIntoViewIfNeeded()
      await expect(page.locator('[data-centered-slider="slide"]')).toHaveCount(6)
      await expect(page.locator('[data-centered-slider="bullet"]')).toHaveCount(6)
      await expect(page.locator('[data-centered-slider="prev-button"]')).toBeVisible()
      await expect(page.locator('[data-centered-slider="next-button"]')).toBeVisible()
    })
  })
}
