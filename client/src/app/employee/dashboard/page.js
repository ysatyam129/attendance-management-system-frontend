"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, FileText, Home, LogOut, Settings, Bell, Menu, X, User } from "lucide-react"

export default function EmployeeDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Mock employee data
  const employee = {
    id: "EMP001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    designation: "Software Engineer",
    department: "Engineering",
    joiningDate: "2023-01-15",
    employmentType: "Full-time",
    shift: "Morning",
    status: "Active",
  }

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
            <Button variant="ghost" className="justify-start">
              <Home className="mr-2 h-5 w-5" />
              Dashboard
            </Button>
            <Button variant="ghost" className="justify-start">
              <Calendar className="mr-2 h-5 w-5" />
              Attendance
            </Button>
            <Button variant="ghost" className="justify-start">
              <FileText className="mr-2 h-5 w-5" />
              Documents
            </Button>
            <Button variant="ghost" className="justify-start">
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Button>
          </div>
          <div className="p-4">
            <Link href="/employee/login">
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
              <Button variant="ghost" className="w-full justify-start">
                <Home className="mr-2 h-5 w-5" />
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Calendar className="mr-2 h-5 w-5" />
                Attendance
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-2 h-5 w-5" />
                Documents
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-5 w-5" />
                Settings
              </Button>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <Link href="/employee/login" className="w-full">
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
        {/* Top navigation */}
        <div className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  className="md:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu className="h-6 w-6" />
                </button>
                <h1 className="text-xl font-semibold ml-2 md:ml-0">Employee Dashboard</h1>
              </div>
              <div className="flex items-center">
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                  <Bell className="h-6 w-6" />
                </button>
                <div className="ml-3 relative">
                  <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                    {employee.name.charAt(0)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Welcome, {employee.name}</h2>
            <p className="text-gray-600">
              {employee.designation} - {employee.department}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Today &apos; s Shift</CardTitle>
                <CardDescription>Your working hours</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-green-500" />
                <span>{employee.shift} Shift (9:00 AM - 5:00 PM)</span>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Employment Status</CardTitle>
                <CardDescription>Your current status</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center">
                <User className="h-5 w-5 mr-2 text-green-500" />
                <span>
                  {employee.employmentType} - {employee.status}
                </span>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Joining Date</CardTitle>
                <CardDescription>When you started</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-green-500" />
                <span>
                  {new Date(employee.joiningDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your employee details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Employee ID</h3>
                    <p>{employee.id}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                    <p>{employee.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p>{employee.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                    <p>{employee.phone}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Designation</h3>
                    <p>{employee.designation}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Department</h3>
                    <p>{employee.department}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}