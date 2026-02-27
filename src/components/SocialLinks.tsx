import { socialLinks } from '../content/site'
import { useI18n } from '../i18n/useI18n'

export function SocialLinks() {
  const { t } = useI18n()

  return (
    <div className="flex gap-[10px]" aria-label={t('footer.socialLabel')}>
      {socialLinks.map((link) => (
        <a
          key={link.href}
          className="inline-flex items-center gap-2 text-site-text-muted no-underline hover:text-site-text"
          href={link.href}
          target="_blank"
          rel="noreferrer noopener"
        >
          <img className="block opacity-80" alt="" src={`/assets/icons/${link.icon}.svg`} width={18} height={18} />
          <span className="sr-only">{link.label}</span>
        </a>
      ))}
    </div>
  )
}
