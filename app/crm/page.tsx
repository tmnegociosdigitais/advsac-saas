'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Plus, Settings } from 'lucide-react'
import { NewLeadModal } from '../../components/modals/new-lead-modal'

interface KanbanColumn {
  id: string
  name: string
  color: string
  order: number
}

interface Ticket {
  id: string
  contact: {
    name: string
    phone: string
  }
  messages: {
    content: string
    timestamp: Date
  }[]
  kanbanColumn: KanbanColumn
  crmValue?: number
  crmNotes?: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  updatedAt: Date
}

// Colunas padrão para inicialização
const defaultColumns: KanbanColumn[] = [
  { id: 'new', name: 'Novos Leads', color: '#3B82F6', order: 0 },
  { id: 'contact', name: 'Em Contato', color: '#EAB308', order: 1 },
  { id: 'qualified', name: 'Qualificados', color: '#22C55E', order: 2 }
]

export default function CRMKanban() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [columns, setColumns] = useState<KanbanColumn[]>(defaultColumns)
  const [loading, setLoading] = useState(true)
  const [showNewLeadModal, setShowNewLeadModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchKanbanConfig()
    fetchTickets()
  }, [])

  const fetchKanbanConfig = async () => {
    try {
      const response = await fetch('/api/kanban-config')
      if (!response.ok) {
        throw new Error('Erro ao buscar configuração')
      }
      const data = await response.json()
      if (data.columns && data.columns.length > 0) {
        setColumns(data.columns)
      }
    } catch (error) {
      console.error('Erro ao buscar configuração do Kanban:', error)
    }
  }

  const fetchTickets = async () => {
    try {
      const response = await fetch('/api/tickets')
      if (!response.ok) {
        throw new Error('Erro ao buscar tickets')
      }
      const data = await response.json()
      setTickets(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Erro ao buscar tickets:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDragStart = (e: React.DragEvent, ticketId: string) => {
    e.dataTransfer.setData('ticketId', ticketId)
  }

  const handleDrop = async (e: React.DragEvent, columnId: string) => {
    e.preventDefault()
    const ticketId = e.dataTransfer.getData('ticketId')
    
    try {
      // Atualiza localmente primeiro (otimistic update)
      setTickets(prev => 
        prev.map(ticket => 
          ticket.id === ticketId ? { ...ticket, kanbanColumn: columns.find(c => c.id === columnId)! } : ticket
        )
      )

      // Envia atualização para o servidor
      await fetch(`/api/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kanbanColumnId: columnId })
      })

      // Atualiza lista de tickets
      fetchTickets()
    } catch (error) {
      console.error('Erro ao atualizar coluna:', error)
      fetchTickets()
    }
  }

  const handleTicketClick = (ticketId: string) => {
    router.push(`/atendimento?ticket=${ticketId}`)
  }

  const handleConfigureKanban = () => {
    router.push('/crm/configuracoes')
  }

  const handleNewLead = async (data: {
    name: string
    phone: string
    value?: number
    notes?: string
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  }) => {
    try {
      // Primeiro cria o contato
      const contactResponse = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone
        })
      })

      if (!contactResponse.ok) {
        throw new Error('Erro ao criar contato')
      }

      const contact = await contactResponse.json()

      // Depois cria o ticket
      const ticketResponse = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactId: contact.id,
          priority: data.priority,
          crmValue: data.value,
          crmNotes: data.notes
        })
      })

      if (!ticketResponse.ok) {
        throw new Error('Erro ao criar ticket')
      }

      // Atualiza a lista de tickets
      fetchTickets()
    } catch (error) {
      console.error('Erro ao criar lead:', error)
      // TODO: Mostrar mensagem de erro para o usuário
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">CRM - Gestão de Leads</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleConfigureKanban}>
            <Settings className="w-4 h-4 mr-2" />
            Configurar Kanban
          </Button>
          <Button onClick={() => setShowNewLeadModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Lead
          </Button>
        </div>
      </div>

      {/* Modal de Novo Lead */}
      <NewLeadModal
        open={showNewLeadModal}
        onClose={() => setShowNewLeadModal(false)}
        onSubmit={handleNewLead}
      />

      <div className="grid auto-cols-[300px] grid-flow-col gap-4 overflow-x-auto pb-4 min-h-[calc(100vh-200px)]">
        {columns.sort((a, b) => a.order - b.order).map(column => (
          <div 
            key={column.id}
            className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="flex items-center gap-2 mb-4">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: column.color }}
              />
              <h2 className="font-semibold">{column.name}</h2>
              <Badge variant="secondary">
                {tickets.filter(t => t.kanbanColumn?.id === column.id).length}
              </Badge>
            </div>

            <div className="space-y-3">
              {tickets
                .filter(ticket => ticket.kanbanColumn?.id === column.id)
                .map(ticket => (
                  <Card
                    key={ticket.id}
                    className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                    draggable
                    onDragStart={(e) => handleDragStart(e, ticket.id)}
                    onClick={() => handleTicketClick(ticket.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <span className="text-xs">
                            {ticket.contact.name?.substring(0, 2) || 'CL'}
                          </span>
                        </Avatar>
                        <div>
                          <p className="font-medium">{ticket.contact.name || ticket.contact.phone}</p>
                          <p className="text-sm text-gray-500">{ticket.contact.phone}</p>
                        </div>
                      </div>
                      {ticket.priority && (
                        <Badge variant={
                          ticket.priority === 'URGENT' ? 'destructive' :
                          ticket.priority === 'HIGH' ? 'orange' :
                          ticket.priority === 'MEDIUM' ? 'yellow' : 'default'
                        }>
                          {ticket.priority}
                        </Badge>
                      )}
                    </div>

                    {ticket.messages[0] && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
                        {ticket.messages[0].content}
                      </p>
                    )}

                    <div className="flex justify-between items-center text-xs text-gray-500">
                      {ticket.crmValue && (
                        <span>R$ {ticket.crmValue.toLocaleString('pt-BR')}</span>
                      )}
                      <span>
                        Atualizado {new Date(ticket.updatedAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
