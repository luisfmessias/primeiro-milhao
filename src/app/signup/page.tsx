"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from 'next/link'


export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      })

      if (res.ok) {
        // ✅ cookie já é setado no backend
        router.push("/calculadora")
      } else {
        const data = await res.json()
        alert(data.error || "Erro no cadastro")
      }
    } catch (error) {
      console.error("Erro no signup:", error)
      alert("Erro ao tentar cadastrar.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center m-auto bg-[#0E1527] h-130 w-100 rounded-3xl border-2 border-[#169F49] shadow-[0_0_1000px_0px_#169f4842] ">

      <form onSubmit={handleSubmit} className="flex flex-col items-center">


        <div className="mb-6">
          <div className="bg-[#169F49] w-16 h-16 flex items-center justify-center rounded-2xl shadow-[0_0_100px_20px_#11d4593d]">
            <i className="fa-solid fa-user text-3xl text-white"></i>
          </div>
        </div>

        <h1 className="text-3xl font-semibold mb-2 text-white">Cadastrar</h1>
        <p className="text-[#929292] mb-6">O primeiro milhão começa com um clique</p>

        <div className="w-full mb-4">
          <p className="text-sm text-gray-300 mb-1 ml-1">Email</p>
          <input
            type="email"
            placeholder="Seu Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-2 py-2 rounded-lg text-white bg-transparent border border-gray-600 focus:border-[#169F49] outline-none placeholder-gray-600"
            required
          />
        </div>
        
        <div className="w-full mb-9">
          <p className="text-sm text-gray-300 mb-1">Senha</p>
          <input
            type="password"
            placeholder="Sua Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-2 py-2  text-white rounded-lg bg-transparent border border-gray-600 focus:border-[#169F49] outline-none placeholder-gray-600"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="text-white w-full  py-2 bg-[#169F49] rounded-lg font-semibold hover:bg-[#138f3d] shadow-[0_0_1000px_30px_#169f485e] transition"
        >
          {loading ? "Cadastrando..." : "Criar Conta"}
        </button>

        <div className="w-full h-[0.1px] bg-white mt-8"> </div>

        <div className="flex gap-3 text-white mt-3 text-sm
  ">
          <p>Já tem uma Conta?</p>
          <Link className="text-[#169F49]" href="./login">Entrar</Link>
        </div>

      </form>
    </div>
  )
}
