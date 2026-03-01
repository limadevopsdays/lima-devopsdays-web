import { Container } from './Container'
import { FaLinkedin, FaInstagram } from 'react-icons/fa'
import { navItems, socialLinks } from '../content/site'
import { useI18n } from '../i18n/useI18n'

const FooterSocialIcon = ({ icon }: { icon: 'linkedin' | 'instagram' }) => {
  if (icon === 'linkedin') {
    return <FaLinkedin className="footer__socialIconImg" aria-hidden="true" />
  }

  return <FaInstagram className="footer__socialIconImg" aria-hidden="true" />
}

export function SiteFooter() {
  const { t } = useI18n()
  const opensNewTabLabel = t('common.opensNewTab')

  return (
    <footer className="footer">
      <Container>
        <div className="footer__grid">
          <div className="footer__brandName">DevOpsDays Lima</div>
          <div className="footer__year">
            <span className="footer__yearText">26</span>
          </div>
        </div>
        <div className="footer__bottom">
          <span className="footer__rights">{t('footer.rights', { year: new Date().getFullYear() })}</span>
          <nav className="footer__bottomNav" aria-label={t('footer.linksLabel')}>
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {t(item.labelKey)}
              </a>
            ))}
          </nav>
          <nav className="footer__bottomSocial" aria-label={t('footer.socialLabel')}>
            {socialLinks.map((link) => (
              <a
                key={link.href}
                className="footer__socialIcon"
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${link.label} (${opensNewTabLabel})`}
              >
                <FooterSocialIcon icon={link.icon} />
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  )
}
