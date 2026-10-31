import { useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import GermanSection from './components/GermanSection'
import LanguagesSection from './components/LanguagesSection'
import JapaneseSection from './components/JapaneseSection'
import FrenchSection from './components/FrenchSection'
import Splash from './components/Splash'
import GlobalJourney from './components/GlobalJourney'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import { initSmoothScroll } from './lib/smoothScroll'
import { ScrollTrigger } from './lib/gsap'

export default function App() {
  useEffect(() => {
    const stop = initSmoothScroll()
    // phones: don't re-measure every time the address bar slides in and out
    ScrollTrigger.config({ ignoreMobileResize: true })
    // fonts change text metrics; re-measure pins once they're in
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return stop
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Splash />
      <Navbar />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <LanguagesSection />
        <GermanSection />
        <JapaneseSection />
        <FrenchSection />
        <GlobalJourney />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
