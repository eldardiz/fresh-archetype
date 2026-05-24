import HeroSection from '@/components/sections/HeroSection'
import FeaturedOfferingSection from '@/components/sections/FeaturedOfferingSection'
import ArtisansSection from '@/components/sections/ArtisansSection'
import SignatureSection from '@/components/sections/SignatureSection'
import AboutSection from '@/components/sections/AboutSection'
import FAQSection from '@/components/sections/FAQSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/layout/Footer'
import { getHomepage } from '@/lib/getHomepage'

export const revalidate = 60

export default async function HomePage() {
  const data = await getHomepage()
  return (
    <>
      <HeroSection data={data.hero} settings={data.siteSettings} />
      <FeaturedOfferingSection data={data.featuredOffering} />
      <ArtisansSection />
      <SignatureSection />
      <AboutSection data={data.about} />
      <FAQSection />
      <TestimonialsSection data={data.testimonials} />
      <ContactSection settings={data.siteSettings} />
      <Footer settings={data.siteSettings} />
    </>
  )
}
