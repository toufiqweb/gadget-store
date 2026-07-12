import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui";

const topBanners = [
  {
    id: 1,
    title: "Protected In Every Way",
    subtitle: "Premium Smartphone Accessories",
    image: "/images/gadgets/009b91eaa9c50df8e5d5681cbde9a9c3.jpg",
    link: "/category/accessories",
  },
  {
    id: 2,
    title: "Free Your Hands To Create",
    subtitle: "Smart Voice Assistants",
    image: "/images/gadgets/32dda0d324684078a7afc781f57c4dc4.jpg",
    link: "/category/smart-home",
  },
  {
    id: 3,
    title: "Built To Go Further",
    subtitle: "High-Fidelity Audio",
    image: "/images/gadgets/4179d0479971a530e33f24fd0031c324.jpg",
    link: "/category/audio",
  },
  {
    id: 4,
    title: "Designed To Move With You",
    subtitle: "Next-Gen Wearables",
    image: "/images/gadgets/cdcdabfb9b5259236eb5b6a7d4f17666.jpg",
    link: "/category/wearables",
  }
];

const bottomBanners = [
  {
    id: 5,
    brand: "Apple Authorized",
    title: "The Ultimate Ecosystem",
    subtitle: "Experience seamless integration across all your devices.",
    offer: "Up to 6 Months 0% EMI | ৳2000 OFF",
    image: "/images/gadgets/c4def86a77eafd45440cbe892006148f.jpg",
    link: "/brand/apple",
  },
  {
    id: 6,
    brand: "Tech Essentials",
    title: "Upgrade Your Lifestyle",
    subtitle: "The ultimate way to elevate your daily productivity.",
    offer: "Up to 6 Months 0% EMI | ৳4000 OFF",
    image: "/images/gadgets/6226c0bd6efb449e665e197e6209cd6f.jpg",
    link: "/products",
  }
];

export default function PromoBanners() {
  return (
    <section className=" bg-white">
      <Container>
        <div className="flex flex-col gap-6">
          
          {/* Top Row: 4 Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topBanners.map((banner) => (
              <Link 
                key={banner.id} 
                href={banner.link}
                className="group relative h-[350px] lg:h-[400px] rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.12)] transition-all duration-500 block"
              >
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80 opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                  <div className="flex justify-end">
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/20">
                      Explore
                    </span>
                  </div>
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl font-extrabold mb-2 leading-tight">{banner.title}</h3>
                    <p className="text-xs font-medium text-gray-300 mb-4">{banner.subtitle}</p>
                    <div className="inline-flex items-center text-sm font-semibold text-[var(--ternary)]">
                      Shop Now <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom Row: 2 Items */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {bottomBanners.map((banner) => (
              <Link 
                key={banner.id} 
                href={banner.link}
                className="group relative h-[300px] md:h-[350px] rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.12)] transition-all duration-500 block bg-gray-900"
              >
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
                />
                {/* Dynamic Gradient based on content */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
                
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center max-w-[80%] md:max-w-md text-white">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase text-gray-300">
                      {banner.brand}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-4xl font-extrabold mb-3 leading-tight tracking-tight">
                    {banner.title}
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base mb-6 leading-relaxed">
                    {banner.subtitle}
                  </p>
                  
                  <div className="bg-white/10 backdrop-blur-md w-fit px-4 py-2 rounded-lg text-white text-xs md:text-sm font-bold border border-white/20 mb-6">
                    {banner.offer}
                  </div>
                  
                  <div className="inline-flex items-center text-sm md:text-base font-bold group-hover:text-[var(--ternary)] transition-colors w-fit">
                    Discover More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
