import { Section } from '../components/Section'
import { useI18n } from '../i18n/useI18n'

const BOX =
  'border border-white/[0.09] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.035))] rounded-[12px] py-4 px-[18px] text-site-text text-base [:root[data-theme=light]_&]:border-black/[0.1] [:root[data-theme=light]_&]:bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.55))]'

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
      <div className={BOX} role="note" aria-labelledby={noteTitleId} aria-describedby={`${noteBodyId} ${noteHintId}`}>
        <p style={{ margin: 0 }}>
          <span aria-hidden="true">🎙️</span> <strong id={noteTitleId}>{t('speakers.noteTitle')}</strong>{' '}
          <span id={noteBodyId}>{t('speakers.noteBody')}</span>
        </p>
        <div className="mt-[10px] text-site-text-muted" id={noteHintId}>
          <em>{t('speakers.noteHint')}</em>
        </div>
      </div>
    </Section>
  )
}
