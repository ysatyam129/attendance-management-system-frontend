"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
import EmployeeModal from "@/components/EmployeeModal";

export default function AdminDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock employee data
  const employees = [
    {
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
    },
    {
      id: "EMP002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 987-6543",
      designation: "UI/UX Designer",
      department: "Design",
      joiningDate: "2023-02-20",
      employmentType: "Full-time",
      shift: "Morning",
      status: "Active",
    },
    {
      id: "EMP003",
      name: "Robert Johnson",
      email: "robert.j@example.com",
      phone: "+1 (555) 456-7890",
      designation: "Project Manager",
      department: "Management",
      joiningDate: "2023-03-10",
      employmentType: "Full-time",
      shift: "Morning",
      status: "Active",
    },
    {
      id: "EMP004",
      name: "Emily Davis",
      email: "emily.d@example.com",
      phone: "+1 (555) 234-5678",
      designation: "Marketing Specialist",
      department: "Marketing",
      joiningDate: "2023-04-05",
      employmentType: "Contract",
      shift: "Night",
      status: "Inactive",
    },
  ];

  return (
    <div className="flex bg-gray-100 text-black">



      {/* Sidebar - Desktop */}
      {/* <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
          <div className="flex items-center flex-shrink-0 px-4">
            <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
              EM
            </div>
            <span className="ml-2 text-xl font-semibold">Admin Portal</span>
          </div>
          <div className="mt-8 flex flex-col flex-1 px-3 space-y-1">
            <Button variant="ghost" className="justify-start">
              <Users className="mr-2 h-5 w-5" />
              Employees
            </Button>
            <Button variant="ghost" className="justify-start">
              <UserPlus className="mr-2 h-5 w-5" />
              Add Employee
            </Button>
            <Button variant="ghost" className="justify-start">
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Button>
          </div>
          <div className="p-4">
            <Link href="/admin/login">
              <Button variant="outline" className="w-full justify-start">
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </div> */}

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
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
              <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                EM
              </div>
              <span className="ml-2 text-xl font-semibold">Admin Portal</span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-5 w-5" />
                Employees
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <UserPlus className="mr-2 h-5 w-5" />
                Add Employee
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-5 w-5" />
                Settings
              </Button>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <Link href="/admin/login" className="w-full">
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
        {/* <div className="bg-slate-200 shadow-sm z-10 ">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center ">
                <button
                  className="md:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu className="h-6 w-6" />
                </button>
                <h1 className="text-xl font-semibold ml-2 md:ml-0 ">
                  Employee Management
                </h1>
              </div>
              <div className="flex items-center">
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                  <Bell className="h-6 w-6" />
                </button>
                <div className="ml-3 relative">
                  <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                    A
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Employee Management</h2>
            <p className="text-gray-600">
              Manage your employees and their information
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Card className="flex-1">
              <CardHeader className="pb-2">
                <CardTitle>Total Employees</CardTitle>
                <CardDescription>Active and inactive employees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{employees.length}</div>
              </CardContent>
            </Card>
            <Card className="flex-1">
              <CardHeader className="pb-2">
                <CardTitle>Active Employees</CardTitle>
                <CardDescription>Currently working</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {employees.filter((e) => e.status === "Active").length}
                </div>
              </CardContent>
            </Card>
            <Card className="flex-1">
              <CardHeader className="pb-2">
                <CardTitle>Departments</CardTitle>
                <CardDescription>Total departments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Employee List</CardTitle>
                  <CardDescription>Manage employee information</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search employees..." className="pl-9" />
                  </div>
                  <div>
                    <Button
                      className="bg-orange-500 hover:bg-orange-600"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add Employee
                    </Button>
                    <EmployeeModal
                      isOpen={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Designation</TableHead>
                      <TableHead>Employment Type</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>{employee.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-gray-500">
                              {employee.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.designation}</TableCell>
                        <TableCell>{employee.employmentType}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              employee.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {employee.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
