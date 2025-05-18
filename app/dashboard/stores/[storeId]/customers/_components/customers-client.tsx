"use client";

import { useState } from "react";
import { columns, customerColumns } from "./customer-column";
import { CustomerWithInsights } from "@/actions/get-store-customers";
import { CustomerInsights } from "./customer-insights";
import { CustomerModal } from "./customer-modal";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, DownloadIcon, Search, FilterIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { downloadToCSV } from "@/lib/utils";

// Define the CustomerColumn interface based on the customer data structure
interface CustomerColumn {
  id: string;
  name: string | null;
  email: string | null;
  phone: string;
  orders: number;
  totalSpent: number;
  lastPurchase?: Date | null;
  createdAt: Date;
  churnRisk: string;
  purchaseTrend: string;
  spendingTier: string;
  loyaltyScore: number;
  aiInsights: any;
}

interface CustomersClientProps {
  data: CustomerWithInsights[];
  storeId?: string; // Make storeId optional
}

export const CustomersClient: React.FC<CustomersClientProps> = ({
  data,
  storeId
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState<"table" | "insights">("table");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerWithInsights | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("all");

  // Filter customers based on search term and filter value
  const filteredCustomers = data.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          customer.email.toLowerCase().includes(searchTerm.toLowerCase());
                          
    if (filterValue === "all") return matchesSearch;
    if (filterValue === "high-risk" && customer.aiInsights.churnRisk === "high") return matchesSearch;
    if (filterValue === "high-value" && customer.aiInsights.spendingTier === "high") return matchesSearch;
    if (filterValue === "new" && customer.aiInsights.purchaseTrend === "new") return matchesSearch;
    if (filterValue === "declining" && customer.aiInsights.purchaseTrend === "decreasing") return matchesSearch;
    
    return false;
  });
  
  // Format data for table
  const formattedCustomers: CustomerColumn[] = filteredCustomers.map((customer) => ({
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone || "N/A",
    orders: customer.orderCount,
    totalSpent: customer.totalSpent,
    lastPurchase: customer.lastPurchaseDate,
    createdAt: customer.createdAt,
    churnRisk: customer.aiInsights.churnRisk,
    purchaseTrend: customer.aiInsights.purchaseTrend,
    spendingTier: customer.aiInsights.spendingTier,
    loyaltyScore: customer.aiInsights.loyaltyScore,
    aiInsights: customer.aiInsights,
  }));
  
  const handleRowAction = (customerId: string) => {
    const customer = data.find(c => c.id === customerId);
    if (customer) {
      setSelectedCustomer(customer);
      setIsModalOpen(true);
    }
  };
  
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };
  
  const exportToCSV = () => {
    const customerData = formattedCustomers.map(customer => ({
      Name: customer.name,
      Email: customer.email,
      Phone: customer.phone,
      "Total Orders": customer.orders,
      "Total Spent": `$${customer.totalSpent.toFixed(2)}`,
      "Last Purchase": customer.lastPurchase ? new Date(customer.lastPurchase).toLocaleDateString() : "Never",
      "Customer Since": new Date(customer.createdAt).toLocaleDateString(),
      "Churn Risk": customer.churnRisk,
      "Purchase Trend": customer.purchaseTrend,
      "Spending Tier": customer.spendingTier,
      "Loyalty Score": customer.loyaltyScore,
    }));
    
    downloadToCSV(customerData, `customers-${new Date().toISOString().split('T')[0]}`);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Customers (${filteredCustomers.length})`}
          description="Manage your store customers and view insights"
          className="text-indigo-800 dark:text-indigo-300"
        />
        <div className="flex items-center gap-x-2">
          <Button onClick={exportToCSV} variant="outline" size="sm" className="ml-auto h-8 gap-1 border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-300 dark:hover:bg-indigo-900/40">
            <DownloadIcon className="h-4 w-4" />
            Export
          </Button>
          <Button 
            onClick={() => {}}
            size="sm" 
            className="h-8 gap-1 bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-800 dark:hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            Add New
          </Button>
        </div>
      </div>
      
      <Separator className="my-4 bg-indigo-200 dark:bg-indigo-800" />
      
      <Tabs 
        defaultValue="table" 
        value={view} 
        onValueChange={(value) => setView(value as "table" | "insights")}
        className="w-full"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
          <TabsList className="bg-indigo-100 dark:bg-indigo-900/50">
            <TabsTrigger 
              value="table"
              className="data-[state=active]:bg-white data-[state=active]:text-indigo-800 dark:data-[state=active]:bg-indigo-800 dark:data-[state=active]:text-white"
            >
              Table View
            </TabsTrigger>
            <TabsTrigger 
              value="insights"
              className="data-[state=active]:bg-white data-[state=active]:text-indigo-800 dark:data-[state=active]:bg-indigo-800 dark:data-[state=active]:text-white"
            >
              Customer Insights
            </TabsTrigger>
          </TabsList>
          
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-indigo-400 dark:text-indigo-500" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 border-indigo-200 focus-visible:ring-indigo-500 dark:border-indigo-800 dark:bg-indigo-950/50 dark:placeholder:text-indigo-400"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <FilterIcon className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
              <Select 
                value={filterValue} 
                onValueChange={setFilterValue}
              >
                <SelectTrigger className="w-full sm:w-[180px] border-indigo-200 focus:ring-indigo-500 dark:border-indigo-800 dark:bg-indigo-950/50">
                  <SelectValue placeholder="Filter customers" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-800">
                  <SelectItem value="all">All Customers</SelectItem>
                  <SelectItem value="high-risk">High Churn Risk</SelectItem>
                  <SelectItem value="high-value">High Value</SelectItem>
                  <SelectItem value="new">New Customers</SelectItem>
                  <SelectItem value="declining">Declining Activity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <TabsContent value="table" className="space-y-4 pt-2">
          <DataTable 
            columns={columns} 
            data={formattedCustomers} 
            onRowAction={handleRowAction}
            searchKey="name"
            searchPlaceholder="Filter customers..."
            showSearch={false} // We have a custom search field
            className="bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900 rounded-lg overflow-hidden"
          />
        </TabsContent>
        
        <TabsContent value="insights" className="pt-2">
          <CustomerInsights customers={data} />
        </TabsContent>
      </Tabs>
      
      <CustomerModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose} 
        customer={selectedCustomer} 
      />
    </>
  );
}; 