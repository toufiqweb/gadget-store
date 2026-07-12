"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getAdminProducts } from "@/lib/api/product";
import { deleteProductAction, patchProductAction } from "@/lib/actions/products";
import { Loader2, Search, Edit, Trash2, X, Plus, AlertTriangle, ChevronLeft, ChevronRight, Star, PackageOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AdminProductsPage() {
  const { data: session, isPending: isAuthPending } = authClient.useSession();
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isAdmin = (session?.user as any)?.role === "admin";

  // Products and Pagination state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 10;

  // Edit / Delete Modal states
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [productToDelete, setProductToDelete] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [productToEdit, setProductToEdit] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    rating: "",
    shortDescription: "",
    fullDescription: "",
    specifications: "",
    thumbnail: "",
    images: "",
  });

  // Handle Search Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to page 1 on new search
    }, 400);

    return () => clearTimeout(handler);
  }, [search]);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await getAdminProducts(page, limit, debouncedSearch);
      if (res.success && Array.isArray(res.data)) {
        setProducts(res.data);
        setTotalPages(res.meta?.totalPages || 1);
        setTotalProducts(res.meta?.total || 0);
      } else {
        setError(res.message || "Failed to load products");
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
      fetchProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, page, debouncedSearch]);

  // Edit Click Handler
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditClick = (product: any) => {
    setProductToEdit(product);
    setEditError(null);
    setEditFormData({
      title: product.title || "",
      brand: product.brand || "",
      category: product.category || "",
      price: product.price?.toString() || "",
      stock: product.stock?.toString() || "",
      rating: product.rating?.toString() || "",
      shortDescription: product.shortDescription || "",
      fullDescription: product.fullDescription || "",
      specifications: product.specifications || "",
      thumbnail: product.thumbnail || "",
      images: Array.isArray(product.images) ? product.images.join(", ") : "",
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productToEdit) return;

    setIsSaving(true);
    setEditError(null);

    const productId = productToEdit._id?.$oid || productToEdit._id || productToEdit.id;

    try {
      const processedData = {
        ...editFormData,
        price: Number(editFormData.price),
        stock: Number(editFormData.stock),
        rating: Number(editFormData.rating) || 0,
        images: editFormData.images.split(",").map((img) => img.trim()).filter(Boolean),
      };

      await patchProductAction(productId, processedData);
      
      // Update local state directly
      setProducts(prev => prev.map(p => {
        const id = p._id?.$oid || p._id || p.id;
        if (id === productId) {
          return { ...p, ...processedData };
        }
        return p;
      }));

      setProductToEdit(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setEditError(err.message || "Failed to update product. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Action Handlers
  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);

    const productId = productToDelete._id?.$oid || productToDelete._id || productToDelete.id;

    try {
      await deleteProductAction(productId);
      
      // Refresh local state or remove
      setProducts(prev => prev.filter(p => {
        const id = p._id?.$oid || p._id || p.id;
        return id !== productId;
      }));
      setTotalProducts(prev => Math.max(0, prev - 1));
      setProductToDelete(null);

      // If we deleted the last item on the page, go back a page
      if (products.length === 1 && page > 1) {
        setPage(prev => prev - 1);
      } else {
        // fetch to get replacement item for paginated page bounds
        fetchProducts();
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.message || "Failed to delete product. Please try again.");
    } finally {
      setIsDeleting(false);
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
    return (
      <div className="flex flex-col h-[60vh] items-center justify-center text-gray-900">
        <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
        <p className="text-gray-500">Admin credentials are required to view this page.</p>
        <Link href="/dashboard" className="mt-6 bg-[var(--ternary)] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const modalInputStyles = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[var(--ternary)] focus:border-[var(--ternary)] transition-colors";

  return (
    <div className="space-y-6 text-gray-900 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Products Directory</h1>
          <p className="text-sm text-gray-500 mt-1">Global catalog listing management for the store.</p>
        </div>
        <Link 
          href="/dashboard/add-product" 
          className="inline-flex items-center gap-2 bg-[var(--ternary)] hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm active:scale-95 shrink-0 w-fit"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {/* Filters/Search Bar */}
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute inset-y-0 left-4 h-full w-4 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block h-10 w-full rounded-xl border border-gray-200 bg-white py-1.5 pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-[var(--ternary)] focus:ring-1 focus:ring-[var(--ternary)] outline-none text-sm transition-all shadow-sm"
          placeholder="Search product by title, brand, or category..."
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
      ) : products.length > 0 ? (
        <div className="space-y-4">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <th className="py-4 px-6">Product</th>
                    <th className="py-4 px-6">Brand</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Price</th>
                    <th className="py-4 px-6">Stock</th>
                    <th className="py-4 px-6">Rating</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {products.map((product) => {
                    const productId = product._id?.$oid || product._id || product.id;
                    return (
                      <tr key={productId} className="hover:bg-gray-50/30 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0">
                              <Image
                                src={product.thumbnail || "https://placehold.co/100x100?text=No+Image"}
                                alt={product.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <Link 
                                href={`/products/${productId}`} 
                                className="font-bold text-gray-900 hover:text-[var(--ternary)] transition-colors line-clamp-1"
                              >
                                {product.title}
                              </Link>
                              <span className="text-xs text-gray-455 block mt-0.5 font-medium">ID: {productId.toString().substring(0, 10)}...</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-semibold text-gray-600">{product.brand}</td>
                        <td className="py-4 px-6">
                          <span className="bg-gray-100 text-gray-800 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                            {product.category}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-bold text-gray-900">${Number(product.price).toLocaleString()}</td>
                        <td className="py-4 px-6 font-semibold">
                          <span className={product.stock > 0 ? "text-gray-900" : "text-red-500 font-bold"}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-1">
                            <Star size={14} className="text-yellow-400" fill="currentColor" />
                            <span className="font-bold text-gray-900">{product.rating ? Number(product.rating).toFixed(1) : "0.0"}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEditClick(product)}
                              className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
                              title="Edit Product"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => setProductToDelete(product)}
                              className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
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
              Showing <span className="text-gray-900">{(page - 1) * limit + 1}</span> to <span className="text-gray-900">{Math.min(page * limit, totalProducts)}</span> of <span className="text-gray-900">{totalProducts}</span> products
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
            <PackageOpen size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No Products Found</h3>
          <p className="text-gray-500 text-sm max-w-sm mb-6 leading-relaxed">
            There are no products matching your search term. Try clear query or write another name.
          </p>
          <button 
            onClick={() => setSearch("")} 
            className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2.5 rounded-xl font-bold text-sm transition-all"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-gray-100 max-w-md w-full rounded-2xl p-6 md:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setProductToDelete(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <AlertTriangle size={32} />
              <h3 className="text-xl font-bold">Delete Product?</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Are you sure you want to delete <strong className="text-gray-900">&quot;{productToDelete.title}&quot;</strong>? This action is permanent and cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                type="button" 
                onClick={() => setProductToDelete(null)} 
                className="px-5 py-2.5 rounded-xl font-medium text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors text-sm"
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-red-500 hover:bg-red-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isDeleting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Product"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {productToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white border border-gray-100 max-w-3xl w-full rounded-2xl p-6 md:p-8 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setProductToEdit(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <X size={20} />
            </button>
            
            <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-3 flex items-center gap-2">
              <Edit size={20} className="text-[var(--ternary)]" />
              Edit Product Details
            </h3>

            {editError && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium mb-6">
                {editError}
              </div>
            )}

            <form onSubmit={handleEditSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 no-scrollbar">
              {/* Basic Details */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500">Basic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">Product Title</label>
                    <input required name="title" value={editFormData.title} onChange={handleEditChange} className={modalInputStyles} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">Brand</label>
                    <input required name="brand" value={editFormData.brand} onChange={handleEditChange} className={modalInputStyles} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">Category</label>
                    <select required name="category" value={editFormData.category} onChange={handleEditChange} className={modalInputStyles}>
                      <option value="Phones">Phones</option>
                      <option value="Mac">Mac</option>
                      <option value="Tablets">Tablets</option>
                      <option value="Watches">Watches</option>
                      <option value="Audio">Headphone & Speaker</option>
                      <option value="Gaming">Gaming</option>
                      <option value="Camera">Camera</option>
                      <option value="Drone">Drone</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Pricing & Stock */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500">Pricing & Inventory</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">Price ($)</label>
                    <input required type="number" step="0.01" min="0" name="price" value={editFormData.price} onChange={handleEditChange} className={modalInputStyles} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">Stock Quantity</label>
                    <input required type="number" min="0" name="stock" value={editFormData.stock} onChange={handleEditChange} className={modalInputStyles} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">Rating</label>
                    <input type="number" step="0.1" min="0" max="5" name="rating" value={editFormData.rating} onChange={handleEditChange} className={modalInputStyles} />
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500">Descriptions & Specs</h4>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">Short Description</label>
                    <input required name="shortDescription" value={editFormData.shortDescription} onChange={handleEditChange} className={modalInputStyles} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">Full Description</label>
                    <textarea required rows={3} name="fullDescription" value={editFormData.fullDescription} onChange={handleEditChange} className={`${modalInputStyles} resize-y`} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">Specifications</label>
                    <textarea rows={2} name="specifications" value={editFormData.specifications} onChange={handleEditChange} className={`${modalInputStyles} resize-y`} />
                  </div>
                </div>
              </div>

              {/* Media */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500">Media</h4>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">Thumbnail URL</label>
                    <input required type="url" name="thumbnail" value={editFormData.thumbnail} onChange={handleEditChange} className={modalInputStyles} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">Additional Images (comma separated)</label>
                    <textarea rows={2} name="images" value={editFormData.images} onChange={handleEditChange} className={`${modalInputStyles} resize-y`} />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setProductToEdit(null)} 
                  className="px-5 py-2.5 rounded-xl font-medium text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold bg-[var(--ternary)] text-white hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {isSaving ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
