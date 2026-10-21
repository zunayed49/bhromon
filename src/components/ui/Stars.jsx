import { Star } from 'lucide-react'

export default function Stars({ value = 5, className = 'size-3.5' }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`${className} ${i < Math.round(value) ? 'fill-sun text-sun' : 'fill-forest-900/10 text-transparent'}`}
        />
      ))}
    </span>
  )
}
