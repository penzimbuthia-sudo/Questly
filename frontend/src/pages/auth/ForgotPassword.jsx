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
    <div className="flex min-h-screen items-center justify-center bg-[#10151C] px-4">
      <div className="w-full max-w-sm rounded-md border border-[#28313F] bg-[#161D28] p-8">
        <h1 className="mb-1 text-xl font-medium text-[#E9EBEF]">Reset your password</h1>
        <p className="mb-6 text-sm text-[#8B93A7]">We'll email you a reset link.</p>

        {status === 'sent' ? (
          <p className="text-sm text-[#6EE7DD]">Check your inbox for a reset link.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-sm border border-red-900/50 bg-red-950/40 px-3 py-2 text-xs text-red-300">
                {error}
              </div>
            )}
          </form>
        )}

        <p className="mt-6 text-center text-xs text-[#8B93A7]">
          <Link to="/login" className="text-[#6EE7DD] hover:underline">Back to login</Link>
        </p>
      </div>
    </div>
  )
}