import { getProductById } from "@/lib/api/product";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/products/ProductDetails";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the params Promise required in Next.js 15+
  const resolvedParams = await params;
  
  let product = null;
  try {
    const res = await getProductById(resolvedParams.id);
    product = res?.data;
  } catch (error) {
    console.error("Failed to fetch product:", error);
  }

  // Gracefully fallback to 404 page if product is missing or ID was invalid
  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}