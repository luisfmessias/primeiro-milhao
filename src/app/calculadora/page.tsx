"use client"

import { useState } from "react"
import ChartSimulacao from "@/components/ChartSimulacao"
import Link from 'next/link'


type Resultado = {
  mes: number
  total: number
}

export default function CalculadoraPage() {
  const [initialContribution, setInitialContribution] = useState("")
  const [monthlyContribution, setMonthlyContribution] = useState("")
  const [monthlyRate, setMonthlyRate] = useState("1")
  const [resultado, setResultado] = useState<Resultado[]>([])
  const [mesesParaMilhao, setMesesParaMilhao] = useState<number | null>(null)
  const [title, setTitle] = useState("")


  const handleCalcular = async () => {
    const initial = Number(initialContribution)
    const monthly = Number(monthlyContribution)
    const rate = Number(monthlyRate) / 100

    if (
      !initialContribution || !monthlyContribution || !monthlyRate ||
      isNaN(initial) || isNaN(monthly) || isNaN(rate) ||
      initial < 0 || monthly < 0 || rate < 0
    ) {
      alert("Preencha todos os campos corretamente antes de calcular!")
      return
    }

    let saldo = initial
    let meses = 0
    let aporteAcumulado = initial
    let rendimentoAcumulado = 0
    const resultados: Resultado[] = []

    while (saldo < 1_000_000) {
      meses++
      const rendimentoMes = saldo * rate
      saldo = saldo + rendimentoMes + monthly

      aporteAcumulado += monthly
      rendimentoAcumulado += rendimentoMes

      resultados.push({
        mes: meses,
        ano: Math.ceil(meses / 12),
        aporteMes: monthly,
        aporteAcumulado,
        rendimentoMes,
        rendimentoAcumulado,
        total: saldo,
      })
    }

    setResultado(resultados)
    setMesesParaMilhao(meses)

    try {
      await fetch("/api/calculos/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title,
          initialContribution: initial,
          monthlyContribution: monthly,
          monthlyRate: rate * 100,
          monthsToGoal: meses,
        }),
      })
    } catch (err) {
      console.error("Erro ao salvar cálculo:", err)
    }
  }


  return (

    <div className="p-6 max-w-6xl mx-auto text-center text-white">

      <div className="mb-6">
        <h1 className="text-5xl font-bold text-[#16F96A] mb-6 [text-shadow:0_0_200px_#16F96A]">Calculadora</h1>
        <p className="text-[#16F96A] mt-1 text-3xl font-semibold"><span className="text-white">Sua jornada até</span> R$ 1.000.000</p>
      </div>

      <div className="w-50 h-[2] bg-radial from-white from-10% to-[#16F96A] mb-8 m-auto"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="border border-[#169F49] rounded-2xl p-4 shadow-[inset_0_0_100px_0px_#169f4829]">
          <p className="text-gray-500 mb-3 ">Total Final</p>
          <h2 className="text-2xl font-bold ">
            R$ {resultado.length > 0 ? resultado[resultado.length - 1].total.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) : "0,00"}
          </h2>
        </div>

        <div className="border border-[#169F49] rounded-2xl p-4 shadow-[inset_0_0_100px_0px_#169f4829]">
          <p className="text-gray-500 mb-3">Tempo para 1M</p>
          {mesesParaMilhao && (
            <h2 className="text-2xl font-bold">
              {mesesParaMilhao} meses ({(mesesParaMilhao / 12).toFixed(1)} anos)
            </h2>
          )}
        </div>

        <div className="border border-[#169F49] rounded-2xl p-4 shadow-[inset_0_0_100px_0px_#169f4829]">
          <p className="text-gray-500 mb-3">Meta</p>
          <h2 className="text-2xl font-bold text-[#16F96A]">R$ 1.000.000</h2>
        </div>
      </div>

      <div className="border border-[#169F49] rounded-2xl p-6 mb-8 bg-[#169f4811]">
        <h1 className="text-3xl font-semibold mb-4 [text-shadow:0_0_170px_#16F96A]">Configure seus parâmetros</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="flex flex-col">
            <p className="text-sm text-gray-300 mb-1 mt-5">Aporte Inicial</p>
            <input
              type="number"
              placeholder="R$"
              value={initialContribution}
              onChange={(e) => setInitialContribution(e.target.value)}
              className="border rounded-lg px-4 py-2 w-full bg-transparent border-[#169F49] focus:border-[#169F49] outline-none"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-sm text-gray-300 mb-1 mt-5">Aporte Mensal</p>
            <input
              type="number"
              placeholder="R$"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              className="border rounded-lg px-4 py-2 w-full bg-transparent border-[#169F49] focus:border-[#169F49] outline-none"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-sm text-gray-300 mb-1 mt-5">Taxa de Juros (%)</p>
            <input
              type="number"
              placeholder="%"
              value={monthlyRate}
              onChange={(e) => setMonthlyRate(e.target.value)}
              className="border rounded-lg px-4 py-2 w-full bg-transparent border-[#169F49] focus:border-[#169F49] outline-none"
            />
          </div>

        </div>

        <div className="flex flex-col mb-4">
          <label className="text-sm text-gray-300 mb-2 mt-6">Nome da Simulação</label>
          <input
            type="text"
            placeholder="Ex: Aposentadoria, Casa nova..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full bg-transparent border-[#169F49] focus:border-[#169F49] outline-none"
          />
        </div>

        <button
          onClick={handleCalcular}
          className="cursor-pointer mt-6 mb-6 bg-[#169F49] w-85 text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#04862f] shadow-[0_0_60px_2px_rgba(22,159,73,0.5)] transition"
        >
          Calcular
        </button>




        <Link href="/historico">
          <button
            className=" gotohis cursor-pointer mt-6 mb-6 ml-6 w-100 border border-[#169F49] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#04862f] shadow-[0_0_60px_2px_rgba(22,159,73,0.5)] transition"
          >
            Ir para o Histórico
          </button>
        </Link>


      </div>

      {resultado.length > 0 && (
        <>
          <div className="border border-[#169F49] rounded-2xl p-6 mb-8 bg-[#169f4811] shadow-[0_0_300px_0px_#00fa5c2b]">
            <h2 className="text-3xl font-semibold mb-4  [text-shadow:0_0_200px_#16F96A] ">Evolução do Patrimônio</h2>
            <ChartSimulacao dataSimulacao={resultado} />
          </div>


          <div className="border border-[#169F49] rounded-2xl p-6 bg-[#169f4811] shadow-[0_0_300px_0px_#00fa5c2b]">
            <h2 className="text-3xl font-bold mb-4 [text-shadow:0_0_200px_#16F96A]">Tabela de Evolução</h2>

            <div className="max-h-100 overflow-y-auto rounded-2xl">

              <table className="table-auto text-sm w-full">
                <thead className="bg-[#072322] text-[#00ff5eba]">
                  <tr>
                    <th className="px-4 py-2">Mês/Ano</th>
                    <th className="px-4 py-2">Aporte do Mês</th>
                    <th className="px-4 py-2">Aporte Acumulado</th>
                    <th className="px-4 py-2">Rendimento do Mês</th>
                    <th className="px-4 py-2">Rendimento Acumulado</th>
                    <th className="px-4 py-2">Total Acumulado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#00ff5e14]">
                  {resultado.map((r) => (
                    <tr key={r.mes} className="hover:bg-[#01612411] transition">
                      <td className="px-4 py-2">{`Mês ${r.mes} / Ano ${r.ano}`}</td>
                      <td className="px-4 py-2">R$ {r.aporteMes.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                      <td className="px-4 py-2">R$ {r.aporteAcumulado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                      <td className="px-4 py-2">R$ {r.rendimentoMes.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                      <td className="px-4 py-2">R$ {r.rendimentoAcumulado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                      <td className="px-4 py-2 text-[#ffffff]">R$ {r.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>


        </>
      )}
    </div>

  )
}
