"use client"

import { Package, DollarSign, TrendingUp, AlertCircle } from "lucide-react"

export const StoreStatsOverview = () => {
  const stats = [
    {
      title: "Total Products",
      value: "245",
      trend: "+12.5%",
      icon: Package,
      color: "text-blue-400",
      bgColor: "bg-blue-900/50"
    },
    {
      title: "Total Revenue",
      value: "$12,345",
      trend: "+8.2%",
      icon: DollarSign,
      color: "text-green-400",
      bgColor: "bg-green-900/50"
    },
    {
      title: "Sales Growth",
      value: "23.5%",
      trend: "+4.1%",
      icon: TrendingUp,
      color: "text-purple-400",
      bgColor: "bg-purple-900/50"
    },
    {
      title: "Low Stock Items",
      value: "12",
      trend: "-2.4%",
      icon: AlertCircle,
      color: "text-orange-400",
      bgColor: "bg-orange-900/50"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-gray-900 p-6 rounded-xl border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1 text-white">{stat.value}</h3>
              <p className={`text-sm mt-1 ${
                stat.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.trend} vs last month
              </p>
            </div>
            <div className={`p-3 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 