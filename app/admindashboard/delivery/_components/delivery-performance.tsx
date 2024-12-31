"use client"

import { Bar } from "react-chartjs-2"
import { 
  TrendingUp, 
  Clock, 
  Award,
  MapPin,
  AlertTriangle
} from "lucide-react"
import type { ChartData, ChartOptions } from 'chart.js'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface DeliveryPerformanceProps {
  dateRange: {
    from: string
    to: string
  }
}

interface CourierPerformance {
  name: string
  successRate: number
  avgDeliveryTime: number
  totalDeliveries: number
  onTimeDeliveries: number
  delayedDeliveries: number
  failedDeliveries: number
}

interface RegionPerformance {
  name: string
  delayedCount: number
  failedCount: number
  totalDeliveries: number
  avgDeliveryTime: number
}

export const DeliveryPerformance = ({ dateRange }: DeliveryPerformanceProps) => {
  // Mock data for courier performance
  const courierPerformance: CourierPerformance[] = [
    {
      name: "FastShip",
      successRate: 95.5,
      avgDeliveryTime: 1.8,
      totalDeliveries: 1250,
      onTimeDeliveries: 1180,
      delayedDeliveries: 45,
      failedDeliveries: 25
    },
    {
      name: "SpeedPost",
      successRate: 92.8,
      avgDeliveryTime: 2.1,
      totalDeliveries: 980,
      onTimeDeliveries: 890,
      delayedDeliveries: 65,
      failedDeliveries: 25
    },
    {
      name: "SecureDelivery",
      successRate: 94.2,
      avgDeliveryTime: 1.9,
      totalDeliveries: 850,
      onTimeDeliveries: 790,
      delayedDeliveries: 40,
      failedDeliveries: 20
    }
  ]

  // Mock data for regional performance
  const regionPerformance: RegionPerformance[] = [
    {
      name: "North Region",
      delayedCount: 25,
      failedCount: 12,
      totalDeliveries: 450,
      avgDeliveryTime: 2.1
    },
    {
      name: "South Region",
      delayedCount: 35,
      failedCount: 15,
      totalDeliveries: 380,
      avgDeliveryTime: 2.3
    },
    {
      name: "East Region",
      delayedCount: 20,
      failedCount: 8,
      totalDeliveries: 320,
      avgDeliveryTime: 1.9
    },
    {
      name: "West Region",
      delayedCount: 30,
      failedCount: 10,
      totalDeliveries: 400,
      avgDeliveryTime: 2.0
    }
  ]

  // Find the most reliable courier
  const mostReliableCourier = courierPerformance.reduce((prev, current) => 
    prev.successRate > current.successRate ? prev : current
  )

  // Calculate overall success rate
  const totalDeliveries = courierPerformance.reduce((sum, courier) => sum + courier.totalDeliveries, 0)
  const totalSuccessful = courierPerformance.reduce((sum, courier) => sum + courier.onTimeDeliveries, 0)
  const overallSuccessRate = (totalSuccessful / totalDeliveries) * 100

  // Prepare data for courier performance chart
  const courierChartData: ChartData<"bar"> = {
    labels: courierPerformance.map(c => c.name),
    datasets: [
      {
        label: 'Success Rate (%)',
        data: courierPerformance.map(c => c.successRate),
        backgroundColor: 'rgba(16, 185, 129, 0.8)', // green
        borderRadius: 4
      },
      {
        label: 'Average Delivery Time (days)',
        data: courierPerformance.map(c => c.avgDeliveryTime),
        backgroundColor: 'rgba(59, 130, 246, 0.8)', // blue
        borderRadius: 4
      }
    ]
  }

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#e5e7eb'
        }
      },
      tooltip: {
        backgroundColor: 'rgb(17, 24, 39)',
        borderColor: 'rgb(75, 85, 99)',
        borderWidth: 1,
        titleColor: '#e5e7eb',
        bodyColor: '#e5e7eb',
        padding: 12
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(75, 85, 99, 0.2)'
        },
        ticks: {
          color: '#e5e7eb'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#e5e7eb'
        }
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-900/50 rounded-full">
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Success Rate</p>
              <p className="text-2xl font-bold text-green-400">{overallSuccessRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-900/50 rounded-full">
              <Clock className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Avg. Delivery Time</p>
              <p className="text-2xl font-bold text-blue-400">
                {(courierPerformance.reduce((sum, c) => sum + c.avgDeliveryTime, 0) / courierPerformance.length).toFixed(1)} days
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-900/50 rounded-full">
              <Award className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Most Reliable Courier</p>
              <div>
                <p className="text-xl font-bold text-purple-400">{mostReliableCourier.name}</p>
                <p className="text-sm text-gray-400">{mostReliableCourier.successRate}% success rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courier Performance Chart */}
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
        <h3 className="text-lg font-medium mb-6">Courier Performance Analysis</h3>
        <div className="h-[350px]">
          <Bar data={courierChartData} options={chartOptions} />
        </div>
      </div>

      {/* Regional Performance */}
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
        <h3 className="text-lg font-medium mb-6">Regional Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {regionPerformance.map(region => (
            <div 
              key={region.name}
              className="p-4 bg-gray-800 rounded-lg border border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <h4 className="font-medium">{region.name}</h4>
                </div>
                <span className="text-sm text-gray-400">
                  {region.totalDeliveries} deliveries
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Average Delivery Time</span>
                    <span>{region.avgDeliveryTime.toFixed(1)} days</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(region.avgDeliveryTime / 3) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-yellow-400 mb-1">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Delayed</span>
                    </div>
                    <p className="font-medium">
                      {((region.delayedCount / region.totalDeliveries) * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-red-400 mb-1">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-sm">Failed</span>
                    </div>
                    <p className="font-medium">
                      {((region.failedCount / region.totalDeliveries) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 