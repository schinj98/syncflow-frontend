'use client'
import React, { useState } from 'react';
import { Plug, Check, Settings, RefreshCw, AlertCircle, X, Lock, ExternalLink, Key } from 'lucide-react';

export default function IntegrationsPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [authStep, setAuthStep] = useState('credentials'); // credentials, permissions, success

  const [platforms, setPlatforms] = useState([
    { 
      id: 1, 
      name: 'Amazon Seller Central', 
      icon: '📦', 
      color: 'bg-orange-500',
      connected: true, 
      status: 'Active',
      lastSync: '5 minutes ago',
      orders: 450,
      products: 123,
      authType: 'OAuth',
      permissions: ['Read Orders', 'Update Listings', 'Manage Inventory', 'View Reports']
    },
    { 
      id: 2, 
      name: 'Flipkart Seller Hub', 
      icon: '🛒', 
      color: 'bg-yellow-500',
      connected: true, 
      status: 'Active',
      lastSync: '10 minutes ago',
      orders: 320,
      products: 98,
      authType: 'API Key',
      permissions: ['Read Orders', 'Update Products', 'Manage Inventory']
    },
    { 
      id: 3, 
      name: 'Myntra Seller Portal', 
      icon: '👔', 
      color: 'bg-pink-500',
      connected: false, 
      status: 'Not Connected',
      lastSync: null,
      orders: 0,
      products: 0,
      authType: 'OAuth',
      permissions: ['Read Orders', 'Update Listings', 'Manage Inventory', 'View Analytics']
    },
    { 
      id: 4, 
      name: 'Shopify', 
      icon: '🏪', 
      color: 'bg-green-600',
      connected: false, 
      status: 'Not Connected',
      lastSync: null,
      orders: 0,
      products: 0,
      authType: 'OAuth',
      permissions: ['Read Orders', 'Write Products', 'Read Customers', 'Manage Inventory']
    },
    { 
      id: 5, 
      name: 'WooCommerce', 
      icon: '🛍️', 
      color: 'bg-purple-600',
      connected: false, 
      status: 'Not Connected',
      lastSync: null,
      orders: 0,
      products: 0,
      authType: 'API Key',
      permissions: ['Read Orders', 'Write Products', 'Manage Inventory']
    },
    { 
      id: 6, 
      name: 'Meesho Seller', 
      icon: '🎁', 
      color: 'bg-red-500',
      connected: false, 
      status: 'Not Connected',
      lastSync: null,
      orders: 0,
      products: 0,
      authType: 'API Key',
      permissions: ['Read Orders', 'Update Products', 'Manage Inventory']
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
      color: 'bg-blue-600',
      connected: true, 
      status: 'Active',
      shipments: 156
    },
    { 
      id: 3, 
      name: 'Delhivery', 
      icon: '🚛', 
      color: 'bg-orange-600',
      connected: false, 
      status: 'Not Connected',
      shipments: 0
    }
  ]);

  const handleConnect = (platform) => {
    setSelectedPlatform(platform);
    setAuthStep('credentials');
    setShowAuthModal(true);
  };

  const handleSync = (id) => {
    // Simulate sync
    setPlatforms(platforms.map(p => 
      p.id === id ? { ...p, lastSync: 'Just now' } : p
    ));
  };

  const handleDisconnect = (id) => {
    if (confirm('Are you sure you want to disconnect this platform?')) {
      setPlatforms(platforms.map(p => 
        p.id === id ? { ...p, connected: false, status: 'Not Connected', orders: 0, products: 0 } : p
      ));
    }
  };

  const handleAuthenticate = () => {
    if (authStep === 'credentials') {
      setAuthStep('permissions');
    } else if (authStep === 'permissions') {
      setAuthStep('success');
      setTimeout(() => {
        setPlatforms(platforms.map(p => 
          p.id === selectedPlatform.id 
            ? { ...p, connected: true, status: 'Active', lastSync: 'Just now', orders: 0, products: 0 } 
            : p
        ));
        setShowAuthModal(false);
        setAuthStep('credentials');
      }, 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900">Channel Integrations</h1>
        <p className="text-gray-600 mt-2">Connect your selling channels to manage orders, inventory, and listings from one place</p>
      </div>

      {/* Connection Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Connected Channels</p>
              <p className="text-3xl font-bold text-blue-900 mt-1">
                {platforms.filter(p => p.connected).length}/{platforms.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Plug className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Total Orders</p>
              <p className="text-3xl font-bold text-green-900 mt-1">
                {platforms.reduce((sum, p) => sum + p.orders, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-2xl">
              📦
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Total Products</p>
              <p className="text-3xl font-bold text-purple-900 mt-1">
                {platforms.reduce((sum, p) => sum + p.products, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-2xl">
              🏷️
            </div>
          </div>
        </div>
      </div>

      {/* E-commerce Platforms */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">E-commerce Channels</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform) => (
            <div key={platform.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition overflow-hidden">
              {/* Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${platform.color} rounded-lg flex items-center justify-center text-2xl shadow-sm`}>
                      {platform.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{platform.name}</h3>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                        platform.connected 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {platform.status}
                      </span>
                    </div>
                  </div>
                  {platform.connected && (
                    <div className="bg-green-100 rounded-full p-1">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              {platform.connected ? (
                <div className="px-6 pb-6 space-y-4">
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Last Sync:</span>
                      <span className="font-medium text-gray-900">{platform.lastSync}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-200">
                      <div>
                        <div className="text-xl font-bold text-gray-900">{platform.orders}</div>
                        <div className="text-xs text-gray-600">Orders</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-gray-900">{platform.products}</div>
                        <div className="text-xs text-gray-600">Products</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleSync(platform.id)}
                      className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-blue-100 transition flex items-center justify-center"
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Sync
                    </button>
                    <button className="bg-gray-50 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                      <Settings className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDisconnect(platform.id)}
                      className="bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="px-6 pb-6">
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center text-xs text-gray-600 mb-2">
                      <Lock className="w-3 h-3 mr-1" />
                      {platform.authType} Authentication
                    </div>
                    <div className="text-xs text-gray-500">
                      Grant access to: Orders, Inventory, Products
                    </div>
                  </div>
                  <button
                    onClick={() => handleConnect(platform)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:shadow-lg transition flex items-center justify-center"
                  >
                    <Plug className="w-4 h-4 mr-2" />
                    Connect {platform.name.split(' ')[0]}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Logistics Partners */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Logistics Partners</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {logistics.map((partner) => (
            <div key={partner.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${partner.color} rounded-lg flex items-center justify-center text-2xl shadow-sm`}>
                  {partner.icon}
                </div>
                {partner.connected && (
                  <div className="bg-green-100 rounded-full p-1">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                )}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{partner.name}</h3>
              <span className={`inline-block mb-4 px-2 py-1 rounded-full text-xs font-semibold ${
                partner.connected 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {partner.status}
              </span>

              {partner.connected ? (
                <div>
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <div className="text-2xl font-bold text-gray-900">{partner.shipments}</div>
                    <div className="text-xs text-gray-600">Active Shipments</div>
                  </div>
                  <button className="w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition flex items-center justify-center">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => alert('Logistics connection coming soon!')}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition flex items-center justify-center"
                >
                  <Plug className="w-4 h-4 mr-2" />
                  Connect
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Authentication Modal */}
      {showAuthModal && selectedPlatform && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${selectedPlatform.color} rounded-lg flex items-center justify-center text-xl`}>
                  {selectedPlatform.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Connect {selectedPlatform.name}</h3>
                  <p className="text-xs text-gray-600">{selectedPlatform.authType} Authentication</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAuthModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {authStep === 'credentials' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Enter your {selectedPlatform.name} credentials to establish a secure connection.
                  </p>
                  
                  {selectedPlatform.authType === 'API Key' ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          API Key
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your API key"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          API Secret
                        </label>
                        <input
                          type="password"
                          placeholder="Enter your API secret"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <ExternalLink className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-900 mb-1">
                            OAuth Authentication
                          </p>
                          <p className="text-xs text-blue-700">
                            You'll be redirected to {selectedPlatform.name} to authorize access securely.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 font-medium mb-2">📍 Where to find your credentials:</p>
                    <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                      <li>Login to {selectedPlatform.name}</li>
                      <li>Go to Settings → API/Developer Section</li>
                      <li>Generate or copy your API credentials</li>
                    </ul>
                  </div>
                </div>
              )}

              {authStep === 'permissions' && (
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-900 mb-1">
                          Review Permissions
                        </p>
                        <p className="text-xs text-yellow-700">
                          We'll request the following access to manage your store
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-900">Requested Permissions:</p>
                    {selectedPlatform.permissions.map((permission, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700">{permission}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-xs text-gray-500 bg-gray-50 rounded p-3">
                    <p>🔒 Your data is encrypted and secure. You can revoke access anytime from settings.</p>
                  </div>
                </div>
              )}

              {authStep === 'success' && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Successfully Connected!</h4>
                  <p className="text-sm text-gray-600">
                    Your {selectedPlatform.name} account is now connected. Syncing data...
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {authStep !== 'success' && (
              <div className="flex space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAuthenticate}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition"
                >
                  {authStep === 'credentials' ? 'Continue' : 'Authorize Access'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}