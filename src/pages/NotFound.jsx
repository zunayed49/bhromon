import { Link } from 'react-router-dom'
import { ArrowRight, Compass } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function NotFound({ message = 'Looks like this trail leads nowhere. The page you are looking for does not exist.' }) {
  useDocumentTitle('Page not found')
  return (
    <section className="container-x grid min-h-[60vh] place-items-center py-20 text-center">
      <div className="max-w-md">
        <span className="mx-auto grid size-20 place-items-center rounded-full bg-leaf-200 text-forest-900">
          <Compass className="size-10 animate-[spin_6s_linear_infinite]" strokeWidth={1.5} />
        </span>
        <p className="mt-6 font-script text-3xl text-forest-600">Lost in the hills?</p>
        <h1 className="mt-1 text-5xl font-extrabold tracking-tight text-forest-950">404</h1>
        <p className="mt-4 text-ink/65">{message}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
          <Link to="/destinations" className="btn-outline">
            Browse Destinations <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
