"use client"

import { DollarSign, ShoppingCart, Users, Package, ArrowUp, ArrowDown } from "lucide-react"
import { useRouter } from "next/navigation"

interface KPICardProps {
  title: string
  value: string
  trend: {
    value: number
    label: string
  }
  icon: React.ComponentType<{ className?: string }>
  color: string
  bgColor: string
  href: string
}

interface KPICardsProps {
  dateRange: string
}

const kpiData: KPICardProps[] = [
  {
    title: "Total Revenue",
    value: "$54,235",
    trend: {
      value: 12.5,
      label: "vs last month"
    },
    icon: DollarSign,
    color: "text-green-400",
    bgColor: "bg-green-900",
    href: "/admindashboard/revenue"
  },
  {
    title: "Orders Today",
    value: "145",
    trend: {
      value: 8.2,
      label: "vs yesterday"
    },
    icon: ShoppingCart,
    color: "text-blue-400",
    bgColor: "bg-blue-900",
    href: "/admindashboard/orders/today"
  },
  {
    title: "Active Customers",
    value: "2,845",
    trend: {
      value: -2.4,
      label: "vs last week"
    },
    icon: Users,
    color: "text-purple-400",
    bgColor: "bg-purple-900",
    href: "/admindashboard/customers/active"
  },
  {
    title: "Products in Stock",
    value: "1,256",
    trend: {
      value: 4.3,
      label: "vs last month"
    },
    icon: Package,
    color: "text-orange-400",
    bgColor: "bg-orange-900",
    href: "/admindashboard/products/stock"
  }
]

const KPICard = ({ title, value, trend, icon: Icon, color, bgColor, href }: KPICardProps) => {
  const router = useRouter()

  return (
    <div 
      onClick={() => router.push(href)}
      className="bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-800 cursor-pointer hover:bg-gray-800 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-white">{value}</h3>
          <div className="flex items-center gap-1 mt-1">
            {trend.value > 0 ? (
              <ArrowUp className="h-4 w-4 text-green-400" />
            ) : (
              <ArrowDown className="h-4 w-4 text-red-400" />
            )}
            <p className={`text-sm ${trend.value > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {Math.abs(trend.value)}% {trend.label}
            </p>
          </div>
        </div>
        <div className={`${bgColor} p-3 rounded-full`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
    </div>
  )
}

export const KPICards = ({ dateRange }: KPICardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((kpi) => (
        <KPICard key={kpi.title} {...kpi} />
      ))}
    </div>
  )
} 