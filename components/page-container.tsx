'use client'

import { cn } from '@/lib/utils'

interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn('w-full min-h-screen p-4 sm:p-6 space-y-6', className)}>
      {children}
    </div>
  )
}
