// app/(dashboard)/layout.jsx
// ========================================

'use client';
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="lg:pl-64">
        <Header setIsOpen={setSidebarOpen} />
        
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}