import { useEffect, useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IMAGES } from '../assets/images'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useLeadForm } from '../context/LeadFormContext'

// Fotos que ficam alternando (crossfade) atrás dos cards. Por padrão reaproveita
// as 3 imagens de serviço/case já existentes no projeto. Se novas fotos forem
// adicionadas (ex: coloque o arquivo em src/assets/images/ e importe aqui, ou
// aponte pra um arquivo em public/), é só empurrar mais entradas neste array —
// o carrossel de fundo se ajusta sozinho pra qualquer quantidade de imagens.
const BACKGROUND_IMAGES: string[] = [IMAGES.residencial, IMAGES['comercial-industrial'], IMAGES.rural]

const BACKGROUND_INTERVAL_MS = 6000

const DIFFERENTIALS: { icon: ReactNode; text: string }[] = [
  {
    text: 'Personalizado para sua necessidade',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <line x1="4" y1="6" x2="14" y2="6" />
        <circle cx="17" cy="6" r="2" />
        <line x1="4" y1="12" x2="8" y2="12" />
        <circle cx="11" cy="12" r="2" />
        <line x1="14" y1="12" x2="20" y2="12" />
        <line x1="4" y1="18" x2="12" y2="18" />
        <circle cx="15" cy="18" r="2" />
      </svg>
    ),
  },
  {
    text: 'Equipamentos das melhores marcas',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.5l2.6 1.3 2.9.4.9 2.7 1.8 2.4-1.8 2.4-.9 2.7-2.9.4L12 18.1l-2.6-1.3-2.9-.4-.9-2.7-1.8-2.4 1.8-2.4.9-2.7 2.9-.4L12 2.5z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    text: 'Garantia total e suporte pós-instalação',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 3v5c0 5-3.3 8.2-7 10-3.7-1.8-7-5-7-10V6l7-3z" />
      </svg>
    ),
  },
  {
    text: 'Instalação rápida e limpa',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a4 4 0 00-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 005.4-5.4l-2.05 2.05-2-2 2.05-2.05z" />
      </svg>
    ),
  },
]

function useRotatingIndex(length: number, intervalMs: number, paused: boolean) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (paused || length <= 1) return
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [length, intervalMs, paused])

  return index
}

export function Differentials() {
  const reducedMotion = useReducedMotion()
  const { open: openLeadForm } = useLeadForm()
  const activeImage = useRotatingIndex(BACKGROUND_IMAGES.length, BACKGROUND_INTERVAL_MS, reducedMotion)

  return (
    <section id="diferenciais" className="relative overflow-hidden bg-navy px-4 py-24 sm:px-8 lg:px-12">
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.img
            key={activeImage}
            src={BACKGROUND_IMAGES[activeImage]}
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.06 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.2 }, scale: { duration: (BACKGROUND_INTERVAL_MS / 1000) + 1.2, ease: 'linear' } }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-navy/78" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/60" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-sun"
        >
          Nossos diferenciais
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, delay: 0.05, ease: 'easeOut' }}
          className="mt-3 text-center text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl"
        >
          Por que a <span className="font-bold">Vysão Solar</span> é diferente?
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DIFFERENTIALS.map((item, i) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              className="group rounded-2xl border border-cream/15 bg-cream/95 p-7 shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-md transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-sun/60 hover:shadow-[0_0_0_1px_rgba(255,185,0,0.4),0_20px_50px_rgba(0,0,0,0.3)]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sun/15 text-sun transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <span className="h-7 w-7">{item.icon}</span>
              </div>
              <p className="mt-5 text-base font-semibold leading-snug text-navy sm:text-lg">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 flex justify-center"
        >
          <button
            type="button"
            onClick={openLeadForm}
            className="rounded-full bg-sun px-8 py-3.5 text-sm font-semibold text-navy transition-[transform,box-shadow] hover:scale-[1.03] hover:shadow-[0_10px_30px_rgba(255,185,0,0.4)] sm:text-base"
          >
            Faça Seu Orçamento →
          </button>
        </motion.div>
      </div>
    </section>
  )
}
