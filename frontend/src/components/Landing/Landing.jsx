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
