"use client";

import { useState } from "react";
import { CustomerWithInsights } from "@/actions/get-store-customers";
import { motion } from "framer-motion";
import { 
  Search, Filter, Users, TrendingUp, TrendingDown, Activity,
  User, AlertCircle, Mail, Calendar, DollarSign, ShoppingBag, Brain 
} from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";

interface CustomersListProps {
  customers: CustomerWithInsights[];
  storeId: string;
}

export const CustomersList = ({ customers, storeId }: CustomersListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [spendingFilter, setSpendingFilter] = useState<string | null>(null);
  const [riskFilter, setRiskFilter] = useState<string | null>(null);
  const [trendFilter, setTrendFilter] = useState<string | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerWithInsights | null>(null);
  
  if (customers.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm border border-dashed border-gray-300">
        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-purple-50">
          <Users className="h-8 w-8 text-purple-500" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">No customers yet</h3>
        <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
          When customers place orders from your store, their details and AI-powered insights will appear here.
        </p>
      </div>
    );
  }

  // Filter customers based on search query and filters
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      searchQuery === "" || 
      (customer.name && customer.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (customer.email && customer.email.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSpending = 
      spendingFilter === null || 
      customer.aiInsights.spendingTier === spendingFilter;
    
    const matchesRisk = 
      riskFilter === null || 
      customer.aiInsights.churnRisk === riskFilter;
      
    const matchesTrend = 
      trendFilter === null || 
      customer.aiInsights.purchaseTrend === trendFilter;
    
    return matchesSearch && matchesSpending && matchesRisk && matchesTrend;
  });

  // Get icon for purchase trend
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "decreasing":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case "stable":
        return <Activity className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  // Get color for churn risk
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border shadow-sm">
        <div className="flex flex-col space-y-4">
          {/* Search input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Search customers by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Spending Tier filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-4 w-4 text-gray-400" />
              </div>
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white w-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={spendingFilter || ""}
                onChange={(e) => setSpendingFilter(e.target.value || null)}
              >
                <option value="">All spending tiers</option>
                <option value="high">High spenders</option>
                <option value="medium">Medium spenders</option>
                <option value="low">Low spenders</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Churn Risk filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AlertCircle className="h-4 w-4 text-gray-400" />
              </div>
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white w-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={riskFilter || ""}
                onChange={(e) => setRiskFilter(e.target.value || null)}
              >
                <option value="">All churn risks</option>
                <option value="high">High risk</option>
                <option value="medium">Medium risk</option>
                <option value="low">Low risk</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Purchase Trend filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Activity className="h-4 w-4 text-gray-400" />
              </div>
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white w-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={trendFilter || ""}
                onChange={(e) => setTrendFilter(e.target.value || null)}
              >
                <option value="">All purchase trends</option>
                <option value="increasing">Increasing</option>
                <option value="stable">Stable</option>
                <option value="decreasing">Decreasing</option>
                <option value="new">New customers</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {filteredCustomers.length === 0 ? (
        <div className="bg-white p-8 rounded-xl border text-center">
          <p className="text-gray-500">No customers match your filters.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-purple-50 to-fuchsia-50 border-b border-gray-200">
            <h3 className="font-medium text-gray-800 flex items-center">
              <Brain className="h-4 w-4 mr-2 text-purple-500" />
              AI-Enhanced Customer List
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders & Spending
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    AI Insights
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loyalty Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Churn Risk
                  </th>
                </tr>
              </thead>
              <motion.tbody
                variants={container}
                initial="hidden"
                animate="show"
                className="bg-white divide-y divide-gray-200"
              >
                {filteredCustomers.map((customer) => (
                  <motion.tr 
                    key={customer.id}
                    variants={item}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 relative">
                          {customer.image ? (
                            <Image
                              src={customer.image}
                              alt={customer.name || ""}
                              fill
                              className="rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                              <User className="h-5 w-5 text-purple-600" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {customer.name || "Anonymous User"}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {customer.email || "No email provided"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center mb-1">
                        <ShoppingBag className="h-4 w-4 mr-1 text-purple-500" />
                        {customer.orderCount} {customer.orderCount === 1 ? "order" : "orders"}
                      </div>
                      <div className="text-sm text-gray-900 flex items-center">
                        <DollarSign className="h-4 w-4 mr-1 text-green-500" />
                        ${customer.totalSpent.toFixed(2)} total spent
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(customer.aiInsights.purchaseTrend)}
                        <span className="text-sm text-gray-900 capitalize">
                          {customer.aiInsights.purchaseTrend === "new" 
                            ? "New Customer" 
                            : `${customer.aiInsights.purchaseTrend} purchases`}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {customer.aiInsights.preferredCategories.slice(0, 2).join(", ")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-fuchsia-500"
                          style={{ width: `${customer.aiInsights.loyaltyScore}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {customer.aiInsights.loyaltyScore}/100
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${getRiskColor(customer.aiInsights.churnRisk)}`}>
                        {customer.aiInsights.churnRisk}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
        </div>
      )}

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b sticky top-0 bg-white z-10">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Customer Details</h3>
                <button 
                  onClick={() => setSelectedCustomer(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                  {selectedCustomer.image ? (
                    <Image
                      src={selectedCustomer.image}
                      alt={selectedCustomer.name || ""}
                      width={64}
                      height={64}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-8 w-8 text-purple-600" />
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-medium">{selectedCustomer.name || "Anonymous User"}</h4>
                  <p className="text-gray-500">{selectedCustomer.email || "No email provided"}</p>
                  {selectedCustomer.lastOrderDate && (
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      Last order on {format(new Date(selectedCustomer.lastOrderDate), 'MMM d, yyyy')}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="bg-purple-50 rounded-lg p-4">
                  <h5 className="font-medium text-purple-800 mb-3 flex items-center">
                    <Brain className="h-4 w-4 mr-2" />
                    AI Predictions
                  </h5>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Next Purchase:</span> {selectedCustomer.aiInsights.nextPurchasePrediction}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Spending Pattern:</span> {selectedCustomer.aiInsights.spendingTier.charAt(0).toUpperCase() + selectedCustomer.aiInsights.spendingTier.slice(1)} spender
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Purchase Trend:</span> {selectedCustomer.aiInsights.purchaseTrend.charAt(0).toUpperCase() + selectedCustomer.aiInsights.purchaseTrend.slice(1)}
                    </p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-fuchsia-50 to-pink-50 rounded-lg p-4">
                  <h5 className="font-medium text-fuchsia-800 mb-3 flex items-center">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Customer Stats
                  </h5>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-2 bg-white rounded-lg">
                      <p className="text-gray-500 text-xs">Orders</p>
                      <p className="text-xl font-semibold text-gray-900">{selectedCustomer.orderCount}</p>
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg">
                      <p className="text-gray-500 text-xs">Total Spent</p>
                      <p className="text-xl font-semibold text-gray-900">${selectedCustomer.totalSpent.toFixed(2)}</p>
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg">
                      <p className="text-gray-500 text-xs">Loyalty Score</p>
                      <p className="text-xl font-semibold text-gray-900">{selectedCustomer.aiInsights.loyaltyScore}/100</p>
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg">
                      <p className="text-gray-500 text-xs">Churn Risk</p>
                      <p className="text-xl font-semibold text-gray-900 capitalize">{selectedCustomer.aiInsights.churnRisk}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h5 className="font-medium text-gray-800 mb-3">Preferred Categories</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedCustomer.aiInsights.preferredCategories.map((category, index) => (
                    <span key={index} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h5 className="font-medium text-gray-800 mb-3">Recommended Products</h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedCustomer.aiInsights.recommendedProducts.map((product, index) => (
                    <div key={index} className="border rounded-lg p-3 bg-gradient-to-r from-purple-50 to-fuchsia-50">
                      <p className="text-sm font-medium text-purple-800">{product}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t bg-gray-50 flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 mr-3"
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Send Campaign
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}; 