import { Store, StoreTemplate, StoreTheme } from "./types";

// Mock store data - in a real app, this would come from an API
export const MOCK_STORES: Store[] = [
  {
    id: '1',
    name: 'Tech Haven',
    slug: 'tech-haven',
    type: 'Electronics',
    theme: 'Modern Dark',
    status: 'active',
    visitors: 1250,
    orders: 42,
    revenue: 3840,
    lastUpdated: '2023-12-15',
    products: 104,
    logo: "/assets/default-store-icon.svg"
  },
  {
    id: '2',
    name: 'Fashion Forward',
    slug: 'fashion-forward',
    type: 'Clothing',
    theme: 'Elegant Light',
    status: 'active',
    visitors: 845,
    orders: 31,
    revenue: 2560,
    lastUpdated: '2023-12-18',
    products: 78,
    logo: "/assets/default-store-icon.svg"
  },
  {
    id: '3',
    name: 'Home Essentials',
    slug: 'home-essentials',
    type: 'Home & Garden',
    theme: 'Cozy Neutral',
    status: 'pending',
    visitors: 0,
    orders: 0,
    revenue: 0,
    lastUpdated: '2023-12-20',
    products: 45,
    logo: "/assets/default-store-icon.svg"
  }
];

// Store templates
export const STORE_TEMPLATES: StoreTemplate[] = [
  {
    id: 'electronics',
    name: 'Electronics Store',
    description: 'Optimized for selling tech products and gadgets',
    features: ['Product comparison', 'Specifications display', 'Related accessories']
  },
  {
    id: 'fashion',
    name: 'Fashion & Apparel',
    description: 'Perfect for clothing, accessories, and footwear',
    features: ['Size guides', 'Color variants', 'Outfit suggestions']
  },
  {
    id: 'home-garden',
    name: 'Home & Garden',
    description: 'Ideal for furniture, decor, and garden products',
    features: ['Room visualization', 'Dimension details', 'Care instructions']
  },
  {
    id: 'beauty',
    name: 'Beauty & Cosmetics',
    description: 'Designed for makeup, skincare, and beauty products',
    features: ['Ingredient lists', 'How-to guides', 'Personalized recommendations']
  },
  {
    id: 'food',
    name: 'Food & Grocery',
    description: 'Optimized for food products and grocery items',
    features: ['Nutritional information', 'Recipe suggestions', 'Dietary filters']
  },
  {
    id: 'general',
    name: 'General Merchandise',
    description: 'Versatile template for various product types',
    features: ['Flexible layouts', 'Customizable categories', 'Adaptable product pages']
  }
];

// Store themes
export const STORE_THEMES: StoreTheme[] = [
  {
    id: 'modern-dark',
    name: 'Modern Dark',
    preview: '/themes/modern-dark.jpg'
  },
  {
    id: 'elegant-light',
    name: 'Elegant Light',
    preview: '/themes/elegant-light.jpg'
  },
  {
    id: 'vibrant-colorful',
    name: 'Vibrant Colorful',
    preview: '/themes/vibrant-colorful.jpg'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    preview: '/themes/minimalist.jpg'
  },
  {
    id: 'cozy-neutral',
    name: 'Cozy Neutral',
    preview: '/themes/cozy-neutral.jpg'
  },
  {
    id: 'bold-contrast',
    name: 'Bold Contrast',
    preview: '/themes/bold-contrast.jpg'
  }
]; 