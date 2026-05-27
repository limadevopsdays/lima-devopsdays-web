import { useState, useEffect, type MouseEvent } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import styles from './index.module.css'
import { siteContent } from '../../../data/mockContent'
import { useI18n, useLocale, useSetLocale } from '../../../i18n'
import { navbarI18n } from './i18n'

function getHeaderOffset() {
  const header = document.getElementById('site-header')
  return header ? header.getBoundingClientRect().height + 16 : 96
}

function scrollToSection(hash: string, behavior: ScrollBehavior = 'smooth') {
  const id = hash.replace('#', '')
  const element = document.getElementById(id)

  if (!element) return false

  const headerOffset = getHeaderOffset()
  const extraOffset =
    id === 'tickets'
      ? Number.parseFloat(window.getComputedStyle(element).scrollMarginTop || '0') || 0
      : 0
  const top = element.getBoundingClientRect().top + window.scrollY - headerOffset - extraOffset

  window.scrollTo({ top, behavior })
  return true
}

export function NavbarSection() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const t = useI18n(navbarI18n)
  const locale = useLocale()
  const setLocale = useSetLocale()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const applyHashScroll = () => {
        requestAnimationFrame(() => {
          scrollToSection(location.hash, 'auto')
          window.setTimeout(() => {
            scrollToSection(location.hash, 'auto')
          }, 120)
        })
      }
      applyHashScroll()
    }
  }, [location.hash, location.pathname])

  function handleSectionClick(hash: string) {
    return (e: MouseEvent) => {
      if (location.pathname === '/') {
        e.preventDefault()
        scrollToSection(hash)
        setMenuOpen(false)
      } else {
        setMenuOpen(false)
      }
    }
  }

  function handleLogoClick(e: MouseEvent) {
    if (location.pathname === '/') {
      e.preventDefault()
      requestAnimationFrame(() => {
        window.setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 120)
      })
    }
  }

  return (
    <nav
      id="site-header"
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      aria-label={t.ariaNav}
    >
      <div className={styles.navbarInner}>
        {/* Logo */}
        <Link
          to="/"
          className={styles.logoLink}
          aria-label={t.ariaLogo}
          onClick={handleLogoClick}
        >
          <div className={styles.logoIcon}>
            <img
              src="/images/brand/logo.png"
              alt=""
              className={styles.logoImage}
            />
          </div>
        </Link>

        {/* Desktop links */}
        <ul className={styles.desktopMenu}>
          {t.navLinks.map((l) => {
            const isActive =
              location.pathname === '/' &&
              (location.hash === l.hash || (!location.hash && l.hash === '#hero'))

            return (
              <li key={l.hash}>
                <Link
                  to={`/${l.hash}`}
                  onClick={handleSectionClick(l.hash)}
                  className={`${styles.navLink} ${l.accent ? styles.navLinkTourism : ''} poppins-medium ${isActive ? styles.active : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {l.label}
                  {isActive && <span className={styles.activeIndicator} aria-hidden="true" />}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Lang toggle — desktop */}
        <div className={styles.langToggle} role="group" aria-label="Idioma / Language">
          <button
            type="button"
            className={`${styles.langOption} ${locale === 'es' ? styles.langOptionActive : ''}`}
            onClick={() => setLocale('es')}
            aria-pressed={locale === 'es'}
            aria-label="Español"
          >
            ES
          </button>
          <span className={styles.langDivider} aria-hidden="true">|</span>
          <button
            type="button"
            className={`${styles.langOption} ${locale === 'en' ? styles.langOptionActive : ''}`}
            onClick={() => setLocale('en')}
            aria-pressed={locale === 'en'}
            aria-label="English"
          >
            EN
          </button>
        </div>

        {/* CTA */}
        <a
          href={siteContent.registrationUrl}
          className={styles.ctaButton}
          aria-label={t.ariaBuyTickets}
          target="_blank"
          rel="noreferrer"
          data-track-name="comprar_tickets_navbar_home"
        >
          <span>{t.ctaLabel}</span>
          <ArrowRight className={styles.ctaIcon} aria-hidden="true" />
        </a>

        {/* Mobile toggle */}
        <button
          className={styles.mobileToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? t.ariaMenuClose : t.ariaMenuOpen}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu} id="mobile-menu" role="navigation" aria-label={t.ariaNav}>
          <ul className={styles.mobileMenuList}>
            {t.navLinks.map((l) => (
              <li key={l.hash}>
                <Link
                  to={`/${l.hash}`}
                  className={`${styles.mobileMenuLink} ${l.accent ? styles.mobileMenuLinkTourism : ''} poppins-medium`}
                  onClick={handleSectionClick(l.hash)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <div className={styles.mobileLangToggle} role="group" aria-label="Idioma / Language">
                <button
                  type="button"
                  className={`${styles.mobileLangOption} ${locale === 'es' ? styles.mobileLangOptionActive : ''}`}
                  onClick={() => { setLocale('es'); setMenuOpen(false) }}
                  aria-pressed={locale === 'es'}
                  aria-label="Español"
                >
                  ES
                </button>
                <span className={styles.mobileLangDivider} aria-hidden="true">|</span>
                <button
                  type="button"
                  className={`${styles.mobileLangOption} ${locale === 'en' ? styles.mobileLangOptionActive : ''}`}
                  onClick={() => { setLocale('en'); setMenuOpen(false) }}
                  aria-pressed={locale === 'en'}
                  aria-label="English"
                >
                  EN
                </button>
              </div>
            </li>
            <li className={styles.mobileMenuCta}>
              <a
                href={siteContent.registrationUrl}
                className={styles.mobileCtaButton}
                onClick={() => setMenuOpen(false)}
                target="_blank"
                rel="noreferrer"
                data-track-name="comprar_tickets_navbar_home"
              >
                <span>{t.ctaLabel}</span>
                <ArrowRight className={styles.ctaIcon} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
