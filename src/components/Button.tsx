import type { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type ButtonProps = {
  as?: 'button' | 'a'
  href?: string
  target?: string
  rel?: string
  ariaLabel?: string
  title?: string
  onClick?: () => void
  children: ReactNode
  variant?: ButtonVariant
  context?: 'hero'
}

const BASE =
  'inline-flex items-center justify-center gap-[10px] h-10 px-[14px] rounded-full border border-transparent no-underline font-[650] tracking-[-0.01em] transition-[transform,background,border-color,box-shadow] duration-[120ms] ease active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--site-focus)]'

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-[linear-gradient(135deg,var(--color-site-accent),var(--color-site-accent-2))] text-white/[0.96] border-[rgba(var(--site-accent-rgb),0.35)] shadow-[0_16px_40px_rgba(var(--site-accent-2-rgb),0.22),0_0_0_1px_rgba(var(--site-accent-rgb),0.18)]',
  secondary:
    'bg-site-surface text-site-text border-site-border-strong hover:border-[rgba(var(--site-accent-rgb),0.28)] hover:shadow-[0_0_0_1px_rgba(var(--site-accent-2-rgb),0.12)]',
  ghost:
    'bg-transparent text-site-text border-site-border-stronger hover:border-[rgba(var(--site-accent-rgb),0.28)] hover:shadow-[0_0_0_1px_rgba(var(--site-accent-2-rgb),0.12)]',
}

const HERO_VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-[linear-gradient(135deg,rgba(var(--site-accent-rgb),0.98),rgba(var(--site-accent-2-rgb),0.96))] text-white/[0.96] border-[rgba(var(--site-accent-rgb),0.35)] shadow-[0_18px_56px_rgba(var(--site-accent-2-rgb),0.32),0_0_0_1px_rgba(var(--site-accent-rgb),0.22)]',
  secondary:
    'bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.05))] text-site-text border-[rgba(var(--site-accent-rgb),0.26)] shadow-[0_14px_44px_rgba(var(--site-accent-rgb),0.14)] hover:border-[rgba(var(--site-accent-rgb),0.28)] hover:shadow-[0_0_0_1px_rgba(var(--site-accent-2-rgb),0.12)]',
  ghost:
    'bg-[rgba(255,255,255,0.02)] text-site-text border-[rgba(var(--site-accent-2-rgb),0.24)] shadow-[0_12px_36px_rgba(var(--site-accent-2-rgb),0.1)] hover:border-[rgba(var(--site-accent-rgb),0.28)] hover:shadow-[0_0_0_1px_rgba(var(--site-accent-2-rgb),0.12)]',
}

export function Button({
  as = 'button',
  href,
  target,
  rel,
  ariaLabel,
  title,
  onClick,
  children,
  variant = 'primary',
  context,
}: ButtonProps) {
  const variantClasses = context === 'hero' ? HERO_VARIANTS[variant] : VARIANTS[variant]
  const className = `${BASE} ${variantClasses}`

  if (as === 'a') {
    return (
      <a className={className} href={href} target={target} rel={rel} aria-label={ariaLabel} title={title}>
        {children}
      </a>
    )
  }

  return (
    <button className={className} type="button" onClick={onClick} aria-label={ariaLabel} title={title}>
      {children}
    </button>
  )
}
