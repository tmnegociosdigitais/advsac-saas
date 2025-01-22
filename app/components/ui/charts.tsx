/**
 * Componentes de gráficos usando react-chartjs-2
 * Este arquivo contém os componentes LineChart e BarChart que são usados no Dashboard
 * para exibir dados estatísticos de forma visual.
 */

'use client'

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
  ChartOptions,
} from 'chart.js'
import { useTheme } from '@/hooks/ThemeContext'

// Registra os componentes necessários do Chart.js
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

/**
 * Interface para as props dos componentes de gráfico
 * @param data Array de dados a serem exibidos no gráfico
 * @param height Altura opcional do gráfico em pixels (padrão: 300)
 */
interface ChartProps {
  data: any[]
  height?: number
}

/**
 * Componente de gráfico de linha
 * Usado para mostrar tendências ao longo do tempo (ex: atendimentos por hora)
 * 
 * @param data Array de dados para o gráfico (usa [0,0,0,...] se vazio)
 * @param height Altura do gráfico em pixels
 */
export function LineChart({ data = [], height = 300 }: ChartProps) {
  const { theme } = useTheme()

  const defaultOptions: ChartOptions<'line'> = {
    responsive: true,
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
        ticks: {
          color: theme === 'dark' ? '#94a3b8' : '#64748b',
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: theme === 'dark' ? '#1e293b' : '#f3f4f6',
        },
        ticks: {
          color: theme === 'dark' ? '#94a3b8' : '#64748b',
        }
      },
    },
  }

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

/**
 * Componente de gráfico de barras
 * Usado para comparar valores entre diferentes categorias (ex: atendimentos por setor)
 * 
 * @param data Array de dados para o gráfico (usa [0,0,0,...] se vazio)
 * @param height Altura do gráfico em pixels
 */
export function BarChart({ data = [], height = 300 }: ChartProps) {
  const { theme } = useTheme()

  const defaultOptions: ChartOptions<'bar'> = {
    responsive: true,
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
        ticks: {
          color: theme === 'dark' ? '#94a3b8' : '#64748b',
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: theme === 'dark' ? '#1e293b' : '#f3f4f6',
        },
        ticks: {
          color: theme === 'dark' ? '#94a3b8' : '#64748b',
        }
      },
    },
  }

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
