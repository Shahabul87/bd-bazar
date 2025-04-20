import { getCurrentUser } from "@/lib/session";
import { DashboardContent } from "./_components/dashboard-content";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const dateRange = "last30Days"; // Default date range

  return <DashboardContent user={user} dateRange={dateRange} />;
} 