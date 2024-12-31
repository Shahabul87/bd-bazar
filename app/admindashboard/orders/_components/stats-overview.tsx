"use client"

import { Package, Clock, CheckCircle, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface StatItem {
  title: string
  value: string
  trend: string
  icon: any
  color: string
  bgColor: string
  link: string
}

const stats: StatItem[] = [
  {
    title: "Total Orders",
    value: "1,245",
    trend: "+12.5%",
    icon: Package,
    color: "text-blue-400",
    bgColor: "bg-blue-900",
    link: "/admindashboard/orders/all"
  },
  {
    title: "Pending Orders",
    value: "150",
    trend: "+4.1%",
    icon: Clock,
    color: "text-yellow-400",
    bgColor: "bg-yellow-900",
    link: "/admindashboard/orders/pending"
  },
  {
    title: "Completed Orders",
    value: "1,010",
    trend: "+8.2%",
    icon: CheckCircle,
    color: "text-green-400",
    bgColor: "bg-green-900",
    link: "/admindashboard/orders/completed"
  },
  {
    title: "Cancelled Orders",
    value: "85",
    trend: "-2.4%",
    icon: XCircle,
    color: "text-red-400",
    bgColor: "bg-red-900",
    link: "/admindashboard/orders/cancelled"
  }
]

export const StatsOverview = () => {
  const router = useRouter()

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          onClick={() => router.push(stat.link)}
          className="bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-800 cursor-pointer hover:bg-gray-800 transition-colors"
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
            <div className={`${stat.bgColor} p-3 rounded-full`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 