import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUserIdFromRequest } from "@/lib/auth"

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const userId = await getUserIdFromRequest(req)
  if (!userId) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const calc = await prisma.calculation.findUnique({
    where: { id: Number(params.id) },
  })

  if (!calc || calc.userId !== userId) {
    return NextResponse.json({ error: "Cálculo não encontrado" }, { status: 404 })
  }

  await prisma.calculation.delete({ where: { id: calc.id } })
  return NextResponse.json({ message: "Cálculo excluído" })
}
