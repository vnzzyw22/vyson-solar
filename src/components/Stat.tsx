import { useCountUp } from '../hooks/useCountUp'

type StatProps = {
  value: number
  suffix: string
  label: string
  tone?: 'navy' | 'sun'
}

export function Stat({ value, suffix, label, tone = 'navy' }: StatProps) {
  const { ref, value: current } = useCountUp(value)
  const colorClass = tone === 'sun' ? 'text-sun' : 'text-navy'

  return (
    <div>
      <p ref={ref as never} className={`text-4xl font-bold tabular-nums sm:text-5xl lg:text-6xl ${colorClass}`}>
        {current}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-navy/60">{label}</p>
    </div>
  )
}
