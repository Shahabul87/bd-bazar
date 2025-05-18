"use client"

import { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: LucideIcon
  trend?: "up" | "down"
}

export const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  trend = "up"
}: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="bg-blue-50 p-3 rounded-full">
          <Icon className="h-6 w-6 text-blue-500" />
        </div>
      </div>
      <div className="mt-4">
        <span className={`text-sm ${
          trend === "up" ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
        } px-2 py-1 rounded-full`}>
          {change}
        </span>
        <span className="text-sm text-gray-500 ml-2">vs last month</span>
      </div>
    </div>
  )
} 