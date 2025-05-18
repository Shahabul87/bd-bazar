"use client"

import { Bar } from "react-chartjs-2"
import type { ChartData, ChartOptions } from 'chart.js'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Register the chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface ConversionFunnelProps {
  dateRange: {
    from: string
    to: string
  }
}

export const ConversionFunnel = ({ dateRange }: ConversionFunnelProps) => {
  const data: ChartData<"bar"> = {
    labels: ['Visitors', 'Product Views', 'Add to Cart', 'Checkout', 'Purchase'],
    datasets: [
      {
        data: [10000, 7500, 5000, 3000, 2000],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',  // blue-500
          'rgba(16, 185, 129, 0.8)',  // green-500
          'rgba(249, 115, 22, 0.8)',  // orange-500
          'rgba(139, 92, 246, 0.8)',  // purple-500
          'rgba(236, 72, 153, 0.8)',  // pink-500
        ],
        borderRadius: 4
      }
    ]
  }

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgb(17, 24, 39)',
        borderColor: 'rgb(75, 85, 99)',
        borderWidth: 1,
        titleColor: '#e5e7eb',
        bodyColor: '#e5e7eb',
        padding: 12,
        callbacks: {
          label: function(context) {
            const value = context.raw as number
            const total = data.datasets[0].data[0] as number
            const percentage = ((value / total) * 100).toFixed(1)
            return `${value.toLocaleString()} users (${percentage}%)`
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(75, 85, 99, 0.2)'
        },
        ticks: {
          color: '#e5e7eb'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#e5e7eb'
        }
      }
    }
  }

  // Calculate conversion rates
  const conversionRates = data.datasets[0].data.map((value, index) => {
    if (index === 0) return 100
    const previousValue = data.datasets[0].data[index - 1] as number
    return ((value as number / previousValue) * 100).toFixed(1)
  })

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-medium text-white">Conversion Funnel</h2>
          <p className="text-sm text-gray-400">User journey conversion rates</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-medium text-white">
            {((data.datasets[0].data[4] as number / (data.datasets[0].data[0] as number)) * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-green-400">Overall Conversion Rate</p>
        </div>
      </div>

      <div className="h-[350px]">
        <Bar data={data} options={options} />
      </div>

      <div className="grid grid-cols-5 gap-2 mt-4">
        {conversionRates.map((rate, index) => (
          <div key={data.labels?.[index]} className="text-center">
            <p className="text-xs text-gray-400">{data.labels?.[index]}</p>
            <p className="text-sm font-medium text-white">{rate}%</p>
          </div>
        ))}
      </div>
    </div>
  )
} 