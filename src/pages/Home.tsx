import { lazy, Suspense } from 'react'
import { Hero } from '../components/Hero'
import { EconomiaSimulator } from '../components/EconomiaSimulator'
import { Partners } from '../components/Partners'
import { About } from '../components/About'
import { Services } from '../components/Services'
import { Differentials } from '../components/Differentials'
import { FAQ } from '../components/FAQ'

// GSAP is only needed for the pinned Process section — split it into its own
// chunk so it isn't parsed/evaluated on first paint of the rest of the page.
const Process = lazy(() => import('../components/Process').then((m) => ({ default: m.Process })))

export function Home() {
  return (
    <>
      <Hero />
      <EconomiaSimulator />
      <Partners />
      <About />
      <Suspense fallback={<div className="min-h-[60vh] bg-navy" />}>
        <Process />
      </Suspense>
      <Services />
      <Differentials />
      <FAQ />
    </>
  )
}
