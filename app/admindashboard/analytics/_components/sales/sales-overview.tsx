"use client"

import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react"

interface SalesOverviewProps {
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
  icon: any
  color: string
}

export const SalesOverview = ({ dateRange }: SalesOverviewProps) => {
  const metrics: MetricCard[] = [
    {
      title: "Total Revenue",
      value: "$124,500",
      trend: {
        value: 12.5,
        label: "vs last period"
      },
      icon: DollarSign,
      color: "text-green-400"
    },
    {
      title: "Total Orders",
      value: "1,245",
      trend: {
        value: 8.2,
        label: "vs last period"
      },
      icon: ShoppingCart,
      color: "text-blue-400"
    },
    {
      title: "Average Order Value",
      value: "$98.50",
      trend: {
        value: 3.1,
        label: "vs last period"
      },
      icon: TrendingUp,
      color: "text-purple-400"
    },
    {
      title: "Active Customers",
      value: "892",
      trend: {
        value: 5.8,
        label: "vs last period"
      },
      icon: Users,
      color: "text-yellow-400"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div
          key={metric.title}
          className="bg-gray-900 p-6 rounded-xl border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">{metric.title}</p>
              <h3 className="text-2xl font-bold mt-1 text-white">{metric.value}</h3>
              <p className={`text-sm mt-1 ${
                metric.trend.value >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {metric.trend.value > 0 ? '+' : ''}{metric.trend.value}% {metric.trend.label}
              </p>
            </div>
            <div className={`p-3 bg-gray-800 rounded-full ${metric.color}`}>
              <metric.icon className="h-6 w-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 