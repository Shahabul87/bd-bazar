import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import StoreTabs from "./store-tabs";

export const metadata: Metadata = {
  title: "Store Dashboard",
  description: "Manage your store with ease",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/signin");
  }
  
  // Properly await params object before accessing properties
  const { storeId } = await params;

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen w-full">
      <div className="w-full mx-auto px-2 sm:px-4 md:px-6 lg:px-8 max-w-[95rem]">
        <StoreTabs storeId={storeId} />
        <main className="py-4 md:py-6">
          {children}
        </main>
      </div>
    </div>
  );
} 