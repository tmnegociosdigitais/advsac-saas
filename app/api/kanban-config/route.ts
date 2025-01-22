import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/kanban-config
export async function GET() {
  try {
    // TODO: Pegar o clientId do usuário autenticado
    const clientId = 'client_id_here' // Temporário

    const config = await prisma.kanbanConfig.findUnique({
      where: { clientId },
      include: {
        columns: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    })

    // Se não existir configuração, retorna configuração padrão
    if (!config) {
      const defaultColumns = [
        { name: 'Novos Leads', color: '#3B82F6', order: 0 },
        { name: 'Em Contato', color: '#EAB308', order: 1 },
        { name: 'Qualificados', color: '#22C55E', order: 2 }
      ]

      return NextResponse.json({ columns: defaultColumns })
    }

    return NextResponse.json(config)
  } catch (error) {
    console.error('Erro ao buscar configuração do Kanban:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar configuração do Kanban' },
      { status: 500 }
    )
  }
}

// PUT /api/kanban-config
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    // TODO: Pegar o clientId do usuário autenticado
    const clientId = 'client_id_here' // Temporário

    // Verifica se já existe uma configuração
    const existingConfig = await prisma.kanbanConfig.findUnique({
      where: { clientId }
    })

    if (existingConfig) {
      // Remove todas as colunas existentes
      await prisma.kanbanColumn.deleteMany({
        where: { configId: existingConfig.id }
      })

      // Atualiza com as novas colunas
      const updatedConfig = await prisma.kanbanConfig.update({
        where: { id: existingConfig.id },
        data: {
          columns: {
            createMany: {
              data: body.columns.map((column: any) => ({
                name: column.name,
                color: column.color,
                order: column.order
              }))
            }
          }
        },
        include: {
          columns: {
            orderBy: {
              order: 'asc'
            }
          }
        }
      })

      return NextResponse.json(updatedConfig)
    } else {
      // Cria nova configuração
      const newConfig = await prisma.kanbanConfig.create({
        data: {
          clientId,
          columns: {
            createMany: {
              data: body.columns.map((column: any) => ({
                name: column.name,
                color: column.color,
                order: column.order
              }))
            }
          }
        },
        include: {
          columns: {
            orderBy: {
              order: 'asc'
            }
          }
        }
      })

      return NextResponse.json(newConfig)
    }
  } catch (error) {
    console.error('Erro ao atualizar configuração do Kanban:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar configuração do Kanban' },
      { status: 500 }
    )
  }
}
