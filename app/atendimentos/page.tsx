'use client'

import { useState, useEffect } from 'react'
import { TicketList } from '@/app/components/atendimentos/ticket-list'
import { ChatWindow } from '@/app/components/atendimentos/chat-window'
import { ContactDetails } from '@/app/components/atendimentos/contact-details'

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

export default function AtendimentosPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTickets()
  }, [])

  const loadTickets = async () => {
    try {
      const response = await fetch('/api/tickets')
      if (!response.ok) throw new Error('Erro ao carregar tickets')
      const data = await response.json()
      setTickets(data)
      setLoading(false)
    } catch (error) {
      console.error('Erro ao carregar tickets:', error)
      setLoading(false)
    }
  }

  const handleSendMessage = async (message: string, type: 'text' | 'image' | 'document') => {
    if (!activeTicket) return

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketId: activeTicket.id,
          message,
          type
        })
      })

      if (!response.ok) throw new Error('Erro ao enviar mensagem')

      const newMessage = await response.json()
      setActiveTicket(prev => {
        if (!prev) return null
        return {
          ...prev,
          messages: [...prev.messages, newMessage]
        }
      })
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
    }
  }

  const handleStatusChange = async (status: string) => {
    if (!activeTicket) return

    try {
      const response = await fetch(`/api/tickets/${activeTicket.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })

      if (!response.ok) throw new Error('Erro ao atualizar status')

      const updatedTicket = await response.json()
      setActiveTicket(updatedTicket)
      setTickets(prev =>
        prev.map(ticket =>
          ticket.id === updatedTicket.id ? updatedTicket : ticket
        )
      )
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
    }
  }

  const handleContactUpdate = async (contact: Contact) => {
    if (!activeTicket) return

    setActiveTicket(prev => {
      if (!prev) return null
      return {
        ...prev,
        contact
      }
    })

    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === activeTicket.id
          ? { ...ticket, contact }
          : ticket
      )
    )
  }

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Lista de Tickets */}
      <div className="w-1/4 border-r p-4">
        <TicketList
          tickets={tickets}
          activeTicket={activeTicket}
          onTicketSelect={setActiveTicket}
        />
      </div>

      {/* Chat */}
      <div className="flex-1">
        <ChatWindow
          contact={activeTicket?.contact || null}
          messages={activeTicket?.messages || []}
          onSendMessage={handleSendMessage}
          onStatusChange={handleStatusChange}
        />
      </div>

      {/* Detalhes do Contato */}
      <div className="w-1/4 border-l p-4">
        <ContactDetails
          contact={activeTicket?.contact || null}
          onUpdate={handleContactUpdate}
        />
      </div>
    </div>
  )
}
