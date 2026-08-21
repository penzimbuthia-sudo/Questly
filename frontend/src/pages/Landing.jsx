// feature/your-name/landing-page/Landing.jsx
<<<<<<< HEAD
import Navbar from '../components/Landing/Navbar'
import Hero from '../components/Landing/Hero'
import FeatureGrid from '../components/Landing/FeaturedGrid'
import HowItWorks from '../components/Landing/HowItWorks'
import RolesShowcase from '../components/Landing/RolesShowcase'
import CTASection from '../components/Landing/CTASection'
import Footer from '../components/Landing/Footer'
=======
import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'
import FeatureGrid from '../components/landing/FeatureGrid'
import HowItWorks from '../components/landing/HowItWorks'
import RolesShowcase from '../components/landing/RolesShowcase'
import CTASection from '../components/landing/CTASection'
import Footer from '../components/landing/Footer'
>>>>>>> 29beada173445223fcce41c2ed4682c85bcd3a9f

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
