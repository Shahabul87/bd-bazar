"use client"

import { TrendingDown, ArrowRight, AlertTriangle } from "lucide-react"
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

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface LowPerformingProductsProps {
  dateRange: {
    from: string
    to: string
  }
}

export const LowPerformingProducts = ({ dateRange }: LowPerformingProductsProps) => {
  // Mock data
  const lowProducts = [
    { name: "Bluetooth Speaker", revenue: 5000, decline: -25.5, units: 50 },
    { name: "Tablet Case", revenue: 3800, decline: -22.8, units: 120 },
    { name: "Power Bank", revenue: 3200, decline: -20.5, units: 80 },
    { name: "Screen Protector", revenue: 2500, decline: -18.9, units: 200 },
    { name: "Mouse Pad", revenue: 1800, decline: -15.2, units: 150 }
  ]

  const chartData: ChartData<"bar"> = {
    labels: lowProducts.map(p => p.name),
    datasets: [
      {
        label: 'Revenue Decline (%)',
        data: lowProducts.map(p => Math.abs(p.decline)),
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1
      }
    ]
  }

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgb(17, 24, 39)',
        titleColor: 'rgb(229, 231, 235)',
        bodyColor: 'rgb(229, 231, 235)',
        padding: 12,
        borderColor: 'rgb(75, 85, 99)',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return `Decline: ${context.raw}%`
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
          color: '#e5e7eb',
          callback: function(value) {
            return value + '%'
          }
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

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-red-400" />
            <h2 className="text-lg font-medium">Low Performing Products</h2>
          </div>
          <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
            View All
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Chart */}
          <div className="h-[300px]">
            <Bar data={chartData} options={chartOptions} />
          </div>

          {/* Products List */}
          <div className="space-y-4">
            {lowProducts.map((product, index) => (
              <div
                key={product.name}
                className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-400">{product.units} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${product.revenue.toLocaleString()}</p>
                  <p className="text-sm text-red-400">{product.decline}%</p>
                </div>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="mt-6 p-4 bg-red-900/20 border border-red-900/50 rounded-lg">
            <h3 className="flex items-center gap-2 text-red-400 font-medium mb-2">
              <AlertTriangle className="h-5 w-5" />
              Recommendations
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Consider price adjustments for better market positioning</li>
              <li>• Review marketing strategies for these products</li>
              <li>• Analyze customer feedback and product reviews</li>
              <li>• Evaluate inventory levels and holding costs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 