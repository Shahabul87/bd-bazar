"use client"

import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface SalesChartProps {
  dateRange: string
}

export const SalesChart = ({ dateRange }: SalesChartProps) => {
  // Mock data - replace with actual API call based on dateRange
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Revenue',
        data: [65000, 59000, 80000, 81000, 56000, 85000, 90000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Orders',
        data: [28000, 48000, 40000, 19000, 86000, 27000, 90000],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#e5e7eb' // text-gray-200
        }
      },
      title: {
        display: true,
        text: 'Sales & Revenue Overview',
        color: '#e5e7eb' // text-gray-200
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(75, 85, 99, 0.2)' // gray-600 with opacity
        },
        ticks: {
          color: '#e5e7eb', // text-gray-200
          callback: (value: any) => `$${value.toLocaleString()}`
        }
      },
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)' // gray-600 with opacity
        },
        ticks: {
          color: '#e5e7eb' // text-gray-200
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const
    }
  }

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-medium text-white">Sales Trends</h3>
          <p className="text-sm text-gray-400">Compare revenue and orders over time</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-gray-400">Revenue</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-400">Orders</span>
          </div>
        </div>
      </div>
      <div className="h-[400px]">
        <Line data={data} options={options} />
      </div>
    </div>
  )
} 