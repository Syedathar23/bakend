import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Dumbbell, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (login(email, password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid email or password. Use admin@fitstore.com / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-surface-dim flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center text-white mx-auto mb-4">
            <Dumbbell size={32} />
          </div>
          <h1 className="text-h2 font-extrabold text-on-surface">Admin Access</h1>
          <p className="text-body-sm text-on-surface-variant mt-2">Sign in to manage your store</p>
        </div>

        {error && (
          <div className="bg-error-container text-error text-body-sm p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-label-caps text-on-surface-variant mb-1.5 block uppercase">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-outline-variant/40 rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="admin@fitstore.com"
              required
            />
          </div>

          <div>
            <label className="text-label-caps text-on-surface-variant mb-1.5 block uppercase">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-outline-variant/40 rounded-lg px-4 py-3 pr-12 text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 rounded-lg transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
