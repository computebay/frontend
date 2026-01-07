import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Rocket } from 'lucide-react'

const EarlyAccess = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'developer' | 'contributor' | 'both'>(
    'developer',
  )
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setError(null)

    if (!email) {
      setError('Please enter an email address.')
      return
    }

    setLoading(true)
    try {
      // Backend stub – adjust to match your API
      const res = await fetch('/api/v1/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role, notes }),
      })

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`)
      }

      setMessage('Thanks – you’re on the early access list.')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Could not submit your request. You can also email us directly.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative z-10 py-20">
      <button
        type="button"
        onClick={() => navigate('/')}
        className="mb-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500 hover:text-emerald-400"
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

          <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
            Be first to ship on the{' '}
            <span className="text-emerald-400">Computebay grid</span>.
          </h1>

          <p className="max-w-xl text-sm leading-relaxed text-slate-400">
            We&apos;re opening the developer console and contributor portal in
            stages. Share how you plan to use Computebay and we&apos;ll reach
            out with early access links, migration help, and priority support.
          </p>

          <div className="grid gap-4 text-xs text-slate-300 sm:grid-cols-2">
            <div className="space-y-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
                For job submitters
              </div>
              <p>
                Batch and simulation teams who want predictable pricing and a
                simple web console before the CLI lands.
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
                For contributors
              </div>
              <p>
                GPU and CPU owners who want to onboard hardware early, test the
                agent, and start earning credits from day one.
              </p>
            </div>
          </div>

          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-600">
            We only use this email to contact you about early access – no spam,
            no list rentals.
          </p>
        </div>

        {/* Form column */}
        <div className="border border-white/10 bg-[#050505] p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center bg-emerald-500/10 text-emerald-400 border border-emerald-500/40">
              <Mail size={18} />
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
                Request invite
              </div>
              <div className="text-sm font-semibold text-white">
                Join the early registration list
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500"
              >
                Work email
              </label>
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
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
                I am primarily a…
              </span>
              <div className="grid grid-cols-3 gap-2 text-[11px]">
                {[
                  { id: 'developer', label: 'Job submitter' },
                  { id: 'contributor', label: 'Contributor' },
                  { id: 'both', label: 'Both' },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() =>
                      setRole(option.id as 'developer' | 'contributor' | 'both')
                    }
                    className={`border px-2 py-1 font-mono uppercase tracking-[0.15em] ${
                      role === option.id
                        ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300'
                        : 'border-slate-700 bg-black/40 text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="notes"
                className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500"
              >
                What do you plan to run?
              </label>
              <textarea
                id="notes"
                rows={4}
                placeholder="e.g. nightly risk simulations, MD sweeps, multimodal inference..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full resize-none border border-slate-700 bg-black/60 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-emerald-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex w-full items-center justify-center border border-emerald-400 bg-emerald-500 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Submitting…' : 'Request early access'}
            </button>

            {message && (
              <div className="mt-2 border border-emerald-500/60 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-200">
                {message}
              </div>
            )}
            {error && (
              <div className="mt-2 border border-rose-500/60 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
                {error}
              </div>
            )}

            <p className="mt-2 text-[10px] font-mono text-slate-600">
              Prefer email? Reach us at{' '}
              <a
                href="mailto:early@computebay.dev"
                className="text-emerald-400 hover:underline"
              >
                early@computebay.dev
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EarlyAccess


