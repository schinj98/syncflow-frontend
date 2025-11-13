import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

import { Menu, Bell, Search, X, User, Mail, Phone, LogOut, Settings, Package, ShoppingCart, AlertCircle, CheckCircle } from 'lucide-react';

export default function Header({ setIsOpen }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'New Order Received',
      message: 'Order #ORD-1234 from Rajesh Kumar',
      time: '5 mins ago',
      read: false,
      icon: <ShoppingCart className="w-5 h-5" />
    },
    {
      id: 2,
      type: 'alert',
      title: 'Low Stock Alert',
      message: 'Product "Wireless Mouse" is running low',
      time: '1 hour ago',
      read: false,
      icon: <AlertCircle className="w-5 h-5" />
    },
    {
      id: 3,
      type: 'success',
      title: 'Order Delivered',
      message: 'Order #ORD-1230 has been delivered',
      time: '3 hours ago',
      read: true,
      icon: <CheckCircle className="w-5 h-5" />
    },
    {
      id: 4,
      type: 'order',
      title: 'New Order Received',
      message: 'Order #ORD-1235 from Priya Sharma',
      time: '5 hours ago',
      read: true,
      icon: <ShoppingCart className="w-5 h-5" />
    }
  ]);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getNotificationColor = (type) => {
    switch(type) {
      case 'order': return 'text-blue-600 bg-blue-100';
      case 'alert': return 'text-yellow-600 bg-yellow-100';
      case 'success': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 lg:px-14 py-1">
        {/* Left: Menu Button & Search */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsOpen(prev => !prev)}
            className="lg:hidden text-gray-600 hover:text-gray-900 transition"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-96">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search orders, products..." 
              className="placeholder-gray-500 bg-transparent outline-none w-full text-sm"
            />
          </div>
        </div>

        {/* Right: Notifications & Profile */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* Notifications Dropdown */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
              }}
              className="relative py-3 text-gray-600 hover:text-gray-900 transition p-2 hover:bg-gray-100 rounded-lg"
            >
              <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-semibold">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Panel */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="font-bold text-gray-900 text-lg">Notifications</h3>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllAsRead}
                      className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                {/* Notifications List */}
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-sm">No notifications</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)}`}>
                            {notification.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-semibold text-gray-900 text-sm">
                                {notification.title}
                              </h4>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  clearNotification(notification.id);
                                }}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                  <div className="p-3 bg-gray-50 border-t border-gray-200 text-center">
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                      View All Notifications
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
              className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg p-1 sm:p-2 transition"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                V
              </div>
            </button>

            {/* Profile Panel */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
                {/* Profile Header */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-2xl font-bold">
                      V
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Vikram Singh</h3>
                      <p className="text-blue-100 text-sm">Administrator</p>
                    </div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-900">vikram.singh@store.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-medium text-gray-900">+91 98765 43210</p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200"></div>

                {/* Menu Items */}
                {/* Menu Items */}
<div className="p-2">
  <Link 
    href="/profile"
    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition text-left"
    onClick={() => setShowProfile(false)} // optional: close dropdown on click
  >
    <User className="w-5 h-5 text-gray-500" />
    <span className="text-sm font-medium text-gray-700">My Profile</span>
  </Link>

  <Link 
    href="/settings"
    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition text-left"
    onClick={() => setShowProfile(false)}
  >
    <Settings className="w-5 h-5 text-gray-500" />
    <span className="text-sm font-medium text-gray-700">Settings</span>
  </Link>

  <Link 
    href="/products"
    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition text-left"
    onClick={() => setShowProfile(false)}
  >
    <Package className="w-5 h-5 text-gray-500" />
    <span className="text-sm font-medium text-gray-700">My Orders</span>
  </Link>
</div>


                {/* Divider */}
                <div className="border-t border-gray-200"></div>

                {/* Logout */}
                <div className="p-2">
                  <button className="w-full flex items-center gap-3 p-3 hover:bg-red-50 rounded-lg transition text-left group">
                    <LogOut className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-medium text-red-600">Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-4">
        <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search orders, products..." 
            className="placeholder-gray-500 bg-transparent outline-none w-full text-sm"
          />
        </div>
      </div>
    </header>
  );
}