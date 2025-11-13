"use client";
import { useState } from "react";
import { Package, Hash, Boxes, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";

export default function CreateProduct() {
  const [title, setTitle] = useState("");
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleCreate() {
    if (!title || !sku || !quantity) {
      setError("Please fill in all fields");
      return;
    }

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      setError("Not logged in");
      return;
    }

    setLoading(true);
    setError("");

    const payload = {
      title,
      sku,
      quantity: Number(quantity),
    };

    try {
      const res = await fetch(
        `http://localhost:8080/api/products/create/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      console.log("Product Created:", data);
      
      setSuccess(true);
      setTitle("");
      setSku("");
      setQuantity("");
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to create product. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Inventory</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-10 text-white">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <Package size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Create New Product</h1>
                <p className="text-blue-100 mt-1">Add a new item to your inventory</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            {/* Success Message */}
            {success && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2 size={24} className="text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-900">Product Created Successfully!</p>
                  <p className="text-sm text-green-700">Your product has been added to the inventory.</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                <AlertCircle size={24} className="text-red-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-red-900">Error</p>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {/* Product Title */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <Package size={18} className="text-slate-500" />
                  Product Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Wireless Bluetooth Headphones"
                  className="w-full placeholder-gray-400 text-gray-700  px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <p className="mt-2 text-red-500 text-xs text-slate-500">Enter a descriptive name for your product</p>
              </div>

              {/* SKU */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <Hash size={18} className="text-slate-500" />
                  SKU (Stock Keeping Unit)
                </label>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="e.g., WBH-2024-001"
                  className="w-full placeholder-gray-400  text-gray-700  px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono"
                />
                <p className="mt-2 text-xs text-slate-500">Unique identifier for inventory tracking</p>
              </div>

              {/* Quantity */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <Boxes size={18} className="text-slate-500" />
                  Initial Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="0"
                  min="0"
                  className="w-full px-4 placeholder-gray-400 text-gray-700 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <p className="mt-2 text-xs text-slate-500">Number of units currently in stock</p>
              </div>

              {/* Summary Card */}
              {(title || sku || quantity) && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-slate-700 mb-4">Product Summary</h3>
                  <div className="space-y-3">
                    {title && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Title:</span>
                        <span className="text-sm font-medium text-slate-900">{title}</span>
                      </div>
                    )}
                    {sku && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">SKU:</span>
                        <span className="text-sm font-mono font-medium text-slate-900">{sku}</span>
                      </div>
                    )}
                    {quantity && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Quantity:</span>
                        <span className="text-sm font-medium text-slate-900">{quantity} units</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleCreate}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-500 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Creating Product...
                    </>
                  ) : (
                    <>
                      <Package size={20} />
                      Create Product
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setTitle("");
                    setSku("");
                    setQuantity("");
                    setError("");
                  }}
                  disabled={loading}
                  className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Need help? Check out our{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              inventory management guide
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}