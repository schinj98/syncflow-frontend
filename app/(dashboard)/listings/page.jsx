"use client";
import { useEffect, useState } from "react";
import { Package, Hash, Boxes, Plus, Search, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductListPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!token || !userId) {
      router.push("/login");
      return;
    }

    async function fetchProducts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const text = await res.text();
        const data = text ? JSON.parse(text) : [];
        setProducts(data);
      } catch (err) {
        console.error("Error:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [router]);

  const filteredProducts = products.filter(p =>
    p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Product Inventory
              </h1>
              <p className="text-slate-600">
                Manage and track your product listings
              </p>
            </div>
            <Link
              href="/create-listing"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
            >
              <Plus size={20} />
              Add Product
            </Link>

          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by title or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4  text-gray-700  py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-slate-600 text-lg">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-slate-100 p-4 rounded-full">
                <Package size={48} className="text-slate-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {searchTerm ? "No products found" : "No products yet"}
            </h3>
            <p className="text-slate-600 mb-6">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Get started by adding your first product"}
            </p>
            {!searchTerm && (
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Add Your First Product
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Total Products</p>
                    <p className="text-2xl font-bold text-slate-900">{products.length}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Package size={24} className="text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Total Units</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {products.reduce((sum, p) => sum + (p.quantity || 0), 0)}
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Boxes size={24} className="text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Low Stock</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {products.filter(p => p.quantity < 10).length}
                    </p>
                  </div>
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <Hash size={24} className="text-amber-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-blue-300 transition-all duration-200 overflow-hidden group"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {p.title}
                        </h3>
                      </div>
                      <div className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                        p.quantity > 20 ? 'bg-green-100 text-green-700' :
                        p.quantity > 10 ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {p.quantity > 20 ? 'In Stock' : p.quantity > 10 ? 'Low' : 'Critical'}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Hash size={16} className="text-slate-400" />
                          <span className="font-medium">SKU:</span>
                        </div>
                        <span className="text-slate-900 font-mono">{p.sku}</span>
                      </div>

                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Boxes size={16} className="text-slate-400" />
                          <span className="font-medium">Quantity:</span>
                        </div>
                        <span className="text-slate-900 font-semibold">{p.quantity} units</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 px-6 py-3 border-t border-slate-100">
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}