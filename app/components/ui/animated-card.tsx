'use client'

import { Card } from '@/components/ui/card'
import { useTheme } from '@/hooks/ThemeContext'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface AnimatedCardProps extends React.ComponentProps<typeof Card> {
  index?: number
  children: React.ReactNode
  className?: string
  withHover?: boolean
}

export function AnimatedCard({ 
  children, 
  className, 
  index = 0, 
  withHover = true,
  ...props 
}: AnimatedCardProps) {
  const { theme } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={withHover ? { scale: 1.01 } : undefined}
      whileTap={withHover ? { scale: 0.99 } : undefined}
    >
      <Card
        className={cn(
          "overflow-hidden border transition-shadow duration-200",
          theme === 'light' 
            ? "bg-white border-gray-200 shadow-sm hover:shadow-md" 
            : "bg-gray-900/50 border-gray-800 shadow-lg hover:shadow-xl",
          className
        )}
        {...props}
      >
        {children}
      </Card>
    </motion.div>
  )
}
