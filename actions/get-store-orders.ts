import { db } from "@/lib/db";

export interface OrderWithDetails {
  id: string;
  status: string;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: {
    name: string | null;
    email: string | null;
  };
  items: {
    id: string;
    quantity: number;
    price: number;
    product: {
      id: string;
      name: string;
      images: {
        url: string;
      }[];
    };
  }[];
}

export const getStoreOrders = async (storeId: string): Promise<OrderWithDetails[]> => {
  try {
    // First, get all products from this store
    const storeProducts = await db.product.findMany({
      where: {
        storeId: storeId,
      },
      select: {
        id: true,
      },
    });

    const productIds = storeProducts.map(product => product.id);

    // Find all orders that contain these products
    const orders = await db.order.findMany({
      where: {
        items: {
          some: {
            productId: {
              in: productIds,
            },
          },
        },
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
          where: {
            productId: {
              in: productIds,
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Format and return the orders
    return orders.map(order => ({
      ...order,
      total: Number(order.total),
      items: order.items.map(item => ({
        ...item,
        price: Number(item.price),
      })),
    }));
  } catch (error) {
    console.error("[GET_STORE_ORDERS]", error);
    return [];
  }
}; 