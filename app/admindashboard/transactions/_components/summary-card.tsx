"use client"

import { LucideIcon, Plus } from "lucide-react"

interface SummaryCardProps {
  title: string
  amount: string
  icon: LucideIcon
  trend?: number
  showAddButton?: boolean
  type: "income" | "outcome" | "balance"
}

export const SummaryCard = ({
  title,
  amount,
  icon: Icon,
  trend,
  showAddButton,
  type
}: SummaryCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <h3 className={`text-2xl font-bold mt-2 ${
            type === "outcome" ? "text-red-600" : 
            type === "income" ? "text-green-600" : "text-blue-600"
          }`}>
            {amount}
          </h3>
          {trend && (
            <p className={`text-sm mt-1 ${trend > 0 ? "text-green-600" : "text-red-600"}`}>
              {trend > 0 ? "+" : ""}{trend}% vs last month
            </p>
          )}
        </div>
        {showAddButton ? (
          <button className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition">
            <Plus className="h-5 w-5 text-blue-600" />
          </button>
        ) : (
          <div className={`p-3 rounded-full ${
            type === "outcome" ? "bg-red-100" : 
            type === "income" ? "bg-green-100" : "bg-blue-100"
          }`}>
            <Icon className={`h-5 w-5 ${
              type === "outcome" ? "text-red-600" : 
              type === "income" ? "text-green-600" : "text-blue-600"
            }`} />
          </div>
        )}
      </div>
    </div>
  )
} 