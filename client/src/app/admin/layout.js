"use client";

import { useState } from "react";
// import Sidebar from "@/components/Sidebar";
// import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import Naavbar from "@/components/Naavbar";
import { Toaster } from "@/components/ui/sonner";
// import Navigation from "@/components/admin-nav";
export default function AdminLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      {/* Sidebar Component */}
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <Toaster />
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation Component */}
        <Naavbar setIsMobileMenuOpen={setIsMobileMenuOpen} />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-100  p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
       
    </div>
  );
}
