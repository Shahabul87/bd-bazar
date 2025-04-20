export interface Store {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: string;
  businessType: string;
  status: "active" | "inactive" | "pending";
  visitors: number;
  orders: number;
  revenue: number;
  products: number;
  imageUrl?: string;
  logo?: string;
  createdAt?: Date | string;
  lastUpdated?: Date | string;
  contactEmail?: string;
  contactPhone?: string;
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