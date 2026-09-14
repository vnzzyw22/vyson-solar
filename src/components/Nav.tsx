import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from './Logo'
import { NAV_LINKS, whatsappLink } from '../content'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeHref, setActiveHref] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.href.slice(1))).filter(
      (el): el is HTMLElement => el !== null,
    )
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const handleLinkClick = () => setOpen(false)

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:top-6">
      <div
        className={`mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full border px-4 py-2.5 transition-colors duration-300 sm:px-5 ${
          scrolled
            ? 'border-navy/10 bg-cream/90 shadow-[0_8px_30px_rgba(0,35,80,0.12)] backdrop-blur-md'
            : 'border-white/15 bg-cream/70 backdrop-blur-sm'
        }`}
      >
        <a href="#top" className="shrink-0">
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeHref === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  isActive ? 'text-navy' : 'text-navy/70 hover:text-navy'
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

        <a
          href={whatsappLink('Olá! Quero simular a economia com energia solar.')}
          target="_blank"
          rel="noreferrer"
          className="hidden shrink-0 rounded-full bg-sun px-4 py-2 text-sm font-semibold text-navy transition-transform hover:scale-[1.03] hover:shadow-[0_6px_20px_rgba(255,185,0,0.45)] md:inline-block"
        >
          Simular economia
        </a>

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
            <a
              href={whatsappLink('Olá! Quero simular a economia com energia solar.')}
              target="_blank"
              rel="noreferrer"
              onClick={handleLinkClick}
              className="mt-1 rounded-full bg-sun px-4 py-2.5 text-center text-sm font-semibold text-navy"
            >
              Simular economia
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
