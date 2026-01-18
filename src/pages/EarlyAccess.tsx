"use client";
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Rocket, ShieldCheck, Terminal } from 'lucide-react'; // Added icons
import { SparklesCore } from '../components/ui/sparkles';

const EarlyAccess = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'developer' | 'contributor' | 'both'>('developer');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false); // New state for success UI
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError('IDENT_REQUIRED: Enter email address.');
      return;
    }

    setLoading(true);

    

    try {
      // 2. Send the exact body your backend expects
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email,
          type: "waitlist_confirmed",
          role: role.toUpperCase()
        }),
      });

      if (!res.ok) throw new Error(`TERMINAL_ERR: Status ${res.status}`);

      setSubmitted(true);
      // setEmail(''); // Reset form on success
      setNotes('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'UPLINK_FAILURE: Request dropped.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-emerald-500/30">
      {/* BACKGROUND LAYER */}
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
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mb-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to overview
        </button>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] items-start">
          {/* Copy column */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-300">
              <Rocket size={14} />
              Early console access
            </div>

            <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
              Be first to ship on the <span className="text-emerald-400">Computebay grid</span>.
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-slate-400">
              Our transmission is live. Once registered, check your inbox for the
              initialization sequence and waitlist confirmation.
            </p>
          </div>

          {/* Form / Success column */}
          <div className="border border-white/10 bg-[#050505]/80 backdrop-blur-md p-8 shadow-2xl relative overflow-hidden">
            {/* Ambient scanline effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-20 bg-[length:100%_2px,3px_100%]"></div>

            {!submitted ? (
              <>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center bg-emerald-500/10 text-emerald-400 border border-emerald-500/40">
                    <Terminal size={20} />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">System initialization</div>
                    <div className="text-sm font-semibold text-white">Enter access credentials</div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 relative z-30">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">Work email</label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-slate-700 bg-black/60 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">Primary Role</span>
                    <div className="grid grid-cols-3 gap-2 text-[11px]">
                      {(['developer', 'contributor', 'both'] as const).map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setRole(opt)}
                          className={`border px-2 py-1.5 font-mono uppercase tracking-[0.15em] transition-all ${role === opt
                            ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300'
                            : 'border-slate-800 bg-black/40 text-slate-500 hover:border-slate-600'
                            }`}
                        >
                          {opt === 'developer' ? 'Submitter' : opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">Payload Description</label>
                    <textarea
                      rows={3}
                      placeholder="What tasks will you compute?"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full resize-none border border-slate-700 bg-black/60 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-emerald-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative mt-2 inline-flex w-full items-center justify-center border border-emerald-400 bg-emerald-500 px-4 py-3 text-xs font-black uppercase tracking-[0.25em] text-black transition hover:bg-emerald-400 disabled:opacity-50"
                  >
                    {loading ? 'Transmitting...' : 'Request Authorization'}
                  </button>

                  {error && (
                    <div className="mt-4 border border-rose-500/60 bg-rose-500/10 px-3 py-2 text-[10px] font-mono text-rose-300 animate-pulse">
                      &gt; ERROR: {error}
                    </div>
                  )}
                </form>
              </>
            ) : (
              /* SUCCESS STATE UI */
              <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 animate-in fade-in zoom-in duration-500">
                <div className="h-16 w-16 bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 mb-2">
                  <ShieldCheck size={40} />
                </div>
                <h2 className="text-xl font-mono uppercase tracking-widest text-emerald-400">Access Authenticated</h2>
                <p className="text-slate-400 text-xs leading-relaxed max-w-xs font-mono">
                  Your request has been logged to the waitlist. <br /><br />
                  A confirmation packet has been sent to <span className="text-white underline">{email}</span>.
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="text-[10px] font-mono uppercase tracking-widest text-slate-500 hover:text-white underline transition-colors"
                >
                  Return to portal
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarlyAccess;