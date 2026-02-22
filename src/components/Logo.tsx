export function Logo() {
  return (
    <a
      className="inline-flex gap-[10px] items-center no-underline shrink-0"
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
        <img
          className="h-[34px] w-auto [filter:drop-shadow(0_8px_20px_rgba(var(--site-accent-rgb),0.22))]"
          src="/logo.png"
          alt=""
        />
      </picture>
      <span className="font-bold tracking-[-0.01em]">
        <span className="logo__name">{/* gradient text via @supports in CSS */}DevOpsDays Lima</span>{' '}
        <span className="logo__year">2026</span>
      </span>
    </a>
  )
}
