import type { ReactNode } from 'react'
import { Container } from './Container'

type SectionProps = {
  id: string
  eyebrow: string
  title: string
  lead?: string
  children: ReactNode
}

export function Section({ id, eyebrow, title, lead, children }: SectionProps) {
  return (
    <section id={id} className="section">
      <Container>
        <header className="section__header">
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="section__title">{title}</h2>
          {lead ? <p className="section__lead">{lead}</p> : null}
        </header>
        {children}
      </Container>
    </section>
  )
}

