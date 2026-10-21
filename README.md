# Bhromon: Explore Bangladesh

A responsive travel landing page for Bangladesh destinations, built with **React 19**, **Tailwind CSS 4**, **React Router 7** and **React Hooks** (bundled with Vite).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Landing page: hero, search panel, destinations, packages, testimonials, guides |
| `/destinations` | All destinations, with category + search filters stored in the URL (`?category=Hills&q=sajek`) |
| `/destinations/:slug` | Destination details, photo gallery, related packages |
| `/packages` | Tour packages, with search, duration filter and sorting via URL params |
| `/packages/:id` | Itinerary accordion and a live price calculator with group discount |
| `/about` | Story, animated stats, values |
| `/guides`, `/guides/:slug` | Travel guides and articles |
| `/contact` | Validated enquiry form (prefilled from `?topic=&q=&date=&travellers=`) + FAQ |
| `*` | 404 page |

## Where to find things

```
src/
  App.jsx                  createBrowserRouter: nested routes under <Layout />
  components/layout/       AnnouncementBar, Navbar (NavLink, mobile menu, "/" search),
                           SearchOverlay, WishlistMenu, Newsletter, Footer, ScrollManager
  components/home/         Hero, StoryModal, SearchPanel, PopularDestinations, WhyUs,
                           FeaturedPackages, CtaBanner, Testimonials, TravelGuides
  components/cards/        DestinationCard, PackageCard, GuideCard, TestimonialCard
  components/ui/           Logo, SectionHeading, Reveal, ScriptNote, SaveButton, PageHeader...
  context/                 WishlistContext + provider (saved trips, persisted)
  hooks/                   Custom hooks (see below)
  pages/                   One component per route
  data/                    Destinations, packages, testimonials, guides, image ids
```

**Hooks used:** `useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`, `useContext`, plus custom hooks:
`useLocalStorage`, `useScrolled`, `useInView`, `useOnClickOutside`, `useLockBodyScroll`, `useCountUp`, `useDocumentTitle`, `useWishlist`.

**Router APIs used:** `createBrowserRouter`, `RouterProvider`, `Outlet`, `Link`, `NavLink`, `useParams`, `useSearchParams`, `useNavigate`, `useLocation`, `useRouteError`.

Photos are hot-linked from [Unsplash](https://unsplash.com) (Unsplash License). Brand, contact details and testimonials are placeholder content.
