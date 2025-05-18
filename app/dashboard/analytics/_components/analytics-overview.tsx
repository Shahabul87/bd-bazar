"use client"

import { TrendingUp, Users, ShoppingCart, DollarSign } from "lucide-react"

interface AnalyticsOverviewProps {
  dateRange: string
}

const stats = [
  {
    title: "Total Revenue",
    value: "$124,500",
    trend: "+12.5%",
    icon: DollarSign,
    color: "text-green-400",
    bgColor: "bg-green-900",
    description: "vs previous period"
  },
  {
    title: "Total Orders",
    value: "450",
    trend: "+4.1%",
    icon: ShoppingCart,
    color: "text-blue-400",
    bgColor: "bg-blue-900",
    description: "vs previous period"
  },
  {
    title: "New Customers",
    value: "89",
    trend: "+8.2%",
    icon: Users,
    color: "text-purple-400",
    bgColor: "bg-purple-900",
    description: "vs previous period"
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    trend: "+2.4%",
    icon: TrendingUp,
    color: "text-yellow-400",
    bgColor: "bg-yellow-900",
    description: "vs previous period"
  }
]

export const AnalyticsOverview = ({ dateRange }: AnalyticsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className={`${stat.bgColor} p-3 rounded-full`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <span className={`text-sm ${
              stat.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'
            }`}>
              {stat.trend}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
          <p className="text-sm text-gray-400">{stat.title}</p>
          <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
        </div>
      ))}
    </div>
  )
} 