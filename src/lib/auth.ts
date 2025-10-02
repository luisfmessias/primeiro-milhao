// src/lib/auth.ts
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "secret123")

export async function getUserIdFromRequest(req: Request): Promise<number | null> {
  const cookieHeader = req.headers.get("cookie") || ""
  const token = cookieHeader
    .split("token=")[1]
    ?.split(";")[0]

  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    // no login/signup nós colocamos { id, email } no token
    return (payload as any).id ?? null
  } catch (err) {
    console.error("Token inválido:", err)
    return null
  }
}
