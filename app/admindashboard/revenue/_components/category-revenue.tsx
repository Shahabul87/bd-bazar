"use client"

import { Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

interface CategoryRevenueProps {
  dateRange: string
}

export const CategoryRevenue = ({ dateRange }: CategoryRevenueProps) => {
  // Mock data - replace with actual API call based on dateRange
  const data = {
    labels: ['Electronics', 'Clothing', 'Food & Beverage', 'Home & Garden', 'Sports'],
    datasets: [
      {
        data: [35000, 25000, 20000, 15000, 10000],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',  // blue-500
          'rgba(16, 185, 129, 0.8)',  // green-500
          'rgba(249, 115, 22, 0.8)',  // orange-500
          'rgba(139, 92, 246, 0.8)',  // purple-500
          'rgba(236, 72, 153, 0.8)',  // pink-500
        ],
        borderWidth: 0,
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: "rgb(229, 231, 235)", // gray-200
          padding: 20,
          font: {
            size: 12
          },
          generateLabels: function(chart: any) {
            const data = chart.data
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const value = data.datasets[0].data[i]
                const total = data.datasets[0].data.reduce((acc: number, val: number) => acc + val, 0)
                const percentage = ((value / total) * 100).toFixed(1)
                return {
                  text: `${label} (${percentage}%)`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  strokeStyle: data.datasets[0].backgroundColor[i],
                  lineWidth: 0,
                  hidden: false,
                  index: i,
                  datasetIndex: 0,
                  color: "rgb(229, 231, 235)" // Making the text white
                }
              })
            }
            return []
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
            const value = context.raw
            const total = context.dataset.data.reduce((acc: number, val: number) => acc + val, 0)
            const percentage = ((value / total) * 100).toFixed(1)
            return `$${value.toLocaleString()} (${percentage}%)`
          }
        }
      }
    },
    cutout: '60%'
  }

  const totalRevenue = data.datasets[0].data.reduce((acc, val) => acc + val, 0)

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-700">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-medium text-white">Revenue by Category</h2>
          <p className="text-sm text-gray-400">Category-wise revenue breakdown</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-medium text-white">${totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-green-400">+8.2% vs last period</p>
        </div>
      </div>
      <div className="h-[350px] relative">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  )
} 