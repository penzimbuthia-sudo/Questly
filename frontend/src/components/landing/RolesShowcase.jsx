// feature/your-name/landing-page/RolesShowcase.jsx
export default function RolesShowcase() {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-24">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Three Roles. One Ecosystem.</h2>
        <p className="text-gray-600 mb-16 max-w-xl mx-auto">
          Learners, Contributors, and Admins work together to build the future of community learning.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            { role: 'Learner', desc: 'Discover curated learning paths and track your progress.' },
            { role: 'Contributor', desc: 'Create resources, earn XP, and complete challenges.' },
            { role: 'Admin', desc: 'Review submissions, manage content, and oversee community quality.' }
          ].map((r) => (
            <div
              key={r.role}
              className="bg-white p-8 rounded-2xl shadow-md border border-gray-100"
            >
              <h3 className="text-xl font-semibold mb-2">{r.role}</h3>
              <p className="text-gray-600">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
