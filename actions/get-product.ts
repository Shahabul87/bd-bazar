import { db } from "@/lib/db";

export const getProduct = async (productId: string) => {
  try {
    const product = await db.product.findUnique({
      where: {
        id: productId
      },
      include: {
        images: true,
        store: {
          select: {
            id: true,
            name: true,
          }
        },
        reviews: true,
        categories: true,
        orderItems: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!product) return null;

    // Format the product data to match the expected structure
    const formattedProduct = {
      ...product,
      price: Number(product.price),
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
      specifications: Array.isArray(product.specifications) ? product.specifications : [],
      colors: product.colors || null,
      dimensions: product.dimensions || null,
      stockCount: product.stockCount || 0,
    };

    return formattedProduct;
  } catch (error) {
    console.error("[PRODUCT_GET]", error);
    return null;
  }
};

export const getSimilarProducts = async (productId: string) => {
  try {
    // First get the current product to get its name and categories
    const currentProduct = await db.product.findUnique({
      where: { id: productId },
      include: {
        categories: true
      }
    });

    if (!currentProduct) return [];

    // Create a base query
    const baseQuery = {
      where: {
        AND: [
          { id: { not: productId } },
          { active: true },
          { inStock: true },
        ]
      },
      include: {
        images: true,
        store: {
          select: {
            id: true,
            name: true,
          }
        },
        categories: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      take: 4,
      orderBy: {
        createdAt: 'desc'
      }
    };

    // Try to find products by category first
    if (currentProduct.categories.length > 0) {
      const categoryIds = currentProduct.categories.map(cat => cat.id);
      
      const similarByCategory = await db.product.findMany({
        ...baseQuery,
        where: {
          AND: [
            ...baseQuery.where.AND,
            { 
              categories: {
                some: {
                  id: { in: categoryIds }
                }
              }
            }
          ]
        }
      });

      if (similarByCategory.length > 0) {
        return similarByCategory.map(product => ({
          ...product,
          price: Number(product.price),
          createdAt: product.createdAt.toISOString(),
          updatedAt: product.updatedAt.toISOString(),
        }));
      }
    }

    // If no products found by category, try by name similarity
    const words = currentProduct.name.split(' ').filter(word => word.length > 3);
    if (words.length > 0) {
      const similarByName = await db.product.findMany({
        ...baseQuery,
        where: {
          AND: [
            ...baseQuery.where.AND,
            {
              OR: words.map(word => ({
                name: {
                  contains: word,
                  mode: 'insensitive'
                }
              }))
            }
          ]
        }
      });

      if (similarByName.length > 0) {
        return similarByName.map(product => ({
          ...product,
          price: Number(product.price),
          createdAt: product.createdAt.toISOString(),
          updatedAt: product.updatedAt.toISOString(),
        }));
      }
    }

    // If still no results, fall back to price range
    const priceRange = {
      min: Number(currentProduct.price) * 0.7,
      max: Number(currentProduct.price) * 1.3,
    };

    const similarByPrice = await db.product.findMany({
      ...baseQuery,
      where: {
        AND: [
          ...baseQuery.where.AND,
          { price: { gte: priceRange.min } },
          { price: { lte: priceRange.max } },
        ]
      }
    });

    return similarByPrice.map(product => ({
      ...product,
      price: Number(product.price),
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    }));

  } catch (error) {
    console.error("[SIMILAR_PRODUCTS_GET]", error);
    return [];
  }
}; 