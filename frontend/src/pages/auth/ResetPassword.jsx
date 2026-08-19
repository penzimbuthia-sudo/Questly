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
      await authService.resetPassword(token, form.password);
      setDone(true);
      setTimeout(() => navigate('/login', { replace: true }), 1500);
    } catch (err) {
      setError(err.message || 'Could not reset your password. Request a new link.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#10151C] px-4">
      <div className="w-full max-w-sm rounded-md border border-[#28313F] bg-[#161D28] p-8">
        <h1 className="mb-1 text-xl font-medium text-[#E9EBEF]">Set a new password</h1>

        {done ? (
          <p className="text-sm text-[#6EE7DD]">Password updated. Redirecting to login…</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4"></form>
        )}

        <p className="mt-6 text-center text-xs text-[#8B93A7]">
          <Link to="/login" className="text-[#6EE7DD] hover:underline">Back to login</Link>
        </p>
      </div>
    </div>
  )
}