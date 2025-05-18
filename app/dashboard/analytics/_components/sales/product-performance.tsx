"use client"

import { Bar } from "react-chartjs-2"
import type { ChartData, ChartOptions } from 'chart.js'
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown } from "lucide-react"
import Image from "next/image"

interface ProductPerformanceProps {
  dateRange: {
    from: string
    to: string
  }
}

interface TopProduct {
  id: string
  name: string
  image: string
  sales: number
  revenue: number
  trend: number
  category: string
}

export const ProductPerformance = ({ dateRange }: ProductPerformanceProps) => {
  const topProducts: TopProduct[] = [
    {
      id: "1",
      name: "Wireless Headphones",
      image: "https://picsum.photos/seed/1/40/40",
      sales: 245,
      revenue: 24500,
      trend: 12.5,
      category: "Electronics"
    },
    {
      id: "2",
      name: "Smart Watch",
      image: "https://picsum.photos/seed/2/40/40",
      sales: 190,
      revenue: 18750,
      trend: -4.3,
      category: "Electronics"
    },
    {
      id: "3",
      name: "Running Shoes",
      image: "https://picsum.photos/seed/3/40/40",
      sales: 175,
      revenue: 15750,
      trend: 8.7,
      category: "Sports"
    }
  ]

  const chartData: ChartData<"bar"> = {
    labels: topProducts.map(p => p.name),
    datasets: [
      {
        label: 'Revenue',
        data: topProducts.map(p => p.revenue),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderRadius: 4
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
        borderColor: 'rgb(75, 85, 99)',
        borderWidth: 1,
        titleColor: '#e5e7eb',
        bodyColor: '#e5e7eb',
        padding: 12,
        callbacks: {
          label: function(context) {
            const value = context.raw as number
            return `Revenue: $${value.toLocaleString()}`
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
    }
  }

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
      <h2 className="text-lg font-medium text-white mb-6">Product Performance</h2>

      {/* Revenue Chart */}
      <div className="h-[200px] mb-6">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Top Products List */}
      <div className="space-y-4">
        {topProducts.map((product) => (
          <div 
            key={product.id}
            className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Image
                src={product.image}
                alt={product.name}
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <h4 className="font-medium text-white">{product.name}</h4>
                <p className="text-sm text-gray-400">{product.category}</p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div>
                <p className="text-sm text-gray-400">Sales</p>
                <p className="font-medium text-white">{product.sales}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Revenue</p>
                <p className="font-medium text-white">${product.revenue.toLocaleString()}</p>
              </div>
              <div className={`flex items-center gap-1 ${
                product.trend > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {product.trend > 0 ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
                <span className="font-medium">{Math.abs(product.trend)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-900/50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Best Performer</p>
              <p className="text-lg font-medium text-white">Wireless Headphones</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-900/50 rounded-lg">
              <TrendingDown className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Needs Attention</p>
              <p className="text-lg font-medium text-white">Smart Watch</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 