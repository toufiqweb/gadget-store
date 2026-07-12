"use client";
import { Container } from "@/components/ui";
import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className=" bg-white">
      <Container>
        <div className="bg-[#12141a] rounded-[1.25rem] p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          
          <div className="flex items-center gap-4 md:gap-6 w-full lg:w-[55%]">
            <div className="hidden sm:flex items-center justify-center p-3 rounded-xl border border-gray-700/50 shrink-0">
              <Mail className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={1} />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-1.5 tracking-tight">
                Stay Updated with Gadget Store
              </h3>
              <p className="text-xs md:text-sm text-gray-400 font-medium leading-relaxed max-w-md">
                Subscribe to our newsletter and never miss new arrivals, exclusive deals & updates.
              </p>
            </div>
          </div>
          
          <div className="w-full lg:w-[45%] flex items-center justify-end">
            <form 
              className="flex items-center w-full max-w-md bg-[#1f222b] rounded-xl p-1.5 border border-gray-700/50 focus-within:border-[var(--ternary)] focus-within:ring-1 focus-within:ring-[var(--ternary)] transition-all"
              onSubmit={(e) => e.preventDefault()}
            >
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full bg-transparent border-none outline-none text-white px-4 text-xs md:text-sm placeholder-gray-500 font-medium"
                required
              />
              <button 
                type="submit"
                className="bg-[var(--ternary)] hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all hover:shadow-[0_0_15px_rgba(249,115,22,0.4)] whitespace-nowrap shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
