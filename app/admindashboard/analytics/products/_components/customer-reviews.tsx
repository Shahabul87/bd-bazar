"use client"

import { useState } from "react"
import { Star, MessageSquare, AlertCircle, ThumbsUp, ThumbsDown, BarChart2 } from "lucide-react"
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

interface CustomerReviewsProps {
  dateRange: {
    from: string
    to: string
  }
}

interface ReviewData {
  productName: string
  category: string
  averageRating: number
  totalReviews: number
  recentReviews: {
    id: string
    rating: number
    comment: string
    date: string
    helpful: number
    response?: string
  }[]
  commonTerms: {
    term: string
    count: number
    sentiment: "positive" | "negative" | "neutral"
  }[]
}

export const CustomerReviews = ({ dateRange }: CustomerReviewsProps) => {
  const [selectedView, setSelectedView] = useState<"overview" | "details" | "responses">("overview")
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  // Mock data for reviews
  const reviewsData: ReviewData[] = [
    {
      productName: "Wireless Headphones",
      category: "Electronics",
      averageRating: 4.5,
      totalReviews: 128,
      recentReviews: [
        {
          id: "1",
          rating: 4,
          comment: "Great sound quality but battery life could be better",
          date: "2024-03-15",
          helpful: 12
        },
        {
          id: "2",
          rating: 2,
          comment: "Connection issues after a month of use",
          date: "2024-03-14",
          helpful: 8,
          response: "We're sorry to hear about the connection issues. Please contact our support team for troubleshooting assistance."
        }
      ],
      commonTerms: [
        { term: "sound quality", count: 45, sentiment: "positive" },
        { term: "battery life", count: 30, sentiment: "negative" },
        { term: "comfortable", count: 25, sentiment: "positive" }
      ]
    },
    {
      productName: "Smart Watch",
      category: "Electronics",
      averageRating: 4.2,
      totalReviews: 95,
      recentReviews: [
        {
          id: "3",
          rating: 5,
          comment: "Perfect fitness companion, accurate tracking",
          date: "2024-03-15",
          helpful: 15
        },
        {
          id: "4",
          rating: 3,
          comment: "Screen could be brighter outdoors",
          date: "2024-03-13",
          helpful: 6
        }
      ],
      commonTerms: [
        { term: "battery life", count: 35, sentiment: "positive" },
        { term: "screen brightness", count: 20, sentiment: "negative" },
        { term: "fitness tracking", count: 40, sentiment: "positive" }
      ]
    }
  ]

  // Prepare chart data for category ratings
  const categoryRatings = {
    Electronics: 4.3,
    Clothing: 4.1,
    Accessories: 4.4,
    "Home & Living": 4.2,
    Books: 4.5
  }

  const chartData: ChartData<"bar"> = {
    labels: Object.keys(categoryRatings),
    datasets: [
      {
        label: 'Average Rating',
        data: Object.values(categoryRatings),
        backgroundColor: 'rgba(250, 204, 21, 0.8)',
        borderColor: 'rgb(250, 204, 21)',
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
        max: 5,
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

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-400'
        }`}
      />
    ))
  }

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-400" />
            <h2 className="text-lg font-medium">Customer Reviews & Ratings</h2>
          </div>
          <div className="flex gap-2">
            {(['overview', 'details', 'responses'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setSelectedView(view)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  selectedView === view
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-gray-400">Average Rating</span>
            </div>
            <p className="text-2xl font-bold">4.3</p>
            <p className="text-sm text-green-400">+0.2 vs last period</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-gray-400">Total Reviews</span>
            </div>
            <p className="text-2xl font-bold">1,250</p>
            <p className="text-sm text-green-400">+15% vs last period</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <span className="text-sm text-gray-400">Critical Reviews</span>
            </div>
            <p className="text-2xl font-bold">45</p>
            <p className="text-sm text-red-400">Needs attention</p>
          </div>
        </div>

        {/* Category Ratings Chart */}
        <div className="h-[300px] mb-6">
          <Bar data={chartData} options={chartOptions} />
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Recent Reviews</h3>
          {reviewsData.map((product) => (
            <div key={product.productName} className="bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-medium">{product.productName}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">{renderStars(product.averageRating)}</div>
                    <span className="text-sm text-gray-400">
                      ({product.totalReviews} reviews)
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProduct(product.productName)}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  View All Reviews
                </button>
              </div>

              {/* Common Terms */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.commonTerms.map((term) => (
                  <span
                    key={term.term}
                    className={`px-2 py-1 rounded-full text-xs ${
                      term.sentiment === 'positive'
                        ? 'bg-green-900/50 text-green-400'
                        : term.sentiment === 'negative'
                        ? 'bg-red-900/50 text-red-400'
                        : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    {term.term} ({term.count})
                  </span>
                ))}
              </div>

              {/* Recent Reviews */}
              <div className="space-y-3">
                {product.recentReviews.map((review) => (
                  <div key={review.id} className="border-t border-gray-700 pt-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-sm text-gray-400">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-gray-700 rounded">
                          <ThumbsUp className="h-4 w-4" />
                        </button>
                        <span className="text-sm text-gray-400">{review.helpful}</span>
                      </div>
                    </div>
                    <p className="text-sm mb-2">{review.comment}</p>
                    {review.response && (
                      <div className="bg-gray-700/50 p-3 rounded-lg mt-2">
                        <p className="text-sm text-blue-400 mb-1">Store Response:</p>
                        <p className="text-sm">{review.response}</p>
                      </div>
                    )}
                    {!review.response && review.rating <= 3 && (
                      <button className="text-sm text-blue-400 hover:text-blue-300">
                        Respond to Review
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 