// TODO: substituir pelos IDs reais assim que as contas forem criadas.
// GA4: crie a propriedade em analytics.google.com e copie o "Measurement ID" (formato G-XXXXXXXXXX).
// Meta Pixel: crie em business.facebook.com/events_manager e copie o ID numérico do pixel.
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'
const META_PIXEL_ID = '0000000000000000'

const isPlaceholder = (id: string) => id.includes('X') || /^0+$/.test(id)

let loaded = false

/** Injeta Google Analytics (GA4) e Meta Pixel. Só deve ser chamado após consentimento de cookies. */
export function loadAnalytics() {
  if (loaded) return
  loaded = true

  if (!isPlaceholder(GA_MEASUREMENT_ID)) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any
    w.dataLayer = w.dataLayer || []
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer.push(arguments)
    }
    w.gtag('js', new Date())
    w.gtag('config', GA_MEASUREMENT_ID)
  } else {
    console.info('[analytics] GA_MEASUREMENT_ID ainda é placeholder — Google Analytics não carregado.')
  }

  if (!isPlaceholder(META_PIXEL_ID)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any
    if (!w.fbq) {
      const fbq: any = function fbqFn() {
        // eslint-disable-next-line prefer-rest-params
        fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments)
      }
      w.fbq = fbq
      fbq.push = fbq
      fbq.loaded = true
      fbq.version = '2.0'
      fbq.queue = []
      const script = document.createElement('script')
      script.async = true
      script.src = 'https://connect.facebook.net/en_US/fbevents.js'
      document.head.appendChild(script)
    }
    w.fbq('init', META_PIXEL_ID)
    w.fbq('track', 'PageView')
  } else {
    console.info('[analytics] META_PIXEL_ID ainda é placeholder — Meta Pixel não carregado.')
  }
}
