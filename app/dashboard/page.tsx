/**
 * Dashboard Page - Página principal do dashboard com métricas do WhatsApp
 * 
 * Esta página exibe métricas em tempo real do WhatsApp, incluindo:
 * - Métricas de atendimento (aguardando, atendentes online, finalizados, leads)
 * - Métricas de mensagens (enviadas, recebidas)
 * - Métricas de tempo (tempo médio de atendimento e espera)
 * - Gráficos de distribuição (atendimentos por hora e por setor)
 * 
 * A página é totalmente responsiva e suporta tema claro/escuro
 * Preparada para futura integração com a API do WhatsApp
 */

'use client'

import { Clock, Users, MessageCircle, CheckCircle, Send, MessageSquare, Timer, History } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LineChart, BarChart } from '@/components/ui/charts'
import { useNavbar } from '@/hooks/NavbarContext'
import { useTheme } from '@/hooks/ThemeContext'
import { cn } from '@/lib/utils'

/**
 * Interface para as props dos cards de estatísticas
 * @param title - Título do card
 * @param value - Valor a ser exibido (número ou texto)
 * @param icon - Ícone do Lucide React
 * @param className - Classes adicionais para estilização
 */
interface StatsCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  className?: string
}

/**
 * Componente StatsCard
 * 
 * Card reutilizável para exibir métricas com:
 * - Título
 * - Valor
 * - Ícone
 * - Cores e estilos personalizáveis
 * - Suporte a tema claro/escuro
 * - Efeitos hover com sombras coloridas
 * - Layout responsivo
 */
function StatsCard({ title, value, icon, className = '' }: StatsCardProps) {
  const { theme } = useTheme()
  
  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-200 border border-transparent h-full",
      // Cores base baseadas no tema
      theme === 'light'
        ? "bg-white hover:bg-gray-50/50 hover:border-gray-200"
        : "bg-[#0a192f] hover:bg-[#0a192f]/80 hover:border-gray-800",
      // Sombras coloridas no hover baseadas na classe de cor
      className.includes('text-primary-500') && "hover:shadow-primary-500/30 hover:shadow-xl dark:hover:shadow-primary-500/20",
      className.includes('text-green-500') && "hover:shadow-green-500/30 hover:shadow-xl dark:hover:shadow-green-500/20",
      className.includes('text-blue-500') && "hover:shadow-blue-500/30 hover:shadow-xl dark:hover:shadow-blue-500/20",
      className.includes('text-yellow-500') && "hover:shadow-yellow-500/30 hover:shadow-xl dark:hover:shadow-yellow-500/20",
      className.includes('text-pink-500') && "hover:shadow-pink-500/30 hover:shadow-xl dark:hover:shadow-pink-500/20",
      className.includes('text-blue-400') && "hover:shadow-blue-400/30 hover:shadow-xl dark:hover:shadow-blue-400/20",
      className.includes('text-green-500') && "hover:shadow-green-500/30 hover:shadow-xl dark:hover:shadow-green-500/20",
      className.includes('text-orange-500') && "hover:shadow-orange-500/30 hover:shadow-xl dark:hover:shadow-orange-500/20"
    )}>
      <div className="flex justify-between items-start p-4 sm:p-6">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{title}</p>
          <h3 className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2 dark:text-white">{value}</h3>
        </div>
        <div className={cn("rounded-full p-2 flex-shrink-0 ml-4", className)}>
          {icon}
        </div>
      </div>
    </Card>
  )
}

/**
 * Página principal do Dashboard
 * 
 * Estrutura:
 * 1. Cabeçalho com título e seletor de período
 * 2. Grid de métricas principais (4 cards)
 * 3. Grid de métricas secundárias (4 cards)
 * 4. Grid de gráficos (2 cards)
 * 
 * Recursos:
 * - Layout totalmente responsivo (mobile, tablet, desktop)
 * - Suporte a temas (claro/escuro)
 * - Cards com efeitos hover
 * - Seletor de período para filtrar dados
 * - Preparado para integração com API do WhatsApp
 * 
 * TODO:
 * - Implementar integração com API do WhatsApp
 * - Adicionar estados para armazenar métricas
 * - Implementar atualização automática dos dados
 * - Adicionar loading states
 * - Implementar tratamento de erros
 */
export default function DashboardPage() {
  const { isCollapsed } = useNavbar()

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 space-y-6">
      {/* Cabeçalho com título e seletor de período */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold dark:text-white">Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Monitoramento em tempo real</p>
        </div>
        <Select defaultValue="hoje">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hoje">Hoje</SelectItem>
            <SelectItem value="ontem">Ontem</SelectItem>
            <SelectItem value="semana">Últimos 7 dias</SelectItem>
            <SelectItem value="mes">Este mês</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Grid de Cards Principais - Métricas de atendimento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Aguardando Atendimento" 
          value="0"
          icon={<Clock className="w-5 h-5" />}
          className="text-primary-500 bg-primary-100/10 dark:bg-primary-900/10"
        />
        <StatsCard 
          title="Atendentes Online" 
          value="0/0"
          icon={<Users className="w-5 h-5" />}
          className="text-green-500 bg-green-100/10 dark:bg-green-900/10"
        />
        <StatsCard 
          title="Atendimentos Finalizados" 
          value="0"
          icon={<CheckCircle className="w-5 h-5" />}
          className="text-blue-500 bg-blue-100/10 dark:bg-blue-900/10"
        />
        <StatsCard 
          title="Novos Leads" 
          value="0"
          icon={<MessageCircle className="w-5 h-5" />}
          className="text-yellow-500 bg-yellow-100/10 dark:bg-yellow-900/10"
        />
      </div>

      {/* Grid de Cards Secundários - Métricas de mensagens e tempo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Mensagens Enviadas" 
          value="0"
          icon={<Send className="w-5 h-5" />}
          className="text-pink-500 bg-pink-100/10 dark:bg-pink-900/10"
        />
        <StatsCard 
          title="Mensagens Recebidas" 
          value="0"
          icon={<MessageSquare className="w-5 h-5" />}
          className="text-blue-400 bg-blue-100/10 dark:bg-blue-900/10"
        />
        <StatsCard 
          title="Tempo Médio de Atendimento" 
          value="00h 00m"
          icon={<Timer className="w-5 h-5" />}
          className="text-green-500 bg-green-100/10 dark:bg-green-900/10"
        />
        <StatsCard 
          title="Tempo Médio de Espera" 
          value="00h 00m"
          icon={<History className="w-5 h-5" />}
          className="text-orange-500 bg-orange-100/10 dark:bg-orange-900/10"
        />
      </div>

      {/* Grid de Gráficos - Visualização de dados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4 dark:text-white">Atendimentos por Hora</h3>
          <div className="h-[250px] sm:h-[300px] w-full">
            <LineChart data={[12, 19, 15, 25, 32, 28, 20, 15]} />
          </div>
        </Card>
        <Card className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4 dark:text-white">Atendimentos por Setor</h3>
          <div className="h-[250px] sm:h-[300px] w-full">
            <BarChart data={[45, 32, 28, 19, 25]} />
          </div>
        </Card>
      </div>
    </div>
  )
}
