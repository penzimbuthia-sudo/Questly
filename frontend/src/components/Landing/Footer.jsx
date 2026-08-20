// feature/your-name/landing-page/Footer.jsx
export default function Footer() {
  return (
    <footer className="px-6 md:px-12 lg:px-20 py-16 bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
        <div>
          <h3 className="text-white font-semibold mb-4">Platform</h3>
          <ul className="flex flex-col gap-2">
            <li>Home</li>
            <li>Community</li>
            <li>Challenges</li>
            <li>Rewards</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Contributors</h3>
          <ul className="flex flex-col gap-2">
            <li>Dashboard</li>
            <li>My Content</li>
            <li>Analytics</li>
            <li>Profile</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="flex flex-col gap-2">
            <li>About</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Legal</h3>
          <ul className="flex flex-col gap-2">
            <li>Terms</li>
            <li>Privacy</li>
          </ul>
        </div>
      </div>

      <p className="text-center text-gray-500 mt-12">
        © 2026 Crowdsourced Learning Platform
      </p>
    </footer>
  )
}
