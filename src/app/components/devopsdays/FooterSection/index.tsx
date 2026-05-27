import { Linkedin, Instagram } from 'lucide-react'
import { Link } from 'react-router'
import styles from './index.module.css'
import { useI18n } from '../../../i18n'
import { footerI18n } from './i18n'

export function FooterSection() {
  const t = useI18n(footerI18n)

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Logo + Year */}
        <div className={styles.logoContainer}>
          <span className={styles.logoText}>
            <span className={styles.logoDevOps}>DevOps</span>
            <span className={styles.logoDays}>Days Lima 2026</span>
          </span>
        </div>

        {/* Copyright | Links | Social */}
        <div className={styles.footerContent}>
          <p className={styles.copyright}>{t.copyright}</p>

          <nav className={styles.nav} aria-label={t.ariaNav}>
            {t.links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`${styles.navLink} ${link.accent ? styles.navLinkTourism : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.socialLinks}>
            <a
              href="https://www.linkedin.com/company/devops-days-lima/"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
              aria-label={t.ariaLinkedIn}
            >
              <Linkedin className={styles.socialIcon} />
            </a>
            <a
              href="https://www.instagram.com/devopsdayslima/"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
              aria-label={t.ariaInstagram}
            >
              <Instagram className={styles.socialIcon} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
