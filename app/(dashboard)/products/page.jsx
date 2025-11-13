// app/(dashboard)/products/page.jsx
'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Grid, 
  List, 
  Trash2, 
  Filter,
  Package,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  MoreVertical,
  Loader2,
  X 
} from 'lucide-react';

// --- Mock Product Data ---
const mockProducts = [
  { id: 'PROD-001', name: 'Cotton T-Shirt - Blue', sku: 'CTB-001', stock: 150, price: 599, category: 'Apparel', listedDate: '2025-10-25', status: 'In Stock', imageUrl: '/images/tshirt_blue.jpg' },
  { id: 'PROD-002', name: 'Ceramic Coffee Mug - White', sku: 'CMW-002', stock: 45, price: 199, category: 'Homeware', listedDate: '2025-11-01', status: 'Low Stock', imageUrl: '/images/mug_white.jpg' },
  { id: 'PROD-003', name: 'Wireless Mouse - Silent Click', sku: 'WMS-003', stock: 12, price: 899, category: 'Electronics', listedDate: '2025-11-05', status: 'Out of Stock', imageUrl: '/images/mouse_wireless.jpg' },
  { id: 'PROD-004', name: 'Leather Wallet - Classic', sku: 'LWC-004', stock: 210, price: 1299, category: 'Accessories', listedDate: '2025-09-15', status: 'In Stock', imageUrl: '/images/wallet_leather.jpg' },
  { id: 'PROD-005', name: 'Yoga Mat - Eco Friendly', sku: 'YME-005', stock: 75, price: 750, category: 'Fitness', listedDate: '2025-10-10', status: 'In Stock', imageUrl: '/images/yoga_mat.jpg' },
];

const mockFetchProducts = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 800);
  });
};
// --- End Mock Product Data ---

// Helper function to determine status styling
const getStatusBadge = (status) => {
  switch (status) {
    case 'In Stock':
      return <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700"><CheckCircle className="w-3 h-3"/> {status}</span>;
    case 'Low Stock':
      return <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700"><AlertTriangle className="w-3 h-3"/> {status}</span>;
    case 'Out of Stock':
      return <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700"><X className="w-3 h-3"/> {status}</span>;
    default:
      return <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">{status}</span>;
  }
};

// Helper function to calculate days ago
const getDaysAgo = (dateString) => {
    const listed = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - listed);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays === 0 ? 'Today' : `${diffDays} days ago`;
}

// ProductCard Component for Grid View
const ProductCard = ({ product, isSelected, toggleSelect }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col hover:shadow-lg transition">
    <div className="flex justify-end">
      <input 
        type="checkbox" 
        checked={isSelected}
        onChange={() => toggleSelect(product.id)}
        className="form-checkbox h-4 w-4 text-blue-600 rounded"
      />
    </div>
    <div className="flex flex-col items-center">
      {/* Mock Image Placeholder */}
      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
        <Package className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-md font-semibold text-gray-900 text-center truncate w-full">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.category}</p>
      <div className="mt-2 flex flex-col items-center gap-1">
        <span className="text-lg font-bold text-blue-600">₹{product.price}</span>
        {getStatusBadge(product.status)}
      </div>
      <p className="text-xs text-gray-400 mt-1">Stock: {product.stock}</p>
    </div>
  </div>
);

// ProductRow Component for List View
const ProductRow = ({ product, isSelected, toggleSelect }) => (
  <tr className="hover:bg-gray-50">
    <td className="px-6 py-4">
      <input 
        type="checkbox" 
        checked={isSelected}
        onChange={() => toggleSelect(product.id)}
        className="form-checkbox h-4 w-4 text-blue-600 rounded"
      />
    </td>
    <td className="px-6 py-4 text-sm font-medium text-gray-900 flex items-center">
      <div className="w-8 h-8 bg-gray-100 rounded-md mr-3 flex items-center justify-center">
        <Package className="w-4 h-4 text-gray-400" />
      </div>
      {product.name}
    </td>
    <td className="px-6 py-4 text-sm text-gray-600">{product.sku}</td>
    <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
    <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{product.price}</td>
    <td className="px-6 py-4 text-sm font-medium">{getStatusBadge(product.status)}</td>
    <td className="px-6 py-4 text-sm text-gray-500">{product.stock}</td>
    <td className="px-6 py-4 text-sm text-gray-500">{getDaysAgo(product.listedDate)}</td>
    <td className="px-6 py-4 text-sm">
        <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
            <MoreVertical className="w-4 h-4" />
        </button>
    </td>
  </tr>
);


export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductIds, setSelectedProductIds] = useState(new Set());
  const [filterPeriod, setFilterPeriod] = useState(null); // e.g., '7days', '30days'
  const [filterStatus, setFilterStatus] = useState(null); // e.g., 'In Stock', 'Low Stock'

  // Fetch Data on Load
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await mockFetchProducts();
        setProducts(data);
      } catch (err) {
        setError("Could not load products.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtered and Searched Products
  const filteredProducts = useMemo(() => {
    let currentProducts = products;

    // 1. Search Filter
    if (searchTerm) {
      currentProducts = currentProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Period Filter
    if (filterPeriod) {
        const days = filterPeriod === '7days' ? 7 : filterPeriod === '30days' ? 30 : Infinity;
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);

        currentProducts = currentProducts.filter(product => {
            const listed = new Date(product.listedDate);
            return listed >= cutoff;
        });
    }

    // 3. Status Filter
    if (filterStatus) {
        currentProducts = currentProducts.filter(product => product.status === filterStatus);
    }


    return currentProducts;
  }, [products, searchTerm, filterPeriod, filterStatus]);


  // Selection Logic
  const toggleSelect = (id) => {
    setSelectedProductIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedProductIds.size === filteredProducts.length && filteredProducts.length > 0) {
      setSelectedProductIds(new Set()); // Deselect all
    } else {
      const allIds = new Set(filteredProducts.map(p => p.id));
      setSelectedProductIds(allIds); // Select all
    }
  };

  // Action Handlers (MOCK IMPLEMENTATIONS)
  const handleDeleteSelected = () => {
    if (selectedProductIds.size === 0) return;
    alert(`MOCK: Deleting ${selectedProductIds.size} product(s). IDs: ${Array.from(selectedProductIds).join(', ')}`);
    // In a real app: call API to delete, then update 'products' state.
    setSelectedProductIds(new Set());
  };

  const handleUpdateQuantity = () => {
    if (selectedProductIds.size === 0) return;
    alert(`MOCK: Updating quantity for ${selectedProductIds.size} product(s).`);
    // In a real app: show a modal to input new quantity, then call API.
  };

  const handleAddNewProduct = () => {
    alert("MOCK: Redirecting to Add New Product page/modal.");
    // In a real app: use router.push('/products/new') or open a modal.
  };

  // --- Render Logic ---

  if (error) {
    return <div className="p-6 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="w-7 h-7 text-blue-600" /> Products Inventory
        </h1>
        <button 
          onClick={handleAddNewProduct}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" /> Add New Product
        </button>
      </header>

      {/* --- Controls and Filters --- */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Search Bar */}
          <div className="relative flex-grow max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="placeholder-gray-500 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-500" />
            
            {/* Listed Period Filter */}
            <select
                value={filterPeriod || ''}
                onChange={(e) => setFilterPeriod(e.target.value || null)}
                className="text-gray-500 px-3 py-2 border border-gray-300 rounded-lg text-sm appearance-none cursor-pointer"
            >
                <option value="">All Time</option>
                <option value="7days">Listed in last 7 days</option>
                <option value="30days">Listed in last 30 days</option>
            </select>

            {/* Status Filter */}
             <select
                value={filterStatus || ''}
                onChange={(e) => setFilterStatus(e.target.value || null)}
                className="text-gray-500 px-3 py-2 border border-gray-300 rounded-lg text-sm appearance-none cursor-pointer"
            >
                <option value="">All Statuses</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
          
          {/* View Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
              title="List View"
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
              title="Grid View"
            >
              <Grid className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
      {/* --- End Controls and Filters --- */}

      {/* --- Bulk Actions Bar --- */}
      {selectedProductIds.size > 0 && (
        <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded-lg flex items-center justify-between transition-all duration-300">
          <p className="text-sm font-medium text-blue-800">
            {selectedProductIds.size} item(s) selected
          </p>
          <div className="flex space-x-3">
            <button
              onClick={handleUpdateQuantity}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-white border border-blue-400 text-blue-600 rounded-md hover:bg-blue-50"
            >
              Update Stock
            </button>
            <button
              onClick={handleDeleteSelected}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              <Trash2 className="w-4 h-4" /> Delete ({selectedProductIds.size})
            </button>
          </div>
        </div>
      )}
      {/* --- End Bulk Actions Bar --- */}

      {/* --- Content Display --- */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[30vh] text-gray-500">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="mt-2">Fetching products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center p-10 bg-white rounded-xl shadow-sm border border-gray-200">
            <p className="text-lg text-gray-500">No products match your current search and filters.</p>
            <button onClick={() => { setSearchTerm(''); setFilterPeriod(null); setFilterStatus(null); }} className="mt-4 text-blue-600 hover:text-blue-700 font-medium">
                Clear all filters
            </button>
        </div>
      ) : viewMode === 'list' ? (
        // List View Table
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={selectedProductIds.size === filteredProducts.length && filteredProducts.length > 0}
                    onChange={toggleSelectAll}
                    className="form-checkbox h-4 w-4 text-blue-600 rounded"
                  />
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Product Name</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">SKU</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Category</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Price</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Stock</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Listed</th>
                <th className="px-6 py-3 w-12">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <ProductRow 
                  key={product.id} 
                  product={product} 
                  isSelected={selectedProductIds.has(product.id)}
                  toggleSelect={toggleSelect}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Grid View
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isSelected={selectedProductIds.has(product.id)}
              toggleSelect={toggleSelect}
            />
          ))}
        </div>
      )}
      {/* --- End Content Display --- */}
    </div>
  );
}