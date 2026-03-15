import { useState } from 'react'
import { Award, Check, Crown, Mail, Download, Medal, Shield, Users, Calendar, Eye, Presentation, Gift, UserPlus, ChevronDown, ChevronUp, ChevronsDown, ChevronsUp, Handshake, Rocket, X } from 'lucide-react'
import { SectionHeader } from '../components/devopsdays/SectionHeader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import styles from './SponsorsPage.module.css'

// Métricas principales
const MAIN_STATS = [
  { 
    title: 'La comunidad tech más grande de Perú', 
    subtitle: 'Se espera +800 Ingenieros de Software, Arquitectos, Líderes Técnicos, Ingenieros DevOps, Ingenieros de seguridad, CTOs y CIOs',
    icon: Users,
    color: '#7c3aed' 
  },
  { 
    title: 'Dos días completos de aprendizaje', 
    subtitle: 'Charlas + Talleres + Open Spaces + Networking',
    icon: Calendar,
    color: '#7c3aed' 
  },
  { 
    title: 'Regresamos en el 2026', 
    subtitle: '2da edición del evento en Lima Centro de Convenciones (LCC)',
    icon: Rocket,
    color: '#7c3aed' 
  },
]

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

// Beneficios detallados con iconos y colores por categoría
const DETAILED_BENEFITS = [
  {
    category: 'Presentaciones',
    icon: Presentation,
    color: '#7c3aed', // Morado - UNIFORME
    items: [
      {
        label: 'Presentation (5min)',
        platinum: true,
        gold: false,
        silver: false,
        bronze: false,
      },
      {
        label: 'Presentation video recording',
        platinum: true,
        gold: false,
        silver: false,
        bronze: false,
      },
      {
        label: 'Presentation (20min)',
        platinum: true,
        gold: true,
        silver: false,
        bronze: false,
      },
    ]
  },
  {
    category: 'Acceso a participantes',
    icon: UserPlus,
    color: '#7c3aed', // Morado - UNIFORME (antes turquesa)
    items: [
      {
        label: 'Participant opt-in list',
        platinum: true,
        gold: true,
        silver: false,
        bronze: false,
      },
      {
        label: 'Participant information',
        platinum: true,
        gold: true,
        silver: true,
        bronze: false,
      },
    ]
  },
  {
    category: 'Visibilidad',
    icon: Eye,
    color: '#7c3aed', // Morado - UNIFORME (antes verde)
    items: [
      {
        label: 'Raffles for audience',
        platinum: true,
        gold: true,
        silver: true,
        bronze: false,
      },
      {
        label: 'Logo showcase (during event)',
        platinum: true,
        gold: true,
        silver: true,
        bronze: false,
      },
      {
        label: 'Logo showcase (media & merch)',
        platinum: true,
        gold: true,
        silver: true,
        bronze: true,
      },
    ]
  },
  {
    category: 'Pases y stands',
    icon: Gift,
    color: '#7c3aed', // Morado - UNIFORME (antes naranja)
    items: [
      {
        label: 'Full access pass',
        platinum: '12',
        gold: '8',
        silver: '4',
        bronze: '2',
      },
      {
        label: 'Additional passes (discounted)',
        platinum: '30%',
        gold: '20%',
        silver: '10%',
        bronze: '5%',
      },
      {
        label: 'Stand dimensions',
        platinum: 'Large (5m x 3m)**',
        gold: 'Medium (3m x 2m)',
        silver: 'Small (1m x 1m)',
        bronze: '—',
      },
      {
        label: 'Media coverage',
        platinum: 'Featured advertising***',
        gold: 'Featured advertising***',
        silver: 'Advertising',
        bronze: 'Mention',
      },
    ]
  },
]

type TierBenefitItem = (typeof DETAILED_BENEFITS)[number]['items'][number]

const getTierValue = (item: TierBenefitItem, tierKey: TierKey) => item[tierKey]

const hasTierBenefit = (item: TierBenefitItem, tierKey: TierKey) => {
  const value = getTierValue(item, tierKey)
  return typeof value === 'boolean' ? value : value !== '—'
}

const formatTierBenefit = (item: TierBenefitItem, tierKey: TierKey) => {
  const value = getTierValue(item, tierKey)
  return typeof value === 'boolean' ? 'Incluido' : value
}

export default function SponsorsPage() {
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    new Set(["Pases y stands"]) // CAMBIADO: Abre "Pases y stands" por defecto (más relevante para corporativos)
  );

  // Discount deadline logic
  const DISCOUNT_DEADLINE = new Date('2026-03-30T23:59:59');
  const isDiscountActive = new Date() < DISCOUNT_DEADLINE;

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  }

  const handleCategoryKeyDown = (categoryId: string, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleCategory(categoryId);
    }
  }

  // Functions to expand/collapse all
  const expandAll = () => {
    setOpenCategories(new Set(DETAILED_BENEFITS.map((cat) => cat.category)));
  }

  const collapseAll = () => {
    setOpenCategories(new Set());
  }

  // Calculate total benefits per tier
  const totalBenefits = DETAILED_BENEFITS.reduce((sum, cat) => sum + cat.items.length, 0);
  const tierBenefitCounts = TIER_KEYS.map((tierKey) =>
    DETAILED_BENEFITS.reduce(
      (sum, cat) => sum + cat.items.filter((item) => hasTierBenefit(item, tierKey)).length,
      0
    )
  );
  const tierMeta = TIERS.map((tier, idx) => ({
    ...tier,
    key: TIER_KEYS[idx],
    displayName: TIER_DECORATION[TIER_KEYS[idx]].label,
    Icon: TIER_DECORATION[TIER_KEYS[idx]].icon,
    includedBenefits: tierBenefitCounts[idx],
    progressPercent: (tierBenefitCounts[idx] / totalBenefits) * 100,
  }));

  const renderBooleanBenefitBadge = (tierKey: TierKey, tierColor: string, included: boolean) => {
    if (included) {
      return (
        <div
          className={styles.mobileBenefitBadge}
          style={{ '--tier-color': tierColor } as React.CSSProperties}
          title="Incluido"
          aria-label="Incluido"
        >
          <Check size={14} strokeWidth={3.5} />
        </div>
      )
    }

    return (
      <div className={styles.mobileBenefitBadgeMuted} title="No incluido" aria-label="No incluido">
        <X size={14} strokeWidth={1} />
      </div>
    )
  }

  return (
    <div className={styles.page}>
      {/* INTRO SECTION - Now Main Hero */}
      <section className={styles.introSection}>
        <div className={styles.introContainer}>
          {/* Badge */}
          <div className={styles.introBadge}>
            <Handshake size={20} />
            <span>CALL FOR SPONSORS 2026</span>
          </div>

          <h1 className={styles.introTitle}>Impulsa la comunidad DevOpsDays Lima 🚀</h1>
          
          <p className={styles.introLead}>
            💜 Más de 800 profesionales tech, decision makers y líderes de la industria reunidos
            en dos días de aprendizaje, networking y comunidad. Como sponsor, no solo ganas visibilidad:
            entras en contacto con talento, equipos técnicos y conversaciones que hoy están moviendo el ecosistema DevOps en LATAM. 🤝
            Sponsorships flexibles, pensados para impacto de marca y afinidad real con la comunidad.
          </p>

          {/* Stats Grid */}
          <div className={styles.statsGrid}>
            {MAIN_STATS.map((stat, idx) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={idx} 
                  className={styles.statCard}
                  style={{ '--stat-color': stat.color } as React.CSSProperties}
                >
                  <div className={styles.statValue} style={{ color: stat.color }}>
                    <IconComponent size={32} />
                  </div>
                  <div className={styles.statLabel}>
                    {stat.title}
                    {stat.subtitle && (
                      <span className={styles.statSublabel}>{stat.subtitle}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Removed CTA Button - No longer needed with short scroll distance */}
        </div>
      </section>

      {/* CONTACT BANNER - Following Home/Speakers Style */}
      <section className={styles.contactBanner}>
        <div className={styles.contactBannerBg} />
        <div className={styles.contactBannerOverlay} />

        <div className={styles.contactBannerContainer}>
          <div className={styles.contactBannerGrid}>
            {/* Columna izquierda: Contenido principal */}
            <div className={styles.contactBannerContent}>
              <div>
                <div className={styles.contactBadgeContainer}>
                  <div className={styles.contactBadgeDot} />
                  <span className={styles.contactBadgeText}>CALL FOR SPONSORS DISPONIBLE</span>
                </div>

                <h2 className={styles.contactBannerTitle}>
                  ¿Listo para ser parte de DevOpsDays Lima 2026?
                </h2>

                <p className={styles.contactBannerDescription}>
                  Escríbenos a <strong>sponsors@devopsdays.pe</strong> para revisar sponsorships,
                  activaciones y paquetes alineados a tus objetivos de marca, recruiting y posicionamiento técnico.
                </p>
              </div>
            </div>

            {/* Columna derecha: Botones CTA */}
            <div className={styles.contactButtonsContainer}>
              <div className={styles.contactButtonsInner}>
                <a
                  href="mailto:sponsors@devopsdays.pe"
                  className={styles.contactPrimaryButton}
                  data-track-name="contactar_equipo_contact_sponsors"
                >
                  <Mail size={20} />
                  Contactar al equipo
                </a>
                {/* Fila de brochures */}
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
            title="Compara los beneficios por nivel"
            lead="Revisa el alcance de cada sponsorship y elige la combinación adecuada para tus objetivos de marca, networking y presencia técnica."
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
                        Beneficios ({tier.includedBenefits}/{totalBenefits})
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
                      Expandir todo
                    </button>
                    <button className={styles.textLink} onClick={collapseAll} data-track-name={`colapsar_tab_${tier.key}_benefits_sponsors`}>
                      <ChevronsUp size={16} />
                      Colapsar todo
                    </button>
                  </div>

                  <div className={styles.mobileBenefitsTable}>
                    <div className={styles.mobilePricingRow}>
                      <div>
                        <div className={styles.mobilePricingLabel}>Regular price</div>
                        <div className={styles.mobilePricingDetail}>USD - Tax not included</div>
                      </div>
                      <div className={styles.mobilePricingValue}>{tier.price}</div>
                    </div>

                    <div className={`${styles.mobilePricingRow} ${isDiscountActive ? styles.mobilePricingRowHighlighted : ''}`}>
                      <div>
                        <div className={styles.mobilePricingLabel}>
                          {isDiscountActive && (
                            <span className={styles.mobileEarlyBirdBadge}>⏰ EARLY BIRD</span>
                          )}
                          Discounted price (20%)
                        </div>
                        <div className={styles.mobilePricingDetail}>
                          Until MAR 30th 2026 · USD - Tax not included
                        </div>
                      </div>
                      <div className={styles.mobilePricingValueStrong}>{tier.discountedPrice}</div>
                    </div>

                    {DETAILED_BENEFITS.map((category) => {
                      const isExpanded = openCategories.has(category.category);

                      return (
                        <div
                          key={`${tier.key}-${category.category}`}
                          className={styles.mobileCategoryCard}
                          style={{ '--category-color': category.color } as React.CSSProperties}
                        >
                          <button
                            type="button"
                            className={styles.mobileCategoryTitle}
                            onClick={() => toggleCategory(category.category)}
                            aria-label={isExpanded ? 'Colapsar categoria' : 'Expandir categoria'}
                            aria-expanded={isExpanded}
                          >
                            <div className={styles.mobileCategoryTitleMain}>
                              <category.icon size={18} className={styles.mobileCategoryIcon} />
                              <span>{category.category}</span>
                              <span className={styles.mobileCategoryCount}>({category.items.length})</span>
                            </div>
                            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </button>

                          {isExpanded && (
                            <div className={styles.mobileBenefitList}>
                              {category.items.map((item) => {
                                const tierValue = getTierValue(item, tier.key);
                                const isBooleanBenefit = typeof tierValue === 'boolean';

                                return (
                                  <div key={`${tier.key}-${category.category}-${item.label}`} className={styles.mobileBenefitItem}>
                                    <div className={styles.mobileBenefitLabel}>{item.label}</div>
                                    {isBooleanBenefit ? (
                                      renderBooleanBenefitBadge(tier.key, tier.color, tierValue)
                                    ) : (
                                      <div className={styles.mobileBenefitValue}>
                                        {formatTierBenefit(item, tier.key)}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className={styles.desktopBenefitsExplorer}>
            {/* Text Links para expandir/colapsar todo */}
            <div className={styles.tableControls}>
              <button className={styles.textLink} onClick={expandAll} data-track-name="expandir_tabla_benefits_sponsors">
                <ChevronsDown size={16} />
                Expandir todo
              </button>
              <button className={styles.textLink} onClick={collapseAll} data-track-name="colapsar_tabla_benefits_sponsors">
                <ChevronsUp size={16} />
                Colapsar todo
              </button>
            </div>

            {/* Pricing Header */}
            <div className={styles.pricingTable}>
              <div className={styles.pricingHeader}>
                <div className={styles.pricingHeaderLabel}>BENEFICIOS</div>
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

              {/* Regular Price Row */}
              <div className={styles.pricingRow}>
                <div className={styles.pricingRowLabel}>
                  <div className={styles.benefitLabel}>Regular price</div>
                  <div className={styles.priceDetails}>
                    USD - Tax not included
                  </div>
                </div>
                {tierMeta.map((tier) => (
                  <div key={tier.name} className={styles.pricingCell}>
                    <div className={styles.priceRegular}>
                      {tier.price}
                    </div>
                  </div>
                ))}
              </div>

              {/* Discounted Price Row */}
              <div 
                className={`${styles.pricingRow} ${isDiscountActive ? styles.pricingRowHighlighted : ''}`}
              >
                <div className={styles.pricingRowLabel}>
                  <div className={styles.benefitLabel}>
                    {isDiscountActive && (
                      <span className={styles.earlyBirdBadge}>⏰ EARLY BIRD</span>
                    )}
                    Discounted price (20%)
                  </div>
                  <div className={styles.priceDetails}>
                    Until MAR 30th 2026 · USD - Tax not included
                  </div>
                </div>
                {tierMeta.map((tier) => (
                  <div key={tier.name} className={styles.pricingCell}>
                    <div className={styles.priceDiscounted}>
                      {tier.discountedPrice}
                    </div>
                  </div>
                ))}
              </div>

              {/* Detailed Benefits */}
              {DETAILED_BENEFITS.map((category) => {
                const categoryKey = `category-${category.category}`;
                const isExpanded = openCategories.has(category.category);
                const itemCount = category.items.length;
                return (
                  <div key={categoryKey} className={styles.categoryBlock}>
                    {/* Category Title - Clickable */}
                    <div 
                      className={styles.categoryTitle}
                      style={{ '--category-color': category.color } as React.CSSProperties}
                      onClick={() => toggleCategory(category.category)}
                      onKeyDown={(e) => handleCategoryKeyDown(category.category, e)}
                      role="button"
                      tabIndex={0}
                      data-track-name="toggle_categoria_benefits_sponsors"
                    >
                      <div className={styles.categoryTitleContent}>
                        <category.icon size={20} className={styles.categoryIconInline} />
                        <span>{category.category}</span>
                        <span className={styles.benefitCount}>({itemCount})</span>
                      </div>
                      <button 
                        className={styles.toggleButton} 
                        aria-label={isExpanded ? 'Colapsar' : 'Expandir'}
                        aria-expanded={isExpanded}
                        data-track-name="toggle_categoria_icon_benefits_sponsors"
                      >
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>

                    {/* Category Items - Collapsible */}
                    {isExpanded && category.items.map((item, itemIdx) => (
                      <div key={itemIdx} className={styles.pricingRow}>
                        <div className={styles.pricingRowLabel}>
                          <div className={styles.benefitLabel}>{item.label}</div>
                        </div>
                        <div className={styles.pricingCell}>
                          {typeof item.platinum === 'boolean' ? (
                            renderBooleanBenefitBadge('platinum', TIERS[0].color, item.platinum)
                          ) : (
                            <span className={styles.valueText}>{item.platinum}</span>
                          )}
                        </div>
                        <div className={styles.pricingCell}>
                          {typeof item.gold === 'boolean' ? (
                            renderBooleanBenefitBadge('gold', TIERS[1].color, item.gold)
                          ) : (
                            <span className={styles.valueText}>{item.gold}</span>
                          )}
                        </div>
                        <div className={styles.pricingCell}>
                          {typeof item.silver === 'boolean' ? (
                            renderBooleanBenefitBadge('silver', TIERS[2].color, item.silver)
                          ) : (
                            <span className={styles.valueText}>{item.silver}</span>
                          )}
                        </div>
                        <div className={styles.pricingCell}>
                          {typeof item.bronze === 'boolean' ? (
                            renderBooleanBenefitBadge('bronze', TIERS[3].color, item.bronze)
                          ) : (
                            <span className={styles.valueText}>{item.bronze}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footnotes */}
          <div className={styles.footnotes}>
            <p className={styles.footnote}>
              * Opt-in attendees are those who have explicitly confirmed to receive communications about the event.
            </p>
            <p className={styles.footnote}>
              ** The size of the Platinum stand is referential and may change depending on the available space.
            </p>
            <p className={styles.footnote}>
              *** Featured advertising includes a 2-minute interview-style video.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
