"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, FileX, Clock, Home, LogOut, Settings, Bell, Menu, X, User } from "lucide-react"
import Axios from "utils/Axios"
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar } from 'recharts';

const PersonalEmployeeDashboard = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    present: 0,
    absent: 0,
    leave: 0,
    late: 0,
    totalWorkingDays: 0
  });

  useEffect(() => { 
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await Axios.get('/employee/get-attendance-history');
        console.log(response.data.data);
        
        // Process the data once it's fetched
        const data = response.data.data || [];
        setAttendanceData(data);
        
        // Calculate metrics
        processAttendanceData(data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Process the attendance data to calculate metrics
  const processAttendanceData = (data) => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    // Filter for current month data
    const thisMonthData = data.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= firstDayOfMonth && recordDate <= today;
    });

    // Count different attendance statuses
    let present = 0;
    let absent = 0;
    let leave = 0;
    let late = 0;

    thisMonthData.forEach(record => {
      if (record.attendanceStatus === 'Present') present++;
      else if (record.attendanceStatus === 'Absent') absent++;
      else if (record.attendanceStatus === 'Leave') leave++;
      else if (record.attendanceStatus === 'Late') late++;
    });

    setMetrics({
      present,
      absent,
      leave,
      late,
      totalWorkingDays: data.length
    });

    // Generate weekly data for the chart
    const monthlyAttendanceData = generateMonthlyChartData(data);
    setChartData(monthlyAttendanceData);
  };

  // Generate chart data from attendance records
  const [chartData, setChartData] = useState([
    { name: 'Week 1', Present: 0, Absent: 0, Leave: 0, Late: 0 },
    { name: 'Week 2', Present: 0, Absent: 0, Leave: 0, Late: 0 },
    { name: 'Week 3', Present: 0, Absent: 0, Leave: 0, Late: 0 },
    { name: 'Week 4', Present: 0, Absent: 0, Leave: 0, Late: 0 },
  ]);

  const generateMonthlyChartData = (data) => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Initialize weekly data
    const weeklyData = [
      { name: 'Week 1', Present: 0, Absent: 0, Leave: 0, Late: 0 },
      { name: 'Week 2', Present: 0, Absent: 0, Leave: 0, Late: 0 },
      { name: 'Week 3', Present: 0, Absent: 0, Leave: 0, Late: 0 },
      { name: 'Week 4', Present: 0, Absent: 0, Leave: 0, Late: 0 },
    ];

    // Process each attendance record
    data.forEach(record => {
      const recordDate = new Date(record.date);
      
      // Check if record is from current month
      if (recordDate.getMonth() === currentMonth && recordDate.getFullYear() === currentYear) {
        // Determine which week the date falls into
        const dayOfMonth = recordDate.getDate();
        let weekIndex = 0;
        
        if (dayOfMonth <= 7) weekIndex = 0;
        else if (dayOfMonth <= 14) weekIndex = 1;
        else if (dayOfMonth <= 21) weekIndex = 2;
        else weekIndex = 3;
        
        // Increment the correct counter
        if (record.attendanceStatus === 'Present') {
          weeklyData[weekIndex].Present += 1;
        } else if (record.attendanceStatus === 'Absent') {
          weeklyData[weekIndex].Absent += 1;
        } else if (record.attendanceStatus === 'Leave') {
          weeklyData[weekIndex].Leave += 1;
        } else if (record.attendanceStatus === 'Late') {
          weeklyData[weekIndex].Late += 1;
          // Also count late as present for the chart
          weeklyData[weekIndex].Present += 1;
        }
      }
    });

    return weeklyData;
  };
  
  // Custom tooltip for bar chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-200">
          <p className="font-medium text-gray-700">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value} days
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Get total working days in the current month
  const getTotalWorkingDaysInMonth = () => {
    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const weekdays = [];
    
    for (let day = 1; day <= lastDayOfMonth; day++) {
      const date = new Date(today.getFullYear(), today.getMonth(), day);
      // Assuming weekends (Saturday and Sunday) are not working days
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        weekdays.push(day);
      }
    }
    
    return weekdays.length;
  };

  // Format date for display in the activity table
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  // Get status badge color based on attendance status
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Present':
        return 'bg-green-100 text-green-800';
      case 'Absent':
        return 'bg-red-100 text-red-800';
      case 'Leave':
        return 'bg-purple-100 text-purple-800';
      case 'Late':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  // Calculate percentages for progress bars
  const totalWorkingDays = getTotalWorkingDaysInMonth();
  const presentPercentage = (metrics.present / totalWorkingDays) * 100;
  const absentPercentage = (metrics.absent / totalWorkingDays) * 100;
  const leavePercentage = (metrics.leave / totalWorkingDays) * 100;

  return (
    <div className="min-h-screen h-full bg-gray-50 overflow-y-auto">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Present Days Card */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden transform hover:scale-102 border border-gray-100">
            <div className="p-6 flex items-start">
              <div className="bg-green-100 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Present Days (Month)</p>
                <div className="flex items-baseline">
                  <p className="text-3xl font-bold text-gray-900">{metrics.present}</p>
                  <p className="ml-2 text-sm text-green-600">Including {metrics.late} late</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 px-6 py-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${presentPercentage}%` }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{presentPercentage.toFixed(0)}% of working days</p>
            </div>
          </div>

          {/* Absent Days Card */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden transform hover:scale-102 border border-gray-100">
            <div className="p-6 flex items-start">
              <div className="bg-red-100 p-3 rounded-lg">
                <FileX className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Absent Days (Month)</p>
                <div className="flex items-baseline">
                  <p className="text-3xl font-bold text-gray-900">{metrics.absent}</p>
                </div>
              </div>
            </div>
            <div className="bg-red-50 px-6 py-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full" style={{ width: `${absentPercentage}%` }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{absentPercentage.toFixed(0)}% of working days</p>
            </div>
          </div>

          {/* Total Working Days Card */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden transform hover:scale-102 border border-gray-100">
            <div className="p-6 flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Working Days</p>
                <div className="flex items-baseline">
                  <p className="text-3xl font-bold text-gray-900">{metrics.totalWorkingDays}</p>
                  <p className="ml-2 text-sm text-blue-600">Since joining</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 px-6 py-3">
              <div className="flex justify-between text-xs text-gray-500">
                <span>{metrics.present + metrics.absent + metrics.leave} days this month</span>
                <span>{totalWorkingDays} total working days</span>
              </div>
            </div>
          </div>

          {/* Leave Days Card */}
          {/* <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden transform hover:scale-102 border border-gray-100">
            <div className="p-6 flex items-start">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Leaves (Month)</p>
                <div className="flex items-baseline">
                  <p className="text-3xl font-bold text-gray-900">{metrics.leave}</p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 px-6 py-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${leavePercentage}%` }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{leavePercentage.toFixed(0)}% of working days</p>
            </div>
          </div> */}

          {/* Late Days Card */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden transform hover:scale-102 border border-gray-100">
            <div className="p-6 flex items-start">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Late Arrivals (Month)</p>
                <div className="flex items-baseline">
                  <p className="text-3xl font-bold text-gray-900">{metrics.late}</p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 px-6 py-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: `${(metrics.late / totalWorkingDays) * 100}%` }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{((metrics.late / totalWorkingDays) * 100).toFixed(0)}% of working days</p>
            </div>
          </div>
        </div>

        {/* Charts - Only Attendance Overview */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          {/* Attendance Overview Chart - Only Monthly View */}
          <div className="bg-white p-6 rounded-xl shadow-md transform hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Monthly Attendance Overview</h2>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: 10 }} />
                  <Bar dataKey="Present" fill="#10B981" radius={[4, 4, 0, 0]} barSize={30} />
                  <Bar dataKey="Absent" fill="#EF4444" radius={[4, 4, 0, 0]} barSize={30} />
                  <Bar dataKey="Leave" fill="#8B5CF6" radius={[4, 4, 0, 0]} barSize={30} />
                  <Bar dataKey="Late" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-md transform hover:shadow-xl transition-all duration-300 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">My Recent Activity</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendanceData.length > 0 ? (
                  attendanceData.slice(0, 5).map((record, index) => (
                    <tr key={record._id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(record.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {record.attendanceStatus === "Absent" ? "Absent" : "Checked in"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(record.attendanceStatus)}`}>
                          {record.attendanceStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.remarks || "No remarks"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                      {loading ? "Loading attendance data..." : "No attendance records found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-right">
            {/* <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors duration-200">View all activity →</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalEmployeeDashboard;