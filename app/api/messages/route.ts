import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// POST /api/messages - Envia uma nova mensagem
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Busca o ticket
    const ticket = await prisma.ticket.findUnique({
      where: { id: body.ticketId },
      include: { contact: true }
    })

    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket não encontrado' },
        { status: 404 }
      )
    }

    // Cria a mensagem
    const message = await prisma.message.create({
      data: {
        from: 'Atendente', // TODO: Pegar o nome do usuário logado
        to: ticket.contact.phone,
        content: body.message,
        status: 'sent',
        ticket: {
          connect: { id: ticket.id }
        },
        contact: {
          connect: { id: ticket.contact.id }
        }
      }
    })

    // TODO: Integrar com a API do WhatsApp para enviar a mensagem

    // Atualiza o status do ticket se necessário
    if (ticket.status === 'WAITING') {
      await prisma.ticket.update({
        where: { id: ticket.id },
        data: { status: 'OPEN' }
      })
    }

    return NextResponse.json(message)
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error)
    return NextResponse.json(
      { error: 'Erro ao enviar mensagem' },
      { status: 500 }
    )
  }
}
