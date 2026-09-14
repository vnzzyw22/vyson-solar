import { motion } from 'framer-motion'
import { Logo } from './Logo'
import icon from '../assets/logo-vysao/icon.webp'
import { CONTACT, NAV_LINKS, whatsappLink } from '../content'

export function CTAFooter() {
  return (
    <footer className="relative overflow-hidden bg-navy">
      <img
        src={icon}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-auto w-[620px] opacity-[0.08] sm:-right-20 sm:-top-20 sm:w-[820px]"
        style={{ filter: 'brightness(0) invert(1)' }}
      />

      <div className="relative px-4 pt-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-3xl leading-tight text-cream sm:text-5xl"
          >
            Você já pagou a conta de luz esse mês.
            <br />
            <span className="font-bold">Da próxima vez, deixe o sol pagar.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="mt-8 flex flex-wrap items-center justify-center gap-6"
          >
            <a
              href={whatsappLink('Olá! Quero simular a economia com energia solar.')}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-sun px-7 py-3.5 text-sm font-semibold text-navy transition-[transform,box-shadow] hover:scale-[1.03] hover:shadow-[0_10px_30px_rgba(255,185,0,0.4)] sm:text-base"
            >
              Simular economia agora
            </a>
            <a
              href="#servicos"
              className="text-sm font-semibold text-cream underline decoration-cream/40 underline-offset-4 transition-colors hover:decoration-cream sm:text-base"
            >
              Saiba mais
            </a>
          </motion.div>
        </div>

        <div className="relative mx-auto mt-24 grid max-w-6xl gap-10 border-t border-cream/10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="light" />
            <p className="mt-4 max-w-[220px] text-sm text-cream/55">
              A pioneira em energia solar de Maringá. Venda, instalação, manutenção e projetos
              residenciais, comerciais e rurais.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-cream/40">
              Empresa
            </h4>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-cream/70 hover:text-cream">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-cream/40">
              Contato
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
              {CONTACT.phones.map((phone) => (
                <li key={phone}>
                  <a href={`tel:${phone.replace(/\D/g, '')}`} className="hover:text-cream">
                    {phone}
                  </a>
                </li>
              ))}
              <li className="max-w-[220px]">{CONTACT.address}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-cream/40">
              Social
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={CONTACT.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-cream/70 hover:text-cream"
                >
                  Instagram {CONTACT.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative border-t border-cream/10 py-6 text-center text-xs text-cream/35">
          © {new Date().getFullYear()} Vysão Solar. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
