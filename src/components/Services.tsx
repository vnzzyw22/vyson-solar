import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { IMAGES } from '../assets/images'
import { SERVICES } from '../content'

const ICONS: Record<string, ReactNode> = {
  residencial: (
    <path d="M4 12l9-8 9 8M6 10.5V20h5v-6h2v6h5v-9.5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  'comercial-industrial': (
    <path
      d="M4 21V8l7-4v17M4 21h16M11 21V4l9 4v13M8 11h0M8 15h0M14 11h0M14 15h0"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  rural: (
    <path
      d="M3 20h18M6 20V9l6-4 6 4v11M10 20v-6h4v6M4 9l2-1M20 9l-2-1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
}

export function Services() {
  return (
    <section id="servicos" className="flex flex-col gap-5 sm:gap-0">
      {SERVICES.map((service, i) => (
        <div
          key={service.id}
          className="relative mx-4 h-[65vh] min-h-[400px] overflow-hidden rounded-3xl shadow-[0_12px_32px_rgba(0,35,80,0.22)] sm:mx-0 sm:h-[85vh] sm:rounded-none sm:shadow-none"
        >
          <motion.img
            src={IMAGES[service.image]}
            alt={`${service.title} — ${service.text}`}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ scale: 1 }}
            whileInView={{ scale: 1.05 }}
            viewport={{ once: false, margin: '-10%' }}
            transition={{ duration: 6, ease: 'linear' }}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent" />

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0099FF"
            strokeWidth="1.4"
            className="absolute right-6 top-6 h-9 w-9 opacity-90 sm:right-10 sm:top-10"
          >
            {ICONS[service.image]}
          </svg>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute bottom-0 left-0 max-w-lg p-6 sm:p-12"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-sun">
              {service.tag}
            </span>
            <h3 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{service.title}</h3>
            <p className="mt-3 text-base text-white/80 sm:text-lg">{service.text}</p>
          </motion.div>
        </div>
      ))}
    </section>
  )
}
