"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Home, LogOut, X, Menu } from "lucide-react"

export default function EmployeeLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100 text-black">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
          <div className="flex items-center flex-shrink-0 px-4">
            <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
              EM
            </div>
            <span className="ml-2 text-xl font-semibold">Employee Portal</span>
          </div>
          <div className="mt-8 flex flex-col flex-1 px-3 space-y-1">
            <Link href="/employee/dashboard">
              <Button variant="ghost" className="justify-start w-full">
                <Home className="mr-2 h-5 w-5" />
                Dashboard
              </Button>
            </Link>
            <Link href="/employee/applyforleave" className="w-full">
              <Button variant="ghost" className="justify-start w-full">
                <Calendar className="mr-2 h-5 w-5" />
                Apply for Leave
              </Button>
            </Link>
            <Link href="/employee/AttendanceRecord" className="w-full">
              <Button variant="ghost" className="w-full justify-start">
                <Clock className="mr-2 h-5 w-5" />
                Attendance Record
              </Button>
            </Link>
          </div>
          <div className="p-4">
            <Link href="/auth/employee/login">
              <Button variant="outline" className="w-full justify-start">
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                EM
              </div>
              <span className="ml-2 text-xl font-semibold">Employee Portal</span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              <Link href="/employee/dashboard">
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="mr-2 h-5 w-5" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/employee/applyforleave" className="w-full">
                <Button variant="ghost" className="w-full justify-start">
                  <Calendar className="mr-2 h-5 w-5" />
                  Apply for Leave
                </Button>
              </Link>
              <Link href="/employee/AttendanceRecord" className="w-full">
                <Button variant="ghost" className="w-full justify-start">
                  <Clock className="mr-2 h-5 w-5" />
                  Attendance Record
                </Button>
              </Link>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <Link href="/auth/employee/login" className="w-full">
              <Button variant="outline" className="w-full justify-start">
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Mobile header */}
        <div className="md:hidden bg-white shadow-sm z-10">
          <div className="px-4">
            <div className="flex items-center h-16">
              <button
                className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        {children}
      </div>
    </div>
  )
}