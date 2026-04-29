import { Download, CheckCircle, Handshake, Crown, Award, Medal, Shield } from 'lucide-react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router'
import { SectionHeader } from './SectionHeader'
import { sponsors, sponsorTiers } from '../../data/mockContent'
import styles from './SponsorsSection.module.css'

const SOCIAL_PROOF_IMAGE = '/images/sponsors/sponsors%201.jpg'

const PAST_SPONSORS = ['Dynatrace', 'AWS', 'Google Cloud', 'Microsoft', 'Red Hat', 'HashiCorp']
const TIERS = ['Platinum', 'Gold', 'Silver', 'Bronze']
const TIER_COLORS = ['#858DA6', '#f2b950', '#BDBFBF', '#BF834E']
const TIER_DECORATION = {
  platinum: { Icon: Crown, color: '#858DA6' },
  gold: { Icon: Award, color: '#f2b950' },
  silver: { Icon: Medal, color: '#BDBFBF' },
  bronze: { Icon: Shield, color: '#BF834E' },
  community: { Icon: Handshake, color: '#6B51EF' },
} as const

export function SponsorsSection() {
  const platinumGroup = sponsors.find((g) => g.tier === 'platinum')
  const platinumItems = platinumGroup?.items || []
  const platinumDecoration = TIER_DECORATION.platinum
  const activeSecondaryTiers = sponsorTiers
    .filter((tier) => tier.id !== 'platinum')
    .map((tier) => ({
      ...tier,
      items: sponsors.find((group) => group.tier === tier.id)?.items || [],
    }))
    .filter((tier) => tier.items.length > 0)

  return (
    <section id="sponsors" className={styles.section}>
      <div className={styles.container}>
        <SectionHeader
          eyebrow="Sponsors"
          eyebrowColor="#6B51EF"
          title="Nuestros Sponsors 2026"
          lead="Nuestros sponsors hacen posible una experiencia de alto nivel para la comunidad DevOps de LATAM, conectando marcas, líderes técnicos y equipos que están moviendo la industria."
        />

        {/* HERO CARD PLATINUM */}
        {platinumItems.length > 0 ? (
            <div className={styles.platinumCard}>
              <div className={styles.platinumContent}>
              <div
                className={styles.platinumBadge}
                style={{
                  '--tier-color': platinumDecoration.color,
                  '--tier-bg': `${platinumDecoration.color}18`,
                  '--tier-border': `${platinumDecoration.color}30`,
                } as CSSProperties}
              >
                <platinumDecoration.Icon
                  className={styles.platinumBadgeIcon}
                  style={{ color: platinumDecoration.color }}
                />
                <span className={styles.platinumBadgeText}>
                  {platinumItems.length > 1 ? 'Platinum Sponsors' : 'Platinum Sponsor'}
                </span>
              </div>

              {/* Grid de logos */}
              <div className={styles.logosGrid} data-count={platinumItems.length}>
                {platinumItems.map((sponsor, idx) => (
                  <div
                    key={idx}
                    className={styles.logoContainer}
                    style={{ '--sponsor-hover-color': platinumDecoration.color } as CSSProperties}
                  >
                    {sponsor.logo ? (
                      sponsor.href ? (
                        <a
                          href={sponsor.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.logoLink}
                          data-track-name="ver_sponsor_logo_home"
                        >
                          <img
                            src={sponsor.logo}
                            alt={`Logo ${sponsor.name}`}
                            className={styles.logo}
                          />
                        </a>
                      ) : (
                        <div className={styles.logoLink}>
                          <img
                            src={sponsor.logo}
                            alt={`Logo ${sponsor.name}`}
                            className={styles.logo}
                          />
                        </div>
                      )
                    ) : (
                      <span className={styles.logoText}>{sponsor.name}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Descripción compartida */}
              <div className={styles.descriptionContainer}>
                <p className={styles.descriptionTitle}>
                  Impulsando DevOpsDays Lima 2026
                </p>

                <p className={styles.descriptionText}>
                  {platinumItems.length > 1 
                    ? 'Nuestros Platinum Sponsors impulsan la experiencia, la comunidad y la calidad de DevOpsDays Lima 2026.' 
                    : 'Nuestro Platinum Sponsor impulsa la experiencia, la comunidad y la calidad de DevOpsDays Lima 2026.'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className={styles.emptyState}>
            <div className={styles.emptyStateContent}>
              <div className={styles.emptyStateIcon}>
                <span>🚀</span>
              </div>
              <h3 className={styles.emptyStateTitle}>
                Pronto anunciaremos a nuestro Platinum Sponsor
              </h3>
              <p className={styles.emptyStateText}>
                Estamos en conversaciones con líderes tecnológicos de la región. Mantente atento a nuestros canales para conocer quién impulsará DevOpsDays Lima 2026.
              </p>
            </div>
          </div>
        )}

        {activeSecondaryTiers.length > 0 && (
          <div className={styles.secondaryTiers}>
            {activeSecondaryTiers.map((tier) => {
              const decoration = TIER_DECORATION[tier.id as keyof typeof TIER_DECORATION] ?? TIER_DECORATION.community

              return (
              <div
                key={tier.id}
                className={`${styles.platinumCard} ${styles.secondaryTierCard} ${tier.items.length === 2 ? styles.secondaryTierCardTwoUp : ''}`}
                data-tier={tier.id}
              >
                <div className={styles.platinumContent}>
                  <div
                    className={styles.platinumBadge}
                    style={{
                      '--tier-color': decoration.color,
                      '--tier-bg': `${decoration.color}18`,
                      '--tier-border': `${decoration.color}30`,
                    } as CSSProperties}
                  >
                    <decoration.Icon
                      className={styles.platinumBadgeIcon}
                      style={{ color: decoration.color }}
                    />
                    <span className={styles.platinumBadgeText}>
                      {tier.items.length > 1 ? `${tier.label} Sponsors` : `${tier.label} Sponsor`}
                    </span>
                  </div>

                  <div className={styles.logosGrid} data-count={tier.items.length}>
                    {tier.items.map((sponsor) => (
                      <div
                        key={sponsor.name}
                        className={sponsor.name === 'Orexe' ? `${styles.logoContainer} ${styles.logoContainerSubtle}` : styles.logoContainer}
                        style={{ '--sponsor-hover-color': decoration.color } as CSSProperties}
                      >
                        {sponsor.href ? (
                          <a
                            href={sponsor.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.logoLink}
                            data-track-name="ver_sponsor_logo_home"
                          >
                            {sponsor.logo ? (
                              <img
                                src={sponsor.logo}
                                alt={`Logo ${sponsor.name}`}
                                className={styles.logo}
                              />
                            ) : (
                              <span className={styles.logoText}>{sponsor.name}</span>
                            )}
                          </a>
                        ) : (
                          <div className={styles.logoLink}>
                            {sponsor.logo ? (
                              <img
                                src={sponsor.logo}
                                alt={`Logo ${sponsor.name}`}
                                className={styles.logo}
                              />
                            ) : (
                              <span className={styles.logoText}>{sponsor.name}</span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )})}
          </div>
        )}
      </div>

      {/* SOCIAL PROOF */}
      <div className={styles.socialProofSection}>
        <div className={styles.container}>
          <div className={styles.socialProofCard}>
            <div className={styles.socialProofGrid}>
              <div className={styles.socialProofImage}>
                <img
                  src={SOCIAL_PROOF_IMAGE}
                  alt="Sponsors y asistentes en DevOpsDays Lima"
                  className={styles.socialProofImageMedia}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className={styles.socialProofContent}>
                <div className={styles.socialProofBadge}>
                  <CheckCircle className={styles.checkIcon} />
                  <span className={styles.socialProofBadgeText}>Edición 2025</span>
                </div>

                <h2 className={styles.socialProofTitle}>
                  Únete a estas empresas líderes
                </h2>

                <p className={styles.socialProofDescription}>
                  En DevOpsDays Lima 2025 trabajamos con marcas que entienden el valor de invertir en comunidad, talento y posicionamiento técnico.
                  Tu empresa puede sumarse a esa conversación en 2026.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BANNER CTA */}
      <div className={styles.ctaBanner}>
        <div className={styles.ctaBannerBg} />
        <div className={styles.ctaBannerOverlay} />

        <div className={styles.ctaBannerContainer}>
          <div className={styles.ctaBannerGrid}>
            <div className={styles.ctaBannerContent}>
              <div>
                <div className={styles.ctaBadgeContainer}>
                  <div className={styles.ctaBadgeDot} />
                  <span className={styles.ctaBadgeText}>CALL FOR SPONSORS DISPONIBLE</span>
                </div>

                <h2 className={styles.ctaBannerTitle}>
                  ¿Listo para ser parte de DevOpsDays Lima 2026?
                </h2>

                <p className={styles.ctaBannerDescription}>
                  Escríbenos a <strong>sponsors@devopsdays.pe</strong> para revisar opciones de sponsorship,
                  activaciones de marca y paquetes alineados a tus objetivos comerciales y de comunidad.
                </p>

                <p className={styles.tiersLabel}>Niveles Disponibles</p>

                <div className={styles.tiersList}>
                  {TIERS.map((tier, idx) => (
                    <span
                      key={idx}
                      className={styles.tierBadge}
                      style={{ '--tier-color': TIER_COLORS[idx] } as React.CSSProperties}
                    >
                      {tier}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.ctaButtonsContainer}>
              <div className={styles.ctaButtonsInner}>
                <Link
                  to="/sponsors"
                  className={styles.primaryButton}
                  data-track-name="call_for_sponsors_banner_home"
                >
                  <Handshake className={styles.mailIcon} />
                  Call for Sponsors
                </Link>

                <div className={styles.brochureButtons}>
                  <a
                    href={`${import.meta.env.BASE_URL}docs/sponsors-es-devopsdayslima-2026.pdf`}
                    download
                    className={styles.brochureButton}
                    data-track-name="descargar_brochure_es_home"
                  >
                    <Download className={styles.downloadIcon} />
                    Brochure (ES)
                  </a>

                  <a
                    href={`${import.meta.env.BASE_URL}docs/sponsors-en-devopsdayslima-2026.pdf`}
                    download
                    className={styles.brochureButton}
                    data-track-name="descargar_brochure_en_home"
                  >
                    <Download className={styles.downloadIcon} />
                    Brochure (EN)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
