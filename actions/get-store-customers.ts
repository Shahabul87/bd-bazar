'use server';

import { db } from "@/lib/db";

export interface CustomerWithInsights {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  orderCount: number;
  totalSpent: number;
  lastOrderDate: Date | null;
  aiInsights: {
    purchaseTrend: 'increasing' | 'decreasing' | 'stable' | 'new';
    spendingTier: 'high' | 'medium' | 'low';
    preferredCategories: string[];
    loyaltyScore: number; // 0-100
    churnRisk: 'high' | 'medium' | 'low';
    nextPurchasePrediction: string;
    recommendedProducts: string[];
  };
}

export const getStoreCustomers = async (storeId: string): Promise<CustomerWithInsights[]> => {
  try {
    // First, get all product IDs from this store
    const storeProducts = await db.product.findMany({
      where: {
        storeId: storeId,
      },
      select: {
        id: true,
        categories: {
          select: {
            mainCategory: true,
          }
        }
      },
    });

    const productIds = storeProducts.map(product => product.id);
    
    // Find all orders with these products
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
        user: true,
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                categories: {
                  select: {
                    mainCategory: true
                  }
                }
              }
            }
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

    // Group orders by user and generate customer insights
    const customerMap = new Map<string, CustomerWithInsights>();
    
    orders.forEach(order => {
      if (!order.user) return;
      
      const userId = order.user.id;
      const orderDate = order.createdAt;
      const orderTotal = Number(order.total);
      
      // Get or create customer record
      if (!customerMap.has(userId)) {
        // Map categories from products for this user
        const categories = order.items
          .flatMap(item => item.product.categories.map(c => c.mainCategory))
          .filter((value, index, self) => self.indexOf(value) === index);
        
        // Generate example AI insights (in a real app, these would come from actual AI analysis)
        const aiInsights = generateAIInsights(categories);
        
        customerMap.set(userId, {
          id: userId,
          name: order.user.name,
          email: order.user.email,
          image: order.user.image,
          orderCount: 1,
          totalSpent: orderTotal,
          lastOrderDate: orderDate,
          aiInsights
        });
      } else {
        // Update existing customer
        const customer = customerMap.get(userId)!;
        customer.orderCount += 1;
        customer.totalSpent += orderTotal;
        if (!customer.lastOrderDate || orderDate > customer.lastOrderDate) {
          customer.lastOrderDate = orderDate;
        }
      }
    });

    // Sort customers by total spent
    return Array.from(customerMap.values()).sort((a, b) => b.totalSpent - a.totalSpent);
  } catch (error) {
    console.error("[GET_STORE_CUSTOMERS]", error);
    return [];
  }
};

// Helper function to generate mock AI insights
function generateAIInsights(preferredCategories: string[]) {
  const purchaseTrends = ['increasing', 'decreasing', 'stable', 'new'] as const;
  const spendingTiers = ['high', 'medium', 'low'] as const;
  const churnRisks = ['high', 'medium', 'low'] as const;
  
  // Generate random product recommendations
  const productSuggestions = [
    'Wireless Earbuds',
    'Smart Watch',
    'Bluetooth Speaker',
    'Phone Case',
    'Laptop Stand',
    'Premium Coffee Beans',
    'Fitness Tracker',
    'Ergonomic Chair',
    'LED Desk Lamp',
    'Portable Charger'
  ];
  
  const recommendedProducts = Array(3)
    .fill(0)
    .map(() => productSuggestions[Math.floor(Math.random() * productSuggestions.length)]);
  
  // Generate random purchase prediction
  const nextPurchases = [
    'Phone accessories within 2 weeks',
    'Home decor items within a month',
    'Fitness equipment next season',
    'Holiday gifts in December',
    'Kitchen appliances soon',
    'Electronics upgrade within 3 months'
  ];
  
  return {
    purchaseTrend: purchaseTrends[Math.floor(Math.random() * purchaseTrends.length)],
    spendingTier: spendingTiers[Math.floor(Math.random() * spendingTiers.length)],
    preferredCategories: preferredCategories.length ? preferredCategories : ['New Customer'],
    loyaltyScore: Math.floor(Math.random() * 100),
    churnRisk: churnRisks[Math.floor(Math.random() * churnRisks.length)],
    nextPurchasePrediction: nextPurchases[Math.floor(Math.random() * nextPurchases.length)],
    recommendedProducts
  };
} 