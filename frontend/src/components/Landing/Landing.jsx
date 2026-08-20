// feature/your-name/landing-page/Landing.jsx
import Navbar from './Navbar'
import Hero from './Hero'
import FeatureGrid from './FeatureGrid'
import HowItWorks from './HowItWorks'
import RolesShowcase from './RolesShowcase'
import CTASection from './CTASection'
import Footer from './Footer'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />

      <main className="flex flex-col gap-28">
        <Hero />
        <FeatureGrid />
        <HowItWorks />
        <RolesShowcase />
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}
