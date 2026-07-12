"use client";

import { Container } from "@/components/ui";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, RefreshCcw, GraduationCap, Clock } from "lucide-react";
import { useState, useEffect } from "react";

export default function OfferBanners() {
  const [isMounted, setIsMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 12,
    minutes: 45,
    seconds: 20
  });

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className=" bg-white">
      <Container>
        
        {/* 3-Piece Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Large Banner (Takes 2 columns) */}
          <div className="lg:col-span-2 relative bg-gray-950 rounded-[2rem] overflow-hidden flex flex-col md:flex-row group shadow-xl">
            
            {/* Left Content Area */}
            <div className="relative z-10 w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-between h-full">
              <div>
                <div className="inline-flex items-center gap-2 text-[var(--ternary)] font-bold text-xs tracking-[0.2em] uppercase mb-4">
                  <Clock size={14} /> Flash Sale
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight leading-[1.1]">
                  Unleash Next-Gen <br className="hidden md:block" />
                  <span className="text-[var(--ternary)]">Performance.</span>
                </h2>
                
                <p className="text-gray-400 text-sm md:text-base mb-10 max-w-sm leading-relaxed">
                  Save up to 40% on our premium selection of pro laptops and gear. Limited stock available.
                </p>
              </div>
              
              <div className="mt-auto">
                {/* Minimal Timer */}
                {isMounted && (
                  <div className="flex items-center gap-4 md:gap-6 mb-8">
                    {[
                      { label: 'Days', value: timeLeft.days },
                      { label: 'Hours', value: timeLeft.hours },
                      { label: 'Mins', value: timeLeft.minutes },
                      { label: 'Secs', value: timeLeft.seconds }
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col">
                        <div className="text-white text-2xl md:text-3xl font-black tabular-nums tracking-tighter">
                          {item.value.toString().padStart(2, '0')}
                        </div>
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{item.label}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <Link 
                  href="/sale" 
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-950 px-8 py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            
            {/* Right Image Area */}
            <div className="relative w-full md:w-2/5 h-64 md:h-auto min-h-[300px] flex items-center justify-center overflow-hidden">
               {/* Abstract Background Glow */}
               <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 to-gray-800" />
               <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--ternary)]/20 rounded-full blur-[60px]" />
               
               {/* Product Image */}
               <div className="relative w-[120%] md:w-[150%] h-full transform group-hover:scale-105 transition-transform duration-700 origin-right">
                 <Image 
                   src="https://i.pinimg.com/736x/1e/3f/6d/1e3f6dd63ca4ad28c4393b8bbf00e51e.jpg" 
                   alt="Premium Laptop" 
                   fill 
                   className="object-cover object-left"
                 />
                 <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/40 to-transparent md:bg-gradient-to-r md:from-gray-950 md:via-transparent md:to-transparent" />
               </div>
            </div>
          </div>
          
          {/* Right Stacked Banners (Takes 1 column) */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            
            {/* Small Banner 1: Trade In */}
            <div className="flex-1 relative bg-gray-50 rounded-[2rem] p-8 overflow-hidden flex flex-col justify-between group border border-gray-100 hover:border-gray-200 transition-colors">
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-gray-900 mb-2">Trade & Upgrade</h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  Get up to <strong className="text-gray-900">$200 credit</strong> when you trade in your old device.
                </p>
                <Link 
                  href="/trade-in" 
                  className="inline-flex items-center gap-1.5 text-gray-900 font-bold text-sm hover:text-[var(--ternary)] transition-colors group/link"
                >
                  Calculate Value <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              {/* Abstract Trade-In Graphic */}
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                <RefreshCcw size={48} className="text-gray-200 group-hover:text-gray-300 transition-colors group-hover:rotate-180 duration-700" strokeWidth={1} />
              </div>
            </div>
            
            {/* Small Banner 2: Student Discount (NEW) */}
            <div className="flex-1 relative bg-[var(--ternary)] rounded-[2rem] p-8 overflow-hidden flex flex-col justify-between group shadow-[0_10px_30px_rgba(242,110,33,0.2)]">
              {/* Pattern Overlay */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '16px 16px' }} />
              
              <div className="relative z-10">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white mb-4 backdrop-blur-sm">
                  <GraduationCap size={20} />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Student Discount</h3>
                <p className="text-white/80 text-sm mb-6 leading-relaxed">
                  Unlock an extra 15% off on all accessories with your valid student ID.
                </p>
              </div>
              
              <div className="relative z-10 mt-auto">
                <Link 
                  href="/student" 
                  className="inline-flex items-center justify-center w-full bg-white text-[var(--ternary)] px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-sm hover:shadow-md active:scale-95"
                >
                  Verify Status
                </Link>
              </div>
            </div>

          </div>
          
        </div>
      </Container>
    </section>
  );
}