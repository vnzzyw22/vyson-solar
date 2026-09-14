import icon from '../assets/logo-vysao/icon.webp'
import wordmark from '../assets/logo-vysao/wordmark.webp'

type LogoProps = {
  variant?: 'light' | 'dark'
  className?: string
  showWordmark?: boolean
}

export function Logo({ variant = 'dark', className = '', showWordmark = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src={icon}
        alt={showWordmark ? '' : 'Vysão Solar'}
        aria-hidden={showWordmark || undefined}
        className="h-7 w-auto shrink-0"
      />
      {showWordmark && (
        <img
          src={wordmark}
          alt="Vysão Solar"
          className="h-[22px] w-auto shrink-0"
          style={variant === 'light' ? { filter: 'brightness(0) invert(1)' } : undefined}
        />
      )}
    </div>
  )
}
