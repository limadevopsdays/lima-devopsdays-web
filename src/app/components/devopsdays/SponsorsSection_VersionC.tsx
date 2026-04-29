import { ExternalLink, Heart, Users, Zap, TrendingUp, Target, Star, Building } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { sponsors, sponsorTiers, siteContent } from '../../data/mockContent'

const tierStyles: Record<string, { color: string; bg: string; icon: any }> = {
  platinum: { color: '#6B51EF', bg: '#faf5ff', icon: Star },
  gold: { color: '#f97316', bg: '#fff7ed', icon: Target },
  silver: { color: '#94a3b8', bg: '#f8fafc', icon: Building },
  community: { color: '#06b6d4', bg: '#ecfeff', icon: Heart },
}

export function SponsorsSectionVersionC() {
  return (
    <section id="sponsors" style={{ background: '#ffffff', padding: '5rem 0' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <SectionHeader
          eyebrow="Sponsors"
          eyebrowColor="#6B51EF"
          title="Empresas que hacen posible este evento"
          lead="Su apoyo nos permite mantener el evento accesible y de alta calidad para toda la comunidad DevOps de Perú y LATAM."
        />

        {/* Grid compacto de todos los tiers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', marginBottom: '4rem' }}>
          {sponsorTiers.map((tier) => {
            const group = sponsors.find((g) => g.tier === tier.id)
            const items = group?.items || []
            const style = tierStyles[tier.id]
            const Icon = style.icon

            // Config compacta por tier
            const config =
              tier.id === 'platinum'
                ? { cols: 'repeat(auto-fit, minmax(280px, 1fr))', logoH: '70px', padding: '2rem' }
                : tier.id === 'gold'
                ? { cols: 'repeat(auto-fit, minmax(180px, 1fr))', logoH: '55px', padding: '1.5rem' }
                : tier.id === 'silver'
                ? { cols: 'repeat(auto-fit, minmax(150px, 1fr))', logoH: '45px', padding: '1.25rem' }
                : { cols: 'repeat(auto-fit, minmax(120px, 1fr))', logoH: '35px', padding: '1rem' }

            return (
              <div key={tier.id}>
                {/* Tier header compacto */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1.25rem',
                    paddingBottom: '0.75rem',
                    borderBottom: `2px solid ${style.bg}`,
                  }}
                >
                  <Icon style={{ width: '1.25rem', height: '1.25rem', color: style.color }} />
                  <span
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 900,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      color: style.color,
                    }}
                  >
                    {tier.label}
                  </span>
                  {items.length > 0 && (
                    <span
                      style={{
                        fontSize: '0.75rem',
                        padding: '0.125rem 0.5rem',
                        borderRadius: '9999px',
                        background: style.bg,
                        color: style.color,
                        fontWeight: 700,
                      }}
                    >
                      {items.length}
                    </span>
                  )}
                </div>

                {items.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: config.cols, gap: '1.25rem' }}>
                    {items.map((sponsor, idx) => (
                      <a
                        key={idx}
                        href={sponsor.href || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: config.padding,
                          borderRadius: '0.75rem',
                          background: style.bg,
                          border: `2px solid transparent`,
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                          cursor: 'pointer',
                          minHeight: '100px',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = style.color
                          e.currentTarget.style.background = '#ffffff'
                          e.currentTarget.style.transform = 'translateY(-0.125rem)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'transparent'
                          e.currentTarget.style.background = style.bg
                          e.currentTarget.style.transform = 'translateY(0)'
                        }}
                      >
                        {sponsor.logo ? (
                          <img
                            src={sponsor.logo}
                            alt={`Logo ${sponsor.name}`}
                            style={{
                              maxHeight: config.logoH,
                              maxWidth: '100%',
                              width: 'auto',
                              height: 'auto',
                              objectFit: 'contain',
                              filter: 'grayscale(60%)',
                              opacity: 0.8,
                              transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.filter = 'grayscale(0%)'
                              e.currentTarget.style.opacity = '1'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.filter = 'grayscale(60%)'
                              e.currentTarget.style.opacity = '0.8'
                            }}
                          />
                        ) : (
                          <span style={{ fontSize: '0.875rem', fontWeight: 900, color: style.color }}>
                            {sponsor.name}
                          </span>
                        )}
                      </a>
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '2rem 1rem',
                      borderRadius: '0.75rem',
                      background: style.bg,
                      border: `2px dashed ${style.color}`,
                      opacity: 0.5,
                    }}
                  >
                    <p style={{ fontSize: '0.75rem', color: style.color, fontWeight: 600 }}>
                      Próximamente disponible
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Banner: ¿Por qué patrocinar? CON IMÁGENES + OVERLAY */}
        <div
          style={{
            borderRadius: '1.5rem',
            overflow: 'hidden',
            marginBottom: '3rem',
            position: 'relative',
            minHeight: '500px',
          }}
        >
          {/* Grid de 3 imágenes de fondo */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0',
            }}
          >
            <div style={{ background: '#f1f5f9' }}>
              <img
                src="/images/sponsors/event-photo-1.jpg"
                alt="Evento DevOpsDays Lima"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ background: '#f1f5f9' }}>
              <img
                src="/images/sponsors/event-photo-2.jpg"
                alt="Networking sponsors"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ background: '#f1f5f9' }}>
              <img
                src="/images/sponsors/event-photo-3.jpg"
                alt="Stands patrocinadores"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Overlay morado */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.92) 0%, rgba(167, 139, 250, 0.88) 100%)',
              zIndex: 1,
            }}
          />

          {/* Contenido encima */}
          <div style={{ position: 'relative', zIndex: 2, padding: '3.5rem 2.5rem' }}>
            <div style={{ maxWidth: '700px', marginBottom: '2.5rem' }}>
              <h3
                style={{
                  fontSize: '2.25rem',
                  fontWeight: 900,
                  color: '#ffffff',
                  marginBottom: '1.25rem',
                  lineHeight: 1.2,
                }}
              >
                ¿Por qué patrocinar DevOpsDays Lima?
              </h3>
              <p
                style={{
                  fontSize: '1.125rem',
                  color: '#ffffff',
                  lineHeight: 1.7,
                  opacity: 0.95,
                }}
              >
                Llega a más de <strong>+800 tomadores de decisión</strong>, ingenieros y líderes tech en un solo lugar.
                DevOpsDays Lima es la conferencia DevOps líder de la comunidad peruana — dos días de charlas reales,
                personas reales e impacto real.
              </p>
            </div>

            {/* Stats en cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1.25rem',
              }}
            >
              <div
                style={{
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <Users style={{ width: '1.75rem', height: '1.75rem', color: '#ffffff', marginBottom: '0.75rem' }} />
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff', marginBottom: '0.25rem' }}>
                  +800
                </div>
                <div style={{ fontSize: '0.875rem', color: '#ffffff', opacity: 0.9 }}>
                  Asistentes confirmados
                </div>
              </div>

              <div
                style={{
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <Zap style={{ width: '1.75rem', height: '1.75rem', color: '#ffffff', marginBottom: '0.75rem' }} />
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff', marginBottom: '0.25rem' }}>
                  2 días
                </div>
                <div style={{ fontSize: '0.875rem', color: '#ffffff', opacity: 0.9 }}>De networking intenso</div>
              </div>

              <div
                style={{
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <TrendingUp
                  style={{ width: '1.75rem', height: '1.75rem', color: '#ffffff', marginBottom: '0.75rem' }}
                />
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff', marginBottom: '0.25rem' }}>
                  100%
                </div>
                <div style={{ fontSize: '0.875rem', color: '#ffffff', opacity: 0.9 }}>
                  Líderes y tomadores de decisión
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA final */}
        <div
          style={{
            borderRadius: '1.5rem',
            padding: '2.5rem 2rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
            border: '2px solid #fde68a',
          }}
        >
          <Heart style={{ width: '2rem', height: '2rem', margin: '0 auto 1rem', color: '#f59e0b' }} />
          <h3 style={{ fontWeight: 900, fontSize: '1.5rem', marginBottom: '0.75rem', color: '#0f172a' }}>
            ¿Tu empresa quiere ser parte?
          </h3>
          <p
            style={{
              fontSize: '0.875rem',
              marginBottom: '1.5rem',
              maxWidth: '40rem',
              margin: '0 auto 1.5rem',
              color: '#64748b',
              lineHeight: 1.7,
            }}
          >
            Llega a cientos de ingenieros, SREs y líderes técnicos de Perú y Latinoamérica. Disponible en tiers
            Platinum, Gold, Silver y Community.
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <a
              href="/sponsors"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 1.75rem',
                borderRadius: '0.75rem',
                fontWeight: 900,
                fontSize: '0.875rem',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                background: '#f59e0b',
                color: '#ffffff',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-0.25rem)'
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(245, 158, 11, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Ver propuesta de sponsorship
              <ExternalLink style={{ width: '1rem', height: '1rem' }} />
            </a>
            <a
              href={`mailto:${siteContent.sponsorContactEmail}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 1.75rem',
                borderRadius: '0.75rem',
                fontWeight: 900,
                fontSize: '0.875rem',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                border: '2px solid #fde68a',
                color: '#b45309',
                background: '#ffffff',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#f59e0b'
                e.currentTarget.style.background = '#fffbeb'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#fde68a'
                e.currentTarget.style.background = '#ffffff'
              }}
            >
              {siteContent.sponsorContactEmail}
            </a>
          </div>
        </div>
      </div>

      {/* Responsive para grid de imágenes */}
      <style>{`
        @media (max-width: 768px) {
          #sponsors [style*="gridTemplateColumns: repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
