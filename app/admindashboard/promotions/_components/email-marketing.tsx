"use client"

import { useState } from "react"
import { Mail, Users, TrendingUp, DollarSign, Eye, Clock } from "lucide-react"
import { Line } from "react-chartjs-2"
import type { ChartData, ChartOptions } from 'chart.js'

interface EmailCampaign {
  id: string
  name: string
  sentDate: string
  totalRecipients: number
  openRate: number
  clickRate: number
  revenue: number
  status: "draft" | "scheduled" | "sent" | "completed"
}

export const EmailMarketing = () => {
  // Mock data
  const campaigns: EmailCampaign[] = [
    {
      id: "1",
      name: "Summer Sale Announcement",
      sentDate: "2024-03-15",
      totalRecipients: 5000,
      openRate: 45.2,
      clickRate: 12.8,
      revenue: 12500,
      status: "completed"
    },
    {
      id: "2",
      name: "New Collection Launch",
      sentDate: "2024-03-20",
      totalRecipients: 4500,
      openRate: 38.5,
      clickRate: 10.2,
      revenue: 8900,
      status: "sent"
    }
  ]

  const chartData: ChartData<"line"> = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Open Rate',
        data: [42, 45, 40, 48, 43, 46, 45],
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.4
      },
      {
        label: 'Click Rate',
        data: [12, 14, 11, 15, 13, 14, 13],
        borderColor: 'rgb(16, 185, 129)',
        tension: 0.4
      }
    ]
  }

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#e5e7eb'
        }
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
      {/* Email Campaign Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-900/50 rounded-lg">
              <Mail className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Sent</p>
              <p className="text-lg font-medium">9,500</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-900/50 rounded-lg">
              <Eye className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Avg. Open Rate</p>
              <p className="text-lg font-medium">42.3%</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-900/50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Avg. Click Rate</p>
              <p className="text-lg font-medium">11.5%</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-900/50 rounded-lg">
              <DollarSign className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Revenue</p>
              <p className="text-lg font-medium">$21,400</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
        <h2 className="text-lg font-medium mb-6">Campaign Performance</h2>
        <div className="h-[300px]">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Recent Campaigns */}
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
        <h2 className="text-lg font-medium mb-6">Recent Campaigns</h2>
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-700 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">{campaign.name}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(campaign.sentDate).toLocaleDateString()}</span>
                    <Users className="h-4 w-4 ml-2" />
                    <span>{campaign.totalRecipients.toLocaleString()} recipients</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Open Rate</p>
                    <p className="font-medium text-green-400">{campaign.openRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Click Rate</p>
                    <p className="font-medium text-blue-400">{campaign.clickRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Revenue</p>
                    <p className="font-medium">${campaign.revenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 