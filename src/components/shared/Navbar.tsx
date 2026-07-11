"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, MapPin, ShoppingCart, User, LogOut, LayoutDashboard, UserCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { 
    data: session, 
    isPending,
  } = authClient.useSession();

  useEffect(() => {
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
    { name: "Phones", active: true },
    { name: "Mac", active: false },
    { name: "Phone Accessories", active: false },
    { name: "Tablets", active: false },
    { name: "Cases & Protectors", active: false },
    { name: "Watches", active: false },
    { name: "Headphone & Speaker", active: false },
    { name: "PC Accessories", active: false },
    { name: "Camera", active: false },
    { name: "Gadget", active: false },
    { name: "Networking", active: false },
    { name: "Gaming", active: false },
    { name: "Drone", active: false },
  ];

  return (
    <header className="w-full">
      {/* Top Header */}
      <div className="w-full bg-[var(--primary)] text-white py-3">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            {/* Logo Area */}
            <div className="flex items-center gap-3 shrink-0">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex flex-col items-center leading-none">
                  <div className="flex items-center text-3xl font-bold tracking-tighter">
                    <span>G</span>
                    <span className="text-[var(--ternary)] -mx-0.5">&</span>
                    <span>S</span>
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-gray-300 mt-0.5">
                    Gadget & store
                  </span>
                </div>
                <div className="flex items-center h-8 ml-1">
                  <span className="h-full w-px bg-blue-600 mr-2"></span>
                  <span className="text-xs font-medium tracking-widest text-gray-300">
                    SINCE 2011
                  </span>
                </div>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl hidden md:block">
              <div className="relative w-full group">
                <input
                  type="text"
                  placeholder="Search products"
                  className="w-full bg-white text-gray-900 rounded-full py-2.5 pl-5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ternary)] transition-all"
                />
                <button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--ternary)] hover:scale-110 transition-transform"
                  aria-label="Search"
                >
                  <Search size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 xl:gap-6 shrink-0">
              <Link 
                href="/offers" 
                className="text-[var(--ternary)] font-medium text-sm hover:underline hidden lg:block"
              >
                Offers
              </Link>

              <div className="flex items-center gap-3">
                <Link 
                  href="/store-locator" 
                  className="flex items-center gap-2 bg-[#2a2b36] hover:bg-[#353642] text-sm py-2 px-4 rounded-md transition-colors h-10"
                >
                  <MapPin size={18} />
                  <span>Store Locator</span>
                </Link>

                <div className="hidden xl:flex flex-col justify-center h-10">
                  <span className="text-[10px] text-gray-400 leading-none">Find Us On</span>
                  <Link href="/apple-store" className="text-xs text-[#3b82f6] hover:underline leading-tight">
                    Apple Store Locator
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  className="bg-[#2a2b36] hover:bg-[#353642] p-2.5 rounded-md transition-colors h-10 w-10 flex items-center justify-center"
                  aria-label="Cart"
                >
                  <ShoppingCart size={18} />
                </button>
                {isPending ? (
                  <div className="bg-[#2a2b36] rounded-md h-10 w-10 animate-pulse"></div>
                ) : session?.user ? (
                  <div className="relative" ref={dropdownRef}>
                    <button 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="h-10 w-10 rounded-md overflow-hidden bg-[#2a2b36] flex items-center justify-center border border-gray-600 hover:border-[var(--ternary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ternary)]"
                    >
                      {session.user.image ? (
                        <img src={session.user.image} alt={session.user.name} className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-white font-bold text-sm uppercase">{session.user.name.charAt(0)}</span>
                      )}
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-3 w-56 bg-[var(--primary)] rounded-xl shadow-2xl py-2 z-50 border border-gray-800 text-gray-200 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                        <div className="px-4 py-3 border-b border-gray-800 mb-1">
                          <p className="text-sm font-bold text-white truncate">{session.user.name}</p>
                          <p className="text-xs text-gray-400 truncate mt-0.5">{session.user.email}</p>
                        </div>
                        
                        <Link 
                          href="/profile" 
                          className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[#2a2b36] hover:text-[var(--ternary)] transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <UserCircle size={18} />
                          <span className="font-medium">Profile</span>
                        </Link>
                        
                        <Link 
                          href="/dashboard" 
                          className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[#2a2b36] hover:text-[var(--ternary)] transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <LayoutDashboard size={18} />
                          <span className="font-medium">Dashboard</span>
                        </Link>
                        
                        <div className="h-px bg-gray-800 my-1.5 mx-3"></div>
                        
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 hover:text-red-400 transition-colors text-left"
                        >
                          <LogOut size={18} />
                          <span className="font-medium">Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link 
                    href="/login"
                    className="bg-[#2a2b36] hover:bg-[#353642] p-2.5 rounded-md transition-colors h-10 w-10 flex items-center justify-center"
                    aria-label="User Profile"
                  >
                    <User size={18} />
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search - Visible only on small screens */}
          <div className="md:hidden mt-3 relative w-full group">
             <input
                type="text"
                placeholder="Search products"
                className="w-full bg-white text-gray-900 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ternary)] transition-all"
              />
              <button 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ternary)] hover:scale-110 transition-transform"
                aria-label="Search"
              >
                <Search size={18} strokeWidth={2.5} />
              </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="w-full bg-[var(--secondary)] border-b border-black">
        <div className="container mx-auto max-w-7xl relative">
          <nav className="flex items-center overflow-x-auto no-scrollbar scroll-smooth w-full">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={`/category/${item.name.toLowerCase().replace(/ /g, "-")}`}
                className={`relative px-4 py-3.5 text-[13px] font-medium whitespace-nowrap transition-colors group ${
                  item.active
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.name}
                {/* Active indicator or Hover effect */}
                <div 
                  className={`absolute bottom-0 left-0 w-full h-[2px] transition-all duration-300 ${
                    item.active 
                      ? "bg-[var(--ternary)] shadow-[0_0_8px_rgba(242,110,33,0.8)]" 
                      : "bg-transparent group-hover:bg-gray-600"
                  }`}
                />
              </Link>
            ))}
          </nav>
        </div>
      </div>
      
      {/* Hide scrollbar for the nav but keep it scrollable */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}} />
    </header>
  );
}
