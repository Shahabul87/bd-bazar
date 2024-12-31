"use client"

import { Line, Pie } from "react-chartjs-2"
import { Clock, TrendingUp, Truck, AlertTriangle } from "lucide-react"
import type { ChartData, ChartOptions } from 'chart.js'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface DeliveryOverviewProps {
  dateRange: {
    from: string
    to: string
  }
}

export const DeliveryOverview = ({ dateRange }: DeliveryOverviewProps) => {
  // Mock data for KPIs
  const kpis = {
    onTimeRate: 92.5,
    delayedDeliveries: {
      count: 45,
      percentage: 7.5
    },
    inTransit: 156,
    totalDeliveries: 600
  }

  // Mock data for line chart
  const deliveryTrendData: ChartData<"line"> = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Orders Delivered',
        data: [65, 78, 82, 75, 85, 92, 88],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  const lineChartOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false
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

  // Mock data for pie chart
  const statusBreakdownData: ChartData<"pie"> = {
    labels: ['Delivered', 'In Transit', 'Failed', 'Canceled'],
    datasets: [
      {
        data: [450, 156, 35, 15],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',  // green
          'rgba(59, 130, 246, 0.8)',  // blue
          'rgba(239, 68, 68, 0.8)',   // red
          'rgba(107, 114, 128, 0.8)'  // gray
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(59, 130, 246)',
          'rgb(239, 68, 68)',
          'rgb(107, 114, 128)'
        ],
        borderWidth: 1
      }
    ]
  }

  const pieChartOptions: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#e5e7eb',
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgb(17, 24, 39)',
        borderColor: 'rgb(75, 85, 99)',
        borderWidth: 1,
        titleColor: '#e5e7eb',
        bodyColor: '#e5e7eb',
        padding: 12,
        callbacks: {
          label: function(context) {
            const value = context.raw as number
            const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0)
            const percentage = ((value / total) * 100).toFixed(1)
            return `${context.label}: ${value} (${percentage}%)`
          }
        }
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-900/50 rounded-full">
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">On-Time Delivery Rate</p>
              <p className="text-2xl font-bold text-green-400">{kpis.onTimeRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-900/50 rounded-full">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Delayed Deliveries</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-red-400">{kpis.delayedDeliveries.count}</p>
                <p className="text-sm text-red-400">({kpis.delayedDeliveries.percentage}%)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-900/50 rounded-full">
              <Truck className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Orders in Transit</p>
              <p className="text-2xl font-bold text-blue-400">{kpis.inTransit}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-900/50 rounded-full">
              <Clock className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Deliveries</p>
              <p className="text-2xl font-bold text-purple-400">{kpis.totalDeliveries}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Delivery Trend Chart */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
          <h3 className="text-lg font-medium mb-4">Delivery Trends</h3>
          <div className="h-[300px]">
            <Line data={deliveryTrendData} options={lineChartOptions} />
          </div>
        </div>

        {/* Status Breakdown Chart */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
          <h3 className="text-lg font-medium mb-4">Delivery Status Breakdown</h3>
          <div className="h-[300px]">
            <Pie data={statusBreakdownData} options={pieChartOptions} />
          </div>
        </div>
      </div>
    </div>
  )
} 