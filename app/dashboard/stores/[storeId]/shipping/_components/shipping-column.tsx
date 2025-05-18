"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Truck, PackageCheck, Clock, AlertTriangle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Type definitions for shipping data
export type ShippingItem = {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    address: string;
  };
  status: "pending" | "processing" | "shipped" | "delivered" | "returned";
  trackingNumber: string;
  shippingMethod: string;
  estimatedDelivery: Date;
  shippedDate: Date;
  deliveredDate: Date | null;
  total: number;
  items: number;
  weight: number;
  aiPrediction: {
    deliveryOnTime: boolean;
    delayRisk: "high" | "medium" | "low";
    weatherImpact: "significant" | "mild" | "none";
    trafficConditions: "congested" | "moderate" | "clear";
    suggestionText: string;
  };
};

// Status badge renderer with tooltip
const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return (
        <TooltipProvider key="pending-tooltip">
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge key="pending-badge" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800">
                <Clock className="h-3 w-3 mr-1" /> Pending
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Order has been placed but not yet processed for shipping</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    case "processing":
      return (
        <TooltipProvider key="processing-tooltip">
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge key="processing-badge" className="bg-blue-100 text-blue-800 hover:bg-blue-100 border border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800">
                <PackageCheck className="h-3 w-3 mr-1" /> Processing
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Order is being packed and prepared for shipment</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    case "shipped":
      return (
        <TooltipProvider key="shipped-tooltip">
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge key="shipped-badge" className="bg-purple-100 text-purple-800 hover:bg-purple-100 border border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800">
                <Truck className="h-3 w-3 mr-1" /> Shipped
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Order has been dispatched and is in transit</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    case "delivered":
      return (
        <TooltipProvider key="delivered-tooltip">
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge key="delivered-badge" className="bg-green-100 text-green-800 hover:bg-green-100 border border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800">
                <ShieldCheck className="h-3 w-3 mr-1" /> Delivered
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Order has been successfully delivered to the customer</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    case "returned":
      return (
        <TooltipProvider key="returned-tooltip">
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge key="returned-badge" className="bg-red-100 text-red-800 hover:bg-red-100 border border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800">
                <AlertTriangle className="h-3 w-3 mr-1" /> Returned
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Order has been returned by the customer</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    default:
      return null;
  }
};

// Render AI prediction badges
const getDelayRiskBadge = (risk: string) => {
  let tooltipText = "";
  let badge = null;
  
  switch (risk) {
    case "high":
      tooltipText = "High likelihood of delivery delay based on current conditions";
      badge = <Badge key="high-risk-badge" variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800">High Risk</Badge>;
      break;
    case "medium":
      tooltipText = "Moderate chance of delivery delays";
      badge = <Badge key="medium-risk-badge" variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800">Medium Risk</Badge>;
      break;
    case "low":
      tooltipText = "Minimal risk of delivery delays";
      badge = <Badge key="low-risk-badge" variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800">Low Risk</Badge>;
      break;
    default:
      return null;
  }
  
  return (
    <TooltipProvider key={`${risk}-risk-tooltip`}>
      <Tooltip>
        <TooltipTrigger asChild>
          {badge}
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// Weather impact badge
const getWeatherImpactBadge = (impact: string) => {
  let tooltipText = "";
  let badge = null;
  
  switch (impact) {
    case "significant":
      tooltipText = "Severe weather conditions affecting delivery timelines";
      badge = <Badge key="significant-weather-badge" variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800">Weather Impact</Badge>;
      break;
    case "mild":
      tooltipText = "Light weather conditions with minimal delivery impact";
      badge = <Badge key="mild-weather-badge" variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800">Mild Weather</Badge>;
      break;
    case "none":
      tooltipText = "No weather-related delivery concerns";
      badge = <Badge key="no-weather-badge" variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800">Clear Weather</Badge>;
      break;
    default:
      return null;
  }
  
  return (
    <TooltipProvider key={`${impact}-weather-tooltip`}>
      <Tooltip>
        <TooltipTrigger asChild>
          {badge}
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// Column definitions for the shipping table
export const columns: ColumnDef<ShippingItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "orderNumber",
    accessorKey: "orderNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-cyan-700 dark:text-cyan-300 hover:text-cyan-900 dark:hover:text-cyan-100"
        >
          Order
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("orderNumber")}</div>,
  },
  {
    id: "customer",
    accessorKey: "customer.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-cyan-700 dark:text-cyan-300 hover:text-cyan-900 dark:hover:text-cyan-100"
        >
          Customer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const customer = row.original.customer;
      return (
        <div className="flex flex-col">
          <div key="customer-name" className="font-medium">{customer.name}</div>
          <div key="customer-email" className="text-sm text-muted-foreground">{customer.email}</div>
        </div>
      )
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return getStatusBadge(status);
    },
  },
  {
    id: "trackingNumber",
    accessorKey: "trackingNumber",
    header: "Tracking",
    cell: ({ row }) => {
      const tracking = row.getValue("trackingNumber") as string;
      return (
        <Button variant="link" className="p-0 h-auto text-cyan-700 dark:text-cyan-300">
          {tracking}
        </Button>
      );
    },
  },
  {
    id: "shippingMethod",
    accessorKey: "shippingMethod",
    header: "Method",
    cell: ({ row }) => <div className="font-medium">{row.getValue("shippingMethod")}</div>,
  },
  {
    id: "estimatedDelivery",
    accessorKey: "estimatedDelivery",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-cyan-700 dark:text-cyan-300 hover:text-cyan-900 dark:hover:text-cyan-100"
        >
          Est. Delivery
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue("estimatedDelivery") as Date;
      const formatted = format(new Date(date), "PPP");
      
      return (
        <div className="flex flex-col">
          <div key="delivery-date">{formatted}</div>
          {row.original.aiPrediction.deliveryOnTime ? (
            <Badge key="on-time-badge" variant="outline" className="mt-1 bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800">On Time</Badge>
          ) : (
            <Badge key="delay-badge" variant="outline" className="mt-1 bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800">Delay Risk</Badge>
          )}
        </div>
      );
    },
  },
  {
    id: "aiPrediction",
    accessorKey: "aiPrediction",
    header: "AI Insights",
    cell: ({ row }) => {
      const prediction = row.original.aiPrediction;
      
      return (
        <div className="flex flex-col gap-1">
          {getDelayRiskBadge(prediction.delayRisk)}
          {prediction.weatherImpact !== "none" && getWeatherImpactBadge(prediction.weatherImpact)}
          {prediction.trafficConditions === "congested" && (
            <TooltipProvider key="traffic-tooltip">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge key="traffic-badge" variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800">Traffic</Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Heavy traffic congestion affecting delivery routes</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const shipping = row.original;
  
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(shipping.id)}
            >
              Copy shipping ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Track package</DropdownMenuItem>
            <DropdownMenuItem>Update status</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Cancel shipment</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]; 