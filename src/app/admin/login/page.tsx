"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Send to secure API instead of client-side check
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh(); // Refresh to update middleware state
        return;
      }
      
      const data = await res.json();
      setError(data.error || 'Invalid credentials');
    } catch (e) {
      setError('Unexpected error during authentication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-lg p-8">
        <h2 className="text-2xl font-light mb-4">Admin Sign In</h2>
        <p className="text-white/60 text-sm mb-6">Sign in with your admin credentials to access the dashboard.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/60 text-sm mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg focus:border-[#D4AF37] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-white/60 text-sm mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg focus:border-[#D4AF37] focus:outline-none"
            />
          </div>

          {error && <div className="text-red-400 text-sm">{error}</div>}

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:flex-1 bg-[#D4AF37] text-black px-4 py-3 rounded-lg hover:bg-[#D4AF37]/90 disabled:opacity-50 transition-all duration-200"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
            <a
              href="/"
              className="w-full sm:flex-1 text-center border border-white/20 text-white px-4 py-3 rounded-lg hover:border-[#D4AF37]/50 transition-colors duration-200"
            >
              Home
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
