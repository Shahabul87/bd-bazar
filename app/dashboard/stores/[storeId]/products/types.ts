export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  active: boolean;
  featured: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  storeId: string | null;
  categories: any[];
  images: {
    id: string;
    url: string;
    publicId: string;
    alt: string | null;
  }[];
}

export interface ProductStats {
  totalProducts: number;
  activeProducts: number;
  outOfStock: number;
  lowStock: number;
} 