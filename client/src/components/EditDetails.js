import { useState } from "react";
import { X } from "lucide-react";
import Axios from "../../utils/Axios";
import { useEffect } from "react";
export default function EditDetails({ isOpen, setIsModaEditDetailsOpen, employeeDataDetails, onClose, onEmployeeAdded }) {
    const [employeeData, setEmployeeData] = useState({
        fullname: employeeDataDetails?.fullname || "",
        email: employeeDataDetails?.email || "",
        phone: employeeDataDetails?.phone || "",
        designation: employeeDataDetails?.designation || "",
        department: employeeDataDetails?.department || "",
        joiningDate: employeeDataDetails?.joiningDate || "",
        employeeType: employeeDataDetails?.employeeType || "Full-Time",
        shiftDetails: employeeDataDetails?.shiftDetails || "Morning",
        status: employeeDataDetails?.status || "active"
      });
      useEffect(() => {
        if (employeeDataDetails) {
          setEmployeeData({
            fullname: employeeDataDetails.fullname || "",
            email: employeeDataDetails.email || "",
            phone: employeeDataDetails.phone || "",
            designation: employeeDataDetails.designation || "",
            department: employeeDataDetails.department || "",
            joiningDate: employeeDataDetails.joiningDate || "",
            employeeType: employeeDataDetails.employeeType || "Full-Time",
            shiftDetails: employeeDataDetails.shiftDetails || "Morning",
            status: employeeDataDetails.status || "active"
          });
        }
      }, [employeeDataDetails]);
 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      const response = await Axios.put(`/update-employee/${employeeDataDetails._id}`, employeeData);
     
      
      if (onEmployeeAdded) {
        onEmployeeAdded(response.data.data);
      }
      
      onClose();
    } catch (error) {
      console.error("Error updating employee:", error);
      setError(error.response?.data?.message || "Failed to update employee");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Employee Information
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                value={employeeData.fullname}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={employeeData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* phoneNumber */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={employeeData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* designation */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Designation / Job Title
              </label>
              <input
                type="text"
                name="designation"
                value={employeeData.designation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Department */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={employeeData.department}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Joining Date */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Joining Date
              </label>
              <input
                type="date"
                name="joiningDate"
                value={employeeData.joiningDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Employment Type */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employment Type
              </label>
              <select
                name="employeeType"
                value={employeeData.employeeType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Intern">Intern</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            {/* shiftDetails */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shift
              </label>
              <select
                name="shiftDetails"
                value={employeeData.shiftDetails}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Morning">Morning</option>
                <option value="Night">Night</option>
              </select>
            </div>
            
            {/* Status */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={employeeData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}