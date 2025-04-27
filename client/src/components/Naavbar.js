"use client"

import React from 'react'
import { useState } from "react";
// import Link from "next/link";


import {
  Users,
  UserPlus,
  Search,
  LogOut,
  Settings,
  Bell,
  Menu,
  X,
} from "lucide-react";




const Navbar = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
     <div className="bg-slate-200 shadow-sm z-10 ">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center ">
                <button
                  className="md:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu className="h-6 w-6" />
                </button>
                <h1 className=" text-black text-xl font-semibold ml-2 md:ml-0 ">
                  Employee Management
                </h1>
              </div>
              <div className="flex items-center">
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                  {/* <Bell className="h-6 w-6" /> */}
                </button>
                <div className="ml-3 relative">
                  <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                    A
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Navbar
