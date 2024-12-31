"use client"

import { useState } from "react"
import { BarChart, RefreshCcw, DollarSign, AlertTriangle } from "lucide-react"
import { Bar } from "react-chartjs-2"
import type { ChartData, ChartOptions } from 'chart.js'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface ReturnsAnalysisProps {
  dateRange: {
    from: string
    to: string
  }
}

interface ReturnData {
  productName: string
  unitsReturned: number
  revenueLost: number
  returnRate: number
  reasons: {
    reason: string
    count: number
  }[]
}

export const ReturnsAnalysis = ({ dateRange }: ReturnsAnalysisProps) => {
  // Mock data for returns
  const returnsData: ReturnData[] = [
    {
      productName: "Wireless Headphones",
      unitsReturned: 25,
      revenueLost: 2499.75,
      returnRate: 5.2,
      reasons: [
        { reason: "Defective", count: 12 },
        { reason: "Not as described", count: 8 },
        { reason: "Wrong size", count: 5 }
      ]
    },
    {
      productName: "Smart Watch",
      unitsReturned: 18,
      revenueLost: 3599.82,
      returnRate: 3.8,
      reasons: [
        { reason: "Defective", count: 8 },
        { reason: "Changed mind", count: 6 },
        { reason: "Not as expected", count: 4 }
      ]
    },
    {
      productName: "Laptop Bag",
      unitsReturned: 15,
      revenueLost: 749.85,
      returnRate: 2.5,
      reasons: [
        { reason: "Quality issues", count: 7 },
        { reason: "Wrong color", count: 5 },
        { reason: "Changed mind", count: 3 }
      ]
    }
  ]

  // Calculate totals
  const totalReturns = returnsData.reduce((acc, item) => acc + item.unitsReturned, 0)
  const totalRevenueLost = returnsData.reduce((acc, item) => acc + item.revenueLost, 0)
  const averageReturnRate = returnsData.reduce((acc, item) => acc + item.returnRate, 0) / returnsData.length

  // Prepare chart data
  const chartData: ChartData<"bar"> = {
    labels: returnsData.map(item => item.productName),
    datasets: [
      {
        label: 'Return Rate (%)',
        data: returnsData.map(item => item.returnRate),
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1
      }
    ]
  }

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgb(17, 24, 39)',
        titleColor: 'rgb(229, 231, 235)',
        bodyColor: 'rgb(229, 231, 235)',
        padding: 12,
        borderColor: 'rgb(75, 85, 99)',
        borderWidth: 1
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

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-900/50 rounded-lg">
              <RefreshCcw className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Returns</p>
              <p className="text-xl font-bold text-white">{totalReturns} units</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-900/50 rounded-lg">
              <DollarSign className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Revenue Lost</p>
              <p className="text-xl font-bold text-white">
                ${totalRevenueLost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-900/50 rounded-lg">
              <BarChart className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Average Return Rate</p>
              <p className="text-xl font-bold text-white">{averageReturnRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Returns Chart */}
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
        <h3 className="text-lg font-medium mb-6">Return Rates by Product</h3>
        <div className="h-[300px]">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Returns Table */}
      <div className="bg-gray-900 rounded-xl border border-gray-700">
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">Returns Details</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4">Product</th>
                  <th className="text-left py-3 px-4">Units Returned</th>
                  <th className="text-left py-3 px-4">Revenue Lost</th>
                  <th className="text-left py-3 px-4">Return Rate</th>
                  <th className="text-left py-3 px-4">Top Reasons</th>
                </tr>
              </thead>
              <tbody>
                {returnsData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="py-3 px-4">{item.productName}</td>
                    <td className="py-3 px-4">{item.unitsReturned}</td>
                    <td className="py-3 px-4">
                      ${item.revenueLost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4">{item.returnRate}%</td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        {item.reasons.map((reason, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <AlertTriangle className="h-3 w-3 text-yellow-400" />
                            <span>{reason.reason}</span>
                            <span className="text-gray-400">({reason.count})</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
} 