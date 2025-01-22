'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Plus, Save, Trash2, ArrowLeft } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface KanbanColumn {
  id?: string
  name: string
  color: string
  order: number
}

interface Plan {
  name: string
  maxKanbanColumns: number
  canCustomizeKanban: boolean
}

export default function KanbanConfig() {
  const [columns, setColumns] = useState<KanbanColumn[]>([])
  const [clientPlan, setClientPlan] = useState<Plan | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    try {
      const [configResponse, planResponse] = await Promise.all([
        fetch('/api/kanban-config'),
        fetch('/api/client/plan')
      ])
      
      const configData = await configResponse.json()
      const planData = await planResponse.json()
      
      setColumns(configData.columns)
      setClientPlan(planData)
    } catch (error) {
      console.error('Erro ao carregar configurações:', error)
      setError('Não foi possível carregar as configurações')
    } finally {
      setLoading(false)
    }
  }

  const handleAddColumn = () => {
    if (clientPlan && columns.length >= clientPlan.maxKanbanColumns) {
      setError(`Seu plano permite apenas ${clientPlan.maxKanbanColumns} colunas`)
      return
    }

    setColumns([
      ...columns,
      {
        name: 'Nova Coluna',
        color: '#000000',
        order: columns.length
      }
    ])
  }

  const handleRemoveColumn = (index: number) => {
    setColumns(columns.filter((_, i) => i !== index))
  }

  const handleUpdateColumn = (index: number, field: keyof KanbanColumn, value: string | number) => {
    setColumns(
      columns.map((column, i) =>
        i === index ? { ...column, [field]: value } : column
      )
    )
  }

  const handleMoveColumn = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === columns.length - 1)
    ) {
      return
    }

    const newColumns = [...columns]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    // Troca as ordens
    const tempOrder = newColumns[index].order
    newColumns[index].order = newColumns[targetIndex].order
    newColumns[targetIndex].order = tempOrder
    
    // Troca as posições no array
    ;[newColumns[index], newColumns[targetIndex]] = [newColumns[targetIndex], newColumns[index]]
    
    setColumns(newColumns)
  }

  const handleSave = async () => {
    try {
      await fetch('/api/kanban-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ columns })
      })
      
      router.push('/crm')
    } catch (error) {
      console.error('Erro ao salvar configurações:', error)
      setError('Não foi possível salvar as configurações')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!clientPlan?.canCustomizeKanban) {
    return (
      <div className="p-6">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Seu plano atual não permite personalizar o Kanban. 
            Entre em contato com o suporte para fazer upgrade do seu plano.
          </AlertDescription>
        </Alert>
        <Button onClick={() => router.push('/crm')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para o CRM
        </Button>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Configurar Kanban</h1>
          <p className="text-sm text-gray-500">
            Seu plano permite até {clientPlan.maxKanbanColumns} colunas
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push('/crm')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4">
        {columns.map((column, index) => (
          <Card key={index} className="p-4">
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-4">
                <Input
                  placeholder="Nome da coluna"
                  value={column.name}
                  onChange={(e) => handleUpdateColumn(index, 'name', e.target.value)}
                />
              </div>
              <div className="col-span-3">
                <Input
                  type="color"
                  value={column.color}
                  onChange={(e) => handleUpdateColumn(index, 'color', e.target.value)}
                />
              </div>
              <div className="col-span-3">
                <Badge>Ordem: {column.order + 1}</Badge>
              </div>
              <div className="col-span-2 flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleMoveColumn(index, 'up')}
                  disabled={index === 0}
                >
                  ↑
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleMoveColumn(index, 'down')}
                  disabled={index === columns.length - 1}
                >
                  ↓
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveColumn(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        <Button
          variant="outline"
          onClick={handleAddColumn}
          disabled={clientPlan && columns.length >= clientPlan.maxKanbanColumns}
          className="mt-4"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Coluna
        </Button>
      </div>
    </div>
  )
}
