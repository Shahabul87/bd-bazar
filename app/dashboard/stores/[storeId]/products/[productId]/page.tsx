import { db } from "@/lib/db";
import { ProductForm } from "./components/product-form";
import { ProductLoading } from "./components/product-loading";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface ProductPageProps {
  params: {
    storeId: string;
    productId: string;
  };
}

const getProduct = async (productId: string) => {
  try {
    const product = await db.product.findUnique({
      where: {
        id: productId
      },
      include: {
        images: true,
        categories: true
      }
    });
    
    if (product) {
      return {
        ...product,
        price: Number(product.price),
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { storeId, productId } = await params;
  
  const product = await getProduct(productId);
  
  if (!product) {
    return notFound();
  }

  return (
    <Suspense fallback={<ProductLoading />}>
      <ProductForm 
        initialData={product} 
        storeId={storeId} 
        productId={productId} 
      />
    </Suspense>
  );
} 