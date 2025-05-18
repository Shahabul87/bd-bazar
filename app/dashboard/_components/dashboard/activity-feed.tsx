"use client"

import { useState } from "react"
import { 
  ShoppingCart, 
  UserPlus, 
  AlertTriangle, 
  RefreshCcw,
  ChevronDown,
  Clock
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Activity {
  id: string
  type: "order" | "customer" | "alert" | "refund"
  title: string
  description: string
  timestamp: Date
  status?: string
  amount?: number
}

const activities: Activity[] = [
  {
    id: "ACT-001",
    type: "order",
    title: "New Order Received",
    description: "Order #1234 received from John Doe",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    amount: 299.99,
    status: "pending"
  },
  {
    id: "ACT-002",
    type: "customer",
    title: "New Customer Registration",
    description: "Jane Smith created an account",
    timestamp: new Date(Date.now() - 1000 * 60 * 15) // 15 minutes ago
  },
  {
    id: "ACT-003",
    type: "alert",
    title: "Low Stock Alert",
    description: "Wireless Headphones (SKU: WH-001) is running low",
    timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
  },
  {
    id: "ACT-004",
    type: "refund",
    title: "Refund Processed",
    description: "Refund processed for Order #1230",
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    amount: 149.99
  }
]

const getActivityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "order":
      return ShoppingCart
    case "customer":
      return UserPlus
    case "alert":
      return AlertTriangle
    case "refund":
      return RefreshCcw
    default:
      return Clock
  }
}

const getActivityColor = (type: Activity["type"]) => {
  switch (type) {
    case "order":
      return "text-blue-400 bg-blue-900"
    case "customer":
      return "text-green-400 bg-green-900"
    case "alert":
      return "text-yellow-400 bg-yellow-900"
    case "refund":
      return "text-red-400 bg-red-900"
    default:
      return "text-gray-400 bg-gray-900"
  }
}

export const ActivityFeed = () => {
  const [expanded, setExpanded] = useState(false)
  const displayedActivities = expanded ? activities : activities.slice(0, 3)

  return (
    <div className="bg-gray-900 rounded-xl shadow-sm border border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-lg font-medium text-white">Recent Activity</h2>
        <p className="text-sm text-gray-400">Monitor your latest business activities</p>
      </div>

      <div className="divide-y divide-gray-700">
        {displayedActivities.map((activity) => {
          const Icon = getActivityIcon(activity.type)
          const colorClass = getActivityColor(activity.type)

          return (
            <div key={activity.id} className="p-4 hover:bg-gray-800/50">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${colorClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="font-medium text-white">{activity.title}</p>
                      <p className="text-sm text-gray-400">{activity.description}</p>
                    </div>
                    {activity.amount && (
                      <span className={`text-sm font-medium whitespace-nowrap ${
                        activity.type === "refund" ? "text-red-400" : "text-green-400"
                      }`}>
                        {activity.type === "refund" ? "-" : "+"}${activity.amount}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                    </span>
                    {activity.status && (
                      <>
                        <span className="text-gray-500">•</span>
                        <span className="text-xs text-gray-400 capitalize">
                          {activity.status}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {activities.length > 3 && (
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-300 mx-auto"
          >
            {expanded ? "Show Less" : "Show More"}
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        </div>
      )}
    </div>
  )
} 