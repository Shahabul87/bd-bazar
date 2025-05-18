import { Product, ProductStats } from "./types";

// Helper to get image URL or default image
export const getProductImage = (product: Product) => {
  if (product.images && product.images.length > 0) {
    return product.images[0].url;
  }
  // Fallback images based on category
  return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
};

// Get all unique categories from products
export const getAllCategories = (products: Product[]) => {
  return products
    .flatMap(product => product.categories.map(c => c.mainCategory || "Uncategorized"))
    .filter((value, index, self) => self.indexOf(value) === index);
};

// Calculate product stats
export const calculateProductStats = (products: Product[]): ProductStats => {
  return {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.active && p.stock > 0).length,
    outOfStock: products.filter(p => p.stock === 0).length,
    lowStock: products.filter(p => p.stock > 0 && p.stock < 10).length,
  };
}; 