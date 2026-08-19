import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#10151C] px-4 text-center">
          <p className="mb-2 font-mono text-xs tracking-widest text-[#5C6478]">404</p>
          <h1 className="mb-2 text-2xl font-medium text-[#E9EBEF]">Page not found</h1>
          <p className="mb-6 text-sm text-[#8B93A7]">
            The page you're looking for doesn't exist or has moved.
          </p>

          <Link to="/" className="rounded-sm bg-[#2A9D8F] px-4 py-2 text-sm font-semibold text-[#08201C]">
            Back home
          </Link>
        </div>
    )
}