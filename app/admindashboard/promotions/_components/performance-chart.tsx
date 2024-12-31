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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const performanceData = {
  labels: ['Black Friday', 'Summer Sale', 'New User', 'Holiday Special', 'Flash Sale'],
  datasets: [
    {
      label: 'Revenue Generated',
      data: [120000, 85000, 45000, 75000, 25000],
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 1
    },
    {
      label: 'Orders Count',
      data: [450, 320, 180, 280, 95],
      backgroundColor: 'rgba(16, 185, 129, 0.5)',
      borderColor: 'rgb(16, 185, 129)',
      borderWidth: 1
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
      text: 'Promotion Performance Overview',
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
        color: '#e5e7eb' // text-gray-200
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

export const PerformanceChart = () => {
  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-800">
      <div className="h-[400px]">
        <Bar data={performanceData} options={options} />
      </div>
    </div>
  )
} 