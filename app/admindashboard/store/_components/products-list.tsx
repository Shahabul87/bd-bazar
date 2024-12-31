import { currentUser } from '@/lib/auth'
import { db } from "@/lib/db"
import { ProductsTable } from "./products-table"

interface ProductsListProps {
  searchQuery: string;
  selectedProducts: string[];
  onSelectProducts: (ids: string[]) => void;
  onEdit: (id: string) => void;
}

export async function ProductsList({
  searchQuery,
  selectedProducts,
  onSelectProducts,
  onEdit
}: ProductsListProps) {
  const user = await currentUser();

  const products = await db.product.findMany({
    where: {
      userId: user?.id
    },
    include: {
      category: true,
      images: true,
      reviews: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      orderItems: true
    }
  });

  // Convert Decimal to number for client component
  const serializedProducts = products.map(product => ({
    ...product,
    price: parseFloat(product.price.toString()),
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  }));

  return (
    <ProductsTable 
      searchQuery={searchQuery}
      products={serializedProducts}
      onEdit={onEdit}
      selectedProducts={selectedProducts}
      onSelectProducts={onSelectProducts}
    />
  );
} 