import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  FiMapPin,
  FiCopy,
  FiCheck,
  FiX,
  FiExternalLink,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi'
import { MdTrain, MdDirectionsBus } from 'react-icons/md'
import { Section } from '../components/Section'
import { useVenueStrings, venueMapsUrl } from '../content/venue'

export function VenueSection() {
  const s = useVenueStrings()
  const [copied, setCopied] = useState(false)
  const [idx, setIdx] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const total = s.photos.length
  const prev = () => setIdx((i) => (i - 1 + total) % total)
  const next = () => setIdx((i) => (i + 1) % total)

  const handleCopy = () => {
    navigator.clipboard.writeText(venueMapsUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false)
      if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + total) % total)
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % total)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, total])

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  const photo = s.photos[idx]

  return (
    <Section
      id="venue"
      eyebrow={s.eyebrow}
      title={s.title}
      lead={s.lead}
    >
      <div className="venueGrid">

        {/* Col 1: Info stack + Carousel */}
        <div className="venueInfo">
          <div className="venueAddressCard">
            <div className="venueAddressCard__body">
              <FiMapPin className="venueAddressCard__pin" size={18} aria-hidden />
              <address className="venueAddressCard__text">
                <span className="venueAddressCard__line venueAddressCard__line--primary">
                  {s.address1}
                </span>
                <span className="venueAddressCard__line">{s.address2}</span>
              </address>
            </div>
            <div className="venueAddressCard__actions">
              <button
                className={`venueAddressCard__copyBtn${copied ? ' venueAddressCard__copyBtn--copied' : ''}`}
                onClick={handleCopy}
                type="button"
              >
                {copied ? <FiCheck size={13} aria-hidden /> : <FiCopy size={13} aria-hidden />}
                {copied ? s.cta.copied : s.cta.copy}
              </button>
              <a
                className="venueAddressCard__mapsLink"
                href={venueMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.cta.maps}
                <FiExternalLink size={11} aria-hidden />
              </a>
            </div>
          </div>

          <div className="venueTransit">
            <span className="venueTransit__label">{s.transit.label}</span>
            <div className="venueTransit__routes">
              {s.transit.routes.map((route) => (
                <a
                  key={route.url}
                  className="venueTransit__route"
                  href={route.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {route.type === 'metro'
                    ? <MdTrain className="venueTransit__icon" size={16} aria-hidden />
                    : <MdDirectionsBus className="venueTransit__icon" size={16} aria-hidden />
                  }
                  <div className="venueTransit__routeInfo">
                    <span className="venueTransit__routeName">{route.name}</span>
                    <span className="venueTransit__routeStop">{route.stop}</span>
                  </div>
                  <FiExternalLink className="venueTransit__arrow" size={12} aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <div className="venueFeatures">
            {s.features.map((feature) => (
              <div key={feature.label} className="venueFeature">
                {feature.type === 'stat' ? (
                  <>
                    <span className="venueFeature__value">{feature.value}</span>
                    <span className="venueFeature__label">{feature.label}</span>
                  </>
                ) : (
                  <>
                    <span className={`venueFeature__flag venueFeature__flag--${feature.available ? 'yes' : 'no'}`}>
                      {feature.available
                        ? <FiCheck size={15} aria-hidden />
                        : <FiX size={15} aria-hidden />
                      }
                      {feature.flagText}
                    </span>
                    <span className="venueFeature__label">{feature.label}</span>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Carousel */}
          <div className="venueCarousel" aria-label={s.gallery.label}>
            <img
              src={photo.src}
              alt={photo.alt}
              className="venueCarousel__img"
              onClick={() => setLightbox(true)}
              title={s.gallery.open}
              loading="lazy"
              decoding="async"
            />
            <button
              className="venueCarousel__btn venueCarousel__btn--prev"
              onClick={prev}
              aria-label={s.gallery.prev}
              type="button"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              className="venueCarousel__btn venueCarousel__btn--next"
              onClick={next}
              aria-label={s.gallery.next}
              type="button"
            >
              <FiChevronRight size={20} />
            </button>
            <div className="venueCarousel__counter" aria-live="polite">
              {idx + 1} / {total}
            </div>
          </div>
        </div>

        {/* Col 2: Map */}
        <div className="venueMap" aria-label={s.mapLabel}>
          <iframe
            title={s.mapLabel}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`${venueMapsUrl}&output=embed`}
            allowFullScreen
          />
        </div>

      </div>

      {/* Lightbox */}
      {lightbox && createPortal(
        <div
          className="venueLightbox"
          onClick={() => setLightbox(false)}
          role="dialog"
          aria-modal="true"
          aria-label={s.gallery.label}
        >
          <button
            className="venueLightbox__close"
            onClick={() => setLightbox(false)}
            aria-label={s.gallery.close}
            type="button"
          >
            <FiX size={22} />
          </button>

          <button
            className="venueLightbox__btn venueLightbox__btn--prev"
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label={s.gallery.prev}
            type="button"
          >
            <FiChevronLeft size={26} />
          </button>

          <img
            src={photo.src}
            alt={photo.alt}
            className="venueLightbox__img"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="venueLightbox__btn venueLightbox__btn--next"
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label={s.gallery.next}
            type="button"
          >
            <FiChevronRight size={26} />
          </button>

          <div className="venueLightbox__counter">
            {idx + 1} / {total}
          </div>
        </div>,
        document.body
      )}
    </Section>
  )
}
