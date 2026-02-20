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
    <header id="top" className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <Container>
        <div className="header__row">
          <Logo />

          <nav className="nav" aria-label={t('header.primaryNav')}>
            {items.map((item) => (
              <a key={item.href} className="nav__link" href={item.href}>
                {t(item.labelKey)}
              </a>
            ))}
          </nav>

          <div className="header__actions">
            {ticketsUrl ? (
              <div className="header__tickets">
                <Button as="a" href={ticketsUrl} target="_blank" rel="noopener noreferrer" variant="primary">
                  {t('header.cta.buyTickets')}
                </Button>
              </div>
            ) : null}
            <ThemeToggle />
            <LanguageToggle />
            <button
              type="button"
              className="iconButton header__menuButton"
              aria-label={open ? t('header.closeMenu') : t('header.openMenu')}
              aria-expanded={open}
              onClick={() => setOpen((prev) => !prev)}
            >
              <span className="iconButton__bar" />
              <span className="iconButton__bar" />
              <span className="iconButton__bar" />
            </button>
          </div>
        </div>
      </Container>

      {open ? (
        <div className="mobileMenu" role="dialog" aria-modal="true" aria-label={t('header.mobileNav')}>
          <div className="mobileMenu__backdrop" onClick={() => setOpen(false)} />
          <div className="mobileMenu__panel">
            <div className="mobileMenu__top">
              <span className="mobileMenu__title">{t('header.menu')}</span>
              <button type="button" className="mobileMenu__close" onClick={() => setOpen(false)}>
                {t('header.close')}
              </button>
            </div>
            <div className="mobileMenu__links">
              {items.map((item) => (
                <a
                  key={item.href}
                  className="mobileMenu__link"
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {t(item.labelKey)}
                </a>
              ))}
            </div>
            {ticketsUrl ? (
              <div className="mobileMenu__cta">
                <a className="btn btn--primary" href={ticketsUrl} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
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
