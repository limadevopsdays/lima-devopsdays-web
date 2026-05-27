import { useState } from 'react'
import { Award, Check, Crown, Mail, Download, Medal, Shield, Users, Calendar, Eye, Presentation, Gift, UserPlus, ChevronDown, ChevronUp, ChevronsDown, ChevronsUp, Handshake, Rocket, X } from 'lucide-react'
import { SectionHeader } from '../../components/devopsdays/SectionHeader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { useI18n } from '../../i18n'
import { sponsorsPageI18n } from './i18n'
import styles from './index.module.css'

// Configuración estática (iconos y colores) de las métricas principales
const MAIN_STATS_CONFIG = [
  { icon: Users, color: '#6B51EF' },
  { icon: Calendar, color: '#6B51EF' },
  { icon: Rocket, color: '#6B51EF' },
] as const

// Sponsorship tiers
const TIERS = [
  {
    name: 'PLATINUM',
    color: '#858DA6',
    regularPrice: '$10,000',
    discountedPrice: '$8,000',
    price: '$10,000',
  },
  {
    name: 'GOLD',
    color: '#f2b950',
    regularPrice: '$7,000',
    discountedPrice: '$5,600',
    price: '$7,000',
  },
  {
    name: 'SILVER',
    color: '#BDBFBF',
    regularPrice: '$4,000',
    discountedPrice: '$3,200',
    price: '$4,000',
  },
  {
    name: 'BRONZE',
    color: '#BF834E',
    regularPrice: '$2,000',
    discountedPrice: '$1,600',
    price: '$2,000',
  },
]

const TIER_KEYS = ['platinum', 'gold', 'silver', 'bronze'] as const
type TierKey = (typeof TIER_KEYS)[number]

const TIER_DECORATION: Record<TierKey, { label: string; icon: typeof Crown }> = {
  platinum: { label: 'Platinum', icon: Crown },
  gold: { label: 'Gold', icon: Award },
  silver: { label: 'Silver', icon: Medal },
  bronze: { label: 'Bronze', icon: Shield },
}

// Beneficios detallados — solo estructura, iconos y valores. Texto de categorías viene de i18n.
const DETAILED_BENEFITS = [
  {
    icon: Presentation,
    color: '#6B51EF',
    items: [
      { label: 'Presentation (5min)', platinum: true, gold: false, silver: false, bronze: false },
      { label: 'Presentation video recording', platinum: true, gold: false, silver: false, bronze: false },
      { label: 'Presentation (20min)', platinum: true, gold: true, silver: false, bronze: false },
    ]
  },
  {
    icon: UserPlus,
    color: '#6B51EF',
    items: [
      { label: 'Participant opt-in list', platinum: true, gold: true, silver: false, bronze: false },
      { label: 'Participant information', platinum: true, gold: true, silver: true, bronze: false },
    ]
  },
  {
    icon: Eye,
    color: '#6B51EF',
    items: [
      { label: 'Raffles for audience', platinum: true, gold: true, silver: true, bronze: false },
      { label: 'Logo showcase (during event)', platinum: true, gold: true, silver: true, bronze: false },
      { label: 'Logo showcase (media & merch)', platinum: true, gold: true, silver: true, bronze: true },
    ]
  },
  {
    icon: Gift,
    color: '#6B51EF',
    items: [
      { label: 'Full access pass', platinum: '12', gold: '8', silver: '4', bronze: '2' },
      { label: 'Additional passes (discounted)', platinum: '30%', gold: '20%', silver: '10%', bronze: '5%' },
      { label: 'Stand dimensions', platinum: 'Large (5m x 3m)**', gold: 'Medium (3m x 2m)', silver: 'Small (1m x 1m)', bronze: '—' },
      { label: 'Media coverage', platinum: 'Featured advertising***', gold: 'Featured advertising***', silver: 'Advertising', bronze: 'Mention' },
    ]
  },
]

type TierBenefitItem = (typeof DETAILED_BENEFITS)[number]['items'][number]

const getTierValue = (item: TierBenefitItem, tierKey: TierKey) => item[tierKey]

const hasTierBenefit = (item: TierBenefitItem, tierKey: TierKey) => {
  const value = getTierValue(item, tierKey)
  return typeof value === 'boolean' ? value : value !== '—'
}

const formatTierBenefit = (item: TierBenefitItem, tierKey: TierKey, includedLabel: string) => {
  const value = getTierValue(item, tierKey)
  return typeof value === 'boolean' ? includedLabel : value
}

const renderBooleanBenefitBadge = (
  tierColor: string,
  included: boolean,
  includedLabel: string,
  notIncludedLabel: string
) => {
  if (included) {
    return (
      <div
        className={styles.mobileBenefitBadge}
        style={{ '--tier-color': tierColor } as React.CSSProperties}
        title={includedLabel}
        aria-label={includedLabel}
      >
        <Check size={14} strokeWidth={3.5} />
      </div>
    )
  }

  return (
    <div className={styles.mobileBenefitBadgeMuted} title={notIncludedLabel} aria-label={notIncludedLabel}>
      <X size={14} strokeWidth={1} />
    </div>
  )
}

export default function SponsorsPage() {
  const t = useI18n(sponsorsPageI18n)

  // Estado con índices numéricos — "Pases y stands" es índice 3
  const [openCategories, setOpenCategories] = useState<Set<number>>(new Set([3]))

  const DISCOUNT_DEADLINE = new Date('2026-03-30T23:59:59')
  const isDiscountActive = new Date() < DISCOUNT_DEADLINE

  const toggleCategory = (index: number) => {
    setOpenCategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const handleCategoryKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleCategory(index)
    }
  }

  const expandAll = () => {
    setOpenCategories(new Set(DETAILED_BENEFITS.map((_, idx) => idx)))
  }

  const collapseAll = () => {
    setOpenCategories(new Set())
  }

  const totalBenefits = DETAILED_BENEFITS.reduce((sum, cat) => sum + cat.items.length, 0)
  const tierBenefitCounts = TIER_KEYS.map((tierKey) =>
    DETAILED_BENEFITS.reduce(
      (sum, cat) => sum + cat.items.filter((item) => hasTierBenefit(item, tierKey)).length,
      0
    )
  )
  const tierMeta = TIERS.map((tier, idx) => ({
    ...tier,
    key: TIER_KEYS[idx],
    displayName: TIER_DECORATION[TIER_KEYS[idx]].label,
    Icon: TIER_DECORATION[TIER_KEYS[idx]].icon,
    includedBenefits: tierBenefitCounts[idx],
    progressPercent: (tierBenefitCounts[idx] / totalBenefits) * 100,
  }))

  return (
    <div className={styles.page}>
      {/* INTRO SECTION */}
      <section className={styles.introSection}>
        <div className={styles.introContainer}>
          <div className={styles.introBadge}>
            <Handshake size={20} />
            <span>{t.introBadgeText}</span>
          </div>

          <h1 className={styles.introTitle}>{t.introTitle}</h1>

          <p className={styles.introLead}>{t.introLead}</p>

          <div className={styles.statsGrid}>
            {MAIN_STATS_CONFIG.map((config, idx) => {
              const IconComponent = config.icon
              const stat = t.mainStats[idx]
              return (
                <div
                  key={idx}
                  className={styles.statCard}
                  style={{ '--stat-color': config.color } as React.CSSProperties}
                >
                  <div className={styles.statValue} style={{ color: config.color }}>
                    <IconComponent size={32} />
                  </div>
                  <div className={styles.statLabel}>
                    {stat.title}
                    {stat.subtitle && (
                      <span className={styles.statSublabel}>{stat.subtitle}</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CONTACT BANNER */}
      <section className={styles.contactBanner}>
        <div className={styles.contactBannerBg} />
        <div className={styles.contactBannerOverlay} />

        <div className={styles.contactBannerContainer}>
          <div className={styles.contactBannerGrid}>
            <div className={styles.contactBannerContent}>
              <div>
                <div className={styles.contactBadgeContainer}>
                  <div className={styles.contactBadgeDot} />
                  <span className={styles.contactBadgeText}>{t.contactBadgeText}</span>
                </div>

                <h2 className={styles.contactBannerTitle}>{t.contactBannerTitle}</h2>

                <p className={styles.contactBannerDescription}>
                  {t.contactBannerDescriptionPre}<strong>sponsors@devopsdays.pe</strong>{t.contactBannerDescriptionPost}
                </p>
              </div>
            </div>

            <div className={styles.contactButtonsContainer}>
              <div className={styles.contactButtonsInner}>
                <a
                  href="mailto:sponsors@devopsdays.pe"
                  className={styles.contactPrimaryButton}
                  data-track-name="contactar_equipo_contact_sponsors"
                >
                  <Mail size={20} />
                  {t.contactPrimaryButton}
                </a>
                <div className={styles.brochureRow}>
                  <a
                    href={`${import.meta.env.BASE_URL}docs/sponsors-es-devopsdayslima-2026.pdf`}
                    className={styles.contactSecondaryButton}
                    download
                    data-track-name="descargar_brochure_es_contact_sponsors"
                  >
                    <Download size={18} />
                    Brochure (ES)
                  </a>
                  <a
                    href={`${import.meta.env.BASE_URL}docs/sponsors-en-devopsdayslima-2026.pdf`}
                    className={styles.contactSecondaryButton}
                    download
                    data-track-name="descargar_brochure_en_contact_sponsors"
                  >
                    <Download size={18} />
                    Brochure (EN)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS TABLE SECTION */}
      <section className={styles.benefitsSection} id="sponsors">
        <div className={styles.benefitsContainer}>
          <SectionHeader
            title={t.tableTitle}
            lead={t.tableLead}
          />

          <div className={styles.mobileBenefitsExplorer}>
            <Tabs defaultValue={tierMeta[0].key} className={styles.mobileTabs}>
              <TabsList className={styles.mobileTabsList}>
                {tierMeta.map((tier) => (
                  <TabsTrigger
                    key={tier.key}
                    value={tier.key}
                    className={styles.mobileTabsTrigger}
                    style={{ '--tier-color': tier.color } as React.CSSProperties}
                  >
                    <tier.Icon className={styles.mobileTabsTriggerIcon} size={15} />
                    {tier.displayName}
                  </TabsTrigger>
                ))}
              </TabsList>

              {tierMeta.map((tier) => (
                <TabsContent
                  key={tier.key}
                  value={tier.key}
                  className={styles.mobileTabsContent}
                  style={{ '--tier-color': tier.color } as React.CSSProperties}
                >
                  <div
                    className={styles.mobileTierHeader}
                    style={{ '--tier-color': tier.color } as React.CSSProperties}
                  >
                    <div className={styles.mobileTierHeaderTop}>
                      <div className={styles.mobileTierCoverage}>
                        {t.tierCoverageLabel} ({tier.includedBenefits}/{totalBenefits})
                      </div>
                    </div>

                    <div className={styles.mobileTierProgress}>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          data-type={tier.key}
                          style={{ width: `${tier.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={styles.mobileTierControls}>
                    <button className={styles.textLink} onClick={expandAll} data-track-name={`expandir_tab_${tier.key}_benefits_sponsors`}>
                      <ChevronsDown size={16} />
                      {t.expandAll}
                    </button>
                    <button className={styles.textLink} onClick={collapseAll} data-track-name={`colapsar_tab_${tier.key}_benefits_sponsors`}>
                      <ChevronsUp size={16} />
                      {t.collapseAll}
                    </button>
                  </div>

                  <div className={styles.mobileBenefitsTable}>
                    <div className={styles.mobilePricingRow}>
                      <div>
                        <div className={styles.mobilePricingLabel}>{t.pricingRegularLabel}</div>
                        <div className={styles.mobilePricingDetail}>{t.pricingRegularDetail}</div>
                      </div>
                      <div className={styles.mobilePricingValue}>{tier.price}</div>
                    </div>

                    <div className={`${styles.mobilePricingRow} ${isDiscountActive ? styles.mobilePricingRowHighlighted : ''}`}>
                      <div>
                        <div className={styles.mobilePricingLabel}>
                          {isDiscountActive && (
                            <span className={styles.mobileEarlyBirdBadge}>{t.pricingEarlyBirdBadge}</span>
                          )}
                          {t.pricingDiscountedLabel}
                        </div>
                        <div className={styles.mobilePricingDetail}>
                          {t.pricingDiscountedDetail}
                        </div>
                      </div>
                      <div className={styles.mobilePricingValueStrong}>{tier.discountedPrice}</div>
                    </div>

                    {DETAILED_BENEFITS.map((category, catIdx) => {
                      const isExpanded = openCategories.has(catIdx)
                      const categoryName = t.benefitCategories[catIdx]

                      return (
                        <div
                          key={`${tier.key}-${catIdx}`}
                          className={styles.mobileCategoryCard}
                          style={{ '--category-color': category.color } as React.CSSProperties}
                        >
                          <button
                            type="button"
                            className={styles.mobileCategoryTitle}
                            onClick={() => toggleCategory(catIdx)}
                            aria-label={isExpanded ? t.categoryCollapseLabel : t.categoryExpandLabel}
                            aria-expanded={isExpanded}
                          >
                            <div className={styles.mobileCategoryTitleMain}>
                              <category.icon size={18} className={styles.mobileCategoryIcon} />
                              <span>{categoryName}</span>
                              <span className={styles.mobileCategoryCount}>({category.items.length})</span>
                            </div>
                            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </button>

                          {isExpanded && (
                            <div className={styles.mobileBenefitList}>
                              {category.items.map((item) => {
                                const tierValue = getTierValue(item, tier.key)
                                const isBooleanBenefit = typeof tierValue === 'boolean'

                                return (
                                  <div key={`${tier.key}-${catIdx}-${item.label}`} className={styles.mobileBenefitItem}>
                                    <div className={styles.mobileBenefitLabel}>{item.label}</div>
                                    {isBooleanBenefit ? (
                                      renderBooleanBenefitBadge(tier.color, tierValue, t.includedLabel, t.notIncludedLabel)
                                    ) : (
                                      <div className={styles.mobileBenefitValue}>
                                        {formatTierBenefit(item, tier.key, t.includedLabel)}
                                      </div>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className={styles.desktopBenefitsExplorer}>
            <div className={styles.tableControls}>
              <button className={styles.textLink} onClick={expandAll} data-track-name="expandir_tabla_benefits_sponsors">
                <ChevronsDown size={16} />
                {t.expandAll}
              </button>
              <button className={styles.textLink} onClick={collapseAll} data-track-name="colapsar_tabla_benefits_sponsors">
                <ChevronsUp size={16} />
                {t.collapseAll}
              </button>
            </div>

            <div className={styles.pricingTable}>
              <div className={styles.pricingHeader}>
                <div className={styles.pricingHeaderLabel}>{t.pricingHeaderLabel}</div>
                {tierMeta.map((tier) => (
                  <div
                    key={tier.name}
                    className={styles.pricingHeaderTier}
                    style={{ '--tier-color': tier.color } as React.CSSProperties}
                  >
                    <div className={styles.tierName}>{tier.displayName}</div>
                    <div className={styles.progressInfo}>
                      <span className={styles.progressCount}>{tier.includedBenefits}/{totalBenefits}</span>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          data-type={tier.key}
                          style={{ width: `${tier.progressPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.pricingRow}>
                <div className={styles.pricingRowLabel}>
                  <div className={styles.benefitLabel}>{t.pricingRegularLabel}</div>
                  <div className={styles.priceDetails}>{t.pricingRegularDetail}</div>
                </div>
                {tierMeta.map((tier) => (
                  <div key={tier.name} className={styles.pricingCell}>
                    <div className={styles.priceRegular}>{tier.price}</div>
                  </div>
                ))}
              </div>

              <div className={`${styles.pricingRow} ${isDiscountActive ? styles.pricingRowHighlighted : ''}`}>
                <div className={styles.pricingRowLabel}>
                  <div className={styles.benefitLabel}>
                    {isDiscountActive && (
                      <span className={styles.earlyBirdBadge}>{t.pricingEarlyBirdBadge}</span>
                    )}
                    {t.pricingDiscountedLabel}
                  </div>
                  <div className={styles.priceDetails}>
                    {t.pricingDiscountedDetail}
                  </div>
                </div>
                {tierMeta.map((tier) => (
                  <div key={tier.name} className={styles.pricingCell}>
                    <div className={styles.priceDiscounted}>{tier.discountedPrice}</div>
                  </div>
                ))}
              </div>

              {DETAILED_BENEFITS.map((category, catIdx) => {
                const categoryKey = `category-${catIdx}`
                const isExpanded = openCategories.has(catIdx)
                const categoryName = t.benefitCategories[catIdx]
                return (
                  <div key={categoryKey} className={styles.categoryBlock}>
                    <div
                      className={styles.categoryTitle}
                      style={{ '--category-color': category.color } as React.CSSProperties}
                      onClick={() => toggleCategory(catIdx)}
                      onKeyDown={(e) => handleCategoryKeyDown(catIdx, e)}
                      role="button"
                      tabIndex={0}
                      data-track-name="toggle_categoria_benefits_sponsors"
                    >
                      <div className={styles.categoryTitleContent}>
                        <category.icon size={20} className={styles.categoryIconInline} />
                        <span>{categoryName}</span>
                        <span className={styles.benefitCount}>({category.items.length})</span>
                      </div>
                      <button
                        className={styles.toggleButton}
                        aria-label={isExpanded ? t.collapseLabel : t.expandLabel}
                        aria-expanded={isExpanded}
                        data-track-name="toggle_categoria_icon_benefits_sponsors"
                      >
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>

                    {isExpanded && category.items.map((item, itemIdx) => (
                      <div key={itemIdx} className={styles.pricingRow}>
                        <div className={styles.pricingRowLabel}>
                          <div className={styles.benefitLabel}>{item.label}</div>
                        </div>
                        <div className={styles.pricingCell}>
                          {typeof item.platinum === 'boolean' ? (
                            renderBooleanBenefitBadge(TIERS[0].color, item.platinum, t.includedLabel, t.notIncludedLabel)
                          ) : (
                            <span className={styles.valueText}>{item.platinum}</span>
                          )}
                        </div>
                        <div className={styles.pricingCell}>
                          {typeof item.gold === 'boolean' ? (
                            renderBooleanBenefitBadge(TIERS[1].color, item.gold, t.includedLabel, t.notIncludedLabel)
                          ) : (
                            <span className={styles.valueText}>{item.gold}</span>
                          )}
                        </div>
                        <div className={styles.pricingCell}>
                          {typeof item.silver === 'boolean' ? (
                            renderBooleanBenefitBadge(TIERS[2].color, item.silver, t.includedLabel, t.notIncludedLabel)
                          ) : (
                            <span className={styles.valueText}>{item.silver}</span>
                          )}
                        </div>
                        <div className={styles.pricingCell}>
                          {typeof item.bronze === 'boolean' ? (
                            renderBooleanBenefitBadge(TIERS[3].color, item.bronze, t.includedLabel, t.notIncludedLabel)
                          ) : (
                            <span className={styles.valueText}>{item.bronze}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>

          <div className={styles.footnotes}>
            <p className={styles.footnote}>{t.footnote1}</p>
            <p className={styles.footnote}>{t.footnote2}</p>
            <p className={styles.footnote}>{t.footnote3}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
