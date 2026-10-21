import { Link } from 'react-router-dom'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import Logo from '../ui/Logo'
import SocialLinks from '../ui/SocialLinks'
import ScriptNote from '../ui/ScriptNote'
import { NAV_LINKS } from './navLinks'

const SUPPORT_LINKS = [
  { to: '/contact#faq', label: 'FAQs' },
  { to: '/contact#faq', label: 'Booking Policy' },
  { to: '/contact#faq', label: 'Cancellation Policy' },
  { to: '/contact', label: 'Custom Trip Request' },
]

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-forest-900/10 bg-white">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr] xl:grid-cols-[1.4fr_1fr_1fr_1.5fr_auto]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/60">
            A Dhaka-based travel studio crafting small-group and private journeys across the hills, rivers and coastlines
            of Bangladesh since 2014.
          </p>
          <SocialLinks className="mt-5" />
        </div>

        <div>
          <h3 className="text-sm font-bold text-forest-950">Quick Links</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV_LINKS.slice(0, 5).map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-ink/60 transition hover:text-forest-900">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-forest-950">Support</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {SUPPORT_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-ink/60 transition hover:text-forest-900">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-forest-950">Contact Us</h3>
          <ul className="mt-4 space-y-3 text-sm text-ink/60">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-forest-600" />
              House 42, Road 11, Banani, Dhaka 1213, Bangladesh
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-forest-600" />
              <a href="tel:+8801792574749" className="hover:text-forest-900">
                +880 1792-574749
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-forest-600" />
              <a href="mailto:hello@bhromon.com.bd" className="hover:text-forest-900">
                hello@bhromon.com.bd
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-forest-600" />
              Sat – Thu, 9:00 AM – 8:00 PM
            </li>
          </ul>
        </div>

        <ScriptNote
          lines={['Explore,', 'Dream,', 'Discover,', 'Repeat.']}
          tone="dark"
          rotate={-8}
          size="text-[1.5rem]"
          className="hidden self-end opacity-80 xl:block"
        />
      </div>

      <div className="border-t border-forest-900/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-ink/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Bhromon Travels Ltd. All rights reserved.</p>
          <p>Made with care in Dhaka, Bangladesh.</p>
        </div>
      </div>
    </footer>
  )
}
