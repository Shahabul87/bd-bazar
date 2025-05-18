"use client"

import { Tag, Clock, Archive } from "lucide-react"

const stats = [
  {
    title: "Active Promotions",
    value: "12",
    trend: "+2.5%",
    icon: Tag,
    color: "text-green-400",
    bgColor: "bg-green-900"
  },
  {
    title: "Upcoming Promotions",
    value: "8",
    trend: "+4.1%",
    icon: Clock,
    color: "text-blue-400",
    bgColor: "bg-blue-900"
  },
  {
    title: "Expired Promotions",
    value: "24",
    trend: "-1.5%",
    icon: Archive,
    color: "text-gray-400",
    bgColor: "bg-gray-900"
  }
]

export const StatsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-800">
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
            <div className={`${stat.bgColor} p-3 rounded-full`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 