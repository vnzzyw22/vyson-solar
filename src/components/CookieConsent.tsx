import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { loadAnalytics } from '../lib/analytics'

const STORAGE_KEY = 'vysao-cookie-consent'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let choice: string | null = null
    try {
      choice = localStorage.getItem(STORAGE_KEY)
    } catch {
      // localStorage indisponível (modo privado etc.) — trata como se ainda não tivesse escolhido.
    }

    if (choice === 'accepted') {
      loadAnalytics()
    } else if (choice !== 'rejected') {
      setVisible(true)
    }
  }, [])

  function decide(choice: 'accepted' | 'rejected') {
    try {
      localStorage.setItem(STORAGE_KEY, choice)
    } catch {
      // se não der pra persistir, ainda respeitamos a escolha nesta sessão.
    }
    if (choice === 'accepted') loadAnalytics()
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3 }}
          role="region"
          aria-label="Aviso de cookies"
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-2xl border border-navy/10 bg-cream p-5 shadow-[0_12px_40px_rgba(0,35,80,0.18)] sm:bottom-6 sm:p-6 md:inset-x-auto md:right-6"
        >
          <p className="text-sm text-navy/80">
            Usamos cookies para entender como o site é usado e medir a efetividade de anúncios.
            Você pode aceitar ou recusar — leia mais na{' '}
            <Link to="/politica-de-privacidade" className="underline hover:text-navy">
              Política de Privacidade
            </Link>
            .
          </p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => decide('accepted')}
              className="rounded-full bg-sun px-5 py-2 text-sm font-semibold text-navy transition-transform hover:scale-[1.03]"
            >
              Aceitar
            </button>
            <button
              type="button"
              onClick={() => decide('rejected')}
              className="rounded-full border border-navy/20 px-5 py-2 text-sm font-medium text-navy/70 transition-colors hover:text-navy"
            >
              Recusar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
