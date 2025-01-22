import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/hooks/ThemeContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ADVSac - WhatsApp + Gestão Jurídica',
  description: 'Sistema completo de gestão jurídica com integração ao WhatsApp',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any'
      }
    ],
    shortcut: ['/favicon.ico'],
    apple: ['/favicon.ico']
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
