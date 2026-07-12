"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  User,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  CreditCard,
  PackagePlus
} from "lucide-react";
import { useSidebar } from "./SidebarProvider";
import { authClient } from "@/lib/auth-client";

const adminLinks = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { name: "Products", href: "/dashboard/products", icon: Package },
  { name: "My Products", href: "/dashboard/my-products", icon: Package },
  { name: "Add Product", href: "/dashboard/add-product", icon: PackagePlus },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const userLinks = [
   { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { name: "My Products", href: "/dashboard/my-products", icon: Package },
  { name: "Add Product", href: "/dashboard/add-product", icon: PackagePlus },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { data: session } = authClient.useSession();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isAdmin = (session?.user as any)?.role === "admin";
  const currentLinks = isAdmin ? adminLinks : userLinks;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderNavItem = (item: any) => {
    const Icon = item.icon;
    const isActive = item.href === "/dashboard" ? pathname === item.href : (pathname === item.href || pathname.startsWith(item.href + '/'));

    return (
      <Link
        key={item.name}
        href={item.href}
        className={`group relative flex items-center gap-3 px-3 py-2.5 transition-all duration-200 ${
          isActive
            ? "bg-[var(--ternary)] text-white"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }`}
        style={{ borderRadius: "8px" }}
        onClick={() => setSidebarOpen(false)}
      >
        <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className="shrink-0" />

        {!isCollapsed && (
          <span className="text-[13px] font-semibold truncate">{item.name}</span>
        )}

        {/* Tooltip for collapsed state */}
        {isCollapsed && (
          <div className="absolute left-full ml-4 rounded-md bg-gray-900 px-2.5 py-1.5 text-[11px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none z-50 shadow-xl whitespace-nowrap">
            {item.name}
          </div>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-gray-100 transform transition-all duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isCollapsed ? "lg:w-[72px] w-[260px]" : "w-[260px]"}`}
      >
        {/* Top Header Logo Area */}
        <div
          className={`flex shrink-0 ${isCollapsed ? "flex-col items-center py-5 gap-5" : "h-[72px] items-center justify-between px-4"}`}
        >
          <Link
            href="/"
            className="flex items-center gap-3 overflow-hidden active:scale-95 transition-transform"
          >
            {isCollapsed ? (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center font-bold text-[var(--ternary)] text-xl border-2 border-[var(--ternary)] rounded-lg">
                G
              </div>
            ) : (
              <div className="flex flex-col group">
                <div className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight leading-none group-hover:text-[var(--ternary)] transition-colors">
                  GADGET<span className="text-[var(--ternary)]">.</span>
                </div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-1">
                  Store
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle */}
          <button
            className="hidden lg:flex text-gray-400 hover:text-gray-900 transition-colors rounded-lg p-1.5 hover:bg-gray-50 shrink-0"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <PanelLeftOpen size={18} />
            ) : (
              <PanelLeftClose size={18} />
            )}
          </button>

          {/* Mobile Close Button */}
          <button
            className="lg:hidden text-gray-400 hover:text-gray-900 transition-colors rounded-lg p-1.5 hover:bg-gray-50"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Links Area */}
        <div className="flex-1 overflow-y-auto py-2 px-3 space-y-1 no-scrollbar">
          {!isCollapsed && (
            <div className="px-3 mb-2 mt-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Menu
            </div>
          )}
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {currentLinks.map((item: any) => renderNavItem(item))}
        </div>
      </aside>
    </>
  );
}
