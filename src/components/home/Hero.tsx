import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="w-full">
      <div className="mx-auto w-full px-4 md:px-8 relative h-[50vh] min-h-[350px] lg:h-[calc(100vh-220px)] bg-white group">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banner/Jul 11, 2026, 09_14_47 PM.png"
            alt="Hero Banner"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Text Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 md:px-12 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[var(--primary)] mb-4 md:mb-6 animate-fade-in-up">
            Discover the Latest Tech Innovations
          </h1>
          <p className="text-sm md:text-lg lg:text-xl text-gray-700 mb-8 md:mb-10 max-w-2xl font-medium">
            Explore our collection of cutting-edge gadgets and gear.
          </p>
          <Link
            href="/category/gadget"
            className="bg-[var(--ternary)] text-white px-8 py-3.5 md:px-10 md:py-4 rounded-full font-semibold text-sm md:text-base tracking-wide uppercase hover:bg-orange-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(242,110,33,0.3)]"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
