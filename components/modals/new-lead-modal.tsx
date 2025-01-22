'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

interface NewLeadModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: {
    name: string
    phone: string
    value?: number
    notes?: string
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  }) => void
}

export function NewLeadModal({ open, onClose, onSubmit }: NewLeadModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    value: '',
    notes: '',
    priority: 'LOW' as const
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      value: formData.value ? parseFloat(formData.value) : undefined
    })
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Lead</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Nome do contato"
            />
          </div>

          <div>
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="(00) 00000-0000"
              required
            />
          </div>

          <div>
            <Label htmlFor="value">Valor Potencial</Label>
            <Input
              id="value"
              type="number"
              value={formData.value}
              onChange={e => setFormData(prev => ({ ...prev, value: e.target.value }))}
              placeholder="R$ 0,00"
            />
          </div>

          <div>
            <Label htmlFor="priority">Prioridade</Label>
            <select
              id="priority"
              className="w-full p-2 border rounded-md"
              value={formData.priority}
              onChange={e => setFormData(prev => ({ ...prev, priority: e.target.value as any }))}
            >
              <option value="LOW">Baixa</option>
              <option value="MEDIUM">Média</option>
              <option value="HIGH">Alta</option>
              <option value="URGENT">Urgente</option>
            </select>
          </div>

          <div>
            <Label htmlFor="notes">Observações</Label>
            <textarea
              id="notes"
              className="w-full min-h-[100px] p-2 border rounded-md"
              value={formData.notes}
              onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Adicione notas sobre o lead..."
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Criar Lead
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
