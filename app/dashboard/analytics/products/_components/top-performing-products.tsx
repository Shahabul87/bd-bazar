"use client"

import { Bar } from "react-chartjs-2"
import { TrendingUp, ArrowRight } from "lucide-react"
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

interface TopPerformingProductsProps {
  dateRange: {
    from: string
    to: string
  }
}

export const TopPerformingProducts = ({ dateRange }: TopPerformingProductsProps) => {
  // Mock data
  const topProducts = [
    { name: "Wireless Headphones", revenue: 25000, growth: 15.2, units: 500 },
    { name: "Smart Watch", revenue: 18000, growth: 12.8, units: 300 },
    { name: "Laptop Bag", revenue: 15000, growth: 10.5, units: 450 },
    { name: "Phone Case", revenue: 12000, growth: 8.9, units: 800 },
    { name: "USB Cable", revenue: 10000, growth: 7.2, units: 1200 }
  ]

  const chartData: ChartData<"bar"> = {
    labels: topProducts.map(p => p.name),
    datasets: [
      {
        label: 'Revenue',
        data: topProducts.map(p => p.revenue),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
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
        borderWidth: 1
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

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <h2 className="text-lg font-medium">Top Performing Products</h2>
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
            {topProducts.map((product, index) => (
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
                  <p className="text-sm text-green-400">+{product.growth}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 