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
  dateRange: string
}

export const SalesTrends = ({ dateRange }: SalesTrendsProps) => {
  // Mock data - replace with actual API call based on dateRange
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [65000, 59000, 80000, 81000, 56000, 85000],
        fill: true,
        borderColor: "rgb(59, 130, 246)", // blue-500
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "rgb(30, 41, 59)", // slate-800
        pointHoverRadius: 6
      },
      {
        label: 'Profit',
        data: [28000, 48000, 40000, 19000, 86000, 27000],
        fill: true,
        borderColor: "rgb(16, 185, 129)", // green-500
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "rgb(16, 185, 129)",
        pointBorderColor: "rgb(30, 41, 59)", // slate-800
        pointHoverRadius: 6
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
        bodySpacing: 4,
        titleSpacing: 4,
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
    },
    interaction: {
      intersect: false,
      mode: 'index' as const
    }
  }

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-700">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-medium text-white">Sales & Revenue</h2>
          <p className="text-sm text-gray-400">Compare revenue and profit over time</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-medium text-white">$540,500</p>
          <p className="text-sm text-green-400">+12.5% vs last period</p>
        </div>
      </div>
      <div className="h-[350px]">
        <Line data={data} options={options} />
      </div>
    </div>
  )
} 