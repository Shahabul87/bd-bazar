import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Prisma } from '@prisma/client';

import { PageHeader } from './components/page-header';
import { StatsOverview } from './components/stats-overview';
import { ProductFilterProvider } from './components/product-filter-provider';
import { EmptyState } from './components/empty-state';
import { LoadingState } from './components/loading-state';

import { Product } from './types';
import { calculateProductStats } from './utils';
import { db } from '@/lib/db';

async function getProducts(storeId: string): Promise<Product[]> {
  try {
    // Use Prisma's findMany to get all products for this store
    const products = await db.product.findMany({
      where: {
        storeId: storeId,
      },
      include: {
        categories: true,
        images: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    // Transform Prisma products to match our Product interface
    return products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price.toString()), // Convert Decimal to number
      stock: product.stock,
      active: product.active,
      featured: product.featured,
      status: product.status,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
      userId: product.userId,
      storeId: product.storeId,
      categories: product.categories,
      images: product.images.map(image => ({
        id: image.id,
        url: image.url,
        publicId: image.publicId,
        alt: image.alt,
      })),
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

interface ProductsPageProps {
  params: { storeId: string }
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { storeId } = await params;
  
  if (!storeId) {
    return notFound();
  }
  
  const products = await getProducts(storeId);
  const stats = calculateProductStats(products);

  return (
    <div className="space-y-6">
      <PageHeader storeId={storeId} />
      
      <StatsOverview stats={stats} />
      
      {products.length === 0 ? (
        <EmptyState storeId={storeId} />
      ) : (
        <Suspense fallback={<LoadingState />}>
          <ProductFilterProvider products={products} storeId={storeId} />
        </Suspense>
      )}
    </div>
  );
} 