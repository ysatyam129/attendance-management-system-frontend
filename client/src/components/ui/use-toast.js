"use client";

import React, { useCallback, useContext, useState, createContext } from "react";
import { ToastProvider } from "./toast";

// Context for managing toasts
export const ToastContext = createContext({});

// Toast container provider
export function ToastContainer({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(({ title, description, variant = "default", duration = 5000 }) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, variant }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);

    return id;
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`bg-white rounded-md shadow-md p-4 border-l-4 ${
              toast.variant === "destructive"
                ? "border-red-500"
                : toast.variant === "success"
                ? "border-green-500"
                : "border-blue-500"
            } animate-in fade-in slide-in-from-right-full`}
          >
            {toast.title && <div className="font-semibold">{toast.title}</div>}
            {toast.description && <div className="text-gray-600">{toast.description}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Custom hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Fallback toast function (can be replaced in runtime)
export const toast = ({ title, description, variant, duration }) => {
  console.log("Toast:", { title, description, variant, duration });
};
