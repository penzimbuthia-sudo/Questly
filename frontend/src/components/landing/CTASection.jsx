
// feature/your-name/landing-page/CTASection.jsx
export default function CTASection() {
  return (
    <section className="relative px-6 md:px-12 lg:px-20 py-24 bg-violet-600 text-white overflow-hidden">

      {/* Decorative glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-125 h-125 bg-violet-400 opacity-20 blur-3xl rounded-full"></div>
      </div>

      <div className="relative max-w-5xl mx-auto text-center">

        {/* Trust indicator */}
        <p className="text-sm font-medium tracking-wide uppercase mb-4 opacity-90">
          Join 12,000+ active contributors
        </p>

        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Ready to Start Contributing?
        </h2>

        <p className="text-lg md:text-xl mb-10 max-w-xl mx-auto opacity-90">
          Share knowledge, earn rewards, and help shape the future of learning.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-4 bg-white text-violet-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md">
            Create Your Account
          </button>

          <button className="px-8 py-4 bg-violet-500/40 border border-white/20 rounded-lg font-semibold hover:bg-violet-500/60 transition-colors">
            Explore Community
          </button>
        </div>
      </div>
    </section>
  )
}
