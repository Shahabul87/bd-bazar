"use client"

import { Doughnut } from "react-chartjs-2"
import type { ChartData, ChartOptions } from 'chart.js'
import { MapPin, Users, TrendingUp } from "lucide-react"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

// Register the chart components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

interface CustomerDemographicsProps {
  dateRange: {
    from: string
    to: string
  }
}

export const CustomerDemographics = ({ dateRange }: CustomerDemographicsProps) => {
  const ageData: ChartData<"doughnut"> = {
    labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
    datasets: [
      {
        data: [15, 30, 25, 20, 10],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',  // blue
          'rgba(16, 185, 129, 0.8)',  // green
          'rgba(249, 115, 22, 0.8)',  // orange
          'rgba(139, 92, 246, 0.8)',  // purple
          'rgba(236, 72, 153, 0.8)',  // pink
        ],
        borderWidth: 0
      }
    ]
  }

  const locationData = [
    { region: "North America", percentage: 45, count: 4500 },
    { region: "Europe", percentage: 30, count: 3000 },
    { region: "Asia", percentage: 15, count: 1500 },
    { region: "Others", percentage: 10, count: 1000 }
  ]

  const chartOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
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
            return `${value}% of customers`
          }
        }
      }
    },
    cutout: '60%'
  }

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
      <h2 className="text-lg font-medium text-white mb-6">Customer Demographics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age Distribution */}
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-4">Age Distribution</h3>
          <div className="h-[200px] flex items-center justify-center">
            <Doughnut data={ageData} options={chartOptions} />
          </div>
        </div>

        {/* Geographic Distribution */}
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-4">Geographic Distribution</h3>
          <div className="space-y-4">
            {locationData.map((location) => (
              <div key={location.region} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300">{location.region}</span>
                  </div>
                  <span className="text-gray-400">{location.count} customers</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${location.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-900/50 rounded-lg">
              <Users className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Returning Customers</p>
              <p className="text-lg font-medium text-white">68%</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-900/50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Customer Growth</p>
              <p className="text-lg font-medium text-white">+12.5%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 