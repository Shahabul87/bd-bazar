"use client"

import { useState } from "react"
import { 
  X, 
  MapPin, 
  Package, 
  Truck, 
  Clock,
  User,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  AlertTriangle
} from "lucide-react"
import { DeliveryMapView } from "./delivery-map-view"
import { LoadScript, GoogleMap } from "@react-google-maps/api"

interface ArrangementDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  arrangement: DeliveryArrangement | null
}

interface DeliveryArrangement {
  id: string
  route: {
    name: string
    stops: number
    distance: number
    estimatedTime: string
    start: {
      lat: number
      lng: number
      address: string
    }
    end: {
      lat: number
      lng: number
      address: string
    }
    waypoints: {
      lat: number
      lng: number
      address: string
      order: number
    }[]
  }
  courier: {
    name: string
    phone: string
    vehicle: string
    capacity: number
    currentLoad: number
  }
  schedule: {
    date: string
    startTime: string
    endTime: string
  }
  status: "pending" | "in_progress" | "completed" | "delayed"
  efficiency: number
  costPerDelivery: number
  timeline: {
    id: string
    title: string
    timestamp: string
    location: string
    description: string
  }[]
}

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

export const ArrangementDetailsModal = ({
  isOpen,
  onClose,
  arrangement
}: ArrangementDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState<"overview" | "map" | "timeline">("overview")

  if (!isOpen || !arrangement) return null

  const stops = arrangement.route.waypoints.map(wp => ({
    lat: wp.lat,
    lng: wp.lng,
    label: `Stop ${wp.order}`
  }))

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">Arrangement Details</h2>
            <p className="text-sm text-gray-400">Route #{arrangement.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 p-4 border-b border-gray-700">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-2 border-b-2 transition-colors ${
              activeTab === "overview"
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-400 hover:text-gray-300"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("map")}
            className={`pb-2 border-b-2 transition-colors ${
              activeTab === "map"
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-400 hover:text-gray-300"
            }`}
          >
            Route Map
          </button>
          <button
            onClick={() => setActiveTab("timeline")}
            className={`pb-2 border-b-2 transition-colors ${
              activeTab === "timeline"
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-400 hover:text-gray-300"
            }`}
          >
            Timeline
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {activeTab === "overview" && (
            <div className="grid grid-cols-2 gap-6">
              {/* Route Information */}
              <div className="space-y-4">
                <h3 className="font-medium">Route Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{arrangement.route.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-gray-400" />
                    <span>{arrangement.route.stops} stops</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>Est. Time: {arrangement.route.estimatedTime}</span>
                  </div>
                </div>
              </div>

              {/* Courier Information */}
              <div className="space-y-4">
                <h3 className="font-medium">Courier Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span>{arrangement.courier.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-gray-400" />
                    <span>{arrangement.courier.vehicle}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{arrangement.courier.phone}</span>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="space-y-4">
                <h3 className="font-medium">Schedule</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{new Date(arrangement.schedule.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{arrangement.schedule.startTime} - {arrangement.schedule.endTime}</span>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="space-y-4">
                <h3 className="font-medium">Metrics</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Efficiency: {arrangement.efficiency}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    <span>Cost per Delivery: ${arrangement.costPerDelivery}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "map" && (
            <div className="h-[400px] bg-gray-800 rounded-lg overflow-hidden">
              <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                  center={stops[0]}
                  zoom={10}
                >
                  <DeliveryMapView
                    stops={stops}
                    startPoint={arrangement.route.start}
                    endPoint={arrangement.route.end}
                  />
                </GoogleMap>
              </LoadScript>
            </div>
          )}

          {activeTab === "timeline" && (
            <div className="space-y-6">
              {arrangement.timeline.map((event, index) => (
                <div key={event.id} className="relative">
                  {index < arrangement.timeline.length - 1 && (
                    <div className="absolute top-8 left-[17px] bottom-0 w-0.5 bg-gray-700" />
                  )}
                  <div className="flex gap-4">
                    <div className="relative z-10 w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 border border-gray-700">
                      <Package className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{event.title}</p>
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
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-gray-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700"
          >
            Close
          </button>
          <button
            onClick={() => {/* Implement edit */}}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Edit Arrangement
          </button>
        </div>
      </div>
    </div>
  )
} 