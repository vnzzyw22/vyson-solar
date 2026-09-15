import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

type SimularEconomiaContextValue = {
  isOpen: boolean
  open: () => void
  close: () => void
}

const SimularEconomiaContext = createContext<SimularEconomiaContextValue | null>(null)

export function SimularEconomiaProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close])

  return <SimularEconomiaContext.Provider value={value}>{children}</SimularEconomiaContext.Provider>
}

export function useSimularEconomia() {
  const ctx = useContext(SimularEconomiaContext)
  if (!ctx) {
    throw new Error('useSimularEconomia precisa ser usado dentro de <SimularEconomiaProvider>')
  }
  return ctx
}
