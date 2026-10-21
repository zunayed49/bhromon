import { useState } from 'react'
import { ArrowRight, CheckCircle2, LoaderCircle, Send } from 'lucide-react'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus('error')
      return
    }
    setStatus('loading')
    // No backend in this demo: simulate a short network round-trip.
    setTimeout(() => setStatus('success'), 900)
  }

  return (
    <section className="container-x pt-4 pb-14" aria-labelledby="newsletter-title">
      <div className="relative overflow-hidden rounded-3xl bg-leaf-100 px-6 py-7 sm:px-10">
        <svg className="absolute -right-10 -bottom-16 h-48 w-80 text-leaf-200" viewBox="0 0 320 190" aria-hidden="true">
          <path d="M0 190 110 40l55 80 40-55 115 125Z" fill="currentColor" />
        </svg>
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-forest-900 shadow-sm">
              <Send className="size-5 -rotate-12" />
            </span>
            <div>
              <h2 id="newsletter-title" className="text-xl font-extrabold text-forest-950">
                Let&apos;s Stay in Touch
              </h2>
              <p className="mt-1 text-sm text-ink/60">
                Exclusive travel deals, festival-season offers and inspiration straight to your inbox.
              </p>
            </div>
          </div>

          {status === 'success' ? (
            <p className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-forest-900 shadow-sm" role="status">
              <CheckCircle2 className="size-5 text-forest-600" /> You&apos;re on the list. Shubho bhromon!
            </p>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="w-full lg:max-w-md">
              <div
                className={`flex items-center gap-2 rounded-full bg-white p-1.5 shadow-sm ring-2 transition ${
                  status === 'error' ? 'ring-rose-400' : 'ring-transparent focus-within:ring-forest-600/30'
                }`}
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    if (status === 'error') setStatus('idle')
                  }}
                  placeholder="Enter your email"
                  aria-invalid={status === 'error'}
                  aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                  className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-ink/40"
                />
                <button type="submit" disabled={status === 'loading'} className="btn-primary shrink-0">
                  {status === 'loading' ? <LoaderCircle className="size-4 animate-spin" /> : null}
                  Subscribe
                  {status !== 'loading' && <ArrowRight className="size-4" />}
                </button>
              </div>
              {status === 'error' && (
                <p id="newsletter-error" className="mt-2 pl-4 text-xs font-medium text-rose-600">
                  Please enter a valid email address.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
