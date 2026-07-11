"use client";
import { useState } from "react";
import {
  Menu,
  Search,
  Bell,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useSidebar } from "./SidebarProvider";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function DashboardNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setSidebarOpen } = useSidebar();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 bg-[var(--primary)] items-center gap-x-4 border-b border-gray-800 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 transition-colors duration-300">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-400 lg:hidden hover:bg-gray-800 hover:text-white rounded-xl transition-colors"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form
          className="relative flex flex-1 items-center"
          action="#"
          method="GET"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <div className="relative w-full max-w-md">
            <Search
              className="pointer-events-none absolute inset-y-0 left-4 h-full w-4 text-gray-500"
              aria-hidden="true"
            />
            <input
              id="search-field"
              className="block h-10 w-full rounded-full border border-gray-800 bg-[#2a2b36] py-1.5 pl-11 pr-4 text-white placeholder:text-gray-500 focus:border-[var(--ternary)] focus:ring-1 focus:ring-[var(--ternary)] outline-none sm:text-sm sm:leading-6 transition-all font-medium shadow-sm"
              placeholder="Search anything..."
              type="search"
              name="search"
            />
          </div>
        </form>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            className="relative p-2 text-gray-400 hover:text-white transition-colors bg-[#2a2b36] border border-gray-800 shadow-sm rounded-full hover:bg-gray-800"
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-5 w-5" aria-hidden="true" />
            <span className="absolute top-1 right-1.5 h-2.5 w-2.5 rounded-full bg-[var(--ternary)] ring-2 ring-[var(--primary)] shadow-sm"></span>
          </button>

          {/* Separator */}
          <div
            className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-800"
            aria-hidden="true"
          />

          {/* Profile dropdown / Auth Loader */}
          <div className="relative">
            {isPending ? (
              <div className="flex items-center gap-3 animate-pulse">
                <div className="h-9 w-9 rounded-full bg-gray-800 border border-gray-700"></div>
                <div className="hidden lg:flex flex-col gap-1">
                  <div className="h-4 w-20 bg-gray-800 rounded"></div>
                  <div className="h-3 w-12 bg-gray-800 rounded"></div>
                </div>
              </div>
            ) : user ? (
              <>
                <button
                  type="button"
                  className="-m-1.5 flex items-center p-1.5 hover:bg-gray-800 rounded-full lg:rounded-xl transition-colors"
                  id="user-menu-button"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  {user.image ? (
                    <Image
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full shadow-sm object-cover border border-gray-700"
                      src={user.image}
                      alt={user.name || "User Avatar"}
                    />
                  ) : (
                    <div className="h-9 w-9 rounded-full bg-[#2a2b36] border border-gray-700 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}

                  <span className="hidden lg:flex lg:items-center">
                    <span
                      className="ml-3 text-sm font-bold leading-6 text-white"
                      aria-hidden="true"
                    >
                      {user.name || "User"}
                    </span>
                    <span className="ml-2 rounded-full bg-[var(--ternary)]/10 px-2.5 py-0.5 text-[10px] font-bold text-[var(--ternary)] ring-1 ring-inset ring-[var(--ternary)]/20 uppercase tracking-wider">
                      {/* Using any custom additional fields if they exist, else default */}
                      {(user as any).role || "User"}
                    </span>
                  </span>
                </button>

                {isDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsDropdownOpen(false)}
                    ></div>
                    <div
                      className="absolute right-0 z-20 mt-2.5 w-56 origin-top-right rounded-2xl bg-[#1f2029] border border-gray-800 py-2 shadow-xl focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex={-1}
                    >
                      <div className="px-4 py-3 border-b border-gray-800 mb-1 lg:hidden">
                        <p className="text-sm font-bold text-white">
                          {user.name || "User"}
                        </p>
                        <p className="text-xs font-semibold text-gray-400 mt-1 uppercase">
                          {(user as any).role || "User"}
                        </p>
                      </div>
                      <Link
                        href="/dashboard/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                        role="menuitem"
                        tabIndex={-1}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <UserIcon className="h-4 w-4" />
                        Your profile
                      </Link>
                      <button
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-colors mt-1 border-t border-gray-800 pt-2 cursor-pointer"
                        role="menuitem"
                        tabIndex={-1}
                        onClick={async () => {
                          setIsDropdownOpen(false);
                          await authClient.signOut();
                          window.location.href = "/login";
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  </>
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
