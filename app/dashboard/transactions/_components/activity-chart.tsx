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

interface ActivityChartProps {
  data: {
    labels: string[]
    values: number[]
  }
  title: string
  subtitle: string
  total: string
  trend: string
}

export const ActivityChart = ({
  data,
  title,
  subtitle,
  total,
  trend
}: ActivityChartProps) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: title,
        data: data.values,
        fill: true,
        borderColor: "rgb(59, 130, 246)", // blue-500
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "rgb(59, 130, 246)",
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
        display: false
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
                currency: 'USD'
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
              notation: 'compact'
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
          <h3 className="font-medium text-lg text-white">{title}</h3>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
        <div className="text-right">
          <p className="font-medium text-lg text-white">{total}</p>
          <p className={`text-sm ${
            trend.startsWith('+') ? 'text-green-400' : 'text-red-400'
          }`}>
            {trend}
          </p>
        </div>
      </div>
      <div className="h-[300px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  )
} 