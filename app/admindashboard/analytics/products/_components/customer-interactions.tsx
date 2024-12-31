"use client"

import { useState } from "react"
import { Eye, ShoppingCart, Star, MessageSquare, TrendingUp } from "lucide-react"
import { Line } from "react-chartjs-2"
import type { ChartData, ChartOptions } from 'chart.js'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface CustomerInteractionsProps {
  dateRange: {
    from: string
    to: string
  }
}

interface ProductInteraction {
  productName: string
  views: number
  addToCart: number
  purchases: number
  reviews: number
  rating: number
  conversionRate: number
}

export const CustomerInteractions = ({ dateRange }: CustomerInteractionsProps) => {
  const [selectedMetric, setSelectedMetric] = useState<"views" | "conversions" | "reviews">("views")

  // Mock data for product interactions
  const productInteractions: ProductInteraction[] = [
    {
      productName: "Wireless Headphones",
      views: 1200,
      addToCart: 300,
      purchases: 150,
      reviews: 45,
      rating: 4.5,
      conversionRate: 12.5
    },
    {
      productName: "Smart Watch",
      views: 800,
      addToCart: 200,
      purchases: 100,
      reviews: 30,
      rating: 4.2,
      conversionRate: 12.5
    },
    {
      productName: "Laptop Bag",
      views: 600,
      addToCart: 150,
      purchases: 80,
      reviews: 25,
      rating: 4.0,
      conversionRate: 13.3
    }
  ]

  // Prepare chart data
  const chartData: ChartData<"line"> = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Product Views',
        data: [500, 600, 450, 700, 800, 750, 900],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Add to Cart',
        data: [100, 150, 120, 180, 200, 190, 220],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#e5e7eb'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
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
            <TrendingUp className="h-5 w-5 text-blue-400" />
            <h2 className="text-lg font-medium">Customer Interactions</h2>
          </div>
          <div className="flex gap-2">
            {(['views', 'conversions', 'reviews'] as const).map((metric) => (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  selectedMetric === metric
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {metric.charAt(0).toUpperCase() + metric.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Interaction Metrics */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-blue-400 mb-2">
              <Eye className="h-4 w-4" />
              <span className="text-sm">Views</span>
            </div>
            <p className="text-2xl font-bold">2.6k</p>
            <p className="text-sm text-green-400">+12.5%</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-green-400 mb-2">
              <ShoppingCart className="h-4 w-4" />
              <span className="text-sm">Add to Cart</span>
            </div>
            <p className="text-2xl font-bold">650</p>
            <p className="text-sm text-green-400">+8.3%</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-400 mb-2">
              <Star className="h-4 w-4" />
              <span className="text-sm">Rating</span>
            </div>
            <p className="text-2xl font-bold">4.5</p>
            <p className="text-sm text-green-400">+0.2</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-purple-400 mb-2">
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm">Reviews</span>
            </div>
            <p className="text-2xl font-bold">100</p>
            <p className="text-sm text-green-400">+15.2%</p>
          </div>
        </div>

        {/* Interaction Chart */}
        <div className="h-[300px] mb-6">
          <Line data={chartData} options={chartOptions} />
        </div>

        {/* Product Interactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4">Product</th>
                <th className="text-left py-3 px-4">Views</th>
                <th className="text-left py-3 px-4">Add to Cart</th>
                <th className="text-left py-3 px-4">Purchases</th>
                <th className="text-left py-3 px-4">Reviews</th>
                <th className="text-left py-3 px-4">Rating</th>
                <th className="text-left py-3 px-4">Conversion Rate</th>
              </tr>
            </thead>
            <tbody>
              {productInteractions.map((product) => (
                <tr key={product.productName} className="border-b border-gray-700">
                  <td className="py-3 px-4">{product.productName}</td>
                  <td className="py-3 px-4">{product.views}</td>
                  <td className="py-3 px-4">{product.addToCart}</td>
                  <td className="py-3 px-4">{product.purchases}</td>
                  <td className="py-3 px-4">{product.reviews}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{product.rating}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{product.conversionRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 