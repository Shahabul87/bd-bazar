import { db } from "@/lib/db";

export interface CategoryWithProductCount {
  id: string;
  mainCategory: string;
  subCategory: string | null;
  finalCategory: string | null;
  description: string | null;
  slug: string;
  productCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export const getStoreCategories = async (storeId: string): Promise<CategoryWithProductCount[]> => {
  try {
    // Get all products for this store with their categories
    const products = await db.product.findMany({
      where: {
        storeId: storeId,
        active: true,
      },
      include: {
        categories: true,
      },
    });

    // Extract all unique category IDs
    const categoryIds = [...new Set(
      products.flatMap(product => 
        product.categories.map(category => category.id)
      )
    )];

    // Fetch those categories
    const categories = await db.productCategory.findMany({
      where: {
        id: {
          in: categoryIds,
        },
      },
    });

    // Count products in each category
    const categoriesWithCounts = categories.map((category) => {
      const productCount = products.filter(product => 
        product.categories.some(pc => pc.id === category.id)
      ).length;

      return {
        ...category,
        productCount,
      };
    });

    // Sort by product count descending and then alphabetically
    return categoriesWithCounts.sort((a, b) => {
      if (b.productCount !== a.productCount) {
        return b.productCount - a.productCount;
      }
      return a.mainCategory.localeCompare(b.mainCategory);
    });
  } catch (error) {
    console.error("[GET_STORE_CATEGORIES]", error);
    return [];
  }
}; 