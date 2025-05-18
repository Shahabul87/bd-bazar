"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Info } from "lucide-react";
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
import { CustomerWithInsights } from "@/actions/get-store-customers";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Customer } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const getRiskBadge = (risk: string) => {
  let tooltipText = "";
  let badge = null;
  
  switch (risk) {
    case "high":
      tooltipText = "Customer shows high likelihood of churning. Consider targeted engagement.";
      badge = <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800">High Risk</Badge>;
      break;
    case "medium":
      tooltipText = "Customer has moderate churn risk. Monitor engagement patterns.";
      badge = <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800">Medium Risk</Badge>;
      break;
    case "low":
      tooltipText = "Customer shows strong loyalty indicators with low churn risk.";
      badge = <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800">Low Risk</Badge>;
      break;
    default:
      return null;
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1">
            {badge}
            <Info className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const getTrendBadge = (trend: string) => {
  let tooltipText = "";
  let badge = null;
  
  switch (trend) {
    case "increasing":
      tooltipText = "Customer's purchase frequency and value are growing.";
      badge = <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800">Increasing</Badge>;
      break;
    case "stable":
      tooltipText = "Customer maintains consistent purchasing patterns.";
      badge = <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800">Stable</Badge>;
      break;
    case "decreasing":
      tooltipText = "Customer's purchase frequency or value is declining.";
      badge = <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800">Decreasing</Badge>;
      break;
    case "new":
      tooltipText = "New customer with limited purchase history.";
      badge = <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 border border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800">New</Badge>;
      break;
    default:
      return null;
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1">
            {badge}
            <Info className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const getPurchaseFrequencyBadge = (frequency: string) => {
  let tooltipText = "";
  let badge = null;

  switch (frequency) {
    case "frequent":
      tooltipText = "Customer makes purchases regularly (multiple times per month)";
      badge = <Badge key="frequent-badge" variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800">Frequent</Badge>;
      break;
    case "regular":
      tooltipText = "Customer makes purchases consistently (monthly)";
      badge = <Badge key="regular-badge" variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800">Regular</Badge>;
      break;
    case "occasional":
      tooltipText = "Customer makes purchases occasionally (every few months)";
      badge = <Badge key="occasional-badge" variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800">Occasional</Badge>;
      break;
    case "rare":
      tooltipText = "Customer rarely makes purchases (once or twice a year)";
      badge = <Badge key="rare-badge" variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800">Rare</Badge>;
      break;
    case "new":
      tooltipText = "New customer with insufficient purchase history";
      badge = <Badge key="new-badge" variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700">New</Badge>;
      break;
    default:
      return null;
  }

  return (
    <TooltipProvider key={`${frequency}-frequency-tooltip`}>
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

const getLifetimeValueBadge = (value: string) => {
  let tooltipText = "";
  let badge = null;

  switch (value) {
    case "high":
      tooltipText = "High-value customer with significant lifetime spending";
      badge = <Badge key="high-value-badge" variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800">High Value</Badge>;
      break;
    case "medium":
      tooltipText = "Medium-value customer with moderate total spending";
      badge = <Badge key="medium-value-badge" variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800">Medium Value</Badge>;
      break;
    case "low":
      tooltipText = "Low-value customer with minimal total spending";
      badge = <Badge key="low-value-badge" variant="outline" className="bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800">Low Value</Badge>;
      break;
    default:
      return null;
  }

  return (
    <TooltipProvider key={`${value}-value-tooltip`}>
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

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const phone = row.getValue("phone") as string;
      return phone || "N/A";
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Joined
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const timestamp = row.getValue("createdAt") as string;
      const date = new Date(timestamp);
      return format(date, "MMM do, yyyy");
    },
  },
];

export const customerColumns: ColumnDef<CustomerWithInsights>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("phone") || "N/A"}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as Date;
      return <div>{format(new Date(createdAt), "MMM dd, yyyy")}</div>;
    },
  },
  {
    accessorKey: "orderCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Orders
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-center">{row.getValue("orderCount")}</div>,
  },
  {
    accessorKey: "totalSpent",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Spent
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalSpent"));
      return <div className="font-medium">${amount.toFixed(2)}</div>
    },
  },
  {
    accessorKey: "aiInsights.purchaseFrequency",
    header: "Frequency",
    cell: ({ row }) => {
      const aiInsights = row.original.aiInsights;
      return getPurchaseFrequencyBadge(aiInsights.purchaseFrequency);
    },
  },
  {
    accessorKey: "aiInsights.lifetimeValue",
    header: "Value",
    cell: ({ row }) => {
      const aiInsights = row.original.aiInsights;
      return getLifetimeValueBadge(aiInsights.lifetimeValue);
    },
  },
  {
    accessorKey: "aiInsights.churnRisk",
    header: "Risk Level",
    cell: ({ row }) => {
      const aiInsights = row.original.aiInsights;
      return getRiskBadge(aiInsights.churnRisk);
    },
  },
  {
    accessorKey: "aiInsights.purchaseTrend",
    header: "Trend",
    cell: ({ row }) => {
      const aiInsights = row.original.aiInsights;
      return getTrendBadge(aiInsights.purchaseTrend);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original;
  
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(customer.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>View orders</DropdownMenuItem>
            <DropdownMenuItem>Edit customer</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Delete customer</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]; 