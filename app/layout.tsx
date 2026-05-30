import type { Metadata } from 'next'
import { Bricolage_Grotesque, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/layout/Sidebar'
import FloatingCTAs from '@/components/layout/FloatingCTAs'
import IconSprite from '@/components/ui/IconSprite'
import { brand } from '@/lib/brand'

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

export const metadata: Metadata = {
  title: brand.identity.tagline
    ? `${brand.identity.name} · ${brand.identity.tagline}`
    : brand.identity.name,
  description: brand.identity.description,
  openGraph: {
    title: brand.identity.name,
    description: brand.identity.tagline,
    locale: LOCALE_OG_MAP[brand.identity.locale],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={brand.identity.locale}
      className={`${bricolage.variable} ${spaceGrotesk.variable}`}
      style={{
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
        <FloatingCTAs />
      </body>
    </html>
  )
}
