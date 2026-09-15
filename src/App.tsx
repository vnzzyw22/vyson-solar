import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Nav } from './components/Nav'
import { CTAFooter } from './components/CTAFooter'
import { CookieConsent } from './components/CookieConsent'
import { Home } from './pages/Home'
import { PrivacyPolicy } from './pages/PrivacyPolicy'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        <CTAFooter />
        <CookieConsent />
      </div>
    </BrowserRouter>
  )
}

export default App
