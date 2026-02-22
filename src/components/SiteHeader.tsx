import { useEffect, useMemo, useState } from 'react'
import { navItems, ticketsUrl } from '../content/site'
import { Button } from './Button'
import { Container } from './Container'
import { LanguageToggle } from './LanguageToggle'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'
import { useI18n } from '../i18n/useI18n'

function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [locked])
}

const ICON_BTN =
  'w-[42px] h-[42px] rounded-full bg-site-surface border border-site-border-strong cursor-pointer inline-flex items-center justify-center gap-1 hover:border-[rgba(var(--site-accent-rgb),0.28)] hover:shadow-[0_0_0_1px_rgba(var(--site-accent-2-rgb),0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--site-focus)]'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useLockBodyScroll(open)

  const { t } = useI18n()
  const items = useMemo(() => navItems, [])

  useEffect(() => {
    let ticking = false

    const update = () => {
      const next = window.scrollY > 20
      setScrolled((prev) => (prev === next ? prev : next))
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        update()
        ticking = false
      })
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      id="top"
      className={`sticky top-0 z-50 backdrop-blur-[10px] transition-[background,border-color,box-shadow] duration-[160ms] ease${scrolled ? ' bg-site-header-bg shadow-[0_10px_40px_rgba(0,0,0,0.25)]' : ''}`}
    >
      <Container>
        <div className="h-[72px] flex items-center gap-4">
          <Logo />

          <nav className="ml-3 hidden min-[860px]:inline-flex gap-[14px]" aria-label={t('header.primaryNav')}>
            {items.map((item) => (
              <a
                key={item.href}
                className="py-[10px] px-[10px] rounded-full no-underline text-site-text-muted transition-[background,color] duration-[120ms] ease hover:text-site-text hover:bg-site-surface"
                href={item.href}
              >
                {t(item.labelKey)}
              </a>
            ))}
          </nav>

          <div className="ml-auto inline-flex items-center gap-[10px]">
            {ticketsUrl ? (
              <div className="hidden min-[860px]:inline-flex">
                <Button as="a" href={ticketsUrl} variant="primary">
                  {t('header.cta.buyTickets')}
                </Button>
              </div>
            ) : null}
            <ThemeToggle />
            <LanguageToggle />
            <button
              type="button"
              className={`${ICON_BTN} min-[860px]:hidden`}
              aria-label={open ? t('header.closeMenu') : t('header.openMenu')}
              aria-expanded={open}
              onClick={() => setOpen((prev) => !prev)}
            >
              <span className="w-4 h-0.5 bg-site-icon rounded-full block" />
              <span className="w-4 h-0.5 bg-site-icon rounded-full block" />
              <span className="w-4 h-0.5 bg-site-icon rounded-full block" />
            </button>
          </div>
        </div>
      </Container>

      {open ? (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label={t('header.mobileNav')}>
          <div className="absolute inset-0 bg-site-backdrop" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[min(420px,92vw)] bg-site-panel-bg border-l border-site-border backdrop-blur-sm p-[18px] flex flex-col gap-4">
            <div className="flex items-baseline justify-between">
              <span className="font-extrabold tracking-[-0.02em]">{t('header.menu')}</span>
              <button
                type="button"
                className="border-0 bg-transparent text-site-text-muted cursor-pointer py-2 px-[10px] rounded-full"
                onClick={() => setOpen(false)}
              >
                {t('header.close')}
              </button>
            </div>
            <div className="flex flex-col gap-1 p-[6px] rounded-[14px] bg-site-mobile-links-bg border border-site-border-subtle">
              {items.map((item) => (
                <a
                  key={item.href}
                  className="no-underline py-3 px-3 rounded-[12px] bg-transparent border border-transparent text-site-text font-[650] hover:bg-white/5 hover:border-[rgba(var(--site-accent-rgb),0.22)] [:root[data-theme=light]_&]:text-[rgba(0,0,0,0.88)] [:root[data-theme=light]_&]:hover:bg-black/[0.04]"
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {t(item.labelKey)}
                </a>
              ))}
            </div>
            {ticketsUrl ? (
              <div className="mt-auto">
                <a
                  className="inline-flex items-center justify-center gap-[10px] h-10 px-[14px] w-full rounded-full border border-transparent no-underline font-[650] tracking-[-0.01em] bg-[linear-gradient(135deg,var(--color-site-accent),var(--color-site-accent-2))] text-white/[0.96] border-[rgba(var(--site-accent-rgb),0.35)] shadow-[0_16px_40px_rgba(var(--site-accent-2-rgb),0.22),0_0_0_1px_rgba(var(--site-accent-rgb),0.18)]"
                  href={ticketsUrl}
                  onClick={() => setOpen(false)}
                >
                  {t('header.cta.buyTickets')}
                </a>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
