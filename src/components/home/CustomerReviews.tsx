import { Container } from "@/components/ui";
import { Star, CheckCircle2, BadgeCheck } from "lucide-react";
import Image from "next/image";

// Expanded data with specific layout & theme configurations for the Bento Grid
const reviews = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Smart Home Integrator",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    text: "This has completely transformed my living space. The seamless integration of the smart gadgets I purchased here with my existing hub is flawless. Shipping was incredibly fast, and the packaging felt premium. I've recommended this store to all my clients.",
    theme: "dark",
    gridClass: "md:col-span-2 md:row-span-2", // Takes up 2x2 space
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Verified Buyer",
    avatar: "https://i.pravatar.cc/150?img=11",
    rating: 5,
    text: "Pristine condition upon arrival. The noise-canceling headphones are a lifesaver for my daily commute.",
    theme: "light",
    gridClass: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Tech Enthusiast",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    text: "Customer support actually knows what they're talking about! Replaced my faulty cable in 24 hours.",
    theme: "light",
    gridClass: "md:col-span-1 md:row-span-1",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Photographer",
    avatar: "https://i.pravatar.cc/150?img=33",
    rating: 5,
    text: "The drone I bought captures stunning 4K footage. Setup took less than 10 minutes out of the box.",
    theme: "accent", // Uses the brand's orange/ternary color
    gridClass: "md:col-span-1 md:row-span-1",
  },
  {
    id: 5,
    name: "Jessica Walsh",
    role: "Verified Buyer",
    avatar: "https://i.pravatar.cc/150?img=44",
    rating: 4,
    text: "Great prices and authentic gear. Knocked off one star just because the courier was a day late.",
    theme: "light",
    gridClass: "md:col-span-1 md:row-span-1",
  },
  {
    id: 6,
    name: "Marcus Thompson",
    role: "Gamer",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    text: "Finally, a store that doesn't overcharge for gaming peripherals. The mechanical keyboard is incredibly tactile, and the RGB sync software worked perfectly on the first try. Will be buying my next monitor from here.",
    theme: "gray",
    gridClass: "md:col-span-2 md:row-span-1", // Wide card
  },
  {
    id: 7,
    name: "Alex Rivera",
    role: "Productivity Hacker",
    avatar: "https://i.pravatar.cc/150?img=60",
    rating: 5,
    text: "The multi-device charging station decluttered my entire desk. Build quality is solid aluminum, not cheap plastic.",
    theme: "light",
    gridClass: "md:col-span-2 md:row-span-1", // Wide card
  }
];

export default function CustomerReviews() {
  return (
    <section className="bg-[#f8f9fa] py-20 md:py-32">
      <Container>
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-[var(--ternary)] text-sm font-bold tracking-wide uppercase mb-6">
            <BadgeCheck size={18} />
            Community Feedback
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 mb-6">
            Loved by thousands of <br className="hidden md:block" />
            <span className="text-[var(--ternary)]">Tech Enthusiasts.</span>
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-min">
          {reviews.map((review) => {
            
            // Dynamic styling based on the theme assigned in the data
            const isDark = review.theme === "dark";
            const isAccent = review.theme === "accent";
            const isGray = review.theme === "gray";
            
            return (
              <div 
                key={review.id} 
                className={`
                  ${review.gridClass} 
                  rounded-3xl p-8 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1
                  ${isDark ? "bg-[var(--primary)] text-white shadow-xl" : ""}
                  ${isAccent ? "bg-[var(--ternary)] text-white shadow-lg" : ""}
                  ${isGray ? "bg-gray-100/80 text-gray-900 border border-gray-200" : ""}
                  ${!isDark && !isAccent && !isGray ? "bg-white text-gray-900 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100" : ""}
                `}
              >
                <div>
                  {/* Rating Stars */}
                  <div className={`flex items-center gap-1 mb-6 ${isAccent ? "text-white" : "text-yellow-500"}`}>
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={isDark ? 20 : 16} 
                        fill={i < review.rating ? "currentColor" : "none"} 
                        className={i >= review.rating ? "opacity-30" : ""}
                      />
                    ))}
                  </div>
                  
                  {/* Review Text */}
                  <p className={`
                    leading-relaxed mb-8
                    ${isDark ? "text-xl md:text-2xl font-medium text-gray-100" : "text-base"}
                    ${isAccent ? "text-white font-medium" : ""}
                    ${(!isDark && !isAccent) ? "text-gray-600" : ""}
                  `}>
                    "{review.text}"
                  </p>
                </div>
                
                {/* User Info */}
                <div className="flex items-center gap-4 mt-auto">
                  <div className={`
                    relative rounded-full overflow-hidden shrink-0 
                    ${isDark ? "w-14 h-14 ring-2 ring-gray-700" : "w-12 h-12 bg-gray-100"}
                  `}>
                    <Image 
                      src={review.avatar} 
                      alt={review.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className={`font-bold ${isDark || isAccent ? "text-white" : "text-gray-900"}`}>
                      {review.name}
                    </h4>
                    <div className={`flex items-center gap-1.5 text-xs mt-0.5 font-medium ${isDark || isAccent ? "text-white/70" : "text-gray-500"}`}>
                      <CheckCircle2 size={14} className={isDark || isAccent ? "text-white" : "text-green-500"} />
                      <span>{review.role}</span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}