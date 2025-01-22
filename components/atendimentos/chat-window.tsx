'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Phone, Video, MoreVertical, Image, Paperclip, Send } from 'lucide-react'

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
}

interface ChatWindowProps {
  contact: Contact | null
  messages: Message[]
  onSendMessage: (message: string, type: 'text' | 'image' | 'document') => void
  onStatusChange: (status: string) => void
}

export function ChatWindow({
  contact,
  messages,
  onSendMessage,
  onStatusChange
}: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    onSendMessage(newMessage, 'text')
    setNewMessage('')
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // TODO: Implementar upload de arquivo
    console.log('Upload file:', file)
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  if (!contact) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">Selecione um chat para começar</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${contact.phone}`} />
              <AvatarFallback>{contact.name?.[0] || contact.phone[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{contact.name || contact.phone}</h3>
              <p className="text-sm text-gray-500">
                {isTyping ? 'Digitando...' : 'Online'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="w-4 h-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onStatusChange('RESOLVED')}>
                  Marcar como Resolvido
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatusChange('PENDING')}>
                  Marcar como Pendente
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.print()}>
                  Imprimir Conversa
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${
              message.from === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.from === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              {message.type === 'text' ? (
                <p>{message.content}</p>
              ) : message.type === 'image' ? (
                <img
                  src={message.content}
                  alt="Imagem"
                  className="max-w-full rounded"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <Paperclip className="w-4 h-4" />
                  <span>Documento</span>
                </div>
              )}
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-xs opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
                {message.from === 'user' && (
                  <Badge
                    variant="secondary"
                    className="text-[10px] px-1"
                  >
                    {message.status}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <label className="cursor-pointer">
              <Image className="w-4 h-4" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </Button>
          <Button variant="ghost" size="icon">
            <label className="cursor-pointer">
              <Paperclip className="w-4 h-4" />
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </Button>
          <Input
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite uma mensagem..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
