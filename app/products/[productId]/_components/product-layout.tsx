import { MainHeader } from "@/app/(homepage)/main-header"

interface ProductLayoutProps {
  user: any;
  children: React.ReactNode;
}

export const ProductLayout = ({ user, children }: ProductLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-950">
      <MainHeader />
      <main className="w-full pt-10">
        <div className="px-4 sm:px-6 lg:px-8 max-w-[2000px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}; 