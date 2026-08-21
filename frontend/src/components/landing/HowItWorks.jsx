// feature/your-name/landing-page/HowItWorks.jsx
import { CONTRIBUTOR_STEPS } from '../../data/landingContent'

export default function HowItWorks() {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-24 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-12">
          {CONTRIBUTOR_STEPS.map((step, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="text-violet-600 text-4xl">{step.icon}</div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

