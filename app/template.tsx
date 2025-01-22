'use client'

import { ThemeProvider } from '@/hooks/ThemeContext'
import { NavbarProvider } from '@/hooks/NavbarContext'
import { Navbar } from './components/Navbar'
import { useNavbar } from '@/hooks/NavbarContext'
import { useTheme } from '@/hooks/ThemeContext'

function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useNavbar()
  const { theme } = useTheme()

  return (
    <div className={theme === 'light' ? 'bg-white' : 'bg-[#0f172a]'}>
      <Navbar />
      <main 
        className={`flex-1 min-h-screen ${
          isCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        {children}
      </main>
    </div>
  )
}

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <NavbarProvider>
        <ClientLayout>
          {children}
        </ClientLayout>
      </NavbarProvider>
    </ThemeProvider>
  )
}
