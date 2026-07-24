'use client';

import { useState } from 'react';
import Image from 'next/image';
import { signIn } from '@/app/actions/admin/auth';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await signIn(email, password);
      if ('error' in result) {
        setError(result.error);
        setLoading(false);
      } else {
        // Full page navigation so middleware rewrites take effect
        window.location.href = '/';
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-6">
            <Image
              src="https://i.imgur.com/NSU2tVP.png"
              alt="TEDx IMT Paris"
              width={140}
              height={36}
              className="w-auto h-14"
            />
          </div>
          <p className="text-white/40 text-sm uppercase tracking-widest">Admin Panel</p>
        </div>

        <div className="nuclear-card rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e62b1e]/10 border border-[#e62b1e]/30">
              <Lock className="h-5 w-5 text-[#e62b1e]" />
            </div>
            <h1 className="text-lg font-bold text-white">Sign in</h1>
          </div>

          {error && (
            <div className="mb-6 rounded-xl bg-red-900/30 border border-red-500/40 p-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-nuclear"
                placeholder="admin@example.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="input-nuclear"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-nuclear-primary w-full py-3 rounded-xl font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
