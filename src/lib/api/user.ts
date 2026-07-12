"use server";

import { protectedFetch, serverMutation } from "../core/server";

/**
 * Get all users as an admin (paginated + search support)
 */
export const getAdminUsers = async (page = 1, limit = 10, search = "") => {
  const queryParams = `?page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ""}`;
  return protectedFetch(`/api/admin/users${queryParams}`, {}, { cache: 'no-store' });
};

/**
 * Update user status as an admin (block/unblock)
 */
export const updateUserStatusAction = async (userId: string, status: 'active' | 'blocked') => {
  return serverMutation(
    `/api/admin/users/${userId}/status`,
    { status },
    "PATCH"
  );
};

/**
 * Update user role as an admin (user/admin)
 */
export const updateUserRoleAction = async (userId: string, role: 'user' | 'admin') => {
  return serverMutation(
    `/api/admin/users/${userId}/role`,
    { role },
    "PATCH"
  );
};

/**
 * Get current user profile details
 */
export const getUserProfile = async () => {
  return protectedFetch("/api/users/profile", {}, { cache: 'no-store' });
};

/**
 * Update current user profile details
 */
export const updateUserProfile = async (profileData: {
  name?: string;
  image?: string;
  bio?: string;
  phoneNumber?: string;
  location?: string;
}) => {
  return serverMutation(
    "/api/users/profile",
    profileData,
    "PATCH"
  );
};
