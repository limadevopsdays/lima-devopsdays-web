import { ExternalLink, Heart, Users, Zap, TrendingUp } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { sponsors, sponsorTiers, siteContent } from '../../data/mockContent'

// Estilos minimalistas por tier
const tierStyles: Record<string, { color: string; badge: string }> = {
  platinum: { color: '#6B51EF', badge: '#f3e8ff' },
  gold: { color: '#f97316', badge: '#ffedd5' },
  silver: { color: '#94a3b8', badge: '#f1f5f9' },
  community: { color: '#06b6d4', badge: '#cffafe' },
}

// Grid configs minimalistas
const tierGridConfig: Record<string, { logoHeight: string; cols: number }> = {
  platinum: { logoHeight: '90px', cols: 2 },
  gold: { logoHeight: '70px', cols: 3 },
  silver: { logoHeight: '55px', cols: 4 },
  community: { logoHeight: '45px', cols: 5 },
}

export function SponsorsSectionVersionA() {
  return (
    <section id="sponsors" style={{ background: '#ffffff', padding: '6rem 0' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <SectionHeader
          eyebrow="Sponsors"
          eyebrowColor="#6B51EF"
          title="Empresas que hacen posible este evento"
          lead="Su apoyo nos permite mantener el evento accesible y de alta calidad para toda la comunidad DevOps de Perú y LATAM."
        />

        {/* Tier grids - Ultra limpio */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', marginBottom: '5rem' }}>
          {sponsorTiers.map((tier) => {
            const group = sponsors.find((g) => g.tier === tier.id)
            const items = group?.items || []
            const style = tierStyles[tier.id]
            const config = tierGridConfig[tier.id]

            return (
              <div key={tier.id}>
                {/* Tier badge centrado */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '0.625rem',
                      padding: '0.375rem 1.25rem',
                      borderRadius: '9999px',
                      fontWeight: 900,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      background: style.badge,
                      color: style.color,
                    }}
                  >
                    {tier.label}
                  </span>
                </div>

                {items.length > 0 ? (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(auto-fit, minmax(${280 / config.cols}px, 1fr))`,
                      gap: '2rem',
                      maxWidth: tier.id === 'platinum' ? '800px' : '100%',
                      margin: '0 auto',
                    }}
                  >
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
                          padding: tier.id === 'platinum' ? '3rem' : '2rem',
                          borderRadius: '1.25rem',
                          background: '#ffffff',
                          border: 'none',
                          textDecoration: 'none',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          cursor: 'pointer',
                          minHeight: tier.id === 'platinum' ? '180px' : '140px',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-0.5rem)'
                          e.currentTarget.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.08)`
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)'
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.03)'
                        }}
                      >
                        {sponsor.logo ? (
                          <img
                            src={sponsor.logo}
                            alt={`Logo ${sponsor.name}`}
                            style={{
                              maxHeight: config.logoHeight,
                              maxWidth: '100%',
                              width: 'auto',
                              height: 'auto',
                              objectFit: 'contain',
                              filter: 'grayscale(40%)',
                              opacity: 0.85,
                              transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.filter = 'grayscale(0%)'
                              e.currentTarget.style.opacity = '1'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.filter = 'grayscale(40%)'
                              e.currentTarget.style.opacity = '0.85'
                            }}
                          />
                        ) : (
                          <span style={{ fontSize: '1.125rem', fontWeight: 900, color: style.color }}>
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
                      padding: '3rem 1rem',
                      borderRadius: '1.25rem',
                      background: '#f8fafc',
                      border: '2px dashed #e2e8f0',
                    }}
                  >
                    <p style={{ fontSize: '0.875rem', color: '#94a3b8', fontWeight: 500 }}>
                      Slots disponibles • Próximamente…
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Banner: ¿Por qué patrocinar? */}
        <div
          style={{
            borderRadius: '1.5rem',
            padding: '3rem',
            background: 'linear-gradient(135deg, #6B51EF 0%, #a78bfa 100%)',
            marginBottom: '3rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Contenido */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ maxWidth: '700px', marginBottom: '2.5rem' }}>
              <h3
                style={{
                  fontSize: '2rem',
                  fontWeight: 900,
                  color: '#ffffff',
                  marginBottom: '1rem',
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

            {/* Galería horizontal de 3 imágenes */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem',
              }}
            >
              <div
                style={{
                  borderRadius: '0.75rem',
                  overflow: 'hidden',
                  aspectRatio: '16/10',
                  background: '#ffffff',
                }}
              >
                <img
                  src="/images/sponsors/event-photo-1.jpg"
                  alt="Sponsors stands en DevOpsDays Lima"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div
                style={{
                  borderRadius: '0.75rem',
                  overflow: 'hidden',
                  aspectRatio: '16/10',
                  background: '#ffffff',
                }}
              >
                <img
                  src="/images/sponsors/event-photo-2.jpg"
                  alt="Networking con patrocinadores"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div
                style={{
                  borderRadius: '0.75rem',
                  overflow: 'hidden',
                  aspectRatio: '16/10',
                  background: '#ffffff',
                }}
              >
                <img
                  src="/images/sponsors/event-photo-3.jpg"
                  alt="Stand de patrocinadores"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Stats rápidos */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem',
              }}
            >
              <div>
                <Users style={{ width: '1.5rem', height: '1.5rem', color: '#ffffff', marginBottom: '0.5rem' }} />
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#ffffff' }}>+800</div>
                <div style={{ fontSize: '0.875rem', color: '#ffffff', opacity: 0.9 }}>Asistentes</div>
              </div>
              <div>
                <Zap style={{ width: '1.5rem', height: '1.5rem', color: '#ffffff', marginBottom: '0.5rem' }} />
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#ffffff' }}>2 días</div>
                <div style={{ fontSize: '0.875rem', color: '#ffffff', opacity: 0.9 }}>De conferencia</div>
              </div>
              <div>
                <TrendingUp style={{ width: '1.5rem', height: '1.5rem', color: '#ffffff', marginBottom: '0.5rem' }} />
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#ffffff' }}>100%</div>
                <div style={{ fontSize: '0.875rem', color: '#ffffff', opacity: 0.9 }}>Líderes tech</div>
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
    </section>
  )
}
