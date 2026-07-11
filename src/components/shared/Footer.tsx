import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[var(--primary)] text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <div className="flex flex-col items-start leading-none">
                <div className="flex items-center text-3xl font-bold tracking-tighter text-white">
                  <span>G</span>
                  <span className="text-[var(--ternary)] -mx-0.5">&</span>
                  <span>S</span>
                </div>
                <span className="text-[9px] uppercase tracking-widest text-gray-400 mt-0.5">
                  Gadget & store
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your ultimate destination for cutting-edge technology. We provide the latest authentic gadgets, phones, and accessories since 2011.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="h-10 w-10 rounded-full bg-[#2a2b36] flex items-center justify-center text-white hover:bg-[var(--ternary)] transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.324V1.325C24 .597 23.403 0 22.675 0z"/></svg>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-[#2a2b36] flex items-center justify-center text-white hover:bg-[var(--ternary)] transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-[#2a2b36] flex items-center justify-center text-white hover:bg-[var(--ternary)] transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-[#2a2b36] flex items-center justify-center text-white hover:bg-[var(--ternary)] transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[var(--ternary)] rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {['Phones', 'Mac', 'Tablets', 'Watches', 'Gaming', 'Accessories'].map((link) => (
                <li key={link}>
                  <Link href={`/category/${link.toLowerCase()}`} className="text-sm hover:text-[var(--ternary)] transition-colors flex items-center gap-2 group">
                    <span className="h-1 w-1 bg-gray-500 rounded-full group-hover:bg-[var(--ternary)] transition-colors"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Customer Support
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[var(--ternary)] rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {['Contact Us', 'Store Locator', 'Track Order', 'Return Policy', 'Warranty info', 'FAQs'].map((link) => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase().replace(' ', '-')}`} className="text-sm hover:text-[var(--ternary)] transition-colors flex items-center gap-2 group">
                    <span className="h-1 w-1 bg-gray-500 rounded-full group-hover:bg-[var(--ternary)] transition-colors"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Get in Touch
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[var(--ternary)] rounded-full"></span>
            </h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[var(--ternary)] shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">123 Tech Avenue, Gadget City, GC 10010</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[var(--ternary)] shrink-0" />
                <span className="text-sm text-gray-400">+1 234 567 8900</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[var(--ternary)] shrink-0" />
                <span className="text-sm text-gray-400">support@gadgetstore.com</span>
              </li>
            </ul>
            
            <form className="relative">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-[#2a2b36] text-white rounded-lg py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--ternary)] border border-gray-700"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-[var(--ternary)] hover:bg-orange-600 rounded flex items-center justify-center text-white transition-colors"
                aria-label="Subscribe"
              >
                <Mail size={14} />
              </button>
            </form>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 text-center md:text-left">
            &copy; {currentYear} Gadget & Store. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
