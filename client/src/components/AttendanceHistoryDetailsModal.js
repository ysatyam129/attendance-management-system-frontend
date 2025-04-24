import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

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

  // Process attendance data when modal opens
  useEffect(() => {
    if (isOpen && employeeDataDetails) {
      // If employeeDataDetails is a single day's data (object with date and records)
      if (employeeDataDetails.date && employeeDataDetails.records) {
        processAttendanceData(employeeDataDetails);
      } 
      // If employeeDataDetails is an array of days, use the first item
      else if (Array.isArray(employeeDataDetails) && employeeDataDetails.length > 0) {
        processAttendanceData(employeeDataDetails[0]);
      }
    }
  }, [isOpen, employeeDataDetails]);

  const processAttendanceData = (data) => {
    try {
      if (data && data.date && Array.isArray(data.records)) {
        // Set the selected date
        setSelectedDate(data.date);
        
        // Format records for display
        const formattedRecords = data.records.map(record => ({
          employeeId: record.employeeId || "-",
          fullname: record.fullname || "-",
          designation: record.designation || "-",
          attendanceStatus: record.attendanceStatus || "-",
          remarks: record.remarks || "-"
        }));
        
        setAttendanceHistory(formattedRecords);
        console.log("Formatted Records:", formattedRecords);
        
        // Calculate attendance counts for this day
        const counts = formattedRecords.reduce(
          (acc, record) => {
            if (record.attendanceStatus === "Present") {
              acc.present += 1;
            } else if (record.attendanceStatus === "Absent") {
              acc.absent += 1;
            } else if (record.attendanceStatus === "Late") {
              acc.late += 1;
            }
            return acc;
          },
          { present: 0, absent: 0, late: 0 }
        );

        counts.total = formattedRecords.length;
        setAttendanceCounts(counts);
      } else {
        console.error("Invalid attendance data format", data);
        toast.error("Invalid attendance data format");
      }
    } catch (error) {
      console.error("Error processing attendance data:", error);
      toast.error("Error processing attendance data");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Attendance Details: {new Date(selectedDate).toLocaleDateString()}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>

        {/* Attendance Statistics Summary */}
        <div className="p-4 bg-gray-50 border-b">
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            Attendance Summary
          </h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <p className="text-sm text-gray-500">Total Employees</p>
              <p className="text-2xl font-bold">{attendanceCounts.total}</p>
            </div>
            <div className="bg-green-50 p-3 rounded shadow">
              <p className="text-sm text-green-700">Present</p>
              <p className="text-2xl font-bold text-green-700">
                {attendanceCounts.present}
              </p>
            </div>
            <div className="bg-red-50 p-3 rounded shadow">
              <p className="text-sm text-red-700">Absent</p>
              <p className="text-2xl font-bold text-red-700">
                {attendanceCounts.absent}
              </p>
            </div>
            <div className="bg-yellow-50 p-3 rounded shadow">
              <p className="text-sm text-yellow-700">Late</p>
              <p className="text-2xl font-bold text-yellow-700">
                {attendanceCounts.late}
              </p>
            </div>
          </div>
        </div>

        {/* Attendance List Table */}
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            Employee Attendance
          </h3>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Designation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendanceHistory.map((record, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.employeeId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.fullname}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.designation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          record.attendanceStatus === "Present"
                            ? "bg-green-100 text-green-800"
                            : record.attendanceStatus === "Absent"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {record.attendanceStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.remarks}
                    </td>
                  </tr>
                ))}
                {attendanceHistory.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No attendance records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}