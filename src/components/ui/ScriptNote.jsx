// Handwritten margin note, like a scribble in a travel journal.
export default function ScriptNote({ lines, className = '', size = 'text-[1.7rem]', tone = 'light', rotate = -6 }) {
  const color = tone === 'light' ? 'text-white' : 'text-forest-900'
  return (
    <div
      aria-hidden="true"
      style={{ transform: `rotate(${rotate}deg)` }}
      className={`pointer-events-none font-script leading-[1.05] select-none ${size} ${color} ${className}`}
    >
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
      <svg viewBox="0 0 120 14" className="mt-1 h-3 w-24 opacity-80" fill="none">
        <path d="M2 9c22-6 52-8 80-4 12 2 22 1 36-3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    </div>
  )
}
