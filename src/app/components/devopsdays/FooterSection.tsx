import { Linkedin, Instagram } from 'lucide-react'
import { Link } from 'react-router'
import styles from './FooterSection.module.css'

export function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Logo + Year */}
        <div className={styles.logoContainer}>
          <h2 className={styles.logoText}>DevOpsDays Lima</h2>
          <span className={styles.logoYear}>2026</span>
        </div>

        {/* Copyright | Links | Social */}
        <div className={styles.footerContent}>
          {/* Copyright */}
          <p className={styles.copyright}>
            © 2026 DevOpsDays Lima. Todos los derechos reservados.
          </p>

          {/* Navigation Links */}
          <nav className={styles.nav} aria-label="Enlaces del footer">
            <Link to="/#sponsors" className={styles.navLink}>
              Sponsors
            </Link>
            <Link to="/tickets" className={styles.navLink}>
              Tickets
            </Link>
            <Link to="/#speakers" className={styles.navLink}>
              Speakers
            </Link>
            <Link to="/#venue" className={styles.navLink}>
              Ubicación
            </Link>
          </nav>

          {/* Social Icons */}
          <div className={styles.socialLinks}>
            <a
              href="https://www.linkedin.com/company/devops-days-lima/"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn de DevOpsDays Lima"
            >
              <Linkedin className={styles.socialIcon} />
            </a>
            <a
              href="https://www.instagram.com/devopsdayslima/"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
              aria-label="Instagram de DevOpsDays Lima"
            >
              <Instagram className={styles.socialIcon} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
