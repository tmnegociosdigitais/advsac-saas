/**
 * Tipos para as métricas do Dashboard
 * Estas interfaces serão utilizadas para tipagem dos dados vindos da API do WhatsApp
 */

export interface WhatsAppMetrics {
  // Métricas de Atendimento
  waitingCount: number
  onlineAgents: {
    online: number
    total: number
  }
  completedChats: number
  newLeads: number

  // Métricas de Mensagens
  sentMessages: number
  receivedMessages: number
  
  // Métricas de Tempo
  averageResponseTime: string // formato "HHh MMm"
  averageWaitTime: string // formato "HHh MMm"
  
  // Dados para Gráficos
  hourlyChats: number[] // 8 pontos para as últimas 24h (a cada 3h)
  sectorChats: number[] // 5 pontos para cada setor
}

export interface TimeRange {
  start: Date
  end: Date
}

export interface DashboardFilters {
  timeRange: 'hoje' | 'ontem' | 'semana' | 'mes'
  customRange?: TimeRange
}
