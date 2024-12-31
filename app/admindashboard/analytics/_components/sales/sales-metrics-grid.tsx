"use client"

import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Clock,
  ArrowRight
} from "lucide-react"

interface SalesMetricsGridProps {
  dateRange: {
    from: string
    to: string
  }
}

interface MetricCard {
  title: string
  value: string
  trend: {
    value: number
    label: string
  }
  details: {
    label: string
    value: string
  }[]
  icon: any
  color: string
}

export const SalesMetricsGrid = ({ dateRange }: SalesMetricsGridProps) => {
  const metrics: MetricCard[] = [
    {
      title: "Average Order Value",
      value: "$98.50",
      trend: {
        value: 3.2,
        label: "vs last period"
      },
      details: [
        { label: "Highest", value: "$245.00" },
        { label: "Lowest", value: "$12.50" }
      ],
      icon: DollarSign,
      color: "text-green-400"
    },
    {
      title: "Order Frequency",
      value: "2.4",
      trend: {
        value: -1.1,
        label: "vs last period"
      },
      details: [
        { label: "Orders/Customer", value: "2.4" },
        { label: "Repeat Rate", value: "38%" }
      ],
      icon: ShoppingCart,
      color: "text-blue-400"
    },
    {
      title: "Customer Retention",
      value: "68%",
      trend: {
        value: 5.3,
        label: "vs last period"
      },
      details: [
        { label: "Returning", value: "865" },
        { label: "New", value: "407" }
      ],
      icon: Users,
      color: "text-purple-400"
    },
    {
      title: "Processing Time",
      value: "1.8 days",
      trend: {
        value: -12.5,
        label: "vs last period"
      },
      details: [
        { label: "Fastest", value: "2 hours" },
        { label: "Slowest", value: "4 days" }
      ],
      icon: Clock,
      color: "text-yellow-400"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-white">Detailed Metrics</h2>
        <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
          View All Metrics
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.title}
            className="bg-gray-900 p-6 rounded-xl border border-gray-700"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${metric.color.replace('text', 'bg')}/10 rounded-full`}>
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                metric.trend.value >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {metric.trend.value >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>{Math.abs(metric.trend.value)}%</span>
              </div>
            </div>

            {/* Main Value */}
            <div className="mb-4">
              <h3 className="text-sm text-gray-400 mb-1">{metric.title}</h3>
              <p className="text-2xl font-bold text-white">{metric.value}</p>
              <p className="text-xs text-gray-500 mt-1">{metric.trend.label}</p>
            </div>

            {/* Details */}
            <div className="pt-4 border-t border-gray-700">
              <div className="grid grid-cols-2 gap-4">
                {metric.details.map((detail) => (
                  <div key={detail.label}>
                    <p className="text-xs text-gray-400">{detail.label}</p>
                    <p className="text-sm font-medium text-white mt-1">{detail.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-900/20 border border-green-800 p-4 rounded-lg">
          <div className="flex items-start gap-2">
            <TrendingUp className="h-5 w-5 text-green-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-400">Positive Trends</h4>
              <ul className="mt-2 space-y-1 text-sm text-green-300">
                <li>• Customer retention rate increased by 5.3%</li>
                <li>• Average order value up by 3.2%</li>
                <li>• Processing time reduced by 12.5%</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-red-900/20 border border-red-800 p-4 rounded-lg">
          <div className="flex items-start gap-2">
            <TrendingDown className="h-5 w-5 text-red-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-red-400">Areas for Improvement</h4>
              <ul className="mt-2 space-y-1 text-sm text-red-300">
                <li>• Order frequency decreased by 1.1%</li>
                <li>• New customer acquisition rate down</li>
                <li>• Cart abandonment rate increased</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 