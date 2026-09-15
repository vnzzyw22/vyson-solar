import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLeadForm } from '../context/LeadFormContext'
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

export function LeadFormModal() {
  const { isOpen, close } = useLeadForm()
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cidade, setCidade] = useState('')
  const [valorConta, setValorConta] = useState('')
  const [tipoImovel, setTipoImovel] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const firstFieldRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      firstFieldRef.current?.focus()
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, close])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)

    // Precisa abrir a aba SINCRONAMENTE aqui, ainda dentro do gesto de clique —
    // se abrirmos só depois do fetch (await), o navegador trata como popup não
    // solicitado e bloqueia (acontece mesmo no Chrome, não só Safari).
    const whatsappTab = window.open('', '_blank', 'noopener,noreferrer')

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormData({
          'form-name': FORM_NAME,
          nome,
          telefone,
          cidade,
          valor_conta: valorConta,
          tipo_imovel: tipoImovel,
          'bot-field': '',
        }),
      })
      if (!res.ok) {
        console.error(
          `[lead-form] Netlify Forms respondeu com erro (${res.status}) — o lead pode não ter sido salvo. Redirecionando pro WhatsApp mesmo assim.`,
        )
      }
    } catch (err) {
      console.error(
        '[lead-form] Falha ao enviar o formulário pro Netlify Forms — o lead não foi salvo. Redirecionando pro WhatsApp mesmo assim.',
        err,
      )
    }

    const url = whatsappLink(buildWhatsappMessage({ nome, telefone, cidade, tipoImovel, valorConta }))
    if (whatsappTab) {
      whatsappTab.location.href = url
    } else {
      // Aba bloqueada pelo navegador — último recurso, navega na aba atual.
      window.location.href = url
    }

    setSubmitting(false)
    setNome('')
    setTelefone('')
    setCidade('')
    setValorConta('')
    setTipoImovel('')
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
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/60 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) close()
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-form-title"
            className="relative w-full max-w-md rounded-3xl bg-cream p-6 shadow-[0_20px_60px_rgba(0,35,80,0.3)] sm:p-8"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Fechar"
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-navy/50 transition-colors hover:bg-navy/5 hover:text-navy"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
              </svg>
            </button>

            <h2 id="lead-form-title" className="pr-8 text-2xl font-bold text-navy">
              Simular economia
            </h2>
            <p className="mt-2 text-sm text-navy/60">
              Preencha seus dados e te chamamos no WhatsApp com a simulação.
            </p>

            <form name={FORM_NAME} data-netlify="true" onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input type="hidden" name="form-name" value={FORM_NAME} />
              <p hidden>
                <label>
                  Não preencha isto: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </p>

              <div>
                <label htmlFor="lead-nome" className="text-sm font-medium text-navy/70">
                  Nome
                </label>
                <input
                  ref={firstFieldRef}
                  id="lead-nome"
                  name="nome"
                  type="text"
                  required
                  autoComplete="name"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-navy outline-none transition-colors focus:border-electric"
                />
              </div>

              <div>
                <label htmlFor="lead-telefone" className="text-sm font-medium text-navy/70">
                  Telefone (WhatsApp)
                </label>
                <input
                  id="lead-telefone"
                  name="telefone"
                  type="tel"
                  inputMode="tel"
                  required
                  autoComplete="tel"
                  placeholder="(44) 9XXXX-XXXX"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-navy outline-none transition-colors focus:border-electric"
                />
              </div>

              <div>
                <label htmlFor="lead-cidade" className="text-sm font-medium text-navy/70">
                  Cidade
                </label>
                <input
                  id="lead-cidade"
                  name="cidade"
                  type="text"
                  required
                  autoComplete="address-level2"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-navy outline-none transition-colors focus:border-electric"
                />
              </div>

              <div>
                <label htmlFor="lead-valor-conta" className="text-sm font-medium text-navy/70">
                  Valor médio da conta de luz (R$)
                </label>
                <input
                  id="lead-valor-conta"
                  name="valor_conta"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  required
                  value={valorConta}
                  onChange={(e) => setValorConta(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-navy outline-none transition-colors focus:border-electric"
                  placeholder="350"
                />
              </div>

              <div>
                <label htmlFor="lead-tipo-imovel" className="text-sm font-medium text-navy/70">
                  Tipo de imóvel
                </label>
                <select
                  id="lead-tipo-imovel"
                  name="tipo_imovel"
                  required
                  value={tipoImovel}
                  onChange={(e) => setTipoImovel(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-navy outline-none transition-colors focus:border-electric"
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
                className="mt-2 w-full rounded-full bg-sun px-6 py-3 text-sm font-semibold text-navy transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Enviando…' : 'Simular economia no WhatsApp'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
