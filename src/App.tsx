import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Nav } from './components/Nav'
import { CTAFooter } from './components/CTAFooter'
import { CookieConsent } from './components/CookieConsent'
import { LeadFormModal } from './components/LeadFormModal'
import { LeadFormProvider } from './context/LeadFormContext'
import { Home } from './pages/Home'
import { PrivacyPolicy } from './pages/PrivacyPolicy'

function App() {
  return (
    <BrowserRouter>
      <LeadFormProvider>
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
          <LeadFormModal />
        </div>
      </LeadFormProvider>
    </BrowserRouter>
  )
}

export default App
