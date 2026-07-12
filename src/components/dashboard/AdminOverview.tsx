"use client";

import { useEffect, useState } from "react";
import { getAdminStats } from "@/lib/api/product";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from "recharts";
import {
  Package, Users, ShieldCheck, UserX, TrendingUp, DollarSign, Loader2,
} from "lucide-react";

// ── Colour palette for pie slices ────────────────────────────────────────────
const PIE_COLORS = [
  "#f26e21", "#191a20", "#6366f1", "#10b981",
  "#f59e0b", "#3b82f6", "#ef4444", "#8b5cf6",
];

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({
  label, value, sub, icon: Icon, accent = "orange",
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  accent?: "orange" | "indigo" | "green" | "red";
}) {
  const accentClasses = {
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    green:  "bg-emerald-50 text-emerald-600 border-emerald-100",
    red:    "bg-red-50 text-red-600 border-red-100",
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

// ── Custom Tooltip ────────────────────────────────────────────────────────────
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
export default function AdminOverview() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAdminStats()
      .then((res) => {
        if (res?.success) setStats(res.data);
        else setError("Failed to load dashboard stats.");
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
        <h1 className="text-2xl font-bold tracking-tight">Admin Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Platform-wide analytics and insights.</p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Products"
          value={stats.totalProducts.toLocaleString()}
          sub="All listings on the platform"
          icon={Package}
          accent="orange"
        />
        <StatCard
          label="Total Users"
          value={stats.totalUsers.toLocaleString()}
          sub={`${stats.activeUsers} active users`}
          icon={Users}
          accent="indigo"
        />
        <StatCard
          label="Admin Users"
          value={stats.adminUsers.toLocaleString()}
          sub="With admin privileges"
          icon={ShieldCheck}
          accent="green"
        />
        <StatCard
          label="Blocked Users"
          value={stats.blockedUsers.toLocaleString()}
          sub="Suspended accounts"
          icon={UserX}
          accent="red"
        />
      </div>

      {/* ── Charts row 1 ── */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly products added */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
            <TrendingUp size={18} className="text-[var(--ternary)]" />
            Products Added (Last 6 Months)
          </h3>
          <p className="text-xs text-gray-400 mb-5">Monthly listing growth across the platform</p>
          {stats.monthlyProducts.length === 0 ? (
            <div className="flex h-48 items-center justify-center text-gray-400 text-sm">No data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={stats.monthlyProducts} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="products"
                  name="Products"
                  stroke="#f26e21"
                  strokeWidth={2.5}
                  dot={{ fill: "#f26e21", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Category breakdown pie */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
            <Package size={18} className="text-indigo-500" />
            Products by Category
          </h3>
          <p className="text-xs text-gray-400 mb-5">Distribution across all product categories</p>
          {stats.categoryBreakdown.length === 0 ? (
            <div className="flex h-48 items-center justify-center text-gray-400 text-sm">No data yet</div>
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
                  formatter={(value: number, name: string) => [`${value} products`, name]}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* ── Charts row 2 ── */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
          <DollarSign size={18} className="text-emerald-500" />
          Average Price by Category
        </h3>
        <p className="text-xs text-gray-400 mb-5">Average listed price across top categories</p>
        {stats.avgPriceByCategory.length === 0 ? (
          <div className="flex h-48 items-center justify-center text-gray-400 text-sm">No data yet</div>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={stats.avgPriceByCategory} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v}`} />
              <Tooltip
                content={<CustomTooltip />}
                formatter={(v: number) => [`$${v.toLocaleString()}`, "Avg Price"]}
              />
              <Bar dataKey="avgPrice" name="Avg Price" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ── User status breakdown ── */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users size={18} className="text-[var(--ternary)]" />
          User Status Breakdown
        </h3>
        <div className="flex items-center gap-8">
          {[
            { label: "Active Users", count: stats.activeUsers, color: "bg-emerald-500" },
            { label: "Blocked Users", count: stats.blockedUsers, color: "bg-red-500" },
            { label: "Admin Users", count: stats.adminUsers, color: "bg-indigo-500" },
          ].map((item) => {
            const pct = stats.totalUsers ? Math.round((item.count / stats.totalUsers) * 100) : 0;
            return (
              <div key={item.label} className="flex-1">
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-gray-700">{item.label}</span>
                  <span className="text-gray-500 font-bold">{pct}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${pct}%`, transition: "width 0.8s ease" }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">{item.count.toLocaleString()} users</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
