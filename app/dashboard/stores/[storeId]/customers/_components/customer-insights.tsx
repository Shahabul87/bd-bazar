"use client";

import { CustomerWithInsights } from "@/actions/get-store-customers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";

interface CustomerInsightsProps {
  customers: CustomerWithInsights[];
}

export const CustomerInsights: React.FC<CustomerInsightsProps> = ({
  customers
}) => {
  if (!customers.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Customer Data</CardTitle>
          <CardDescription>
            Add customers to your store to see insights here.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Calculating metrics
  const churnRiskData = [
    { name: "Low", value: customers.filter(c => c.aiInsights.churnRisk === "low").length },
    { name: "Medium", value: customers.filter(c => c.aiInsights.churnRisk === "medium").length },
    { name: "High", value: customers.filter(c => c.aiInsights.churnRisk === "high").length },
  ];

  const spendingTierData = [
    { name: "Low", value: customers.filter(c => c.aiInsights.spendingTier === "low").length },
    { name: "Medium", value: customers.filter(c => c.aiInsights.spendingTier === "medium").length },
    { name: "High", value: customers.filter(c => c.aiInsights.spendingTier === "high").length },
  ];

  const purchaseTrendData = [
    { name: "New", value: customers.filter(c => c.aiInsights.purchaseTrend === "new").length },
    { name: "Stable", value: customers.filter(c => c.aiInsights.purchaseTrend === "stable").length },
    { name: "Increasing", value: customers.filter(c => c.aiInsights.purchaseTrend === "increasing").length },
    { name: "Decreasing", value: customers.filter(c => c.aiInsights.purchaseTrend === "decreasing").length },
  ];

  // Calculate average loyalty score
  const avgLoyaltyScore = customers.reduce((sum, customer) => sum + customer.aiInsights.loyaltyScore, 0) / customers.length;

  // Top spending customers
  const topSpenders = [...customers]
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5)
    .map(customer => ({
      name: customer.name,
      totalSpent: customer.totalSpent
    }));

  // Monthly order trends - mock data, replace with actual data if available
  const monthlyOrderTrends = [
    { name: "Jan", orders: 15 },
    { name: "Feb", orders: 20 },
    { name: "Mar", orders: 25 },
    { name: "Apr", orders: 18 },
    { name: "May", orders: 22 },
    { name: "Jun", orders: 30 },
  ];

  // Colors for the charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{customers.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all segments
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Average Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {(customers.reduce((sum, c) => sum + c.orderCount, 0) / customers.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Orders per customer
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Average Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Revenue per customer
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Average Loyalty Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="text-3xl font-bold">{avgLoyaltyScore.toFixed(1)}</div>
              <Progress value={avgLoyaltyScore * 10} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Scale: 1-10
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Churn Risk Distribution</CardTitle>
            <CardDescription>
              Breakdown of customers by churn risk level
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={churnRiskData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {churnRiskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spending Tier Distribution</CardTitle>
            <CardDescription>
              Breakdown of customers by spending tier
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendingTierData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {spendingTierData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Purchase Trend Analysis</CardTitle>
            <CardDescription>
              How customer purchase behaviors are changing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={purchaseTrendData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Customers" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Spenders</CardTitle>
            <CardDescription>
              Customers with the highest total spend
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topSpenders}
                  layout="vertical"
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip formatter={(value) => [`$${value}`, 'Total Spent']} />
                  <Bar dataKey="totalSpent" name="Total Spent" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Order Trends</CardTitle>
          <CardDescription>
            Order performance over the past 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyOrderTrends}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="orders" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 