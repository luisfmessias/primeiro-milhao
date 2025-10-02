import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET as string

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
      return NextResponse.json({ error: "Senha inválida" }, { status: 401 })
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    })

    // 🔥 define o cookie no servidor
    const res = NextResponse.json({ message: "Login realizado com sucesso" })
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: false, // sempre falso em dev/local
      path: "/",
      maxAge: 60 * 60 * 24, // 1 dia
    })


    return res
  } catch (err) {
    console.error("Erro no login:", err)
    return NextResponse.json({ error: "Erro interno no login" }, { status: 500 })
  }
}
