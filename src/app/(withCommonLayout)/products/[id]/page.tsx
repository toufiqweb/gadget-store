import type { Metadata } from "next";
import { getProductById } from "@/lib/api/product";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/products/ProductDetails";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const res = await getProductById(resolvedParams.id);
    const product = res?.data;

    if (!product) {
      return {
        title: "Product Not Found",
        description: "The product you are looking for does not exist.",
      };
    }

    return {
      title: product.title,
      description: product.shortDescription || `Buy ${product.title} at Gadget Store. Brand: ${product.brand}.`,
      keywords: [product.title, product.brand, product.category, "gadgets", "buy online"],
      openGraph: {
        title: `${product.title} | Gadget Store`,
        description: product.shortDescription || `Explore ${product.title} by ${product.brand}.`,
        images: product.thumbnail ? [{ url: product.thumbnail, alt: product.title }] : [],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${product.title} | Gadget Store`,
        description: product.shortDescription || `${product.title} by ${product.brand}.`,
        images: product.thumbnail ? [product.thumbnail] : [],
      },
    };
  } catch {
    return {
      title: "Product | Gadget Store",
      description: "View product details at Gadget Store.",
    };
  }
}
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