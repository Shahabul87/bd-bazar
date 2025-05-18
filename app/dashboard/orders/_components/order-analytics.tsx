"use client"

import { Bar, Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const orderData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Orders',
      data: [45, 52, 38, 65, 48, 56, 42],
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 1
    },
    {
      label: 'Revenue',
      data: [4500, 5200, 3800, 6500, 4800, 5600, 4200],
      backgroundColor: 'rgba(16, 185, 129, 0.5)',
      borderColor: 'rgb(16, 185, 129)',
      borderWidth: 1,
      yAxisID: 'revenue'
    }
  ]
}

const statusData = {
  labels: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
  datasets: [
    {
      data: [15, 25, 20, 30, 10],
      backgroundColor: [
        'rgba(234, 179, 8, 0.8)',    // yellow for pending
        'rgba(59, 130, 246, 0.8)',   // blue for processing
        'rgba(147, 51, 234, 0.8)',   // purple for shipped
        'rgba(34, 197, 94, 0.8)',    // green for delivered
        'rgba(239, 68, 68, 0.8)',    // red for cancelled
      ],
      borderColor: [
        'rgb(234, 179, 8)',
        'rgb(59, 130, 246)',
        'rgb(147, 51, 234)',
        'rgb(34, 197, 94)',
        'rgb(239, 68, 68)',
      ],
      borderWidth: 1
    }
  ]
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: '#e5e7eb' // text-gray-200
      }
    },
    title: {
      display: true,
      text: 'Orders Overview',
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
        callback: function(value: any) {
          return value + ' orders'
        }
      }
    },
    revenue: {
      position: 'right' as const,
      beginAtZero: true,
      grid: {
        display: false
      },
      ticks: {
        color: '#e5e7eb', // text-gray-200
        callback: function(value: any) {
          return '$' + value
        }
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
  }
}

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right' as const,
      labels: {
        color: '#e5e7eb' // text-gray-200
      }
    },
    title: {
      display: true,
      text: 'Orders by Status',
      color: '#e5e7eb' // text-gray-200
    }
  }
}

const quickStats = [
  {
    id: "avg-order",
    title: "Average Order Value",
    value: "$245.50",
    trend: "+12.5% vs last week",
    trendType: "up"
  },
  {
    id: "completion-rate",
    title: "Order Completion Rate",
    value: "92.4%",
    trend: "+4.1% vs last week",
    trendType: "up"
  },
  {
    id: "processing-time",
    title: "Processing Time",
    value: "1.8 days",
    trend: "+0.3 days vs last week",
    trendType: "down"
  }
]

export const OrderAnalytics = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Orders & Revenue Chart */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-700">
        <div className="h-[400px]">
          <Bar data={orderData} options={options} />
        </div>
      </div>

      {/* Status Distribution */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-700">
        <div className="h-[400px] flex items-center justify-center">
          <Pie data={statusData} options={pieOptions} />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickStats.map((stat) => (
          <div key={stat.id} className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400">{stat.title}</h3>
            <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
            <p className={`mt-1 text-sm ${stat.trendType === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              {stat.trend}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
} 