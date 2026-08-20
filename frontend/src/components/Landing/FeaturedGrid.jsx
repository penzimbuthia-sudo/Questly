// feature/your-name/landing-page/FeatureGrid.jsx
import { FEATURES } from '../../data/landingContent'

export default function FeatureGrid() {
  return (
    <section className="px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">Why Contributors Love Us</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-white p-8 rounded-2xl shadow-md border border-gray-100"
            >
              <div className="text-violet-600 text-3xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
