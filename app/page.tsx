import HeroSection from '@/components/sections/HeroSection'
import LeadSection from '@/components/sections/LeadSection'
import IntermediaSection from '@/components/sections/IntermediaSection'
import TimelineSection from '@/components/sections/TimelineSection'
import NumbersSection from '@/components/sections/NumbersSection'
import TwoFacesSection from '@/components/sections/TwoFacesSection'
import PivotSection from '@/components/sections/PivotSection'
import StoriesSection from '@/components/sections/StoriesSection'
import ComparisonSection from '@/components/sections/ComparisonSection'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <HeroSection />
      <LeadSection />
      <IntermediaSection />
      <TimelineSection />
      <NumbersSection />
      <TwoFacesSection />
      <PivotSection />
      <StoriesSection />
      <ComparisonSection />
      <Footer />
    </>
  )
}
