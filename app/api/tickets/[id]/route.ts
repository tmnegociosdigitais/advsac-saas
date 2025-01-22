import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/tickets/[id] - Busca um ticket específico
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: params.id },
      include: {
        contact: true,
        messages: {
          orderBy: {
            timestamp: 'desc'
          }
        },
        tags: true,
        assignedTo: true,
        queue: true,
        kanbanColumn: true
      }
    })

    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(ticket)
  } catch (error) {
    console.error('Erro ao buscar ticket:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar ticket' },
      { status: 500 }
    )
  }
}

// PATCH /api/tickets/[id] - Atualiza um ticket
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const ticket = await prisma.ticket.update({
      where: { id: params.id },
      data: {
        ...(body.status && { status: body.status }),
        ...(body.priority && { priority: body.priority }),
        ...(body.assignedToId && {
          assignedTo: { connect: { id: body.assignedToId } }
        }),
        ...(body.queueId && {
          queue: { connect: { id: body.queueId } }
        }),
        ...(body.kanbanColumnId && {
          kanbanColumn: { connect: { id: body.kanbanColumnId } }
        }),
        ...(body.crmStage && { crmStage: body.crmStage }),
        ...(body.crmNotes && { crmNotes: body.crmNotes }),
        ...(body.crmValue && { crmValue: body.crmValue }),
        ...(body.crmPriority && { crmPriority: body.crmPriority }),
        updatedAt: new Date()
      },
      include: {
        contact: true,
        messages: {
          orderBy: {
            timestamp: 'desc'
          },
          take: 1
        },
        tags: true,
        kanbanColumn: true
      }
    })

    return NextResponse.json(ticket)
  } catch (error) {
    console.error('Erro ao atualizar ticket:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar ticket' },
      { status: 500 }
    )
  }
}

// DELETE /api/tickets/[id] - Remove um ticket
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.ticket.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao remover ticket:', error)
    return NextResponse.json(
      { error: 'Erro ao remover ticket' },
      { status: 500 }
    )
  }
}
