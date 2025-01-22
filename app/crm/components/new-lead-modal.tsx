'use client'

import { useState } from 'react'
import { Dialog } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'

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
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4">Novo Lead</h2>
          
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
              <Select
                value={formData.priority}
                onValueChange={value => setFormData(prev => ({ ...prev, priority: value as any }))}
              >
                <option value="LOW">Baixa</option>
                <option value="MEDIUM">Média</option>
                <option value="HIGH">Alta</option>
                <option value="URGENT">Urgente</option>
              </Select>
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

            <div className="flex justify-end gap-2 mt-6">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">
                Criar Lead
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  )
}
