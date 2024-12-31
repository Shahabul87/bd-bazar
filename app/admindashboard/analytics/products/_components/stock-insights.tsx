"use client"

import { useState } from "react"
import { Package, AlertTriangle, ArrowRight, RefreshCw } from "lucide-react"
import { Doughnut } from "react-chartjs-2"
import type { ChartData, ChartOptions } from 'chart.js'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

interface StockInsightsProps {
  dateRange: {
    from: string
    to: string
  }
}

export const StockInsights = ({ dateRange }: StockInsightsProps) => {
  const [selectedView, setSelectedView] = useState<"overview" | "details">("overview")

  // Mock data for stock distribution
  const stockData: ChartData<"doughnut"> = {
    labels: ['In Stock', 'Low Stock', 'Out of Stock'],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',  // green
          'rgba(245, 158, 11, 0.8)',  // yellow
          'rgba(239, 68, 68, 0.8)',   // red
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 1
      }
    ]
  }

  const chartOptions: ChartOptions<"doughnut"> = {
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
    cutout: '70%'
  }

  // Mock data for stock details
  const stockDetails = [
    {
      category: "Electronics",
      total: 450,
      inStock: 300,
      lowStock: 100,
      outOfStock: 50,
      reorderPoint: 75
    },
    {
      category: "Clothing",
      total: 320,
      inStock: 200,
      lowStock: 80,
      outOfStock: 40,
      reorderPoint: 60
    },
    {
      category: "Accessories",
      total: 250,
      inStock: 150,
      lowStock: 70,
      outOfStock: 30,
      reorderPoint: 50
    }
  ]

  // Mock data for products needing attention
  const attentionProducts = [
    {
      name: "Wireless Headphones",
      sku: "WH-001",
      stock: 5,
      reorderPoint: 15,
      status: "low"
    },
    {
      name: "Smart Watch",
      sku: "SW-002",
      stock: 0,
      reorderPoint: 10,
      status: "out"
    },
    {
      name: "Phone Case",
      sku: "PC-003",
      stock: 8,
      reorderPoint: 20,
      status: "low"
    }
  ]

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-blue-400" />
            <h2 className="text-lg font-medium">Stock Insights</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedView("overview")}
              className={`px-3 py-1 rounded-lg text-sm ${
                selectedView === "overview"
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedView("details")}
              className={`px-3 py-1 rounded-lg text-sm ${
                selectedView === "details"
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Details
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Stock Distribution Chart */}
          <div>
            <div className="relative h-[300px] flex items-center justify-center">
              <Doughnut data={stockData} options={chartOptions} />
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <p className="text-3xl font-bold">1,020</p>
                <p className="text-sm text-gray-400">Total Products</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              {stockData.labels?.map((label, index) => (
                <div key={label} className="text-center">
                  <div className={`h-2 rounded-full mb-2`} style={{
                    backgroundColor: stockData.datasets[0].backgroundColor[index] as string
                  }} />
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-lg font-bold">{stockData.datasets[0].data[index]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Products Needing Attention */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-4">Products Needing Attention</h3>
            <div className="space-y-4">
              {attentionProducts.map((product) => (
                <div
                  key={product.sku}
                  className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      product.status === "out" ? "bg-red-900/50" : "bg-yellow-900/50"
                    }`}>
                      {product.status === "out" ? (
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                      ) : (
                        <RefreshCw className="h-4 w-4 text-yellow-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-400">SKU: {product.sku}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${
                      product.status === "out" ? "text-red-400" : "text-yellow-400"
                    }`}>
                      {product.stock} in stock
                    </p>
                    <p className="text-sm text-gray-400">
                      Reorder at {product.reorderPoint}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Details */}
        {selectedView === "details" && (
          <div className="mt-6">
            <div className="overflow-x-auto">
              <table className="w-full mt-4">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4">Category</th>
                    <th className="text-left py-3 px-4">Total</th>
                    <th className="text-left py-3 px-4">In Stock</th>
                    <th className="text-left py-3 px-4">Low Stock</th>
                    <th className="text-left py-3 px-4">Out of Stock</th>
                    <th className="text-left py-3 px-4">Reorder Point</th>
                  </tr>
                </thead>
                <tbody>
                  {stockDetails.map((category) => (
                    <tr key={category.category} className="border-b border-gray-700">
                      <td className="py-3 px-4">{category.category}</td>
                      <td className="py-3 px-4">{category.total}</td>
                      <td className="py-3 px-4 text-green-400">{category.inStock}</td>
                      <td className="py-3 px-4 text-yellow-400">{category.lowStock}</td>
                      <td className="py-3 px-4 text-red-400">{category.outOfStock}</td>
                      <td className="py-3 px-4">{category.reorderPoint}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 