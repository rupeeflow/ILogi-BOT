import FAQSection from './components/FaQ'
import Footer from './components/Footer'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import HowItWorks from './components/HowItWorks'
import KeyFeatures from './components/KeyFeatures'
import PricingSection from './components/PricingSection'
import ProductOverview from './components/ProductOverview'
import StatsSection from './components/StatsSection'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ProductOverview />
      <HowItWorks />
      <KeyFeatures />
      <StatsSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </div>
  )
}
