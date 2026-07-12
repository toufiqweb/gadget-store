import React from 'react';

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-6 text-gray-900">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Overview</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* White cards with light border and shadow */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-gray-500">Total Revenue</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900">$45,231.89</div>
          <p className="text-xs text-gray-400 mt-1">+20.1% from last month</p>
        </div>
        
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-gray-500">Orders</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900">+2350</div>
          <p className="text-xs text-gray-400 mt-1">+180.1% from last month</p>
        </div>
        
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-gray-500">Active Customers</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900">+12,234</div>
          <p className="text-xs text-gray-400 mt-1">+19% from last month</p>
        </div>
        
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-gray-500">Active Now</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900">+573</div>
          <p className="text-xs text-gray-400 mt-1">+201 since last hour</p>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-4 min-h-[300px] p-6">
            <h3 className="tracking-tight text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="text-sm text-gray-500 flex h-full items-center justify-center pt-10 pb-10">
               No recent activity to display.
            </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-3 min-h-[300px] p-6">
            <h3 className="tracking-tight text-lg font-semibold text-gray-900 mb-4">Recent Sales</h3>
            <div className="text-sm text-gray-500 flex h-full items-center justify-center pt-10 pb-10">
               No recent sales to display.
            </div>
        </div>
      </div>
    </div>
  );
}
