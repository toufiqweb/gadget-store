"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getMyProducts } from "@/lib/api/product";
import ProductCard from "@/components/shared/ProductCard";
import { Loader2, PackageOpen, Plus } from "lucide-react";
import Link from "next/link";

export default function MyProductsPage() {
  const { data: session, isPending: isAuthPending } = authClient.useSession();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session) return;

    const fetchMyProducts = async () => {
      try {
        setIsLoading(true);
        const res = await getMyProducts();
        if (res.success && Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          setError(res.message || "Failed to load products");
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyProducts();
  }, [session]);

  if (isAuthPending) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--ternary)]" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col h-[60vh] items-center justify-center">
        <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
        <p className="text-gray-400">Please log in to view your products.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">My Products</h1>
          <p className="text-sm text-gray-400 mt-1">Manage and view the gadget listings you have created.</p>
        </div>
        <Link 
          href="/dashboard/add-product" 
          className="inline-flex items-center gap-2 bg-[var(--ternary)] hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm active:scale-95 shrink-0 w-fit"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {isLoading ? (
        <div className="flex h-[40vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--ternary)]" />
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm font-medium">
          {error}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id || product.id} className="relative">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-[#1f2029] rounded-2xl border border-gray-800 px-4">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 mb-4">
            <PackageOpen size={32} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No Products Added Yet</h3>
          <p className="text-gray-400 text-sm max-w-sm mb-6 leading-relaxed">
            You haven&apos;t listed any gadgets for sale. Start by adding your first product!
          </p>
          <Link 
            href="/dashboard/add-product" 
            className="inline-flex items-center gap-2 bg-[var(--ternary)] hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-sm active:scale-95"
          >
            Create Your First Listing
          </Link>
        </div>
      )}
    </div>
  );
}
