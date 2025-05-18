"use client"

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

// Register the chart components
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

interface SalesTrendsProps {
  dateRange: {
    from: string
    to: string
  }
}

export const SalesTrends = ({ dateRange }: SalesTrendsProps) => {
  const data: ChartData<"line"> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Revenue',
        data: [65000, 75000, 68000, 85000, 82000, 95000, 98000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Orders',
        data: [250, 285, 260, 310, 305, 350, 365],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#e5e7eb'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
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
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  }

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-medium text-white">Sales Trends</h2>
          <p className="text-sm text-gray-400">Revenue and order volume over time</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-medium text-white">$98,000</p>
          <p className="text-sm text-green-400">+12.5% vs last period</p>
        </div>
      </div>
      <div className="h-[350px]">
        <Line data={data} options={options} />
      </div>
    </div>
  )
} 