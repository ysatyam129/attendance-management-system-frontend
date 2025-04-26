"use client"
import { useState, useRef, useEffect } from 'react';
import { Search, Sun, LogOut, ChevronDown, Calendar, ArrowLeft, ArrowRight, X } from 'lucide-react';
import Axios from 'utils/Axios';
import AttendanceHistory from '@/components/AttendancehHistory';
import { toast } from 'sonner';

export default function EmployeeAttendance() {
  const [employees, setEmployees] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [activeTab, setActiveTab] = useState('today');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [attendanceHistory, setAttendanceHistory] = useState([]);

  const employeeDetails = async () => {
    const response = await Axios.get("/get-employee-details");
    console.log("Employee details: ", response.data.data);
    if (response.status===200) {
      setEmployees(response.data.data.employees)
    }
  }

  useEffect(() => {
    employeeDetails();
  }, []);

  const emplyeeAtttendanceHistory = async () => {
    const response = await Axios.get("/get-attendance-history");
    console.log("Attendance historyyyyy: ", response.data.data);
    if (response.status===200) {
      setAttendanceHistory(response.data.data)
    }
  }

  useEffect(() => {
    emplyeeAtttendanceHistory();
  }, []);
  
  const [selectedDate, setSelectedDate] = useState('');
  const dropdownRef = useRef(null);
  const noteModalRef = useRef(null);
  
  const handleStatusChange = (employeeId, newStatus) => {
    setEmployees(employees.map(emp => 
      emp.employeeId === employeeId ? { ...emp, attendanceStatus: newStatus } : emp
    ));
    setOpenDropdownId(null);
  };
  
  const toggleDropdown = (employeeId) => {
    setOpenDropdownId(openDropdownId === employeeId ? null : employeeId);
  };

  const openNoteModal = (employee) => {
    setCurrentEmployee(employee);
    setRemarks(employee.note);
    setShowNoteModal(true);
  };

  const saveNote = () => {
    if (currentEmployee) {
      setEmployees(employees.map(emp => 
        emp.employeeId === currentEmployee.id ? { ...emp, remarks: remarks } : emp
      ));
    }
    setShowNoteModal(false);
  };

  const saveAttendance = () => {
    // Check if all statuses are marked
    const unmarkedEmployees = employees.filter(emp => emp.attendanceStatus === 'Mark');
    if (unmarkedEmployees.length > 0) {
      toast.error(`${unmarkedEmployees.length} employees haven't been marked!`, {
        action: {
          label: 'Continue anyway',
          onClick: () => setShowConfirmation(true)
        }
      });
      return;
    }    
    setShowConfirmation(true);
  };

  const confirmSaveAttendance = async () => {
    // Prepare data for backend
    const currentDate = new Date().toISOString().split('T')[0];
    const attendanceData = {
      date: currentDate,
      records: employees.map(emp => ({
        employeeId: emp._id,
        attendanceStatus: emp.attendanceStatus === 'Mark' ? 'Absent' : emp.attendanceStatus, // Default unmarked to absent
        remarks: emp.remarks
      }))
    };
    console.log('Sending to backend:', attendanceData);
    
    // Here you would send data to backend
    const response = await Axios.post("/mark-attendance",{
      attendanceData
    });
   
    
    // Add to history for demo purposes
    setAttendanceHistory([
      { 
        date: currentDate, 
        records: employees.map(emp => ({
          employeeId: emp._id,
          fullname: emp.fullname,
          designation: emp.designation,
          attendanceStatus: emp.attendanceStatus === 'Mark' ? 'Absent' : emp.attendanceStatus,
          remarks: emp.remarks
        }))
      },
      ...attendanceHistory
    ]);
    
    // Close confirmation
    setShowConfirmation(false);
    
    // Show success message
    if(response.status === 200){
      toast.success('Attendance saved successfully!');
    }
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
      
      if (noteModalRef.current && !noteModalRef.current.contains(event.target) && 
          !event.target.closest('button[data-note-btn]')) {
        setShowNoteModal(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const filteredEmployees = employees.filter(emp => 
    emp.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.designation.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Calculate attendance statistics
  const totalEmployees = employees.length;
  const presentEmployees = employees.filter(emp => emp.attendanceStatus === 'Present').length;
  const absentEmployees = employees.filter(emp => emp.attendanceStatus === 'Absent').length;
  const lateEmployees = employees.filter(emp => emp.attendanceStatus === 'Late').length;
  const unmarkedEmployees = employees.filter(emp => emp.attendanceStatus === 'Mark').length;

  // Find history record for selected date
  // const selectedHistory = attendanceHistory.find(h => h.date === selectedDate)?.records || [];
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 ">
     
      
      <main className="container mx-auto px-4 py-6 flex-grow">
        <div className="mb-6">
          <div className="inline-flex rounded-lg overflow-hidden border border-gray-200">
            <button 
              className={`py-2 px-4 text-sm font-medium ${activeTab === 'today' ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-500'}`}
              onClick={() => setActiveTab('today')}
            >
              Today &apos; s Attendance
            </button>
            <button 
              className={`py-2 px-4 text-sm font-medium ${activeTab === 'history' ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-500'}`}
              onClick={() => setActiveTab('history')}
            >
              Attendance History
            </button>
          </div>
        </div>
        
        {activeTab === 'today' ? (
          <>
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Employee Attendance</h2>
                <p className="text-sm text-gray-500">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="flex space-x-3">
                {/* <button className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 bg-white hover:bg-gray-50">
                  Export
                </button> */}
                <button 
                  className="px-4 py-2 bg-gray-800 text-white rounded text-sm hover:bg-gray-700"
                  onClick={saveAttendance}
                >
                  Save Attendance
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500 mb-1">Total Employees</p>
                <p className="text-3xl font-bold text-gray-800">{totalEmployees}</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500 mb-1">Present</p>
                <p className="text-3xl font-bold text-green-600">{presentEmployees}</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500 mb-1">Absent</p>
                <p className="text-3xl font-bold text-red-600">{absentEmployees}</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500 mb-1">Late</p>
                <p className="text-3xl font-bold text-amber-600">{lateEmployees}</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500 mb-1">Unmarked</p>
                <p className="text-3xl font-bold text-gray-500">{unmarkedEmployees}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">Attendance Register</h3>
                    <p className="text-sm text-gray-500">Mark attendance for store employees</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search employees..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        
                      />
                      <div className="absolute left-3 top-2.5 text-gray-400">
                        <Search size={18} />
                      </div>
                    </div>
                    <div className="relative">
                      <select className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-black">
                        <option>All Positions</option>
                        <option>Manager</option>
                        <option>Employee</option>
                        {/* <option>Waiter</option>
                        <option>Chef</option>
                        <option>Sweeper</option> */}
                      </select>
                      <div className="absolute right-3 top-3 pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEmployees.map((employee) => (
                      <tr key={employee.employeeId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {employee.employeeId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {employee.fullname}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                          {employee.designation}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap ">
                          {employee.attendanceStatus === 'Mark' ? (
                            <div className="relative" ref={openDropdownId === employee.employeeId ? dropdownRef : null}>
                              <button
                                onClick={() => toggleDropdown(employee.employeeId)}
                                className="px-3 py-1 border border-gray-300 rounded text-sm flex items-center"
                              >
                                Mark
                                <ChevronDown size={16} className="ml-1" />
                              </button>
                              
                              {openDropdownId === employee.employeeId && (
                                <div className="absolute mt-1 w-32 bg-white shadow-lg rounded-md border border-gray-200 z-10">
                                  <ul>
                                    <li>
                                      <button
                                        onClick={() => handleStatusChange(employee.employeeId, 'Present')}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                      >
                                        Present
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        onClick={() => handleStatusChange(employee.employeeId, 'Absent')}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                      >
                                        Absent
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        onClick={() => handleStatusChange(employee.employeeId, 'Late')}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                      >
                                        Late
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${employee.attendanceStatus === 'Present' ? 'bg-green-100 text-green-800' : 
                                employee.attendanceStatus === 'Absent' ? 'bg-red-100 text-red-800' : 
                                'bg-yellow-100 text-yellow-800'}`}>
                              {employee.attendanceStatus}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button 
                            className="text-gray-600 hover:text-gray-900"
                            onClick={() => openNoteModal(employee)}
                            data-note-btn="true"
                          >
                            {employee.remarks ? 'Edit Note' : 'Add Note'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          // History Tab
          <AttendanceHistory historyData={attendanceHistory}/>
        )}
      </main>

      {/* Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div 
            ref={noteModalRef}
            className="bg-white rounded-lg shadow-xl w-full max-w-md p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                {currentEmployee?.note ? 'Edit Note' : 'Add Note'} - {currentEmployee?.name}
              </h3>
              <button 
                onClick={() => setShowNoteModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={20} />
              </button>
            </div>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
              placeholder="Enter note here..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            ></textarea>
            <div className="mt-4 flex justify-end space-x-3">
              <button 
                onClick={() => setShowNoteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={saveNote}
                className="px-4 py-2 bg-gray-800 text-white rounded text-sm hover:bg-gray-700"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Attendance</h3>
            <p className="text-gray-500 mb-4">
              You are about to save today&apos;s attendance. Please review the summary below:
            </p>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">Total Employees</p>
                <p className="text-xl font-bold text-gray-800">{totalEmployees}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">Present</p>
                <p className="text-xl font-bold text-green-600">{presentEmployees}</p>
              </div>
              <div className="bg-red-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">Absent</p>
                <p className="text-xl font-bold text-red-600">{absentEmployees}</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">Late</p>
                <p className="text-xl font-bold text-amber-600">{lateEmployees}</p>
              </div>
            </div>
            
            {unmarkedEmployees > 0 && (
              <div className="mb-4 p-3 bg-gray-100 rounded-md">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">{unmarkedEmployees}</span> employees are still unmarked. They will be recorded as absent.
                </p>
              </div>
            )}
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={confirmSaveAttendance}
                className="px-4 py-2 bg-gray-800 text-white rounded text-sm hover:bg-gray-700"
              >
                Confirm & Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}