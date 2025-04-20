"use client";

import { Package, TrendingUp, TrendingDown, MoreHorizontal, Star } from 'lucide-react';

export function ProductPerformance() {
  // In a real app, this would come from an API
  const products = [
    {
      id: 1,
      name: 'Wireless Bluetooth Earbuds',
      category: 'Electronics',
      image: '/products/earbuds.jpg',
      price: '$89.99',
      sales: 234,
      change: 12.5,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Smart Watch',
      category: 'Electronics',
      image: '/products/smartwatch.jpg',
      price: '$149.99',
      sales: 186,
      change: 8.2,
      rating: 4.5
    },
    {
      id: 3,
      name: 'Premium Leather Wallet',
      category: 'Accessories',
      image: '/products/wallet.jpg',
      price: '$42.50',
      sales: 175,
      change: -3.6,
      rating: 4.6
    },
    {
      id: 4,
      name: 'Portable Phone Charger',
      category: 'Electronics',
      image: '/products/charger.jpg',
      price: '$35.99',
      sales: 162,
      change: 5.8,
      rating: 4.3
    },
    {
      id: 5,
      name: 'Men\'s Running Shoes',
      category: 'Footwear',
      image: '/products/shoes.jpg',
      price: '$79.99',
      sales: 157,
      change: -2.4,
      rating: 4.7
    }
  ];
  
  return (
    <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden shadow-lg">
      <div className="border-b border-slate-700/50 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
            <Package className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-medium text-white">Top Selling Products</h3>
        </div>
        
        <button className="text-gray-400 hover:text-white">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">PRODUCT</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">PRICE</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">SALES</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">RATING</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">CHANGE</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr 
                key={product.id} 
                className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-slate-700/50 flex items-center justify-center flex-shrink-0">
                      <Package className="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">{product.name}</div>
                      <div className="text-xs text-gray-400">{product.category}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 font-medium text-white">
                  {product.price}
                </td>
                <td className="py-3 px-4 text-gray-300">
                  {product.sales} units
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    <span className="text-white font-medium">{product.rating}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    {product.change >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span 
                      className={`text-sm font-medium ${
                        product.change >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {product.change >= 0 ? '+' : ''}{product.change}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 