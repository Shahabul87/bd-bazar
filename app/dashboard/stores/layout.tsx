import { DashboardSidebar } from "../dashboard-sidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";

export default async function StoresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Cast the user to the expected type
  const user = session.user as unknown as User;

  return (
    <div className="flex h-screen bg-slate-900">
      <DashboardSidebar user={user} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
} 