"use client"

import { useState } from "react"
import { Line } from "react-chartjs-2"
import { 
  TrendingUp, 
  Calendar, 
  Package, 
  AlertCircle, 
  Download,
  FileSpreadsheet,
  FileText,
  Share2
} from "lucide-react"
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

interface PredictiveAnalyticsProps {
  dateRange: {
    from: string
    to: string
  }
}

interface ProductForecast {
  productName: string
  currentStock: number
  predictedDemand: number
  suggestedRestock: {
    date: string
    quantity: number
  }
  confidence: number
  trend: "up" | "down" | "stable"
  insights: string[]
}

export const PredictiveAnalytics = ({ dateRange }: PredictiveAnalyticsProps) => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [forecastRange, setForecastRange] = useState<"30" | "60" | "90">("30")
  const [exportFormat, setExportFormat] = useState<"csv" | "excel" | "pdf" | null>(null)

  // Mock data for product forecasts
  const productForecasts: ProductForecast[] = [
    {
      productName: "Wireless Headphones",
      currentStock: 150,
      predictedDemand: 200,
      suggestedRestock: {
        date: "2024-04-15",
        quantity: 100
      },
      confidence: 85,
      trend: "up",
      insights: [
        "Sales expected to increase by 25% in next month",
        "High correlation with weekend sales",
        "Popular during promotional events"
      ]
    },
    {
      productName: "Smart Watch",
      currentStock: 75,
      predictedDemand: 120,
      suggestedRestock: {
        date: "2024-04-10",
        quantity: 75
      },
      confidence: 78,
      trend: "up",
      insights: [
        "Growing demand in fitness enthusiast segment",
        "Consider bundle offers with fitness apps",
        "Peak sales during morning hours"
      ]
    }
  ]

  // Prepare forecast chart data
  const forecastData: ChartData<"line"> = {
    labels: Array.from({ length: parseInt(forecastRange) }, (_, i) => 
      new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Historical Sales',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 50) + 50),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Predicted Sales',
        data: Array.from({ length: parseInt(forecastRange) }, () => 
          Math.floor(Math.random() * 50) + 75
        ),
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderDash: [5, 5],
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
        borderColor: 'rgb(75, 85, 99)',
        borderWidth: 1,
        titleColor: '#e5e7eb',
        bodyColor: '#e5e7eb',
        padding: 12
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
          color: '#e5e7eb',
          maxRotation: 45,
          minRotation: 45
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  }

  const handleExport = (format: "csv" | "excel" | "pdf") => {
    setExportFormat(format)
    // Implement export logic
    console.log(`Exporting forecast data as ${format}`)
    setTimeout(() => setExportFormat(null), 1000)
  }

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-400" />
            <h2 className="text-lg font-medium">Predictive Analytics</h2>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={forecastRange}
              onChange={(e) => setForecastRange(e.target.value as "30" | "60" | "90")}
              className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm"
            >
              <option value="30">30 Days</option>
              <option value="60">60 Days</option>
              <option value="90">90 Days</option>
            </select>
            <div className="flex gap-2">
              <button
                onClick={() => handleExport('csv')}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                title="Export as CSV"
              >
                <FileSpreadsheet className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleExport('excel')}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                title="Export as Excel"
              >
                <FileText className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleExport('pdf')}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                title="Export as PDF"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Forecast Chart */}
        <div className="h-[300px] mb-6">
          <Line data={forecastData} options={chartOptions} />
        </div>

        {/* Product Forecasts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {productForecasts.map((forecast) => (
            <div
              key={forecast.productName}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">{forecast.productName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Package className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-400">
                      Current Stock: {forecast.currentStock}
                    </span>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  forecast.confidence >= 80
                    ? 'bg-green-900/50 text-green-400'
                    : forecast.confidence >= 60
                    ? 'bg-yellow-900/50 text-yellow-400'
                    : 'bg-red-900/50 text-red-400'
                }`}>
                  {forecast.confidence}% Confidence
                </div>
              </div>

              {/* Restock Recommendation */}
              <div className="flex items-start gap-3 p-3 bg-blue-900/20 rounded-lg mb-4">
                <Calendar className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-400">Restock Recommendation</p>
                  <p className="text-sm">
                    Order {forecast.suggestedRestock.quantity} units by{' '}
                    {new Date(forecast.suggestedRestock.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Insights */}
              <div className="space-y-2">
                {forecast.insights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-purple-400 mt-1" />
                    <p className="text-sm text-gray-300">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Integration Status */}
        <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Connected Data Sources</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-sm">Google Analytics</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-sm">Shopify</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <span className="text-sm">Facebook Ads</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 