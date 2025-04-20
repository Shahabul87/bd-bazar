"use client";

import { Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
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
} from 'chart.js';
import { ArrowUpRight, BarChart2, List } from 'lucide-react';

// Register required ChartJS components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
);

export function SalesChart() {
  const [chartView, setChartView] = useState<'daily' | 'weekly'>('daily');
  const [chartData, setChartData] = useState<any>(null);
  
  // Generate some mock data for the chart
  useEffect(() => {
    const dailyLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weeklyLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    
    const dailyData = [1420, 2856, 2350, 3280, 3012, 2800, 3700];
    const weeklyData = [8500, 11200, 10600, 14300];
    
    const gradient = {
      backgroundColor: (context: any) => {
        if (!context?.chart?.canvas) return 'rgba(59, 130, 246, 0.1)';
        
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        return gradient;
      }
    };
    
    setChartData({
      labels: chartView === 'daily' ? dailyLabels : weeklyLabels,
      datasets: [
        {
          label: 'Sales ($)',
          data: chartView === 'daily' ? dailyData : weeklyData,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: gradient.backgroundColor,
          tension: 0.3,
          fill: true,
          pointBackgroundColor: 'rgb(59, 130, 246)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        }
      ]
    });
  }, [chartView]);
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgb(15, 23, 42)',
        titleColor: 'rgb(255, 255, 255)',
        bodyColor: 'rgb(203, 213, 225)',
        borderColor: 'rgb(51, 65, 85)',
        borderWidth: 1,
        padding: 10,
        bodyFont: {
          family: 'Inter, sans-serif',
          size: 12,
        },
        titleFont: {
          family: 'Inter, sans-serif',
          size: 13,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgb(148, 163, 184)',
          font: {
            family: 'Inter, sans-serif',
            size: 11,
          },
        },
      },
      y: {
        border: {
          display: false,
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        ticks: {
          color: 'rgb(148, 163, 184)',
          font: {
            family: 'Inter, sans-serif',
            size: 11,
          },
          callback: (value: number) => {
            return '$' + value.toLocaleString();
          },
        },
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };
  
  return (
    <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden shadow-lg">
      <div className="border-b border-slate-700/50 p-4 flex items-center justify-between">
        <h3 className="font-medium text-white">Sales Performance</h3>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setChartView('daily')}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium
              ${chartView === 'daily' 
                ? 'bg-blue-600/20 text-blue-400 border border-blue-600/40' 
                : 'text-gray-400 hover:text-gray-300'}`}
          >
            <List className="h-3 w-3" />
            <span>Daily</span>
          </button>
          <button 
            onClick={() => setChartView('weekly')}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium
              ${chartView === 'weekly' 
                ? 'bg-blue-600/20 text-blue-400 border border-blue-600/40' 
                : 'text-gray-400 hover:text-gray-300'}`}
          >
            <BarChart2 className="h-3 w-3" />
            <span>Weekly</span>
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-sm text-gray-400">Total Sales</span>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-white">$19,345.80</h2>
              <div className="flex items-center gap-1 text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded">
                <ArrowUpRight className="h-3 w-3" />
                <span>12.5%</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <span className="text-sm text-gray-400">Compared to</span>
            <p className="text-gray-300">Previous Period</p>
          </div>
        </div>
        
        <div className="h-72">
          {chartData && <Line data={chartData} options={options} />}
        </div>
      </div>
    </div>
  );
} 