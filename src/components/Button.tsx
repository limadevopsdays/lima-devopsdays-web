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
}: ButtonProps) {
  const className = `btn btn--${variant}`

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
