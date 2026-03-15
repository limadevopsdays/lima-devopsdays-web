import { useState } from 'react'
import { HeroSectionHexagons } from './HeroSection-Hexagons'
import { HeroSectionGradient } from './HeroSection-Gradient'
import { HeroSectionHybrid } from './HeroSection-Hybrid'

type BackgroundOption = 'hexagons' | 'gradient' | 'hybrid'

export function BackgroundComparison() {
  const [selected, setSelected] = useState<BackgroundOption>('hexagons')

  return (
    <div className="min-h-screen">
      {/* Selector fijo en la parte superior */}
      <div 
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 p-2 rounded-2xl"
        style={{ 
          background: 'rgba(255,255,255,0.95)', 
          backdropFilter: 'blur(12px)',
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
        }}
      >
        <button
          onClick={() => setSelected('hexagons')}
          className="px-6 py-3 rounded-xl font-black text-sm transition-all duration-200"
          style={{
            background: selected === 'hexagons' ? '#7c3aed' : 'transparent',
            color: selected === 'hexagons' ? '#ffffff' : '#64748b',
          }}
        >
          🔷 Hexágonos
        </button>
        <button
          onClick={() => setSelected('gradient')}
          className="px-6 py-3 rounded-xl font-black text-sm transition-all duration-200"
          style={{
            background: selected === 'gradient' ? '#06b6d4' : 'transparent',
            color: selected === 'gradient' ? '#ffffff' : '#64748b',
          }}
        >
          🌊 Gradiente Mesh
        </button>
        <button
          onClick={() => setSelected('hybrid')}
          className="px-6 py-3 rounded-xl font-black text-sm transition-all duration-200"
          style={{
            background: selected === 'hybrid' ? '#10b981' : 'transparent',
            color: selected === 'hybrid' ? '#ffffff' : '#64748b',
          }}
        >
          📐 Híbrido
        </button>
      </div>

      {/* Descripción de la opción seleccionada */}
      <div
        className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl max-w-md text-center"
        style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)',
          border: '1px solid #e2e8f0',
        }}
      >
        {selected === 'hexagons' && (
          <p className="text-sm" style={{ color: '#475569' }}>
            <strong style={{ color: '#7c3aed' }}>Hexágonos:</strong> Patrón tech futurista con estructura en panal. Ideal para eventos tecnológicos.
          </p>
        )}
        {selected === 'gradient' && (
          <p className="text-sm" style={{ color: '#475569' }}>
            <strong style={{ color: '#06b6d4' }}>Gradiente Mesh:</strong> Fondos orgánicos con noise texture. Moderno, limpio y premium.
          </p>
        )}
        {selected === 'hybrid' && (
          <p className="text-sm" style={{ color: '#475569' }}>
            <strong style={{ color: '#10b981' }}>Híbrido:</strong> Combina líneas diagonales con puntos dispersos. Dinámico y energético.
          </p>
        )}
      </div>

      {/* Hero Section renderizado según selección */}
      {selected === 'hexagons' && <HeroSectionHexagons />}
      {selected === 'gradient' && <HeroSectionGradient />}
      {selected === 'hybrid' && <HeroSectionHybrid />}
    </div>
  )
}
