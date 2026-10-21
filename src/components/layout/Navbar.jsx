import { useCallback, useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, Search, X } from 'lucide-react'
import Logo from '../ui/Logo'
import SearchOverlay from './SearchOverlay'
import WishlistMenu from './WishlistMenu'
import { NAV_LINKS } from './navLinks'
import { useScrolled } from '../../hooks/useScrolled'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'

const linkClass = ({ isActive }) =>
  `relative py-2 text-sm font-medium transition after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-forest-900 after:transition-transform ${
    isActive ? 'text-forest-950 after:scale-x-100' : 'text-ink/70 after:scale-x-0 hover:text-forest-950'
  }`

export default function Navbar() {
  const scrolled = useScrolled(10)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { pathname } = useLocation()
  useLockBodyScroll(menuOpen)

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // "/" opens search from anywhere, unless the user is typing in a field.
  useEffect(() => {
    const onKey = (event) => {
      const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)
      if (event.key === '/' && !typing) {
        event.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const closeSearch = useCallback(() => setSearchOpen(false), [])

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition duration-300 ${
          scrolled || menuOpen
            ? 'border-forest-900/5 bg-white/95 shadow-[0_6px_24px_-12px_rgb(16_35_26/0.25)] backdrop-blur-md'
            : 'border-transparent bg-white'
        }`}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="grid size-10 cursor-pointer place-items-center rounded-full text-forest-950 transition hover:bg-forest-900/5"
              aria-label="Search (press /)"
              title="Search (press /)"
            >
              <Search className="size-5" />
            </button>
            <WishlistMenu />
            <Link to="/contact?topic=plan" className="btn-primary ml-2 hidden sm:inline-flex">
              Plan Your Trip <ArrowRight className="size-4" />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="grid size-10 cursor-pointer place-items-center rounded-full text-forest-950 hover:bg-forest-900/5 lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div id="mobile-menu" className="h-[calc(100dvh-72px)] animate-fade-in overflow-y-auto border-t border-forest-900/5 bg-white lg:hidden">
            <nav aria-label="Mobile" className="container-x flex flex-col py-4">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `flex items-center justify-between border-b border-forest-900/5 py-4 text-lg font-semibold ${
                      isActive ? 'text-forest-600' : 'text-forest-950'
                    }`
                  }
                >
                  {link.label}
                  <ArrowRight className="size-5 opacity-40" />
                </NavLink>
              ))}
              <Link to="/contact?topic=plan" className="btn-primary mt-6 py-3.5 text-base">
                Plan Your Trip <ArrowRight className="size-4" />
              </Link>
            </nav>
          </div>
        )}
      </header>

      {searchOpen && <SearchOverlay onClose={closeSearch} />}
    </>
  )
}
