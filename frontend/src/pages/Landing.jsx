// src/pages/Landing.jsx
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import FeatureGrid from "../components/landing/FeatureGrid";
import HowItWorks from "../components/landing/HowItWorks";
import RolesShowcase from "../components/landing/RolesShowcase";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 antialiased">
      {/* Navigation */}
      <Navbar />

      <main className="flex flex-col">
        {/* Hero – main value proposition */}
        <Hero />

        {/* Core features */}
        <section className="py-24">
          <FeatureGrid />
        </section>

        {/* How the platform works */}
        <section className="py-24 bg-slate-900/50">
          <HowItWorks />
        </section>

        {/* Roles / Community / Social proof */}
        <section className="py-24">
          <RolesShowcase />
        </section>

        {/* Final CTA */}
        <section className="py-24">
          <CTASection />
        </section>
      </main>

      <Footer />
    </div>
  );
}