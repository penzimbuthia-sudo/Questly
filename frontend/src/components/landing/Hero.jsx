// feature/your-name/landing-page/Hero.jsx
export default function Hero() {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-28">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        {/* LEFT */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Crowdsourced Learning Powered by{' '}
            <span className="text-violet-600">Contributors</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-md">
            Share knowledge, earn rewards, complete challenges, and help build the world’s most
            community‑driven learning platform.
          </p>

          <div className="flex gap-4 mt-4">
            <button className="px-6 py-3 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700">
              Get Started
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-100">
              Explore Community
            </button>
          </div>

          {/* HERO STATS */}
          <div className="flex gap-12 mt-10">
            <div>
              <p className="text-3xl font-bold">12k+</p>
              <p className="text-gray-500 text-sm">Contributors</p>
            </div>
            <div>
              <p className="text-3xl font-bold">48k+</p>
              <p className="text-gray-500 text-sm">Resources Created</p>
            </div>
            <div>
              <p className="text-3xl font-bold">320+</p>
              <p className="text-gray-500 text-sm">Active Challenges</p>
            </div>
          </div>
        </div>

        {/* RIGHT — dashboard preview */}
        <div className="rounded-xl shadow-xl bg-white p-4 border border-gray-100">
          <img
            src="/preview-dashboard.png"
            alt="Dashboard Preview"
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  )
}
