import styles from './index.module.css'

const PLATINUM_HDR_LOGOS = [
  { name: 'AWS', src: '/images/hdr/aws.png' },
  { name: 'Google', src: '/images/hdr/google.png' },
  { name: 'GitHub', src: '/images/hdr/github.png' },
  { name: 'Dynatrace', src: '/images/hdr/dynatrace.png' },
  { name: 'CleverIT', src: '/images/hdr/cleverit.png' },
  { name: 'NTT DATA', src: '/images/hdr/nttdata.png' },
  { name: 'Port', src: '/images/hdr/port.png' },
  { name: 'IBM', src: '/images/hdr/ibm.png' },
  { name: 'Credicorp', src: '/images/hdr/credicorp.png' },
  { name: 'Indra', src: '/images/hdr/indragroup.png' },
]

export function SponsorsBannerMockup() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.title}>Speakers and sponsors from</p>
        <div className={styles.marqueeRoot} aria-label="Sponsors Marquee">
          {/* Left & Right Edge Fade Gradients */}
          <div className={styles.edgeStart} />
          <div className={styles.edgeEnd} />

          <div className={styles.marqueeViewport}>
            {/* Track 1 */}
            <div className={styles.marqueeTrack}>
              {PLATINUM_HDR_LOGOS.map((logo, idx) => (
                <div key={`logo-1-${idx}`} className={styles.marqueeItem}>
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className={styles.logoImg}
                    height={32}
                    loading="eager"
                    decoding="async"
                  />
                </div>
              ))}
            </div>

            {/* Track 2 (Clone for seamless infinite loop) */}
            <div className={styles.marqueeTrack} aria-hidden="true">
              {PLATINUM_HDR_LOGOS.map((logo, idx) => (
                <div key={`logo-2-${idx}`} className={styles.marqueeItem}>
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className={styles.logoImg}
                    height={32}
                    loading="eager"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
