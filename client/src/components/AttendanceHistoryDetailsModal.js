import { useState, useEffect } from "react";
import { X, Calendar, Users, UserCheck, UserX, Clock, Download } from "lucide-react";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export default function AttendanceHistoryDetailsModal({
  isOpen,
  onClose,
  employeeDataDetails,
}) {
  console.log("AttendanceHistoryDetailsModal", employeeDataDetails);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [attendanceCounts, setAttendanceCounts] = useState({
    present: 0,
    absent: 0,
    late: 0,
    total: 0,
  });
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [showExportMenu, setShowExportMenu] = useState(false);
  console.log("employeeDataDetails", employeeDataDetails);

  // Process attendance data when modal opens
  useEffect(() => {
    if (isOpen && employeeDataDetails) {
      processAttendanceData(employeeDataDetails);
    }
  }, [isOpen, employeeDataDetails]);

  const processAttendanceData = (data) => {
    try {
      if (!data) {
        console.error("No data provided");
        return;
      }

      // Set the selected date
      setSelectedDate(data.date);

      // Ensure records exist and are in the correct format
      if (!Array.isArray(data.records)) {
        console.error("Invalid records format");
        return;
      }

      // Format records for display
      const formattedRecords = data.records.map((record) => ({
        employeeId: record.employeeId || "-",
        fullname: record.fullname || "-",
        designation: record.designation || "-",
        attendanceStatus: record.attendanceStatus || "-",
        remarks: record.remarks || "-",
      }));

      // Update attendance history
      setAttendanceHistory(formattedRecords);

      // Calculate attendance counts
      const counts = formattedRecords.reduce(
        (acc, record) => {
          const status = record.attendanceStatus.toLowerCase();
          if (status === "present") acc.present += 1;
          else if (status === "absent") acc.absent += 1;
          else if (status === "late") acc.late += 1;
          return acc;
        },
        { present: 0, absent: 0, late: 0, total: formattedRecords.length }
      );

      setAttendanceCounts(counts);
    } catch (error) {
      console.error("Error processing attendance data:", error);
      setError("Error processing attendance data");
    }
  };

  // Format date helper function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  // Export data function
  const exportData = (format) => {
    try {
      const exportData = attendanceHistory.map(record => ({
        'Employee ID': record.employeeId,
        'Name': record.fullname,
        'Designation': record.designation,
        'Status': record.attendanceStatus,
        'Remarks': record.remarks || '-'
      }));

      if (format === 'xlsx') {
        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(data, `attendance-${selectedDate}.xlsx`);
      } else if (format === 'csv') {
        const ws = XLSX.utils.json_to_sheet(exportData);
        const csv = XLSX.utils.sheet_to_csv(ws);
        const data = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        saveAs(data, `attendance-${selectedDate}.csv`);
      }
    } catch (error) {
      console.error('Error exporting data:', error);
      setError('Failed to export data');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 flex flex-col h-[90vh]">
        {/* Fixed Header */}
        <div className="flex-none border-b bg-gray-50 rounded-t-lg">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-blue-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Daily Attendance Report
                </h2>
                <p className="text-gray-600 mt-1">
                  {employeeDataDetails?.date
                    ? formatDate(employeeDataDetails.date)
                    : ""}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <button
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white rounded-lg border border-gray-200 hover:bg-gray-50"
                  onClick={() => setShowExportMenu(!showExportMenu)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
                {showExportMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                    <div className="py-1">
                      <button
                        onClick={() => exportData('xlsx')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Export as Excel (.xlsx)
                      </button>
                      <button
                        onClick={() => exportData('csv')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Export as CSV
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Fixed Statistics Section */}
        <div className="flex-none bg-white border-b">
          <div className="grid grid-cols-4 gap-4 p-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
              <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Total Employees</p>
              <p className="text-2xl font-bold text-gray-800">
                {attendanceCounts.total}
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
              <UserCheck className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-green-600 mb-1">Present</p>
              <p className="text-2xl font-bold text-green-700">
                {attendanceCounts.present}
              </p>
              <p className="text-sm text-green-600 mt-1">
                {(
                  (attendanceCounts.present / attendanceCounts.total) *
                  100
                ).toFixed(1)}
                %
              </p>
            </div>

            <div className="bg-red-50 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
              <UserX className="w-6 h-6 text-red-600 mx-auto mb-2" />
              <p className="text-sm text-red-600 mb-1">Absent</p>
              <p className="text-2xl font-bold text-red-700">
                {attendanceCounts.absent}
              </p>
              <p className="text-sm text-red-600 mt-1">
                {(
                  (attendanceCounts.absent / attendanceCounts.total) *
                  100
                ).toFixed(1)}
                %
              </p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
              <Clock className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm text-yellow-600 mb-1">Late</p>
              <p className="text-2xl font-bold text-yellow-700">
                {attendanceCounts.late}
              </p>
              <p className="text-sm text-yellow-600 mt-1">
                {(
                  (attendanceCounts.late / attendanceCounts.total) *
                  100
                ).toFixed(1)}
                %
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Cards Section */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto px-6 py-4">
            {attendanceHistory.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {attendanceHistory.map((record, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-4 border border-gray-100"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
                      <div className="min-w-[120px]">
                        <p className="text-xs text-gray-500 uppercase mb-1">
                          Employee ID
                        </p>
                        <p className="font-medium text-gray-900 break-all">
                          {record.employeeId}
                        </p>
                      </div>

                      <div className="md:col-span-2">
                        <p className="text-xs text-gray-500 uppercase mb-1">Name</p>
                        <p className="font-medium text-gray-900 break-words">
                          {record.fullname}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 uppercase mb-1">
                          Designation
                        </p>
                        <p className="font-medium text-gray-900 break-words">
                          {record.designation}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 uppercase mb-1">Status</p>
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                              ${
                                record.attendanceStatus.toLowerCase() === "present"
                                  ? "bg-green-100 text-green-800"
                                  : record.attendanceStatus.toLowerCase() === "absent"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                          >
                            {record.attendanceStatus}
                          </span>
                          {record.remarks && (
                            <div className="group relative">
                              <button className="ml-2 text-gray-400 hover:text-gray-600">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                              </button>
                              <div className="hidden group-hover:block absolute z-10 w-48 p-2 mt-1 text-sm bg-gray-900 text-white rounded-md shadow-lg">
                                {record.remarks}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <Users className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-lg font-medium text-gray-900">
                  No attendance records found
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  No data available for the selected date
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Optional Footer */}
        <div className="flex-none border-t bg-gray-50 rounded-b-lg">
          <div className="flex justify-between items-center px-6 py-3">
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}