'use client'

import { createContext, useContext, useState } from 'react'

type NavbarContextType = {
  isCollapsed: boolean
  toggleNavbar: () => void
}

const NavbarContext = createContext<NavbarContextType>({
  isCollapsed: false,
  toggleNavbar: () => {},
})

export function NavbarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <NavbarContext.Provider value={{ isCollapsed, toggleNavbar }}>
      {children}
    </NavbarContext.Provider>
  )
}

export function useNavbar() {
  return useContext(NavbarContext)
}
