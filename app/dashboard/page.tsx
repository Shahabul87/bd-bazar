import { KPICards } from "./_components/dashboard/kpi-cards"
import { SalesTrends } from "./_components/dashboard/sales-trends"
import { RevenueByCategory } from "./_components/dashboard/revenue-by-category"
import { TrafficSources } from "./_components/dashboard/traffic-sources"
import { ConversionFunnel } from "./_components/dashboard/conversion-funnel"
import { ActivityFeed } from "./_components/dashboard/activity-feed"
import { FilterBar } from "./_components/filter-bar"
import { DashboardHeader } from "./_components/dashboard/dashboard-header"
import { CircleDollarSign, Zap, BrainCircuit, LineChart, BarChart3, ShoppingCart } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  // Default date range for static rendering
  const dateRange = "7d"

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-6 px-6 md:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <DashboardHeader initialDateRange={dateRange} />
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Sidebar - Left */}
        <div className="xl:col-span-3 space-y-6">
          {/* AI Assistant Panel */}
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden shadow-lg">
            <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 p-4 border-b border-slate-700/50">
              <div className="flex items-center">
                <BrainCircuit className="h-6 w-6 text-purple-400 mr-2" />
                <h3 className="font-bold text-white">AI Assistant</h3>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex gap-3 items-start">
                <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <div className="p-3 bg-slate-700/50 rounded-lg rounded-tl-none">
                  <p className="text-sm text-slate-300">What insights can I gain from my recent sales data?</p>
                </div>
              </div>
              
              <div className="flex gap-3 items-start">
                <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <div className="p-3 bg-slate-700/50 rounded-lg rounded-tl-none">
                  <p className="text-sm text-slate-300">Suggest new products based on current trends</p>
                </div>
              </div>
              
              <div className="pt-3">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full bg-slate-700/30 border border-slate-600/50 rounded-lg py-2 pl-4 pr-10 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    placeholder="Ask AI assistant..."
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded-full bg-purple-600 hover:bg-purple-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                      <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden shadow-lg">
            <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 p-4 border-b border-slate-700/50">
              <h3 className="font-bold text-white">Quick Actions</h3>
            </div>
            <div className="p-5 grid grid-cols-2 gap-3">
              <Link 
                href="/dashboard/products/new" 
                className="flex flex-col items-center justify-center p-4 bg-slate-700/30 hover:bg-slate-700/50 border border-slate-700/50 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-400 mb-2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                <span className="text-xs text-slate-300">Add Product</span>
              </Link>
              
              <Link 
                href="/dashboard/orders" 
                className="flex flex-col items-center justify-center p-4 bg-slate-700/30 hover:bg-slate-700/50 border border-slate-700/50 rounded-lg transition-colors"
              >
                <ShoppingCart className="h-6 w-6 text-green-400 mb-2" />
                <span className="text-xs text-slate-300">View Orders</span>
              </Link>
              
              <Link 
                href="/dashboard/customers" 
                className="flex flex-col items-center justify-center p-4 bg-slate-700/30 hover:bg-slate-700/50 border border-slate-700/50 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-purple-400 mb-2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span className="text-xs text-slate-300">Customers</span>
              </Link>
              
              <Link 
                href="/dashboard/analytics" 
                className="flex flex-col items-center justify-center p-4 bg-slate-700/30 hover:bg-slate-700/50 border border-slate-700/50 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-orange-400 mb-2">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
                <span className="text-xs text-slate-300">Analytics</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Main Content - Right */}
        <div className="xl:col-span-9 space-y-6">
          {/* KPI Cards */}
          <KPICards dateRange={dateRange} />
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden shadow-lg">
              <div className="bg-gradient-to-r from-blue-600/20 to-green-600/20 p-4 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <LineChart className="h-5 w-5 text-green-400 mr-2" />
                    <h3 className="font-bold text-white">Revenue Trends</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <div className="h-3 w-3 rounded-full bg-green-400"></div>
                      <span className="text-xs text-slate-300">This Month</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="h-3 w-3 rounded-full bg-slate-400"></div>
                      <span className="text-xs text-slate-300">Last Month</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-5 h-[300px] flex items-center justify-center">
                {/* Placeholder for actual chart */}
                <div className="w-full h-full bg-slate-700/30 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 flex items-end pb-6 px-6">
                    <div className="h-[40%] w-4 bg-green-500/70 rounded-t-md mr-3"></div>
                    <div className="h-[65%] w-4 bg-green-500/70 rounded-t-md mr-3"></div>
                    <div className="h-[55%] w-4 bg-green-500/70 rounded-t-md mr-3"></div>
                    <div className="h-[70%] w-4 bg-green-500/70 rounded-t-md mr-3"></div>
                    <div className="h-[85%] w-4 bg-green-500/70 rounded-t-md mr-3"></div>
                    <div className="h-[75%] w-4 bg-green-500/70 rounded-t-md mr-3"></div>
                    <div className="h-[90%] w-4 bg-green-500/70 rounded-t-md mr-3"></div>
                    
                    <div className="h-[30%] w-4 bg-slate-500/50 rounded-t-md mr-3"></div>
                    <div className="h-[50%] w-4 bg-slate-500/50 rounded-t-md mr-3"></div>
                    <div className="h-[40%] w-4 bg-slate-500/50 rounded-t-md mr-3"></div>
                    <div className="h-[60%] w-4 bg-slate-500/50 rounded-t-md mr-3"></div>
                    <div className="h-[75%] w-4 bg-slate-500/50 rounded-t-md mr-3"></div>
                    <div className="h-[55%] w-4 bg-slate-500/50 rounded-t-md mr-3"></div>
                    <div className="h-[65%] w-4 bg-slate-500/50 rounded-t-md"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Category Distribution */}
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden shadow-lg">
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-4 border-b border-slate-700/50">
                <div className="flex items-center">
                  <BarChart3 className="h-5 w-5 text-purple-400 mr-2" />
                  <h3 className="font-bold text-white">Product Category Distribution</h3>
                </div>
              </div>
              
              <div className="p-5 h-[300px] flex items-center justify-center">
                {/* Placeholder for actual chart */}
                <div className="w-full h-full relative flex items-center justify-center">
                  <div className="h-56 w-56 rounded-full border-8 border-slate-700/30 relative">
                    <div className="absolute inset-0 bg-clip-content p-2">
                      <div className="h-full w-full rounded-full overflow-hidden">
                        <div className="h-full w-full overflow-hidden">
                          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-purple-500/70 origin-bottom-right rounded-tl-full"></div>
                          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/70 origin-bottom-left rounded-tr-full"></div>
                          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-green-500/70 origin-top-left rounded-br-full"></div>
                          <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-pink-500/70 origin-top-right"></div>
                          <div className="absolute bottom-0 left-1/4 w-1/4 h-1/2 bg-orange-500/70 origin-top-right"></div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-slate-800 border-4 border-slate-700"></div>
                  </div>
                  <div className="absolute top-4 right-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-purple-500/70"></div>
                      <span className="text-xs text-slate-300">Electronics (25%)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500/70"></div>
                      <span className="text-xs text-slate-300">Fashion (25%)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-green-500/70"></div>
                      <span className="text-xs text-slate-300">Home (25%)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-pink-500/70"></div>
                      <span className="text-xs text-slate-300">Beauty (12.5%)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-orange-500/70"></div>
                      <span className="text-xs text-slate-300">Others (12.5%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Activities & AI Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden shadow-lg">
              <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 p-4 border-b border-slate-700/50">
                <h3 className="font-bold text-white">Recent Activities</h3>
              </div>
              
              <div className="p-5 space-y-4">
                <div className="relative pl-6 pb-4 border-l border-slate-700/50">
                  <div className="absolute top-0 left-0 -translate-x-1/2 h-4 w-4 rounded-full bg-green-500 border-2 border-slate-800"></div>
                  <p className="text-sm font-medium text-white">New order received</p>
                  <p className="text-xs text-slate-400 mt-1">Order #58729 - $125.00</p>
                  <p className="text-xs text-slate-500 mt-1">15 minutes ago</p>
                </div>
                
                <div className="relative pl-6 pb-4 border-l border-slate-700/50">
                  <div className="absolute top-0 left-0 -translate-x-1/2 h-4 w-4 rounded-full bg-blue-500 border-2 border-slate-800"></div>
                  <p className="text-sm font-medium text-white">Product stock update</p>
                  <p className="text-xs text-slate-400 mt-1">iPhone 15 Pro - 24 units added</p>
                  <p className="text-xs text-slate-500 mt-1">43 minutes ago</p>
                </div>
                
                <div className="relative pl-6 pb-4 border-l border-slate-700/50">
                  <div className="absolute top-0 left-0 -translate-x-1/2 h-4 w-4 rounded-full bg-orange-500 border-2 border-slate-800"></div>
                  <p className="text-sm font-medium text-white">New customer registered</p>
                  <p className="text-xs text-slate-400 mt-1">John Doe - john.doe@example.com</p>
                  <p className="text-xs text-slate-500 mt-1">1 hour ago</p>
                </div>
                
                <div className="relative pl-6">
                  <div className="absolute top-0 left-0 -translate-x-1/2 h-4 w-4 rounded-full bg-purple-500 border-2 border-slate-800"></div>
                  <p className="text-sm font-medium text-white">Payment received</p>
                  <p className="text-xs text-slate-400 mt-1">Order #58720 - $350.00</p>
                  <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
                </div>
              </div>
            </div>
            
            {/* AI Recommendations */}
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden shadow-lg">
              <div className="bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 p-4 border-b border-slate-700/50">
                <div className="flex items-center">
                  <BrainCircuit className="h-5 w-5 text-pink-400 mr-2" />
                  <h3 className="font-bold text-white">AI Recommendations</h3>
                </div>
              </div>
              
              <div className="p-5 space-y-4">
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                      <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-white text-sm">Trend Insight</h4>
                    <p className="text-xs text-slate-300 mt-1">Electronics category sales are up 15% this week. Consider increasing your marketing budget for this category.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center flex-shrink-0">
                    <CircleDollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white text-sm">Price Optimization</h4>
                    <p className="text-xs text-slate-300 mt-1">AI suggests increasing the price of "Wireless Headphones" by 5% to maximize profit without affecting conversion rate.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                      <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                      <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-white text-sm">Customer Engagement</h4>
                    <p className="text-xs text-slate-300 mt-1">Send targeted emails to 125 customers who haven't purchased in 30+ days with a 10% discount offer.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-white text-sm">Product Recommendation</h4>
                    <p className="text-xs text-slate-300 mt-1">Based on current trends, adding "Smart Home Security Cameras" to your inventory could increase revenue by 8%.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 