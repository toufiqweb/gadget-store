"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getMyProducts } from "@/lib/api/product";
import { deleteProductAction, patchProductAction } from "@/lib/actions/products";
import ProductCard from "@/components/shared/ProductCard";
import { Loader2, PackageOpen, Plus, Trash2, Edit3, X, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function MyProductsPage() {
  const { data: session, isPending: isAuthPending } = authClient.useSession();
  
  // Products state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const fetchMyProducts = async () => {
    try {
      setIsLoading(true);
      const res = await getMyProducts();
      if (res.success && Array.isArray(res.data)) {
        setProducts(res.data);
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
    if (session) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchMyProducts();
    }
  }, [session]);

  // Handle Edit Action
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

  // Handle Delete Action
  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);

    const productId = productToDelete._id?.$oid || productToDelete._id || productToDelete.id;

    try {
      await deleteProductAction(productId);
      
      // Remove from state
      setProducts(prev => prev.filter(p => {
        const id = p._id?.$oid || p._id || p.id;
        return id !== productId;
      }));

      setProductToDelete(null);
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

  if (!session) {
    return (
      <div className="flex flex-col h-[60vh] items-center justify-center">
        <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
        <p className="text-gray-400">Please log in to view your products.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-white pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">My Products</h1>
          <p className="text-sm text-gray-400 mt-1">Manage and view the gadget listings you have created.</p>
        </div>
        <Link 
          href="/dashboard/add-product" 
          className="inline-flex items-center gap-2 bg-[var(--ternary)] hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm active:scale-95 shrink-0 w-fit"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {isLoading ? (
        <div className="flex h-[40vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--ternary)]" />
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm font-medium">
          {error}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id || product.id} className="relative group/dashboard-card flex flex-col bg-[#1f2029] border border-gray-800 rounded-2xl overflow-hidden shadow-md">
              <div className="flex-1">
                <ProductCard product={product} />
              </div>
              <div className="flex border-t border-gray-800 bg-[#15151b] z-20 relative">
                <button 
                  onClick={() => handleEditClick(product)}
                  className="flex-1 py-3 flex items-center justify-center gap-2 text-xs md:text-sm font-semibold hover:bg-gray-800 text-gray-300 hover:text-white transition-colors border-r border-gray-800"
                >
                  <Edit3 size={14} />
                  Edit
                </button>
                <button 
                  onClick={() => setProductToDelete(product)}
                  className="flex-1 py-3 flex items-center justify-center gap-2 text-xs md:text-sm font-semibold hover:bg-red-950/30 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-[#1f2029] rounded-2xl border border-gray-800 px-4">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 mb-4">
            <PackageOpen size={32} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No Products Added Yet</h3>
          <p className="text-gray-400 text-sm max-w-sm mb-6 leading-relaxed">
            You haven&apos;t listed any gadgets for sale. Start by adding your first product!
          </p>
          <Link 
            href="/dashboard/add-product" 
            className="inline-flex items-center gap-2 bg-[var(--ternary)] hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-sm active:scale-95"
          >
            Create Your First Listing
          </Link>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#1f2029] border border-gray-800 max-w-md w-full rounded-2xl p-6 md:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setProductToDelete(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            <div className="flex items-center gap-3 text-red-400 mb-4">
              <AlertTriangle size={32} />
              <h3 className="text-xl font-bold">Delete Product?</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Are you sure you want to delete <strong className="text-white">&quot;{productToDelete.title}&quot;</strong>? This action is permanent and cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                type="button" 
                onClick={() => setProductToDelete(null)} 
                className="px-5 py-2.5 rounded-xl font-medium text-gray-300 hover:text-white bg-[#15151b] hover:bg-gray-800 border border-gray-800 transition-colors text-sm"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#1f2029] border border-gray-800 max-w-3xl w-full rounded-2xl p-6 md:p-8 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setProductToEdit(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
            >
              <X size={20} />
            </button>
            
            <h3 className="text-xl font-bold text-white mb-6 border-b border-gray-800 pb-3 flex items-center gap-2">
              <Edit3 size={20} className="text-[var(--ternary)]" />
              Edit Product Details
            </h3>

            {editError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm font-medium mb-6">
                {editError}
              </div>
            )}

            <form onSubmit={handleEditSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 no-scrollbar">
              {/* Basic Details */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400">Basic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400">Product Title</label>
                    <input required name="title" value={editFormData.title} onChange={handleEditChange} className="w-full bg-[#15151b] border border-gray-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[var(--ternary)]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400">Brand</label>
                    <input required name="brand" value={editFormData.brand} onChange={handleEditChange} className="w-full bg-[#15151b] border border-gray-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[var(--ternary)]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400">Category</label>
                    <select required name="category" value={editFormData.category} onChange={handleEditChange} className="w-full bg-[#15151b] border border-gray-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[var(--ternary)]">
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
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400">Pricing & Inventory</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400">Price ($)</label>
                    <input required type="number" step="0.01" min="0" name="price" value={editFormData.price} onChange={handleEditChange} className="w-full bg-[#15151b] border border-gray-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[var(--ternary)]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400">Stock Quantity</label>
                    <input required type="number" min="0" name="stock" value={editFormData.stock} onChange={handleEditChange} className="w-full bg-[#15151b] border border-gray-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[var(--ternary)]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400">Rating</label>
                    <input type="number" step="0.1" min="0" max="5" name="rating" value={editFormData.rating} onChange={handleEditChange} className="w-full bg-[#15151b] border border-gray-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[var(--ternary)]" />
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400">Descriptions & Specs</h4>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400">Short Description</label>
                    <input required name="shortDescription" value={editFormData.shortDescription} onChange={handleEditChange} className="w-full bg-[#15151b] border border-gray-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[var(--ternary)]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400">Full Description</label>
                    <textarea required rows={3} name="fullDescription" value={editFormData.fullDescription} onChange={handleEditChange} className="w-full bg-[#15151b] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[var(--ternary)] resize-y" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400">Specifications</label>
                    <textarea rows={2} name="specifications" value={editFormData.specifications} onChange={handleEditChange} className="w-full bg-[#15151b] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[var(--ternary)] resize-y" />
                  </div>
                </div>
              </div>

              {/* Media */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400">Media</h4>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400">Thumbnail URL</label>
                    <input required type="url" name="thumbnail" value={editFormData.thumbnail} onChange={handleEditChange} className="w-full bg-[#15151b] border border-gray-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[var(--ternary)]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400">Additional Images (comma separated)</label>
                    <textarea rows={2} name="images" value={editFormData.images} onChange={handleEditChange} className="w-full bg-[#15151b] border border-gray-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[var(--ternary)] resize-y" />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex justify-end gap-3 border-t border-gray-800">
                <button 
                  type="button" 
                  onClick={() => setProductToEdit(null)} 
                  className="px-5 py-2.5 rounded-xl font-medium text-gray-300 hover:text-white bg-[#15151b] hover:bg-gray-800 border border-gray-800 transition-colors text-sm"
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
