"use client";

import { useState } from "react";
import { columns, ShippingItem } from "./shipping-column";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Plus, DownloadIcon, Search, FilterIcon, RefreshCw } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { downloadToCSV } from "@/lib/utils";

interface ShippingClientProps {
  data: ShippingItem[];
  storeId: string;
}

export const ShippingClient: React.FC<ShippingClientProps> = ({
  data,
  storeId
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Filter shipping items based on search term and filter value
  const filteredShipping = data.filter(item => {
    const matchesSearch = 
      searchTerm === "" || 
      item.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase());
                          
    if (filterValue === "all") return matchesSearch;
    if (filterValue === "pending" && item.status === "pending") return matchesSearch;
    if (filterValue === "processing" && item.status === "processing") return matchesSearch;
    if (filterValue === "shipped" && item.status === "shipped") return matchesSearch;
    if (filterValue === "delivered" && item.status === "delivered") return matchesSearch;
    if (filterValue === "returned" && item.status === "returned") return matchesSearch;
    if (filterValue === "delayed" && !item.aiPrediction.deliveryOnTime) return matchesSearch;
    
    return false;
  });
  
  const handleRowAction = (shippingId: string) => {
    console.log("Shipping item clicked:", shippingId);
    // Implement action for clicking on a row
  };

  const handleRowSelection = (rows: string[]) => {
    setSelectedRows(rows);
    console.log("Selected shipping items:", rows);
  };
  
  const exportToCSV = () => {
    const shippingData = filteredShipping.map(item => ({
      "Order Number": item.orderNumber,
      "Customer": item.customer.name,
      "Email": item.customer.email,
      "Status": item.status,
      "Tracking Number": item.trackingNumber,
      "Shipping Method": item.shippingMethod,
      "Estimated Delivery": new Date(item.estimatedDelivery).toLocaleDateString(),
      "Shipped Date": new Date(item.shippedDate).toLocaleDateString(),
      "Delivered Date": item.deliveredDate ? new Date(item.deliveredDate).toLocaleDateString() : "Not delivered",
      "Total": `$${item.total.toFixed(2)}`,
      "Items": item.items,
      "Weight": `${item.weight} kg`,
      "On Time": item.aiPrediction.deliveryOnTime ? "Yes" : "No",
      "Delay Risk": item.aiPrediction.delayRisk,
    }));
    
    downloadToCSV(shippingData, `shipping-report-${new Date().toISOString().split('T')[0]}`);
  };

  const refreshData = () => {
    // In a real app, you would refresh the data from the server
    console.log("Refreshing shipping data");
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <div className="relative w-full sm:w-[300px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-cyan-400 dark:text-cyan-500" />
          <Input
            placeholder="Search shipments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 border-cyan-200 focus-visible:ring-cyan-500 dark:border-cyan-800 dark:bg-cyan-950/50 dark:placeholder:text-cyan-400"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Select 
            value={filterValue} 
            onValueChange={setFilterValue}
          >
            <SelectTrigger className="w-[180px] border-cyan-200 focus:ring-cyan-500 dark:border-cyan-800 dark:bg-cyan-950/50">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-900 border-cyan-200 dark:border-cyan-800">
              <SelectItem value="all">All Shipments</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="returned">Returned</SelectItem>
              <SelectItem value="delayed">Delayed</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            onClick={refreshData}
            className="border-cyan-200 text-cyan-700 hover:bg-cyan-50 dark:border-cyan-800 dark:text-cyan-300 dark:hover:bg-cyan-900/40"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          
          <Button 
            variant="outline" 
            onClick={exportToCSV}
            className="border-cyan-200 text-cyan-700 hover:bg-cyan-50 dark:border-cyan-800 dark:text-cyan-300 dark:hover:bg-cyan-900/40"
          >
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export
          </Button>
          
          <Button 
            onClick={() => {}}
            className="bg-cyan-600 hover:bg-cyan-700 text-white dark:bg-cyan-800 dark:hover:bg-cyan-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Shipment
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border border-cyan-100 dark:border-cyan-900 overflow-hidden">
        <DataTable 
          columns={columns} 
          data={filteredShipping} 
          onRowAction={handleRowAction}
          searchKey="orderNumber"
          searchPlaceholder="Filter orders..."
          showSearch={false} // We have a custom search field
          selectable={true}
          selectedRows={selectedRows}
          onSelectRows={handleRowSelection}
        />
      </div>
      
      <div className="mt-4 text-sm text-cyan-600 dark:text-cyan-400">
        Showing {filteredShipping.length} of {data.length} shipments
      </div>
      
      {selectedRows.length > 0 && (
        <div className="mt-2 p-2 bg-cyan-50 dark:bg-cyan-900/40 rounded border border-cyan-100 dark:border-cyan-900">
          <p className="text-sm text-cyan-700 dark:text-cyan-300">
            {selectedRows.length} items selected. 
            <button 
              onClick={() => setSelectedRows([])} 
              className="ml-2 text-cyan-500 hover:text-cyan-700 dark:hover:text-cyan-300"
            >
              Clear selection
            </button>
          </p>
        </div>
      )}
    </div>
  );
}; 