import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function SectionHeading({ eyebrow, title, action, actionTo, children }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-forest-950 sm:text-[2.15rem]">{title}</h2>
        {children}
      </div>
      {action && actionTo && (
        <Link
          to={actionTo}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-forest-900 hover:text-forest-600"
        >
          {action}
          <ArrowRight className="size-4 transition group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  )
}
