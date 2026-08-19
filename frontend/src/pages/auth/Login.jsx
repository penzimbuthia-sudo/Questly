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
      </div>
    </div>
  )
}