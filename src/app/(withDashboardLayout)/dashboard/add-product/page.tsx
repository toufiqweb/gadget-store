"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProductAction } from "@/lib/actions/products";
import { authClient } from "@/lib/auth-client";
import { Loader2, PackagePlus } from "lucide-react";

export default function AddProductPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  
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
      // Process images and specifications from comma-separated strings to arrays
      const processedData = {
        ...formData,
        images: formData.images.split(",").map((img) => img.trim()).filter(Boolean),
        // For simplicity, we just pass specifications as text, or parse if structured
        specifications: formData.specifications, 
      };

      await createProductAction(processedData);
      setSuccess(true);
      
      // Reset form
      setFormData({
        title: "", brand: "", category: "", shortDescription: "", fullDescription: "",
        price: "", rating: "", stock: "", thumbnail: "", images: "", specifications: "",
      });

      // Optionally redirect
      // router.push("/dashboard/products");
    } catch (err: any) {
      setError(err.message || "Failed to create product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) {
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
        <p className="text-gray-400">Please log in to access this page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-3 border-b border-gray-800 pb-5">
        <div className="p-2.5 bg-[var(--ternary)]/10 text-[var(--ternary)] rounded-xl border border-[var(--ternary)]/20">
          <PackagePlus size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Add New Product</h1>
          <p className="text-sm text-gray-400 mt-1">Create a new gadget listing for the store.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl text-sm font-medium">
          Product successfully created!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 bg-[#1f2029] border border-gray-800 p-6 md:p-8 rounded-2xl shadow-sm">
        
        {/* Basic Information */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-white border-b border-gray-800 pb-2">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300">Product Title <span className="text-red-500">*</span></label>
              <input required name="title" value={formData.title} onChange={handleChange} className="w-full bg-[#15151b] border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-[var(--ternary)] focus:border-[var(--ternary)] transition-colors" placeholder="e.g. iPhone 15 Pro Max" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300">Brand <span className="text-red-500">*</span></label>
              <input required name="brand" value={formData.brand} onChange={handleChange} className="w-full bg-[#15151b] border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-[var(--ternary)] focus:border-[var(--ternary)] transition-colors" placeholder="e.g. Apple" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300">Category <span className="text-red-500">*</span></label>
              <select required name="category" value={formData.category} onChange={handleChange} className="w-full bg-[#15151b] border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-[var(--ternary)] focus:border-[var(--ternary)] transition-colors appearance-none">
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
          <h3 className="text-lg font-semibold text-white border-b border-gray-800 pb-2">Pricing & Inventory</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300">Price ($) <span className="text-red-500">*</span></label>
              <input required type="number" step="0.01" min="0" name="price" value={formData.price} onChange={handleChange} className="w-full bg-[#15151b] border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-[var(--ternary)] transition-colors" placeholder="0.00" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300">Stock Quantity <span className="text-red-500">*</span></label>
              <input required type="number" min="0" name="stock" value={formData.stock} onChange={handleChange} className="w-full bg-[#15151b] border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-[var(--ternary)] transition-colors" placeholder="e.g. 50" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300">Initial Rating</label>
              <input type="number" step="0.1" min="0" max="5" name="rating" value={formData.rating} onChange={handleChange} className="w-full bg-[#15151b] border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-[var(--ternary)] transition-colors" placeholder="e.g. 4.5" />
            </div>
          </div>
        </div>

        {/* Descriptions */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-white border-b border-gray-800 pb-2">Product Description</h3>
          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300">Short Description <span className="text-red-500">*</span></label>
              <input required name="shortDescription" value={formData.shortDescription} onChange={handleChange} className="w-full bg-[#15151b] border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-[var(--ternary)] transition-colors" placeholder="A brief summary of the product" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300">Full Description <span className="text-red-500">*</span></label>
              <textarea required rows={4} name="fullDescription" value={formData.fullDescription} onChange={handleChange} className="w-full bg-[#15151b] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[var(--ternary)] transition-colors resize-y" placeholder="Detailed product description..."></textarea>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300">Specifications</label>
              <textarea rows={3} name="specifications" value={formData.specifications} onChange={handleChange} className="w-full bg-[#15151b] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[var(--ternary)] transition-colors resize-y" placeholder="Processor: A17 Pro, Display: 6.7-inch Super Retina XDR..."></textarea>
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-white border-b border-gray-800 pb-2">Media</h3>
          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300">Thumbnail URL <span className="text-red-500">*</span></label>
              <input required type="url" name="thumbnail" value={formData.thumbnail} onChange={handleChange} className="w-full bg-[#15151b] border border-gray-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-[var(--ternary)] transition-colors" placeholder="https://example.com/image.jpg" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300">Additional Images URLs (comma separated)</label>
              <textarea rows={2} name="images" value={formData.images} onChange={handleChange} className="w-full bg-[#15151b] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[var(--ternary)] transition-colors resize-y" placeholder="url1.jpg, url2.jpg, url3.jpg"></textarea>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 flex justify-end gap-3">
          <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-xl font-medium text-gray-300 hover:text-white bg-[#15151b] hover:bg-gray-800 border border-gray-800 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold bg-[var(--ternary)] text-white hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
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
