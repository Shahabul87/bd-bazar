import { currentUser } from '@/lib/auth';
import { User, UserRole } from "@prisma/client";
import { MainHeader } from '@/app/(homepage)/main-header';
import { Building2, ShoppingBag, Store, Wallet, Heart, Settings, BrainCircuit, LineChart, BarChart3, Package, Clock, UserPlus, Users } from "lucide-react";
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function UserProfilePage() {
  // Get the current user
  const user = await currentUser() as User | undefined;
  
  // Redirect to login if not authenticated
  if (!user) {
    redirect('/login');
  }

  // For now, let's simply check if user is an ADMIN, but this can be expanded later
  // with a more sophisticated role check
  const isSeller = user.role === UserRole.ADMIN;
  
  // Add UI options to create a new store if the user doesn't have one
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <MainHeader />
      
      {/* Main Content */}
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar - Left */}
          <div className="lg:col-span-3 space-y-6">
            {/* User Profile Card */}
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden shadow-lg">
              <div className="p-6 flex flex-col items-center text-center">
                <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                  {user?.image ? (
                    <img 
                      src={user.image} 
                      alt={user.name || 'User'} 
                      className="h-full w-full rounded-full object-cover" 
                    />
                  ) : (
                    <span className="text-2xl font-bold text-white">
                      {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-white mb-1">{user?.name || 'User'}</h2>
                <p className="text-sm text-slate-400 mb-4">{user?.email}</p>
                
                <div className="flex flex-wrap justify-center gap-2 w-full">
                  <span className="px-3 py-1 bg-blue-600/30 text-blue-300 rounded-full text-xs">
                    {isSeller ? 'Seller' : 'Buyer'}
                  </span>
                  {user?.emailVerified && (
                    <span className="px-3 py-1 bg-green-600/30 text-green-300 rounded-full text-xs">
                      Verified
                    </span>
                  )}
                </div>
              </div>
              
              {/* Navigation Links */}
              <div className="border-t border-slate-700/50">
                <nav className="p-4 space-y-2">
                  <Link href="/user/orders" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                    <ShoppingBag className="h-5 w-5 text-blue-400" />
                    <span className="text-sm">Orders</span>
                  </Link>
                  
                  <Link href="/user/wishlist" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                    <Heart className="h-5 w-5 text-pink-400" />
                    <span className="text-sm">Wishlist</span>
                  </Link>
                  
                  <Link href="/user/wallet" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                    <Wallet className="h-5 w-5 text-green-400" />
                    <span className="text-sm">Wallet</span>
                  </Link>
                  
                  {isSeller && (
                    <Link href="/dashboard" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                      <Store className="h-5 w-5 text-purple-400" />
                      <span className="text-sm">Seller Dashboard</span>
                    </Link>
                  )}
                  
                  <Link href="/user/settings" className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                    <Settings className="h-5 w-5 text-slate-400" />
                    <span className="text-sm">Settings</span>
                  </Link>
                </nav>
              </div>
            </div>
            
            {/* AI Assistant Panel */}
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden shadow-lg">
              <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 p-4 border-b border-slate-700/50">
                <div className="flex items-center">
                  <BrainCircuit className="h-5 w-5 text-purple-400 mr-2" />
                  <h3 className="font-bold text-white">AI Shopping Assistant</h3>
                </div>
              </div>
              <div className="p-4 space-y-4">
                <div className="p-3 bg-slate-700/50 rounded-lg text-sm text-slate-300">
                  Hi {user?.name?.split(' ')[0] || 'there'}! How can I help with your shopping today?
                </div>
                
                <div className="pt-2">
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full bg-slate-700/30 border border-slate-600/50 rounded-lg py-2 pl-4 pr-10 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      placeholder="Ask anything about products..."
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
          </div>
          
          {/* Main Content - Right */}
          <div className="lg:col-span-9 space-y-6">
            {/* Mode Switcher (Buyer/Seller) */}
            {isSeller && (
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden shadow-lg p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white">Account Mode</h3>
                  <div className="flex items-center gap-3">
                    <Link 
                      href="/user" 
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                    >
                      Buyer Mode
                    </Link>
                    <Link 
                      href="/dashboard" 
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors"
                    >
                      Seller Mode
                    </Link>
                  </div>
                </div>
              </div>
            )}
            
            {/* Recent Orders */}
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden shadow-lg">
              <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-4 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-blue-400 mr-2" />
                    <h3 className="font-bold text-white">Recent Orders</h3>
                  </div>
                  <Link href="/user/orders" className="text-xs text-blue-400 hover:text-blue-300">
                    View All
                  </Link>
                </div>
              </div>
              
              <div className="p-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs text-slate-500 border-b border-slate-700/50">
                        <th className="pb-2 font-medium">Order #</th>
                        <th className="pb-2 font-medium">Date</th>
                        <th className="pb-2 font-medium">Status</th>
                        <th className="pb-2 font-medium">Total</th>
                        <th className="pb-2 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Example orders - would come from database */}
                      <tr className="border-b border-slate-700/30">
                        <td className="py-3 text-sm text-white">ORD-1234</td>
                        <td className="py-3 text-sm text-slate-400">Jun 15, 2023</td>
                        <td className="py-3 text-sm">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                            Delivered
                          </span>
                        </td>
                        <td className="py-3 text-sm text-white">$120.00</td>
                        <td className="py-3 text-sm">
                          <Link href="/user/orders/ORD-1234" className="text-blue-400 hover:text-blue-300 text-xs">
                            Details
                          </Link>
                        </td>
                      </tr>
                      <tr className="border-b border-slate-700/30">
                        <td className="py-3 text-sm text-white">ORD-1235</td>
                        <td className="py-3 text-sm text-slate-400">Jun 12, 2023</td>
                        <td className="py-3 text-sm">
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                            Shipping
                          </span>
                        </td>
                        <td className="py-3 text-sm text-white">$85.50</td>
                        <td className="py-3 text-sm">
                          <Link href="/user/orders/ORD-1235" className="text-blue-400 hover:text-blue-300 text-xs">
                            Details
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 text-sm text-white">ORD-1236</td>
                        <td className="py-3 text-sm text-slate-400">Jun 10, 2023</td>
                        <td className="py-3 text-sm">
                          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">
                            Processing
                          </span>
                        </td>
                        <td className="py-3 text-sm text-white">$220.00</td>
                        <td className="py-3 text-sm">
                          <Link href="/user/orders/ORD-1236" className="text-blue-400 hover:text-blue-300 text-xs">
                            Details
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Grid of Activity Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden shadow-lg">
                <div className="bg-gradient-to-r from-indigo-600/20 to-blue-600/20 p-4 border-b border-slate-700/50">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-indigo-400 mr-2" />
                    <h3 className="font-bold text-white">Recent Activity</h3>
                  </div>
                </div>
                
                <div className="p-4 space-y-4">
                  <div className="relative pl-6 pb-4 border-l border-slate-700/50">
                    <div className="absolute top-0 left-0 -translate-x-1/2 h-4 w-4 rounded-full bg-green-500 border-2 border-slate-800"></div>
                    <p className="text-sm font-medium text-white">Purchased iPhone 15 Pro</p>
                    <p className="text-xs text-slate-400 mt-1">Order #ORD-1234</p>
                    <p className="text-xs text-slate-500 mt-1">2 days ago</p>
                  </div>
                  
                  <div className="relative pl-6 pb-4 border-l border-slate-700/50">
                    <div className="absolute top-0 left-0 -translate-x-1/2 h-4 w-4 rounded-full bg-blue-500 border-2 border-slate-800"></div>
                    <p className="text-sm font-medium text-white">Added item to wishlist</p>
                    <p className="text-xs text-slate-400 mt-1">Samsung Galaxy Watch</p>
                    <p className="text-xs text-slate-500 mt-1">3 days ago</p>
                  </div>
                  
                  <div className="relative pl-6">
                    <div className="absolute top-0 left-0 -translate-x-1/2 h-4 w-4 rounded-full bg-purple-500 border-2 border-slate-800"></div>
                    <p className="text-sm font-medium text-white">Reviewed product</p>
                    <p className="text-xs text-slate-400 mt-1">Sony WH-1000XM5 Headphones</p>
                    <p className="text-xs text-slate-500 mt-1">1 week ago</p>
                  </div>
                </div>
              </div>
              
              {/* AI Recommendations */}
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden shadow-lg">
                <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-4 border-b border-slate-700/50">
                  <div className="flex items-center">
                    <BrainCircuit className="h-5 w-5 text-purple-400 mr-2" />
                    <h3 className="font-bold text-white">Personalized For You</h3>
                  </div>
                </div>
                
                <div className="p-4 space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm text-white font-medium">Based on your wishlist</h4>
                      <p className="text-xs text-slate-300 mt-1">Samsung Galaxy S24 Ultra is now available with 15% discount</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm text-white font-medium">Trending in your category</h4>
                      <p className="text-xs text-slate-300 mt-1">Popular Smart Home devices are on sale this week</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* If user is NOT a seller, show option to become a seller */}
            {!isSeller && (
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden shadow-lg">
                <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-4 border-b border-slate-700/50">
                  <div className="flex items-center">
                    <Store className="h-5 w-5 text-purple-400 mr-2" />
                    <h3 className="font-bold text-white">Become a Seller</h3>
                  </div>
                </div>
                
                <div className="p-6 text-center">
                  <p className="text-slate-300 mb-6">Start selling your products on our marketplace and grow your business with AI-powered insights.</p>
                  
                  <Link 
                    href="/user/create-store" 
                    className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg text-sm transition-colors"
                  >
                    Create Your Store
                  </Link>
                </div>
              </div>
            )}
            
            {/* If user is a seller, show seller specific information */}
            {isSeller && (
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden shadow-lg">
                <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 p-4 border-b border-slate-700/50">
                  <div className="flex items-center">
                    <Store className="h-5 w-5 text-green-400 mr-2" />
                    <h3 className="font-bold text-white">Your Store Overview</h3>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-slate-700/30 p-4 rounded-lg text-center">
                      <h4 className="text-xs text-slate-400 mb-1">Active Products</h4>
                      <p className="text-2xl font-bold text-white">24</p>
                    </div>
                    
                    <div className="bg-slate-700/30 p-4 rounded-lg text-center">
                      <h4 className="text-xs text-slate-400 mb-1">Pending Orders</h4>
                      <p className="text-2xl font-bold text-white">5</p>
                    </div>
                    
                    <div className="bg-slate-700/30 p-4 rounded-lg text-center">
                      <h4 className="text-xs text-slate-400 mb-1">Revenue (30d)</h4>
                      <p className="text-2xl font-bold text-white">$2,450</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Link 
                      href="/dashboard" 
                      className="inline-block px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
                    >
                      Go to Seller Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 