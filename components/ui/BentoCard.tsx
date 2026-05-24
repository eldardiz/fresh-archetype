import type { HTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'

interface BentoCardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
  children: ReactNode
}

export default function BentoCard({ interactive, className, children, ...rest }: BentoCardProps) {
  return (
    <div
      className={clsx('bento-card', className)}
      data-interactive={interactive ? 'true' : undefined}
      {...rest}
    >
      {children}
    </div>
  )
}
