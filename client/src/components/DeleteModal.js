import { useState } from "react";
import { X } from "lucide-react";
import Axios from "../../utils/Axios";
import { toast } from "sonner";
export default function DeleteModal({ isOpen, onClose, employeeDataDetails }) {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [employeeData, setEmployeeData] = useState({
    employeeId: employeeDataDetails.employeeId,
    fullname: employeeDataDetails.fullname || "",
    email: employeeDataDetails.email || "",
    phone: employeeDataDetails.phone || "",})
  
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
      const response = await Axios.post("/delete-employee", {
        employeeId: employeeData.employeeId
      });
      
      if (response.data.status === "success") {
        toast.success(response.data.message);
        onClose(); // Call onClose instead of window.location.reload()
        // If you need to refresh the data, consider passing a callback prop
        // like onDeleteSuccess that the parent component can use to refresh the data
      } else {
        toast.error(response.data.message || "Failed to delete employee");
      }
      
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error(error.response?.data?.message || "Failed to delete employee");
    } finally {
      setIsSubmitting(false);
      onClose(); // Close the modal after submission
      window.location.reload(); // Refresh the page after closing the modal
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Employee Name: {employeeDataDetails?.fullname}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
        

          <div>
           <span>Are you sure you want to delete the employee</span>
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
              {isSubmitting ? "Deleting..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}