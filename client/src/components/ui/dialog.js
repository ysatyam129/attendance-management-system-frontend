"use client"

import React from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={() => onOpenChange(false)}
      />
      
      {/* Dialog content */}
      <div className="z-50 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        {children}
      </div>
    </div>
  )
}

const DialogContent = ({ className, children, ...props }) => {
  return (
    <div className={cn("relative", className)} {...props}>
      {children}
    </div>
  )
}

const DialogHeader = ({ className, ...props }) => {
  return (
    <div className={cn("mb-4 space-y-1.5", className)} {...props} />
  )
}

const DialogTitle = ({ className, ...props }) => {
  return (
    <h3 className={cn("text-lg font-semibold", className)} {...props} />
  )
}

const DialogDescription = ({ className, ...props }) => {
  return (
    <p className={cn("text-sm text-gray-500", className)} {...props} />
  )
}

const DialogFooter = ({ className, ...props }) => {
  return (
    <div className={cn("mt-4 flex justify-end space-x-2", className)} {...props} />
  )
}

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
}