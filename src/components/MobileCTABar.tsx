import { whatsappLink } from '../content'

export function MobileCTABar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-navy/10 bg-cream/95 p-3 backdrop-blur-md [padding-bottom:max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <a
        href={whatsappLink('Olá! Quero simular a economia com energia solar.')}
        target="_blank"
        rel="noreferrer"
        className="block w-full rounded-full bg-sun py-3 text-center text-sm font-semibold text-navy"
      >
        Simular economia agora
      </a>
    </div>
  )
}
