import { Section } from '../components/Section'
import { Button } from '../components/Button'
import { useI18n } from '../i18n/useI18n'

const principles = ['respect', 'inclusive', 'safe'] as const

export function CodeOfConductSection() {
  const { t } = useI18n()

  return (
    <Section
      id="code-of-conduct"
      eyebrow={t('coc.eyebrow')}
      title={t('coc.title')}
      lead={t('coc.lead')}
    >
      <div className="coc">
        <p className="coc__summary">{t('coc.summary')}</p>

        <div className="grid grid--3">
          {principles.map((p) => (
            <div key={p} className="card coc__card">
              <h3 className="coc__cardTitle">{t(`coc.${p}.title`)}</h3>
              <p className="coc__cardBody muted">{t(`coc.${p}.body`)}</p>
            </div>
          ))}
        </div>

        <div className="coc__action">
          <Button
            as="a"
            href={t('coc.fullUrl')}
            variant="secondary"
          >
            {t('coc.fullLink')}
          </Button>
        </div>
      </div>
    </Section>
  )
}
