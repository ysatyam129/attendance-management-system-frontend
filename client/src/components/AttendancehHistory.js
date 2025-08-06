import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Clock, ChevronDown, Download, Upload, ArrowRight, Calendar, Users, UserCheck, UserX, Clock3 } from 'lucide-react';
import AttendanceHistoryDetailsModal from './AttendanceHistoryDetailsModal';

export default function AttendanceHistory({ historyData }) {
  console.log("historyData", historyData);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentAttendanceData, setCurrentAttendanceData] = useState([]);
  const [currentStats, setCurrentStats] = useState({});
  const [availableMonths, setAvailableMonths] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAttendanceDetails, setSelectedAttendanceDetails] = useState(null);
  const router = useRouter();

  const navigateToAttendanceHistory = () => {
    router.push('/admin/attendancehistory');
  };

  const openDetailsModal = (data) => {
    // Find the matching record from historyData
    const matchingRecord = historyData.find(record => 
      new Date(record.date).toLocaleDateString() === new Date(data.date).toLocaleDateString()
    );

    if (matchingRecord) {
      setSelectedAttendanceDetails(matchingRecord);
      setIsModalOpen(true);
    } else {
      console.error("No matching data found for:", data.date);
    }
  };

  const closeDetailsModal = () => {
    setIsModalOpen(false);
    setSelectedAttendanceDetails(null);
  };

  // Extract available months from historyData
  useEffect(() => {
    if (historyData && historyData.length > 0) {
      // Create a set of unique month-year combinations from the data
      const monthsSet = new Set();
      historyData.forEach(record => {
        const date = new Date(record.date);
        const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
        monthsSet.add(monthYear);
      });
      
      // Convert to array and sort (newest first)
      const months = Array.from(monthsSet).sort((a, b) => {
        const [aMonth, aYear] = a.split(' ');
        const [bMonth, bYear] = b.split(' ');
        if (aYear !== bYear) return parseInt(bYear) - parseInt(aYear);
        const monthOrder = {
          'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
          'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
        };
        return monthOrder[bMonth] - monthOrder[aMonth];
      });
      
      
      // Set available months for the dropdown
      setAvailableMonths(months);
      
      // Select the most recent month by default
      if (months.length > 0 && !selectedMonth) {
        setSelectedMonth(months[0]);
      }
    }
  }, [historyData]);

  // Process the data when month selection changes
  useEffect(() => {
    if (!historyData || !selectedMonth) return;

    // Filter records for selected month
    const [monthName, year] = selectedMonth.split(' ');
    const filteredData = historyData.filter(record => {
      const date = new Date(record.date);
      return date.getFullYear() === parseInt(year) && 
             date.toLocaleString('default', { month: 'long' }) === monthName;
    },[]);

    // Process data to create daily attendance summary
    const dailyAttendance = {};
    filteredData.forEach(record => {
      const dateKey = record.date;
      if (!dailyAttendance[dateKey]) {
        dailyAttendance[dateKey] = {
          date: formatDate(record.date),
          present: 0,
          absent: 0,
          late: 0,
          total: 0
        };
      }
      
      // Count attendance statuses
      record.records.forEach(employee => {
        dailyAttendance[dateKey].total++;
        
        switch(employee.attendanceStatus.toLowerCase()) {
          case 'present':
            dailyAttendance[dateKey].present++;
            break;
          case 'absent':
            dailyAttendance[dateKey].absent++;
            break;
          case 'late':
            dailyAttendance[dateKey].late++;
            break;
          default:
            // Handle other statuses if needed
            break;
        }
      });
    });

    // Convert to array and sort by date (newest first)
    const sortedAttendance = Object.values(dailyAttendance).sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    setCurrentAttendanceData(sortedAttendance);

    // Calculate monthly statistics
    calculateMonthlyStats(sortedAttendance);
    
  }, [selectedMonth, historyData]);

  // Format date from yyyy-mm-dd to display format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const dayOfWeek = date.toLocaleString('default', { weekday: 'short' });
    return `${dayOfWeek}, ${month} ${day}, ${year}`;
  };

  // Calculate monthly statistics
  const calculateMonthlyStats = (attendanceData) => {
    if (!attendanceData || attendanceData.length === 0) {
      setCurrentStats({});
      return;
    }

    let totalPresent = 0;
    let totalEmployees = 0;
    let fullAttendanceDays = 0;
    let mostAbsences = 0;
    let totalLate = 0;

    attendanceData.forEach(day => {
      totalPresent += day.present;
      totalEmployees += day.total;
      
      // Count days with full attendance
      if (day.present === day.total && day.total > 0) {
        fullAttendanceDays++;
      }
      
      // Track maximum absences
      if (day.absent > mostAbsences) {
        mostAbsences = day.absent;
      }
      
      totalLate += day.late;
    });

    // Calculate average attendance
    const avgAttendance = totalEmployees > 0 
      ? ((totalPresent / totalEmployees) * 100).toFixed(1) + '%' 
      : '0%';

    // Determine trends
    const presentTrend = determinePresentTrend(attendanceData);
    const absencePattern = determineAbsencePattern(attendanceData);
    const tardiness = totalLate > attendanceData.length 
      ? 'High' 
      : totalLate > 0 ? 'Low' : 'None';

    setCurrentStats({
      avgAttendance,
      fullAttendanceDays,
      mostAbsences,
      totalWorkingDays: attendanceData.length,
      presentTrend,
      absencePattern,
      tardiness
    });
  };

  // Simple algorithm to determine present trend
  const determinePresentTrend = (data) => {
    if (data.length < 3) return 'Insufficient data';
    
    // Calculate trend of present percentages
    const percentages = data.map(day => day.present / day.total);
    const increasing = percentages.every((val, i, arr) => i === 0 || val >= arr[i-1]);
    const decreasing = percentages.every((val, i, arr) => i === 0 || val <= arr[i-1]);
    
    if (increasing) return 'Improving';
    if (decreasing) return 'Declining';
    
    // Check if values are close to each other (consistent)
    const avg = percentages.reduce((sum, val) => sum + val, 0) / percentages.length;
    const allClose = percentages.every(val => Math.abs(val - avg) < 0.1); // Within 10% of average
    
    return allClose ? 'Consistent' : 'Variable';
  };

  // Simple algorithm to determine absence pattern
  const determineAbsencePattern = (data) => {
    if (data.length < 3) return 'Insufficient data';
    
    // Check for weekend pattern
    const weekendHeavy = data.some(day => {
      const date = new Date(day.date);
      const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
      return (dayOfWeek === 0 || dayOfWeek === 6) && (day.absent > day.present * 0.2);
    });
    
    if (weekendHeavy) return 'Weekend Heavy';
    
    // Check for Monday/Friday pattern
    const mondayFridayHeavy = data.some(day => {
      const date = new Date(day.date);
      const dayOfWeek = date.getDay(); // 1 = Monday, 5 = Friday
      return (dayOfWeek === 1 || dayOfWeek === 5) && (day.absent > day.present * 0.2);
    });
    
    if (mondayFridayHeavy) return 'Monday/Friday Heavy';
    
    return 'Evenly Distributed';
  };

  const AttendanceCard = ({ data }) => {
    // Calculate percentage for progress bars
    const presentPercentage = (data.present / data.total) * 100;
    const absentPercentage = (data.absent / data.total) * 100;
    const latePercentage = (data.late / data.total) * 100;
    
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-1 cursor-pointer border border-transparent hover:border-blue-100">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-3 text-white flex justify-between items-center">
          <div className="font-medium flex items-center">
            <Calendar size={16} className="mr-2" />
            {data.date}
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
            data.absent > 4 ? 'bg-red-500' : data.absent > 2 ? 'bg-orange-500' : 'bg-red-500'
          }`}>
            {data.absent} Absent
          </div>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="text-center">
              <div className="text-green-600 font-bold text-xl">{data.present}</div>
              <div className="text-xs text-gray-500">Present</div>
            </div>
            <div className="text-center">
              <div className="text-red-500 font-bold text-xl">{data.absent}</div>
              <div className="text-xs text-gray-500">Absent</div>
            </div>
            <div className="text-center">
              <div className="text-amber-500 font-bold text-xl">{data.late}</div>
              <div className="text-xs text-gray-500">Late</div>
            </div>
            <div className="text-center">
              <div className="text-gray-800 font-bold text-xl">{data.total}</div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${presentPercentage}%` }}></div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: `${absentPercentage}%` }}></div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${latePercentage}%` }}></div>
            </div>
          </div>
          
          <div
            className="flex items-center mt-4 text-blue-600 text-sm font-medium group justify-end"
            onClick={() => openDetailsModal(data)}
          >
            <span className="group-hover:underline">View details</span>
            <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    );
  };
  
  // Calculate average attendance percentage for the progress bar
  const avgAttendanceValue = parseFloat(currentStats.avgAttendance?.replace('%', '') || 0);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Attendance History</h2>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock size={16} className="mr-2" />
              <span>View and analyze past attendance records</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <div className="relative">
              <button 
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center min-w-40 hover:bg-gray-50"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                disabled={availableMonths.length === 0}
              >
                <Calendar size={16} className="mr-2 text-blue-600" />
                <span>{selectedMonth || 'No data available'}</span>
                <ChevronDown size={16} className="ml-2 text-gray-400" />
              </button>
              
              {isDropdownOpen && availableMonths.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                  {availableMonths.map((month, index) => (
                    <div 
                      key={index} 
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                      onClick={() => {
                        setSelectedMonth(month);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {month}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* <button 
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center hover:bg-gray-50"
              disabled={currentAttendanceData.length === 0}
            >
              <Download size={16} className="mr-2 text-blue-600" />
              Export Report
            </button> */}
          </div>
        </div>
        
        {/* Statistics Cards */}
        {Object.keys(currentStats).length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Average Attendance</p>
                  <p className="text-3xl font-bold text-green-600">{currentStats.avgAttendance || '0%'}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <UserCheck size={20} className="text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${avgAttendanceValue}%` }}></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Full Attendance Days</p>
                  <p className="text-3xl font-bold text-blue-600">{currentStats.fullAttendanceDays || 0}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users size={20} className="text-blue-600" />
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Days with 100% attendance
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Most Absences</p>
                  <p className="text-3xl font-bold text-red-600">{currentStats.mostAbsences || 0}</p>
                </div>
                <div className="p-3 bg-red-100 rounded-lg">
                  <UserX size={20} className="text-red-600" />
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Highest number of absences in a day
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Working Days</p>
                  <p className="text-3xl font-bold text-indigo-600">{currentStats.totalWorkingDays || 0}</p>
                </div>
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <Calendar size={20} className="text-indigo-600" />
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Total working days this month
              </div>
            </div>
          </div>
        )}
        
        {/* Attendance Records */}
        <div className="relative mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Daily Attendance Records</h3>
          
          {currentAttendanceData.length > 3 && (
            <button className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors z-10">
              <ChevronLeft size={24} className="text-gray-700" />
            </button>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
            {currentAttendanceData.length > 0 ? (
              currentAttendanceData.map((data, index) => (
                <AttendanceCard key={index} data={data} />
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-gray-500">
                No attendance data available for this month
              </div>
            )}
          </div>
          
          {currentAttendanceData.length > 3 && (
            <button className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors z-10">
              <ChevronRight size={24} className="text-gray-700" />
            </button>
          )}
        </div>
        
        {/* Monthly Overview */}
        {Object.keys(currentStats).length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Monthly Overview</h3>
            <p className="text-gray-500 text-sm mb-6">Attendance summary for {selectedMonth}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                <div className="p-3 bg-blue-100 rounded-full mr-4">
                  <UserCheck size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Present Trend</p>
                  <p className="text-lg font-semibold text-gray-800">{currentStats.presentTrend || 'Insufficient data'}</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                <div className="p-3 bg-red-100 rounded-full mr-4">
                  <UserX size={20} className="text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Absence Pattern</p>
                  <p className="text-lg font-semibold text-gray-800">{currentStats.absencePattern || 'Insufficient data'}</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                <div className="p-3 bg-amber-100 rounded-full mr-4">
                  <Clock3 size={20} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Tardiness</p>
                  <p className="text-lg font-semibold text-gray-800">{currentStats.tardiness || 'None'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {console.log("selectedAttendanceDetails ", selectedAttendanceDetails)}
      {isModalOpen && (
        <AttendanceHistoryDetailsModal
          isOpen={isModalOpen}
          onClose={closeDetailsModal}
          employeeDataDetails={selectedAttendanceDetails}
        />
      )}
    </div>
  );
}