import type { Metadata } from 'next'
import { Bricolage_Grotesque, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/layout/Sidebar'
import FloatingCTAs from '@/components/layout/FloatingCTAs'
import IconSprite from '@/components/ui/IconSprite'
import { brand } from '@/lib/brand'
import { getSiteSettings } from '@/lib/getHomepage'

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const LOCALE_OG_MAP: Record<typeof brand.identity.locale, string> = {
  en: 'en_US',
  fr: 'fr_FR',
  de: 'de_DE',
  es: 'es_ES',
  it: 'it_IT',
}

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings()
  const name = s?.restaurantName ?? brand.identity.name
  const tagline = s?.tagline ?? brand.identity.tagline
  const description = s?.description ?? brand.identity.description
  return {
    title: tagline ? `${name} — ${tagline}` : name,
    description,
    openGraph: {
      title: name,
      description: tagline,
      locale: LOCALE_OG_MAP[brand.identity.locale],
      type: 'website',
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings()
  return (
    <html
      lang={brand.identity.locale}
      className={`${bricolage.variable} ${spaceGrotesk.variable}`}
      style={{
        // Map our next/font CSS variables into the names the stylesheet expects.
        ['--font-display' as never]: `var(--font-bricolage), ui-sans-serif, sans-serif`,
        ['--font-body' as never]: `var(--font-space-grotesk), ui-sans-serif, sans-serif`,
      } as React.CSSProperties}
    >
      <body>
        <IconSprite />
        <div className="shell">
          <Sidebar />
          <main>{children}</main>
        </div>
        <FloatingCTAs settings={settings} />
      </body>
    </html>
  )
}
