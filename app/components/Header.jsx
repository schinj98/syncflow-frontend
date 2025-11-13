'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

import { 
  Menu, Bell, Search, X, User, Mail, Phone, 
  LogOut, Settings, Package, ShoppingCart, 
  AlertCircle, CheckCircle 
} from 'lucide-react';

export default function Header({ setIsOpen }) {

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // NEW STATE FOR USER
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [avatarLetter, setAvatarLetter] = useState("U");

  // Load User Data From LocalStorage
  useEffect(() => {
    const name = localStorage.getItem("userName") || "";
    const email = localStorage.getItem("email") || "";
    
    setUserName(name);
    setUserEmail(email);

    if (name && name.length > 0) {
      setAvatarLetter(name.charAt(0).toUpperCase());
    }
  }, []);

  const [notifications, setNotifications] = useState([
    // … existing notification JSON (same as your code)
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

        {/* LEFT SIDE */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsOpen(prev => !prev)}
            className="lg:hidden text-gray-600 hover:text-gray-900 transition"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Search */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-96">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search orders, products..." 
              className="placeholder-gray-500 bg-transparent outline-none w-full text-sm"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* ----- NOTIFICATION ----- */}
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

            {/* Notification dropdown (unchanged except your code) */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
                {/* ... SAME YOUR CODE ... */}
              </div>
            )}

          </div>

          {/* ----- PROFILE DROPDOWN ----- */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
              className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg p-1 sm:p-2 transition"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                {avatarLetter}
              </div>
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">

                {/* HEADER WITH NAME & EMAIL */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-2xl font-bold">
                      {avatarLetter}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{userName || "User"}</h3>
                      <p className="text-blue-100 text-sm">{userEmail || "email@example.com"}</p>
                    </div>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-900">{userEmail}</p>
                    </div>
                  </div>
                </div>

                {/* MENU ITEMS */}
                <div className="border-t border-gray-200"></div>
                <div className="p-2">
                  <Link href="/profile" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition">
                    <User className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">My Profile</span>
                  </Link>

                  <Link href="/settings" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition">
                    <Settings className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Settings</span>
                  </Link>

                  <Link href="/products" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition">
                    <Package className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">My Orders</span>
                  </Link>
                </div>

                <div className="border-t border-gray-200"></div>

                {/* Logout */}
                <div className="p-2">
                  <button className="flex items-center gap-3 p-3 hover:bg-red-50 rounded-lg transition text-left w-full">
                    <LogOut className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-medium text-red-600">Log Out</span>
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>

      {/* MOBILE SEARCH */}
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
