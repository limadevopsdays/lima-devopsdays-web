import { ExternalLink, Heart, Users, Zap, TrendingUp, Award } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { sponsors, sponsorTiers, siteContent } from '../../data/mockContent'

const tierStyles: Record<string, { color: string; bg: string; border: string }> = {
  platinum: { color: '#7c3aed', bg: '#faf5ff', border: '#e9d5ff' },
  gold: { color: '#f97316', bg: '#fff7ed', border: '#fed7aa' },
  silver: { color: '#94a3b8', bg: '#f8fafc', border: '#e2e8f0' },
  community: { color: '#06b6d4', bg: '#ecfeff', border: '#cffafe' },
}

export function SponsorsSectionVersionB() {
  const platinumGroup = sponsors.find((g) => g.tier === 'platinum')
  const platinumItems = platinumGroup?.items || []

  const otherTiers = sponsorTiers.filter((t) => t.id !== 'platinum')

  return (
    <section id="sponsors" style={{ background: '#f8fafc', padding: '6rem 0' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <SectionHeader
          eyebrow="Sponsors"
          eyebrowColor="#7c3aed"
          title="Empresas que hacen posible este evento"
          lead="Su apoyo nos permite mantener el evento accesible y de alta calidad para toda la comunidad DevOps de Perú y LATAM."
        />

        {/* PLATINUM HERO SECTION */}
        {platinumItems.length > 0 && (
          <div
            style={{
              borderRadius: '1.5rem',
              padding: '3rem',
              marginBottom: '4rem',
              background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
              border: '2px solid #e9d5ff',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Badge Platinum */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <Award style={{ width: '1.5rem', height: '1.5rem', color: '#7c3aed', marginRight: '0.5rem' }} />
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 900,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#7c3aed',
                }}
              >
                Platinum Sponsor
              </span>
            </div>

            {/* Grid de Platinum */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                maxWidth: '900px',
                margin: '0 auto',
              }}
            >
              {platinumItems.map((sponsor, idx) => (
                <a
                  key={idx}
                  href={sponsor.href || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '3.5rem 2.5rem',
                    borderRadius: '1.25rem',
                    background: '#ffffff',
                    border: '3px solid #e9d5ff',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    minHeight: '200px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-0.5rem) scale(1.02)'
                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(124, 58, 237, 0.2)'
                    e.currentTarget.style.borderColor = '#7c3aed'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.borderColor = '#e9d5ff'
                  }}
                >
                  {sponsor.logo ? (
                    <img
                      src={sponsor.logo}
                      alt={`Logo ${sponsor.name}`}
                      style={{
                        maxHeight: '100px',
                        maxWidth: '100%',
                        width: 'auto',
                        height: 'auto',
                        objectFit: 'contain',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#7c3aed' }}>{sponsor.name}</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* OTROS TIERS: Gold, Silver, Community */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginBottom: '4rem' }}>
          {otherTiers.map((tier) => {
            const group = sponsors.find((g) => g.tier === tier.id)
            const items = group?.items || []
            const style = tierStyles[tier.id]

            const gridCols =
              tier.id === 'gold'
                ? 'repeat(auto-fit, minmax(200px, 1fr))'
                : tier.id === 'silver'
                ? 'repeat(auto-fit, minmax(170px, 1fr))'
                : 'repeat(auto-fit, minmax(140px, 1fr))'

            const logoHeight = tier.id === 'gold' ? '65px' : tier.id === 'silver' ? '50px' : '40px'

            return (
              <div key={tier.id}>
                {/* Tier label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ height: '1px', flex: 1, background: '#e2e8f0' }} />
                  <span
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.375rem 1rem',
                      borderRadius: '9999px',
                      fontWeight: 900,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      background: style.bg,
                      border: `1.5px solid ${style.border}`,
                      color: style.color,
                    }}
                  >
                    {tier.label}
                  </span>
                  <div style={{ height: '1px', flex: 1, background: '#e2e8f0' }} />
                </div>

                {items.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: gridCols, gap: '1.5rem' }}>
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
                          padding: '2rem',
                          borderRadius: '1rem',
                          background: '#ffffff',
                          border: `2px solid ${style.border}`,
                          textDecoration: 'none',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          minHeight: '120px',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-0.25rem)'
                          e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)'
                          e.currentTarget.style.borderColor = style.color
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)'
                          e.currentTarget.style.boxShadow = 'none'
                          e.currentTarget.style.borderColor = style.border
                        }}
                      >
                        {sponsor.logo ? (
                          <img
                            src={sponsor.logo}
                            alt={`Logo ${sponsor.name}`}
                            style={{
                              maxHeight: logoHeight,
                              maxWidth: '100%',
                              width: 'auto',
                              height: 'auto',
                              objectFit: 'contain',
                              filter: 'grayscale(100%)',
                              opacity: 0.7,
                              transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.filter = 'grayscale(0%)'
                              e.currentTarget.style.opacity = '1'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.filter = 'grayscale(100%)'
                              e.currentTarget.style.opacity = '0.7'
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
                      padding: '2.5rem 1rem',
                      borderRadius: '1rem',
                      background: '#ffffff',
                      border: `2px dashed ${style.border}`,
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

        {/* Banner: ¿Por qué patrocinar? CON GRID 3 COLUMNAS */}
        <div
          style={{
            borderRadius: '1.5rem',
            overflow: 'hidden',
            background: '#ffffff',
            border: '2px solid #e9d5ff',
            marginBottom: '3rem',
          }}
        >
          {/* Contenido superior */}
          <div style={{ padding: '3rem', background: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)' }}>
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
                marginBottom: '2rem',
                maxWidth: '700px',
              }}
            >
              Llega a más de <strong>+800 tomadores de decisión</strong>, ingenieros y líderes tech en un solo lugar.
              DevOpsDays Lima es la conferencia DevOps líder de la comunidad peruana — dos días de charlas reales,
              personas reales e impacto real.
            </p>

            {/* Stats inline */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
              <div>
                <Users style={{ width: '1.5rem', height: '1.5rem', color: '#ffffff', marginBottom: '0.5rem' }} />
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff' }}>+800</div>
                <div style={{ fontSize: '0.875rem', color: '#ffffff', opacity: 0.9 }}>Asistentes</div>
              </div>
              <div>
                <Zap style={{ width: '1.5rem', height: '1.5rem', color: '#ffffff', marginBottom: '0.5rem' }} />
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff' }}>2 días</div>
                <div style={{ fontSize: '0.875rem', color: '#ffffff', opacity: 0.9 }}>De conferencia</div>
              </div>
              <div>
                <TrendingUp style={{ width: '1.5rem', height: '1.5rem', color: '#ffffff', marginBottom: '0.5rem' }} />
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff' }}>100%</div>
                <div style={{ fontSize: '0.875rem', color: '#ffffff', opacity: 0.9 }}>Líderes tech</div>
              </div>
            </div>
          </div>

          {/* Grid de 3 imágenes abajo */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0' }}>
            <div style={{ aspectRatio: '4/3', background: '#f1f5f9' }}>
              <img
                src="/images/sponsors/event-photo-1.jpg"
                alt="Sponsors stands"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ aspectRatio: '4/3', background: '#f1f5f9' }}>
              <img
                src="/images/sponsors/event-photo-2.jpg"
                alt="Networking"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ aspectRatio: '4/3', background: '#f1f5f9' }}>
              <img
                src="/images/sponsors/event-photo-3.jpg"
                alt="Stand de patrocinadores"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
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
