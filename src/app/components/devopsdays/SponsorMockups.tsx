import { useState } from 'react'

export function SponsorMockups() {
  const [hoveredOption, setHoveredOption] = useState<number | null>(null)

  const logoUrl = "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"

  return (
    <div style={{ padding: '4rem 2rem', background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '90rem', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '1rem', textAlign: 'center' }}>
          Platinum Sponsor - Mockups de efectos
        </h1>
        <p style={{ fontSize: '1rem', color: '#64748b', marginBottom: '4rem', textAlign: 'center', maxWidth: '48rem', margin: '0 auto 4rem' }}>
          Pasa el mouse sobre cada opción para ver el efecto hover
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
          
          {/* OPCIÓN 1: Border Glow */}
          <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '1rem', border: '2px solid #e2e8f0' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Opción 1
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', marginTop: '0.5rem' }}>
                Border Glow
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
                Border cambia a turquesa vibrante
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  background: hoveredOption === 1 ? '#ffffff' : '#f8fafc',
                  padding: '2rem 3rem',
                  borderRadius: '1rem',
                  display: 'inline-block',
                  border: hoveredOption === 1 ? '3px solid #06b6d4' : '2px solid #e2e8f0',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHoveredOption(1)}
                onMouseLeave={() => setHoveredOption(null)}
              >
                <img
                  src={logoUrl}
                  alt="AWS Logo"
                  style={{
                    maxHeight: '80px',
                    width: 'auto',
                    display: 'block',
                    transform: hoveredOption === 1 ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </div>
            </div>
          </div>

          {/* OPCIÓN 2: Double Border */}
          <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '1rem', border: '2px solid #e2e8f0' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Opción 2
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', marginTop: '0.5rem' }}>
                Double Border
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
                Border doble turquesa + morado
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  background: hoveredOption === 2 ? '#ffffff' : '#f8fafc',
                  padding: '2rem 3rem',
                  borderRadius: '1rem',
                  display: 'inline-block',
                  border: hoveredOption === 2 ? '3px solid #06b6d4' : '2px solid #e2e8f0',
                  outline: hoveredOption === 2 ? '2px solid #6B51EF' : 'none',
                  outlineOffset: '3px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHoveredOption(2)}
                onMouseLeave={() => setHoveredOption(null)}
              >
                <img
                  src={logoUrl}
                  alt="AWS Logo"
                  style={{
                    maxHeight: '80px',
                    width: 'auto',
                    display: 'block',
                    transform: hoveredOption === 2 ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </div>
            </div>
          </div>

          {/* OPCIÓN 3: Background Pattern */}
          <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '1rem', border: '2px solid #e2e8f0' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Opción 3
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', marginTop: '0.5rem' }}>
                Background Pattern
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
                Patrón de dots se intensifica
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  background: hoveredOption === 3 
                    ? 'radial-gradient(circle, #06b6d4 1px, transparent 1px)'
                    : 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  backgroundColor: hoveredOption === 3 ? '#ffffff' : '#f8fafc',
                  padding: '2rem 3rem',
                  borderRadius: '1rem',
                  display: 'inline-block',
                  border: '2px solid #e2e8f0',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHoveredOption(3)}
                onMouseLeave={() => setHoveredOption(null)}
              >
                <img
                  src={logoUrl}
                  alt="AWS Logo"
                  style={{
                    maxHeight: '80px',
                    width: 'auto',
                    display: 'block',
                    transform: hoveredOption === 3 ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </div>
            </div>
          </div>

          {/* OPCIÓN 4: Scale + Border */}
          <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '1rem', border: '2px solid #e2e8f0' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Opción 4
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', marginTop: '0.5rem' }}>
                Scale + Border
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
                Todo el contenedor escala
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  background: hoveredOption === 4 ? '#ffffff' : '#f8fafc',
                  padding: '2rem 3rem',
                  borderRadius: '1rem',
                  display: 'inline-block',
                  border: hoveredOption === 4 ? '3px solid #06b6d4' : '2px solid #e2e8f0',
                  transform: hoveredOption === 4 ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHoveredOption(4)}
                onMouseLeave={() => setHoveredOption(null)}
              >
                <img
                  src={logoUrl}
                  alt="AWS Logo"
                  style={{
                    maxHeight: '80px',
                    width: 'auto',
                    display: 'block',
                  }}
                />
              </div>
            </div>
          </div>

          {/* OPCIÓN 5: Shadow Glow */}
          <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '1rem', border: '2px solid #e2e8f0' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Opción 5
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', marginTop: '0.5rem' }}>
                Shadow Glow (BONUS)
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
                Box shadow turquesa (rompe regla)
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  background: hoveredOption === 5 ? '#ffffff' : '#f8fafc',
                  padding: '2rem 3rem',
                  borderRadius: '1rem',
                  display: 'inline-block',
                  border: hoveredOption === 5 ? '3px solid #06b6d4' : '2px solid #e2e8f0',
                  boxShadow: hoveredOption === 5 ? '0 0 30px rgba(6, 182, 212, 0.4)' : 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHoveredOption(5)}
                onMouseLeave={() => setHoveredOption(null)}
              >
                <img
                  src={logoUrl}
                  alt="AWS Logo"
                  style={{
                    maxHeight: '80px',
                    width: 'auto',
                    display: 'block',
                    transform: hoveredOption === 5 ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </div>
            </div>
          </div>

          {/* OPCIÓN 6: Gradient Border */}
          <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '1rem', border: '2px solid #e2e8f0' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Opción 6
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', marginTop: '0.5rem' }}>
                Gradient Border
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
                Border con gradiente turquesa-morado
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  background: hoveredOption === 6 
                    ? 'linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(135deg, #06b6d4, #6B51EF) border-box'
                    : '#f8fafc',
                  padding: '2rem 3rem',
                  borderRadius: '1rem',
                  display: 'inline-block',
                  border: hoveredOption === 6 ? '3px solid transparent' : '2px solid #e2e8f0',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHoveredOption(6)}
                onMouseLeave={() => setHoveredOption(null)}
              >
                <img
                  src={logoUrl}
                  alt="AWS Logo"
                  style={{
                    maxHeight: '80px',
                    width: 'auto',
                    display: 'block',
                    transform: hoveredOption === 6 ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Comparación lado a lado */}
        <div style={{ marginTop: '5rem', padding: '3rem', background: '#ffffff', borderRadius: '1.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', marginBottom: '1rem', textAlign: 'center' }}>
            Mi Recomendación
          </h2>
          <p style={{ fontSize: '1rem', color: '#64748b', marginBottom: '3rem', textAlign: 'center', maxWidth: '42rem', margin: '0 auto 3rem' }}>
            La <strong>Opción 1 (Border Glow)</strong> mantiene tu estilo minimalista sin gradientes, usa solo borders, 
            y da un "punch" visual claro con el turquesa. La <strong>Opción 4 (Scale + Border)</strong> es más dramática si quieres más impacto.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            <div style={{ padding: '1.5rem', background: '#f0fdf4', borderRadius: '0.75rem', border: '2px solid #10b981' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.5rem' }}>
                Opción 1: Border Glow
              </h4>
              <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                Minimalista, profesional, mantiene tus reglas de diseño. El turquesa es tu co-protagonista.
              </p>
            </div>

            <div style={{ padding: '1.5rem', background: '#fef3c7', borderRadius: '0.75rem', border: '2px solid #f59e0b' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.5rem' }}>
                Opción 4: Scale + Border
              </h4>
              <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                Más dramática, efecto "elevate", perfecto si quieres más impacto visual.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
