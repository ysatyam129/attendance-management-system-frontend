"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Axios from "utils/Axios";

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
import EditDetails from "@/components/EditDetails";
import DeleteModal from "@/components/DeleteModal";

export default function AdminDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [isModaEditDetailsOpen, setIsModaEditDetailsOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const response = await Axios.get("/get-employees");
      setEmployees(response.data.data || []);
      setError("");
    } catch (error) {
      console.error("Error fetching employees:", error);
      setError("Failed to load employees. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmployeeAdded = (newEmployee) => {
    // Add the new employee to the list
    setEmployees((prev) => [...prev, newEmployee]);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter((employee) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      employee.employeeId?.toLowerCase().includes(searchLower) ||
      employee.fullname?.toLowerCase().includes(searchLower) ||
      employee.email?.toLowerCase().includes(searchLower) ||
      employee.department?.toLowerCase().includes(searchLower) ||
      employee.designations?.toLowerCase().includes(searchLower)
    );
  });

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="flex bg-gray-100 text-black">
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
                Mark attendance
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-5 w-5" />
                Settings
              </Button>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <Link href="/auth/admin/login" className="w-full">
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
                  {employees.filter((e) => e.status === "active").length}
                </div>
              </CardContent>
            </Card>
            <Card className="flex-1">
              <CardHeader className="pb-2">
                <CardTitle>Departments</CardTitle>
                <CardDescription>Total departments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {new Set(employees.map((e) => e.department)).size}
                </div>
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
                    <Input
                      placeholder="Search employees..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
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
                      onEmployeeAdded={handleEmployeeAdded}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              )}

              {isLoading ? (
                <div className="text-center py-8">Loading employees...</div>
              ) : (
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
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEmployees.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-4">
                            {searchTerm
                              ? "No employees match your search"
                              : "No employees found"}
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredEmployees.map((employee) => (
                          <TableRow key={employee._id || employee.employeeId}>
                            <TableCell>{employee.employeeId}</TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">
                                  {employee.fullname}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {employee.email}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{employee.department}</TableCell>
                            <TableCell>{employee.designation}</TableCell>
                            <TableCell>{employee.employeeType}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  employee.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }
                              >
                                {employee.status === "active"
                                  ? "Active"
                                  : "Inactive"}
                              </Badge>
                            </TableCell>

                            <TableCell>
                              <Button
                                className="btn bg-green-400 hover:bg-green-700"
                                onClick={() => {
                                  setSelectedEmployee(employee); // Store the full employee object
                                  setIsModaEditDetailsOpen(true);
                                }}
                              >
                                Edit
                              </Button>
                              <Button className="btn bg-red-400 hover:bg-red-700"
                              onClick={() => {
                                setSelectedEmployee(employee); // Store the full employee object
                                setIsModalDeleteOpen(true);
                              }}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                  {isModaEditDetailsOpen && (
                    <EditDetails
                      isOpen={isModaEditDetailsOpen}
                      setIsModaEditDetailsOpen={setIsModaEditDetailsOpen}
                      employeeDataDetails={selectedEmployee}
                      onClose={() => {
                        setIsModaEditDetailsOpen(false);
                        setSelectedEmployee(null); // Clear the selected employee when closing
                      }}
                      onEmployeeAdded={handleEmployeeAdded}
                    />
                  )}
                   {isModalDeleteOpen && (
                    <DeleteModal
                      isOpen={isModalDeleteOpen}
                      setIsModaDeleteModalOpen={setIsModalDeleteOpen}
                      employeeDataDetails={selectedEmployee}
                      onClose={() => {
                        setIsModalDeleteOpen(false);
                      }}
                      onEmployeeAdded={handleEmployeeAdded}
                    />
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
