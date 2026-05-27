import { useState } from 'react'
import { Ticket, Sparkles, Check, ChevronDown, ChevronUp, ChevronsDown, ChevronsUp, User, Gift, Coffee, FileText, Zap, X } from 'lucide-react'
import { SectionHeader } from '../../components/devopsdays/SectionHeader'
import { TicketsSection } from '../../components/devopsdays/TicketsSection'
import { isTicketSaleOpen, TICKET_SALE_START_LABEL } from '../../lib/tickets'
import { useI18n } from '../../i18n'
import { ticketsPageI18n } from './i18n'
import styles from './index.module.css'
import { siteContent } from '../../data/mockContent'

const SHOW_TICKET_SHOWCASE = false
type TicketTier = 'general' | 'vip'

// Solo datos estructurales: precios, cantidades, acentos. Nombres vienen de i18n.
const GROUP_DISCOUNTS_DATA = [
  { quantity: '5 – 9',  discount: '4%',  earlyBird: '$67',  regular: '$86',  vipEarlyBird: '$115', vipRegular: '$134', accent: '#6B51EF' },
  { quantity: '10 – 19',discount: '8%',  earlyBird: '$64',  regular: '$83',  vipEarlyBird: '$110', vipRegular: '$129', accent: '#6B51EF' },
  { quantity: '20 – 49',discount: '12%', earlyBird: '$61',  regular: '$79',  vipEarlyBird: '$106', vipRegular: '$123', accent: '#6B51EF' },
  { quantity: '>50',    discount: '15%', earlyBird: '$59',  regular: '$76',  vipEarlyBird: '$102', vipRegular: '$119', accent: '#6B51EF' },
  { quantity: '10',     discount: '17%', earlyBird: '$58',  regular: '$75',  vipEarlyBird: '$100', vipRegular: '$116', accent: '#858DA6', isSponsor: true },
  { quantity: '10',     discount: '15%', earlyBird: '$59',  regular: '$76',  vipEarlyBird: '$102', vipRegular: '$119', accent: '#f2b950', isSponsor: true },
  { quantity: '10',     discount: '10%', earlyBird: '$63',  regular: '$81',  vipEarlyBird: '$108', vipRegular: '$126', accent: '#BDBFBF', isSponsor: true },
  { quantity: '10',     discount: '8%',  earlyBird: '$64',  regular: '$83',  vipEarlyBird: '$110', vipRegular: '$129', accent: '#BF834E', isSponsor: true },
] as const

// Solo iconos y colores por categoría. Títulos e items vienen de i18n.
const BENEFITS_CATEGORY_CONFIG = [
  { icon: User,     color: '#6B51EF' },
  { icon: Gift,     color: '#6B51EF' },
  { icon: Coffee,   color: '#6B51EF' },
  { icon: FileText, color: '#6B51EF' },
  { icon: Sparkles, color: '#6B51EF' },
] as const

// Estructura booleana de beneficios por categoría y tier (sin texto)
const BENEFITS_BY_CATEGORY_DATA = [
  {
    items: [
      { general: true,  vip: true  },
      { general: true,  vip: true  },
      { general: true,  vip: true  },
      { general: true,  vip: true  },
      { general: true,  vip: true  },
    ]
  },
  {
    items: [
      { general: true,  vip: true  },
      { general: true,  vip: true  },
      { general: false, vip: true  },
    ]
  },
  {
    items: [
      { general: true,  vip: true  },
      { general: false, vip: true  },
      { general: false, vip: true  },
    ]
  },
  {
    items: [
      { general: true,  vip: true  },
      { general: true,  vip: true  },
    ]
  },
  {
    items: [
      { general: false, vip: true  },
      { general: false, vip: true  },
      { general: false, vip: true  },
      { general: false, vip: true  },
      { general: false, vip: true  },
    ]
  },
] as const

export default function TicketsPage() {
  const t = useI18n(ticketsPageI18n)

  const [expandedCategories, setExpandedCategories] = useState<number[]>(
    BENEFITS_BY_CATEGORY_DATA.map((_, idx) => idx)
  )
  const [activeTicketTier, setActiveTicketTier] = useState<TicketTier>('general')

  const toggleCategory = (index: number) => {
    setExpandedCategories(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const handleCategoryKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleCategory(index)
    }
  }

  const expandAll = () => {
    setExpandedCategories(BENEFITS_BY_CATEGORY_DATA.map((_, idx) => idx))
  }

  const collapseAll = () => {
    setExpandedCategories([])
  }

  const totalBenefits = BENEFITS_BY_CATEGORY_DATA.reduce((sum, cat) => sum + cat.items.length, 0)
  const totalGeneralBenefits = BENEFITS_BY_CATEGORY_DATA.reduce(
    (sum, cat) => sum + cat.items.filter(item => item.general).length,
    0
  )
  const totalVipBenefits = BENEFITS_BY_CATEGORY_DATA.reduce(
    (sum, cat) => sum + cat.items.filter(item => item.vip).length,
    0
  )
  const activeTicketMeta = activeTicketTier === 'general'
    ? {
        label: t.tierLabelGeneral,
        Icon: Ticket,
        color: '#8c8c8c',
        count: totalGeneralBenefits,
        progress: (totalGeneralBenefits / totalBenefits) * 100,
      }
    : {
        label: t.tierLabelVip,
        Icon: Sparkles,
        color: '#f2b950',
        count: totalVipBenefits,
        progress: (totalVipBenefits / totalBenefits) * 100,
      }
  const ticketSaleOpen = isTicketSaleOpen()

  return (
    <div className={styles.page}>
      {/* Hero Banner */}
      <section className={styles.introSection}>
        <div className={styles.introContainer}>
          <div className={styles.introBadge}>
            <Ticket size={18} />
            <span>{t.badgeText}</span>
          </div>

          <h1 className={styles.introTitle}>{t.introTitle}</h1>

          <p className={styles.introDescription}>{t.introDescription}</p>

          <div className={styles.introCta}>
            <a
              href={siteContent.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.introCtaButton}
              data-track-name="comprar_tickets_intro_tickets"
            >
              <Ticket size={20} />
              {t.ctaButton}
            </a>
            <p className={styles.introCtaNote}>
              {ticketSaleOpen ? t.ctaSaleStartedLabel : t.ctaSaleStartsLabel}
              <strong>{TICKET_SALE_START_LABEL}</strong>
            </p>
            <p className={styles.introCtaSubnote}>
              {t.ctaTeamNote}
            </p>
          </div>
        </div>
      </section>

      {SHOW_TICKET_SHOWCASE && <TicketsSection variant="page" />}

      {/* Group Discounts */}
      <section className={styles.groupDiscountsSection}>
        <div className={styles.container}>
          <SectionHeader
            eyebrow={t.groupDiscountsEyebrow}
            eyebrowColor="#6B51EF"
            title={t.groupDiscountsTitle}
            lead={t.groupDiscountsLead}
          />

          <div className={styles.discountsTable}>
            <div className={styles.discountsHeader}>
              <div className={styles.discountsHeaderTop}>
                <div className={styles.discountsHeaderCell} data-col="general-group" data-row="top">
                  <span className={styles.ticketTableLabel}>
                    <Ticket size={16} className={styles.ticketTableIcon} />
                    {t.tierLabelGeneral.toUpperCase()}
                  </span>
                </div>
                <div className={styles.discountsHeaderCell} data-col="vip-group" data-row="top">
                  <span className={styles.ticketTableLabel}>
                    <Sparkles size={16} className={styles.ticketTableIcon} />
                    {t.tierLabelVip}
                  </span>
                </div>
              </div>
              <div className={styles.discountsHeaderBottom}>
                <div className={styles.discountsHeaderCell} data-col="tier" data-row="bottom">{t.tableHeaderTier}</div>
                <div className={styles.discountsHeaderCell} data-col="quantity" data-row="bottom">{t.tableHeaderQuantity}</div>
                <div className={styles.discountsHeaderCell} data-col="discount" data-row="bottom">{t.tableHeaderDiscount}</div>
                <div className={styles.discountsHeaderCell} data-col="early" data-row="bottom">
                  <span className={styles.earlyBirdBadge}>
                    <span aria-hidden="true">⏰</span>
                    EARLY BIRD
                  </span>
                </div>
                <div className={styles.discountsHeaderCell} data-col="regular" data-row="bottom">{t.tableHeaderRegular}</div>
                <div className={styles.discountsHeaderCell} data-col="vip-early" data-row="bottom">
                  <span className={styles.earlyBirdBadge}>
                    <span aria-hidden="true">⏰</span>
                    EARLY BIRD
                  </span>
                </div>
                <div className={styles.discountsHeaderCell} data-col="vip-regular" data-row="bottom">{t.tableHeaderRegular}</div>
              </div>
            </div>

            {GROUP_DISCOUNTS_DATA.map((row, idx) => (
              <div
                key={idx}
                className={styles.discountsRow}
                style={{
                  '--row-accent': row.accent,
                  '--row-accent-width': row.isSponsor ? '3px' : '0px',
                } as React.CSSProperties}
              >
                <div className={styles.discountsCell} data-col="tier">
                  <span className={styles.tierName}>{t.groupDiscountNames[idx]}</span>
                </div>
                <div className={styles.discountsCell} data-col="quantity">{row.quantity}</div>
                <div className={styles.discountsCell} data-col="discount">
                  <span className={styles.discountPill}>{row.discount}</span>
                </div>
                <div className={styles.discountsCell} data-col="early">{row.earlyBird}</div>
                <div className={styles.discountsCell} data-col="regular">{row.regular}</div>
                <div className={styles.discountsCell} data-col="vip-early">{row.vipEarlyBird}</div>
                <div className={styles.discountsCell} data-col="vip-regular">{row.vipRegular}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefitsSection}>
        <div className={styles.container}>
          <SectionHeader
            title={t.benefitsTitle}
            lead={t.benefitsLead}
          />

          {/* Mobile Explorer */}
          <div className={styles.mobileBenefitsExplorer}>
            <div className={styles.ticketTierSwitch} role="tablist" aria-label={t.tierSwitchAriaLabel}>
              <button
                type="button"
                role="tab"
                aria-selected={activeTicketTier === 'general'}
                className={styles.ticketTierButton}
                data-state={activeTicketTier === 'general' ? 'active' : 'inactive'}
                data-tier="general"
                onClick={() => setActiveTicketTier('general')}
              >
                <Ticket size={16} className={styles.ticketTierButtonIcon} />
                {t.tierLabelGeneral}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTicketTier === 'vip'}
                className={styles.ticketTierButton}
                data-state={activeTicketTier === 'vip' ? 'active' : 'inactive'}
                data-tier="vip"
                onClick={() => setActiveTicketTier('vip')}
              >
                <Sparkles size={16} className={styles.ticketTierButtonIcon} />
                {t.tierLabelVip}
              </button>
            </div>

            <div className={styles.mobileTierHeader} data-tier={activeTicketTier}>
              <div className={styles.mobileTierHeaderTop}>
                <div className={styles.mobileTierCoverage}>
                  {t.tierCoverageLabel} ({activeTicketMeta.count}/{totalBenefits})
                </div>
              </div>

              <div className={styles.mobileTierProgress}>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    data-type={activeTicketTier}
                    style={{ width: `${activeTicketMeta.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className={styles.benefitsToolbar}>
              <div className={`${styles.tableControls} ${styles.mobileTierControls}`}>
                <button
                  className={styles.textLink}
                  onClick={expandAll}
                  data-track-name="expandir_tabla_benefits_tickets"
                >
                  <ChevronsDown size={16} />
                  {t.expandAll}
                </button>
                <button className={styles.textLink} onClick={collapseAll} data-track-name="colapsar_tabla_benefits_tickets">
                  <ChevronsUp size={16} />
                  {t.collapseAll}
                </button>
              </div>
            </div>

            <div className={styles.benefitsTable}>
              {BENEFITS_BY_CATEGORY_DATA.map((category, catIdx) => {
                const CategoryIcon = BENEFITS_CATEGORY_CONFIG[catIdx].icon
                const categoryColor = BENEFITS_CATEGORY_CONFIG[catIdx].color
                const benefitCount = category.items.length
                return (
                  <div
                    key={`mobile-${catIdx}`}
                    className={styles.categoryBlock}
                    style={{ '--category-color': categoryColor } as React.CSSProperties}
                  >
                    <button
                      type="button"
                      className={styles.mobileCategoryTitle}
                      onClick={() => toggleCategory(catIdx)}
                      aria-label={expandedCategories.includes(catIdx) ? t.categoryCollapseLabel : t.categoryExpandLabel}
                      aria-expanded={expandedCategories.includes(catIdx)}
                      data-track-name="toggle_categoria_benefits_tickets"
                    >
                      <div className={styles.mobileCategoryTitleMain}>
                        <CategoryIcon size={18} className={styles.mobileCategoryIcon} />
                        <span>{t.benefitCategoryTitles[catIdx]}</span>
                        <span className={styles.mobileCategoryCount}>({benefitCount})</span>
                      </div>
                      {expandedCategories.includes(catIdx) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>

                    {expandedCategories.includes(catIdx) && (
                      <div className={styles.mobileBenefitList}>
                        {category.items.map((item, itemIdx) => (
                          <div key={`mobile-${catIdx}-${itemIdx}`} className={styles.mobileBenefitItem}>
                            <div className={styles.mobileBenefitLabel}>
                              {t.benefitItemNames[catIdx][itemIdx]}
                            </div>
                            <div className={styles.mobileBenefitStatus}>
                              {(activeTicketTier === 'general' ? item.general : item.vip) ? (
                                <div
                                  className={styles.mobileBenefitBadge}
                                  style={{ '--tier-color': activeTicketMeta.color } as React.CSSProperties}
                                  title={t.includedLabel}
                                  aria-label={t.includedLabel}
                                >
                                  <Check className={styles.mobileBenefitIcon} data-type={activeTicketTier} strokeWidth={3} />
                                </div>
                              ) : (
                                <div className={styles.mobileBenefitBadgeMuted} title={t.notIncludedLabel} aria-label={t.notIncludedLabel}>
                                  <X className={styles.mobileBenefitIconMuted} strokeWidth={2} />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Desktop Explorer */}
          <div className={styles.desktopBenefitsExplorer}>
            <div className={styles.tableControls}>
              <button
                className={styles.textLink}
                onClick={expandAll}
                data-track-name="expandir_tabla_benefits_tickets"
              >
                <ChevronsDown size={16} />
                {t.expandAll}
              </button>
              <button className={styles.textLink} onClick={collapseAll} data-track-name="colapsar_tabla_benefits_tickets">
                <ChevronsUp size={16} />
                {t.collapseAll}
              </button>
            </div>

            <div className={styles.benefitsTable}>
              <div className={styles.tableHeader}>
                <div className={styles.tableHeaderCell} data-col="benefit">
                  <span>{t.benefitsHeaderLabel}</span>
                </div>
                <div className={styles.tableHeaderCell} data-col="general">
                  <span className={styles.ticketTableLabel}>
                    <Ticket size={16} className={styles.ticketTableIcon} />
                    {t.tierLabelGeneral.toUpperCase()}
                  </span>
                  <div className={styles.progressInfo}>
                    <span className={styles.progressCount}>{totalGeneralBenefits}/{totalBenefits}</span>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        data-type="general"
                        style={{ width: `${(totalGeneralBenefits / totalBenefits) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className={styles.tableHeaderCell} data-col="vip">
                  <span className={styles.ticketTableLabel}>
                    <Sparkles size={16} className={styles.ticketTableIcon} />
                    {t.tierLabelVip}
                  </span>
                  <div className={styles.progressInfo}>
                    <span className={styles.progressCount}>{totalVipBenefits}/{totalBenefits}</span>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        data-type="vip"
                        style={{ width: `${(totalVipBenefits / totalBenefits) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {BENEFITS_BY_CATEGORY_DATA.map((category, catIdx) => {
                const CategoryIcon = BENEFITS_CATEGORY_CONFIG[catIdx].icon
                const categoryColor = BENEFITS_CATEGORY_CONFIG[catIdx].color
                const benefitCount = category.items.length
                return (
                  <div
                    key={`desktop-${catIdx}`}
                    className={styles.categoryBlock}
                    style={{ '--category-color': categoryColor } as React.CSSProperties}
                  >
                    <div
                      className={styles.categoryTitle}
                      onClick={() => toggleCategory(catIdx)}
                      onKeyDown={(e) => handleCategoryKeyDown(catIdx, e)}
                      role="button"
                      tabIndex={0}
                      data-track-name="toggle_categoria_benefits_tickets"
                    >
                      <div className={styles.categoryTitleContent}>
                        <CategoryIcon size={20} className={styles.categoryIcon} />
                        <span>{t.benefitCategoryTitles[catIdx]}</span>
                        <span className={styles.benefitCount}>({benefitCount})</span>
                      </div>
                      <button
                        className={styles.toggleButton}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleCategory(catIdx)
                        }}
                        aria-label={expandedCategories.includes(catIdx) ? t.collapseLabel : t.expandLabel}
                        aria-expanded={expandedCategories.includes(catIdx)}
                        data-track-name="toggle_categoria_icon_benefits_tickets"
                      >
                        {expandedCategories.includes(catIdx) ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </button>
                    </div>

                    {expandedCategories.includes(catIdx) && (
                      category.items.map((item, itemIdx) => (
                        <div key={`desktop-${catIdx}-${itemIdx}`} className={styles.tableRow}>
                          <div className={styles.tableCell} data-col="benefit">
                            <div className={styles.benefitName}>
                              {t.benefitItemNames[catIdx][itemIdx]}
                            </div>
                          </div>
                          <div className={styles.tableCell} data-col="general">
                            {item.general ? (
                              <Check className={styles.checkIcon} data-type="general" strokeWidth={3} />
                            ) : (
                              <X className={styles.xIcon} strokeWidth={2} />
                            )}
                          </div>
                          <div className={styles.tableCell} data-col="vip">
                            {item.vip ? (
                              <Check className={styles.checkIcon} data-type="vip" strokeWidth={3} />
                            ) : (
                              <X className={styles.xIcon} strokeWidth={2} />
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
