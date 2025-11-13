// app/(dashboard)/api-keys/page.jsx
'use client';
import React, { useState } from 'react';
import { Key, Copy, Eye, EyeOff, Plus, Trash2, Shield } from 'lucide-react';

export default function APIKeysPage() {
  const [showKey, setShowKey] = useState({});
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'Production API', key: 'sk_live_abcd1234efgh5678ijkl', created: '2025-01-15', lastUsed: '2 hours ago', status: 'active' },
    { id: 2, name: 'Development API', key: 'sk_test_wxyz9876stuv5432pqrs', created: '2025-01-10', lastUsed: '1 day ago', status: 'active' },
    { id: 3, name: 'Legacy API', key: 'sk_live_old_key_deprecated', created: '2024-12-01', lastUsed: '30 days ago', status: 'inactive' }
  ]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('API Key copied to clipboard!');
  };

  const toggleKeyVisibility = (id) => {
    setShowKey(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const maskKey = (key) => {
    return key.substring(0, 12) + '•'.repeat(20);
  };

  return (
    <div className="max-w-6xl space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">API Keys</h1>
          <p className="text-gray-600 mt-1">Manage your API keys for integrations</p>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Generate New Key
        </button>
      </div>

      {/* Security Notice */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
        <div className="flex items-start">
          <Shield className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-yellow-800">Security Notice</h3>
            <p className="text-sm text-yellow-700 mt-1">
              Keep your API keys secure. Never share them in public repositories or client-side code.
            </p>
          </div>
        </div>
      </div>

      {/* API Keys List */}
      <div className="space-y-4">
        {apiKeys.map((apiKey) => (
          <div key={apiKey.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Key className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{apiKey.name}</h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                    <span>Created: {apiKey.created}</span>
                    <span>•</span>
                    <span>Last used: {apiKey.lastUsed}</span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                apiKey.status === 'active' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {apiKey.status}
              </span>
            </div>

            <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-4">
              <code className="flex-1 text-sm font-mono text-gray-700">
                {showKey[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
              </code>
              <button
                onClick={() => toggleKeyVisibility(apiKey.id)}
                className="p-2 hover:bg-gray-200 rounded-lg transition"
              >
                {showKey[apiKey.id] ? (
                  <EyeOff className="w-5 h-5 text-gray-600" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-600" />
                )}
              </button>
              <button
                onClick={() => copyToClipboard(apiKey.key)}
                className="p-2 hover:bg-gray-200 rounded-lg transition"
              >
                <Copy className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-red-50 rounded-lg transition">
                <Trash2 className="w-5 h-5 text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Documentation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Start Guide</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">1. Authentication</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
              <code>
                curl -H "Authorization: Bearer YOUR_API_KEY" \<br/>
                &nbsp;&nbsp;https://api.syncflow.com/v1/products
              </code>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">2. Rate Limits</h3>
            <p className="text-gray-600 text-sm">
              API requests are limited to 1000 requests per hour. Monitor your usage in the dashboard.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">3. Endpoints</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• GET /v1/products - List all products</li>
              <li>• GET /v1/orders - List all orders</li>
              <li>• POST /v1/sync - Trigger manual sync</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}