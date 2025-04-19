import { getProduct, getSimilarProducts } from "@/actions/get-product"
import { currentUser } from "@/lib/auth"
import { ProductLayout } from "./_components/product-layout"
import { ProductContent } from "./_components/product-content"
import { notFound } from "next/navigation"
import { use } from 'react'

interface PageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const user = await currentUser();
  
  // Await the params
  const { productId } = await params;
  
  if (!productId) {
    return notFound();
  }

  const product = await getProduct(productId);
  //console.log("Product from DB:", JSON.stringify(product?.specifications, null, 2));
  
  if (!product) {
    return notFound();
  }

  // Fetch similar products
  const similarProducts = await getSimilarProducts(productId);

  return (
    <ProductLayout user={user}>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <ProductContent 
          product={product}
          similarProducts={similarProducts}
        />
      </div>
    </ProductLayout>
  );
} 