import { Button } from '../components/Button'
import { Section } from '../components/Section'
import { useI18n } from '../i18n/useI18n'

export function SpeakersSection() {
  const { t } = useI18n()
  const noteTitleId = 'speakers-note-title'
  const noteBodyId = 'speakers-note-body'
  const noteHintId = 'speakers-note-hint'

  return (
    <Section
      id="speakers"
      eyebrow={t('speakers.eyebrow')}
      title={t('speakers.title')}
      lead={t('speakers.lead')}
    >
      <div className="schedule__box" role="note" aria-labelledby={noteTitleId} aria-describedby={`${noteBodyId} ${noteHintId}`}>
        <p style={{ margin: 0 }}>
          <span aria-hidden="true">🎙️</span> <strong id={noteTitleId}>{t('speakers.noteTitle')}</strong>{' '}
          <span id={noteBodyId}>{t('speakers.noteBody')}</span>
        </p>
        <div className="schedule__subnote" id={noteHintId}>
          <em>{t('speakers.noteHint')}</em>
        </div>
      </div>

      <div className="card speakersCfp">
        <h3 className="speakersCfp__title">{t('speakers.cfp.title')}</h3>
        <p className="speakersCfp__intro">{t('speakers.cfp.intro')}</p>

        <div className="speakersCfp__columns">
          <div className="speakersCfp__col">
            <h4 className="speakersCfp__subtitle">
              <span aria-hidden="true">✨</span> {t('speakers.cfp.topicsTitle')}
            </h4>
            <ul className="speakersCfp__list">
              <li>{t('speakers.cfp.topic1')}</li>
              <li>{t('speakers.cfp.topic2')}</li>
              <li>{t('speakers.cfp.topic3')}</li>
              <li>{t('speakers.cfp.topic4')}</li>
            </ul>
          </div>
          <div className="speakersCfp__col">
            <h4 className="speakersCfp__subtitle">
              <span aria-hidden="true">🎯</span> {t('speakers.cfp.whyTitle')}
            </h4>
            <ul className="speakersCfp__list">
              <li>{t('speakers.cfp.why1')}</li>
              <li>{t('speakers.cfp.why2')}</li>
              <li>{t('speakers.cfp.why3')}</li>
              <li>{t('speakers.cfp.why4')}</li>
            </ul>
          </div>
        </div>

        <div className="speakersCfp__timeline">
          <h4 className="speakersCfp__subtitle">{t('speakers.cfp.timelineTitle')}</h4>
          <div className="cfpTimeline">
            <div className="cfpTimeline__item">
              <div className="cfpTimeline__dot" />
              <div className="cfpTimeline__content">
                <strong>{t('speakers.cfp.timelineOpen')}</strong>
                <span className="muted">{t('speakers.cfp.timelineOpenDate')}</span>
              </div>
            </div>
            <div className="cfpTimeline__item">
              <div className="cfpTimeline__dot" />
              <div className="cfpTimeline__content">
                <strong>{t('speakers.cfp.timelineClose')}</strong>
                <span className="muted">{t('speakers.cfp.timelineCloseDate')}</span>
              </div>
            </div>
            <div className="cfpTimeline__item">
              <div className="cfpTimeline__dot" />
              <div className="cfpTimeline__content">
                <strong>{t('speakers.cfp.timelineNotify')}</strong>
                <span className="muted">{t('speakers.cfp.timelineNotifyDate')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="speakersCfp__action">
          <Button
            as="a"
            href={t('speakers.cfp.url')}
            variant="primary"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path fill="currentColor" d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Zm5 9a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.93V21h2v-3.07A7 7 0 0 0 19 11h-2Z" />
            </svg>
            {t('speakers.cfp.cta')}
          </Button>
        </div>
      </div>
    </Section>
  )
}
