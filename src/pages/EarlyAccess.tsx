"use client";
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Rocket } from 'lucide-react';
import { SparklesCore } from '../components/ui/sparkles';

const EarlyAccess = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'developer' | 'contributor' | 'both'>('developer');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!email) {
      setError('Please enter an email address.');
      return;
    }

    setLoading(true);
    try {
      // Backend stub
      const res = await fetch('/api/v1/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role, notes }),
      });

      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      setMessage('Thanks – you’re on the early access list.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not submit request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* 1. BACKGROUND LAYER - Moved to top and added pointer-events-none */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SparklesCore
          id="tsparticlesearly"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={150}
          className="w-full h-full"
          particleColor="#10b981"
          speed={0.5}
        />
        {/* Adjusted the mask - transparent center should be larger to see the form */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      {/* 2. CONTENT LAYER */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-16 sm:py-20">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mb-8 sm:mb-10 inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-slate-500 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft size={12} className="sm:w-4 sm:h-4" />
          Back to overview
        </button>

        <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1.1fr_1fr] items-start">
          {/* Copy column */}
          <div className="space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 sm:gap-3 border border-emerald-500/40 bg-emerald-500/10 px-2 sm:px-3 py-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-emerald-300">
              <Rocket size={12} className="sm:w-4 sm:h-4" />
              Early console access
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white sm:text-5xl">
              Be first to ship on the <span className="text-emerald-400">Computebay grid</span>.
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-slate-400">
              We&apos;re opening the developer console and contributor portal in
              stages. Share how you plan to use Computebay.
            </p>

            <div className="grid gap-3 sm:gap-4 text-xs text-slate-300 sm:grid-cols-2">
              <div className="space-y-1">
                <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-slate-500">For job submitters</div>
                <p>Batch and simulation teams who want predictable pricing.</p>
              </div>
              <div className="space-y-1">
                <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-slate-500">For contributors</div>
                <p>GPU and CPU owners who want to onboard hardware early.</p>
              </div>
            </div>
          </div>

          {/* Form column */}
          <div className="border border-white/10 bg-[#050505]/80 backdrop-blur-md p-6 sm:p-8 shadow-2xl">
            <div className="mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 sm:h-9 w-8 sm:w-9 items-center justify-center bg-emerald-500/10 text-emerald-400 border border-emerald-500/40">
                <Mail size={16} className="sm:w-5 sm:h-5" />
              </div>
              <div>
                <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-slate-500">Request invite</div>
                <div className="text-sm font-semibold text-white">Join the early registration list</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="email" className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-slate-500">Work email</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-slate-700 bg-black/60 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-emerald-400"
                />
              </div>

              <div className="space-y-1.5">
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-slate-500">I am primarily a…</span>
                <div className="grid grid-cols-3 gap-1 sm:gap-2 text-[10px] sm:text-[11px]">
                  {(['developer', 'contributor', 'both'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setRole(opt)}
                      className={`border px-1 sm:px-2 py-1 font-mono uppercase tracking-[0.15em] transition-colors ${
                        role === opt ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300' : 'border-slate-700 bg-black/40 text-slate-400 hover:border-slate-500'
                      }`}
                    >
                      {opt === 'developer' ? 'Submitter' : opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="notes" className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-slate-500">What do you plan to run?</label>
                <textarea
                  id="notes"
                  rows={3}
                  placeholder="e.g. nightly risk simulations..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full resize-none border border-slate-700 bg-black/60 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-emerald-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex w-full items-center justify-center border border-emerald-400 bg-emerald-500 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-black transition hover:bg-emerald-400 disabled:opacity-60"
              >
                {loading ? 'Submitting…' : 'Request early access'}
              </button>

              {message && <div className="mt-2 border border-emerald-500/60 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-200">{message}</div>}
              {error && <div className="mt-2 border border-rose-500/60 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarlyAccess;