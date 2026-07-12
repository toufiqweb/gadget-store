import ProductCard from "@/components/shared/ProductCard";
import { getAllProducts } from "@/lib/api/product";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui";

export default async function LatestArrivals() {
  // Fetch up to 4 latest products
  const productsRes = await getAllProducts({ limit: 4});
  const latestArrivals = productsRes?.data || [];

  return (
    <section className="bg-gray-50/50 ">
      <Container>
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-950 mb-3">
              Latest <span className="text-[var(--ternary)]">Arrivals</span>
            </h2>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed">
              Discover our newest selection of premium gadgets and tech accessories, handpicked for quality and performance.
            </p>
          </div>
          
          {/* View All Button - Clean, Solid & Professional */}
          <Link 
            href="/products" 
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-gray-800 text-sm font-semibold shadow-sm hover:shadow-md transition-all shrink-0 active:scale-95 border border-gray-100"
          >
            View All Products
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-[var(--ternary)]" />
          </Link>
        </div>

        {/* Product Grid Area */}
        {latestArrivals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestArrivals.map((product: any) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Clean Empty State */
          <div className="text-center py-16 bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <p className="text-gray-400 text-sm">No products available at the moment.</p>
          </div>
        )}
      </Container>
    </section>
  );
}