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
    <section id={id} className="py-20">
      <Container>
        <header className="flex flex-col gap-[10px] mb-[22px] after:content-[''] after:block after:h-px after:w-full after:max-w-[520px] after:bg-[linear-gradient(90deg,rgba(var(--site-accent-rgb),0.22),rgba(var(--site-accent-rgb),0.08),transparent)] after:mt-[6px]">
          <div className="font-mono text-[rgba(var(--site-accent-rgb),0.9)] uppercase text-[13px] tracking-[0.12em] relative inline-flex items-center gap-[10px] before:content-[''] before:w-[22px] before:h-px before:bg-[rgba(var(--site-accent-2-rgb),0.6)]">
            {eyebrow}
          </div>
          <h2 className="text-[clamp(28px,3.2vw,44px)] leading-[1.05] tracking-[-0.03em] m-0">{title}</h2>
          {lead ? <p className="max-w-[70ch] text-site-text-muted m-0">{lead}</p> : null}
        </header>
        {children}
      </Container>
    </section>
  )
}
