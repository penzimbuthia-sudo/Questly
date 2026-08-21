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
    <div className="min-h-screen bg-slate-950 text-slate-50 antialiased">
      <Navbar />

      <main className="flex flex-col">
        {/* Hero Section */}
        <section className="pt-32 pb-24">
          <Hero />
        </section>

        {/* Feature Grid */}
        <section className="py-24">
          <FeatureGrid />
        </section>

        {/* How It Works */}
        <section className="py-24 bg-slate-900/50">
          <HowItWorks />
        </section>

        {/* Roles Showcase */}
        <section className="py-24">
          <RolesShowcase />
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <CTASection />
        </section>
      </main>

      <Footer />
    </div>
  )
}
