import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUserIdFromRequest } from "@/lib/auth"

export async function GET(req: Request) {
  try {
    const userId = await getUserIdFromRequest(req)
    if (!userId) return NextResponse.json([], { status: 200 })

    const calculos = await prisma.calculation.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        createdAt: true,
        initialContribution: true,
        monthlyContribution: true,
        monthlyRate: true,
        monthsToGoal: true,
      },
    })

    return NextResponse.json(calculos)
  } catch (err) {
    console.error("Erro ao listar cálculos:", err)
    return NextResponse.json([], { status: 200 })
  }
}
