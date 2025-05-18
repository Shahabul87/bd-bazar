"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, Heart, ThumbsUp, ThumbsDown, BarChart3, 
  UserPlus, LineChart, Filter, Download, Globe,
  UserCheck, Trophy, Info
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CustomerAnalyticsProps {
  storeId: string;
}

// Customer Segment Card Component
const SegmentCard = ({ segment }: { segment: any }) => {
  return (
    <Card className="border border-slate-700 bg-slate-800/90 shadow-md">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg text-white">{segment.name}</h3>
            <p className="text-sm text-slate-400 mt-1">{segment.customers} customers</p>
          </div>
          <Badge variant={segment.trend > 0 ? "success" : "default"} className="bg-slate-700 text-slate-300">
            {segment.trend > 0 ? "+" : ""}{segment.trend}%
          </Badge>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1 text-slate-400">
            <span>Customer Share</span>
            <span>{segment.percentage}%</span>
          </div>
          <Progress value={segment.percentage} className="h-2 bg-slate-700" indicatorColor="bg-blue-500" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-sm text-slate-400">Avg. Value</p>
            <p className="text-xl font-bold text-white">${segment.avgValue}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Retention</p>
            <p className="text-xl font-bold text-white">{segment.retention}%</p>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2 text-white">Top Product Categories</h4>
          <div className="space-y-1.5">
            {segment.categories.map((category: any, idx: number) => (
              <div key={idx} className="flex justify-between text-sm text-slate-400">
                <span>{category.name}</span>
                <span>{category.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Sentiment Analysis Component
const SentimentAnalysis = ({ sentimentData }: { sentimentData: any }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-slate-700 bg-slate-800/90 shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Overall Satisfaction</p>
                <div className="flex items-baseline">
                  <h3 className="text-2xl font-bold text-white">{sentimentData.satisfaction}/5</h3>
                  <p className="text-sm ml-2 text-green-500">
                    {sentimentData.satisfactionTrend > 0 ? "+" : ""}{sentimentData.satisfactionTrend}%
                  </p>
                </div>
              </div>
              <div className="p-2 bg-slate-700 rounded-full">
                <Heart className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-slate-700 bg-slate-800/90 shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Positive Reviews</p>
                <div className="flex items-baseline">
                  <h3 className="text-2xl font-bold text-white">{sentimentData.positivePercentage}%</h3>
                  <p className="text-sm ml-2 text-green-500">({sentimentData.positiveCount})</p>
                </div>
              </div>
              <div className="p-2 bg-slate-700 rounded-full">
                <ThumbsUp className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-slate-700 bg-slate-800/90 shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Negative Reviews</p>
                <div className="flex items-baseline">
                  <h3 className="text-2xl font-bold text-white">{sentimentData.negativePercentage}%</h3>
                  <p className="text-sm ml-2 text-rose-500">({sentimentData.negativeCount})</p>
                </div>
              </div>
              <div className="p-2 bg-slate-700 rounded-full">
                <ThumbsDown className="h-6 w-6 text-rose-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border border-slate-700 bg-slate-800/90 shadow-md">
        <CardHeader>
          <CardTitle className="text-white">Sentiment Trends</CardTitle>
          <CardDescription className="text-slate-400">Customer feedback analysis over time</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Sentiment chart placeholder - would use a real chart library in production */}
          <div className="h-64 border-l border-b border-slate-600 bg-slate-800/50 rounded-md relative">
            <div className="absolute -left-10 top-0 h-full flex flex-col justify-between py-4 text-xs text-slate-400">
              <div>100%</div>
              <div>75%</div>
              <div>50%</div>
              <div>25%</div>
              <div>0%</div>
            </div>
            
            <div className="absolute bottom-[-20px] left-0 w-full flex justify-between text-xs text-slate-400 px-4">
              <div>Jan</div>
              <div>Feb</div>
              <div>Mar</div>
              <div>Apr</div>
              <div>May</div>
              <div>Jun</div>
            </div>
            
            {/* Grid lines */}
            <div className="absolute inset-0">
              <div className="grid grid-cols-6 h-full">
                {Array.from({length: 6}).map((_, i) => (
                  <div key={i} className="border-r border-slate-700/50 h-full"></div>
                ))}
              </div>
              <div className="grid grid-rows-4 w-full">
                {Array.from({length: 4}).map((_, i) => (
                  <div key={i} className="border-t border-slate-700/50 w-full"></div>
                ))}
              </div>
            </div>
            
            <svg className="w-full h-full px-4 pt-4 pb-8" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Positive sentiment line */}
              <path 
                d="M0,40 L20,35 L40,30 L60,25 L80,20 L100,15" 
                stroke="#10b981" 
                strokeWidth="2" 
                fill="none" 
                strokeLinecap="round"
              />
              {/* Negative sentiment line */}
              <path 
                d="M0,60 L20,62 L40,58 L60,55 L80,50 L100,45" 
                stroke="#f43f5e" 
                strokeWidth="2" 
                fill="none" 
                strokeLinecap="round"
              />
              {/* Neutral sentiment line */}
              <path 
                d="M0,50 L20,52 L40,48 L60,45 L80,40 L100,35" 
                stroke="#6366f1" 
                strokeWidth="2" 
                fill="none" 
                strokeLinecap="round"
              />
            </svg>
            
            {/* Chart legend */}
            <div className="absolute bottom-[-50px] flex justify-center space-x-6 w-full">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-slate-300">Positive</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-slate-300">Neutral</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-rose-500 mr-2"></div>
                <span className="text-sm text-slate-300">Negative</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border border-slate-700 bg-slate-800/90 shadow-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Top Customer Feedback</CardTitle>
              <CardDescription className="text-slate-400">Recent reviews and comments</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="bg-slate-700 border-slate-600 hover:bg-slate-600 text-slate-300">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sentimentData.reviews.map((review: any, index: number) => (
              <div 
                key={index} 
                className="p-4 rounded-md bg-slate-700/50 border border-slate-600"
              >
                <div className="flex items-start">
                  <div className={`p-2 rounded-full ${
                    review.rating >= 4 
                      ? "bg-slate-600 text-green-400" 
                      : review.rating <= 2 
                        ? "bg-slate-600 text-rose-400"
                        : "bg-slate-600 text-blue-400"
                  } mr-3`}>
                    {review.rating >= 4 
                      ? <ThumbsUp className="h-4 w-4" /> 
                      : review.rating <= 2 
                        ? <ThumbsDown className="h-4 w-4" />
                        : <Info className="h-4 w-4" />
                    }
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium text-white">{review.name}</h4>
                      <span className="mx-2 text-slate-500">•</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i} 
                            className={`text-xs ${i < review.rating ? "text-amber-400" : "text-slate-600"}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 mt-1">{review.comment}</p>
                    <div className="flex items-center mt-2 text-xs text-slate-500">
                      <span>{review.date}</span>
                      <span className="mx-2">•</span>
                      <span>{review.product}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Geographic Distribution
const GeographicDistribution = ({ geoData }: { geoData: any }) => {
  return (
    <div className="space-y-6">
      <Card className="border border-slate-700 bg-slate-800/90 shadow-md">
        <CardHeader>
          <CardTitle className="text-white">Customer Locations</CardTitle>
          <CardDescription className="text-slate-400">Geographic distribution of your customer base</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[280px] bg-slate-700/50 rounded-lg border border-slate-600 p-4 flex items-center justify-center mb-6">
            <div className="text-center text-slate-400">
              <Globe className="h-12 w-12 mx-auto opacity-50 mb-2" />
              <p>Interactive map visualization would be displayed here</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {geoData.regions.map(region => (
              <div key={region.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-white">{region.name}</h4>
                  <span className="text-sm text-slate-400">{region.percentage}%</span>
                </div>
                <Progress value={region.percentage} className="h-2 bg-slate-700" indicatorColor="bg-blue-500" />
                <div className="flex justify-between text-sm text-slate-400">
                  <span>{region.customers.toLocaleString()} customers</span>
                  <span>${region.revenue.toLocaleString()} revenue</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-slate-700 bg-slate-800/90 shadow-md">
          <CardHeader>
            <CardTitle className="text-white">Acquisition Channels</CardTitle>
            <CardDescription className="text-slate-400">Where your customers are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {geoData.channels.map(channel => (
                <div key={channel.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-slate-600 mr-2"></div>
                      <h4 className="text-sm font-medium text-white">{channel.name}</h4>
                    </div>
                    <span className="text-sm text-slate-400">{channel.percentage}%</span>
                  </div>
                  <Progress value={channel.percentage} className="h-2 bg-slate-700" indicatorColor="bg-blue-500" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-slate-700 bg-slate-800/90 shadow-md">
          <CardHeader>
            <CardTitle className="text-white">Language Distribution</CardTitle>
            <CardDescription className="text-slate-400">Most used languages by your customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {geoData.languages.map(language => (
                <div key={language.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-slate-600 mr-2"></div>
                      <h4 className="text-sm font-medium text-white">{language.name}</h4>
                    </div>
                    <span className="text-sm text-slate-400">{language.percentage}%</span>
                  </div>
                  <Progress value={language.percentage} className="h-2 bg-slate-700" indicatorColor="bg-blue-500" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export function CustomerAnalytics({ storeId }: CustomerAnalyticsProps) {
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("segments");
  
  useEffect(() => {
    // In a real app, this would fetch from your API
    // Simulating API data for demo purposes
    const mockData = {
      segments: [
        {
          id: 1,
          name: "High Value Customers",
          customers: 234,
          percentage: 24,
          avgValue: 178.45,
          retention: 82,
          trend: 5.2,
          categories: [
            { name: "Electronics", percentage: 42 },
            { name: "Home Goods", percentage: 28 },
            { name: "Apparel", percentage: 18 }
          ]
        },
        {
          id: 2,
          name: "Regular Shoppers",
          customers: 586,
          percentage: 62,
          avgValue: 84.32,
          retention: 58,
          trend: 1.8,
          categories: [
            { name: "Apparel", percentage: 35 },
            { name: "Accessories", percentage: 30 },
            { name: "Electronics", percentage: 22 }
          ]
        },
        {
          id: 3,
          name: "New Customers",
          customers: 142,
          percentage: 14,
          avgValue: 45.18,
          retention: 32,
          trend: 8.7,
          categories: [
            { name: "Accessories", percentage: 45 },
            { name: "Apparel", percentage: 32 },
            { name: "Beauty", percentage: 15 }
          ]
        }
      ],
      sentimentData: {
        satisfaction: 4.2,
        satisfactionTrend: 0.3,
        positivePercentage: 68,
        positiveCount: 482,
        negativePercentage: 12,
        negativeCount: 85,
        reviews: [
          {
            name: "Sarah Johnson",
            rating: 5,
            comment: "Love my new wireless headphones! The sound quality is amazing and the battery life exceeds expectations.",
            date: "2 days ago",
            product: "Premium Wireless Headphones"
          },
          {
            name: "Michael Chen",
            rating: 4,
            comment: "Great product, very happy with the purchase. Fast shipping too!",
            date: "1 week ago",
            product: "Ultra HD Monitor"
          },
          {
            name: "Alex Rodriguez",
            rating: 2,
            comment: "Disappointed with the build quality. Feels cheap for the price point.",
            date: "3 days ago",
            product: "Portable SSD Drive"
          },
          {
            name: "Emily Wilson",
            rating: 5,
            comment: "Incredible value for money. Would definitely recommend to friends and family.",
            date: "5 days ago",
            product: "Smart Watch Pro"
          }
        ]
      },
      geoData: {
        regions: [
          { id: 1, name: "North America", percentage: 42, customers: 412, revenue: 28540 },
          { id: 2, name: "Europe", percentage: 28, customers: 275, revenue: 18920 },
          { id: 3, name: "Asia Pacific", percentage: 18, customers: 176, revenue: 12240 },
          { id: 4, name: "Rest of World", percentage: 12, customers: 118, revenue: 8160 }
        ],
        channels: [
          { id: 1, name: "Organic Search", percentage: 38 },
          { id: 2, name: "Social Media", percentage: 24 },
          { id: 3, name: "Referrals", percentage: 18 },
          { id: 4, name: "Direct Traffic", percentage: 12 },
          { id: 5, name: "Email Marketing", percentage: 8 }
        ],
        languages: [
          { id: 1, name: "English", percentage: 65 },
          { id: 2, name: "Spanish", percentage: 15 },
          { id: 3, name: "French", percentage: 8 },
          { id: 4, name: "German", percentage: 6 },
          { id: 5, name: "Others", percentage: 6 }
        ]
      }
    };
    
    setData(mockData);
  }, []);
  
  if (!data) return <div className="text-slate-300 animate-pulse">Loading customer data...</div>;
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-slate-800/80 border border-slate-700">
          <TabsTrigger value="segments" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
            <Users className="h-4 w-4 mr-2" />
            Customer Segments
          </TabsTrigger>
          <TabsTrigger value="sentiment" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
            <Heart className="h-4 w-4 mr-2" />
            Sentiment Analysis
          </TabsTrigger>
          <TabsTrigger value="geography" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
            <Globe className="h-4 w-4 mr-2" />
            Geographic Distribution
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="segments" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.segments.map((segment: any) => (
              <SegmentCard key={segment.id} segment={segment} />
            ))}
          </div>
          
          <Card className="mt-6 border border-slate-700 bg-slate-800/90 shadow-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-white">Customer Lifecycle</CardTitle>
                  <CardDescription className="text-slate-400">Distribution across customer stages</CardDescription>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="bg-slate-700 border-slate-600 hover:bg-slate-600">
                        <Info className="h-4 w-4 text-slate-300" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-800 border-slate-700 text-slate-300">
                      <p className="max-w-xs">
                        The customer lifecycle shows the number of customers in each stage of their journey with your store.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-slate-700 mr-2">
                      <UserPlus className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">New</h4>
                      <p className="text-sm text-slate-400">142 customers</p>
                    </div>
                  </div>
                  <Progress value={15} className="h-2 bg-slate-700" indicatorColor="bg-blue-500" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-slate-700 mr-2">
                      <Users className="h-4 w-4 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Active</h4>
                      <p className="text-sm text-slate-400">428 customers</p>
                    </div>
                  </div>
                  <Progress value={45} className="h-2 bg-slate-700" indicatorColor="bg-purple-500" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-slate-700 mr-2">
                      <UserCheck className="h-4 w-4 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Loyal</h4>
                      <p className="text-sm text-slate-400">234 customers</p>
                    </div>
                  </div>
                  <Progress value={25} className="h-2 bg-slate-700" indicatorColor="bg-green-500" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-slate-700 mr-2">
                      <Trophy className="h-4 w-4 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">VIP</h4>
                      <p className="text-sm text-slate-400">142 customers</p>
                    </div>
                  </div>
                  <Progress value={15} className="h-2 bg-slate-700" indicatorColor="bg-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sentiment" className="pt-6">
          <SentimentAnalysis sentimentData={data.sentimentData} />
        </TabsContent>
        
        <TabsContent value="geography" className="pt-6">
          <GeographicDistribution geoData={data.geoData} />
        </TabsContent>
      </Tabs>
    </div>
  );
} 