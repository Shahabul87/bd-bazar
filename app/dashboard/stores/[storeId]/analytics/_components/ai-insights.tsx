"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Lightbulb, TrendingUp, BarChart3, Users, ShoppingBag, AlertCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AiInsightsProps {
  storeId: string;
}

export function AiInsights({ storeId }: AiInsightsProps) {
  const [loading, setLoading] = useState(true);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return (
      <Card className="w-full min-h-[400px] border border-slate-700 bg-slate-800/90 backdrop-blur-sm">
        <CardContent className="flex justify-center items-center h-full min-h-[400px]">
          <p className="text-slate-400 animate-pulse">Loading AI insights...</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full border border-slate-700 bg-slate-800/90 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-purple-400" />
            AI-Powered Business Insights
          </CardTitle>
          <Badge variant="outline" className="bg-slate-700 text-slate-300 border-slate-600">
            Weekly Update
          </Badge>
        </div>
        <CardDescription className="text-slate-400">
          Smart analysis and recommendations based on your store's performance
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Tabs defaultValue="recommendations" className="w-full">
          <TabsList className="bg-slate-800/80 border border-slate-700 mb-4">
            <TabsTrigger 
              value="recommendations" 
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
            >
              Recommendations
            </TabsTrigger>
            <TabsTrigger 
              value="trends"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
            >
              Market Trends
            </TabsTrigger>
            <TabsTrigger 
              value="risks"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-white"
            >
              Risk Analysis
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommendations" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InsightCard 
                icon={<TrendingUp className="h-5 w-5 text-green-400" />}
                title="Optimize Inventory Levels"
                description="Your 'Summer Collection' inventory is selling faster than expected. Consider increasing stock by 15% to meet projected demand."
                category="Inventory"
                impact="High"
                impactColor="green"
              />
              
              <InsightCard 
                icon={<BarChart3 className="h-5 w-5 text-blue-400" />}
                title="Pricing Strategy Adjustment"
                description="Products in the $50-75 price range are showing higher conversion rates. Consider adjusting premium product pricing to this sweet spot."
                category="Pricing"
                impact="Medium"
                impactColor="blue"
              />
              
              <InsightCard 
                icon={<Users className="h-5 w-5 text-purple-400" />}
                title="Customer Retention Focus"
                description="80% of your revenue comes from repeat customers. Implementing a loyalty program could increase retention by an estimated 12%."
                category="Customers"
                impact="High"
                impactColor="purple"
              />
              
              <InsightCard 
                icon={<ShoppingBag className="h-5 w-5 text-indigo-400" />}
                title="Product Bundle Opportunity"
                description="Customers who purchase 'Premium Headphones' often buy accessories separately. Creating a bundle could increase average order value by 22%."
                category="Products"
                impact="Medium"
                impactColor="indigo"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InsightCard 
                icon={<TrendingUp className="h-5 w-5 text-green-400" />}
                title="Sustainable Products Demand"
                description="Market analysis shows a 28% increase in eco-friendly product searches. Your sustainable product line is positioned to capitalize on this trend."
                category="Market"
                impact="Rising"
                impactColor="green"
              />
              
              <InsightCard 
                icon={<TrendingUp className="h-5 w-5 text-amber-400" />}
                title="Mobile Shopping Growth"
                description="70% of your customers now shop on mobile devices, up 15% from last quarter. Prioritize mobile experience optimization."
                category="Technology"
                impact="Rising"
                impactColor="amber"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="risks" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InsightCard 
                icon={<AlertCircle className="h-5 w-5 text-rose-400" />}
                title="Supply Chain Vulnerability"
                description="Your main supplier for electronic components is experiencing delays. Consider diversifying suppliers to mitigate future disruptions."
                category="Supply Chain"
                impact="High Risk"
                impactColor="rose"
              />
              
              <InsightCard 
                icon={<AlertCircle className="h-5 w-5 text-orange-400" />}
                title="Seasonal Inventory Risk"
                description="Winter collection sell-through is slower than projected. Consider promotional strategies to reduce excess inventory before season end."
                category="Inventory"
                impact="Medium Risk"
                impactColor="orange"
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t border-slate-700 px-6 py-4">
        <p className="text-sm text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1 bg-slate-700 border-slate-600 hover:bg-slate-600 text-slate-300">
                <ExternalLink className="h-4 w-4" />
                View Full Report
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-slate-800 border-slate-700 text-slate-300">
              <p>View comprehensive AI analysis report</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}

// Helper component for consistent insight cards
interface InsightCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: string;
  impact: string;
  impactColor: "rose" | "orange" | "amber" | "green" | "blue" | "indigo" | "purple";
}

function InsightCard({ icon, title, description, category, impact, impactColor }: InsightCardProps) {
  const getBadgeClasses = () => {
    const baseClasses = "text-xs font-medium px-2 py-1 rounded-full";
    
    switch (impactColor) {
      case "rose":
        return `${baseClasses} bg-slate-700 text-rose-400 border border-slate-600`;
      case "orange":
        return `${baseClasses} bg-slate-700 text-orange-400 border border-slate-600`;
      case "amber":
        return `${baseClasses} bg-slate-700 text-amber-400 border border-slate-600`;
      case "green":
        return `${baseClasses} bg-slate-700 text-green-400 border border-slate-600`;
      case "blue":
        return `${baseClasses} bg-slate-700 text-blue-400 border border-slate-600`;
      case "indigo":
        return `${baseClasses} bg-slate-700 text-indigo-400 border border-slate-600`;
      case "purple":
        return `${baseClasses} bg-slate-700 text-purple-400 border border-slate-600`;
      default:
        return `${baseClasses} bg-slate-700 text-slate-300 border border-slate-600`;
    }
  };
  
  return (
    <Card className="overflow-hidden border border-slate-700 bg-slate-800/80">
      <CardHeader className="bg-slate-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle className="text-base font-semibold text-white">{title}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-slate-700 border-slate-600 text-slate-300">{category}</Badge>
            <span className={getBadgeClasses()}>{impact}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-slate-300">{description}</p>
      </CardContent>
      <CardFooter className="bg-slate-800 p-4 flex justify-end">
        <Button variant="link" className="text-blue-400 p-0 h-auto text-sm hover:text-blue-300">
          Implement suggestion
        </Button>
      </CardFooter>
    </Card>
  );
} 