"use client"

import { useState } from "react"
import { Package, Clock, Users, MapPin } from "lucide-react"
import { ArrangementDetailsModal } from "./arrangement-details-modal"

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

interface DeliveryArrangementsListProps {
  dateRange: {
    from: string
    to: string
  }
}

export const DeliveryArrangementsList = ({ dateRange }: DeliveryArrangementsListProps) => {
  const [selectedArrangement, setSelectedArrangement] = useState<DeliveryArrangement | null>(null)

  // Mock data
  const arrangements: DeliveryArrangement[] = [
    {
      id: "1",
      route: {
        name: "North Route A",
        stops: 5,
        distance: 25.5,
        estimatedTime: "3 hours",
        start: {
          lat: 40.7128,
          lng: -74.0060,
          address: "Start Location"
        },
        end: {
          lat: 40.7589,
          lng: -73.9851,
          address: "End Location"
        },
        waypoints: [
          {
            lat: 40.7300,
            lng: -73.9950,
            address: "Stop 1",
            order: 1
          },
          {
            lat: 40.7400,
            lng: -73.9850,
            address: "Stop 2",
            order: 2
          }
        ]
      },
      courier: {
        name: "John Smith",
        phone: "+1 234 567 890",
        vehicle: "Van - XL",
        capacity: 1000,
        currentLoad: 750
      },
      schedule: {
        date: "2024-03-20",
        startTime: "09:00",
        endTime: "17:00"
      },
      status: "in_progress",
      efficiency: 85,
      costPerDelivery: 12.50,
      timeline: [
        {
          id: "1",
          title: "Route Started",
          timestamp: "2024-03-20T09:00:00",
          location: "Start Location",
          description: "Driver has begun the route"
        },
        {
          id: "2",
          title: "First Delivery Completed",
          timestamp: "2024-03-20T10:30:00",
          location: "Stop 1",
          description: "Package delivered successfully"
        }
      ]
    },
    // Add more mock arrangements as needed
  ]

  return (
    <div className="space-y-4">
      {/* Arrangements List */}
      {arrangements.map((arrangement) => (
        <div
          key={arrangement.id}
          className="bg-gray-900 p-4 rounded-lg border border-gray-700 hover:border-gray-600 cursor-pointer"
          onClick={() => setSelectedArrangement(arrangement)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-800 rounded-lg">
                <Package className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium">{arrangement.route.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>{arrangement.schedule.startTime} - {arrangement.schedule.endTime}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{arrangement.route.stops} stops</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Users className="h-4 w-4" />
                  <span>{arrangement.courier.name}</span>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ${
                arrangement.status === 'completed'
                  ? 'bg-green-900/50 text-green-400'
                  : arrangement.status === 'delayed'
                  ? 'bg-red-900/50 text-red-400'
                  : arrangement.status === 'in_progress'
                  ? 'bg-blue-900/50 text-blue-400'
                  : 'bg-yellow-900/50 text-yellow-400'
              }`}>
                {arrangement.status.replace('_', ' ').charAt(0).toUpperCase() + 
                 arrangement.status.slice(1).replace('_', ' ')}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Details Modal */}
      <ArrangementDetailsModal
        isOpen={!!selectedArrangement}
        onClose={() => setSelectedArrangement(null)}
        arrangement={selectedArrangement}
      />
    </div>
  )
} 