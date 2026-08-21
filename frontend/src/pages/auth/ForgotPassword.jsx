import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../services/authService';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Enter your email.');
      return;
    }

    setError('');
    setStatus('sending');

    try {
      await authService.forgotPassword(email);
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Something went wrong. Try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-page px-4">
      <div className="w-full max-w-sm rounded-md border border-line/10 bg-card p-8 shadow-sm">
        <h1 className="mb-1 text-xl font-medium text-fg">Reset your password</h1>
        <p className="mb-6 text-sm text-fg/60">We'll email you a reset link.</p>

        {status === 'sent' ? (
          <p className="rounded-sm border border-tone-success-fg/20 bg-tone-success-bg px-3 py-2 text-sm text-tone-success-fg">
            Check your inbox for a reset link.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-sm border border-tone-danger-fg/20 bg-tone-danger-bg px-3 py-2 text-xs text-tone-danger-fg">
                {error}
              </div>
            )}
            <div>
              <label className="mb-1 block text-xs text-fg/60" htmlFor="email">Email</label>
              <input
                id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-sm border border-line/15 bg-page px-3 py-2 text-sm text-fg outline-none focus:border-royal"
              />
            </div>
            <button
              type="submit" disabled={status === 'sending'}
              className="w-full rounded-sm bg-royal py-2 text-sm font-semibold text-ivory disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending…' : 'Send reset link'}
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