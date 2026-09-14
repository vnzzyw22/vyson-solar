import { motion } from 'framer-motion'
import { IMAGES } from '../assets/images'
import { CASES } from '../content'
import { Stat } from './Stat'

export function Cases() {
  return (
    <section id="cases" className="bg-cream px-4 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold uppercase tracking-[0.18em] text-navy/40"
        >
          Cases
        </motion.p>

        <div className="mt-6 space-y-24 sm:mt-10 sm:space-y-32">
          {CASES.map((c) => (
            <div
              key={c.id}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`overflow-hidden rounded-2xl ${
                  c.imageSide === 'left' ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <img
                  src={IMAGES[c.image]}
                  alt={`Case ${c.title} — sistema fotovoltaico instalado pela Vysão Solar`}
                  className="h-64 w-full object-cover sm:h-80 lg:h-[420px]"
                  loading="lazy"
                />
              </motion.div>

              <div className={c.imageSide === 'left' ? 'lg:order-2' : 'lg:order-1'}>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-navy/40">
                  {c.tag}
                </span>
                <h3
                  className="mt-2 text-5xl font-medium leading-none sm:text-6xl lg:text-7xl"
                  style={{ WebkitTextStroke: '1px #002350', color: 'transparent' }}
                >
                  {c.title}
                </h3>
                <div className="mt-8 flex gap-10">
                  {c.stats.map((stat) => (
                    <Stat key={stat.label} {...stat} tone="sun" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
