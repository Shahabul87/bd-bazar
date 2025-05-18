"use client"

import { useState } from "react"
import { DollarSign, TrendingUp, TrendingDown, BarChart2, AlertCircle } from "lucide-react"
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

interface PriceOptimizationInsightsProps {
  dateRange: {
    from: string
    to: string
  }
}

interface PriceInsight {
  productName: string
  currentPrice: number
  suggestedPrice: number
  margin: number
  volume: number
  competitorPrice?: number
  priceElasticity: number
  recommendation: string
  reason: string
}

export const PriceOptimizationInsights = ({ dateRange }: PriceOptimizationInsightsProps) => {
  const [selectedView, setSelectedView] = useState<"margins" | "elasticity" | "competitors">("margins")

  // Mock data for price insights
  const priceInsights: PriceInsight[] = [
    {
      productName: "Wireless Headphones",
      currentPrice: 99.99,
      suggestedPrice: 119.99,
      margin: 45,
      volume: 500,
      competitorPrice: 129.99,
      priceElasticity: -0.8,
      recommendation: "increase",
      reason: "High demand with below-market pricing"
    },
    {
      productName: "Smart Watch",
      currentPrice: 199.99,
      suggestedPrice: 179.99,
      margin: 35,
      volume: 200,
      competitorPrice: 169.99,
      priceElasticity: -1.2,
      recommendation: "decrease",
      reason: "Price sensitive market with strong competition"
    },
    {
      productName: "Laptop Bag",
      currentPrice: 49.99,
      suggestedPrice: 59.99,
      margin: 55,
      volume: 300,
      competitorPrice: 54.99,
      priceElasticity: -0.6,
      recommendation: "increase",
      reason: "Strong margins with inelastic demand"
    }
  ]

  // Calculate average metrics
  const averageMargin = priceInsights.reduce((acc, item) => acc + item.margin, 0) / priceInsights.length
  const averageElasticity = priceInsights.reduce((acc, item) => acc + item.priceElasticity, 0) / priceInsights.length

  // Prepare chart data
  const marginChartData: ChartData<"bar"> = {
    labels: priceInsights.map(item => item.productName),
    datasets: [
      {
        label: 'Current Margin (%)',
        data: priceInsights.map(item => item.margin),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
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
            <DollarSign className="h-5 w-5 text-green-400" />
            <h2 className="text-lg font-medium">Price Optimization Insights</h2>
          </div>
          <div className="flex gap-2">
            {(['margins', 'elasticity', 'competitors'] as const).map((view) => (
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

        {/* Overview Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <BarChart2 className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-gray-400">Average Margin</span>
            </div>
            <p className="text-2xl font-bold">{averageMargin.toFixed(1)}%</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-gray-400">Price Elasticity</span>
            </div>
            <p className="text-2xl font-bold">{averageElasticity.toFixed(2)}</p>
          </div>
        </div>

        {/* Margin Chart */}
        <div className="h-[300px] mb-6">
          <Bar data={marginChartData} options={chartOptions} />
        </div>

        {/* Price Recommendations */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium mb-4">Price Recommendations</h3>
          {priceInsights.map((insight) => (
            <div
              key={insight.productName}
              className="bg-gray-800 p-4 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium">{insight.productName}</h4>
                  <p className="text-sm text-gray-400">Current Price: ${insight.currentPrice}</p>
                </div>
                <div className={`flex items-center gap-2 ${
                  insight.recommendation === 'increase' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {insight.recommendation === 'increase' ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span>Suggested: ${insight.suggestedPrice}</span>
                </div>
              </div>
              <div className="flex items-start gap-2 mt-2 text-sm text-gray-400">
                <AlertCircle className="h-4 w-4 mt-0.5" />
                <p>{insight.reason}</p>
              </div>
              {insight.competitorPrice && (
                <div className="mt-2 text-sm text-gray-400">
                  Competitor Price: ${insight.competitorPrice}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Optimization Tips */}
        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-900/50 rounded-lg">
          <h3 className="flex items-center gap-2 text-blue-400 font-medium mb-2">
            <AlertCircle className="h-5 w-5" />
            Optimization Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Consider price increases for products with inelastic demand</li>
            <li>• Monitor competitor pricing for key products</li>
            <li>• Test price elasticity with small incremental changes</li>
            <li>• Implement dynamic pricing for high-volume products</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 