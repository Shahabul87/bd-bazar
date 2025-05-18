"use client"

import { AlertTriangle, Clock, AlertCircle, DollarSign } from "lucide-react"

export interface OrderAlertsProps {
  status: string
}

interface Alert {
  id: string
  type: "delayed" | "payment_failed" | "high_value"
  orderId: string
  message: string
  timestamp: string
}

// Mock data - replace with actual API call
const alerts: Alert[] = [
  {
    id: "ALT-001",
    type: "delayed",
    orderId: "ORD-001",
    message: "Order processing delayed by 48 hours",
    timestamp: "2 hours ago"
  },
  {
    id: "ALT-002",
    type: "payment_failed",
    orderId: "ORD-002",
    message: "Payment failed - Customer card declined",
    timestamp: "1 hour ago"
  },
  {
    id: "ALT-003",
    type: "high_value",
    orderId: "ORD-003",
    message: "High-value order ($5,000+) requires review",
    timestamp: "30 minutes ago"
  }
]

const getAlertIcon = (type: Alert["type"]) => {
  switch (type) {
    case "delayed":
      return Clock
    case "payment_failed":
      return AlertTriangle
    case "high_value":
      return DollarSign
    default:
      return AlertCircle
  }
}

const getAlertColor = (type: Alert["type"]) => {
  switch (type) {
    case "delayed":
      return "bg-yellow-900/50 text-yellow-300 border-yellow-700"
    case "payment_failed":
      return "bg-red-900/50 text-red-300 border-red-700"
    case "high_value":
      return "bg-blue-900/50 text-blue-300 border-blue-700"
    default:
      return "bg-gray-900/50 text-gray-300 border-gray-700"
  }
}

export const OrderAlerts = ({ status }: OrderAlertsProps) => {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-white">Alerts & Notifications</h2>
        <span className="px-2.5 py-0.5 rounded-full text-sm bg-red-900/50 text-red-300">
          {alerts.length} alerts
        </span>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => {
          const Icon = getAlertIcon(alert.type)
          return (
            <div
              key={alert.id}
              className={`flex items-start gap-3 p-3 rounded-lg border ${getAlertColor(alert.type)}`}
            >
              <div className={`p-2 rounded-full ${getAlertColor(alert.type)}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-white">
                    Order {alert.orderId}
                  </p>
                  <span className="text-xs text-gray-400">
                    {alert.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mt-1">
                  {alert.message}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {alerts.length > 0 && (
        <button className="w-full mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm">
          View All Alerts
        </button>
      )}
    </div>
  )
} 