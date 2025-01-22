'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Filter } from 'lucide-react'

interface Message {
  id: string
  content: string
  from: string
  timestamp: Date
  status: 'sent' | 'received' | 'read'
  type: 'text' | 'image' | 'document'
}

interface Contact {
  id: string
  name: string | null
  phone: string
  email?: string | null
  address?: string | null
  tags: { id: string; name: string }[]
  notes?: string | null
}

interface Ticket {
  id: string
  status: string
  priority: string
  contact: Contact
  messages: Message[]
  tags: { id: string; name: string }[]
  createdAt: Date
  updatedAt: Date
}

interface TicketListProps {
  tickets: Ticket[]
  activeTicket: Ticket | null
  onTicketSelect: (ticket: Ticket) => void
}

export function TicketList({ tickets, activeTicket, onTicketSelect }: TicketListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch =
      ticket.contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.contact.phone.includes(searchTerm) ||
      ticket.messages[0]?.content.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'WAITING':
        return 'destructive'
      case 'OPEN':
        return 'default'
      case 'PENDING':
        return 'warning'
      case 'RESOLVED':
        return 'success'
      default:
        return 'secondary'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'destructive'
      case 'MEDIUM':
        return 'warning'
      case 'LOW':
        return 'success'
      default:
        return 'secondary'
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar tickets..."
            className="pl-8"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex gap-2">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="WAITING">Aguardando</SelectItem>
            <SelectItem value="OPEN">Em Atendimento</SelectItem>
            <SelectItem value="PENDING">Pendente</SelectItem>
            <SelectItem value="RESOLVED">Resolvido</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Prioridade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="HIGH">Alta</SelectItem>
            <SelectItem value="MEDIUM">Média</SelectItem>
            <SelectItem value="LOW">Baixa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {filteredTickets.map(ticket => (
          <Card
            key={ticket.id}
            className={`p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
              activeTicket?.id === ticket.id ? 'bg-gray-100 dark:bg-gray-800' : ''
            }`}
            onClick={() => onTicketSelect(ticket)}
          >
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${ticket.contact.phone}`} />
                <AvatarFallback>{ticket.contact.name?.[0] || ticket.contact.phone[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium truncate">
                    {ticket.contact.name || ticket.contact.phone}
                  </p>
                  <div className="flex gap-2">
                    <Badge variant={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                    <Badge variant={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500 truncate">
                    {ticket.messages[0]?.content || 'Sem mensagens'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(ticket.updatedAt).toLocaleTimeString()}
                  </p>
                </div>

                {ticket.tags.length > 0 && (
                  <div className="flex gap-1 mt-2">
                    {ticket.tags.map(tag => (
                      <Badge key={tag.id} variant="outline" className="text-xs">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
