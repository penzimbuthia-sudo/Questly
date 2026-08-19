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
    <div className="flex min-h-screen items-center justify-center bg-[#10151C] px-4 py-10">
      <div className="w-full max-w-sm rounded-md border border-[#28313F] bg-[#161D28] p-8">
        <h1 className="mb-1 text-xl font-medium text-[#E9EBEF]">Create your account</h1>
        <p className="mb-6 text-sm text-[#8B93A7]">Join as a learner or a contributor.</p>

        {error && (
          <div className="mb-4 rounded-sm border border-red-900/50 bg-red-950/40 px-3 py-2 text-xs text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs text-[#8B93A7]" htmlFor="name">Name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange}
              className="w-full rounded-sm border border-[#28313F] bg-[#10151C] px-3 py-2 text-sm text-[#E9EBEF] outline-none focus:border-[#2A9D8F]" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-[#8B93A7]" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange}
              className="w-full rounded-sm border border-[#28313F] bg-[#10151C] px-3 py-2 text-sm text-[#E9EBEF] outline-none focus:border-[#2A9D8F]" />
          </div>
        </form>
      </div>
    </div>
  )
}