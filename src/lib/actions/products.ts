"use server";

import { serverMutation } from "../core/server";

/**
 * Protected mutation to create a new product
 */
export const createProductAction = async (productData: any) => {
  return serverMutation(
    "/api/products", 
    productData, 
    "POST"
  );
};


/**
 * Protected mutation to patch a product
 */
export const patchProductAction = async (productId: string, productData: any) => {
  return serverMutation(
    `/api/products/${productId}`, 
    productData, 
    "PATCH"
  );
};

/**
 * Protected mutation to delete a product
 */
export const deleteProductAction = async (productId: string) => {
  return serverMutation(
    `/api/products/${productId}`, 
    {}, 
    "DELETE"
  );
};
