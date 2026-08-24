import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ROLES = [
  { value: 'learner', label: 'Learner' },
  { value: 'contributor', label: 'Contributor' },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'learner' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.name.trim()) return 'Enter your name.';
    if (!EMAIL_RE.test(form.email)) return 'Enter a valid email address.';
    if (form.password.length < 8) return 'Password must be at least 8 characters.';
    if (form.password !== form.confirmPassword) return 'Passwords do not match.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const user = await register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });
      navigate(`/${user?.role ?? 'learner'}`, { replace: true });
    } catch (err) {
      setError(err.message || 'Could not create your account. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-page px-4 py-10">
      <div className="w-full max-w-sm rounded-md border border-line/10 bg-card p-8 shadow-sm">
        <h1 className="mb-1 text-xl font-medium text-fg">Create your account</h1>
        <p className="mb-6 text-sm text-fg/60">Join as a learner or a contributor.</p>

        {error && (
          <div className="mb-4 rounded-sm border border-tone-danger-fg/20 bg-tone-danger-bg px-3 py-2 text-xs text-tone-danger-fg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs text-fg/60" htmlFor="name">Name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange}
              className="w-full rounded-sm border border-line/15 bg-page px-3 py-2 text-sm text-fg outline-none focus:border-royal" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-fg/60" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange}
              className="w-full rounded-sm border border-line/15 bg-page px-3 py-2 text-sm text-fg outline-none focus:border-royal" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-fg/60" htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={form.password} onChange={handleChange}
              className="w-full rounded-sm border border-line/15 bg-page px-3 py-2 text-sm text-fg outline-none focus:border-royal" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-fg/60" htmlFor="confirmPassword">Confirm password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange}
              className="w-full rounded-sm border border-line/15 bg-page px-3 py-2 text-sm text-fg outline-none focus:border-royal" />
          </div>

          <div>
            <span className="mb-1 block text-xs text-fg/60">I'm joining as</span>
            <div className="flex gap-2">
              {ROLES.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, role: r.value }))}
                  className={`flex-1 rounded-sm border px-3 py-2 text-xs ${
                    form.role === r.value
                      ? 'border-royal bg-royal/10 text-royal'
                      : 'border-line/15 text-fg/60'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" disabled={submitting}
            className="w-full rounded-sm bg-royal py-2 text-sm font-semibold text-ivory disabled:opacity-60">
            {submitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-fg/60">
          Already have an account? <Link to="/login" className="text-royal hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  )
}