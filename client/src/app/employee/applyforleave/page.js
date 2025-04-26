"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  Trash2,
  Home,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Axios from "utils/Axios";
import { useToast } from "@/components/ui/use-toast";
import {toast} from "sonner";
// import checkAccess from "utils/CheckAcess";

// Custom Calendar Component
function CustomCalendar({
  className,
  classNames,
  showOutsideDays = true,
  selected,
  ...props
}) {
  return (
    <Calendar
      showOutsideDays={showOutsideDays}
      className={cn(
        "p-4 bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-xl shadow-2xl border border-zinc-800",
        "w-[300px] backdrop-blur-sm",
        className
      )}
      classNames={{
        months: "flex flex-col space-y-4",
        month: "space-y-4",
        caption: "flex justify-center pt-2 relative items-center px-8",
        caption_label:
          "text-sm font-semibold text-green-400 flex items-center gap-2",
        nav: "space-x-2 flex items-center",
        nav_button: cn(
          "h-7 w-7 bg-zinc-800/80 rounded-lg p-0 text-white hover:bg-green-500 hover:text-white transition-all duration-200"
        ),
        nav_button_previous: "absolute left-2",
        nav_button_next: "absolute right-2",
        table: "w-full border-collapse space-y-2",
        head_row: "flex",
        head_cell:
          "text-zinc-400 rounded-md w-9 font-medium text-[0.8rem] uppercase tracking-wider",
        row: "flex w-full mt-2",
        cell: cn(
          "text-center text-sm p-0 relative",
          "[&:has([aria-selected])]:bg-green-500/20",
          "first:[&:has([aria-selected])]:rounded-l-md",
          "last:[&:has([aria-selected])]:rounded-r-md",
          "focus-within:relative focus-within:z-20"
        ),
        day: cn(
          "h-9 w-9 p-0 font-normal",
          "aria-selected:opacity-100",
          "text-white hover:bg-zinc-800 hover:text-green-400",
          "rounded-lg transition-all duration-200 hover:scale-110"
        ),
        day_selected: cn(
          "bg-green-500 text-white font-semibold",
          "hover:bg-green-600 hover:text-white",
          "focus:bg-green-600 focus:text-white shadow-lg"
        ),
        day_today:
          "bg-zinc-800/80 text-green-400 font-bold ring-2 ring-green-500/50",
        day_outside: "text-zinc-500 opacity-50 hover:opacity-100",
        day_disabled: "text-zinc-600 opacity-50",
        day_range_middle:
          "aria-selected:bg-green-500/20 aria-selected:text-white",
        day_hidden: "invisible",
        dropdown:
          "appearance-none bg-zinc-800/90 text-white px-3 py-2 rounded-lg text-sm border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-500 transition-all duration-200",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft className="h-4 w-4 text-white hover:text-green-400 transition-colors" />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight className="h-4 w-4 text-white hover:text-green-400 transition-colors" />
        ),
        Dropdown: ({ children, ...props }) => (
          <div className="relative">
            <select
              {...props}
              className="appearance-none bg-zinc-800/90 text-white px-3 py-2 rounded-lg text-sm border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-500 transition-all duration-200 pr-8 cursor-pointer"
            >
              {children}
            </select>
            <CalendarIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-400 pointer-events-none" />
          </div>
        ),
      }}
      selected={selected}
      captionLayout="dropdown-buttons"
      fromYear={2020}
      toYear={2030}
      {...props}
    />
  );
}

export default function ApplyForLeavePage() {
    const [isAuthorized, setIsAuthorized] = useState(false);
  
    useEffect(() => {
      const verifyAccess = async () => {
        try {
          const hasAccess = await checkAccess();
          if (!hasAccess) {
            window.location.href = "/auth/employee/login";
          } else {
            setIsAuthorized(true);
          }
        } catch (error) {
          console.error("Access check failed:", error);
          window.location.href = "/auth/employee/login";
        }
      };
      verifyAccess();
    }, []);
  
    if (!isAuthorized) {
      return null; 
    }
  const [isLeaveFormOpen, setIsLeaveFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedLeaveId, setSelectedLeaveId] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [leaveRecords, setLeaveRecords] = useState([]);
  const [leaveForm, setLeaveForm] = useState({
    leaveType: "",
    reason: "",
    startDate: "",
    endDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fromDateOpen, setFromDateOpen] = useState(false);
  const [toDateOpen, setToDateOpen] = useState(false);
  const [leaveDuration, setLeaveDuration] = useState(0);

  // Today's date for minimum date validation
  const today = new Date();
  const todayFormatted = format(today, "yyyy-MM-dd");

  // Calculate leave statistics
  const totalLeaves = leaveRecords.length;
  const approvedLeaves = leaveRecords.filter(
    (record) => record.status === "Approved"
  ).length;
  const rejectedLeaves = leaveRecords.filter(
    (record) => record.status === "Rejected"
  ).length;
  const pendingLeaves = leaveRecords.filter(
    (record) => record.status === "Pending"
  ).length;

  // Calculate leave duration whenever start or end date changes
  useEffect(() => {
    if (leaveForm.startDate && leaveForm.endDate) {
      const from = new Date(leaveForm.startDate);
      const to = new Date(leaveForm.endDate);
      const diffTime = Math.abs(to - from);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setLeaveDuration(diffDays);
    } else {
      setLeaveDuration(0);
    }
  }, [leaveForm.startDate, leaveForm.endDate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveForm((prev) => ({ ...prev, [name]: value }));
  };
   
  const handleLeaveTypeChange = (value) => {
    setLeaveForm((prev) => ({ ...prev, leaveType: value }));
  };

  const handleFromDateChange = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setLeaveForm((prev) => ({ ...prev, startDate: formattedDate }));
    setFromDateOpen(false);

    // If endDate is before the new startDate, update it
    if (leaveForm.endDate && new Date(leaveForm.endDate) < date) {
      setLeaveForm((prev) => ({ ...prev, endDate: formattedDate }));
    }
  };

  const handleToDateChange = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setLeaveForm((prev) => ({ ...prev, endDate: formattedDate }));
    setToDateOpen(false);
  };

  const getLeaveHistory = async () => {
    try {
      const response = await Axios.get(`/employee/get-leave-history`);
      console.log("Leave history response:", response.data);
      setLeaveRecords(response.data.data || {});
    } catch (error) {
      console.error("Error fetching leave details:", error);
    }
  };

  useEffect(() => {
    getLeaveHistory();
  }, []);

  const handleDeleteLeave = async (leaveId) => {
    try {
      // Store the leave ID to be deleted
      setSelectedLeaveId(leaveId);
      // Open the confirmation dialog
      setIsDeleteDialogOpen(true);
    } catch (error) {
      console.error(
        "%c ❌ Error handling delete:",
        "background: #ef4444; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;",
        error
      );
    }
  };

  const confirmDeleteLeave = async () => {
    try {
      const response = await Axios.post("/employee/delete-leave", {leaveId: selectedLeaveId})

      if(!response){
        toast.error("Something went wrong! Couldn't delete.")
      }

      toast.success("Deleted")

      // Remove the leave record from state
      setLeaveRecords((prev) =>
        prev.filter((record) => record._id !== selectedLeaveId)
      );
    } catch (error) {
      console.error(
        "%c ❌ Delete Error:",
        "background: #ef4444; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;",
        error
      );
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedLeaveId(null);
      getLeaveHistory()
    }
  };
  

  const applyLeave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      console.log("Leave Form Data:", leaveForm);
      const response = await Axios.post("/employee/apply-leave", leaveForm);
      console.log("Leave application submitted successfully:", response.data);

      // Calculate the duration between start and end dates
      const from = new Date(leaveForm.startDate);
      const to = new Date(leaveForm.endDate);
      const diffTime = Math.abs(to - from);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      // Create a new leave record object
      const newLeaveRecord = {
        id: Date.now(), // Temporary ID until we get one from backend
        startDate: leaveForm.startDate,
        endDate: leaveForm.endDate,
        reason: leaveForm.reason,
        leaveType: leaveForm.leaveType,
        status: "Pending", // Default status for new applications
      };

      // Add the new record to the leave records state
      setLeaveRecords((prev) => [...prev, newLeaveRecord]);

      // Reset form
      setLeaveForm((prev) => ({
        ...prev,
        leaveType: "",
        reason: "",
        startDate: "",
        endDate: "",
      }));
    } catch (error) {
      console.error("Error submitting leave application:", error);
    } finally {
      setIsSubmitting(false);
      setIsLeaveFormOpen(false);
      getLeaveHistory()
    }
  };

    const logout =async () => {
      try {
        const response = await Axios.post("/employee/logout");
        if (response.status === 200) {
          window.location.href = "/auth/employee/login";
        } else {
          console.error("Logout failed:", response.data.message);
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
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
            <Link href="/employee/dashboard">
              <Button variant="ghost" className="justify-start w-full">
                <Home className="mr-2 h-5 w-5" />
                Dashboard
              </Button>
            </Link>
            <Link href="/employee/applyforleave" className="w-full">
              <Button variant="ghost" className="justify-start w-full">
                <CalendarIcon className="mr-2 h-5 w-5" />
                Apply for Leave
              </Button>
            </Link>
            {/* <Button variant="ghost" className="justify-start">
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Button> */}
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
              <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                EM
              </div>
              <span className="ml-2 text-xl font-semibold">
                Employee Portal
              </span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              <Link href="/employee/dashboard" className="w-full">
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="mr-2 h-5 w-5" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/employee/applyforleave" className="w-full">
                <Button variant="ghost" className="w-full justify-start">
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  Apply for Leave
                </Button>
              </Link>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">

              <Button variant="outline" className="w-full justify-start" onClick={() => logout()}>
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </Button>
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
                <h1 className="text-xl font-semibold ml-2 md:ml-0">
                  Attendance & Leave Management
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-4 sm:p-6 lg:p-8 text-black">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold">
                Attendance & Leave Management
              </h2>
              <p className="text-gray-600">
                Manage your leave requests and view history
              </p>
            </div>
            <Button
              onClick={() => setIsLeaveFormOpen(true)}
              className="bg-green-500 hover:bg-green-600 w-full md:w-auto"
            >
              <CalendarIcon className="mr-2 h-5 w-5" />
              Apply for Leave
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-white shadow hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Leaves</CardTitle>
                <CardDescription className="text-black">
                  All leave requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{totalLeaves}</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow hover:shadow-md transition-shadow text-black">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Approved Leaves</CardTitle>
                <CardDescription className="text-black">
                  Successfully approved
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">
                  {approvedLeaves}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Rejected Leaves</CardTitle>
                <CardDescription>Declined requests</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-red-600">
                  {rejectedLeaves}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Pending Leaves</CardTitle>
                <CardDescription>Awaiting approval</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-yellow-600">
                  {pendingLeaves}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white shadow mb-6">
            <CardHeader>
              <CardTitle>Leave History</CardTitle>
              <CardDescription>
                Your previous leave requests and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>From Date</TableHead>
                      <TableHead>To Date</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Leave Type</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveRecords.map((record) => {
                      // Calculate days difference
                      const from = new Date(record.startDate);
                      const to = new Date(record.endDate);
                      const diffTime = Math.abs(to - from);
                      const diffDays =
                        Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

                      return (
                        <TableRow key={record._id} className="hover:bg-gray-50">
                          <TableCell>
                            {format(new Date(record.startDate), "dd MMM yyyy")}
                          </TableCell>
                          <TableCell>
                            {format(new Date(record.endDate), "dd MMM yyyy")}
                          </TableCell>
                          <TableCell>{diffDays}</TableCell>
                          <TableCell>{record.leaveType}</TableCell>
                          <TableCell>{record.reason}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium
                              ${
                                record.status === "Approved"
                                  ? "bg-green-100 text-green-800"
                                  : record.status === "Rejected"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {record.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right text-black">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDeleteLeave(record._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Leave Application Form Dialog */}
          <Dialog open={isLeaveFormOpen} onOpenChange={setIsLeaveFormOpen}>
            <DialogContent className="bg-white sm:max-w-md text-black">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5 text-green-500" />
                  Apply for Leave
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={applyLeave}>
                <div className="grid gap-4 py-4 text-black">
                  <div className="grid grid-cols-1 gap-2 text-black">
                    <Label htmlFor="leaveType">Leave Type</Label>
                    <Select
                      value={leaveForm.leaveType}
                      onValueChange={handleLeaveTypeChange}
                      required
                    >
                      <SelectTrigger className="focus:ring-2 focus:ring-green-500">
                        <SelectValue placeholder="Select leave type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-black">
                        <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                        <SelectItem value="Casual Leave">
                          Casual Leave
                        </SelectItem>
                        <SelectItem value="Earned Leave">
                          Earned Leave
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {/* From Date with Custom Calendar Popup */}
                    <div className="grid grid-cols-1 gap-2">
                      <Label htmlFor="fromDate" className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2 text-green-500" />
                        From Date
                      </Label>
                      <Popover
                        open={fromDateOpen}
                        onOpenChange={setFromDateOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal relative",
                              !leaveForm.startDate && "text-gray-500",
                              "border border-gray-200 bg-white hover:bg-gray-50 group"
                            )}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 rounded-md transition-opacity duration-300"></div>
                            <CalendarIcon className="mr-2 h-4 w-4 text-green-500" />
                            {leaveForm.startDate
                              ? format(new Date(leaveForm.startDate), "PPP")
                              : "Select start date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="p-0 border-0 shadow-xl"
                          align="start"
                        >
                          <div className="animate-in zoom-in-95 duration-100">
                            <CustomCalendar
                              mode="single"
                              selected={
                                leaveForm.startDate
                                  ? new Date(leaveForm.startDate)
                                  : undefined
                              }
                              onSelect={handleFromDateChange}
                              initialFocus
                              disabled={(date) => date < today}
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                      <p className="text-xs text-gray-500 mt-1">
                        Select your leave start date
                      </p>
                    </div>

                    {/* To Date with Custom Calendar Popup */}
                    <div className="grid grid-cols-1 gap-2">
                      <Label htmlFor="toDate" className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2 text-green-500" />
                        To Date
                      </Label>
                      <Popover open={toDateOpen} onOpenChange={setToDateOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal relative",
                              !leaveForm.endDate && "text-gray-500",
                              "border border-gray-200 bg-white hover:bg-gray-50 group"
                            )}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 rounded-md transition-opacity duration-300"></div>
                            <CalendarIcon className="mr-2 h-4 w-4 text-green-500" />
                            {leaveForm.endDate
                              ? format(new Date(leaveForm.endDate), "PPP")
                              : "Select end date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="p-0 border-0 shadow-xl"
                          align="start"
                        >
                          <div className="animate-in zoom-in-95 duration-100">
                            <CustomCalendar
                              mode="single"
                              selected={
                                leaveForm.endDate
                                  ? new Date(leaveForm.endDate)
                                  : undefined
                              }
                              onSelect={handleToDateChange}
                              initialFocus
                              disabled={(date) =>
                                date < today ||
                                (leaveForm.startDate &&
                                  date < new Date(leaveForm.startDate))
                              }
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                      <p className="text-xs text-gray-500 mt-1">
                        Select your leave end date
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <Label htmlFor="reason" className="flex items-center">
                      Reason for Leave
                    </Label>
                    <Textarea
                      id="reason"
                      name="reason"
                      value={leaveForm.reason}
                      onChange={handleInputChange}
                      placeholder="Please provide details about your leave request"
                      className="min-h-24 focus:ring-2 focus:ring-green-500 text-black bg-white border border-gray-200"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Please be specific about the reason for your leave request
                    </p>
                  </div>

                  {/* Show leave duration calculation if both dates are selected */}
                  {leaveForm.startDate && leaveForm.endDate && (
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200 shadow-inner">
                      <h4 className="font-medium text-green-700 flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Leave Duration
                      </h4>
                      <p className="text-green-800 text-lg font-semibold">
                        {leaveDuration} {leaveDuration === 1 ? "Day" : "Days"}
                      </p>
                    </div>
                  )}
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsLeaveFormOpen(false)}
                    type="button"
                    className="bg-white text-black border border-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white"
                    disabled={
                      isSubmitting ||
                      !leaveForm.leaveType ||
                      !leaveForm.startDate ||
                      !leaveForm.endDate ||
                      !leaveForm.reason
                    }
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-red-700">Are you sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-black">
                  This action cannot be undone. This will permanently delete
                  your leave application.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-white text-black border border-gray-300 hover:bg-gray-50">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={confirmDeleteLeave}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
