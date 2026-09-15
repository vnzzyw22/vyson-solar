import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSimularEconomia } from '../context/SimularEconomiaContext'
import { whatsappLink } from '../content'

const FORM_NAME = 'simular-economia'
const TIPOS_IMOVEL = ['Residencial', 'Comercial', 'Rural']

function encodeFormData(data: Record<string, string>) {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
}

function buildWhatsappMessage({
  nome,
  telefone,
  cidade,
  tipoImovel,
  valorConta,
}: {
  nome: string
  telefone: string
  cidade: string
  tipoImovel: string
  valorConta: string
}) {
  return (
    `Olá! Meu nome é *${nome}*, sou de *${cidade}*.\n` +
    `Tenho interesse em simular economia com energia solar.\n\n` +
    `📍 Tipo de imóvel: ${tipoImovel}\n` +
    `💡 Valor médio da conta de luz: R$ ${valorConta}\n` +
    `📱 Telefone de contato: ${telefone}`
  )
}

export function SimularEconomiaModal() {
  const { isOpen, close } = useSimularEconomia()
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cidade, setCidade] = useState('')
  const [valorConta, setValorConta] = useState('')
  const [tipoImovel, setTipoImovel] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function resetForm() {
    setNome('')
    setTelefone('')
    setCidade('')
    setValorConta('')
    setTipoImovel('')
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)

    // Precisa abrir a aba SINCRONAMENTE aqui, ainda dentro do gesto de clique —
    // se abrirmos depois do fetch (await), o navegador trata como popup não
    // solicitado e bloqueia (acontece mesmo no Chrome, não só Safari).
    const whatsappTab = window.open('', '_blank', 'noopener,noreferrer')

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormData({
          'form-name': FORM_NAME,
          nome,
          telefone,
          cidade,
          valor_conta: valorConta,
          tipo_imovel: tipoImovel,
        }),
      })
      if (!response.ok) {
        console.error(`Netlify Forms: envio de "${FORM_NAME}" retornou status ${response.status}`)
      }
    } catch (err) {
      console.error(`Netlify Forms: falha ao enviar o formulário "${FORM_NAME}"`, err)
    }

    const url = whatsappLink(buildWhatsappMessage({ nome, telefone, cidade, tipoImovel, valorConta }))
    if (whatsappTab) {
      whatsappTab.location.href = url
    } else {
      // Aba bloqueada pelo navegador — último recurso, navega na aba atual.
      window.location.href = url
    }

    setSubmitting(false)
    resetForm()
    close()
  }

  function handleClose() {
    if (submitting) return
    close()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/50 p-4 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="simular-economia-title"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full max-w-md rounded-2xl border border-navy/10 bg-cream p-6 shadow-[0_20px_60px_rgba(0,35,80,0.25)] sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="simular-economia-title" className="text-xl font-bold text-navy sm:text-2xl">
                  Simular economia
                </h2>
                <p className="mt-1.5 text-sm text-navy/70">
                  Deixe seus dados e continue direto pelo WhatsApp com um especialista.
                </p>
              </div>
              <button
                type="button"
                aria-label="Fechar"
                onClick={handleClose}
                className="shrink-0 rounded-full p-1.5 text-navy/50 transition-colors hover:bg-navy/5 hover:text-navy"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <form
              name={FORM_NAME}
              data-netlify="true"
              onSubmit={handleSubmit}
              className="mt-6 flex flex-col gap-4"
            >
              <input type="hidden" name="form-name" value={FORM_NAME} />

              <div>
                <label htmlFor="simular-economia-nome" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/60">
                  Nome
                </label>
                <input
                  id="simular-economia-nome"
                  name="nome"
                  type="text"
                  required
                  autoComplete="name"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-sm text-navy placeholder:text-navy/35"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label htmlFor="simular-economia-telefone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/60">
                  Telefone
                </label>
                <input
                  id="simular-economia-telefone"
                  name="telefone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="w-full rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-sm text-navy placeholder:text-navy/35"
                  placeholder="(44) 99999-9999"
                />
              </div>

              <div>
                <label htmlFor="simular-economia-cidade" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/60">
                  Cidade
                </label>
                <input
                  id="simular-economia-cidade"
                  name="cidade"
                  type="text"
                  required
                  autoComplete="address-level2"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  className="w-full rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-sm text-navy placeholder:text-navy/35"
                  placeholder="Maringá"
                />
              </div>

              <div>
                <label htmlFor="simular-economia-valor-conta" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/60">
                  Valor médio da conta de luz (R$)
                </label>
                <input
                  id="simular-economia-valor-conta"
                  name="valor_conta"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  required
                  value={valorConta}
                  onChange={(e) => setValorConta(e.target.value)}
                  className="w-full rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-sm text-navy placeholder:text-navy/35"
                  placeholder="350"
                />
              </div>

              <div>
                <label htmlFor="simular-economia-tipo-imovel" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/60">
                  Tipo de imóvel
                </label>
                <select
                  id="simular-economia-tipo-imovel"
                  name="tipo_imovel"
                  required
                  value={tipoImovel}
                  onChange={(e) => setTipoImovel(e.target.value)}
                  className="w-full rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-sm text-navy"
                >
                  <option value="" disabled>
                    Selecione
                  </option>
                  {TIPOS_IMOVEL.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 rounded-full bg-sun px-6 py-3 text-sm font-semibold text-navy transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
              >
                {submitting ? 'Enviando...' : 'Continuar no WhatsApp'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
