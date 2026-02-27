import { Section } from '../components/Section'
import { organizers } from '../content/organizers'
import { useI18n } from '../i18n/useI18n'

function normalizeGithubUrl(value: string) {
  if (value.startsWith('http://') || value.startsWith('https://')) return value
  return `https://github.com/${value}`
}

function normalizeTwitterUrl(value: string) {
  const handle = value.startsWith('@') ? value.slice(1) : value
  return `https://x.com/${handle}`
}

const SOCIAL_LINK =
  'inline-flex items-center justify-center w-10 h-10 p-0 rounded-full text-site-icon border border-site-border bg-transparent no-underline transition-[border-color] duration-[120ms] ease hover:border-[rgba(var(--site-accent-rgb),0.6)] active:translate-y-px'

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
      <div className="grid gap-4 min-[860px]:grid-cols-4 grid-cols-2" role="list" aria-label={t('organizers.listLabel')}>
        {organizers.map((member) => {
          const hasLinks = Boolean(member.linkedin || member.github || member.twitter)

          return (
            <article
              key={member.name}
              className="group bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.035))] border border-white/[0.09] rounded-[12px] p-[18px] relative overflow-hidden flex flex-col items-center text-center gap-0 hover:bg-[var(--site-hover-sheen)] hover:shadow-none hover:translate-none [:root[data-theme=light]_&]:bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.55))] [:root[data-theme=light]_&]:border-black/[0.1] [:root[data-theme=light]_&]:hover:bg-[var(--site-hover-sheen)] after:content-[''] after:absolute after:inset-0 after:bg-[radial-gradient(800px_200px_at_30%_0%,rgba(var(--site-accent-rgb),0.12),transparent_55%),radial-gradient(800px_220px_at_80%_100%,rgba(var(--site-accent-2-rgb),0.12),transparent_55%)] after:opacity-[0.55] after:pointer-events-none after:[transform:translate3d(0,0,0)] [:root[data-theme=light]_&]:after:opacity-[0.22]"
              role="listitem"
            >
              {member.imageSrc ? (
                <div
                  className="relative w-[calc(100%+36px)] flex justify-center -ml-[18px] -mr-[18px] mb-[10px] before:content-[''] before:absolute before:inset-x-0 before:top-1/2 before:-translate-y-1/2 before:[height:0.5px] before:bg-site-border-subtle before:pointer-events-none"
                  aria-hidden="true"
                >
                  <img
                    className="w-20 h-20 rounded-full border border-site-border-strong object-cover relative z-[1] motion-safe:transition-transform motion-safe:duration-[160ms] motion-safe:ease motion-safe:group-hover:scale-[1.04]"
                    src={member.imageSrc}
                    alt=""
                    loading="lazy"
                  />
                </div>
              ) : null}

              <div className="flex flex-col items-center gap-2">
                <h3 className="font-[650] m-0">{member.name}</h3>
                {member.bio ? <p className="m-0 text-site-text-soft text-sm">{member.bio}</p> : null}
                {member.employer ? (
                  <p className="m-0 inline-flex items-center py-[6px] px-[10px] rounded bg-site-surface-muted text-site-text-soft text-[13px]">
                    {member.employer}
                  </p>
                ) : null}
              </div>

              {hasLinks ? (
                <div
                  className="mt-4 flex flex-wrap gap-2 justify-center"
                  role="group"
                  aria-label={t('organizers.linksLabel', { name: member.name })}
                >
                  {member.linkedin ? (
                    <a
                      className={SOCIAL_LINK}
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${t('organizers.link.linkedin')}: ${member.name} (${opensNewTabLabel})`}
                      title={t('organizers.link.linkedin')}
                    >
                      <svg className="block opacity-80 hover:opacity-[0.95]" width="18" height="18" viewBox="0 0 19 18" aria-hidden="true" focusable="false">
                        <path fill="currentColor" d="M3.94 2A2 2 0 1 1 2 0a2 2 0 0 1 1.94 2zM4 5.48H0V18h4zm6.32 0H6.34V18h3.94v-6.57c0-3.66 4.77-4 4.77 0V18H19v-7.93c0-6.17-7.06-5.94-8.72-2.91z" />
                      </svg>
                    </a>
                  ) : null}
                  {member.github ? (
                    <a
                      className={SOCIAL_LINK}
                      href={normalizeGithubUrl(member.github)}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${t('organizers.link.github')}: ${member.name} (${opensNewTabLabel})`}
                      title={t('organizers.link.github')}
                    >
                      <svg className="block opacity-80 hover:opacity-[0.95]" width="18" height="18" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                        <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                    </a>
                  ) : null}
                  {member.twitter ? (
                    <a
                      className={SOCIAL_LINK}
                      href={normalizeTwitterUrl(member.twitter)}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${t('organizers.link.x')}: ${member.name} (${opensNewTabLabel})`}
                      title={t('organizers.link.x')}
                    >
                      <svg className="block opacity-80 hover:opacity-[0.95]" width="18" height="18" viewBox="0 0 1200 1227" aria-hidden="true" focusable="false">
                        <path fill="currentColor" d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z" />
                      </svg>
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
