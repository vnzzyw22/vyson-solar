import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { whatsappLink } from '../content'

type TipoImovel = 'Residencial' | 'Comercial' | 'Rural'

const TIPOS_IMOVEL: TipoImovel[] = ['Residencial', 'Comercial', 'Rural']

const CONTA_MIN = 100
const CONTA_MAX = 10000
const CONTA_STEP = 50
const CONTA_DEFAULT = 500

// TODO: validar fórmula real com o cliente — percentuais de redução, custo do
// sistema por faixa de conta e o próprio modelo de cálculo são placeholders
// plausíveis só para dar feedback imediato no simulador, não uma proposta real.
const REDUCAO_POR_TIPO: Record<TipoImovel, number> = {
  Residencial: 0.85,
  Comercial: 0.8,
  Rural: 0.9,
}

const CUSTO_SISTEMA_POR_FAIXA_DE_500 = 18000

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})

function formatCurrency(value: number) {
  return currencyFormatter.format(value)
}

export function EconomiaSimulator() {
  const [contaMensal, setContaMensal] = useState(CONTA_DEFAULT)
  const [tipoImovel, setTipoImovel] = useState<TipoImovel>('Residencial')

  const { economiaAnual, reducaoPercentual, retornoAnos } = useMemo(() => {
    const percentual = REDUCAO_POR_TIPO[tipoImovel]
    const economia = contaMensal * 12 * percentual
    // TODO: validar fórmula real com o cliente (placeholder proporcional).
    const custoSistema = (contaMensal / 500) * CUSTO_SISTEMA_POR_FAIXA_DE_500
    return {
      economiaAnual: economia,
      reducaoPercentual: percentual * 100,
      retornoAnos: custoSistema / economia,
    }
  }, [contaMensal, tipoImovel])

  const whatsappHref = whatsappLink(
    `Olá! Simulei minha economia com energia solar no site.\n\n` +
      `📍 Tipo de imóvel: ${tipoImovel}\n` +
      `💡 Conta mensal informada: ${formatCurrency(contaMensal)}\n` +
      `📊 Economia anual estimada: ${formatCurrency(economiaAnual)}\n` +
      `📈 Redução média estimada: ${reducaoPercentual.toFixed(0)}%\n` +
      `⏱️ Retorno estimado: ${retornoAnos.toFixed(1)} anos\n\n` +
      `Quero saber mais!`,
  )

  return (
    <section id="simulador" className="bg-cream px-4 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-navy/40"
        >
          Simulador de economia
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, delay: 0.05, ease: 'easeOut' }}
          className="mt-3 text-center text-3xl leading-tight text-navy sm:text-4xl lg:text-5xl"
        >
          <span className="font-light">Veja, na hora,</span>{' '}
          <span className="font-bold">quanto o sol pode economizar pra você.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="mt-10 rounded-3xl border border-navy/10 bg-white p-6 shadow-[0_20px_60px_rgba(0,35,80,0.1)] sm:p-10"
        >
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="simulador-conta" className="text-sm font-semibold text-navy">
                Conta média mensal
              </label>
              <span className="text-2xl font-bold tabular-nums text-navy">
                {formatCurrency(contaMensal)}
              </span>
            </div>
            <input
              id="simulador-conta"
              type="range"
              min={CONTA_MIN}
              max={CONTA_MAX}
              step={CONTA_STEP}
              value={contaMensal}
              onChange={(e) => setContaMensal(Number(e.target.value))}
              className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-navy/10 accent-sun"
            />
            <div className="mt-1.5 flex justify-between text-xs text-navy/45">
              <span>{formatCurrency(CONTA_MIN)}</span>
              <span>{formatCurrency(CONTA_MAX)}</span>
            </div>
          </div>

          <div className="mt-8">
            <label htmlFor="simulador-tipo-imovel" className="text-sm font-semibold text-navy">
              Tipo de imóvel
            </label>
            <select
              id="simulador-tipo-imovel"
              value={tipoImovel}
              onChange={(e) => setTipoImovel(e.target.value as TipoImovel)}
              className="mt-3 w-full rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-sm text-navy"
            >
              {TIPOS_IMOVEL.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 border-t border-navy/10 pt-8 sm:grid-cols-3">
            <div>
              <p className="text-2xl font-bold tabular-nums text-navy sm:text-3xl">
                {formatCurrency(economiaAnual)}
              </p>
              <p className="mt-1.5 text-sm text-navy/60">Economia anual estimada</p>
            </div>
            <div>
              <p className="text-2xl font-bold tabular-nums text-navy sm:text-3xl">
                {reducaoPercentual.toFixed(0)}%
              </p>
              <p className="mt-1.5 text-sm text-navy/60">Redução média</p>
            </div>
            <div>
              <p className="text-2xl font-bold tabular-nums text-navy sm:text-3xl">
                {retornoAnos.toFixed(1)} anos
              </p>
              <p className="mt-1.5 text-sm text-navy/60">Retorno estimado</p>
            </div>
          </div>

          <p className="mt-8 text-xs text-navy/45">
            Estimativa de referência. O dimensionamento final considera consumo real, localização e
            análise técnica da equipe Vysão.
          </p>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="mt-6 block w-full rounded-full bg-sun px-6 py-3.5 text-center text-sm font-semibold text-navy transition-transform hover:scale-[1.02] sm:text-base"
          >
            Falar com um especialista sobre essa simulação
          </a>
        </motion.div>
      </div>
    </section>
  )
}
