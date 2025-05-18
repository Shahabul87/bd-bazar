"use client";

import { CreditCard, Check, Clock, Zap, Package, Award, BarChart3, PiggyBank, ArrowRight, Calendar, ArrowUp, Shield, Tag, Info } from "lucide-react";

interface BillingSettingsProps {
  storeId: string;
}

export const BillingSettings: React.FC<BillingSettingsProps> = ({ storeId }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-emerald-500" />
              Billing & Subscription
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-2.5 py-1 rounded-full">
                Pro Plan
              </span>
            </div>
          </div>

          {/* Current Plan */}
          <div className="bg-gradient-to-r from-slate-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 p-6 rounded-xl border border-slate-200 dark:border-slate-700 mb-8">
            <div className="flex flex-col lg:flex-row justify-between gap-8 items-start">
              <div className="flex gap-5 items-start">
                <div className="bg-white dark:bg-slate-700 p-2.5 rounded-lg shadow-sm">
                  <Package className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1 flex items-center">
                    <span>Pro Plan</span>
                    <Award className="h-4 w-4 ml-2 text-amber-500" />
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                    Your plan renews on <span className="font-medium">Oct 15, 2023</span>
                  </p>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-emerald-500" />
                      <span>Unlimited Products</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-emerald-500" />
                      <span>Custom Domains</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-emerald-500" />
                      <span>AI SEO Optimization</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-emerald-500" />
                      <span>0.5% Transaction Fee</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full lg:w-auto">
                <div className="text-right">
                  <span className="text-2xl font-bold">$49</span>
                  <span className="text-slate-500 text-sm">/month</span>
                </div>
                <button className="bg-gradient-to-r from-indigo-500 to-emerald-500 hover:from-indigo-600 hover:to-emerald-600 text-white text-sm px-4 py-2 rounded-lg shadow-sm transition-all w-full">
                  Manage Plan
                </button>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium flex items-center">
                <CreditCard className="h-4 w-4 mr-2 text-slate-600 dark:text-slate-400" />
                Payment Methods
              </h3>
              <button className="text-xs bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 transition-colors">
                Add Payment Method
              </button>
            </div>
            
            {/* Default Credit Card */}
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-5 mb-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg">
                    <svg className="h-5 w-5 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H21C22.1046 19 23 18.1046 23 17V7C23 5.89543 22.1046 5 21 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M1 10H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <p className="font-medium text-slate-900 dark:text-slate-100">Visa ending in 4242</p>
                      <span className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs">Default</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-500">
                      <span>Expires 12/2024</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button className="text-xs bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 transition-colors">
                    Edit
                  </button>
                  <button className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 px-2 py-1.5">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Billing History */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium flex items-center">
                <Clock className="h-4 w-4 mr-2 text-slate-600 dark:text-slate-400" />
                Billing History
              </h3>
              <button className="text-xs bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 transition-colors">
                Download All
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Description</th>
                    <th className="px-4 py-3 text-left">Amount</th>
                    <th className="px-4 py-3 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-sm">
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap text-slate-600 dark:text-slate-300">Sep 15, 2023</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium text-slate-800 dark:text-slate-200">Pro Plan Subscription</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap font-medium">$49.00</td>
                    <td className="px-4 py-4 whitespace-nowrap text-right">
                      <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                        Download
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap text-slate-600 dark:text-slate-300">Aug 15, 2023</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium text-slate-800 dark:text-slate-200">Pro Plan Subscription</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap font-medium">$49.00</td>
                    <td className="px-4 py-4 whitespace-nowrap text-right">
                      <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                        Download
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 whitespace-nowrap text-slate-600 dark:text-slate-300">Jul 15, 2023</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium text-slate-800 dark:text-slate-200">Pro Plan Subscription</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap font-medium">$49.00</td>
                    <td className="px-4 py-4 whitespace-nowrap text-right">
                      <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                        Download
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Cost Savings */}
          <div className="bg-gradient-to-r from-slate-50 to-teal-50 dark:from-slate-800 dark:to-teal-900/20 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium flex items-center">
                  <PiggyBank className="h-4 w-4 mr-2 text-teal-600 dark:text-teal-400" />
                  AI-Powered Cost Savings
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  Our AI automatically optimizes your business operations
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-white dark:bg-slate-700 px-3 py-1 rounded-lg shadow-sm text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center">
                  <ArrowUp className="h-3.5 w-3.5 mr-1" />
                  32% saved
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/80 dark:bg-slate-800/60 rounded-lg p-5 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="font-medium text-slate-900 dark:text-slate-100">Inventory AI</span>
                  </div>
                  <span className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">Save 20%</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
                  Smart inventory prediction reduces overstocking costs
                </p>
              </div>
              
              <div className="bg-white/80 dark:bg-slate-800/60 rounded-lg p-5 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
                      <Zap className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                    </div>
                    <span className="font-medium text-slate-900 dark:text-slate-100">Smart Marketing</span>
                  </div>
                  <span className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">Save 35%</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
                  AI targets high-value customers, reducing ad spend
                </p>
              </div>
              
              <div className="bg-white/80 dark:bg-slate-800/60 rounded-lg p-5 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                      <Shield className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <span className="font-medium text-slate-900 dark:text-slate-100">Fraud Prevention</span>
                  </div>
                  <span className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">Save 28%</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
                  AI fraud detection prevents chargeback losses
                </p>
              </div>
            </div>
          </div>

          {/* Available Plans */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium flex items-center">
                <Tag className="h-4 w-4 mr-2 text-slate-600 dark:text-slate-400" />
                Available Plans
              </h3>
              <button className="text-xs bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 transition-colors flex items-center gap-1">
                <Info className="h-3.5 w-3.5" />
                Compare All Plans
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-5 border border-slate-200 dark:border-slate-700 relative">
                <h4 className="font-medium text-lg mb-1">Starter</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">For new businesses</p>
                <div className="mb-4">
                  <span className="text-2xl font-bold">$29</span>
                  <span className="text-slate-500 text-sm">/month</span>
                </div>
                <ul className="space-y-2 mb-5">
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>100 products</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>2% transaction fee</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>Basic analytics</span>
                  </li>
                </ul>
                <button className="w-full bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600 text-sm px-4 py-2 rounded-lg shadow-sm transition-all">
                  Downgrade
                </button>
              </div>
              
              <div className="bg-gradient-to-b from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-emerald-900/10 rounded-lg p-5 border border-emerald-200 dark:border-emerald-800/30 relative">
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">
                  CURRENT
                </div>
                <h4 className="font-medium text-lg mb-1">Pro</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">For growing businesses</p>
                <div className="mb-4">
                  <span className="text-2xl font-bold">$49</span>
                  <span className="text-slate-500 text-sm">/month</span>
                </div>
                <ul className="space-y-2 mb-5">
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>Unlimited products</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>0.5% transaction fee</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>AI-powered insights</span>
                  </li>
                </ul>
                <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm px-4 py-2 rounded-lg shadow-sm transition-all">
                  Current Plan
                </button>
              </div>
              
              <div className="bg-gradient-to-b from-violet-50 to-indigo-50 dark:from-slate-800 dark:to-indigo-900/10 rounded-lg p-5 border border-violet-200 dark:border-violet-800/30 relative">
                <h4 className="font-medium text-lg mb-1">Enterprise</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">For large businesses</p>
                <div className="mb-4">
                  <span className="text-2xl font-bold">$199</span>
                  <span className="text-slate-500 text-sm">/month</span>
                </div>
                <ul className="space-y-2 mb-5">
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>Unlimited everything</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>0% transaction fee</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>Dedicated support</span>
                  </li>
                </ul>
                <button className="w-full bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600 text-sm px-4 py-2 rounded-lg shadow-sm transition-all">
                  Upgrade
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-end pt-4">
            <button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg shadow-sm transition-all">
              Save Billing Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 