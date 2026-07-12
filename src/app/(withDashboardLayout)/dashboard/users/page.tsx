"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useToast } from "@/contexts/ToastContext";
import { getAdminUsers, updateUserStatusAction, updateUserRoleAction } from "@/lib/api/user";
import { Loader2, Search, Users, ChevronLeft, ChevronRight, UserMinus, UserCheck, Shield } from "lucide-react";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function AdminUsersPage() {
  const { showToast } = useToast();
  const { data: session, isPending: isAuthPending } = authClient.useSession();
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isAdmin = (session?.user as any)?.role === "admin";
  const currentUserId = session?.user?.id;

  // Users and Pagination state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionProgressId, setActionProgressId] = useState<string | null>(null);
  
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const limit = 10;

  // Handle Search Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to page 1 on new search
    }, 400);

    return () => clearTimeout(handler);
  }, [search]);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await getAdminUsers(page, limit, debouncedSearch);
      if (res.success && Array.isArray(res.data)) {
        setUsers(res.data);
        setTotalPages(res.meta?.totalPages || 1);
        setTotalUsers(res.meta?.total || 0);
      } else {
        setError(res.message || "Failed to load users");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, page, debouncedSearch]);

  // Handle Status Change (Block/Unblock)
  const handleToggleStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "blocked" ? "active" : "blocked";
    setActionProgressId(userId + "-status");
    try {
      const res = await updateUserStatusAction(userId, newStatus);
      if (res.success) {
        setUsers(prev => prev.map(u => {
          const uId = u._id || u.id;
          if (uId === userId) {
            return { ...u, status: newStatus };
          }
          return u;
        }));
      } else {
        showToast(res.message || "Failed to update user status", "error");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showToast(err.message || "An unexpected error occurred", "error");
    } finally {
      setActionProgressId(null);
    }
  };

  // Handle Role Change (Admin/User)
  const handleRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
    setActionProgressId(userId + "-role");
    try {
      const res = await updateUserRoleAction(userId, newRole);
      if (res.success) {
        setUsers(prev => prev.map(u => {
          const uId = u._id || u.id;
          if (uId === userId) {
            return { ...u, role: newRole };
          }
          return u;
        }));
      } else {
        showToast(res.message || "Failed to update user role", "error");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showToast(err.message || "An unexpected error occurred", "error");
    } finally {
      setActionProgressId(null);
    }
  };

  if (isAuthPending) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--ternary)]" />
      </div>
    );
  }

  if (!session || !isAdmin) {
    redirect("/forbidden");
  }

  return (
    <div className="space-y-6 text-gray-900 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage, view, block, or change roles of users listed on the store.</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute inset-y-0 left-4 h-full w-4 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block h-10 w-full rounded-xl border border-gray-200 bg-white py-1.5 pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-[var(--ternary)] focus:ring-1 focus:ring-[var(--ternary)] outline-none text-sm transition-all shadow-sm"
          placeholder="Search users by name or email..."
        />
      </div>

      {isLoading ? (
        <div className="flex h-[40vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--ternary)]" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
          {error}
        </div>
      ) : users.length > 0 ? (
        <div className="space-y-4">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <th className="py-4 px-6">User</th>
                    <th className="py-4 px-6">Email</th>
                    <th className="py-4 px-6">Joined Date</th>
                    <th className="py-4 px-6">Role</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {users.map((user) => {
                    const userId = user.id || user._id?.$oid || user._id;
                    const isSelf = userId === currentUserId || user.email === session.user?.email;
                    const joinedDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : "N/A";
                    
                    return (
                      <tr key={userId} className="hover:bg-gray-50/30 transition-colors">
                        {/* User Profile Cell */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            {user.image ? (
                              <div className="relative h-10 w-10 rounded-full overflow-hidden shrink-0 border border-gray-100">
                                <Image
                                  src={user.image}
                                  alt={user.name || "User image"}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm shrink-0">
                                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                              </div>
                            )}
                            <div>
                              <span className="font-bold text-gray-900 block">
                                {user.name || "No name"} {isSelf && <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold ml-1 font-sans">You</span>}
                              </span>
                              <span className="text-[10px] text-gray-400 block font-medium">ID: {userId.substring(0, 10)}...</span>
                            </div>
                          </div>
                        </td>

                        {/* Email Cell */}
                        <td className="py-4 px-6 text-gray-600 font-semibold">{user.email}</td>

                        {/* Joined Date Cell */}
                        <td className="py-4 px-6 text-gray-500 font-semibold">{joinedDate}</td>

                        {/* Role Cell */}
                        <td className="py-4 px-6">
                          {isSelf ? (
                            <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                              <Shield size={12} />
                              {user.role}
                            </span>
                          ) : (
                            <div className="relative max-w-[120px]">
                              {actionProgressId === userId + "-role" ? (
                                <Loader2 size={16} className="animate-spin text-[var(--ternary)] ml-2" />
                              ) : (
                                <select
                                  value={user.role || "user"}
                                  onChange={(e) => handleRoleChange(userId, e.target.value as 'user' | 'admin')}
                                  className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-800 font-bold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[var(--ternary)] cursor-pointer"
                                >
                                  <option value="user">User</option>
                                  <option value="admin">Admin</option>
                                </select>
                              )}
                            </div>
                          )}
                        </td>

                        {/* Status Cell */}
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            user.status === "blocked" 
                              ? "bg-red-50 text-red-600" 
                              : "bg-green-50 text-green-700"
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${user.status === "blocked" ? "bg-red-500" : "bg-green-500"}`}></span>
                            {user.status || "active"}
                          </span>
                        </td>

                        {/* Actions Cell */}
                        <td className="py-4 px-6 text-right">
                          {isSelf ? (
                            <span className="text-xs text-gray-400 font-medium italic">Protected</span>
                          ) : actionProgressId === userId + "-status" ? (
                            <Loader2 size={18} className="animate-spin text-gray-400 ml-auto mr-4" />
                          ) : (
                            <button
                              onClick={() => handleToggleStatus(userId, user.status)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                                user.status === "blocked"
                                  ? "border-green-200 text-green-600 hover:bg-green-50"
                                  : "border-red-200 text-red-500 hover:bg-red-50"
                              }`}
                            >
                              {user.status === "blocked" ? (
                                <>
                                  <UserCheck size={13} />
                                  Unblock
                                </>
                              ) : (
                                <>
                                  <UserMinus size={13} />
                                  Block
                                </>
                              )}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-500">
              Showing <span className="text-gray-900">{(page - 1) * limit + 1}</span> to <span className="text-gray-900">{Math.min(page * limit, totalUsers)}</span> of <span className="text-gray-900">{totalUsers}</span> users
            </p>
            <div className="flex items-center gap-1">
              <button
                disabled={page <= 1}
                onClick={() => setPage(prev => prev - 1)}
                className="p-2 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:hover:bg-transparent text-gray-600 shrink-0"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`h-9 w-9 rounded-xl border text-xs font-bold transition-all ${
                      page === pageNum
                        ? "border-[var(--ternary)] bg-[var(--ternary)] text-white shadow-sm"
                        : "border-gray-200 hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(prev => prev + 1)}
                className="p-2 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:hover:bg-transparent text-gray-600 shrink-0"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-2xl border border-gray-100 px-4 shadow-sm">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
            <Users size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No Users Found</h3>
          <p className="text-gray-500 text-sm max-w-sm mb-6 leading-relaxed">
            There are no user accounts matching your search filter. Try writing another query.
          </p>
          <button 
            onClick={() => setSearch("")} 
            className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2.5 rounded-xl font-bold text-sm transition-all"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}
