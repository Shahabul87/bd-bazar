"use client";

import { Globe, CheckCircle2, AlertCircle, RefreshCw, Link2, PlusCircle, ArrowUpRight, Shield, HardDrive, History } from "lucide-react";

interface DomainSettingsProps {
  storeId: string;
}

export const DomainSettings: React.FC<DomainSettingsProps> = ({ storeId }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <Globe className="h-5 w-5 mr-2 text-cyan-500" />
              Domain Settings
            </h2>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400 rounded-full text-xs font-medium">
                Pro Feature
              </span>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white text-sm px-3 py-1.5 rounded-lg shadow-sm transition-all flex items-center gap-1.5">
                <PlusCircle className="h-3.5 w-3.5" />
                <span>Add Domain</span>
              </button>
            </div>
          </div>

          {/* Custom domain explainer */}
          <div className="bg-gradient-to-r from-slate-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700 p-6 rounded-xl border border-slate-200 dark:border-slate-700 mb-8">
            <div className="flex gap-5 items-start">
              <div className="bg-white dark:bg-slate-700 p-2.5 rounded-lg shadow-sm">
                <Globe className="h-6 w-6 text-cyan-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-1">Custom Domains</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                  Connect your own domain for a professional branded storefront. Custom domains increase customer trust and conversion rates by up to 25%.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Professional branding</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Increased trust</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Free SSL included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Current domain */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Your Domains</h3>
              <div className="flex items-center gap-2">
                <button className="text-xs bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
                  <RefreshCw className="h-3 w-3" />
                  <span>Refresh Status</span>
                </button>
              </div>
            </div>
            
            {/* Default subdomain */}
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-5 mb-4 overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                    <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <p className="font-medium">{storeId}.mystorefront.ai</p>
                      <span className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs">Default</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Active</span>
                      </span>
                      <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full">
                        <Shield className="h-3 w-3" />
                        <span>SSL Enabled</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <a href={`https://${storeId}.mystorefront.ai`} target="_blank" rel="noopener noreferrer" className="text-xs bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 flex items-center gap-1 transition-colors">
                    <ArrowUpRight className="h-3 w-3" />
                    <span>Visit</span>
                  </a>
                  <button className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 px-2 py-1.5">
                    <span>Copy</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Custom domain */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-cyan-100 dark:bg-cyan-900/30 p-2 rounded-lg">
                    <Globe className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">shop.yourbrand.com</p>
                    <div className="flex items-center gap-1.5">
                      <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-full">
                        <RefreshCw className="h-3 w-3" />
                        <span>Verifying DNS</span>
                      </span>
                      <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full">
                        <Shield className="h-3 w-3" />
                        <span>SSL Pending</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button className="text-xs bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 flex items-center gap-1 transition-colors">
                    <RefreshCw className="h-3 w-3" />
                    <span>Check Status</span>
                  </button>
                  <button className="text-xs text-red-500 hover:text-red-700 dark:hover:text-red-300 px-2 py-1.5">
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* DNS configuration */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium mb-1 flex items-center">
                  <HardDrive className="h-4 w-4 mr-2 text-slate-600 dark:text-slate-400" />
                  DNS Configuration
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Set up these records with your domain provider to connect your domain
                </p>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-700/30 border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left px-4 py-3 text-slate-500 dark:text-slate-400 font-medium">Type</th>
                    <th className="text-left px-4 py-3 text-slate-500 dark:text-slate-400 font-medium">Host</th>
                    <th className="text-left px-4 py-3 text-slate-500 dark:text-slate-400 font-medium">Value</th>
                    <th className="text-right px-4 py-3 text-slate-500 dark:text-slate-400 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <td className="px-4 py-3 font-medium">CNAME</td>
                    <td className="px-4 py-3">shop</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-700 dark:text-slate-300">{storeId}.mystorefront.ai</span>
                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-full ml-auto w-fit">
                        <RefreshCw className="h-3 w-3" />
                        <span>Verifying</span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">TXT</td>
                    <td className="px-4 py-3">@</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-700 dark:text-slate-300">mystorefront-verification={storeId}</span>
                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-full ml-auto w-fit">
                        <AlertCircle className="h-3 w-3" />
                        <span>Not Found</span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-3 mt-6">
              <div className="flex items-start gap-3">
                <div className="text-amber-500 dark:text-amber-400 p-1">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div className="text-sm">
                  <p className="text-slate-700 dark:text-slate-300 mb-1">DNS changes may take 24-48 hours to propagate worldwide.</p>
                  <p className="text-slate-500 dark:text-slate-400">Once verified, we'll automatically provision a free SSL certificate for your domain.</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI SEO Optimization */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-cyan-900/20 rounded-xl border border-blue-100 dark:border-slate-700 p-6 mb-8">
            <div className="flex items-center mb-5">
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium mr-2">AI SEO Optimization</h3>
                  <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs">Premium</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  Our AI automatically optimizes your store's SEO for each domain and location
                </p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                <div className="relative w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white/60 dark:bg-slate-800/60 rounded-lg p-4 border border-blue-100 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-6 w-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-700 dark:text-blue-400 font-medium">1</div>
                  <span className="font-medium">Meta Optimizations</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Dynamic page titles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Smart meta descriptions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Optimized OG images</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/60 dark:bg-slate-800/60 rounded-lg p-4 border border-blue-100 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-6 w-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-700 dark:text-blue-400 font-medium">2</div>
                  <span className="font-medium">Schema Data</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Product schema markup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Business schema markup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Review schema markup</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/60 dark:bg-slate-800/60 rounded-lg p-4 border border-blue-100 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-6 w-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-700 dark:text-blue-400 font-medium">3</div>
                  <span className="font-medium">Sitemap & Robots</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Dynamic sitemap.xml</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Smart robots.txt</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Auto search engine pings</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Domain Activity */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-medium flex items-center">
                <History className="h-4 w-4 mr-2 text-slate-600 dark:text-slate-400" />
                Domain Activity
              </h3>
              <button className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                View Full Log
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 dark:bg-emerald-900/20 p-1.5 rounded-full mt-0.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">SSL certificate issued for {storeId}.mystorefront.ai</p>
                    <span className="text-xs text-slate-500">2 days ago</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Let's Encrypt auto-renewal certificate valid for 90 days</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 dark:bg-blue-900/20 p-1.5 rounded-full mt-0.5">
                  <Globe className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">shop.yourbrand.com domain added</p>
                    <span className="text-xs text-slate-500">2 days ago</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">DNS verification in progress - waiting for CNAME and TXT records</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-cyan-100 dark:bg-cyan-900/20 p-1.5 rounded-full mt-0.5">
                  <Shield className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">AI SEO optimization enabled for all domains</p>
                    <span className="text-xs text-slate-500">3 days ago</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Automatic schema markup and meta optimization enabled</p>
                </div>
              </div>
            </div>
          </div>
            
          <div className="flex items-center justify-end pt-4">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg shadow-sm transition-all">
              Save Domain Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 