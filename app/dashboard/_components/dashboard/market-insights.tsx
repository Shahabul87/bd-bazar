"use client";

import { Globe, ArrowUpRight, ExternalLink } from 'lucide-react';

export function MarketInsights() {
  // In a real app, this would come from an API
  const insights = [
    {
      title: "E-commerce Sales Expected to Grow 18% in Bangladesh",
      source: "DigitalCommerce Report",
      date: "Today",
      url: "#",
      relevance: "High"
    },
    {
      title: "Mobile Payments Adoption Surges Among Gen Z Consumers",
      source: "FinTech Weekly",
      date: "Yesterday",
      url: "#",
      relevance: "Medium"
    },
    {
      title: "New Import Regulations for Electronics Coming in Q2",
      source: "Trade Journal",
      date: "2 days ago",
      url: "#",
      relevance: "High"
    },
    {
      title: "Fashion Industry Sees Shift Toward Sustainable Products",
      source: "Retail Insights",
      date: "3 days ago",
      url: "#",
      relevance: "Low"
    }
  ];
  
  const relevanceStyles = {
    High: "bg-red-500/10 text-red-500 border-red-500/20",
    Medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Low: "bg-blue-500/10 text-blue-500 border-blue-500/20"
  };
  
  return (
    <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden shadow-lg">
      <div className="border-b border-slate-700/50 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
            <Globe className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-medium text-white">Market Insights</h3>
        </div>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div 
              key={index} 
              className="border border-slate-700/50 rounded-lg p-3 hover:bg-slate-700/20 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-medium text-white">{insight.title}</h4>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${relevanceStyles[insight.relevance as keyof typeof relevanceStyles]}`}>
                  {insight.relevance}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <div className="text-gray-400">
                  <span className="inline-block mr-2">{insight.source}</span>
                  <span className="text-gray-500">{insight.date}</span>
                </div>
                <a href={insight.url} className="flex items-center text-blue-400 hover:text-blue-300">
                  Read <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-700/50 text-center">
          <button className="text-sm text-blue-400 hover:text-blue-300 font-medium flex items-center justify-center mx-auto">
            View All Market Insights <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
} 