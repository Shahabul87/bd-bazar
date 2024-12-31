"use client"

import { Users, UserPlus, UserMinus, DollarSign, ShoppingCart, TrendingUp } from "lucide-react"
import { Line } from "react-chartjs-2"
import type { ChartData, ChartOptions } from 'chart.js'
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

// Register chart components
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

export const CustomerStats = () => {
  // Mock data for customer growth chart
  const chartData: ChartData<"line"> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Total Customers',
        data: [1200, 1350, 1450, 1600, 1750, 1900],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  const chartOptions: ChartOptions<"line"> = {
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

  const stats = [
    {
      title: "Total Customers",
      value: "1,892",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "blue"
    },
    {
      title: "New Customers",
      value: "245",
      change: "+18.2%",
      trend: "up",
      icon: UserPlus,
      color: "green"
    },
    {
      title: "Churned Customers",
      value: "32",
      change: "-2.4%",
      trend: "down",
      icon: UserMinus,
      color: "red"
    },
    {
      title: "Average Order Value",
      value: "$85.50",
      change: "+5.8%",
      trend: "up",
      icon: DollarSign,
      color: "purple"
    },
    {
      title: "Purchase Frequency",
      value: "2.4",
      change: "+3.2%",
      trend: "up",
      icon: ShoppingCart,
      color: "orange"
    },
    {
      title: "Customer Lifetime Value",
      value: "$850",
      change: "+8.7%",
      trend: "up",
      icon: TrendingUp,
      color: "pink"
    }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Customer Growth Chart */}
      <div className="lg:col-span-2 bg-gray-900 p-6 rounded-xl border border-gray-700">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-medium text-white">Customer Growth</h3>
            <p className="text-sm text-gray-400">Total customer base over time</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">1,892</p>
            <p className="text-sm text-green-400">+12.5% vs last month</p>
          </div>
        </div>
        <div className="h-[300px]">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="space-y-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-gray-900 p-4 rounded-xl border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 bg-${stat.color}-900/50 rounded-lg`}>
                  <stat.icon className={`h-5 w-5 text-${stat.color}-400`} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{stat.title}</p>
                  <p className="text-lg font-medium text-white">{stat.value}</p>
                </div>
              </div>
              <div className={`text-sm ${
                stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 