"use client"

import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface ConversionFunnelProps {
  dateRange: string
}

export const ConversionFunnel = ({ dateRange }: ConversionFunnelProps) => {
  // Mock data - replace with actual API call based on dateRange
  const data = {
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
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(249, 115, 22)',
          'rgb(139, 92, 246)',
          'rgb(236, 72, 153)',
        ],
        borderWidth: 1,
      }
    ]
  }

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: "rgb(30, 41, 59)", // slate-800
        titleColor: "rgb(229, 231, 235)", // gray-200
        bodyColor: "rgb(229, 231, 235)", // gray-200
        borderColor: "rgb(51, 65, 85)", // slate-700
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context: any) {
            const value = context.raw
            const total = data.datasets[0].data[0]
            const percentage = ((value / total) * 100).toFixed(1)
            return `${value.toLocaleString()} users (${percentage}% of visitors)`
          }
        }
      }
    },
    scales: {
      y: {
        grid: {
          display: false
        },
        ticks: {
          color: "rgb(156, 163, 175)", // gray-400
          font: {
            size: 12
          }
        }
      },
      x: {
        beginAtZero: true,
        grid: {
          color: "rgba(51, 65, 85, 0.3)", // slate-700 with opacity
          drawBorder: false
        },
        ticks: {
          color: "rgb(156, 163, 175)", // gray-400
          padding: 8,
          callback: function(value: any) {
            return value.toLocaleString()
          }
        }
      }
    }
  }

  // Calculate conversion rates
  const conversionRates = data.datasets[0].data.map((value, index) => {
    if (index === 0) return 100
    const previousValue = data.datasets[0].data[index - 1]
    return ((value / previousValue) * 100).toFixed(1)
  })

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-700">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-medium text-white">Conversion Funnel</h2>
          <p className="text-sm text-gray-400">User journey conversion rates</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-medium text-white">
            {((data.datasets[0].data[4] / data.datasets[0].data[0]) * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-green-400">Overall Conversion Rate</p>
        </div>
      </div>

      <div className="h-[350px]">
        <Bar data={data} options={options} />
      </div>

      <div className="grid grid-cols-5 gap-2 mt-4">
        {conversionRates.map((rate, index) => (
          <div key={data.labels[index]} className="text-center">
            <p className="text-xs text-gray-400">{data.labels[index]}</p>
            <p className="text-sm font-medium text-white">{rate}%</p>
          </div>
        ))}
      </div>
    </div>
  )
} 