"use client"

import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import Image from "next/image"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface TopProductsProps {
  dateRange: string
}

export const TopProducts = ({ dateRange }: TopProductsProps) => {
  // Mock data - replace with actual API call based on dateRange
  const products = [
    {
      id: "1",
      name: "Wireless Headphones",
      image: "https://picsum.photos/seed/1/40/40",
      revenue: 45000,
      orders: 150,
      trend: 12.5
    },
    {
      id: "2",
      name: "Smart Watch",
      image: "https://picsum.photos/seed/2/40/40",
      revenue: 38000,
      orders: 120,
      trend: 8.2
    },
    {
      id: "3",
      name: "Bluetooth Speaker",
      image: "https://picsum.photos/seed/3/40/40",
      revenue: 32000,
      orders: 95,
      trend: -2.4
    },
    {
      id: "4",
      name: "Gaming Mouse",
      image: "https://picsum.photos/seed/4/40/40",
      revenue: 28000,
      orders: 85,
      trend: 5.7
    },
    {
      id: "5",
      name: "Mechanical Keyboard",
      image: "https://picsum.photos/seed/5/40/40",
      revenue: 25000,
      orders: 75,
      trend: 3.2
    }
  ]

  const chartData = {
    labels: products.map(p => p.name),
    datasets: [
      {
        data: products.map(p => p.revenue),
        backgroundColor: 'rgba(59, 130, 246, 0.8)', // blue-500
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
        borderRadius: 4,
      }
    ]
  }

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
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
            return `Revenue: $${context.raw.toLocaleString()}`
          }
        }
      }
    },
    scales: {
      y: {
        grid: {
          display: false
        },
        ticks: {
          color: "rgb(156, 163, 175)", // gray-400
          font: {
            size: 12
          }
        }
      },
      x: {
        beginAtZero: true,
        grid: {
          color: "rgba(51, 65, 85, 0.3)", // slate-700 with opacity
          drawBorder: false
        },
        ticks: {
          color: "rgb(156, 163, 175)", // gray-400
          padding: 8,
          callback: function(value: any) {
            return `$${value.toLocaleString()}`
          }
        }
      }
    }
  }

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-700">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-medium text-white">Top Products</h2>
          <p className="text-sm text-gray-400">Best performing products by revenue</p>
        </div>
      </div>

      <div className="h-[350px] mb-6">
        <Bar data={chartData} options={options} />
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Image
                src={product.image}
                alt={product.name}
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <h3 className="font-medium text-white">{product.name}</h3>
                <p className="text-sm text-gray-400">{product.orders} orders</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-white">${product.revenue.toLocaleString()}</p>
              <p className={`text-sm ${product.trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {product.trend > 0 ? '+' : ''}{product.trend}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 