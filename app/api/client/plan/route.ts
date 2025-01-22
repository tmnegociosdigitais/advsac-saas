import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // TODO: Pegar o clientId do usuário autenticado
    const clientId = 'client_id_here' // Temporário

    const client = await prisma.client.findUnique({
      where: { id: clientId },
      include: {
        plan: true
      }
    })

    if (!client) {
      return NextResponse.json(
        { error: 'Cliente não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(client.plan)
  } catch (error) {
    console.error('Erro ao buscar plano do cliente:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar plano do cliente' },
      { status: 500 }
    )
  }
}
