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
    </Section>
  )
}
