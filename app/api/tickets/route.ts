import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/tickets - Lista todos os tickets
export async function GET() {
  try {
    const tickets = await prisma.ticket.findMany({
      include: {
        contact: true,
        messages: {
          orderBy: {
            timestamp: 'desc'
          },
          take: 1
        },
        tags: true,
        assignedTo: true,
        queue: true,
        kanbanColumn: true
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    return NextResponse.json(tickets)
  } catch (error) {
    console.error('Erro ao buscar tickets:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar tickets' },
      { status: 500 }
    )
  }
}

// POST /api/tickets - Cria um novo ticket
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Busca a primeira coluna do Kanban
    const firstColumn = await prisma.kanbanColumn.findFirst({
      where: {
        order: 0
      }
    })

    // Busca a primeira fila disponível
    const firstQueue = await prisma.queue.findFirst({
      where: {
        isActive: true
      }
    })

    if (!firstQueue) {
      return NextResponse.json(
        { error: 'Nenhuma fila disponível' },
        { status: 400 }
      )
    }

    // Verifica se já existe um contato com este telefone
    const existingContact = await prisma.contact.findUnique({
      where: { phone: body.phone }
    })

    // Se não existir, cria um novo
    const contact = await prisma.contact.create({
      data: {
        name: body.name,
        phone: body.phone
      }
    })

    // Cria o ticket
    const ticket = await prisma.ticket.create({
      data: {
        status: 'WAITING',
        priority: body.priority || 'LOW',
        contact: {
          connect: { id: contact.id }
        },
        queue: {
          connect: { id: firstQueue.id }
        },
        ...(firstColumn && {
          kanbanColumn: {
            connect: { id: firstColumn.id }
          }
        }),
        createdBy: {
          connect: { id: 'user-id' } // TODO: Pegar o ID do usuário logado
        },
        crmValue: body.crmValue,
        crmNotes: body.crmNotes,
        crmPriority: 0
      },
      include: {
        contact: true,
        messages: true,
        tags: true,
        assignedTo: true,
        queue: true,
        kanbanColumn: true
      }
    })

    return NextResponse.json(ticket)
  } catch (error) {
    console.error('Erro ao criar ticket:', error)
    return NextResponse.json(
      { error: 'Erro ao criar ticket' },
      { status: 500 }
    )
  }
}
