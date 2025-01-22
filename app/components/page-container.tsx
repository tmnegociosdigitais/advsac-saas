'use client'

import { useTheme } from '@/hooks/ThemeContext'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface PageContainerProps {
  children: React.ReactNode
  header?: {
    title: string
    description?: string
  }
  className?: string
}

export function PageContainer({ children, header, className }: PageContainerProps) {
  const { theme } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={cn(
        "min-h-screen w-full",
        theme === 'light' ? "bg-gray-50" : "bg-[#0f172a]"
      )}
    >
      <div className={cn("container mx-auto p-6 max-w-6xl", className)}>
        {header && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className={cn(
              "text-3xl font-bold mb-2",
              theme === 'light' ? "text-gray-900" : "text-white"
            )}>
              {header.title}
            </h1>
            {header.description && (
              <p className={cn(
                "text-lg",
                theme === 'light' ? "text-gray-600" : "text-gray-400"
              )}>
                {header.description}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </motion.div>
  )
}
