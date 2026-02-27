import type { ReactNode } from 'react'

export function Container({ children }: { children: ReactNode }) {
  return <div className="max-w-[1120px] mx-auto px-5">{children}</div>
}
