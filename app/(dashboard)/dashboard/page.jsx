'use client'
import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  DollarSign,
  ArrowUpRight,
  MoreVertical,
  Loader2,
  ChevronRight
} from 'lucide-react';

// StatCard Component
const StatCard = ({ title, value, change, icon, trend }) => (
  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{value}</h3>
        <div className="flex items-center gap-1 text-xs sm:text-sm">
          {trend === 'up' && <ArrowUpRight className="w-4 h-4 text-green-600" />}
          <span className={trend === 'up' ? 'text-green-600 font-medium' : 'text-gray-600'}>
            {change}
          </span>
        </div>
      </div>
      <div className="bg-blue-50 p-2 sm:p-3 rounded-lg text-blue-600">
        {icon}
      </div>
    </div>
  </div>
);

// Mock API
const mockFetchDashboardData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        stats: [
          {
            title: 'Total Orders',
            value: '5,876',
            change: '+22.5% from last month',
            icon: <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />,
            trend: 'up'
          },
          {
            title: 'Products',
            value: '912',
            change: '+15 new this week',
            icon: <Package className="w-5 h-5 sm:w-6 sm:h-6" />,
            trend: 'up'
          },
          {
            title: 'Revenue',
            value: '₹8.9L',
            change: '+31.2% from last month',
            icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
            trend: 'up'
          },
          {
            title: 'Conversion',
            value: '4.1%',
            change: '+0.9% from last week',
            icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
            trend: 'up'
          }
        ],
        recentOrders: [
          { id: 'ORD-006', customer: 'Deepak Rao', platform: 'Shopify', amount: '₹4,120', status: 'Delivered', date: '10 mins ago' },
          { id: 'ORD-007', customer: 'Kavita Iyer', platform: 'Amazon', amount: '₹1,500', status: 'In Transit', date: '30 mins ago' },
          { id: 'ORD-008', customer: 'Tarun Mehra', platform: 'Flipkart', amount: '₹7,890', status: 'Processing', date: '1 hour ago' },
          { id: 'ORD-009', customer: 'Aisha Khan', platform: 'Amazon', amount: '₹2,999', status: 'Pending', date: '4 hours ago' },
          { id: 'ORD-010', customer: 'Gaurav Jain', platform: 'WooCommerce', amount: '₹1,250', status: 'Delivered', date: '6 hours ago' }
        ],
        platformData: [
          { name: 'Amazon', orders: 850, revenue: '₹4.1L', color: 'bg-orange-500' },
          { name: 'Flipkart', orders: 620, revenue: '₹3.2L', color: 'bg-blue-500' },
          { name: 'Shopify', orders: 480, revenue: '₹2.1L', color: 'bg-green-500' },
          { name: 'WooCommerce', orders: 350, revenue: '₹1.5L', color: 'bg-purple-500' }
        ],
      });
    }, 1500);
  });
};

export default function DashboardPage() {
  const [data, setData] = useState({
    stats: [],
    recentOrders: [],
    platformData: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const apiData = await mockFetchDashboardData();
        setData(apiData);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'in transit': return 'bg-blue-100 text-blue-700';
      case 'processing': return 'bg-yellow-100 text-yellow-700';
      case 'pending': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const maxOrders = data.platformData.length > 0 ? 
    Math.max(...data.platformData.map(p => p.orders)) : 1;

  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="text-center p-8 bg-red-50 rounded-xl border border-red-200">
          <h1 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">Error Loading Dashboard</h1>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-500">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        <p className="mt-3 text-base sm:text-lg font-medium">Loading Dashboard...</p>
      </div>
    );
  }

  const { stats, recentOrders, platformData } = data;

  return (
    <div className="p-4 sm:p-6 lg:p-2 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Welcome back! Here's your store overview.</p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>
        
        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recent Orders</h2>
              <button className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-semibold flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            {/* Mobile View - Cards */}
            <div className="lg:hidden divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{order.platform}</span>
                    <span className="font-semibold text-gray-900">{order.amount}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                </div>
              ))}
            </div>

            {/* Desktop View - Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Customer</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Platform</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Amount</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.platform}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{order.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Platform Performance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Platform Performance</h2>
            </div>
            <div className="p-4 sm:p-6 space-y-5">
              {platformData.map((platform, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className={`w-2 h-2 sm:w-3 sm:h-3 ${platform.color} rounded-full`}></div>
                      <span className="font-medium text-sm sm:text-base text-gray-900">{platform.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{platform.revenue}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
                    <span>{platform.orders} orders</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${platform.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${(platform.orders / maxOrders) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <button className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-5 sm:p-6 text-white hover:shadow-lg transition-all text-left">
            <Package className="w-7 h-7 sm:w-8 sm:h-8 mb-3" />
            <h3 className="text-base sm:text-lg font-semibold mb-1">Add Product</h3>
            <p className="text-blue-100 text-xs sm:text-sm">List a new product across platforms</p>
          </button>
          <button className="bg-gradient-to-br from-green-600 to-teal-600 rounded-xl p-5 sm:p-6 text-white hover:shadow-lg transition-all text-left">
            <ShoppingCart className="w-7 h-7 sm:w-8 sm:h-8 mb-3" />
            <h3 className="text-base sm:text-lg font-semibold mb-1">Process Orders</h3>
            <p className="text-green-100 text-xs sm:text-sm">View and manage pending orders</p>
          </button>
          <button className="bg-gradient-to-br from-orange-600 to-red-600 rounded-xl p-5 sm:p-6 text-white hover:shadow-lg transition-all text-left sm:col-span-2 lg:col-span-1">
            <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 mb-3" />
            <h3 className="text-base sm:text-lg font-semibold mb-1">Analytics</h3>
            <p className="text-orange-100 text-xs sm:text-sm">View detailed sales reports</p>
          </button>
        </div>
      </div>
    </div>
  );
}