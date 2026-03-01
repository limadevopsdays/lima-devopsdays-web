import type { ReactNode } from 'react'

export function Container({ id, children }: { id?: string; children: ReactNode }) {
  return <div className="container" id={id}>{children}</div>
}

