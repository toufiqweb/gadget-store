import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";

export default function ProductCard({ product }: { product: any }) {
  // Use product._id if available (MongoDB standard), else fallback to product.id
  const productId = product._id?.$oid || product._id || product.id;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 flex flex-col h-full">
      
      {/* Image Container */}
      <div className="relative h-64 w-full bg-gray-50 overflow-hidden">
        <Image
          src={product.thumbnail || "https://placehold.co/400x400/f8fafc/a1a1aa?text=No+Image"}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Category Badge - Clean & Minimal */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        
        {/* Header: Brand, Title, and Rating */}
        <div className="flex justify-between items-start mb-2 gap-2">
          <div>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">
              {product.brand}
            </p>
            <h3 className="text-gray-900 font-bold text-lg leading-tight line-clamp-1 group-hover:text-[var(--ternary)] transition-colors">
              {/* This Link covers the whole card for easy clicking */}
              <Link href={`/products/${productId}`} className="after:absolute after:inset-0 z-0">
                {product.title}
              </Link>
            </h3>
          </div>
          
          {/* Subtle Rating */}
          <div className="flex items-center gap-1 text-yellow-500 shrink-0 z-10 pt-1">
            <Star size={14} fill="currentColor" className="text-yellow-400" />
            <span className="text-xs font-bold text-gray-700">
              {product.rating ? Number(product.rating).toFixed(1) : "0.0"}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm line-clamp-2 mb-6 flex-grow leading-relaxed">
          {product.shortDescription}
        </p>

        {/* Footer: Price & Action */}
        <div className="flex items-end justify-between mt-auto">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">
              Price
            </p>
            <p className="text-gray-900 font-black text-xl tracking-tight">
              ${Number(product.price).toLocaleString()}
            </p>
          </div>
          
          {/* Add to Cart Button (Z-index ensures it sits above the Link) */}
          <button 
            className="relative z-20 h-10 px-4 rounded-xl bg-[var(--ternary)] text-white flex items-center justify-center gap-2 font-medium hover:bg-orange-600 transition-colors shadow-sm hover:shadow-md active:scale-95"
            title="Add to Cart"
          >
            <ShoppingCart size={16} />
            <span className="text-sm">Add</span>
          </button>
        </div>

      </div>
    </div>
  );
}