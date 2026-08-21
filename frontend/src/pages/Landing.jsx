import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import FeaturesAndHowItWorks from "../../components/landing/FeaturesAndHowItWorks";
import Community from "../../components/landing/Community";
import FinalCTA from "../../components/landing/FinalCTA";
import Footer from "../../components/landing/Footer";

export default function Landing() {
  return (
    <div className="w-full min-h-screen bg-page">
      <Navbar />
      <Hero />
      <FeaturesAndHowItWorks />
      <Community />
      <FinalCTA />
      <Footer />
    </div>
  );
}