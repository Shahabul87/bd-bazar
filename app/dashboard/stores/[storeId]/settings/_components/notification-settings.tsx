"use client";

import { Bell, Zap, MailOpen, SmartphoneNfc, ShoppingCart, User, ArrowDownToLine, Send } from "lucide-react";

interface NotificationSettingsProps {
  storeId: string;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({ storeId }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <Bell className="h-5 w-5 mr-2 text-violet-500" />
              Notification Settings
            </h2>
            <div className="flex items-center gap-2">
              <div className="bg-violet-100 dark:bg-violet-900/30 p-1.5 rounded-full">
                <Zap className="h-4 w-4 text-violet-600 dark:text-violet-400" />
              </div>
              <span className="text-xs font-medium bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">
                AI-Powered Alerts
              </span>
            </div>
          </div>

          {/* Smart Summary Card */}
          <div className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 p-6 rounded-xl border border-violet-100 dark:border-slate-600 mb-8">
            <div className="flex items-start gap-5">
              <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-sm">
                <Zap className="h-6 w-6 text-violet-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-1">AI Smart Notifications</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  Our AI analyzes customer behavior to send personalized notifications at optimal times, increasing engagement by up to 38%.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="bg-white dark:bg-slate-700 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-slate-200 dark:border-slate-600 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-violet-500"></div>
                    <span className="text-xs font-medium">Personalized</span>
                  </div>
                  <div className="bg-white dark:bg-slate-700 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-slate-200 dark:border-slate-600 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                    <span className="text-xs font-medium">Automated</span>
                  </div>
                  <div className="bg-white dark:bg-slate-700 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-slate-200 dark:border-slate-600 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-xs font-medium">Data-Driven</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="relative w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 dark:peer-focus:ring-violet-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                </label>
                <span className="text-xs text-slate-500">Enabled</span>
              </div>
            </div>
          </div>

          {/* Channel Preferences */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-medium">Notification Channels</h3>
              <button className="text-xs bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors">
                Test All Channels
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email Notifications */}
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-50 dark:bg-indigo-900/10 rounded-bl-full -mt-2 -mr-2 z-0"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg">
                        <MailOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <span className="font-medium">Email</span>
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                      <div className="relative w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="h-3.5 w-3.5 text-slate-500" />
                        <span>New orders</span>
                      </div>
                      <input type="checkbox" className="rounded border-slate-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="h-3.5 w-3.5 text-slate-500" />
                        <span>New customers</span>
                      </div>
                      <input type="checkbox" className="rounded border-slate-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ArrowDownToLine className="h-3.5 w-3.5 text-slate-500" />
                        <span>Inventory alerts</span>
                      </div>
                      <input type="checkbox" className="rounded border-slate-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* SMS Notifications */}
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-violet-50 dark:bg-violet-900/10 rounded-bl-full -mt-2 -mr-2 z-0"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="bg-violet-100 dark:bg-violet-900/30 p-2 rounded-lg">
                        <SmartphoneNfc className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                      </div>
                      <span className="font-medium">SMS</span>
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" />
                      <div className="relative w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 dark:peer-focus:ring-violet-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                    </label>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="h-3.5 w-3.5 text-slate-500" />
                        <span>New orders</span>
                      </div>
                      <input type="checkbox" className="rounded border-slate-300 text-violet-600 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="h-3.5 w-3.5 text-slate-500" />
                        <span>New customers</span>
                      </div>
                      <input type="checkbox" className="rounded border-slate-300 text-violet-600 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ArrowDownToLine className="h-3.5 w-3.5 text-slate-500" />
                        <span>Inventory alerts</span>
                      </div>
                      <input type="checkbox" className="rounded border-slate-300 text-violet-600 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Notification Scheduling */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="text-lg font-medium mb-1 flex items-center">
                  <Zap className="h-4 w-4 mr-1.5 text-amber-500" />
                  Smart Scheduling
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  AI optimizes notification timing based on customer engagement patterns
                </p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                <div className="relative w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 dark:peer-focus:ring-amber-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Quiet hours</label>
                  <div className="flex items-center space-x-1.5">
                    <select className="text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-1">
                      <option>10:00 PM</option>
                      <option>11:00 PM</option>
                      <option>12:00 AM</option>
                    </select>
                    <span className="text-xs text-slate-500">to</span>
                    <select className="text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-1">
                      <option>6:00 AM</option>
                      <option>7:00 AM</option>
                      <option>8:00 AM</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Time zone</label>
                  <select className="text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-1">
                    <option>Customer local time</option>
                    <option>Store time zone</option>
                    <option>UTC</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Frequency cap</label>
                  <select className="text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-1">
                    <option>Max 2 per day</option>
                    <option>Max 5 per week</option>
                    <option>No limit</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                <h4 className="text-sm font-medium mb-3 flex items-center">
                  <Zap className="h-3.5 w-3.5 mr-1.5 text-indigo-500" />
                  AI Insights
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span>Best engagement: Tuesdays & Thursdays</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 rounded-full bg-violet-500"></div>
                    <span>Peak open hours: 10AM - 2PM</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    <span>Most responsive: Cart abandonment alerts</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-600">
                  <div className="text-xs flex items-center justify-between">
                    <span className="text-slate-500">Last analysis:</span>
                    <span className="font-medium">Yesterday</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Custom Notification Templates */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-medium flex items-center">
                <Send className="h-4 w-4 mr-2 text-indigo-500" />
                Notification Templates
              </h3>
              <button className="text-xs bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors flex items-center gap-1">
                <span>+ New Template</span>
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="h-4 w-4 text-slate-500" />
                  <span className="font-medium text-sm">Order Confirmation</span>
                </div>
                <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                  Edit
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="h-4 w-4 text-slate-500" />
                  <span className="font-medium text-sm">Abandoned Cart</span>
                </div>
                <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                  Edit
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="h-4 w-4 text-slate-500" />
                  <span className="font-medium text-sm">Shipping Update</span>
                </div>
                <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                  Edit
                </button>
              </div>
            </div>
          </div>
            
          <div className="flex items-center justify-end pt-4">
            <button className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white px-4 py-2 rounded-lg shadow-sm transition-all">
              Save Notification Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 