"use client"

import { useState } from "react"
import { Bar, Doughnut } from "react-chartjs-2"
import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import type { ChartData, ChartOptions } from 'chart.js'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

interface RevenueBreakdownProps {
  dateRange: {
    from: string
    to: string
  }
}

export const RevenueBreakdown = ({ dateRange }: RevenueBreakdownProps) => {
  const [selectedView, setSelectedView] = useState<"category" | "product" | "time">("category")

  // Mock data for revenue by category
  const categoryData: ChartData<"doughnut"> = {
    labels: ['Electronics', 'Clothing', 'Accessories', 'Home & Living', 'Books'],
    datasets: [
      {
        data: [35000, 25000, 20000, 15000, 10000],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',   // blue
          'rgba(16, 185, 129, 0.8)',   // green
          'rgba(245, 158, 11, 0.8)',   // yellow
          'rgba(139, 92, 246, 0.8)',   // purple
          'rgba(236, 72, 153, 0.8)',   // pink
        ],
        borderWidth: 1
      }
    ]
  }

  // Mock data for revenue over time
  const timeData: ChartData<"bar"> = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 17000, 22000, 25000, 20000],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      }
    ]
  }

  // Mock data for top products by revenue
  const topProducts = [
    { name: "Wireless Headphones", revenue: 25000, growth: 15.2 },
    { name: "Smart Watch", revenue: 18000, growth: -8.5 },
    { name: "Laptop Bag", revenue: 15000, growth: 12.3 },
    { name: "Phone Case", revenue: 12000, growth: -5.2 },
    { name: "USB Cable", revenue: 10000, growth: 7.8 }
  ]

  const chartOptions: ChartOptions<"doughnut" | "bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: selectedView === "category",
        position: 'right' as const,
        labels: {
          color: '#e5e7eb'
        }
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
    scales: selectedView === "time" ? {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(75, 85, 99, 0.2)'
        },
        ticks: {
          color: '#e5e7eb',
          callback: (value) => `$${value.toLocaleString()}`
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
    } : undefined
  }

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-400" />
            <h2 className="text-lg font-medium">Revenue Breakdown</h2>
          </div>
          <div className="flex gap-2">
            {(['category', 'product', 'time'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setSelectedView(view)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  selectedView === view
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart */}
          <div className="h-[400px] flex items-center justify-center">
            {selectedView === "category" && <Doughnut data={categoryData} options={chartOptions} />}
            {selectedView === "time" && <Bar data={timeData} options={chartOptions} />}
            {selectedView === "product" && (
              <div className="w-full space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={product.name}
                    className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-400">${product.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 ${
                      product.growth >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {product.growth >= 0 ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                      <span>{Math.abs(product.growth)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Summary Stats */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Total Revenue</p>
                <p className="text-2xl font-bold">$105,000</p>
                <p className="text-sm text-green-400">+12.5% vs last period</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Average Order Value</p>
                <p className="text-2xl font-bold">$85</p>
                <p className="text-sm text-green-400">+5.2% vs last period</p>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-400 mb-4">Revenue Insights</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span>Electronics category shows highest growth</span>
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span>Weekend sales outperform weekdays</span>
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span>Premium products drive higher margins</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 