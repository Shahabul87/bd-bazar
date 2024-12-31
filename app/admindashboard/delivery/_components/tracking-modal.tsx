"use client"

import { useState } from "react"
import { 
  X, 
  MapPin, 
  Package, 
  Truck, 
  Phone, 
  Mail,
  Clock,
  CheckCircle,
  AlertTriangle,
  MessageSquare
} from "lucide-react"
import Image from "next/image"

interface TrackingModalProps {
  isOpen: boolean
  onClose: () => void
  trackingNumber: string
}

interface TrackingEvent {
  id: string
  status: string
  location: string
  timestamp: string
  description: string
}

interface TrackingInfo {
  trackingNumber: string
  courier: {
    name: string
    logo: string
    contact: string
  }
  status: "in_transit" | "delivered" | "failed" | "pending"
  estimatedDelivery: string
  currentLocation: {
    address: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  customer: {
    name: string
    phone: string
    email: string
    address: string
  }
  events: TrackingEvent[]
}

export const TrackingModal = ({
  isOpen,
  onClose,
  trackingNumber
}: TrackingModalProps) => {
  const [activeTab, setActiveTab] = useState<"timeline" | "map" | "details">("timeline")

  // Mock tracking data
  const trackingInfo: TrackingInfo = {
    trackingNumber: "TRK-12345",
    courier: {
      name: "FastShip Express",
      logo: "https://picsum.photos/seed/1/40/40",
      contact: "+1 234 567 890"
    },
    status: "in_transit",
    estimatedDelivery: "2024-03-20",
    currentLocation: {
      address: "Distribution Center, New York",
      coordinates: {
        lat: 40.7128,
        lng: -74.0060
      }
    },
    customer: {
      name: "John Doe",
      phone: "+1 234 567 891",
      email: "john@example.com",
      address: "123 Main St, City, Country"
    },
    events: [
      {
        id: "1",
        status: "Package Received",
        location: "Los Angeles Warehouse",
        timestamp: "2024-03-18 09:00",
        description: "Package has been received at origin facility"
      },
      {
        id: "2",
        status: "In Transit",
        location: "Distribution Center, New York",
        timestamp: "2024-03-19 14:30",
        description: "Package is in transit to destination"
      }
    ]
  }

  if (!isOpen) return null

  const getStatusColor = (status: TrackingInfo["status"]) => {
    switch (status) {
      case "delivered": return "text-green-400"
      case "failed": return "text-red-400"
      case "in_transit": return "text-blue-400"
      default: return "text-yellow-400"
    }
  }

  const getStatusIcon = (status: TrackingInfo["status"]) => {
    switch (status) {
      case "delivered": return <CheckCircle className="h-5 w-5 text-green-400" />
      case "failed": return <AlertTriangle className="h-5 w-5 text-red-400" />
      case "in_transit": return <Truck className="h-5 w-5 text-blue-400" />
      default: return <Clock className="h-5 w-5 text-yellow-400" />
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl border border-gray-700 w-full max-w-3xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">Tracking Details</h2>
            <p className="text-sm text-gray-400">Tracking Number: {trackingInfo.trackingNumber}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Overview */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={trackingInfo.courier.logo}
                alt={trackingInfo.courier.name}
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <p className="font-medium">{trackingInfo.courier.name}</p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Phone className="h-4 w-4" />
                  <span>{trackingInfo.courier.contact}</span>
                </div>
              </div>
            </div>
            <div className={`flex items-center gap-2 ${getStatusColor(trackingInfo.status)}`}>
              {getStatusIcon(trackingInfo.status)}
              <span className="font-medium capitalize">
                {trackingInfo.status.replace('_', ' ')}
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-4 border-b border-gray-700">
            <button
              onClick={() => setActiveTab("timeline")}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "timeline"
                  ? "border-blue-500 text-blue-500"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              Timeline
            </button>
            <button
              onClick={() => setActiveTab("map")}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "map"
                  ? "border-blue-500 text-blue-500"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              Map View
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "details"
                  ? "border-blue-500 text-blue-500"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              Details
            </button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === "timeline" && (
              <div className="space-y-6">
                {trackingInfo.events.map((event, index) => (
                  <div key={event.id} className="relative">
                    {index < trackingInfo.events.length - 1 && (
                      <div className="absolute top-8 left-[17px] bottom-0 w-0.5 bg-gray-700" />
                    )}
                    <div className="flex gap-4">
                      <div className="relative z-10 w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 border border-gray-700">
                        <Package className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{event.status}</p>
                          <span className="text-sm text-gray-400">
                            {new Date(event.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{event.location}</p>
                        <p className="text-sm mt-1">{event.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "map" && (
              <div className="h-[400px] bg-gray-800 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">Map integration would go here</p>
              </div>
            )}

            {activeTab === "details" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* Customer Information */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Customer Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-400">Name:</span>
                        <span>{trackingInfo.customer.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{trackingInfo.customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{trackingInfo.customer.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{trackingInfo.customer.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Information */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Delivery Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>Estimated Delivery: {new Date(trackingInfo.estimatedDelivery).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>Current Location: {trackingInfo.currentLocation.address}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <MessageSquare className="h-4 w-4" />
                    Contact Customer
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700">
                    <Phone className="h-4 w-4" />
                    Contact Courier
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 