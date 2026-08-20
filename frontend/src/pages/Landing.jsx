// feature/your-name/landing-page/Landing.jsx
import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'
import FeatureGrid from '../components/landing/FeatureGrid'
import HowItWorks from '../components/landing/HowItWorks'
import RolesShowcase from '../components/landing/RolesShowcase'
import CTASection from '../components/landing/CTASection'
import Footer from '../components/landing/Footer'

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
