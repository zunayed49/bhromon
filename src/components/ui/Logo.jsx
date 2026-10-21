import { Link } from 'react-router-dom'

export default function Logo({ light = false, className = '' }) {
  const cut = light ? '#0a2219' : '#fff'
  return (
    <Link to="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="Bhromon home">
      <svg viewBox="0 0 48 32" className={`h-8 w-12 shrink-0 ${light ? 'text-leaf-300' : 'text-forest-900'}`} aria-hidden="true">
        <path d="M1 31 17 5l8.5 13.2L32 9l15 22Z" fill="currentColor" />
        <path d="m17 5 4.6 7.2-4.6-2.4-3.4 4.3Z" fill={cut} />
        <path d="m32 9 3.8 5.2-3.8-1.8-2.6 3Z" fill={cut} />
      </svg>
      <span className="leading-none">
        <span className={`block text-xl font-extrabold tracking-tight ${light ? 'text-white' : 'text-forest-950'}`}>
          Bhromon
        </span>
        <span className={`mt-1 hidden text-[10px] font-medium whitespace-nowrap min-[420px]:block ${light ? 'text-white/60' : 'text-ink/50'}`}>
          Discover Bangladesh, Live Fuller.
        </span>
      </span>
    </Link>
  )
}
