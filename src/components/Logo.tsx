import icon from '../assets/logo-vysao/icon.webp'

type LogoProps = {
  variant?: 'light' | 'dark'
  className?: string
  showWordmark?: boolean
}

export function Logo({ variant = 'dark', className = '', showWordmark = true }: LogoProps) {
  const ink = variant === 'dark' ? '#002350' : '#FFFDF0'

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img src={icon} alt="" aria-hidden="true" className="h-7 w-auto shrink-0" />
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
