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
import { Users, UserPlus, UserMinus, Activity } from "lucide-react"

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

interface CustomerMetricsProps {
  dateRange: string
}

const stats = [
  {
    title: "Total Customers",
    value: "2,845",
    trend: "+12.5%",
    icon: Users,
    color: "text-blue-400",
    bgColor: "bg-blue-900"
  },
  {
    title: "New Customers",
    value: "145",
    trend: "+4.1%",
    icon: UserPlus,
    color: "text-green-400",
    bgColor: "bg-green-900"
  },
  {
    title: "Churned Customers",
    value: "23",
    trend: "-2.4%",
    icon: UserMinus,
    color: "text-red-400",
    bgColor: "bg-red-900"
  },
  {
    title: "Active Users",
    value: "1,890",
    trend: "+8.2%",
    icon: Activity,
    color: "text-purple-400",
    bgColor: "bg-purple-900"
  }
]

export const CustomerMetrics = ({ dateRange }: CustomerMetricsProps) => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Active Customers',
        data: [1500, 1700, 1850, 1700, 1950, 2100],
        borderColor: "rgb(59, 130, 246)", // blue-500
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true
      },
      {
        label: 'New Customers',
        data: [100, 120, 140, 110, 130, 150],
        borderColor: "rgb(16, 185, 129)", // green-500
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        fill: true
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
          color: "rgb(229, 231, 235)", // gray-200
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: "rgb(30, 41, 59)", // slate-800
        titleColor: "rgb(229, 231, 235)", // gray-200
        bodyColor: "rgb(229, 231, 235)", // gray-200
        borderColor: "rgb(51, 65, 85)", // slate-700
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toLocaleString();
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(51, 65, 85, 0.3)", // slate-700 with opacity
          drawBorder: false
        },
        ticks: {
          color: "rgb(156, 163, 175)", // gray-400
          padding: 8,
          callback: function(value: any) {
            return value.toLocaleString()
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: "rgb(156, 163, 175)", // gray-400
          padding: 8
        }
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1 text-white">{stat.value}</h3>
                <p className={`text-sm mt-1 ${
                  stat.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.trend} vs last month
                </p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-full`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-700">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-lg font-medium text-white">Customer Growth</h2>
            <p className="text-sm text-gray-400">Active and new customers over time</p>
          </div>
        </div>
        <div className="h-[350px]">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  )
} 