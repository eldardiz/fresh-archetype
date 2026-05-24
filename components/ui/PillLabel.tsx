import type { ReactNode } from 'react'

export default function PillLabel({ children }: { children: ReactNode }) {
  return (
    <span className="pill-label">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <polygon points="12,2 22,8 22,16 12,22 2,16 2,8" />
      </svg>
      {children}
    </span>
  )
}
