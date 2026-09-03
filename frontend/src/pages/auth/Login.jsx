import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import PasswordInput from '../../components/auth/PasswordInput';
import BackToHome from '../../components/auth/BackToHome';

export default function Login() {
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

      console.log("LOGIN USER:", user);
      console.log("ROLE:", user?.role);
      console.log("FROM:", location.state?.from?.pathname);

      const from = location.state?.from?.pathname;
      navigate(from || `/${user?.role ?? 'learner'}`, { replace: true });
    } catch (err) {
      setError(err.message || 'Could not log in. Check your details and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-page px-4">
      <div className="w-full max-w-sm rounded-md border border-line/10 bg-card p-8 shadow-sm">
        <BackToHome />
        
        <h1 className="mb-1 text-xl font-medium text-fg">Welcome back</h1>
        <p className="mb-6 text-sm text-fg/60">Log in to continue your path.</p>

        {error && (
          <div className="mb-4 rounded-sm border border-tone-danger-fg/20 bg-tone-danger-bg px-3 py-2 text-xs text-tone-danger-fg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs text-fg/60" htmlFor="email">Email</label>
            <input
              id="email" name="email" type="email" value={form.email} onChange={handleChange}
              className="w-full rounded-sm border border-line/15 bg-page px-3 py-2 text-sm text-fg outline-none focus:border-royal"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-fg/60" htmlFor="password">Password</label>
            <div>
              <PasswordInput id="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" />
            </div>
          </div>

          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-xs text-royal hover:underline">Forgot password?</Link>
          </div>

          <button
            type="submit" disabled={submitting}
            className="w-full rounded-sm bg-royal py-2 text-sm font-semibold text-ivory disabled:opacity-60"
          >
            {submitting ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-fg/60">
          Don't have an account? <Link to="/register" className="text-royal hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}