"use client";

import { useEffect, useState } from "react";
import { getUserStats } from "@/lib/api/product";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from "recharts";
import {
  Package, Star, DollarSign, TrendingUp, Loader2, ExternalLink,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PIE_COLORS = [
  "#f26e21", "#6366f1", "#10b981", "#f59e0b",
  "#3b82f6", "#ef4444", "#8b5cf6", "#ec4899",
];

// ── Stat card ──────────────────────────────────────────────────────────────────
function StatCard({
  label, value, sub, icon: Icon, accent = "orange",
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  accent?: "orange" | "indigo" | "green" | "yellow";
}) {
  const accentClasses = {
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    green:  "bg-emerald-50 text-emerald-600 border-emerald-100",
    yellow: "bg-yellow-50 text-yellow-600 border-yellow-100",
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex items-start gap-4">
      <div className={`p-3 rounded-xl border ${accentClasses[accent]}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
      </div>
    </div>
  );
}

// ── Custom Tooltip ─────────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-4 py-3 text-sm">
      <p className="font-bold text-gray-700 mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }} className="font-medium">
          {p.name}: <span className="text-gray-900">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function UserOverview({ userName }: { userName?: string }) {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUserStats()
      .then((res) => {
        if (res?.success) setStats(res.data);
        else setError("Failed to load your stats.");
      })
      .catch(() => setError("Could not connect to the server."))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--ternary)]" />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-red-500 font-medium">{error || "No data available."}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-gray-900">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back{userName ? `, ${userName.split(" ")[0]}` : ""}! 👋
        </h1>
        <p className="text-sm text-gray-500 mt-1">Here&apos;s a summary of your listings and activity.</p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="My Products"
          value={stats.totalMyProducts.toLocaleString()}
          sub="Total listings you have created"
          icon={Package}
          accent="orange"
        />
        <StatCard
          label="Total Stock Value"
          value={`$${stats.totalStockValue.toLocaleString()}`}
          sub="Price × stock across all listings"
          icon={DollarSign}
          accent="green"
        />
        <StatCard
          label="Average Rating"
          value={stats.avgRating > 0 ? `${stats.avgRating} / 5` : "N/A"}
          sub="Average rating across your products"
          icon={Star}
          accent="yellow"
        />
      </div>

      {/* ── Charts row ── */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly products */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
            <TrendingUp size={18} className="text-[var(--ternary)]" />
            My Products Added (Last 6 Months)
          </h3>
          <p className="text-xs text-gray-400 mb-5">Number of products you listed each month</p>
          {stats.monthlyProducts.length === 0 ? (
            <div className="flex h-48 items-center justify-center text-gray-400 text-sm">
              No data yet — start adding products!
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={stats.monthlyProducts} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="products" name="Products" fill="#f26e21" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Category pie */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
            <Package size={18} className="text-indigo-500" />
            My Products by Category
          </h3>
          <p className="text-xs text-gray-400 mb-5">How your listings are distributed by category</p>
          {stats.categoryBreakdown.length === 0 ? (
            <div className="flex h-48 items-center justify-center text-gray-400 text-sm">
              No listings yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={stats.categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  dataKey="value"
                  nameKey="name"
                  paddingAngle={3}
                >
                  {stats.categoryBreakdown.map((_: any, index: number) => (
                    <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any, name: any) => [`${value} product${Number(value) > 1 ? "s" : ""}`, name]}
                />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* ── Recent Products table ── */}
      {stats.recentProducts.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Recent Listings</h3>
            <Link
              href="/dashboard/my-products"
              className="text-sm text-[var(--ternary)] font-medium hover:underline flex items-center gap-1"
            >
              View all <ExternalLink size={14} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {stats.recentProducts.map((product: any) => {
              const productId = product._id?.$oid || product._id || product.id;
              return (
                <div key={productId} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                    {product.thumbnail ? (
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <Package size={20} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{product.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{product.category}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-gray-900 text-sm">${Number(product.price).toLocaleString()}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Stock: {product.stock ?? "—"}</p>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 shrink-0">
                    <Star size={13} fill="currentColor" />
                    <span className="text-xs font-bold text-gray-700">{Number(product.rating).toFixed(1)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty state */}
      {stats.totalMyProducts === 0 && (
        <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package size={30} className="text-[var(--ternary)]" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No Products Yet</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
            You haven&apos;t added any products yet. Start listing your gadgets on the store.
          </p>
          <Link
            href="/dashboard/add-product"
            className="inline-flex items-center gap-2 bg-[var(--ternary)] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors"
          >
            Add Your First Product
          </Link>
        </div>
      )}
    </div>
  );
}
