import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

type LeadFormContextValue = {
  isOpen: boolean
  open: () => void
  close: () => void
}

const LeadFormContext = createContext<LeadFormContextValue | null>(null)

export function LeadFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <LeadFormContext.Provider
      value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}
    >
      {children}
    </LeadFormContext.Provider>
  )
}

export function useLeadForm() {
  const ctx = useContext(LeadFormContext)
  if (!ctx) throw new Error('useLeadForm must be used within LeadFormProvider')
  return ctx
}
