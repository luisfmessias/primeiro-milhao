"use client"
import { useEffect, useState } from "react"

type Calculo = {
  id: number
  initialContribution: number
  monthlyContribution: number
  monthlyRate: number
  monthsToGoal: number
  createdAt: string
}

export default function HistoricoPage() {
  const [calculos, setCalculos] = useState<Calculo[]>([])

  const carregar = async () => {
    const res = await fetch("/api/calculos/list", { cache: "no-store" })
    if (res.ok) {
      const data = await res.json()
      setCalculos(Array.isArray(data) ? data : []) // 🔥 evita erro
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/calculos/${id}`, { method: "DELETE" })
    if (res.ok) {
      setCalculos((prev) => prev.filter((c) => c.id !== id)) // 🔥 remove da tela
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-6 text-center text-[#16F96A] [text-shadow:0_0_150px_#16F96A]">
        Histórico de Cálculos
      </h1>

      {calculos.length === 0 ? (
        <p className="text-gray-400 text-center mt-8">Nenhum cálculo encontrado.</p>
      ) : (
        <div className="border border-[#169F49] rounded-2xl p-6 bg-[#169f4811] shadow-[0_0_300px_0px_#00fa5c2b]">
          <div className="max-h-[500px] overflow-y-auto rounded-2xl">
            <table className="table-auto text-sm w-full">
              <thead className="bg-[#072322] sticky top-0 text-[#00ff5eba]">
                <tr>
                  <th className="px-6 py-3 font-medium">Nome</th>
                  <th className="px-6 py-3 font-medium">Data</th>
                  <th className="px-6 py-3 font-medium">Inicial</th>
                  <th className="px-6 py-3 font-medium">Mensal</th>
                  <th className="px-6 py-3 font-medium">Taxa (%)</th>
                  <th className="px-6 py-3 font-medium">Meses</th>
                  <th className="px-6 py-3 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#00ff5e14]">
                {calculos.map((calc) => (
                  <tr key={calc.id} className="hover:bg-[#01612411] transition text-center">
                    <td className="px-6 py-3 text-left">{calc.title}</td>
                    <td className="px-6 py-3">
                      {new Date(calc.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-6 py-3 text-[#16F96A]">
                      R$ {calc.initialContribution.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-3 text-[#16F96A]">
                      R$ {calc.monthlyContribution.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-3">{calc.monthlyRate}%</td>
                    <td className="px-6 py-3">{calc.monthsToGoal}</td>
                    <td className="px-6 py-3">
                      <button
                    onClick={() => handleDelete(calc.id)}
                    className="px-3 py-1 rounded-lg bg-red-600 font-semibold hover:bg-red-700 transition cursor-pointer shadow-[0_0_20px_2px_rgba(255,0,0,0.4)]"
                  >
                    <i className="fa-solid fa-trash mr-1"></i> Excluir
                  </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      )}
    </div>

  )
}
