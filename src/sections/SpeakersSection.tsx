import { Link } from 'react-router-dom'
import { FaMicrophone, FaLinkedin } from 'react-icons/fa'
import { FiArrowUpRight } from 'react-icons/fi'
import { Section } from '../components/Section'
import { cfpOpen, speakersVisible, speakers, useSpeakerStrings } from '../content/speakers'
import { registrationUrl } from '../content/site'
import type { Speaker } from '../content/speakers'

function CtaButton({ label }: { label: string }) {
  if (!registrationUrl) return null
  const isExternal = /^https?:\/\//.test(registrationUrl) || registrationUrl.startsWith('//')
  if (isExternal) {
    return (
      <a
        className="btn btn--primary cfpCard__cta"
        href={registrationUrl}
        target="_blank"
        rel="noreferrer noopener"
      >
        {label}
        <FiArrowUpRight size={14} aria-hidden="true" />
      </a>
    )
  }
  return (
    <Link className="btn btn--primary cfpCard__cta" to={registrationUrl}>
      {label}
    </Link>
  )
}

/* ── CFP invitation card (simplified, centered) ──────────────── */

export function CfpCard({ showFooter = true }: { showFooter?: boolean }) {
  const s = useSpeakerStrings()

  return (
    <div className="cfpCard cfpCard--centered">
      <div className="cfpCard__iconWrap" aria-hidden="true">
        <FaMicrophone className="cfpCard__icon" aria-hidden="true" />
      </div>
      <p className="cfpCard__kicker">
        <span className="cfpCard__dot" aria-hidden="true" />
        {s.cfpEyebrow}
      </p>
      <p className="cfpCard__headline">{s.cfpTitle}</p>

      {/* lead text */}
      <p className="cfpCard__tagline">{s.cfpLead}</p>

      {/* topics */}
      <div className="cfpCard__topics">
        <p className="cfpCard__topicsLabel">{s.topicsTitle}</p>
        <ul className="cfpCard__topicsList" aria-label={s.topicsTitle}>
          {s.topics.map((topic) => (
            <li key={topic.id} className="cfpCard__topicItem">
              <span className="cfpCard__topicIcon" aria-hidden="true">{topic.icon}</span>
              <span className="cfpCard__topicText">{topic.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTAs */}
      {showFooter && (
        <div className="cfpCard__footer">
          {registrationUrl && <CtaButton label={s.cta} />}
          <Link to="/speakers#call-for-proposal" className="cfpCard__link">
            {s.becomeSpeakerCta}
          </Link>
        </div>
      )}
    </div>
  )
}

/* ── enriched speaker preview card ─────────────────────────── */

function SpeakerCard({ speaker }: { speaker: Speaker }) {

  return (
    <div className="speakerCard">
      <div className="speakerCard__portrait">
        <img
          src={speaker.imageSrc}
          alt={speaker.name}
          width={88}
          height={88}
          loading="lazy"
          decoding="async"
          className="speakerCard__img"
        />
        {speaker.linkedin && (
          <a
            className="speakerCard__linkedin"
            href={speaker.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${speaker.name} on LinkedIn`}
          >
            <FaLinkedin width="16" height="16" aria-hidden="true" />
          </a>
        )}
      </div>
      <div className="speakerCard__body">
        {speaker.format && (
          <span className="speakerCard__format">{speaker.format}</span>
        )}
        <p className="speakerCard__name">{speaker.name}</p>
        <p className="speakerCard__meta">
          {speaker.country && <span className="speakerCard__flag" aria-hidden="true">{speaker.country}</span>}
          <span className="speakerCard__role">{speaker.role}</span>
        </p>
      </div>
    </div>
  )
}

/* ── speakers preview (home) ────────────────────────────────── */

function SpeakersPreview() {
  const s = useSpeakerStrings()
  // Duplicate speakers to create infinite loop effect
  const trackItems = [...speakers.slice(0, 3), ...speakers.slice(0, 3)]

  return (
    <div className="speakersPreview">
      <div className="speakersPreview__carousel">
        <ul className="speakersPreview__track" aria-label={s.eyebrow}>
          {trackItems.map((speaker, i) => (
            <li key={`${i}-${speaker.name}`} className="speakersPreview__item">
              <SpeakerCard speaker={speaker} />
            </li>
          ))}
        </ul>
      </div>
      <div className="speakersPreview__footer">
        <Link to="/speakers#speakers-list" className="cfpCard__link">
          {s.viewAll}
        </Link>
      </div>
    </div>
  )
}

/* ── section ────────────────────────────────────────────────── */

export function SpeakersSection() {
  const s = useSpeakerStrings()

  return (
    <>
      <Section id="speakers" eyebrow={s.cfpEyebrow} title={s.cfpTitle}>
        {cfpOpen && <CfpCard />}
      </Section>
      <Section id="speakers-list" eyebrow={s.eyebrow} title={s.title}>
        {speakersVisible && <SpeakersPreview />}
      </Section>
    </>
  )
}
