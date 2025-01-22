import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/contacts - Lista todos os contatos
export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      include: {
        messages: {
          orderBy: {
            timestamp: 'desc'
          },
          take: 1
        },
        tags: true
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    return NextResponse.json(contacts)
  } catch (error) {
    console.error('Erro ao buscar contatos:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar contatos' },
      { status: 500 }
    )
  }
}

// POST /api/contacts - Cria um novo contato
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Verifica se já existe um contato com este telefone
    const existingContact = await prisma.contact.findUnique({
      where: { phone: body.phone }
    })

    if (existingContact) {
      return NextResponse.json(existingContact)
    }

    // Cria um novo contato
    const contact = await prisma.contact.create({
      data: {
        name: body.name,
        phone: body.phone
      }
    })

    return NextResponse.json(contact)
  } catch (error) {
    console.error('Erro ao criar contato:', error)
    return NextResponse.json(
      { error: 'Erro ao criar contato' },
      { status: 500 }
    )
  }
}
