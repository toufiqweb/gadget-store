"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProductAction } from "@/lib/actions/products";
import { authClient } from "@/lib/auth-client";
import { Loader2, PackagePlus } from "lucide-react";

export default function AddProductPage() {
  const router = useRouter();
  const { data: session, isPending: isAuthPending } = authClient.useSession();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    category: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    rating: "",
    stock: "",
    thumbnail: "",
    images: "",
    specifications: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const processedData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        rating: Number(formData.rating) || 0,
        images: formData.images.split(",").map((img) => img.trim()).filter(Boolean),
        specifications: formData.specifications, 
      };

      await createProductAction(processedData);
      setSuccess(true);
      
      setFormData({
        title: "", brand: "", category: "", shortDescription: "", fullDescription: "",
        price: "", rating: "", stock: "", thumbnail: "", images: "", specifications: "",
      });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to create product. Please try again.");
    } finally {
      setIsSubmitting(false);
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
      <div className="flex flex-col h-[60vh] items-center justify-center text-gray-900">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
        <p className="text-gray-500">Please log in to access this page.</p>
      </div>
    );
  }

  const inputStyles = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[var(--ternary)] focus:border-[var(--ternary)] transition-colors text-sm";

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 text-gray-900">
      <div className="flex items-center gap-3 border-b border-gray-100 pb-5">
        <div className="p-2.5 bg-[var(--ternary)]/10 text-[var(--ternary)] rounded-xl border border-[var(--ternary)]/20">
          <PackagePlus size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Add New Product</h1>
          <p className="text-sm text-gray-500 mt-1">Create a new gadget listing for the store.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-100 text-green-600 px-4 py-3 rounded-xl text-sm font-medium">
          Product successfully created!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 bg-white border border-gray-100 p-6 md:p-8 rounded-2xl shadow-sm">
        
        {/* Basic Information */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Product Title <span className="text-red-500">*</span></label>
              <input required name="title" value={formData.title} onChange={handleChange} className={inputStyles} placeholder="e.g. iPhone 15 Pro Max" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Brand <span className="text-red-500">*</span></label>
              <input required name="brand" value={formData.brand} onChange={handleChange} className={inputStyles} placeholder="e.g. Apple" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Category <span className="text-red-500">*</span></label>
              <select required name="category" value={formData.category} onChange={handleChange} className={`${inputStyles} appearance-none`}>
                <option value="">Select a category</option>
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

        {/* Pricing & Inventory */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Pricing & Inventory</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Price ($) <span className="text-red-500">*</span></label>
              <input required type="number" step="0.01" min="0" name="price" value={formData.price} onChange={handleChange} className={inputStyles} placeholder="0.00" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Stock Quantity <span className="text-red-500">*</span></label>
              <input required type="number" min="0" name="stock" value={formData.stock} onChange={handleChange} className={inputStyles} placeholder="e.g. 50" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Initial Rating</label>
              <input type="number" step="0.1" min="0" max="5" name="rating" value={formData.rating} onChange={handleChange} className={inputStyles} placeholder="e.g. 4.5" />
            </div>
          </div>
        </div>

        {/* Descriptions */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Product Description</h3>
          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Short Description <span className="text-red-500">*</span></label>
              <input required name="shortDescription" value={formData.shortDescription} onChange={handleChange} className={inputStyles} placeholder="A brief summary of the product" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Full Description <span className="text-red-500">*</span></label>
              <textarea required rows={4} name="fullDescription" value={formData.fullDescription} onChange={handleChange} className={`${inputStyles} resize-y`} placeholder="Detailed product description..."></textarea>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Specifications</label>
              <textarea rows={3} name="specifications" value={formData.specifications} onChange={handleChange} className={`${inputStyles} resize-y`} placeholder="Processor: A17 Pro, Display: 6.7-inch Super Retina XDR..."></textarea>
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Media</h3>
          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Thumbnail URL <span className="text-red-500">*</span></label>
              <input required type="url" name="thumbnail" value={formData.thumbnail} onChange={handleChange} className={inputStyles} placeholder="https://example.com/image.jpg" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Additional Images URLs (comma separated)</label>
              <textarea rows={2} name="images" value={formData.images} onChange={handleChange} className={`${inputStyles} resize-y`} placeholder="url1.jpg, url2.jpg, url3.jpg"></textarea>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
          <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-xl font-medium text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors text-sm">
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold bg-[var(--ternary)] text-white hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm">
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Saving...
              </>
            ) : (
              "Create Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
