import { FaLinkedin } from 'react-icons/fa'
import { FaTicket } from 'react-icons/fa6'
import { Section } from '../components/Section'
import { Container } from '../components/Container'
import { CfpCard } from '../sections/SpeakersSection'
import { cfpOpen, speakersVisible, speakers, useSpeakerStrings } from '../content/speakers'
import { registrationUrl } from '../content/site'
import type { Speaker } from '../content/speakers'

/* ── enriched full speaker card ─────────────────────────────── */

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <div className="speakerCard speakerCard--full">
      <div className="speakerCard__portrait">
        <img
          src={speaker.imageSrc}
          alt={speaker.name}
          width={96}
          height={96}
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
            <FaLinkedin aria-hidden={true} />
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
        <p className="speakerCard__topic">{speaker.topic}</p>
      </div>
    </div>
  )
}

/* ── full speaker grid ──────────────────────────────────────── */

function SpeakersFull() {
  const s = useSpeakerStrings()
  return (
    <ul className="speakersGrid speakersGrid--full" aria-label={s.eyebrow}>
      {speakers.map((speaker) => (
        <li key={speaker.name}>
          <SpeakerCard speaker={speaker} />
        </li>
      ))}
    </ul>
  )
}

/* ── registration CTA card ───────────────────────────────────── */

function RegistrationCard() {
  const s = useSpeakerStrings()
  const isExternal = /^https?:\/\//.test(registrationUrl) || registrationUrl.startsWith('//')
  return (
    <div className="registrationCard">
      <div className="registrationCard__icon" aria-hidden="true">
        <FaTicket />
      </div>
      <div className="registrationCard__body">
        <p className="registrationCard__title">{s.ctaTitle}</p>
        <p className="registrationCard__text">{s.ctaBody}</p>
      </div>
      <a
        className="btn btn--primary registrationCard__cta"
        href={registrationUrl}
        {...(isExternal ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      >
        {s.cta}
      </a>
    </div>
  )
}

/* ── page ───────────────────────────────────────────────────── */

export function SpeakersPage() {
  const s = useSpeakerStrings()

  return (
    <>
      {cfpOpen && (

          <Container id="call-for-proposal">
            <CfpCard showFooter={false} />
            <RegistrationCard />
          </Container>
      )}

      {
        speakersVisible && (
          <Section
            id="speakers-list"
            eyebrow={s.eyebrow}
            title={s.title}
            lead={s.lead}
          >
            <SpeakersFull />
          </Section>
        )
      }

    </>
  )
}
