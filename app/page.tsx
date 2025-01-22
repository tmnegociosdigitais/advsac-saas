'use client';

import { HomeIcon, ChatBubbleLeftRightIcon, QueueListIcon, UsersIcon, DocumentTextIcon, LinkIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface NavItemProps {
  icon: ReactNode
  text: string
  active?: boolean
  href?: string
}

interface CardProps {
  iconColor: string
  title: string
  value: string | number
}

export default function Home() {
  const router = useRouter()
  
  useEffect(() => {
    router.push('/novidades')
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  )
}

function NavItem({ icon, text, active = false, href = '#' }: NavItemProps) {
  return (
    <li>
      <a href={href} className={`flex items-center px-4 py-2 space-x-3 rounded-lg ${
        active ? 'bg-purple-50 text-purple-600' : 'text-gray-700 hover:bg-gray-50'
      }`}>
        {icon}
        <span>{text}</span>
      </a>
    </li>
  )
}

function Card({ iconColor, title, value }: CardProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className={`w-10 h-10 mb-4 ${iconColor}`}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 22h20L12 2z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}
