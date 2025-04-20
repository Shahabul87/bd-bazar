import { auth } from "@/auth";
import { StoreManagementClient } from "./_components/store-management-client";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export const metadata = {
  title: "Store Management | Dashboard",
  description: "Manage your online stores",
};

export default async function StoresPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="w-full overflow-x-hidden">
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        }
      >
        <StoreManagementClient user={session.user as any} />
      </Suspense>
    </div>
  );
} 