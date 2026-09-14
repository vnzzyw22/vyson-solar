import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Nav } from './components/Nav'
import { MobileCTABar } from './components/MobileCTABar'
import { CTAFooter } from './components/CTAFooter'
import { CookieConsent } from './components/CookieConsent'
import { Home } from './pages/Home'
import { PrivacyPolicy } from './pages/PrivacyPolicy'

function App() {
  return (
    <BrowserRouter>
      <div className="pb-16 md:pb-0">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        <CTAFooter />
        <MobileCTABar />
        <CookieConsent />
      </div>
    </BrowserRouter>
  )
}

export default App
