import { Section } from '../components/Section'
import { organizers } from '../content/organizers'
import { useI18n } from '../i18n/useI18n'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

function normalizeGithubUrl(value: string) {
  if (value.startsWith('http://') || value.startsWith('https://')) return value
  return `https://github.com/${value}`
}

function normalizeTwitterUrl(value: string) {
  const handle = value.startsWith('@') ? value.slice(1) : value
  return `https://x.com/${handle}`
}

export function OrganizersSection() {
  const { t } = useI18n()
  const opensNewTabLabel = t('common.opensNewTab')

  return (
    <Section
      id="organizers"
      eyebrow={t('organizers.eyebrow')}
      title={t('organizers.title')}
      lead={t('organizers.lead')}
    >
      <div className="grid grid--4" role="list" aria-label={t('organizers.listLabel')}>
        {organizers.map((member) => {
          const hasLinks = Boolean(member.linkedin || member.github || member.twitter)

          return (
            <article key={member.name} className="card organizerCard" role="listitem">
              {member.imageSrc ? (
                <div className="organizerCard__avatar" aria-hidden="true">
                  <img className="organizerCard__img" src={member.imageSrc} alt="" loading="lazy" />
                </div>
              ) : null}

              <div className="organizerCard__body">
                <h3 className="organizerCard__name">{member.name}</h3>
                {member.bio ? <p className="organizerCard__bio">{member.bio}</p> : null}
                {member.employer ? <p className="organizerCard__meta">{member.employer}</p> : null}
              </div>

              {hasLinks ? (
                <div className="organizerCard__links" role="group" aria-label={t('organizers.linksLabel', { name: member.name })}>
                  {member.linkedin ? (
                    <a
                      className="social__link organizerSocialLink"
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${t('organizers.link.linkedin')}: ${member.name} (${opensNewTabLabel})`}
                      title={t('organizers.link.linkedin')}
                    >
                      <FaLinkedin className="organizerSocialIcon" aria-hidden="true" />
                    </a>
                  ) : null}
                  {member.github ? (
                    <a
                      className="social__link organizerSocialLink"
                      href={normalizeGithubUrl(member.github)}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${t('organizers.link.github')}: ${member.name} (${opensNewTabLabel})`}
                      title={t('organizers.link.github')}
                    >
                      <FaGithub className="organizerSocialIcon" aria-hidden="true" />
                    </a>
                  ) : null}
                  {member.twitter ? (
                    <a
                      className="social__link organizerSocialLink"
                      href={normalizeTwitterUrl(member.twitter)}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${t('organizers.link.x')}: ${member.name} (${opensNewTabLabel})`}
                      title={t('organizers.link.x')}
                    >
                      <FaXTwitter className="organizerSocialIcon" aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              ) : null}
            </article>
          )
        })}
      </div>
    </Section>
  )
}
