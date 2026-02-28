import { useLocation, useNavigate } from 'react-router-dom'

export function Logo() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <a
      className="logo"
      href="/"
      aria-label="DevOpsDays Lima home"
      onClick={(event) => {
        event.preventDefault()
        if (pathname === '/') {
          const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
          window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
        } else {
          navigate('/')
        }
      }}
    >
      <picture>
        <source srcSet="/logo.svg" type="image/svg+xml" />
        <img className="logo__mark" src="/logo.png" alt="" />
      </picture>
      <span className="logo__text">
        <span className="logo__name">DevOpsDays Lima</span> <span className="logo__year">2026</span>
      </span>
    </a>
  )
}
