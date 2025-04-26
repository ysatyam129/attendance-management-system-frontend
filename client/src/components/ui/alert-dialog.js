"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const AlertDialog = AlertDialogPrimitive.Root
const AlertDialogTrigger = AlertDialogPrimitive.Trigger
const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef(function (props, ref) {
  const { className, ...rest } = props
  return React.createElement(AlertDialogPrimitive.Overlay, {
    ...rest,
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )
  })
})
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef(function (props, ref) {
  const { className, ...rest } = props
  return React.createElement(
    AlertDialogPortal,
    null,
    React.createElement(AlertDialogOverlay),
    React.createElement(AlertDialogPrimitive.Content, {
      ...rest,
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )
    })
  )
})
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = function (props) {
  const { className, ...rest } = props
  return React.createElement("div", {
    ...rest,
    className: cn("flex flex-col space-y-2 text-center sm:text-left", className)
  })
}
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = function (props) {
  const { className, ...rest } = props
  return React.createElement("div", {
    ...rest,
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)
  })
}
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef(function (props, ref) {
  const { className, ...rest } = props
  return React.createElement(AlertDialogPrimitive.Title, {
    ...rest,
    ref,
    className: cn("text-lg font-semibold", className)
  })
})
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef(function (props, ref) {
  const { className, ...rest } = props
  return React.createElement(AlertDialogPrimitive.Description, {
    ...rest,
    ref,
    className: cn("text-sm text-muted-foreground", className)
  })
})
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef(function (props, ref) {
  const { className, ...rest } = props
  return React.createElement(AlertDialogPrimitive.Action, {
    ...rest,
    ref,
    className: cn(buttonVariants(), className)
  })
})
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef(function (props, ref) {
  const { className, ...rest } = props
  return React.createElement(AlertDialogPrimitive.Cancel, {
    ...rest,
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)
  })
})
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
