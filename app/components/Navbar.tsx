'use client'

import { useNavbar } from '../../hooks/NavbarContext'
import { useTheme } from '../../hooks/ThemeContext'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ChevronLeft, 
  LayoutDashboard, 
  MessageSquareMore, 
  GitBranchPlus, 
  Users2, 
  FileStack, 
  Link2, 
  Settings, 
  Moon, 
  Sun, 
  Sparkles 
} from 'lucide-react'
import { Button } from './ui/button'
import { Avatar, AvatarFallback } from './ui/avatar'
import { cn } from '@/lib/utils'

const menuItems = [
  { icon: Sparkles, label: 'Novidades', href: '/novidades' },
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: MessageSquareMore, label: 'Atendimentos', href: '/atendimentos' },
  { icon: GitBranchPlus, label: 'Fluxos', href: '/fluxos' },
  { icon: Users2, label: 'CRM', href: '/crm' },
  { icon: FileStack, label: 'Documentos', href: '/documentos' },
  { icon: Link2, label: 'Conexões', href: '/conexoes' },
  { icon: Settings, label: 'Configurações', href: '/configuracoes' }
]

export function Navbar() {
  const { isCollapsed, toggleNavbar } = useNavbar()
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()

  const getLogo = () => {
    if (isCollapsed) {
      return theme === 'light' ? '/logoreduzidadark.png' : '/logoreduzidalight.png'
    }
    return theme === 'light' ? '/logo-dark.png' : '/logo-light.png'
  }

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 h-screen border-r shadow-lg z-50",
        theme === 'light' 
          ? "bg-white border-gray-200 shadow-gray-200/50" 
          : "bg-[#0f172a] border-gray-800 shadow-gray-900/50",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className={cn(
          "flex items-center border-b h-16 px-4 relative",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          <div className={cn("flex items-center justify-start", isCollapsed ? "w-10" : "w-32")}>
            <div className={cn("relative", isCollapsed ? "w-10 h-10" : "w-32 h-10")}>
              <Image
                src={getLogo()}
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <Button
            onClick={toggleNavbar}
            variant="outline"
            size="icon"
            className={cn(
              "absolute -right-3 h-6 w-6 rounded-lg p-0 shadow-md",
              theme === 'light' 
                ? "bg-white border-gray-200 hover:bg-gray-100 shadow-gray-200" 
                : "bg-[#0f172a] border-gray-800 hover:bg-gray-800 shadow-gray-900"
            )}
            aria-label={isCollapsed ? "Expandir menu" : "Recolher menu"}
          >
            <ChevronLeft className={cn(
              "h-4 w-4",
              theme === 'light' ? "text-gray-600" : "text-gray-400",
              isCollapsed && "rotate-180"
            )} />
          </Button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={index}
                href={item.href}
                title={isCollapsed ? item.label : ""}
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="px-2 py-1"
                >
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-2 px-4 py-2.5",
                      isCollapsed ? "justify-center" : "",
                      isActive 
                        ? theme === 'light'
                          ? "bg-[#1e293b] text-white shadow-md shadow-[#1e293b]/20 hover:bg-[#1e293b] hover:text-white" 
                          : "bg-white text-[#1e293b] shadow-md shadow-white/20 hover:bg-white hover:text-[#1e293b]"
                        : theme === 'light'
                          ? "text-gray-600 hover:bg-[#1e293b]/20 hover:text-gray-900"
                          : "text-gray-400 hover:bg-white/20 hover:text-white"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Button>
                </motion.div>
              </Link>
            )
          })}
        </div>

        {/* Footer */}
        <div className={cn(
          "border-t px-4 py-3",
          theme === 'light' ? "border-gray-200" : "border-gray-800"
        )}>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className={theme === 'light' ? "text-gray-900" : "text-white"}>
                    Admin
                  </span>
                  <span className={theme === 'light' ? "text-gray-500" : "text-gray-400"}>
                    admin@example.com
                  </span>
                </div>
              )}
            </div>
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="px-2 py-1"
            >
              <Button
                onClick={toggleTheme}
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2 px-4 py-2.5",
                  isCollapsed ? "justify-center" : "",
                  theme === 'light'
                    ? "text-gray-600 hover:bg-[#1e293b] hover:text-white shadow-sm hover:shadow-md hover:shadow-[#1e293b]/20" 
                    : "text-gray-400 hover:bg-white hover:text-[#1e293b] shadow-sm hover:shadow-md hover:shadow-white/20",
                  isCollapsed && "px-0"
                )}
                aria-label={theme === 'light' ? "Ativar modo escuro" : "Ativar modo claro"}
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="h-5 w-5" />
                    {!isCollapsed && <span>Modo escuro</span>}
                  </>
                ) : (
                  <>
                    <Sun className="h-5 w-5" />
                    {!isCollapsed && <span>Modo claro</span>}
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
