"use client"

import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

type Props = {
  dataSimulacao: { mes: number; total: number }[]
}

export default function ChartSimulacao({ dataSimulacao }: Props) {
  const data = {
    labels: dataSimulacao.map((d) => `Mês ${d.mes}`),
    datasets: [
      {
        label: "Total acumulado",
        data: dataSimulacao.map((d) => d.total),
        borderColor: "#16F96A",
        backgroundColor: "#16F96A",
        pointBackgroundColor: "#00fa5c", 
        pointBorderColor: "#0E1527",
        tension: 0.25,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          color: "#16F96A", 
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#aaa",
        },
        grid: {
          color: "#072e2392", // cor das linhas de grade verticais
        },
      },
      y: {
        ticks: {
          color: "#aaa", // cor dos valores à esquerda
        },
        grid: {
          color: "#072e2392", // cor das linhas de grade horizontais
        },
      },
    },
  }

  return <Line data={data} options={options} />
}
