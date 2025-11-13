// app/(dashboard)/integrations/page.jsx
// ========================================

'use client';
import React, { useState } from 'react';
import { Plug, Check, Settings, RefreshCw, AlertCircle } from 'lucide-react';

export default function IntegrationsPage() {
  const [platforms, setPlatforms] = useState([
    { 
      id: 1, 
      name: 'Amazon', 
      icon: '📦', 
      color: 'bg-orange-500',
      connected: true, 
      status: 'Active',
      lastSync: '5 minutes ago',
      orders: 450,
      products: 123
    },
    { 
      id: 2, 
      name: 'Flipkart', 
      icon: '🛒', 
      color: 'bg-yellow-300',
      connected: true, 
      status: 'Active',
      lastSync: '10 minutes ago',
      orders: 320,
      products: 98
    },
    { 
      id: 3, 
      name: 'Shopify', 
      icon: '🏪', 
      color: 'bg-green-500',
      connected: false, 
      status: 'Not Connected',
      lastSync: null,
      orders: 0,
      products: 0
    },
    { 
      id: 4, 
      name: 'WooCommerce', 
      icon: '🛍️', 
      color: 'bg-purple-500',
      connected: false, 
      status: 'Not Connected',
      lastSync: null,
      orders: 0,
      products: 0
    }
  ]);

  const [logistics, setLogistics] = useState([
    { 
      id: 1, 
      name: 'Shiprocket', 
      icon: '🚚', 
      color: 'bg-indigo-500',
      connected: true, 
      status: 'Active',
      shipments: 234
    },
    { 
      id: 2, 
      name: 'Bluedart', 
      icon: '📮', 
      color: 'bg-red-500',
      connected: true, 
      status: 'Active',
      shipments: 156
    },
    { 
      id: 3, 
      name: 'Delhivery', 
      icon: '🚛', 
      color: 'bg-pink-500',
      connected: false, 
      status: 'Not Connected',
      shipments: 0
    }
  ]);

  const handleConnect = (type, id) => {
    alert(`Connecting ${type} - ID: ${id}`);
  };

  const handleSync = (id) => {
    alert(`Syncing platform - ID: ${id}`);
  };

  return (
    <div className="max-w-6xl space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
        <p className="text-gray-600 mt-1">Connect your e-commerce platforms and logistics partners</p>
      </div>

      {/* E-commerce Platforms */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">E-commerce Platforms</h2>
          <span className="text-sm text-gray-600">
            {platforms.filter(p => p.connected).length} of {platforms.length} connected
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {platforms.map((platform) => (
            <div key={platform.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${platform.color} rounded-lg flex items-center justify-center text-2xl`}>
                    {platform.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{platform.name}</h3>
                    <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      platform.connected 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {platform.status}
                    </span>
                  </div>
                </div>
                {platform.connected && (
                  <Check className="w-6 h-6 text-green-600" />
                )}
              </div>

              {platform.connected ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Last Sync:</span>
                    <span className="font-medium text-gray-900">{platform.lastSync}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{platform.orders}</div>
                      <div className="text-xs text-gray-600">Orders</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{platform.products}</div>
                      <div className="text-xs text-gray-600">Products</div>
                    </div>
                  </div>
                  <div className="flex space-x-2 pt-3">
                    <button 
                      onClick={() => handleSync(platform.id)}
                      className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition flex items-center justify-center"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Sync Now
                    </button>
                    <button className="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleConnect('platform', platform.id)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center"
                >
                  <Plug className="w-5 h-5 mr-2" />
                  Connect {platform.name}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Logistics Partners */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Logistics Partners</h2>
          <span className="text-sm text-gray-600">
            {logistics.filter(l => l.connected).length} of {logistics.length} connected
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {logistics.map((partner) => (
            <div key={partner.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${partner.color} rounded-lg flex items-center justify-center text-2xl`}>
                  {partner.icon}
                </div>
                {partner.connected && (
                  <Check className="w-6 h-6 text-green-600" />
                )}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{partner.name}</h3>
              <span className={`inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold ${
                partner.connected 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {partner.status}
              </span>

              {partner.connected ? (
                <div>
                  <div className="mb-4 pt-3 border-t border-gray-200">
                    <div className="text-2xl font-bold text-gray-900">{partner.shipments}</div>
                    <div className="text-xs text-gray-600">Active Shipments</div>
                  </div>
                  <button className="w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                    <Settings className="w-5 h-5 mx-auto" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleConnect('logistics', partner.id)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center"
                >
                  <Plug className="w-4 h-4 mr-2" />
                  Connect
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sync Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Sync Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-900">Auto-Sync Inventory</h3>
              <p className="text-sm text-gray-600">Automatically sync inventory changes across platforms</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-900">Real-Time Order Sync</h3>
              <p className="text-sm text-gray-600">Sync new orders immediately as they arrive</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-900">Stock Alerts</h3>
              <p className="text-sm text-gray-600">Get notified when stock levels are low</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}