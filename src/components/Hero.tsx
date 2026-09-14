import { motion } from 'framer-motion'
import { HeroBackground } from './HeroBackground'
import { whatsappLink } from '../content'

const badges = ['+100 projetos realizados', 'Maringá e região', 'Projeto, instalação e pós-venda']

export function Hero() {
  return (
    <section id="top" className="relative flex h-[92svh] min-h-[560px] w-full items-end overflow-hidden sm:h-[100svh]">
      <HeroBackground />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/5" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/10 to-transparent" />

      <div className="relative z-10 w-full px-4 pb-16 sm:px-8 sm:pb-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-2xl text-4xl leading-[1.05] text-white sm:text-6xl lg:text-7xl"
          >
            <span className="font-light">O sol paga</span>{' '}
            <span className="font-bold">a sua conta.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }}
            className="mt-5 max-w-md text-base text-white/85 sm:text-lg"
          >
            Sistemas fotovoltaicos residenciais, comerciais e rurais — projetados e instalados pela
            pioneira em energia solar de Maringá.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: 'easeOut' }}
            className="mt-8 flex flex-wrap items-center gap-5"
          >
            <a
              href={whatsappLink('Olá! Quero simular a economia com energia solar.')}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-sun px-7 py-3.5 text-sm font-semibold text-navy transition-[transform,box-shadow] hover:scale-[1.03] hover:shadow-[0_10px_30px_rgba(255,185,0,0.4)] sm:text-base"
            >
              Simular economia
            </a>
            <a
              href={whatsappLink('Olá! Quero falar com um especialista da Vysão Solar.')}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white sm:text-base"
            >
              Falar com especialista
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.36, ease: 'easeOut' }}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/20 pt-6"
          >
            {badges.map((badge) => (
              <div key={badge} className="text-xs font-medium text-white/75 sm:text-sm">
                {badge}
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  )
}
