"use client";

import { useState, useEffect, useRef } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Search, Check, X, Bell, Filter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Axios from "utils/Axios";

export default function LeaveNotificationsPage() {
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const prevLeaveIdsRef = useRef(new Set());
  const [rejectionOpen, setRejectionOpen] = useState(false);
  const [rejectionReason, setrejectionReason] = useState("");
  const [pendingRejectionLeaveId, setPendingRejectionLeaveId] = useState(null);

  const leaveDetail = async () => {
    try {
      const response = await Axios.get(`/get-leave-history`);
      console.log("Leave history response:", response.data.data);
      
      // Instead of directly setting state, we'll handle updates more carefully
      updateLeaveApplications(response.data.data || []);
    } catch (error) {
      console.error("Error fetching leave details:", error);
      setError("Failed to load leave details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to update leave applications without causing layout shifts
  const updateLeaveApplications = (newData) => {
    setLeaveApplications(prevLeaves => {
      // Get the current IDs
      const currentIds = new Set(prevLeaves.map(leave => leave._id));
      prevLeaveIdsRef.current = currentIds;
      
      // Determine which entries are new or existing
      return newData.map(leave => {
        // Keep existing objects the same to prevent re-renders
        const existingLeave = prevLeaves.find(l => l._id === leave._id);
        if (existingLeave) {
          // Only update if something has changed
          if (existingLeave.status !== leave.status) {
            return { ...existingLeave, ...leave };
          }
          return existingLeave;
        }
        return leave;
      });
    });
  };

  useEffect(() => {
    leaveDetail();
    
    // Set up polling for new leave applications
  
  }, []);

  const handleStatusChange = async (leaveId, newStatus, rejectionReason = null) => {
    setIsUpdating(true);
    try {
      // Include rejection reason if status is Rejected
      const payload = { leaveId, status: newStatus };
      if (newStatus === "Rejected" && rejectionReason) {
        payload.rejectionReason = rejectionReason;
      }
      
      await Axios.patch(`/set-leave-status`, payload);

      // Update leave status without causing layout shift
      setLeaveApplications(prev =>
        prev.map(leave =>
          leave._id === leaveId 
            ? { 
                ...leave, 
                status: newStatus,
                ...(newStatus === "Rejected" && rejectionReason ? {rejectionReason } : {})
              } 
            : leave
        )
      );

      if (selectedLeave && selectedLeave._id === leaveId) {
        setSelectedLeave((prev) => ({ 
          ...prev, 
          status: newStatus,
          ...(newStatus === "Rejected" && rejectionReason ? { rejectionReason } : {})
        }));
      }
      setError("");
    } catch (error) {
      console.error("Error updating leave status:", error);
      setError("Failed to update leave status. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
  };

  const viewLeaveDetails = (leave) => {
    setSelectedLeave(leave);
    setDetailsOpen(true);
  };

  const openRejectionDialog = (leaveId) => {
    setPendingRejectionLeaveId(leaveId);
    setrejectionReason("");
    setRejectionOpen(true);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      setError("Please provide a rejection reason.");
      return;
    }
    
    handleStatusChange(pendingRejectionLeaveId, "Rejected", rejectionReason);
    setRejectionOpen(false);
    
    // If we're rejecting from the details modal, close it too
    if (detailsOpen && selectedLeave && selectedLeave._id === pendingRejectionLeaveId) {
      setDetailsOpen(false);
    }
  };

  // Filter leave applications based on search term and status filter
  const filteredLeaveApplications = leaveApplications.filter((leave) => {
    const matchesSearch =
      leave.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.employeeEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.department?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      leave.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Count leaves by status
  const pendingCount = leaveApplications.filter(
    (leave) => leave.status === "Pending"
  ).length;
  const approvedCount = leaveApplications.filter(
    (leave) => leave.status === "Approved"
  ).length;
  const rejectedCount = leaveApplications.filter(
    (leave) => leave.status === "Rejected"
  ).length;

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(timestamp).toLocaleString(undefined, options);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-100 p-4 sm:p-6 lg:p-8 text-black">
      <div className="mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <Bell className="mr-2 h-6 w-6 text-orange-500" />
          Leave Notifications
        </h2>
        <p className="text-gray-600">
          Manage and respond to employee leave requests
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white shadow hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Leave Requests</CardTitle>
            <CardDescription>All leave applications</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{leaveApplications.length}</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-yellow-600">
              Pending Requests
            </CardTitle>
            <CardDescription>Awaiting your review</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-600">
              Approved Leaves
            </CardTitle>
            <CardDescription>Approved applications</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-red-600">
              Rejected Leaves
            </CardTitle>
            <CardDescription>Declined applications</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white shadow mb-6">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Leave Applications</CardTitle>
              <CardDescription>
                Review and manage employee leave requests
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-black" />
                <Input
                  placeholder="Search by name, ID, email..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="min-w-40 relative">
                <Select
                  value={statusFilter}
                  onValueChange={handleStatusFilterChange}
                >
                  <SelectTrigger className="w-full bg-white border border-gray-200 text-black">
                    <div className="flex items-center text-black">
                      <Filter className="h-4 w-4 mr-2 text-gray-500" />
                      <SelectValue placeholder="Filter by status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    <SelectItem
                      value="all"
                      className="text-black hover:bg-gray-100"
                    >
                      All Status
                    </SelectItem>
                    <SelectItem
                      value="pending"
                      className="text-black hover:bg-gray-100"
                    >
                      Pending
                    </SelectItem>
                    <SelectItem
                      value="approved"
                      className="text-black hover:bg-gray-100"
                    >
                      Approved
                    </SelectItem>
                    <SelectItem
                      value="rejected"
                      className="text-black hover:bg-gray-100"
                    >
                      Rejected
                    </SelectItem>
                  </SelectContent>
                </Select>
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
            <div className="text-center py-8">
              Loading leave applications...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="table-fixed">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/5">Employee</TableHead>
                    <TableHead className="w-1/6">Department</TableHead>
                    <TableHead className="w-1/5">Leave Period</TableHead>
                    <TableHead className="w-1/6">Submitted On</TableHead>
                    <TableHead className="w-1/12">Status</TableHead>
                    <TableHead className="w-1/6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeaveApplications.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        {searchTerm || statusFilter !== "all"
                          ? "No leave applications match your search/filter"
                          : "No leave applications found"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLeaveApplications.map((leave) => (
                      <TableRow key={leave._id} className="hover:bg-gray-50">
                        <TableCell className="max-w-52 truncate">
                          <div className="max-w-full">
                            <div className="font-medium">
                              {leave.employeeName}
                            </div>
                            <div className="text-sm text-gray-500 truncate">
                              {leave.employeeId}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-32 truncate">{leave.department}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="px-2 py-1 bg-gray-50 rounded-md border border-gray-200 text-sm">
                                {formatDate(leave.startDate)}
                              </span>
                              {leave.startDate !== leave.endDate && (
                                <>
                                  <span className="text-gray-400">→</span>
                                  <span className="px-2 py-1 bg-gray-50 rounded-md border border-gray-200 text-sm">
                                    {formatDate(leave.endDate)}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="text-sm">
                          {formatTimestamp(leave.submittedAt)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              leave.status === "Approved"
                                ? "bg-green-100 text-green-800"
                                : leave.status === "Rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {leave.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => viewLeaveDetails(leave)}
                            >
                              View
                            </Button>
                            {leave.status === "Pending" && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-green-100 hover:bg-green-200 text-green-800 border-green-200"
                                  onClick={() =>
                                    handleStatusChange(leave._id, "Approved")
                                  }
                                  disabled={isUpdating}
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-red-100 hover:bg-red-200 text-red-800 border-red-200"
                                  onClick={() => openRejectionDialog(leave._id)}
                                  disabled={isUpdating}
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Leave Details Modal */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="bg-white sm:max-w-[800px] text-black">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Leave Request Details
            </DialogTitle>
          </DialogHeader>

          {selectedLeave && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-lg">Employee Information</h3>
                  <Badge
                    className={
                      selectedLeave.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : selectedLeave.status === "Rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {selectedLeave.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-2 bg-white rounded border border-gray-100">
                    <p className="text-gray-500 mb-1">Name:</p>
                    <p className="font-medium">{selectedLeave.employeeName}</p>
                  </div>
                  <div className="p-2 bg-white rounded border border-gray-100">
                    <p className="text-gray-500 mb-1 ">Employee ID:</p>
                    <p className="font-medium truncate">
                      {selectedLeave.employeeId}
                    </p>
                  </div>
                  <div className="p-2 bg-white rounded border border-gray-100">
                    <p className="text-gray-500 mb-1">Email:</p>
                    <p className="font-medium break-words overflow-hidden">
                      {selectedLeave.employeeEmail}
                    </p>
                  </div>
                  <div className="p-2 bg-white rounded border border-gray-100">
                    <p className="text-gray-500 mb-1">Department:</p>
                    <p className="font-medium truncate">
                      {selectedLeave.department}
                    </p>
                  </div>
                  <div className="p-2 bg-white rounded border border-gray-100">
                    <p className="text-gray-500">Employee Type:</p>
                    <p className="font-medium">{selectedLeave.employeeType}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-medium mb-4">Leave Details</h3>
                <div className="grid grid-cols-3 gap-4 text-sm mb-2">
                  <div>
                    <p className="text-gray-500">From Date:</p>
                    <p className="font-medium">
                      {formatDate(selectedLeave.startDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">To Date:</p>
                    <p className="font-medium">
                      {formatDate(selectedLeave.endDate)}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">Submitted On:</p>
                    <p className="font-medium">
                      {formatTimestamp(selectedLeave.submittedAt)}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-gray-500">Reason for Leave:</p>
                  <p className="mt-2 p-4 bg-white rounded border border-gray-200">
                    {selectedLeave.reason}
                  </p>
                </div>
                
                {/* Display rejection reason if status is Rejected */}
                {selectedLeave.status === "Rejected" && selectedLeave.rejectedReason && (
                  <div className="mt-4">
                    <p className="text-gray-500">Rejection Reason:</p>
                    <p className="mt-2 p-4 bg-red-50 rounded border border-red-200 text-red-800">
                      {selectedLeave.rejectedReason}
                    </p>
                  </div>
                )}
              </div>

              {selectedLeave.status === "Pending" && (
                <div className="flex justify-end space-x-2 pt-2">
                  <Button
                    variant="outline"
                    className="bg-red-100 hover:bg-red-200 text-red-800 border-red-200"
                    onClick={() => {
                      openRejectionDialog(selectedLeave._id);
                    }}
                    disabled={isUpdating}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject Request
                  </Button>
                  <Button
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => {
                      handleStatusChange(selectedLeave._id, "Approved");
                      setDetailsOpen(false);
                    }}
                    disabled={isUpdating}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve Request
                  </Button>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rejection Reason Modal */}
      <Dialog open={rejectionOpen} onOpenChange={setRejectionOpen}>
        <DialogContent className="bg-white sm:max-w-[500px] text-black">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Rejection Reason
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="mb-4 text-gray-600">
              Please provide a reason for rejecting this leave request.
              This will be visible to the employee.
            </p>
            <Textarea
              placeholder="Enter rejection reason..."
              className="min-h-32"
              value={rejectionReason}
              onChange={(e) => setrejectionReason(e.target.value)}
            />
            {error && rejectionReason.trim() === "" && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>
          
          <DialogFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setRejectionOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white" 
              onClick={handleReject}
              disabled={isUpdating || !rejectionReason.trim()}
            >
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}