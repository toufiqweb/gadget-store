import { Award, Zap, ShieldPlus, Cpu } from "lucide-react";

export default function Features() {
  // সম্পূর্ণ নতুন টেক-ফোকাসড কন্টেন্ট
  const features = [
    {
      title: "100% Authentic Tech",
      desc: "Sourced directly from verified global brands.",
      icon: <Award size={28} strokeWidth={1.5} />,
    },
    {
      title: "Next-Day Dispatch",
      desc: "Order before 2 PM for same-day processing.",
      icon: <Zap size={28} strokeWidth={1.5} />,
    },
    {
      title: "Extended Coverage",
      desc: "Up to 2 years of warranty on premium gadgets.",
      icon: <ShieldPlus size={28} strokeWidth={1.5} />,
    },
    {
      title: "Expert Setup Help",
      desc: "Free technical support to get your devices running.",
      icon: <Cpu size={28} strokeWidth={1.5} />,
    },
  ];

  return (
    <section className="w-full bg-white border-y border-gray-200">
      {/* Full-width Grid with no max-width container */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`
              relative group flex flex-col p-4 lg:p-5 xl:p-6 transition-colors duration-300 hover:bg-gray-50/50 cursor-default
              ${index !== features.length - 1 ? 'border-b lg:border-b-0 lg:border-r border-gray-200' : ''}
              ${index === 0 || index === 1 ? 'md:border-b border-gray-200' : ''}
              lg:!border-b-0
            `}
          >
            {/* Hover Accent Top Line */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-[var(--ternary)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            {/* Background Watermark Icon (Subtle) */}
            <div className="absolute -right-4 -bottom-4 text-gray-50 opacity-0 group-hover:opacity-100 group-hover:-translate-y-4 group-hover:-translate-x-4 transition-all duration-500 pointer-events-none transform scale-[3]">
              {feature.icon}
            </div>

            {/* Main Content */}
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-900 flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-[var(--ternary)] group-hover:shadow-md transition-all duration-300">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-950 mb-3 tracking-tight">
                {feature.title}
              </h3>
              
              <p className="text-gray-500 text-sm leading-relaxed max-w-[250px]">
                {feature.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}