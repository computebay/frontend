import React, { useState, type FormEvent } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError('Enter email address.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL || '/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email,
          type: "waitlist_confirmed",
          role: "DEVELOPER"
        }),
      });

      if (!res.ok) throw new Error(`Status ${res.status}`);

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request dropped.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-3 border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 animate-[pulse_2s_ease-in-out_infinite] w-full max-w-md">
        <ShieldCheck size={20} className="text-emerald-400" />
        <p className="text-sm font-mono text-emerald-400">Access Authenticated. Check your inbox.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md relative">
      <form onSubmit={handleSubmit} className="relative flex w-full">
        <input
          type="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-slate-700 bg-black/60 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/20 font-mono"
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-0 top-0 bottom-0 px-6 bg-emerald-500 text-black font-black uppercase text-xs tracking-widest hover:bg-emerald-400 transition-colors disabled:opacity-50 flex items-center gap-2 group"
        >
          {loading ? '...' : 'Join'}
          {!loading && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
        </button>
      </form>
      {error && (
        <div className="absolute top-full mt-2 left-0 text-[10px] font-mono text-rose-400">
          &gt; ERROR: {error}
        </div>
      )}
    </div>
  );
};
