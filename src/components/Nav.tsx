import { useEffect, useState, type MouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { Logo } from './Logo'
import { NAV_LINKS } from '../content'
import { useLeadForm } from '../context/LeadFormContext'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeHref, setActiveHref] = useState<string | null>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { open: openLeadForm } = useLeadForm()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Sections render on the home route only, and Process mounts lazily (GSAP is
  // code-split), so section elements may not exist yet on first run — a
  // MutationObserver picks them up as they're added rather than requiring a
  // one-time synchronous query.
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveHref(null)
      return
    }

    const observed = new Set<string>()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHref(`/#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    function scan() {
      for (const link of NAV_LINKS) {
        const id = link.href.split('#')[1]
        if (!id || observed.has(id)) continue
        const el = document.getElementById(id)
        if (el) {
          io.observe(el)
          observed.add(id)
        }
      }
    }

    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [location.pathname])

  const handleLinkClick = () => setOpen(false)

  const handleLogoClick = (e: MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:top-6">
      <div
        className={`mx-auto grid max-w-5xl grid-cols-[1fr_auto_1fr] items-center gap-4 rounded-full border px-4 py-2.5 backdrop-blur-[18px] transition-colors duration-300 sm:px-5 ${
          scrolled
            ? 'border-navy/15 bg-cream/20 shadow-[0_8px_30px_rgba(0,35,80,0.15)]'
            : 'border-white/25 bg-cream/20'
        }`}
      >
        <a href="/" onClick={handleLogoClick} className="shrink-0 justify-self-start">
          <Logo className="drop-shadow-[0_1px_3px_rgba(255,253,240,0.7)]" />
        </a>

        <nav className="col-start-2 hidden items-center gap-1 justify-self-center md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeHref === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors [text-shadow:0_1px_3px_rgba(255,253,240,0.6)] ${
                  isActive ? 'text-navy' : 'text-navy/80 hover:text-navy'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-sun"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {link.label}
              </a>
            )
          })}
        </nav>

        <div className="col-start-3 flex shrink-0 items-center justify-self-end gap-2">
          <button
            type="button"
            onClick={openLeadForm}
            className="hidden shrink-0 rounded-full bg-sun px-4 py-2 text-sm font-semibold text-navy transition-transform hover:scale-[1.03] hover:shadow-[0_6px_20px_rgba(255,185,0,0.45)] md:inline-block"
          >
            Simular economia
          </button>

          <button
            type="button"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full md:hidden"
          >
            <span
              className={`block h-0.5 w-5 bg-navy transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`}
            />
            <span className={`block h-0.5 w-5 bg-navy transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span
              className={`block h-0.5 w-5 bg-navy transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 flex max-w-5xl flex-col gap-1 rounded-3xl border border-navy/10 bg-cream/95 p-4 shadow-lg backdrop-blur-md md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-navy/80 hover:bg-navy/5"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                handleLinkClick()
                openLeadForm()
              }}
              className="mt-1 rounded-full bg-sun px-4 py-2.5 text-center text-sm font-semibold text-navy"
            >
              Simular economia
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
