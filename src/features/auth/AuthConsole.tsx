import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'

type AuthMode = 'login' | 'register'

interface AuthResponse {
  success?: boolean
  message?: string
  user?: unknown
}

const API_BASE =import.meta.env.BASE_URL

const AuthConsole = () => {
  const [mode, setMode] = useState<AuthMode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [me, setMe] = useState<unknown | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setInfo(null)
    setLoading(true)

    try {
      const endpoint = mode === 'login' ? 'login' : 'register'
      const body: Record<string, string> = { email, password }
      if (mode === 'register' && name.trim()) {
        body.name = name.trim()
      }

      const res = await fetch(`${API_BASE}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // credentials: 'include',
        body: JSON.stringify(body),
      })

      const data = (await res.json().catch(() => ({}))) as AuthResponse

      if (!res.ok) {
        throw new Error(
          data.message ||
            `Failed to ${mode}. Status ${res.status} ${res.statusText}`,
        )
      }

      setInfo(
        mode === 'login'
          ? 'Logged in successfully.'
          : 'Registered successfully. You may now be logged in.',
      )

      void fetchMe()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error')
    } finally {
      setLoading(false)
    }
  }

  const fetchMe = async () => {
    setError(null)
    setInfo(null)
    try {
      const res = await fetch(`${API_BASE}/me`, {
        credentials: 'include',
      })
      if (!res.ok) {
        setMe(null)
        throw new Error(`Not authenticated (status ${res.status})`)
      }
      const data = (await res.json()) as AuthResponse
      setMe(data.user ?? data)
      setInfo('Fetched current user.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user')
    }
  }

  const handleLogout = async () => {
    setError(null)
    setInfo(null)
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/logout`, {
        method: 'POST',
        credentials: 'include',
      })
      if (!res.ok) {
        throw new Error(`Failed to logout (status ${res.status})`)
      }
      setMe(null)
      setInfo('Logged out.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to logout')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchMe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isAuthDisabled = loading || !email || !password

  return (
    <section
      id="console"
      className="mt-14 rounded-3xl border border-slate-800 bg-slate-950/80 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.85)] sm:p-6 lg:p-7"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
            Developer console
          </h3>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Use the live auth endpoints to test your session before wiring in
            job submission.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[0.7rem] text-slate-400">
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900 px-2 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Web-first · React + TypeScript
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900 px-2 py-1">
            API base:
            <code className="font-mono text-[0.65rem]">/api/v1/auth</code>
          </span>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        {/* Auth form */}
        <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 sm:p-5">
          <div className="inline-flex rounded-full border border-slate-700 bg-slate-900/80 p-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-300">
            <button
              className={`rounded-full px-3 py-1 transition-colors ${
                mode === 'login'
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-slate-50 shadow-[0_0_0_1px_rgba(191,219,254,0.4)]'
                  : 'text-slate-400'
              }`}
              onClick={() => setMode('login')}
              type="button"
            >
              Login
            </button>
            <button
              className={`rounded-full px-3 py-1 transition-colors ${
                mode === 'register'
                  ? 'bg-gradient-to-r from-sky-500 to-violet-500 text-slate-50 shadow-[0_0_0_1px_rgba(191,219,254,0.4)]'
                  : 'text-slate-400'
              }`}
              onClick={() => setMode('register')}
              type="button"
            >
              Register
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-4 flex flex-col gap-3 text-left sm:mt-5"
          >
            {mode === 'register' && (
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Ada Lovelace"
                  className="rounded-xl border border-slate-600/60 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 shadow-sm outline-none ring-0 transition focus:border-sky-400 focus:shadow-[0_0_0_1px_rgba(56,189,248,0.6)]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="dev@computebay.io"
                className="rounded-xl border border-slate-600/60 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 shadow-sm outline-none ring-0 transition placeholder:text-slate-500 focus:border-sky-400 focus:shadow-[0_0_0_1px_rgba(56,189,248,0.6)]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="rounded-xl border border-slate-600/60 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 shadow-sm outline-none ring-0 transition placeholder:text-slate-500 focus:border-sky-400 focus:shadow-[0_0_0_1px_rgba(56,189,248,0.6)]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="mt-1 inline-flex items-center justify-center rounded-xl border border-sky-200/60 bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-2.5 text-sm font-medium text-slate-900 shadow-[0_16px_30px_rgba(37,99,235,0.55)] transition hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isAuthDisabled}
            >
              {loading
                ? 'Working...'
                : mode === 'login'
                  ? 'Sign in'
                  : 'Create account'}
            </button>
          </form>

          <p className="mt-3 text-xs text-slate-400">
            Hitting{' '}
            <code className="rounded-full bg-slate-950/80 px-2 py-0.5 font-mono text-[0.65rem]">
              {API_BASE}/{mode}
            </code>{' '}
            with{' '}
            <code className="rounded-full bg-slate-950/80 px-2 py-0.5 font-mono text-[0.65rem]">
              credentials: &apos;include&apos;
            </code>
            .
          </p>
        </section>

        {/* Session panel */}
        <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 sm:text-[0.7rem]">
              Session &amp; /me payload
            </h4>
            <div className="flex gap-2">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-100 shadow-sm transition hover:-translate-y-[1px]"
                onClick={fetchMe}
              >
                Refresh /me
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl border border-slate-600 bg-transparent px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:-translate-y-[1px] hover:border-rose-400 hover:text-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
                onClick={handleLogout}
                disabled={loading}
              >
                Logout
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <pre className="max-h-64 overflow-auto rounded-xl border border-slate-800 bg-slate-950/95 p-3 text-xs text-slate-100 shadow-inner">
              {me ? JSON.stringify(me, null, 2) : '// Not authenticated'}
            </pre>

            {(error || info) && (
              <div className="flex flex-col gap-1.5">
                {error && (
                  <div className="rounded-xl border border-rose-400/70 bg-rose-900/70 px-2.5 py-1.5 text-xs text-rose-100">
                    {error}
                  </div>
                )}
                {info && (
                  <div className="rounded-xl border border-sky-400/80 bg-sky-900/70 px-2.5 py-1.5 text-xs text-sky-100">
                    {info}
                  </div>
                )}
              </div>
            )}

            <div className="mt-1 space-y-1.5">
              <h5 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Tips
              </h5>
              <ul className="list-disc space-y-1 pl-4 text-xs text-slate-400">
                <li>
                  Register, then log in, then verify your session with{' '}
                  <code className="rounded bg-slate-900 px-1 py-0.5 font-mono text-[0.65rem]">
                    /me
                  </code>
                  .
                </li>
                <li>
                  Use the same cookies when you wire this into your job
                  submission API.
                </li>
                <li>
                  Extend this console with job history, node registration, and
                  credit wallets.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default AuthConsole


