"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// Function to convert Decimal objects to numbers
function serializeData(data: any): any {
  if (data === null || data === undefined) {
    return data;
  }
  
  // Handle Decimal types from Prisma
  if (typeof data === 'object' && data.constructor.name === 'Decimal') {
    return Number(data);
  }
  
  // Handle Date objects
  if (data instanceof Date) {
    return data.toISOString();
  }
  
  // Handle arrays
  if (Array.isArray(data)) {
    return data.map(item => serializeData(item));
  }
  
  // Handle objects
  if (typeof data === 'object' && data !== null) {
    const result: any = {};
    for (const key in data) {
      result[key] = serializeData(data[key]);
    }
    return result;
  }
  
  // Return primitive values as is
  return data;
}

/**
 * Fetch a store by ID with related data
 */
export async function getStoreById(storeId: string) {
  const user = await currentUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }
  
  const store = await db.store.findUnique({
    where: {
      id: storeId
    },
    include: {
      products: {
        select: {
          id: true,
          name: true,
          price: true,
          stock: true,
          active: true,
          createdAt: true,
          description: true,
          sku: true
        }
      }
    }
  });
  
  if (!store) {
    throw new Error("Store not found");
  }
  
  // Check if the store belongs to the current user
  if (store.userId !== user.id) {
    throw new Error("Access denied");
  }
  
  // Serialize data to handle Decimal objects
  return serializeData(store);
}

/**
 * Fetch store orders
 */
export async function getStoreOrders(storeId: string, limit = 5) {
  const user = await currentUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }
  
  const store = await db.store.findUnique({
    where: {
      id: storeId,
      userId: user.id
    },
    select: { id: true }
  });
  
  if (!store) {
    throw new Error("Store not found or access denied");
  }
  
  const orders = await db.order.findMany({
    where: {
      items: {
        some: {
          product: {
            storeId: storeId
          }
        }
      }
    },
    include: {
      items: {
        include: {
          product: true
        }
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: limit
  });
  
  // Serialize data to handle Decimal objects
  return serializeData(orders);
}

/**
 * Update store data
 */
export async function updateStore(storeId: string, data: any) {
  const user = await currentUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }
  
  const store = await db.store.findUnique({
    where: {
      id: storeId
    },
    select: { userId: true }
  });
  
  if (!store) {
    throw new Error("Store not found");
  }
  
  if (store.userId !== user.id) {
    throw new Error("Access denied");
  }
  
  const updatedStore = await db.store.update({
    where: {
      id: storeId
    },
    data
  });
  
  revalidatePath(`/dashboard/stores/${storeId}`);
  return serializeData(updatedStore);
}

/**
 * Get store metrics
 */
export async function getStoreMetrics(storeId: string) {
  const user = await currentUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }
  
  const store = await db.store.findUnique({
    where: {
      id: storeId,
      userId: user.id
    },
    select: { id: true }
  });
  
  if (!store) {
    throw new Error("Store not found or access denied");
  }
  
  // Count products
  const productsCount = await db.product.count({
    where: {
      storeId: storeId
    }
  });
  
  // Count active products
  const activeProductsCount = await db.product.count({
    where: {
      storeId: storeId,
      active: true
    }
  });
  
  // Count low stock products
  const lowStockProductsCount = await db.product.count({
    where: {
      storeId: storeId,
      stock: {
        lt: 5
      }
    }
  });
  
  // Get orders count
  const ordersCount = await db.order.count({
    where: {
      items: {
        some: {
          product: {
            storeId: storeId
          }
        }
      }
    }
  });
  
  // Calculate total revenue
  const orders = await db.order.findMany({
    where: {
      items: {
        some: {
          product: {
            storeId: storeId
          }
        }
      }
    },
    select: {
      total: true
    }
  });
  
  const totalRevenue = orders.reduce((sum, order) => {
    return sum + Number(order.total);
  }, 0);
  
  // Return serialized metrics
  return serializeData({
    productCount: productsCount,
    activeProducts: activeProductsCount,
    lowStockProducts: lowStockProductsCount,
    orderCount: ordersCount,
    totalRevenue: totalRevenue
  });
} 