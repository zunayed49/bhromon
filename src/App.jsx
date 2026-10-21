import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/layout/Layout'
import { WishlistProvider } from './context/WishlistProvider'
import Home from './pages/Home'
import Destinations from './pages/Destinations'
import DestinationDetail from './pages/DestinationDetail'
import Packages from './pages/Packages'
import PackageDetail from './pages/PackageDetail'
import About from './pages/About'
import Guides from './pages/Guides'
import GuideDetail from './pages/GuideDetail'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import RouteError from './pages/RouteError'

// Every page renders inside <Layout /> (announcement bar, navbar, newsletter, footer) via <Outlet />.
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Home /> },
      { path: 'destinations', element: <Destinations /> },
      { path: 'destinations/:slug', element: <DestinationDetail /> },
      { path: 'packages', element: <Packages /> },
      { path: 'packages/:id', element: <PackageDetail /> },
      { path: 'about', element: <About /> },
      { path: 'guides', element: <Guides /> },
      { path: 'guides/:slug', element: <GuideDetail /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function App() {
  return (
    <WishlistProvider>
      <RouterProvider router={router} />
    </WishlistProvider>
  )
}
