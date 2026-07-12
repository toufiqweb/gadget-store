"use server";

import { serverFetch, protectedFetch } from "../core/server";

import { ProductQueryParams } from "@/types";

/**
 * Publicly fetch all products (e.g., for the store catalog)
 */
export const getAllProducts = async (queryParams: ProductQueryParams = {}) => {
  const { page, limit, search, category, sort } = queryParams;
  const params = new URLSearchParams();

  if (page) params.append("page", String(page));
  if (limit) params.append("limit", String(limit));
  if (search) params.append("search", search);
  if (category) params.append("category", category);
  if (sort) params.append("sort", sort);

  const queryString = params.toString();
  const path = queryString ? `/api/products?${queryString}` : "/api/products";
  
  return serverFetch(path);
};

/**
 * Publicly fetch a specific product by ID
 */
export const getProductById = async (id: string) => {
  return serverFetch(`/api/products/${id}`, {}, { cache: 'no-store' });
};


/**
 * Protected fetch to get a user's order history
 */
export const getMyOrdersClient = async (userId: string, page = 1, limit = 10) => {
  return protectedFetch(
    `/api/orders/my-orders?page=${page}&limit=${limit}`,
    { "x-user-id": userId }
  );
};

/**
 * Protected fetch to get current user's products
 */
export const getMyProducts = async () => {
  return protectedFetch("/api/products/user/my-products", {}, { cache: 'no-store' });
};
