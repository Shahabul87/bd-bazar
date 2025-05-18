"use client";

import { ShieldCheck } from "lucide-react";

interface PrivacySettingsProps {
  storeId: string;
}

export const PrivacySettings: React.FC<PrivacySettingsProps> = ({ storeId }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <ShieldCheck className="h-5 w-5 mr-2 text-emerald-500" />
              Privacy & Data Settings
            </h2>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-xs font-medium px-3 py-1 rounded-full">
              GDPR Compliant
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Cookie Consent Section */}
            <div className="bg-gradient-to-r from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-700/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg">
                  <ShieldCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2">Cookie Consent Banner</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Customize how your cookie consent banner appears to visitors. This helps with GDPR, CCPA and other privacy regulations.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-12 h-6 flex items-center bg-emerald-300 dark:bg-emerald-700 rounded-full px-1 cursor-pointer">
                        <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-6"></div>
                      </div>
                      <span className="text-sm font-medium">Enabled</span>
                    </div>
                    <button className="text-xs bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 transition-colors">
                      Customize
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Data Collection Section */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-medium mb-4">Customer Data Collection</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm flex items-center">
                      <span>Analytics tracking</span>
                    </label>
                    <div className="w-12 h-6 flex items-center bg-emerald-300 dark:bg-emerald-700 rounded-full px-1 cursor-pointer">
                      <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-6"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm flex items-center">
                      <span>Personalization</span>
                    </label>
                    <div className="w-12 h-6 flex items-center bg-emerald-300 dark:bg-emerald-700 rounded-full px-1 cursor-pointer">
                      <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-6"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm flex items-center">
                      <span>Marketing usage</span>
                    </label>
                    <div className="w-12 h-6 flex items-center bg-slate-200 dark:bg-slate-700 rounded-full px-1 cursor-pointer">
                      <div className="bg-white w-4 h-4 rounded-full shadow-md transform"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-medium mb-4">Data Retention Policy</h3>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm">Customer data retention</label>
                    <select className="w-full text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2">
                      <option>6 months</option>
                      <option>1 year</option>
                      <option>2 years</option>
                      <option>3 years</option>
                      <option>Indefinitely</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm">Order history retention</label>
                    <select className="w-full text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2">
                      <option>1 year</option>
                      <option>2 years</option>
                      <option>5 years</option>
                      <option>7 years</option>
                      <option>Indefinitely</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Privacy Documents Section */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-medium mb-4">Privacy Documents</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-medium">Privacy Policy</span>
                  </div>
                  <button className="text-xs bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded-lg transition-colors">
                    Edit
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-medium">Terms of Service</span>
                  </div>
                  <button className="text-xs bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded-lg transition-colors">
                    Edit
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-medium">Cookie Policy</span>
                  </div>
                  <button className="text-xs bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded-lg transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end pt-4">
              <button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg shadow-sm transition-all">
                Save Privacy Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 