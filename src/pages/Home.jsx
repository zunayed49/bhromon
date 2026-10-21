import Hero from '../components/home/Hero'
import SearchPanel from '../components/home/SearchPanel'
import PopularDestinations from '../components/home/PopularDestinations'
import WhyUs from '../components/home/WhyUs'
import FeaturedPackages from '../components/home/FeaturedPackages'
import CtaBanner from '../components/home/CtaBanner'
import Testimonials from '../components/home/Testimonials'
import TravelGuides from '../components/home/TravelGuides'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Home() {
  useDocumentTitle()
  return (
    <>
      <Hero />
      <SearchPanel />
      <PopularDestinations />
      <WhyUs />
      <FeaturedPackages />
      <CtaBanner />
      <Testimonials />
      <TravelGuides />
    </>
  )
}
