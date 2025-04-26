"use client";

import { useState, useEffect } from "react";
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

  const leaveDetail = async () => {
    try {
      const response = await Axios.get(`/get-leave-history`);
      console.log("Leave history response:", response.data.data);
      setLeaveApplications(response.data.data || {});
    } catch (error) {
      console.error("Error fetching leave details:", error);
      setError("Failed to load leave details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    leaveDetail();
  }, []);

  const handleStatusChange = async (leaveId, newStatus) => {
    setIsUpdating(true);
    try {
      await Axios.patch(`/set-leave-status`, { leaveId, status: newStatus });

      setLeaveApplications((prev) =>
        prev.map((leave) =>
          leave.id === leaveId ? { ...leave, status: newStatus } : leave
        )
      );

      if (selectedLeave && selectedLeave.id === leaveId) {
        setSelectedLeave((prev) => ({ ...prev, status: newStatus }));
      }
      setError("");
    } catch (error) {
      console.error("Error updating leave status:", error);
      setError("Failed to update leave status. Please try again.");
    } finally {
      setIsUpdating(false);
      leaveDetail();
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
  console.log("Leave applications", leaveApplications);
  console.log(
    "Searched add filtered leave applications",
    filteredLeaveApplications
  );

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
              <div className="min-w-40 text-black">
                <Select
                  value={statusFilter}
                  onValueChange={handleStatusFilterChange}
                >
                  <SelectTrigger className="w-full text-black">
                    <div className="flex items-center text-black">
                      <Filter className="h-4 w-4 mr-2 text-black" />
                      <SelectValue placeholder="Filter by status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Leave Period</TableHead>

                    <TableHead>Submitted On</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {console.log(
                    "Filtered leave application ",
                    filteredLeaveApplications
                  )}
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
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {leave.employeeName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {leave.employeeId}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{leave.department}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                           
                            <div className="flex items-center space-x-2">
                              <span className="px-2 py-1 bg-gray-50 rounded-md border border-gray-200">
                                {formatDate(leave.startDate)}
                              </span>
                              {leave.startDate !== leave.endDate && (
                                <>
                                  <span className="text-gray-400">→</span>
                                  <span className="px-2 py-1 bg-gray-50 rounded-md border border-gray-200">
                                    {formatDate(leave.endDate)}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
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
                          <div className="flex space-x-2">
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
                                  onClick={() =>
                                    handleStatusChange(leave._id, "Rejected")
                                  }
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
        <DialogContent className="bg-white sm:max-w-md text-black">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Leave Request Details
            </DialogTitle>
          </DialogHeader>

          {selectedLeave && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Employee Information</h3>
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
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Name:</p>
                    <p className="font-medium">{selectedLeave.employeeName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Employee ID:</p>
                    <p className="font-medium">{selectedLeave.employeeId}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Email:</p>
                    <p className="font-medium">{selectedLeave.employeeEmail}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Department:</p>
                    <p className="font-medium">{selectedLeave.department}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Employee Type:</p>
                    <p className="font-medium">{selectedLeave.employeeType}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Leave Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm mb-2">
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
                <div className="mt-2">
                  <p className="text-gray-500">Reason for Leave:</p>
                  <p className="mt-1 p-2 bg-white rounded border border-gray-200">
                    {selectedLeave.reason}
                  </p>
                </div>
              </div>

              {selectedLeave.status === "Pending" && (
                <div className="flex justify-end space-x-2 pt-2">
                  <Button
                    variant="outline"
                    className="bg-red-100 hover:bg-red-200 text-red-800 border-red-200"
                    onClick={() => {
                      handleStatusChange(selectedLeave.id, "Rejected");
                      setDetailsOpen(false);
                    }}
                    disabled={isUpdating}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject Request
                  </Button>
                  <Button
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => {
                      handleStatusChange(selectedLeave.id, "Approved");
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
    </div>
  );
}
