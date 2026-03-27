import { Crown, Ticket, Zap, Clock, MapPin } from 'lucide-react'
import { Link } from 'react-router'
import { SectionHeader } from './SectionHeader'
import styles from './TicketsSection.module.css'
import { isTicketSaleOpen, TICKET_SALE_START_LABEL } from '../../lib/tickets'
import { TICKETS_REGISTER_URL } from '../../data/mockContent'
import hummingbirdBg from 'figma:asset/9c8f57f0fc822b0d19c16eaaa81441ccf07debb9.png'

const GENERAL_IMAGE = hummingbirdBg
const VIP_IMAGE = hummingbirdBg
const HUMMINGBIRD_MARK = '/images/tickets/colibri.png'

type TicketsSectionProps = {
  variant?: 'home' | 'page'
}

export function TicketsSection({ variant = 'home' }: TicketsSectionProps) {
  const WrapperTag = variant === 'page' ? 'section' : 'div'
  const pricingAnnounced = isTicketSaleOpen()

  return (
    <WrapperTag
      id="tickets"
      className={variant === 'page' ? `${styles.section} ${styles.sectionPage}`.trim() : styles.sectionHome}
    >
      <div className={styles.container}>
        <SectionHeader 
          eyebrow={variant === 'page' ? undefined : 'Tickets'}
          eyebrowColor={variant === 'page' ? undefined : '#7c3aed'}
          title="Elige el ticket ideal para tu experiencia"
          lead="Dos modalidades pensadas para distintos niveles de acceso y networking. Ambos tickets te conectan con la comunidad DevOps. El ticket VIP amplía la experiencia con beneficios premium."
        />

        <div className={styles.ticketsGrid}>
          {/* ENTRADA VIP */}
          <a
            href={TICKETS_REGISTER_URL}
            target="_blank"
            rel="noreferrer"
            className={styles.ticketWrapper}
            data-type="vip"
            aria-label="Comprar ticket VIP"
            data-track-name={variant === 'page' ? 'ver_ticket_vip_tickets_section_tickets' : 'ver_ticket_vip_tickets_section_home'}
          >
            <div className={styles.ticketCard}>
              {/* Perforaciones arriba y abajo (ticket horizontal) */}
              <div className={styles.perforations} data-side="top"></div>
              <div className={styles.perforations} data-side="bottom"></div>
              
              {/* Container flex horizontal */}
              <div className={styles.ticketContent}>
                {/* IZQUIERDA: Header del ticket */}
                <div className={styles.ticketHeader}>
                  <div 
                    className={styles.ticketHeaderBg}
                    style={{ backgroundImage: `url(${VIP_IMAGE})` }}
                  ></div>
                  <div
                    className={styles.ticketHeaderMark}
                    style={{ backgroundImage: `url(${HUMMINGBIRD_MARK})` }}
                    aria-hidden="true"
                  ></div>
                  <div className={styles.ticketHeaderOverlay}></div>
                  
                  <div className={styles.ticketEvent}>
                    <div className={styles.ticketLogo}>DevOpsDays</div>
                    <div className={styles.ticketLocation}>
                      <MapPin className={styles.ticketIcon} />
                      <div className={styles.ticketLocationText}>
                        <span>Lima Centro de Convenciones</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.ticketMeta}>
                    <div className={styles.ticketDate}>
                      <div className={styles.ticketDateDay}>27-28</div>
                      <div className={styles.ticketDateMonth}>AGO 2026</div>
                    </div>
                    <div className={styles.ticketType} data-color="vip">
                      <Crown className={styles.ticketTypeIcon} />
                      <span>VIP</span>
                    </div>
                  </div>
                </div>

                {/* DERECHA: Pricing compacto */}
                <div className={styles.ticketPricing}>
                  {!pricingAnnounced && (
                    <div className={styles.comingSoonBlock}>
                      <div className={styles.priceStamp} data-color="vip">
                        PRÓXIMAMENTE
                      </div>
                      <div className={styles.priceValidity}>
                        <Clock className={styles.validityIcon} />
                        Inicio de venta: {TICKET_SALE_START_LABEL}
                      </div>
                    </div>
                  )}

                  {pricingAnnounced && (
                    <>
                      <div className={styles.priceBadge} data-color="vip">
                        <Zap className={styles.priceBadgeIcon} />
                        <span>EARLY BIRD</span>
                        <span className={styles.discountBadge}>-20%</span>
                      </div>

                      <div className={styles.priceGroup}>
                        <div className={styles.priceMain} data-color="vip">$119.90</div>
                        <div className={styles.priceStrikethrough}>$149.90</div>
                      </div>
                      
                      <div className={styles.priceValidity}>
                        <Clock className={styles.validityIcon} />
                        Venta iniciada: {TICKET_SALE_START_LABEL}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </a>

          {/* ENTRADA GENERAL */}
          <a
            href={TICKETS_REGISTER_URL}
            target="_blank"
            rel="noreferrer"
            className={styles.ticketWrapper}
            data-type="general"
            aria-label="Comprar ticket General"
            data-track-name={variant === 'page' ? 'ver_ticket_general_tickets_section_tickets' : 'ver_ticket_general_tickets_section_home'}
          >
            <div className={styles.ticketCard}>
              {/* Perforaciones arriba y abajo (ticket horizontal) */}
              <div className={styles.perforations} data-side="top"></div>
              <div className={styles.perforations} data-side="bottom"></div>
              
              {/* Container flex horizontal */}
              <div className={styles.ticketContent}>
                {/* IZQUIERDA: Header del ticket */}
                <div className={styles.ticketHeader}>
                  <div 
                    className={styles.ticketHeaderBg}
                    style={{ backgroundImage: `url(${GENERAL_IMAGE})` }}
                  ></div>
                  <div
                    className={styles.ticketHeaderMark}
                    style={{ backgroundImage: `url(${HUMMINGBIRD_MARK})` }}
                    aria-hidden="true"
                  ></div>
                  <div className={styles.ticketHeaderOverlay}></div>
                  
                  <div className={styles.ticketEvent}>
                    <div className={styles.ticketLogo}>DevOpsDays</div>
                    <div className={styles.ticketLocation}>
                      <MapPin className={styles.ticketIcon} />
                      <div className={styles.ticketLocationText}>
                        <span>Lima Centro de Convenciones</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.ticketMeta}>
                    <div className={styles.ticketDate}>
                      <div className={styles.ticketDateDay}>27-28</div>
                      <div className={styles.ticketDateMonth}>AGO 2026</div>
                    </div>
                    <div className={styles.ticketType} data-color="general">
                      <Ticket className={styles.ticketTypeIcon} />
                      <span>GENERAL</span>
                    </div>
                  </div>
                </div>

                {/* DERECHA: Pricing compacto */}
                <div className={styles.ticketPricing}>
                  {!pricingAnnounced && (
                    <div className={styles.comingSoonBlock}>
                      <div className={styles.priceStamp} data-color="general">
                        PRÓXIMAMENTE
                      </div>
                      <div className={styles.priceValidity}>
                        <Clock className={styles.validityIcon} />
                        Inicio de venta: {TICKET_SALE_START_LABEL}
                      </div>
                    </div>
                  )}

                  {pricingAnnounced && (
                    <>
                      <div className={styles.priceBadge} data-color="general">
                        <Zap className={styles.priceBadgeIcon} />
                        <span>EARLY BIRD</span>
                        <span className={styles.discountBadge}>-30%</span>
                      </div>

                      <div className={styles.priceGroup}>
                        <div className={styles.priceMain} data-color="general">$69.90</div>
                        <div className={styles.priceStrikethrough}>$99.90</div>
                      </div>
                      
                      <div className={styles.priceValidity}>
                        <Clock className={styles.validityIcon} />
                        Venta iniciada: {TICKET_SALE_START_LABEL}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </a>
        </div>

        {variant === 'home' && (
          <div className={styles.secondaryPageCta}>
            <Link
              to="/tickets"
              className={styles.secondaryPageButton}
              data-track-name="ver_detalles_tickets_section_home"
            >
              Ver detalles y beneficios de tickets
            </Link>
          </div>
        )}

        {/* DIVIDER */}
        <div className={styles.divider}></div>
      </div>
    </WrapperTag>
  )
}
