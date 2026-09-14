type LogoProps = {
  variant?: 'light' | 'dark'
  className?: string
  showWordmark?: boolean
}

/**
 * Placeholder do símbolo (olho + raios) até a arte final da Vysão ser integrada.
 * Substituir pelos assets tratados (vysao-logo-transparente.png / vysao-simbolo-olho-isolado.png)
 * quando disponíveis.
 */
export function Logo({ variant = 'dark', className = '', showWordmark = true }: LogoProps) {
  const ink = variant === 'dark' ? '#002350' : '#FFFDF0'

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="30" height="30" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path
          d="M6 33c6.5-12 16-19 26-19s19.5 7 26 19c-6.5 12-16 19-26 19S12.5 45 6 33Z"
          stroke={ink}
          strokeWidth="3"
        />
        <circle cx="32" cy="33" r="11" stroke="#FFB900" strokeWidth="3" />
        <circle cx="32" cy="33" r="4.5" fill="#FFB900" />
        <g stroke="#0099FF" strokeWidth="2" strokeLinecap="round">
          <path d="M32 9v-5" />
          <path d="M50 33h5" />
          <path d="M44.5 12.5l2.8-4" />
          <path d="M19.5 12.5l-2.8-4" />
        </g>
      </svg>
      {showWordmark && (
        <span
          className="font-semibold tracking-tight text-[17px] leading-none"
          style={{ color: ink }}
        >
          VYS<span style={{ color: '#FFB900' }}>Ã</span>O SOLAR
        </span>
      )}
    </div>
  )
}
