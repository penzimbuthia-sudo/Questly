import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Enter your email and password.');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const user = await login(form.email, form.password);
      const from = location.state?.from?.pathname;
      navigate(from || `/${user?.role ?? 'learner'}`, { replace: true });
    } catch (err) {
      setError(err.message || 'Could not log in. Check your details and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#10151C] px-4">
      <div className="w-full max-w-sm rounded-md border border-[#28313F] bg-[#161D28] p-8">
        <h1 className="mb-1 text-xl font-medium text-[#E9EBEF]">Welcome back</h1>
        <p className="mb-6 text-sm text-[#8B93A7]">Log in to continue your path.</p>

        {error && (
          <div className="mb-4 rounded-sm border border-red-900/50 bg-red-950/40 px-3 py-2 text-xs text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs text-[#8B93A7]" htmlFor="email">Email</label>
            <input
              id="email" name="email" type="email" value={form.email} onChange={handleChange}
              className="w-full rounded-sm border border-[#28313F] bg-[#10151C] px-3 py-2 text-sm text-[#E9EBEF] outline-none focus:border-[#2A9D8F]"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-[#8B93A7]" htmlFor="password">Password</label>
            <input
              id="password" name="password" type="password" value={form.password} onChange={handleChange}
              className="w-full rounded-sm border border-[#28313F] bg-[#10151C] px-3 py-2 text-sm text-[#E9EBEF] outline-none focus:border-[#2A9D8F]"
              placeholder="••••••••"
            />
          </div>

          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-xs text-[#6EE7DD] hover:underline">Forgot password?</Link>
          </div>

          <button
            type="submit" disabled={submitting}
            className="w-full rounded-sm bg-[#2A9D8F] py-2 text-sm font-semibold text-[#08201C] disabled:opacity-60"
          >
            {submitting ? 'Logging in…' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  )
}