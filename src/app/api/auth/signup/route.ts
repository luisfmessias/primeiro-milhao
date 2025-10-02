import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET as string

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "E-mail e senha são obrigatórios" },
        { status: 400 }
      )
    }

    // Verifica se o usuário já existe
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json(
        { error: "Usuário já existe" },
        { status: 400 }
      )
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Cria o usuário no banco
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
      },
    })

    // Gera token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    })

    // Define cookie HTTP-only com o token
    const res = NextResponse.json({ message: "Cadastro realizado com sucesso" })
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: false, // sempre falso em dev/local

      path: "/",
      maxAge: 60 * 60 * 24, 
    })

    return res
  } catch (err) {
    console.error("Erro no signup:", err)
    return NextResponse.json(
      { error: "Erro interno no cadastro" },
      { status: 500 }
    )
  }
}
