'use client'

import { ThemeProvider } from '../hooks/ThemeContext'
import ClientLayout from './ClientLayout'

export function Providers({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <ClientLayout redirectAfterLogin="/novidades">
        {children}
      </ClientLayout>
    </ThemeProvider>
  )
}
