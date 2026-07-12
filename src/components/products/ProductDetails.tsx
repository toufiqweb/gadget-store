"use client";

import { useState } from "react";
import Image from "next/image";
import { useToast } from "@/contexts/ToastContext";
import Link from "next/link";
import { Star, ShoppingCart, Check, ShieldCheck, Truck, ChevronRight } from "lucide-react";

export default function ProductDetails({ product }: { product: any }) {
  const [activeImage, setActiveImage] = useState(
    product.images?.[0] || product.thumbnail || "https://placehold.co/600x600/f8fafc/a1a1aa?text=No+Image"
  );
  const { showToast } = useToast();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
          <ChevronRight size={16} className="mx-2 text-gray-400" />
          <Link href="/products" className="hover:text-gray-900 transition-colors">Products</Link>
          <ChevronRight size={16} className="mx-2 text-gray-400" />
          <Link href={`/category/${product.category?.toLowerCase() || ''}`} className="hover:text-gray-900 transition-colors">
            {product.category}
          </Link>
          <ChevronRight size={16} className="mx-2 text-gray-400" />
          <span className="text-gray-900 font-medium truncate">{product.title}</span>
        </nav>

        <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 md:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Left Column: Image Gallery */}
            <div className="flex flex-col gap-4">
              {/* Main Image */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center">
                <Image
                  src={activeImage}
                  alt={product.title}
                  fill
                  className="object-contain p-4 transition-all duration-300"
                />
              </div>

              {/* Thumbnail List */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {product.images.map((img: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center transition-all ${
                        activeImage === img 
                          ? "ring-2 ring-[var(--ternary)] opacity-100" 
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Product Info */}
            <div className="flex flex-col">
              
              <div className="mb-2">
                <span className="text-sm font-bold tracking-wider text-[var(--ternary)] uppercase">
                  {product.brand}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                {product.title}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 bg-yellow-50 px-2.5 py-1 rounded-md text-yellow-600">
                  <Star size={16} fill="currentColor" />
                  <span className="font-bold text-sm">{product.rating ? Number(product.rating).toFixed(1) : "0.0"}</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                  <Check size={16} /> In Stock ({product.stock})
                </span>
              </div>

              <div className="mb-8">
                <p className="text-4xl font-black text-gray-900 tracking-tight">
                  ${Number(product.price).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
              </div>

              <p className="text-gray-600 text-base leading-relaxed mb-8">
                {product.shortDescription}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button 
                  onClick={() => showToast("Cart functionality is coming soon!", "info")}
                  className="flex-1 h-14 bg-[var(--ternary)] text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors shadow-sm hover:shadow-md active:scale-95"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button 
                  onClick={() => showToast("Checkout functionality is coming soon!", "info")}
                  className="flex-1 h-14 bg-gray-900 text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-sm hover:shadow-md active:scale-95"
                >
                  Buy it Now
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-100 mb-8">
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-700">
                    <Truck size={20} />
                  </div>
                  <span className="text-sm font-medium">Free Delivery</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-700">
                    <ShieldCheck size={20} />
                  </div>
                  <span className="text-sm font-medium">1 Year Warranty</span>
                </div>
              </div>

              {/* Specifications */}
              {product.specifications && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Key Specifications</h3>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700">
                    {product.specifications}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Full Description Section */}
          <div className="mt-16 pt-12 border-t border-gray-100">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Description</h2>
              <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed">
                <p>{product.fullDescription}</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
