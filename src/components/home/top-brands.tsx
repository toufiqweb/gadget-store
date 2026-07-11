import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui";
import { brands, Brand } from "@/data/brands";

function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link 
      href={`/brands/${brand.slug}`}
      className="group flex flex-col items-center justify-center p-6 bg-white border border-gray-100 rounded-2xl transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:border-gray-200"
    >
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-4 transition-transform duration-300 group-hover:scale-105">
        <Image
          src={brand.logo}
          alt={`${brand.name} logo`}
          fill
          sizes="(max-width: 640px) 64px, 80px"
          className="object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
          {brand.name}
        </span>
        <ArrowRight size={14} className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-[var(--ternary)]" />
      </div>
    </Link>
  );
}

export default function TopBrands() {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-950 mb-3">
              Shop by <span className="text-[var(--ternary)]">Top Brands</span>
            </h2>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed">
              Explore our curated selection of industry-leading tech brands known for exceptional quality and innovation.
            </p>
          </div>
          
          {/* View All Button */}
          <Link 
            href="/brands" 
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-gray-800 text-sm font-semibold shadow-sm hover:shadow-md transition-all shrink-0 active:scale-95 border border-gray-100"
          >
            View All Brands
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-[var(--ternary)]" />
          </Link>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {brands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </Container>
    </section>
  );
}
