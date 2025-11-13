'use client'
import React, { useState } from 'react';
import { ArrowRight, Package, ShoppingCart, TrendingUp, Zap, Shield, Clock, ChevronRight, Menu, X, Check } from 'lucide-react';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-Time Sync",
      description: "Instant inventory updates across all your sales channels"
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "Multi-Platform",
      description: "Connect Amazon, Flipkart, Shopify, and WooCommerce"
    },
    {
      icon: <ShoppingCart className="w-6 h-6" />,
      title: "Order Management",
      description: "Centralized dashboard for all your orders"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Analytics",
      description: "Track performance and sales trends in real-time"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security for your business data"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Tracking",
      description: "Real-time shipment tracking with Shiprocket & Bluedart"
    }
  ];

  const platforms = [
    { name: "Amazon", color: "bg-orange-500" },
    { name: "Flipkart", color: "bg-blue-500" },
    { name: "Shopify", color: "bg-green-500" },
    { name: "WooCommerce", color: "bg-purple-500" }
  ];

  const pricing = [
    {
      name: "Starter",
      price: "₹999",
      period: "/month",
      features: [
        "Up to 500 orders/month",
        "2 platform integrations",
        "Basic analytics",
        "Email support"
      ]
    },
    {
      name: "Professional",
      price: "₹2,499",
      period: "/month",
      popular: true,
      features: [
        "Up to 2,000 orders/month",
        "Unlimited integrations",
        "Advanced analytics",
        "Priority support",
        "Real-time notifications"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      features: [
        "Unlimited orders",
        "All integrations",
        "Custom features",
        "Dedicated account manager",
        "API access",
        "White-label option"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SyncFlow
                </span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition">Features</a>
              <a href="#platforms" className="text-gray-700 hover:text-blue-600 transition">Platforms</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition">Pricing</a>
              <a href="/login" className="text-gray-700 hover:text-blue-600 transition">Login</a>
              <a href="/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition">
                Get Started
              </a>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-gray-700 hover:text-blue-600">Features</a>
              <a href="#platforms" className="block text-gray-700 hover:text-blue-600">Platforms</a>
              <a href="#pricing" className="block text-gray-700 hover:text-blue-600">Pricing</a>
              <a href="/login" className="block text-gray-700 hover:text-blue-600">Login</a>
              <a href="/signup" className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg text-center">
                Get Started
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Manage Your E-Commerce
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              From One Dashboard
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Sync inventory, track orders, and manage shipments across Amazon, Flipkart, Shopify, and more. 
            Real-time updates, zero overselling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition flex items-center justify-center">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a href="#demo" className="bg-white text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-gray-300 hover:border-blue-600 transition flex items-center justify-center">
              Watch Demo
              <ChevronRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {[
            { label: "Active Sellers", value: "2,500+" },
            { label: "Orders Synced", value: "1M+" },
            { label: "Platforms", value: "10+" },
            { label: "Uptime", value: "99.9%" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need to scale your e-commerce business</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section id="platforms" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Integrated Platforms</h2>
            <p className="text-xl text-gray-600">Connect with your favorite marketplaces and logistics partners</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {platforms.map((platform, i) => (
              <div key={i} className="bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-blue-600 transition text-center">
                <div className={`w-16 h-16 ${platform.color} rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl`}>
                  {platform.name[0]}
                </div>
                <h3 className="font-semibold text-gray-900">{platform.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your business</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan, i) => (
              <div key={i} className={`rounded-xl p-8 ${plan.popular ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white scale-105 shadow-2xl' : 'bg-slate-50 border-2 border-gray-200'}`}>
                {plan.popular && (
                  <div className="text-sm font-semibold mb-2">MOST POPULAR</div>
                )}
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                  <span className={plan.popular ? 'text-blue-100' : 'text-gray-600'}>{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start">
                      <Check className={`w-5 h-5 mr-2 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-blue-600'}`} />
                      <span className={plan.popular ? 'text-blue-50' : 'text-gray-600'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="/signup" className={`block text-center py-3 rounded-lg font-semibold transition ${plan.popular ? 'bg-white text-blue-600 hover:bg-blue-50' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'}`}>
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to Scale Your Business?</h2>
            <p className="text-xl mb-8 text-blue-100">Join thousands of sellers managing their inventory smarter</p>
            <a href="/signup" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition">
              Start Free Trial - No Credit Card Required
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">SyncFlow</span>
              </div>
              <p className="text-sm">Smart Inventory & Order Management for E-commerce Sellers</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Integrations</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            © 2025 SyncFlow. All rights reserved. Built by Team SyncFlow - JC Bose YMCA
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;