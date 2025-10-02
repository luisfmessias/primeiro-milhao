import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUserIdFromRequest } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromRequest(req)
    if (!userId) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const body = await req.json()
    const {
      title = "Simulação sem nome",
      initialContribution,
      monthlyContribution,
      monthlyRate,
      monthsToGoal,
    } = body

    const calc = await prisma.calculation.create({
      data: {
        userId,
        title,
        initialContribution: Number(initialContribution),
        monthlyContribution: Number(monthlyContribution),
        monthlyRate: Number(monthlyRate),
        monthsToGoal: Number(monthsToGoal),
      },
    })

    return NextResponse.json(calc, { status: 201 })
  } catch (err: any) {
    console.error("Erro ao salvar cálculo:", err)
    return NextResponse.json({ error: err.message || "Erro interno" }, { status: 500 })
  }
}
