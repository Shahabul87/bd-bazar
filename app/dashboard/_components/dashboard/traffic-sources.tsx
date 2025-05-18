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

interface TrafficSourcesProps {
  dateRange: string
}

export const TrafficSources = ({ dateRange }: TrafficSourcesProps) => {
  // Mock data - replace with actual API call based on dateRange
  const data = {
    labels: ['Direct', 'Social Media', 'Search', 'Email', 'Referral'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',  // blue-500
          'rgba(236, 72, 153, 0.8)',  // pink-500
          'rgba(16, 185, 129, 0.8)',  // green-500
          'rgba(139, 92, 246, 0.8)',  // purple-500
          'rgba(249, 115, 22, 0.8)',  // orange-500
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(236, 72, 153)',
          'rgb(16, 185, 129)',
          'rgb(139, 92, 246)',
          'rgb(249, 115, 22)',
        ],
        borderWidth: 1,
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
                  strokeStyle: data.datasets[0].borderColor[i],
                  lineWidth: 1,
                  hidden: false,
                  index: i
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
            return `${context.label}: ${percentage}% (${value.toLocaleString()} visits)`
          }
        }
      }
    },
    cutout: '60%',
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  }

  const totalVisits = data.datasets[0].data.reduce((acc, val) => acc + val, 0)

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-700">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-medium text-white">Traffic Sources</h2>
          <p className="text-sm text-gray-400">Distribution of visitor traffic sources</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-medium text-white">{totalVisits.toLocaleString()}</p>
          <p className="text-sm text-green-400">+12.3% vs last period</p>
        </div>
      </div>
      <div className="h-[350px] relative">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  )
} 