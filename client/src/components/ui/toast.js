// toast.js
"use client";
import React, { createContext, forwardRef } from "react";

const ToastProvider = createContext({ toast: () => {} });

const Toast = forwardRef(({ className = "", variant = "default", ...props }, ref) => {
  const variantStyles = {
    default: "border bg-white text-black",
    destructive: "border bg-red-100 text-red-700",
    success: "border bg-green-100 text-green-700",
  };
  return (
    <div
      ref={ref}
      className={`toast ${variantStyles[variant]} ${className}`}
      {...props}
    />
  );
});
Toast.displayName = "Toast";

const ToastTitle = forwardRef(({ className = "", ...props }, ref) => (
  <div ref={ref} className={`text-sm font-semibold ${className}`} {...props} />
));
ToastTitle.displayName = "ToastTitle";

const ToastDescription = forwardRef(({ className = "", ...props }, ref) => (
  <div ref={ref} className={`text-sm opacity-90 ${className}`} {...props} />
));
ToastDescription.displayName = "ToastDescription";

const ToastClose = forwardRef(({ className = "", ...props }, ref) => (
  <button
    ref={ref}
    className={`absolute right-2 top-2 p-1 opacity-0 hover:opacity-100 ${className}`}
    {...props}
  >
    ✕
  </button>
));
ToastClose.displayName = "ToastClose";

export { Toast, ToastTitle, ToastDescription, ToastClose, ToastProvider };
