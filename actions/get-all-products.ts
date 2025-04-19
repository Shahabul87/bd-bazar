import { db } from "@/lib/db";

type ProductWithDetails = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  active: boolean;
  images: {
    url: string;
  }[];
  categories: {
    id: string;
    mainCategory: string;
  }[];
  store: {
    name: string;
    active: boolean;
  } | null;
  _count?: {
    orderItems: number;
  };
};

type GetProducts = {
  categoryId?: string;
  storeId?: string;
  searchQuery?: string;
  limit?: number;
  trending?: boolean;
};

export const getProducts = async ({
  categoryId,
  storeId,
  searchQuery,
  limit = 8,
  trending = false,
}: GetProducts = {}): Promise<ProductWithDetails[]> => {
  try {
    const products = await db.product.findMany({
      where: {
        active: true,
        store: {
          is: {
            active: true
          }
        },
        ...(categoryId && {
          categories: {
            some: {
              id: categoryId
            }
          }
        }),
        ...(storeId && { storeId }),
        ...(searchQuery && {
          OR: [
            {
              name: {
                contains: searchQuery,
                mode: 'insensitive'
              }
            },
            {
              description: {
                contains: searchQuery,
                mode: 'insensitive'
              }
            }
          ]
        })
      },
      include: {
        images: {
          select: {
            url: true
          }
        },
        categories: {
          select: {
            id: true,
            mainCategory: true
          }
        },
        store: {
          select: {
            name: true,
            active: true
          }
        },
        ...(trending && {
          _count: {
            select: {
              orderItems: true
            }
          }
        })
      },
      orderBy: trending ? {
        orderItems: {
          _count: 'desc'
        }
      } : {
        createdAt: 'desc'
      },
      take: limit
    });

    return products;
  } catch (error) {
    console.error("[GET_PRODUCTS]", error instanceof Error ? error.message : 'An unknown error occurred');
    return [];
  }
};

// Helper function to get trending products
export const getTrendingProducts = async (limit = 4) => {
  try {
    const products = await db.product.findMany({
      where: {
        active: true
      },
      include: {
        images: {
          select: {
            url: true
          }
        },
        categories: {
          select: {
            id: true,
            mainCategory: true
          }
        },
        store: {
          select: {
            name: true
          }
        },
        _count: {
          select: {
            orderItems: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Sort by order count
    return products
      .sort((a, b) => (b._count?.orderItems || 0) - (a._count?.orderItems || 0))
      .slice(0, limit);

  } catch (error) {
    if (error instanceof Error) {
      console.error("[GET_TRENDING_PRODUCTS]", error.message);
    } else {
      console.error("[GET_TRENDING_PRODUCTS]", "An unknown error occurred");
    }
    return [];
  }
};

// Helper function to get latest products
export const getLatestProducts = async (limit = 8) => {
  try {
    return await db.product.findMany({
      where: {
        active: true
      },
      include: {
        images: {
          select: {
            url: true
          }
        },
        categories: {
          select: {
            id: true,
            mainCategory: true
          }
        },
        store: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit
    });
  } catch (error) {
    console.error("[GET_LATEST_PRODUCTS]", error);
    return [];
  }
};

// Helper function to get total product count
export const getProductCount = async () => {
  try {
    return await db.product.count({
      where: {
        active: true
      }
    });
  } catch (error) {
    console.error("[GET_PRODUCT_COUNT]", error);
    return 0;
  }
};

// Helper function to get total store count
export const getStoreCount = async () => {
  try {
    return await db.store.count();
  } catch (error) {
    console.error("[GET_STORE_COUNT]", error);
    return 0;
  }
}; 