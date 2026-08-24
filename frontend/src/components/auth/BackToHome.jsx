import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BackToHome() {
  return (
    <Link
      to="/"
      className="mb-6 inline-flex items-center gap-1.5 text-xs text-fg/50 hover:text-fg/80"
    >
      <ArrowLeft size={14} />
      Back to home
    </Link>
  )
}