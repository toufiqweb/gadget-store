"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFoundComponent() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center">
      <div className="relative mb-8">
        {/* Glow effect behind the number */}
        <div className="absolute inset-0 bg-[var(--ternary)] blur-3xl opacity-20 rounded-full"></div>
        <h1 className="relative text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 tracking-tighter">
          404
        </h1>
      </div>
      
      <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
        Page not found
      </h2>
      
      <p className="text-gray-400 max-w-md mx-auto mb-10 text-lg">
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button 
          onClick={() => router.back()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium border border-gray-700 hover:bg-gray-800 text-white transition-all active:scale-95"
        >
          <ArrowLeft size={18} />
          <span>Go Back</span>
        </button>
        
        <Link 
          href="/"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold bg-[var(--ternary)] text-white hover:bg-orange-600 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(242,110,33,0.2)] active:scale-95"
        >
          <Home size={18} />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
