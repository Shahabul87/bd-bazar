export interface Store {
  id: string;
  name: string;
  slug: string;
  type: string;
  theme: string;
  status: 'active' | 'inactive' | 'pending';
  visitors: number;
  orders: number;
  revenue: number;
  lastUpdated: string;
  products: number;
  logo?: string;
  description?: string;
  businessType?: string;
}

export interface StoreTemplate {
  id: string;
  name: string;
  description: string;
  features: string[];
}

export interface StoreTheme {
  id: string;
  name: string;
  preview: string;
}

export interface StoreManagementClientProps {
  user: any; // Accept any user type to avoid type conflicts
  initialStores?: any[]; // In a real app, you would type this properly
} 