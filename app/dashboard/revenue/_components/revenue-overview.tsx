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
import { DollarSign, TrendingUp, ShoppingCart, Users } from "lucide-react"

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

interface RevenueOverviewProps {
  dateRange: string
}

const stats = [
  {
    title: "Today's Revenue",
    value: "$12,426",
    trend: "+12.5%",
    icon: DollarSign,
    color: "text-green-400",
    bgColor: "bg-green-900"
  },
  {
    title: "Revenue Growth",
    value: "23.5%",
    trend: "+4.1%",
    icon: TrendingUp,
    color: "text-blue-400",
    bgColor: "bg-blue-900"
  },
  {
    title: "Orders Today",
    value: "156",
    trend: "+8.2%",
    icon: ShoppingCart,
    color: "text-purple-400",
    bgColor: "bg-purple-900"
  },
  {
    title: "Active Customers",
    value: "2,845",
    trend: "+2.3%",
    icon: Users,
    color: "text-orange-400",
    bgColor: "bg-orange-900"
  }
]

export const RevenueOverview = ({ dateRange }: RevenueOverviewProps) => {
  // Mock data - replace with actual API call based on dateRange
  const data = {
    labels: ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'],
    datasets: [
      {
        label: 'Today',
        data: [1200, 1900, 2400, 2800, 3500, 3900, 4200, 4800, 5200],
        borderColor: "rgb(59, 130, 246)", // blue-500
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true
      },
      {
        label: 'Yesterday',
        data: [1000, 1600, 2100, 2500, 3100, 3400, 3800, 4300, 4700],
        borderColor: "rgb(156, 163, 175)", // gray-400
        backgroundColor: "rgba(156, 163, 175, 0.1)",
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
        mode: 'index' as const,
        intersect: false,
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
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(context.parsed.y);
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
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              notation: 'compact',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }).format(value);
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  {stat.trend} vs last period
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
            <h2 className="text-lg font-medium text-white">Today's Revenue</h2>
            <p className="text-sm text-gray-400">Hourly revenue breakdown</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-medium text-white">$12,426</p>
            <p className="text-sm text-green-400">+12.5% vs yesterday</p>
          </div>
        </div>
        <div className="h-[350px]">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  )
} 