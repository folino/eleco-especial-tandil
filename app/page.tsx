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
import SectionNav from '@/components/layout/SectionNav'

export default function Home() {
  return (
    <>
      <SectionNav />
      <div id="inicio"><HeroSection /></div>
      <div id="apertura"><LeadSection /></div>
      <div id="contexto"><IntermediaSection /></div>
      <div id="historia"><TimelineSection /></div>
      <div id="numeros"><NumbersSection /></div>
      <div id="dos-caras"><TwoFacesSection /></div>
      <div id="bisagra"><PivotSection /></div>
      <div id="historias"><StoriesSection /></div>
      <div id="comparacion"><ComparisonSection /></div>
      <Footer />
    </>
  )
}
