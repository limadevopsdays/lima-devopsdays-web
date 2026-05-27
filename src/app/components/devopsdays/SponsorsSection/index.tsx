import { Download, CheckCircle, Handshake, Crown, Award, Medal, Shield, Users } from 'lucide-react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router'
import { SectionHeader } from '../SectionHeader'
import { sponsors, sponsorTiers } from '../../../data/mockContent'
import styles from './index.module.css'
import { useI18n } from '../../../i18n'
import { sponsorsI18n } from './i18n'

const SOCIAL_PROOF_IMAGE = '/images/sponsors/sponsors%201.jpg'

const PAST_SPONSORS = ['Dynatrace', 'AWS', 'Google Cloud', 'Microsoft', 'Red Hat', 'HashiCorp']
const TIERS = ['Platinum', 'Gold', 'Silver', 'Bronze']
const TIER_COLORS = ['#858DA6', '#f2b950', '#BDBFBF', '#BF834E']
const TIER_DECORATION = {
  platinum: { Icon: Crown, color: '#8FA4C4' },
  gold: { Icon: Award, color: '#F2B950' },
  silver: { Icon: Medal, color: '#BDBFBF' },
  bronze: { Icon: Shield, color: '#A97155' },
  community: { Icon: Users, color: '#84CC16' },
} as const
const DISPLAYED_TIER_IDS = ['platinum', 'gold', 'bronze', 'community'] as const
const TIER_CLASS_NAMES = {
  platinum: {
    content: 'platinumContent',
    badgeText: 'platinumBadgeText',
    logosGrid: 'platinumLogosGrid',
    logoContainer: 'platinumLogoContainer',
  },
  gold: {
    content: 'goldContent',
    badgeText: 'goldBadgeText',
    logosGrid: 'goldLogosGrid',
    logoContainer: 'goldLogoContainer',
  },
  bronze: {
    content: 'bronzeContent',
    badgeText: 'bronzeBadgeText',
    logosGrid: 'bronzeLogosGrid',
    logoContainer: 'bronzeLogoContainer',
  },
  community: {
    content: 'communityContent',
    badgeText: 'communityBadgeText',
    logosGrid: 'communityLogosGrid',
    logoContainer: 'communityLogoContainer',
  },
} as const

export function SponsorsSection() {
  const t = useI18n(sponsorsI18n)
  const displayedTiers = sponsorTiers
    .filter((tier): tier is (typeof sponsorTiers)[number] & { id: (typeof DISPLAYED_TIER_IDS)[number] } =>
      DISPLAYED_TIER_IDS.includes(tier.id as (typeof DISPLAYED_TIER_IDS)[number]),
    )
    .map((tier) => ({
      ...tier,
      items: sponsors.find((group) => group.tier === tier.id)?.items || [],
    }))

  return (
    <section id="sponsors" className={styles.section}>
      <div className={styles.container}>
        <SectionHeader
          eyebrow={t.eyebrow}
          eyebrowColor="#6B51EF"
          title={t.title}
          lead={t.lead}
        />

        {displayedTiers.map((tier) => {
          const decoration = TIER_DECORATION[tier.id] ?? TIER_DECORATION.community
          const isPlatinum = tier.id === 'platinum'
          const tierClasses = TIER_CLASS_NAMES[tier.id]

          return (
            <div
              key={tier.id}
              className={isPlatinum ? styles.platinumCard : `${styles.platinumCard} ${styles.secondaryTierCard}`}
              data-tier={tier.id}
            >
              {tier.items.length > 0 ? (
                <div className={styles[tierClasses.content]}>
                  <span
                    className={styles[tierClasses.badgeText]}
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
                    {tier.items.length > 1 ? `${tier.label} Sponsors` : `${tier.label} Sponsor`}
                  </span>

                  <div className={styles[tierClasses.logosGrid]} data-count={tier.items.length}>
                    {tier.items.map((sponsor) => (
                      <div
                        key={sponsor.name}
                        data-sponsor={sponsor.name.toLowerCase()}
                        className={
                          sponsor.name === 'Orexe'
                            ? `${styles[tierClasses.logoContainer]} ${styles.logoContainerSubtle}`
                            : styles[tierClasses.logoContainer]
                        }
                        style={{
                          '--sponsor-border-color': decoration.color,
                          '--sponsor-hover-color': decoration.color,
                        } as CSSProperties}
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
                                alt={t.ariaLogoSponsor(sponsor.name)}
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
                                alt={t.ariaLogoSponsor(sponsor.name)}
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
              ) : (
                <div className={styles.emptyState}>
                  <div className={styles.emptyStateContent}>
                    <div className={styles.emptyStateIcon}>
                      <span>🚀</span>
                    </div>
                    <h3 className={styles.emptyStateTitle}>
                      {tier.id === 'platinum'
                        ? t.emptyPlatinum
                        : t.emptyTier(tier.label)}
                    </h3>
                    <p className={styles.emptyStateText}>{t.emptyDescription}</p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* SOCIAL PROOF */}
      <div className={styles.socialProofSection}>
        <div className={styles.container}>
          <div className={styles.socialProofCard}>
            <div className={styles.socialProofGrid}>
              <div className={styles.socialProofImage}>
                <img
                  src={SOCIAL_PROOF_IMAGE}
                  alt={t.altSocialProof}
                  className={styles.socialProofImageMedia}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className={styles.socialProofContent}>
                <div className={styles.socialProofBadge}>
                  <CheckCircle className={styles.checkIcon} />
                  <span className={styles.socialProofBadgeText}>{t.socialProofBadge}</span>
                </div>

                <h2 className={styles.socialProofTitle}>{t.socialProofTitle}</h2>

                <p className={styles.socialProofDescription}>{t.socialProofDescription}</p>
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
                  <span className={styles.ctaBadgeText}>{t.ctaBadge}</span>
                </div>

                <h2 className={styles.ctaBannerTitle}>{t.ctaTitle}</h2>

                <p className={styles.ctaBannerDescription}>{t.ctaDescription}</p>

                <p className={styles.tiersLabel}>{t.ctaTiersLabel}</p>

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
                  {t.ctaButton}
                </Link>

                <div className={styles.brochureButtons}>
                  <a
                    href={`${import.meta.env.BASE_URL}docs/sponsors-es-devopsdayslima-2026.pdf`}
                    download
                    className={styles.brochureButton}
                    data-track-name="descargar_brochure_es_home"
                  >
                    <Download className={styles.downloadIcon} />
                    {t.brochureEs}
                  </a>

                  <a
                    href={`${import.meta.env.BASE_URL}docs/sponsors-en-devopsdayslima-2026.pdf`}
                    download
                    className={styles.brochureButton}
                    data-track-name="descargar_brochure_en_home"
                  >
                    <Download className={styles.downloadIcon} />
                    {t.brochureEn}
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
