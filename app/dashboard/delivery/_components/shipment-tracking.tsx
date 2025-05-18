"use client"

import { useState } from "react"
import { 
  Package, 
  Truck, 
  MapPin, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  RefreshCw,
  ArrowRight,
  DollarSign
} from "lucide-react"
import Image from "next/image"

interface ShipmentTrackingProps {
  dateRange: {
    from: string
    to: string
  }
}

interface TrackingEvent {
  id: string
  status: string
  location: string
  timestamp: string
  description: string
}

interface Shipment {
  id: string
  trackingNumber: string
  courier: {
    name: string
    logo: string
  }
  status: "dispatched" | "in_transit" | "out_for_delivery" | "delivered" | "failed"
  currentLocation: {
    lat: number
    lng: number
    address: string
  }
  estimatedDelivery: string
  events: TrackingEvent[]
  failureReason?: string
}

export const ShipmentTracking = ({ dateRange }: ShipmentTrackingProps) => {
  const [selectedShipment, setSelectedShipment] = useState<string | null>(null)

  // Mock data for shipments
  const shipments: Shipment[] = [
    {
      id: "1",
      trackingNumber: "TRK-001",
      courier: {
        name: "FastShip",
        logo: "https://picsum.photos/seed/1/40/40"
      },
      status: "in_transit",
      currentLocation: {
        lat: 40.7128,
        lng: -74.0060,
        address: "New York Distribution Center"
      },
      estimatedDelivery: "2024-03-20",
      events: [
        {
          id: "1",
          status: "Order Dispatched",
          location: "Los Angeles Warehouse",
          timestamp: "2024-03-18 09:00",
          description: "Package has been dispatched from warehouse"
        },
        {
          id: "2",
          status: "In Transit",
          location: "New York Distribution Center",
          timestamp: "2024-03-19 14:30",
          description: "Package arrived at distribution center"
        }
      ]
    },
    {
      id: "2",
      trackingNumber: "TRK-002",
      courier: {
        name: "SpeedPost",
        logo: "https://picsum.photos/seed/2/40/40"
      },
      status: "failed",
      currentLocation: {
        lat: 34.0522,
        lng: -118.2437,
        address: "Los Angeles Delivery Center"
      },
      estimatedDelivery: "2024-03-19",
      events: [
        {
          id: "1",
          status: "Order Dispatched",
          location: "Chicago Warehouse",
          timestamp: "2024-03-17 10:00",
          description: "Package has been dispatched"
        },
        {
          id: "2",
          status: "Delivery Failed",
          location: "Los Angeles",
          timestamp: "2024-03-19 15:45",
          description: "Address not found"
        }
      ],
      failureReason: "Address not found"
    }
  ]

  const getStatusIcon = (status: Shipment["status"]) => {
    switch (status) {
      case "dispatched":
        return <Package className="h-5 w-5 text-blue-400" />
      case "in_transit":
        return <Truck className="h-5 w-5 text-yellow-400" />
      case "out_for_delivery":
        return <MapPin className="h-5 w-5 text-purple-400" />
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "failed":
        return <AlertTriangle className="h-5 w-5 text-red-400" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: Shipment["status"]) => {
    switch (status) {
      case "dispatched": return "text-blue-400"
      case "in_transit": return "text-yellow-400"
      case "out_for_delivery": return "text-purple-400"
      case "delivered": return "text-green-400"
      case "failed": return "text-red-400"
      default: return "text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* Shipment List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shipments.map((shipment) => (
          <div
            key={shipment.id}
            className={`bg-gray-900 p-4 rounded-lg border border-gray-700 cursor-pointer transition-colors ${
              selectedShipment === shipment.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedShipment(shipment.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Image
                  src={shipment.courier.logo}
                  alt={shipment.courier.name}
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <div>
                  <p className="font-medium">{shipment.courier.name}</p>
                  <p className="text-sm text-gray-400">{shipment.trackingNumber}</p>
                </div>
              </div>
              <div className={`flex items-center gap-2 ${getStatusColor(shipment.status)}`}>
                {getStatusIcon(shipment.status)}
                <span className="capitalize">{shipment.status.replace('_', ' ')}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>{shipment.currentLocation.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>Expected: {new Date(shipment.estimatedDelivery).toLocaleDateString()}</span>
              </div>
            </div>

            {shipment.failureReason && (
              <div className="mt-4 p-3 bg-red-900/20 border border-red-900/50 rounded-lg">
                <div className="flex items-center gap-2 text-red-400">
                  <AlertTriangle className="h-4 w-4" />
                  <p className="text-sm font-medium">Delivery Failed</p>
                </div>
                <p className="mt-1 text-sm text-red-300">{shipment.failureReason}</p>
                <div className="mt-3 flex gap-2">
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                    <RefreshCw className="h-4 w-4" />
                    Retry Delivery
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">
                    <DollarSign className="h-4 w-4" />
                    Initiate Refund
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tracking Timeline */}
      {selectedShipment && (
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-medium mb-6">Tracking Timeline</h3>
          <div className="space-y-6">
            {shipments
              .find(s => s.id === selectedShipment)
              ?.events.map((event, index, array) => (
                <div key={event.id} className="relative">
                  {index < array.length - 1 && (
                    <div className="absolute top-8 left-[17px] bottom-0 w-0.5 bg-gray-700" />
                  )}
                  <div className="flex gap-4">
                    <div className="relative z-10 w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 border border-gray-700">
                      <ArrowRight className="h-5 w-5 text-blue-400" />
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
        </div>
      )}

      {/* Map View */}
      {selectedShipment && (
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-medium mb-4">Shipment Location</h3>
          <div className="h-[400px] bg-gray-800 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Map integration would go here</p>
          </div>
        </div>
      )}
    </div>
  )
} 