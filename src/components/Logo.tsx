export function Logo() {
  return (
    <a
      className="logo"
      href="#top"
      aria-label="DevOpsDays Lima home"
      onClick={(event) => {
        event.preventDefault()
        const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
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
