import { useState } from 'react'
import { Ticket, Sparkles, Check, ChevronDown, ChevronUp, ChevronsDown, ChevronsUp, User, Gift, Coffee, FileText, Zap, X } from 'lucide-react'
import { SectionHeader } from '../components/devopsdays/SectionHeader'
import { TicketsSection } from '../components/devopsdays/TicketsSection'
import { isTicketSaleOpen, TICKET_SALE_START_LABEL } from '../lib/tickets'
import styles from './TicketsPage.module.css'

const SHOW_TICKET_SHOWCASE = false
type TicketTier = 'general' | 'vip'

const GROUP_DISCOUNTS = [
  {
    name: 'Tramo 1 — Build',
    quantity: '5 – 9',
    discount: '4%',
    earlyBird: '$67',
    regular: '$86',
    vipEarlyBird: '$115',
    vipRegular: '$134',
    accent: '#7c3aed',
  },
  {
    name: 'Tramo 2 — Deploy',
    quantity: '10 – 19',
    discount: '8%',
    earlyBird: '$64',
    regular: '$83',
    vipEarlyBird: '$110',
    vipRegular: '$129',
    accent: '#7c3aed',
  },
  {
    name: 'Tramo 3 — Release',
    quantity: '20 – 49',
    discount: '12%',
    earlyBird: '$61',
    regular: '$79',
    vipEarlyBird: '$106',
    vipRegular: '$123',
    accent: '#7c3aed',
  },
  {
    name: 'Tramo 4 — Scale',
    quantity: '>50',
    discount: '15%',
    earlyBird: '$59',
    regular: '$76',
    vipEarlyBird: '$102',
    vipRegular: '$119',
    accent: '#7c3aed',
  },
  {
    name: 'Sponsor Platinum',
    quantity: '10',
    discount: '17%',
    earlyBird: '$58',
    regular: '$75',
    vipEarlyBird: '$100',
    vipRegular: '$116',
    accent: '#858DA6',
  },
  {
    name: 'Sponsor Gold',
    quantity: '10',
    discount: '15%',
    earlyBird: '$59',
    regular: '$76',
    vipEarlyBird: '$102',
    vipRegular: '$119',
    accent: '#f2b950',
  },
  {
    name: 'Sponsor Silver',
    quantity: '10',
    discount: '10%',
    earlyBird: '$63',
    regular: '$81',
    vipEarlyBird: '$108',
    vipRegular: '$126',
    accent: '#BDBFBF',
  },
  {
    name: 'Sponsor Bronze',
    quantity: '10',
    discount: '8%',
    earlyBird: '$64',
    regular: '$83',
    vipEarlyBird: '$110',
    vipRegular: '$129',
    accent: '#BF834E',
  },
] as const

// Beneficios organizados por categorías según el PDF
const BENEFITS_BY_CATEGORY = [
  {
    title: 'ACCESO AL EVENTO',
    icon: User,
    color: '#7c3aed',
    items: [
      {
        name: 'Acceso completo por dos días',
        description: 'Libertad total de movimiento para disfrutar de jornadas, charlas, talleres, keynotes y networking sin restricciones.',
        general: true,
        vip: true
      },
      {
        name: 'Acceso a todas las Keynotes',
        description: 'Aprende de los referentes más influyentes del ecosistema DevOps en las charlas plenarias que marcan la agenda.',
        general: true,
        vip: true
      },
      {
        name: 'Área de Networking',
        description: 'Conéctate con ingenieros, líderes técnicos y comunidad DevOps de toda la región en un espacio diseñado para crear relaciones duraderas.',
        general: true,
        vip: true
      },
      {
        name: 'Showroom de Patrocinadores',
        description: 'Explora demos en vivo, herramientas emergentes y soluciones del ecosistema DevOps de la mano de nuestros sponsors.',
        general: true,
        vip: true
      },
      {
        name: 'Audífonos de traducción simultánea',
        description: 'Sigue todas las sesiones en tu idioma sin perder detalle, sin importar el idioma del speaker.',
        general: true,
        vip: true
      }
    ]
  },
  {
    title: 'KIT DEL ASISTENTE',
    icon: Gift,
    color: '#7c3aed',
    items: [
      {
        name: 'Lanyard y fotocheck oficial del evento',
        description: 'Tu credencial exclusiva y coleccionable del DevOpsDays Lima 2026: identificación oficial y recuerdo del evento.',
        general: true,
        vip: true
      },
      {
        name: 'Kit de bienvenida DevOpsDays',
        description: 'Merchandising curado y sorpresas exclusivas para arrancar el evento con energía desde el primer momento.',
        general: true,
        vip: true
      },
      {
        name: 'Kit de bienvenida exclusivo',
        description: 'Selección premium de productos y regalos de edición limitada, disponible únicamente para asistentes VIP.',
        general: false,
        vip: true
      }
    ]
  },
  {
    title: 'ALIMENTACIÓN',
    icon: Coffee,
    color: '#7c3aed',
    items: [
      {
        name: 'Coffee breaks — ambos días',
        description: 'Recarga energías entre sesiones con café de especialidad, snacks y bebidas durante los descansos en ambas jornadas.',
        general: true,
        vip: true
      },
      {
        name: 'Coffee break exclusivo en zona VIP',
        description: 'Espacio privado con selección premium de café y snacks — sin aglomeraciones y con atención personalizada.',
        general: false,
        vip: true
      },
      {
        name: 'Almuerzo con Networking — ambos días',
        description: 'Tu alimentación cubierta en ambas jornadas; almuerzos en un entorno pensado para conectar con otros asistentes VIP y speakers.',
        general: false,
        vip: true
      }
    ]
  },
  {
    title: 'CONTENIDO Y CERTIFICACIÓN',
    icon: FileText,
    color: '#7c3aed',
    items: [
      {
        name: 'Material digital de todas las sesiones',
        description: 'Acceso post-evento a las presentaciones de todos los speakers para revisar y profundizar el conocimiento sin límite de tiempo.',
        general: true,
        vip: true
      },
      {
        name: 'Certificado digital de asistencia',
        description: 'Acreditación oficial del DevOpsDays Lima 2026 para tu perfil profesional — descargable y verificable.',
        general: true,
        vip: true
      }
    ]
  },
  {
    title: 'EXPERIENCIA VIP EXCLUSIVA',
    icon: Sparkles,
    color: '#7c3aed',
    items: [
      {
        name: 'Priority Pass — registro y acceso prioritario',
        description: 'Evita filas desde el primer momento: carril exclusivo y registro exprés para que tu experiencia comience al pie derecho.',
        general: false,
        vip: true
      },
      {
        name: 'Espacio de trabajo VIP',
        description: 'Zona privada con asientos cómodos y carga de dispositivos para trabajar o recargar energía entre sesiones.',
        general: false,
        vip: true
      },
      {
        name: 'Asientos reservados en filas preferenciales',
        description: 'Los mejores lugares en todas las Keynotes, asignados y reservados para ti — sin preocuparte de llegar temprano.',
        general: false,
        vip: true
      },
      {
        name: 'Internet exclusivo para asistentes VIP',
        description: 'Red WiFi dedicada y de alta velocidad, para que tu conexión nunca sea un obstáculo durante el evento.',
        general: false,
        vip: true
      },
      {
        name: 'Asistencia personalizada durante el evento',
        description: 'Un coordinador disponible para ti en todo momento: resuelve dudas, gestiona imprevistos y asegura que aproveches cada instancia.',
        general: false,
        vip: true
      }
    ]
  }
]

export default function TicketsPage() {
  // Estado para manejar qué categorías están expandidas - TODAS expandidas por defecto
  const [expandedCategories, setExpandedCategories] = useState<number[]>(
    BENEFITS_BY_CATEGORY.map((_, idx) => idx) // [0, 1, 2, 3, 4] - todas expandidas
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
      e.preventDefault();
      toggleCategory(index);
    }
  }

  // Funciones para expandir/colapsar todo
  const expandAll = () => {
    setExpandedCategories(BENEFITS_BY_CATEGORY.map((_, idx) => idx))
  }

  const collapseAll = () => {
    setExpandedCategories([])
  }

  // Calcular totales de beneficios
  const totalBenefits = BENEFITS_BY_CATEGORY.reduce((sum, cat) => sum + cat.items.length, 0)
  const totalGeneralBenefits = BENEFITS_BY_CATEGORY.reduce(
    (sum, cat) => sum + cat.items.filter(item => item.general).length, 
    0
  )
  const totalVipBenefits = BENEFITS_BY_CATEGORY.reduce(
    (sum, cat) => sum + cat.items.filter(item => item.vip).length, 
    0
  )
  const activeTicketMeta = activeTicketTier === 'general'
    ? {
        label: 'GENERAL',
        Icon: Ticket,
        color: '#8c8c8c',
        count: totalGeneralBenefits,
        progress: (totalGeneralBenefits / totalBenefits) * 100,
      }
    : {
        label: 'VIP',
        Icon: Sparkles,
        color: '#f2b950',
        count: totalVipBenefits,
        progress: (totalVipBenefits / totalBenefits) * 100,
      }
  const ticketSaleOpen = isTicketSaleOpen()

  return (
    <div className={styles.page}>
      {/* Hero Banner - Full Width */}
      <section className={styles.introSection}>
        <div className={styles.introContainer}>
          {/* Badge */}
          <div className={styles.introBadge}>
            <Ticket size={18} />
            <span>TICKETS 2026</span>
          </div>

          {/* Title */}
          <h1 className={styles.introTitle}>
            ¡Tus tickets para DevOpsDays Lima 2026!
          </h1>

          {/* Main text */}
          <p className={styles.introDescription}>
            Dos modalidades pensadas para distintos niveles de acceso y networking. Ambos tickets te conectan con la comunidad DevOps. El ticket VIP amplía la experiencia con beneficios premium.
          </p>

          {/* CTA */}
          <div className={styles.introCta}>
            <a
              href="https://tickets.devopsdays.pe/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.introCtaButton}
              data-track-name="comprar_tickets_intro_tickets"
            >
              <Ticket size={20} />
              Comprar tickets
            </a>
            <p className={styles.introCtaNote}>
              {ticketSaleOpen ? 'Venta iniciada: ' : 'Inicio de venta: '}
              <strong>{TICKET_SALE_START_LABEL}</strong>
            </p>
            <p className={styles.introCtaSubnote}>
              Si tu equipo necesita más tickets o una coordinación especial, puedes escribirnos a <strong>tickets@devopsdays.pe</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Sección de Tickets */}
      {SHOW_TICKET_SHOWCASE && <TicketsSection variant="page" />}

      <section className={styles.groupDiscountsSection}>
        <div className={styles.container}>
          <SectionHeader
            eyebrow="Tickets"
            eyebrowColor="#7c3aed"
            title="Descuentos grupales y patrocinadores"
            lead="Si vienes con tu equipo o participas como sponsor, aquí puedes revisar los precios por tramo para General y VIP."
          />

          <div className={styles.discountsTable}>
            <div className={styles.discountsHeader}>
              <div className={styles.discountsHeaderTop}>
                <div className={styles.discountsHeaderCell} data-col="general-group" data-row="top">
                  <span className={styles.ticketTableLabel}>
                    <Ticket size={16} className={styles.ticketTableIcon} />
                    GENERAL
                  </span>
                </div>
                <div className={styles.discountsHeaderCell} data-col="vip-group" data-row="top">
                  <span className={styles.ticketTableLabel}>
                    <Sparkles size={16} className={styles.ticketTableIcon} />
                    VIP
                  </span>
                </div>
              </div>
              <div className={styles.discountsHeaderBottom}>
                <div className={styles.discountsHeaderCell} data-col="tier" data-row="bottom">TRAMO</div>
                <div className={styles.discountsHeaderCell} data-col="quantity" data-row="bottom">CANTIDAD</div>
                <div className={styles.discountsHeaderCell} data-col="discount" data-row="bottom">DSCTO.</div>
                <div className={styles.discountsHeaderCell} data-col="early" data-row="bottom">
                  <span className={styles.earlyBirdBadge}>
                    <span aria-hidden="true">⏰</span>
                    EARLY BIRD
                  </span>
                </div>
                <div className={styles.discountsHeaderCell} data-col="regular" data-row="bottom">REGULAR</div>
                <div className={styles.discountsHeaderCell} data-col="vip-early" data-row="bottom">
                  <span className={styles.earlyBirdBadge}>
                    <span aria-hidden="true">⏰</span>
                    EARLY BIRD
                  </span>
                </div>
                <div className={styles.discountsHeaderCell} data-col="vip-regular" data-row="bottom">REGULAR</div>
              </div>
            </div>

            {GROUP_DISCOUNTS.map((row) => (
              <div
                key={row.name}
                className={styles.discountsRow}
                style={{
                  '--row-accent': row.accent,
                  '--row-accent-width': row.name.startsWith('Sponsor') ? '3px' : '0px',
                } as React.CSSProperties}
              >
                <div className={styles.discountsCell} data-col="tier">
                  <span className={styles.tierName}>{row.name}</span>
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

      {/* Sección de Beneficios por Categoría */}
      <section className={styles.benefitsSection}>
        <div className={styles.container}>
          <SectionHeader
            title="Compara beneficios General vs VIP"
            lead="Compara el alcance de cada ticket y elige la experiencia que mejor se ajuste a tu objetivo: asistir, conectar o vivir el evento con beneficios ampliados."
          />

          <div className={styles.mobileBenefitsExplorer}>
            <div className={styles.ticketTierSwitch} role="tablist" aria-label="Selecciona tipo de ticket">
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
                General
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
                VIP
              </button>
            </div>

            <div className={styles.mobileTierHeader} data-tier={activeTicketTier}>
              <div className={styles.mobileTierHeaderTop}>
                <div className={styles.mobileTierCoverage}>
                  Beneficios ({activeTicketMeta.count}/{totalBenefits})
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
                  Expandir todo
                </button>
                <button className={styles.textLink} onClick={collapseAll} data-track-name="colapsar_tabla_benefits_tickets">
                  <ChevronsUp size={16} />
                  Colapsar todo
                </button>
              </div>
            </div>

            <div className={styles.benefitsTable}>
              {BENEFITS_BY_CATEGORY.map((category, catIdx) => {
                const CategoryIcon = category.icon
                const benefitCount = category.items.length
                return (
                  <div
                    key={`mobile-${catIdx}`}
                    className={styles.categoryBlock}
                    style={{ '--category-color': category.color } as React.CSSProperties}
                  >
                    <button
                      type="button"
                      className={styles.mobileCategoryTitle}
                      onClick={() => toggleCategory(catIdx)}
                      aria-label={expandedCategories.includes(catIdx) ? 'Colapsar categoria' : 'Expandir categoria'}
                      aria-expanded={expandedCategories.includes(catIdx)}
                      data-track-name="toggle_categoria_benefits_tickets"
                    >
                      <div className={styles.mobileCategoryTitleMain}>
                        <CategoryIcon size={18} className={styles.mobileCategoryIcon} />
                        <span>{category.title}</span>
                        <span className={styles.mobileCategoryCount}>({benefitCount})</span>
                      </div>
                      {expandedCategories.includes(catIdx) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>

                    {expandedCategories.includes(catIdx) && (
                      <div className={styles.mobileBenefitList}>
                        {category.items.map((item, itemIdx) => (
                          <div key={`mobile-${catIdx}-${itemIdx}`} className={styles.mobileBenefitItem}>
                            <div className={styles.mobileBenefitLabel}>
                              {item.name}
                            </div>
                            <div className={styles.mobileBenefitStatus}>
                              {(activeTicketTier === 'general' ? item.general : item.vip) ? (
                                <div
                                  className={styles.mobileBenefitBadge}
                                  style={{ '--tier-color': activeTicketMeta.color } as React.CSSProperties}
                                  title="Incluido"
                                  aria-label="Incluido"
                                >
                                  <Check className={styles.mobileBenefitIcon} data-type={activeTicketTier} strokeWidth={3} />
                                </div>
                              ) : (
                                <div className={styles.mobileBenefitBadgeMuted} title="No incluido" aria-label="No incluido">
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

          <div className={styles.desktopBenefitsExplorer}>
            <div className={styles.tableControls}>
              <button
                className={styles.textLink}
                onClick={expandAll}
                data-track-name="expandir_tabla_benefits_tickets"
              >
                <ChevronsDown size={16} />
                Expandir todo
              </button>
              <button className={styles.textLink} onClick={collapseAll} data-track-name="colapsar_tabla_benefits_tickets">
                <ChevronsUp size={16} />
                Colapsar todo
              </button>
            </div>

            <div className={styles.benefitsTable}>
              {/* Header de la tabla con progress bars */}
              <div className={styles.tableHeader}>
                <div className={styles.tableHeaderCell} data-col="benefit">
                  <span>BENEFICIOS</span>
                </div>
                <div className={styles.tableHeaderCell} data-col="general">
                  <span className={styles.ticketTableLabel}>
                    <Ticket size={16} className={styles.ticketTableIcon} />
                    GENERAL
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
                    VIP
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

              {/* Categorías */}
              {BENEFITS_BY_CATEGORY.map((category, catIdx) => {
                const CategoryIcon = category.icon
                const benefitCount = category.items.length
                return (
                  <div
                    key={`desktop-${catIdx}`}
                    className={styles.categoryBlock}
                    style={{ '--category-color': category.color } as React.CSSProperties}
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
                        <span>{category.title}</span>
                        <span className={styles.benefitCount}>({benefitCount})</span>
                      </div>
                      <button
                        className={styles.toggleButton}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleCategory(catIdx)
                        }}
                        aria-label={expandedCategories.includes(catIdx) ? 'Colapsar' : 'Expandir'}
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
                              {item.name}
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
