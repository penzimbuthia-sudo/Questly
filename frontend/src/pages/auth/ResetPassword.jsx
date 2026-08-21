import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { authService } from '../../services/authService';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError('This reset link is invalid or expired.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      await authService.resetPassword({ token, password: form.password });
      setDone(true);
      setTimeout(() => navigate('/login', { replace: true }), 1500);
    } catch (err) {
      setError(err.message || 'Could not reset your password. Request a new link.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-page px-4">
      <div className="w-full max-w-sm rounded-md border border-line/10 bg-card p-8 shadow-sm">
        <h1 className="mb-1 text-xl font-medium text-fg">Set a new password</h1>

        {done ? (
          <p className="rounded-sm border border-tone-success-fg/20 bg-tone-success-bg px-3 py-2 text-sm text-tone-success-fg">
            Password updated. Redirecting to login…
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-sm border border-tone-danger-fg/20 bg-tone-danger-bg px-3 py-2 text-xs text-tone-danger-fg">
                {error}
              </div>
            )}
            <div>
              <label className="mb-1 block text-xs text-fg/60" htmlFor="password">New password</label>
              <input
                id="password" name="password" type="password" value={form.password} onChange={handleChange}
                className="w-full rounded-sm border border-line/15 bg-page px-3 py-2 text-sm text-fg outline-none focus:border-royal"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-fg/60" htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange}
                className="w-full rounded-sm border border-line/15 bg-page px-3 py-2 text-sm text-fg outline-none focus:border-royal"
              />
            </div>
            <button
              type="submit" disabled={submitting}
              className="w-full rounded-sm bg-royal py-2 text-sm font-semibold text-ivory disabled:opacity-60"
            >
              {submitting ? 'Updating…' : 'Update password'}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-xs text-fg/60">
          <Link to="/login" className="text-royal hover:underline">Back to login</Link>
        </p>
      </div>
    </div>
  )
}