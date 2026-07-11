"use client";

import { useState, useEffect, useCallback } from "react";
import { Container, Button } from "@/components/ui";
import ProductCard from "@/components/shared/ProductCard";
import { Search, Loader2, ChevronDown, ListFilter } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [priceRange, setPriceRange] = useState(2000); // Max price default
  const [appliedPrice, setAppliedPrice] = useState(2000);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sort, setSort] = useState("newest");

  const categories = [
    "Phones", "Cameras","Drones","Wearables" ,
    "Gaming", "Laptops", "Audio", "All Products" ,"Tablets"
  ];

  const brands = ["Samsung", "Apple", "Sony", "Google", "DJI", "Canon"];

  const fetchProducts = useCallback(async (
    pageNum: number, 
    searchQuery: string, 
    cat: string, 
    brandFilter: string[],
    maxPrice: number,
    sortOption: string,
    isLoadMore: boolean = false
  ) => {
    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
      const params = new URLSearchParams();
      params.append("page", String(pageNum));
      params.append("limit", "8"); 
      
      if (searchQuery) params.append("search", searchQuery);
      if (cat && cat !== "All" && cat !== "All Products") params.append("category", cat);
      if (brandFilter.length > 0) params.append("brands", brandFilter.join(","));
      if (maxPrice < 2000) params.append("maxPrice", String(maxPrice));
      if (sortOption) params.append("sort", sortOption);

      const res = await fetch(`${baseUrl}/api/products?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const result = await res.json();
      
      if (result.success) {
        if (isLoadMore) {
          setProducts(prev => {
            const existingIds = new Set(prev.map(p => p._id || p.id));
            const newProducts = result.data.filter((p: any) => !existingIds.has(p._id || p.id));
            return [...prev, ...newProducts];
          });
        } else {
          setProducts(result.data);
        }
        setHasMore(result.meta.page < result.meta.totalPages);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Effect to fetch data when any filter changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPage(1);
      fetchProducts(1, search, category, selectedBrands, appliedPrice, sort, false);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [search, category, selectedBrands, appliedPrice, sort, fetchProducts]);

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleLoadMore = () => {
    if (loading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage, search, category, selectedBrands, appliedPrice, sort, true);
  };

  const handleClearFilters = () => {
    setSearch("");
    setCategory("All");
    setSelectedBrands([]);
    setPriceRange(2000);
    setAppliedPrice(2000);
    setSort("newest");
    setPage(1);
  };

  return (
    <div className="bg-[#f9f9f9] min-h-screen py-8">
      <Container>
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile Filter Toggle */}
          <button 
            className="lg:hidden flex items-center justify-center gap-2 bg-white p-3 rounded-lg border border-gray-200 shadow-sm"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          >
            <ListFilter size={20} />
            <span className="font-semibold">Show Filters</span>
          </button>

          {/* Left Sidebar (Filters) */}
          <aside className={`w-full lg:w-[280px] shrink-0 flex flex-col gap-6 ${isMobileFilterOpen ? 'block' : 'hidden lg:flex'}`}>
            
            {/* Categories Widget */}
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <h3 className="text-gray-900 font-bold text-lg p-5 border-b border-gray-100 bg-gray-50/50">
                Categories
              </h3>
              <ul className="flex flex-col py-2">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setCategory(cat)}
                      className={`w-full text-left px-5 py-2.5 text-sm transition-colors ${
                        category === cat 
                          ? "text-[var(--ternary)] font-semibold bg-orange-50/50" 
                          : "text-gray-600 hover:text-[var(--ternary)] hover:bg-gray-50"
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Filter Widget */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--ternary)]/30">
                <h3 className="text-gray-900 font-bold text-lg">Filter</h3>
                <button 
                  onClick={handleClearFilters}
                  className="text-xs font-semibold text-[var(--ternary)] hover:underline transition-all"
                >
                  Clear All
                </button>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h4 className="flex justify-between items-center text-sm font-bold text-gray-900 mb-4 cursor-pointer">
                  Brand <ChevronDown size={16} className="text-gray-400" />
                </h4>
                <div className="flex flex-col gap-3">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandToggle(brand)}
                        className="w-4 h-4 rounded border-gray-300 text-[var(--ternary)] focus:ring-[var(--ternary)] cursor-pointer"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-900 mb-4">Price</h4>
                <input 
                  type="range" 
                  min="0" 
                  max="2000" 
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[var(--ternary)] mb-2"
                />
                <div className="text-sm text-gray-600 mb-4">
                  Price: $0.00 - ${priceRange}.00
                </div>
                <button 
                  onClick={() => setAppliedPrice(priceRange)}
                  className="w-full sm:w-auto px-6 py-2 bg-[#fbe122] hover:bg-[#e5cc1a] text-gray-900 font-bold text-sm rounded-md transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </aside>

          {/* Right Main Content (Products Grid) */}
          <div className="flex-1 flex flex-col">
            
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] mb-6 gap-4">
              <h1 className="text-xl font-bold text-gray-900">Products</h1>
              
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:border-[var(--ternary)] focus:ring-1 focus:ring-[var(--ternary)] outline-none"
                  />
                </div>
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg text-sm shrink-0 hover:bg-gray-100">
                  <span className="text-gray-600 font-medium">Sort By:</span>
                  <select 
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="bg-transparent outline-none cursor-pointer text-gray-900 font-medium appearance-none min-w-[120px]"
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="rating_desc">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {loading && products.length === 0 ? (
              <div className="flex flex-col justify-center items-center py-32 flex-1">
                <Loader2 size={40} className="text-[var(--ternary)] animate-spin" />
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product: any, idx: number) => (
                  <ProductCard key={product._id || product.id || idx} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 bg-white rounded-xl border border-gray-100 flex-1">
                <Search size={32} className="text-gray-300 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 text-sm mb-6">Try adjusting your filters or search criteria.</p>
                <button 
                  onClick={handleClearFilters}
                  className="px-6 py-2 rounded-lg bg-gray-50 text-gray-700 font-semibold hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Load More Button */}
            {hasMore && products.length > 0 && (
              <div className="mt-12 flex justify-center pb-8">
                <Button
                  onClick={handleLoadMore}
                  disabled={loading}
                  variant="primary"
                  className="group flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Load More
                      <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

        </div>
      </Container>
    </div>
  );
}