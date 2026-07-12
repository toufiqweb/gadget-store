import { Container } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Laptops",
    count: "120+ Products",
    image: "/images/categories/laptop.jpg",
    link: "/category/laptops"
  },
  {
    title: "Smartphones",
    count: "150+ Products",
    image: "/images/categories/phone.jpg",
    link: "/category/smartphones"
  },
  {
    title: "Cameras",
    count: "80+ Products",
    image: "/images/categories/camers.jpg",
    link: "/category/cameras"
  },
  {
    title: "Wearables",
    count: "100+ Products",
    image: "/images/categories/watch.jpg",
    link: "/category/wearables"
  },
  {
    title: "Accessories",
    count: "200+ Products",
    image: "/images/categories/7095d7fe1b10b8d40016533826c89c1e.jpg",
    link: "/category/accessories"
  },
  {
    title: "Gaming",
    count: "90+ Products",
    image: "/images/categories/gaming.jpg",
    link: "/category/gaming"
  }
];

export default function ShopByCategory() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <Container>
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
            Shop by <span className="text-[var(--ternary)]">Category</span>
          </h2>
          <Link 
            href="/categories" 
            className="hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-blue-950 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-sm transition-all group"
          >
            View All Categories 
            <ArrowRight size={18} className="text-[var(--ternary)] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link 
              key={index}
              href={category.link}
              className="group flex flex-col items-center p-6 bg-white border border-gray-100 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:border-gray-200 transition-all duration-300"
            >
              <div className="relative w-24 h-24 md:w-28 md:h-28 mb-4 transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 ease-out">
                <Image 
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-contain drop-shadow-sm"
                />
              </div>
              <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1 group-hover:text-[var(--ternary)] transition-colors text-center">
                {category.title}
              </h3>
              <p className="text-xs text-gray-400 font-medium">
                {category.count}
              </p>
            </Link>
          ))}
        </div>
        
        {/* Mobile View All Link */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link 
            href="/categories" 
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-blue-950 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-sm transition-all group"
          >
            View All Categories 
            <ArrowRight size={18} className="text-[var(--ternary)] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
