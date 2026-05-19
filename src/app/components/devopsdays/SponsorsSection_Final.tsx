import { ExternalLink, Award, Users, Zap, TrendingUp, Heart } from 'lucide-react'
import { SectionHeader } from './SectionHeader'
import { sponsors, siteContent } from '../../data/mockContent'

export function SponsorsSectionFinal() {
  const platinumGroup = sponsors.find((g) => g.tier === 'platinum')
  const platinumItems = platinumGroup?.items || []

  const eventPhotos = [
    'https://images.unsplash.com/photo-1746937618165-c8dc7f11dd77?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1751917272106-23e3de73bf2f?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1702532650709-6c9b4acec2f1?w=1200&h=800&fit=crop',
  ]

  return (
    <section id="sponsors" style={{ background: '#f8fafc', padding: '6rem 0 0 0' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem 3rem 1.5rem' }}>
        <SectionHeader
          eyebrow="Sponsors"
          eyebrowColor="#6B51EF"
          title="Empresas que hacen posible este evento"
          lead="Su apoyo nos permite mantener el evento accesible y de alta calidad para toda la comunidad DevOps de Perú y LATAM."
        />

        {/* PLATINUM HERO SECTION - Solo Dynatrace */}
        {platinumItems.length > 0 && (
          <div
            style={{
              borderRadius: '1.5rem',
              padding: '3rem',
              marginBottom: '0',
              background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
              border: '2px solid #e9d5ff',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Badge Platinum */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <Award style={{ width: '1.5rem', height: '1.5rem', color: '#6B51EF', marginRight: '0.5rem' }} />
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 900,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#6B51EF',
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
                    e.currentTarget.style.borderColor = '#6B51EF'
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
                    <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#6B51EF' }}>{sponsor.name}</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3 IMÁGENES SIN CONTENEDOR - Full width directo */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0',
          marginBottom: '0',
        }}
      >
        {eventPhotos.map((src, i) => (
          <div key={i} style={{ aspectRatio: '16/10', background: '#f1f5f9', overflow: 'hidden' }}>
            <img
              src={src}
              alt={`Evento DevOpsDays Lima ${i + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        ))}
      </div>

      {/* BANNER ESTILO SPEAKERS - ¿Por qué patrocinar? */}
      <div style={{ background: '#ffffff', padding: '3rem 0' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <div
            style={{
              borderRadius: '1rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Imagen de fondo */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${eventPhotos[1]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: 1,
                zIndex: 0,
              }}
            />

            {/* Overlay morado para legibilidad */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.92) 0%, rgba(167, 139, 250, 0.88) 100%)',
                zIndex: 1,
              }}
            />

            {/* Contenido */}
            <div style={{ position: 'relative', padding: '1.5rem', zIndex: 2 }}>
              <div
                className="sponsor-banner-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '1.5rem',
                  height: '100%',
                }}
              >
                {/* Columna izquierda: Contenido principal */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div>
                    {/* Badge "PATROCINIO ABIERTO" */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <div
                        style={{
                          width: '0.75rem',
                          height: '0.75rem',
                          borderRadius: '9999px',
                          background: '#10b981',
                          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        }}
                      />
                      <span
                        style={{
                          fontSize: '0.75rem',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          fontWeight: 900,
                          color: '#ffffff',
                        }}
                      >
                        PATROCINIO DISPONIBLE
                      </span>
                    </div>

                    <h2
                      style={{
                        fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                        fontWeight: 900,
                        marginBottom: '0.75rem',
                        color: '#ffffff',
                        lineHeight: 1.2,
                      }}
                    >
                      ¿Por qué patrocinar DevOpsDays Lima?
                    </h2>

                    <p
                      style={{
                        fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
                        marginBottom: '1rem',
                        maxWidth: '48rem',
                        color: '#ffffff',
                        opacity: 0.95,
                        lineHeight: 1.7,
                      }}
                    >
                      Llega a más de <strong>+800 tomadores de decisión</strong>, ingenieros y líderes tech en un solo
                      lugar. DevOpsDays Lima es la conferencia DevOps líder de la comunidad peruana — dos días de charlas
                      reales, personas reales e impacto real.
                    </p>

                    {/* Stats inline */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '1.5rem',
                        marginBottom: '1rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Users style={{ width: '1.25rem', height: '1.25rem', color: '#ffffff' }} />
                        <div>
                          <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff' }}>+800</span>
                          <span style={{ fontSize: '0.875rem', color: '#ffffff', opacity: 0.9, marginLeft: '0.25rem' }}>
                            Asistentes
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Zap style={{ width: '1.25rem', height: '1.25rem', color: '#ffffff' }} />
                        <div>
                          <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff' }}>2 días</span>
                          <span style={{ fontSize: '0.875rem', color: '#ffffff', opacity: 0.9, marginLeft: '0.25rem' }}>
                            De conferencia
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <TrendingUp style={{ width: '1.25rem', height: '1.25rem', color: '#ffffff' }} />
                        <div>
                          <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff' }}>100%</span>
                          <span style={{ fontSize: '0.875rem', color: '#ffffff', opacity: 0.9, marginLeft: '0.25rem' }}>
                            Líderes tech
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Tiers disponibles */}
                    <p
                      style={{
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontWeight: 700,
                        marginBottom: '0.5rem',
                        color: '#ffffff',
                        opacity: 0.7,
                      }}
                    >
                      Tiers Disponibles
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {['Platinum', 'Gold', 'Silver', 'Community'].map((tier, idx) => {
                        const colors = ['#e9d5ff', '#fed7aa', '#e2e8f0', '#cffafe']
                        return (
                          <span
                            key={idx}
                            style={{
                              fontSize: '0.75rem',
                              padding: '0.375rem 0.75rem',
                              borderRadius: '0.5rem',
                              fontWeight: 700,
                              background: 'transparent',
                              color: '#ffffff',
                              border: `2px solid ${colors[idx]}`,
                              cursor: 'default',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            {tier}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Columna derecha: CTA */}
                <div
                  className="sponsor-banner-cta"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    justifyContent: 'center',
                  }}
                >
                  <a
                    href="/sponsors"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '1rem 2rem',
                      borderRadius: '0.75rem',
                      fontWeight: 900,
                      fontSize: '1rem',
                      background: '#f59e0b',
                      color: '#ffffff',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-0.25rem)'
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.6)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 4px 14px rgba(245, 158, 11, 0.4)'
                    }}
                  >
                    <Heart style={{ width: '1.25rem', height: '1.25rem' }} />
                    Ver propuesta
                  </a>

                  <div>
                    <p style={{ fontSize: '0.875rem', marginBottom: '0.25rem', color: '#ffffff', opacity: 0.9 }}>
                      Contáctanos: <strong>{siteContent.sponsorContactEmail}</strong>
                    </p>
                    <a
                      href={`mailto:${siteContent.sponsorContactEmail}`}
                      style={{
                        fontSize: '0.75rem',
                        color: '#ffffff',
                        opacity: 0.75,
                        textDecoration: 'underline',
                        transition: 'opacity 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '1'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '0.75'
                      }}
                    >
                      Enviar email
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Media query para desktop */}
            <style>{`
              @media (min-width: 1024px) {
                .sponsor-banner-grid {
                  grid-template-columns: 1fr auto !important;
                  gap: 2rem !important;
                }
                .sponsor-banner-cta {
                  text-align: right !important;
                  align-items: flex-end !important;
                }
              }
              
              /* Animación de pulso para badge */
              @keyframes pulse {
                0%, 100% {
                  opacity: 1;
                  transform: scale(1);
                }
                50% {
                  opacity: 0.7;
                  transform: scale(0.95);
                }
              }

              /* Responsive para imágenes en mobile */
              @media (max-width: 768px) {
                #sponsors > div:nth-child(2) {
                  grid-template-columns: 1fr !important;
                }
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  )
}
