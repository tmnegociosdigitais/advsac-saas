"use client"

import React from 'react'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js'

// Registrar os componentes necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

// Interface para as props dos componentes de gráfico
interface ChartProps {
  data?: number[]
  height?: number
}

// Opções padrão para os gráficos
const defaultOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
    },
  },
}

export function LineChart({ data = [], height = 300 }: ChartProps) {
  const chartData = {
    labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
    datasets: [
      {
        data: Array.isArray(data) && data.length ? data : [0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: '#6366f1',
        backgroundColor: '#6366f1',
        tension: 0.4,
      },
    ],
  }

  return (
    <div style={{ height }}>
      <Line data={chartData} options={defaultOptions} />
    </div>
  )
}

export function BarChart({ data = [], height = 300 }: ChartProps) {
  const chartData = {
    labels: ['Setor 1', 'Setor 2', 'Setor 3', 'Setor 4', 'Setor 5'],
    datasets: [
      {
        data: Array.isArray(data) && data.length ? data : [0, 0, 0, 0, 0],
        backgroundColor: '#6366f1',
      },
    ],
  }

  return (
    <div style={{ height }}>
      <Bar data={chartData} options={defaultOptions} />
    </div>
  )
}
