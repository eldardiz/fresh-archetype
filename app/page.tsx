import HeroSection from '@/components/sections/HeroSection'
import FeaturedOfferingSection from '@/components/sections/FeaturedOfferingSection'
import ArtisansSection from '@/components/sections/ArtisansSection'
import SignatureSection from '@/components/sections/SignatureSection'
import AboutSection from '@/components/sections/AboutSection'
import FAQSection from '@/components/sections/FAQSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/layout/Footer'
import FooterParallax from '@/components/layout/FooterParallax'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedOfferingSection />
      <ArtisansSection />
      <SignatureSection />
      <AboutSection />
      <FAQSection />
      <TestimonialsSection />
      <ContactSection />
      <FooterParallax>
        <Footer />
      </FooterParallax>
    </>
  )
}
