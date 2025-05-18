"use client"

import { useState } from "react"
import { 
  Bell, 
  X, 
  AlertTriangle,
  AlertCircle,
  Info,
  Clock, 
  Package, 
  Truck,
  CheckCircle,
  MessageSquare
} from "lucide-react"

interface Alert {
  id: string
  type: "urgent" | "warning" | "info"
  title: string
  message: string
  timestamp: string
  status: "unread" | "read"
  action?: {
    label: string
    onClick: () => void
  }
}

interface DeliveryAlertsProps {
  dateRange: {
    from: string
    to: string
  }
}

export const DeliveryAlerts = ({ dateRange }: DeliveryAlertsProps) => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "urgent",
      title: "Stuck in Transit",
      message: "5 orders have been in transit for more than 5 days",
      timestamp: "2 hours ago",
      status: "unread",
      action: {
        label: "View Orders",
        onClick: () => console.log("Viewing stuck orders")
      }
    },
    {
      id: "2",
      type: "warning",
      title: "Failed Deliveries",
      message: "3 deliveries failed due to incorrect addresses",
      timestamp: "4 hours ago",
      status: "unread",
      action: {
        label: "Resolve Issues",
        onClick: () => console.log("Resolving failed deliveries")
      }
    },
    {
      id: "3",
      type: "info",
      title: "Delayed Shipments",
      message: "7 shipments may miss their delivery deadline",
      timestamp: "6 hours ago",
      status: "unread",
      action: {
        label: "Review Shipments",
        onClick: () => console.log("Reviewing delayed shipments")
      }
    }
  ])

  const [showAll, setShowAll] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)

  const markAsRead = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, status: "read" } : alert
    ))
  }

  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId))
  }

  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "urgent":
        return <AlertTriangle className="h-5 w-5 text-red-400" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-400" />
      case "info":
        return <Info className="h-5 w-5 text-blue-400" />
    }
  }

  const getAlertColor = (type: Alert["type"]) => {
    switch (type) {
      case "urgent":
        return "bg-red-900/20 border-red-900/50"
      case "warning":
        return "bg-yellow-900/20 border-yellow-900/50"
      case "info":
        return "bg-blue-900/20 border-blue-900/50"
    }
  }

  // Quick stats
  const stats = {
    stuckOrders: 5,
    failedDeliveries: 3,
    delayedShipments: 7,
    stockIssues: 2
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-900/50 rounded-full">
              <Clock className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Stuck Orders</p>
              <p className="text-2xl font-bold text-red-400">{stats.stuckOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-900/50 rounded-full">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Failed Deliveries</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.failedDeliveries}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-900/50 rounded-full">
              <Truck className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Delayed Shipments</p>
              <p className="text-2xl font-bold text-blue-400">{stats.delayedShipments}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-900/50 rounded-full">
              <Package className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Stock Issues</p>
              <p className="text-2xl font-bold text-purple-400">{stats.stockIssues}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts Panel */}
      <div className="bg-gray-900 rounded-xl border border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-gray-400" />
              <h3 className="font-medium">Delivery Alerts</h3>
              <span className="px-2 py-1 text-xs bg-gray-800 rounded-full">
                {alerts.filter(a => a.status === "unread").length} unread
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-400 hover:text-white"
            >
              {isExpanded ? "Collapse" : "Expand"}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="p-4 space-y-4">
            {alerts
              .slice(0, showAll ? undefined : 3)
              .map(alert => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border ${getAlertColor(alert.type)} ${
                    alert.status === "unread" ? "border-l-4" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getAlertIcon(alert.type)}
                      <div>
                        <h4 className="font-medium">{alert.title}</h4>
                        <p className="text-sm text-gray-400">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => dismissAlert(alert.id)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  {alert.action && (
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={alert.action.onClick}
                        className="text-sm text-blue-400 hover:text-blue-300"
                      >
                        {alert.action.label}
                      </button>
                      {alert.status === "unread" && (
                        <button
                          onClick={() => markAsRead(alert.id)}
                          className="text-sm text-gray-400 hover:text-gray-300"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}

            {alerts.length > 3 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="w-full py-2 text-sm text-gray-400 hover:text-white"
              >
                {showAll ? "Show Less" : `Show ${alerts.length - 3} More Alerts`}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 