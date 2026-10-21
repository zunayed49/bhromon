import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom'

// Rendered by the router when a route throws while rendering.
export default function RouteError() {
  const error = useRouteError()
  const message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : error?.message

  return (
    <main className="grid min-h-dvh place-items-center bg-mist px-4 text-center">
      <div className="max-w-md">
        <p className="font-script text-3xl text-forest-600">Something went wrong</p>
        <h1 className="mt-2 text-3xl font-extrabold text-forest-950">We hit a bump in the road</h1>
        {message && <p className="mt-3 text-sm text-ink/60">{message}</p>}
        <Link to="/" className="btn-primary mt-8">
          Back to Home
        </Link>
      </div>
    </main>
  )
}
