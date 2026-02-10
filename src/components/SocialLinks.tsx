import { socialLinks } from '../content/site'
import { useI18n } from '../i18n/useI18n'

export function SocialLinks() {
  const { t } = useI18n()

  return (
    <div className="social" aria-label={t('footer.socialLabel')}>
      {socialLinks.map((link) => (
        <a key={link.href} className="social__link" href={link.href} target="_blank" rel="noreferrer noopener">
          <img className="social__icon" alt="" src={`/assets/icons/${link.icon}.svg`} width={18} height={18} />
          <span className="social__label">{link.label}</span>
        </a>
      ))}
    </div>
  )
}
