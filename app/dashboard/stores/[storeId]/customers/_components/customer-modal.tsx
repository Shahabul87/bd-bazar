"use client";

import { CustomerWithInsights } from "@/actions/get-store-customers";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ShoppingBag, 
  DollarSign, 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  BadgeAlert,
  BadgeCheck,
  Star,
  Sparkles,
  Clock,
  Tag
} from "lucide-react";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: CustomerWithInsights | null;
}

export const CustomerModal = ({
  isOpen,
  onClose,
  customer
}: CustomerModalProps) => {
  if (!customer) return null;
  
  const formatDate = (date: Date) => {
    try {
      return format(new Date(date), "MMMM d, yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };
  
  // Get human-readable risk level
  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "high":
        return <Badge variant="destructive" className="ml-2">High Risk</Badge>;
      case "medium":
        return <Badge variant="warning" className="ml-2 bg-amber-500">Medium Risk</Badge>;
      case "low":
        return <Badge variant="success" className="ml-2 bg-green-500">Low Risk</Badge>;
      default:
        return null;
    }
  };
  
  // Get human-readable trend
  const getTrendBadge = (trend: string) => {
    switch (trend) {
      case "increasing":
        return (
          <Badge variant="success" className="ml-2 bg-green-500 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            Increasing
          </Badge>
        );
      case "stable":
        return (
          <Badge variant="secondary" className="ml-2 flex items-center">
            <Activity className="h-3 w-3 mr-1" />
            Stable
          </Badge>
        );
      case "decreasing":
        return (
          <Badge variant="destructive" className="ml-2 flex items-center">
            <TrendingDown className="h-3 w-3 mr-1" />
            Decreasing
          </Badge>
        );
      case "new":
        return (
          <Badge variant="default" className="ml-2 bg-purple-500 flex items-center">
            <Sparkles className="h-3 w-3 mr-1" />
            New
          </Badge>
        );
      default:
        return null;
    }
  };
  
  // Get spending tier badge
  const getSpendingBadge = (tier: string) => {
    switch (tier) {
      case "high":
        return (
          <Badge variant="default" className="ml-2 bg-indigo-500 flex items-center">
            <Star className="h-3 w-3 mr-1" />
            High Spender
          </Badge>
        );
      case "medium":
        return (
          <Badge variant="default" className="ml-2 bg-purple-500 flex items-center">
            <DollarSign className="h-3 w-3 mr-1" />
            Medium Spender
          </Badge>
        );
      case "low":
        return (
          <Badge variant="secondary" className="ml-2 flex items-center">
            <Tag className="h-3 w-3 mr-1" />
            Low Spender
          </Badge>
        );
      default:
        return null;
    }
  };
  
  // Get loyalty score color
  const getLoyaltyColor = (score: number) => {
    if (score >= 8) return "text-green-500";
    if (score >= 5) return "text-amber-500";
    return "text-red-500";
  };
  
  // Generate recommendations
  const getRecommendation = () => {
    if (customer.aiInsights.churnRisk === "high") {
      return "Send a personalized email with a special discount on their preferred categories.";
    } else if (customer.aiInsights.purchaseTrend === "decreasing") {
      return "Offer a loyalty program bonus and showcase new products in their favorite categories.";
    } else if (customer.aiInsights.spendingTier === "high") {
      return "Send early access invitations to new collections and exclusive VIP offers.";
    } else {
      return "Include in general marketing campaigns with focus on their preferred categories.";
    }
  };

  return (
    <Modal
      title="Customer Details"
      description="View detailed information about this customer"
      isOpen={isOpen}
      onClose={onClose}
      className="overflow-hidden border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-white to-indigo-50 dark:from-gray-900 dark:to-indigo-950"
    >
      <div className="pb-6">
        {/* Customer basic info header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-semibold text-indigo-900 dark:text-indigo-300">{customer.name}</h2>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
              {getRiskBadge(customer.aiInsights.churnRisk)}
              {getTrendBadge(customer.aiInsights.purchaseTrend)}
              {getSpendingBadge(customer.aiInsights.spendingTier)}
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm text-indigo-800 dark:text-indigo-300">{customer.email}</span>
              </div>
              
              {customer.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm text-indigo-800 dark:text-indigo-300">{customer.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <Separator className="my-6 bg-indigo-200 dark:bg-indigo-800" />
        
        {/* Customer Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Customer Information</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm text-gray-700">Customer Since</span>
                  </div>
                  <span className="text-sm">{formatDate(customer.createdAt)}</span>
                </div>
                
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm text-gray-700">Total Orders</span>
                  </div>
                  <span className="text-sm">{customer.orderCount}</span>
                </div>
                
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm text-gray-700">Total Spent</span>
                  </div>
                  <span className="text-sm font-medium">${customer.totalSpent.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm text-gray-700">Last Purchase</span>
                  </div>
                  <span className="text-sm">{customer.lastOrderDate ? formatDate(customer.lastOrderDate) : 'Never'}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Loyalty & Engagement
              </h3>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-700">Loyalty Score</span>
                <div className="flex items-center">
                  <div className="h-6 px-2 rounded bg-gray-100 flex items-center">
                    <span className={`font-medium ${getLoyaltyColor(customer.aiInsights.loyaltyScore)}`}>
                      {customer.aiInsights.loyaltyScore}/10
                    </span>
                  </div>
                  {customer.aiInsights.loyaltyScore >= 8 ? (
                    <BadgeCheck className="ml-1.5 w-4 h-4 text-green-500" />
                  ) : (
                    customer.aiInsights.loyaltyScore <= 4 ? (
                      <BadgeAlert className="ml-1.5 w-4 h-4 text-red-500" />
                    ) : null
                  )}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">Average Order Value</span>
                  </div>
                  <span className="text-sm font-medium">
                    ${customer.orderCount > 0 ? (customer.totalSpent / customer.orderCount).toFixed(2) : '0.00'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                <span className="flex items-center">
                  <Brain className="w-4 h-4 mr-2 text-purple-500" />
                  AI Insights
                </span>
              </h3>
              
              <Card className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50">
                <div className="space-y-3">
                  {/* Preferred Categories */}
                  <div>
                    <h4 className="text-xs text-gray-500 uppercase">Preferred Categories</h4>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {customer.aiInsights.preferredCategories.map((category, index) => (
                        <Badge key={index} variant="outline" className="bg-white">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Purchase Behavior */}
                  <div>
                    <h4 className="text-xs text-gray-500 uppercase">Purchase Behavior</h4>
                    <p className="text-sm mt-1.5">
                      {`${customer.name || 'Customer'} typically shops ${
                        customer.aiInsights.spendingTier === "high" ? "frequently" : 
                        customer.aiInsights.spendingTier === "medium" ? "regularly" : "occasionally"
                      } with ${
                        customer.aiInsights.purchaseTrend === "increasing" ? "increasing frequency" : 
                        customer.aiInsights.purchaseTrend === "decreasing" ? "decreasing frequency" : 
                        customer.aiInsights.purchaseTrend === "new" ? "as a new customer" : "stable patterns"
                      }.`}
                    </p>
                  </div>
                  
                  {/* AI Recommendation */}
                  <div className="mt-4 p-3 border border-dashed border-purple-200 rounded-lg bg-white">
                    <h4 className="text-xs font-medium text-purple-800 mb-1 flex items-center">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Recommended Action
                    </h4>
                    <p className="text-sm text-gray-700">
                      {getRecommendation()}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} className="border-indigo-200 hover:bg-indigo-50 dark:border-indigo-800 dark:hover:bg-indigo-950">
            Close
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-800 dark:hover:bg-indigo-700">
            Contact Customer
          </Button>
        </div>
      </div>
    </Modal>
  );
}; 