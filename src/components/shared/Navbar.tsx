"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Search, MapPin, ShoppingCart, User, LogOut, LayoutDashboard, UserCircle, Tag, Phone, ChevronDown } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const { 
    data: session, 
    isPending,
  } = authClient.useSession();

  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    setIsDropdownOpen(false);
    router.push("/");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Products", href: "/products" },
    { name: "Phones", href: "/Phones" },
    { name: "Cameras", href: "/Cameras" },
    { name: "Drones", href: "/Drones" },
    { name: "Wearables", href: "/Wearables" },
    { name: "Gaming", href: "/Gaming" },
    { name: "Laptops", href: "/Laptops" },
    { name: "Audio", href: "/Audio" },
    { name: "Tablets", href: "/Tablets" },
  ];

  return (
    <header className="w-full flex flex-col font-sans sticky top-0 z-[100]">
      
      {/* 1. Micro-Header (Topmost thin bar) - Using Secondary Color */}
      <div className="hidden lg:block w-full bg-[var(--secondary)] py-2 border-b border-white/5">
        <div className="container mx-auto px-4 max-w-7xl flex justify-between items-center text-xs font-medium text-gray-400">
          
          {/* Left Side Info */}
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
              <Phone size={14} className="text-[var(--ternary)]" /> 24/7 Support: +1-800-GADGETS
            </span>
            <span className="w-px h-3 bg-gray-700"></span>
            <span className="text-gray-300">Free Standard Shipping on Orders Over $100</span>
          </div>

          {/* Right Side Quick Links */}
          <div className="flex items-center gap-6">
            <Link href="/apple-store" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <MapPin size={14} /> Find Apple Store
            </Link>
            <span className="w-px h-3 bg-gray-700"></span>
            <Link href="/offers" className="flex items-center gap-1.5 text-[var(--ternary)] hover:text-orange-400 transition-colors">
              <Tag size={14} /> Daily Deals & Offers
            </Link>
            <span className="w-px h-3 bg-gray-700"></span>
            <button className="flex items-center gap-1 hover:text-white transition-colors">
              English / USD <ChevronDown size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Header - Using Primary Color */}
      <div className="w-full bg-[var(--primary)] py-5 lg:py-6 relative z-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between gap-6 lg:gap-10">
            
            {/* Clean Typography Logo */}
            <Link href="/" className="shrink-0 flex items-center gap-2 group">
              <div className="flex flex-col">
                <div className="text-3xl font-black text-white tracking-tight leading-none group-hover:text-gray-200 transition-colors">
                  GADGET<span className="text-[var(--ternary)]">.</span>
                </div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] mt-1">
                  Store
                </span>
              </div>
            </Link>

            {/* Centralized Bold Search Bar */}
            <div className="flex-1 max-w-3xl hidden md:flex">
              <div className="relative w-full flex">
                <input
                  type="text"
                  placeholder="Search over 10,000+ products..."
                  className="w-full bg-white text-gray-900 placeholder:text-gray-500 rounded-l-lg py-3.5 pl-5 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ternary)]/80 focus:z-10 shadow-inner"
                />
                <button 
                  className="bg-[var(--ternary)] hover:bg-orange-600 text-white px-8 rounded-r-lg flex items-center justify-center transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--ternary)]/80"
                >
                  <Search size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Right Side Actions (Auth & Cart) */}
            <div className="flex items-center gap-6 lg:gap-8 shrink-0 text-white">
              
              {/* User Account Area */}
              {!mounted || isPending ? (
                <div className="flex items-center gap-3 animate-pulse">
                  <div className="w-10 h-10 rounded-full bg-gray-800"></div>
                  <div className="hidden sm:block w-20 h-8 bg-gray-800 rounded"></div>
                </div>
              ) : session?.user ? (
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-3 text-left focus:outline-none group"
                  >
                    {session.user.image ? (
                      <img src={session.user.image} alt={session.user.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-transparent group-hover:ring-[var(--ternary)] transition-all" />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-gray-800 flex items-center justify-center font-bold ring-2 ring-transparent group-hover:ring-[var(--ternary)] transition-all">
                        {session.user.name.charAt(0)}
                      </div>
                    )}
                    <div className="hidden sm:flex flex-col">
                      <span className="text-[11px] text-gray-400 font-medium">Welcome back,</span>
                      <span className="text-sm font-bold truncate max-w-[120px] group-hover:text-[var(--ternary)] transition-colors">
                        {session.user.name}
                      </span>
                    </div>
                    <ChevronDown size={14} className="hidden sm:block text-gray-400 group-hover:text-white transition-colors" />
                  </button>

                  {/* Redesigned Dark Dropdown */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-[var(--primary)] rounded-xl shadow-[0_15px_50px_rgba(0,0,0,0.5)] py-2 border border-white/10 z-50 animate-in fade-in zoom-in-95 duration-200">
                      <div className="px-4 py-3 border-b border-white/5 mb-1">
                        <p className="text-sm font-bold truncate text-white">{session.user.name}</p>
                        <p className="text-xs text-gray-400 truncate mt-0.5">{session.user.email}</p>
                      </div>
                      
                      <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-[var(--secondary)] hover:text-white transition-colors" onClick={() => setIsDropdownOpen(false)}>
                        <UserCircle size={18} className="text-gray-400" /> Profile
                      </Link>
                      
                      <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-[var(--secondary)] hover:text-white transition-colors" onClick={() => setIsDropdownOpen(false)}>
                        <LayoutDashboard size={18} className="text-gray-400" /> Dashboard
                      </Link>
                      
                      <div className="h-px bg-white/5 my-1.5 mx-3"></div>
                      
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-left">
                        <LogOut size={18} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login" className="flex items-center gap-3 group">
                  <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[var(--ternary)] transition-colors">
                    <User size={20} className="text-gray-300 group-hover:text-white" />
                  </div>
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-[11px] text-gray-400 font-medium">Hello, Sign in</span>
                    <span className="text-sm font-bold group-hover:text-[var(--ternary)] transition-colors">My Account</span>
                  </div>
                </Link>
              )}

              <span className="hidden lg:block w-px h-10 bg-white/10"></span>

              {/* Big Prominent Cart */}
              <Link href="/cart" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <ShoppingCart size={22} className="text-gray-300 group-hover:text-white" />
                  </div>
                  <span className="absolute -top-1 -right-1 bg-[var(--ternary)] text-white text-[10px] font-black h-[22px] min-w-[22px] px-1.5 rounded-full flex items-center justify-center shadow-md">
                    2
                  </span>
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-[11px] text-gray-400 font-medium">Total</span>
                  <span className="text-sm font-bold text-white group-hover:text-[var(--ternary)] transition-colors">$0.00</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile Search - Attached to Main Header */}
          <div className="md:hidden mt-4 relative w-full flex">
             <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-white text-gray-900 border-none rounded-l-md py-3 pl-4 pr-4 text-[14px] focus:outline-none"
              />
              <button className="bg-[var(--ternary)] text-white px-5 rounded-r-md flex items-center justify-center">
                <Search size={18} />
              </button>
          </div>
        </div>
      </div>

      {/* 3. Bottom Navigation - KEPT EXACTLY THE SAME as requested */}
      <div className="w-full bg-[var(--secondary)] border-t border-white/5 shadow-md">
        <div className="container mx-auto max-w-7xl relative">
          <nav className="flex items-center xl:justify-center gap-1 md:gap-2 lg:gap-4 overflow-x-auto no-scrollbar scroll-smooth w-full px-4">
            {navLinks.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname === item.href;

              return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative py-3.5 px-2 text-[13px] font-medium whitespace-nowrap transition-all group ${
                  isActive
                    ? "text-[var(--ternary)]"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.name}
                <div 
                  className={`absolute bottom-0 left-0 w-full h-[2px] transition-all duration-300 ${
                    isActive 
                      ? "bg-[var(--ternary)]" 
                      : "bg-transparent group-hover:bg-gray-600 scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            )})}
          </nav>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </header>
  );
}