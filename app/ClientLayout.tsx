'use client'

// Importações de componentes e hooks
import { Navbar } from './components/Navbar';
import { NavbarProvider } from '../hooks/NavbarContext';
import { useNavbar } from '../hooks/NavbarContext';

/**
 * Componente ClientLayout - Layout do lado do cliente
 * @param children - Conteúdo principal a ser renderizado
 * @param redirectAfterLogin - Rota para redirecionamento após login (padrão: '/dashboard')
 * @returns Estrutura do layout com Navbar e conteúdo principal
 */
export default function ClientLayout({
  children,
  redirectAfterLogin = '/dashboard',
}: {
  children: React.ReactNode;
  redirectAfterLogin?: string;
}) {
  return (
    <NavbarProvider>
      <div className="flex min-h-screen">
        {/* Navbar */}
        <Navbar />
        
        {/* Área principal do conteúdo */}
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </NavbarProvider>
  )
}
