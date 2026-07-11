import { Container } from "@/components/ui";
import {
  Globe,
  Headset,
  RotateCcw,
  Lock,
  Tag
} from "lucide-react";

export default function Stats() {
  const stats = [
    {
      title: "Free Shipping Worldwide",
      icon: <Globe className="w-5 h-5 text-blue-500" strokeWidth={1.5} />,
    },
    {
      title: "24/7 Customer Support",
      icon: <Headset className="w-5 h-5 text-green-500" strokeWidth={1.5} />,
    },
    {
      title: "30 Days Return Policy",
      icon: <RotateCcw className="w-5 h-5 text-orange-500" strokeWidth={1.5} />,
    },
    {
      title: "100% Secure Checkout",
      icon: <Lock className="w-5 h-5 text-purple-500" strokeWidth={1.5} />,
    },
    {
      title: "Best Price Guarantee",
      icon: <Tag className="w-5 h-5 text-red-500" strokeWidth={1.5} />,
    },
  ];

  return (
    <section className="w-full bg-white py-6 md:py-8 ">
      <Container>
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-y-6 gap-x-2">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`flex items-center gap-3 px-2 lg:px-6 flex-1 justify-start md:justify-center ${
                index !== stats.length - 1 ? 'md:border-r border-gray-200' : ''
              }`}
            >
              <div className="shrink-0 scale-125 md:scale-150 transform-gpu mr-1">{stat.icon}</div>
              <span className="text-[14px] lg:text-[15px] font-bold text-[var(--primary)] whitespace-nowrap">
                {stat.title}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
