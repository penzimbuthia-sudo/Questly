import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#10151C] px-4 text-center">
      <p className="mb-2 font-mono text-xs tracking-widest text-[#5C6478]">CODALORE</p>
      <h1 className="mb-3 text-2xl font-medium text-[#E9EBEF]">Landing page goes here (Person D)</h1>
      <p className="mb-6 text-sm text-[#8B93A7]">Hero, feature grid, how-it-works, CTA.</p>
      <div className="flex gap-3">
        <Link to="/login" className="rounded-sm border border-[#28313F] px-4 py-2 text-sm text-[#E9EBEF]">Log in</Link>
        <Link to="/register" className="rounded-sm bg-[#2A9D8F] px-4 py-2 text-sm font-semibold text-[#08201C]">Sign up</Link>
      </div>
    </div>
  );
}