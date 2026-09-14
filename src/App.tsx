import { Nav } from './components/Nav'
import { MobileCTABar } from './components/MobileCTABar'
import { Hero } from './components/Hero'
import { Partners } from './components/Partners'
import { About } from './components/About'
import { Process } from './components/Process'
import { Services } from './components/Services'
import { Cases } from './components/Cases'
import { FAQ } from './components/FAQ'
import { CTAFooter } from './components/CTAFooter'

function App() {
  return (
    <div className="pb-16 md:pb-0">
      <Nav />
      <main>
        <Hero />
        <Partners />
        <About />
        <Process />
        <Services />
        <Cases />
        <FAQ />
      </main>
      <CTAFooter />
      <MobileCTABar />
    </div>
  )
}

export default App
