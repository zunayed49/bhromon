import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { photo } from '../../data/images'

// Compact photographic banner used at the top of every inner page.
export default function PageHeader({ image, eyebrow, title, subtitle, crumbs = [], children }) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-950 text-white">
      <img src={photo(image, 1800)} alt="" className="absolute inset-0 -z-10 size-full object-cover opacity-70" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-950/95 via-forest-950/70 to-forest-950/20" />
      <div className="container-x pt-12 pb-16 sm:pt-16 sm:pb-20">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs font-medium text-white/70">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          {crumbs.map((crumb) => (
            <span key={crumb.label} className="inline-flex items-center gap-1">
              <ChevronRight className="size-3.5" />
              {crumb.to ? (
                <Link to={crumb.to} className="hover:text-white">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white" aria-current="page">
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>
        {eyebrow && <p className="mt-6 text-[11px] font-bold tracking-[0.25em] text-leaf-300 uppercase">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-xl text-base text-white/80 sm:text-lg">{subtitle}</p>}
        {children}
      </div>
    </section>
  )
}
