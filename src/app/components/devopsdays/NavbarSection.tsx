import { useState, useEffect, type MouseEvent } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import styles from './NavbarSection.module.css'
import { siteContent } from '../../data/mockContent'

const navLinks = [
  { label: 'Sponsors', hash: '#sponsors' },
  { label: 'Tickets', href: siteContent.registrationUrl, external: true },
  { label: 'Speakers', hash: '#speakers' },
  { label: 'Ubicación', hash: '#venue' },
]

function getHeaderOffset() {
  const header = document.getElementById('site-header')
  return header ? header.getBoundingClientRect().height + 16 : 96
}

function scrollToSection(hash: string, behavior: ScrollBehavior = 'smooth') {
  const id = hash.replace('#', '')
  const element = document.getElementById(id)

  if (!element) return false

  const headerOffset = getHeaderOffset()
  const top = element.getBoundingClientRect().top + window.scrollY - headerOffset

  window.scrollTo({ top, behavior })
  return true
}

export function NavbarSection() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    
    window.addEventListener('scroll', onScroll)
    onScroll() // Initial check
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      requestAnimationFrame(() => {
        scrollToSection(location.hash, 'auto')
        window.setTimeout(() => {
          scrollToSection(location.hash, 'auto')
        }, 120)
      })
    }
  }, [location.pathname, location.hash])

  const handleSectionClick = (hash: string) => (e: MouseEvent) => {
    setMenuOpen(false)

    if (location.pathname !== '/') return

    e.preventDefault()
    window.history.replaceState(null, '', `/${hash}`)
    scrollToSection(hash)
  }

  return (
    <nav
      id="site-header"
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      aria-label="Navegación principal"
    >
      <div className={styles.navbarInner}>
        {/* Logo */}
        <Link to="/" className={styles.logoLink} aria-label="DevOpsDays Lima - Ir al inicio">
          <div className={styles.logoIcon}>
            <img
              src="/images/brand/logo.png"
              alt=""
              className={styles.logoImage}
            />
          </div>
          <span className={styles.logoText}>
            devopsdays <span className={styles.logoDomain}>lima</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className={styles.desktopMenu}>
          {navLinks.map((l) => {
            const isActive =
              !l.external &&
              location.pathname === '/' &&
              (location.hash === l.hash || (!location.hash && l.hash === '#hero'))

            return (
              <li key={l.label}>
                {l.external ? (
                  <a
                    href={l.href}
                    className={styles.navLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    to={`/${l.hash}`}
                    onClick={handleSectionClick(l.hash!)}
                    className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {l.label}
                    {isActive && <span className={styles.activeIndicator} aria-hidden="true" />}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>

        {/* CTA */}
        <a
          href={siteContent.registrationUrl}
          className={styles.ctaButton}
          aria-label="Comprar tickets para DevOpsDays Lima 2026"
          target="_blank"
          rel="noreferrer"
        >
          Comprar Tickets →
        </a>

        {/* Mobile toggle */}
        <button
          className={styles.mobileToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu} id="mobile-menu" role="navigation" aria-label="Menú móvil">
          <ul className={styles.mobileMenuList}>
            {navLinks.map((l) => (
              <li key={l.label}>
                {l.external ? (
                  <a
                    href={l.href}
                    className={styles.mobileMenuLink}
                    onClick={() => setMenuOpen(false)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    to={`/${l.hash}`}
                    className={styles.mobileMenuLink}
                    onClick={handleSectionClick(l.hash!)}
                  >
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
            <li className={styles.mobileMenuCta}>
              <a
                href={siteContent.registrationUrl}
                className={styles.mobileCtaButton}
                onClick={() => setMenuOpen(false)}
                target="_blank"
                rel="noreferrer"
              >
                Comprar Tickets →
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
