import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useReducedMotion } from './useReducedMotion'

const easeOutQuad = (t: number) => t * (2 - t)

export function useCountUp(target: number, durationMs = 1800) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reducedMotion = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    if (reducedMotion) {
      setValue(target)
      return
    }

    let frame: number
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / durationMs, 1)
      setValue(Math.round(easeOutQuad(progress) * target))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isInView, target, durationMs, reducedMotion])

  return { ref, value }
}
