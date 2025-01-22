import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/tickets/[id]/messages - Lista todas as mensagens de um ticket
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const messages = await prisma.message.findMany({
      where: {
        ticketId: params.id
      },
      orderBy: {
        timestamp: 'asc'
      }
    })

    return NextResponse.json(messages)
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar mensagens' },
      { status: 500 }
    )
  }
}
