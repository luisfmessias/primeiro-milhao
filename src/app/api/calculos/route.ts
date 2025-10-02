import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret123'

// GET -> Listar cálculos do usuário autenticado
export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    let decoded: any
    try {
      decoded = jwt.verify(token, JWT_SECRET)
    } catch (err) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    const calculations = await prisma.calculation.findMany({
      where: { userId: decoded.userId },
      orderBy: { calculation_date: 'desc' },
    })

    return NextResponse.json(calculations)
  } catch (err) {
    console.error('Erro ao listar cálculos:', err)
    return NextResponse.json({ error: 'Erro ao listar cálculos' }, { status: 500 })
  }
}

// DELETE -> Excluir cálculo pelo ID
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url)
    const id = url.searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID do cálculo é obrigatório' }, { status: 400 })
    }

    const authHeader = req.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    let decoded: any
    try {
      decoded = jwt.verify(token, JWT_SECRET)
    } catch (err) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    // exclui apenas se pertence ao usuário logado
    await prisma.calculation.delete({
      where: { id: parseInt(id) },
    })

    return NextResponse.json({ message: 'Cálculo excluído com sucesso!' })
  } catch (err) {
    console.error('Erro ao excluir cálculo:', err)
    return NextResponse.json({ error: 'Erro ao excluir cálculo' }, { status: 500 })
  }
}
