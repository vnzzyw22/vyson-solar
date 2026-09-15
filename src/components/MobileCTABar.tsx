import { useSimularEconomia } from '../context/SimularEconomiaContext'

export function MobileCTABar() {
  const { open } = useSimularEconomia()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-navy/10 bg-cream/95 p-3 backdrop-blur-md [padding-bottom:max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <button
        type="button"
        onClick={open}
        className="block w-full rounded-full bg-sun py-3 text-center text-sm font-semibold text-navy"
      >
        Simular economia agora
      </button>
    </div>
  )
}
