import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IMAGES } from '../assets/images'
import { PROCESS_STEPS } from '../content'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const STEP_IMAGES = [IMAGES.residencial, IMAGES['comercial-industrial'], IMAGES.rural]
const STEP_ALT = [
  'Instalação fotovoltaica residencial em Maringá',
  'Instalação fotovoltaica em galpão comercial',
  'Instalação fotovoltaica em propriedade rural',
]

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [stepProgress, setStepProgress] = useState(0)
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    if (reducedMotion) return

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        const trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 0.3,
          onUpdate: (self) => {
            const scaled = self.progress * PROCESS_STEPS.length
            const idx = Math.min(PROCESS_STEPS.length - 1, Math.floor(scaled))
            setActiveStep(idx)
            setStepProgress(scaled - idx)
          },
        })

        return () => trigger.kill()
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reducedMotion])

  if (reducedMotion) {
    return (
      <div id="processo" className="scroll-mt-24">
        <ProcessStacked />
      </div>
    )
  }

  return (
    <div id="processo" className="scroll-mt-24">
      <section
        ref={sectionRef}
        className="relative hidden h-screen w-full overflow-hidden bg-navy lg:block"
      >
        <div className="mx-auto flex h-full max-w-6xl items-center px-12">
          <div className="grid w-full grid-cols-[auto_1fr_1fr] items-center gap-12">
            <div className="relative h-56 w-56 shrink-0">
              {PROCESS_STEPS.map((step, i) => (
                <span
                  key={step.number}
                  className="absolute inset-0 flex items-center justify-center font-display text-[180px] font-medium leading-none transition-opacity duration-500"
                  style={{
                    opacity: i === activeStep ? 1 : 0,
                    WebkitTextStroke: '2px rgba(255,253,240,0.35)',
                    color: 'transparent',
                  }}
                >
                  {step.number}
                </span>
              ))}
            </div>

            <div className="relative h-40">
              {PROCESS_STEPS.map((step, i) => (
                <div
                  key={step.title}
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ opacity: i === activeStep ? 1 : 0 }}
                >
                  <h3 className="text-3xl font-bold text-cream">{step.title}</h3>
                  <p className="mt-4 max-w-sm text-base text-cream/70">{step.text}</p>
                </div>
              ))}
            </div>

            <div className="relative h-72 overflow-hidden rounded-2xl">
              {PROCESS_STEPS.map((step, i) => (
                <img
                  key={step.number}
                  src={STEP_IMAGES[i]}
                  alt={STEP_ALT[i]}
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
                  style={{ opacity: i === activeStep ? 1 : 0 }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 mx-auto flex max-w-6xl gap-3 px-12">
          {PROCESS_STEPS.map((step, i) => {
            const fill = i < activeStep ? 100 : i === activeStep ? stepProgress * 100 : 0
            return (
              <div key={step.number} className="h-1 flex-1 overflow-hidden rounded-full bg-cream/15">
                <div className="h-full bg-sun" style={{ width: `${fill}%` }} />
              </div>
            )
          })}
        </div>
      </section>

      <div className="lg:hidden">
        <ProcessMobileCarousel />
      </div>
    </div>
  )
}

// Mobile equivalent of the desktop pinned scroll: same number/image/text per
// step, but driven by a horizontal swipe instead of a vertical scroll-jack —
// scroll-jacking on touch screens is an explicit anti-pattern per the design
// direction doc (Section 9), which calls out a horizontal carousel as the
// sanctioned alternative.
function ProcessMobileCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const io = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (mostVisible) {
          setActiveStep(Number((mostVisible.target as HTMLElement).dataset.index))
        }
      },
      { root: container, threshold: [0.5, 0.6, 0.7, 0.8, 0.9] },
    )

    slideRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="bg-navy py-20">
      <div
        ref={containerRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pl-4 pr-14 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {PROCESS_STEPS.map((step, i) => (
          <div
            key={step.number}
            ref={(el) => {
              slideRefs.current[i] = el
            }}
            data-index={i}
            className="w-[82%] shrink-0 snap-start overflow-hidden rounded-2xl"
          >
            <img
              src={STEP_IMAGES[i]}
              alt={STEP_ALT[i]}
              className="h-52 w-full object-cover"
              loading="lazy"
            />
            <div className="pt-5">
              <span
                className="font-display text-6xl font-medium leading-none"
                style={{ WebkitTextStroke: '1.5px rgba(255,253,240,0.4)', color: 'transparent' }}
              >
                {step.number}
              </span>
              <h3 className="mt-2 text-2xl font-bold text-cream">{step.title}</h3>
              <p className="mt-3 text-sm text-cream/70">{step.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-3 px-4">
        {PROCESS_STEPS.map((step, i) => (
          <div key={step.number} className="h-1 flex-1 overflow-hidden rounded-full bg-cream/15">
            <div
              className="h-full bg-sun transition-all duration-300"
              style={{ width: i <= activeStep ? '100%' : '0%' }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

function ProcessStacked() {
  return (
    <section className="bg-navy px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-md space-y-10">
        {PROCESS_STEPS.map((step, i) => (
          <div key={step.number} className="overflow-hidden rounded-2xl">
            <img
              src={STEP_IMAGES[i]}
              alt={STEP_ALT[i]}
              className="h-52 w-full object-cover"
              loading="lazy"
            />
            <div className="pt-5">
              <span
                className="font-display text-6xl font-medium leading-none"
                style={{ WebkitTextStroke: '1.5px rgba(255,253,240,0.4)', color: 'transparent' }}
              >
                {step.number}
              </span>
              <h3 className="mt-2 text-2xl font-bold text-cream">{step.title}</h3>
              <p className="mt-3 text-sm text-cream/70">{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
