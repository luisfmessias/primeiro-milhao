import { NextResponse } from "next/server"

export async function POST() {
  const res = NextResponse.json({ message: "Logout realizado" })
  res.cookies.set("token", "", {
    httpOnly: true,
    secure: false,
    path: "/",
    maxAge: 0, 
  })
  return res
}
