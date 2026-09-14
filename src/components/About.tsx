import { motion } from 'framer-motion'
import { IMAGES } from '../assets/images'
import { ABOUT_STATS } from '../content'
import { Stat } from './Stat'

export function About() {
  return (
    <section id="sobre" className="bg-cream px-4 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[55fr_45fr] lg:items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="overflow-hidden rounded-2xl"
        >
          <img
            src={IMAGES['comercial-industrial']}
            alt="Vista aérea de galpão comercial em Maringá com telhado inteiramente coberto por painéis solares"
            className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[480px]"
            loading="lazy"
          />
        </motion.div>

        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-3xl leading-tight text-navy sm:text-4xl lg:text-5xl"
          >
            <span className="font-light">Muito além de painéis.</span>{' '}
            <span className="font-bold">Entregamos energia que se paga sozinha.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="mt-5 max-w-lg text-base text-navy/65 sm:text-lg"
          >
            Da análise de consumo à homologação, cuidamos de cada etapa para que sua economia comece
            no primeiro dia de operação.
          </motion.p>

          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10">
            {ABOUT_STATS.map((stat) => (
              <Stat key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
