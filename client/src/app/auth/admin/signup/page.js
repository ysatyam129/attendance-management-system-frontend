"use client"
import Axios from "../../../../../utils/Axios"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast, Toaster } from "sonner"

export default function AdminSignup() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Admin",
    password: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
  })
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const handleRoleChange = (value) => {
    setFormData((prev) => ({ ...prev, role: value }))
    if (errors.role) {
      setErrors(prev => ({ ...prev, role: "" }))
    }
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errors }
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required"
      isValid = false
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
      isValid = false
    }
    
    // Phone validation
    const phoneRegex = /^\d{10}$/
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
      isValid = false
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Phone number must be 10 digits"
      isValid = false
    }
    
    // Role validation
    if (!formData.role) {
      newErrors.role = "Please select a role"
      isValid = false
    }
    
    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    if (!formData.password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must be at least 8 characters with uppercase, lowercase, and numbers"
      isValid = false
    }
    
    setErrors(newErrors)
    return isValid
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      // Show toast for validation errors
      toast.error("Please correct the errors in the form", {
        description: "Some fields need your attention",
        duration: 3000
      })
      return
    }
    
    try {
      const response = await Axios.post("/auth/register", formData)
      
      // Handle successful signup
      toast.success("Account created successfully", {
        description: "Redirecting to login page",
        duration: 2000
      })
      
      // Allow toast to show before redirect
      setTimeout(() => {
        router.push("/auth/admin/login")
      }, 2000)
    }
    catch (error) {
      console.log(error)
      
      // Check if response exists and has a status code
      if (error.response && error.response.status === 400) {
        toast.error("Account already exists", {
          description: "Please try logging in",
          duration: 4000
        })
      } else {
        toast.error("Registration failed", {
          description: error?.response?.data?.message || "Signup failed. Please try again.",
          duration: 4000
        })
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-orange-300">
      <Toaster position="top-center" richColors />
      <Card className="w-full max-w-md border-orange-500 shadow-2xl">
        <CardHeader className="space-y-1">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xl">
              EM
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-black">Admin Signup</CardTitle>
          <CardDescription className="text-center">Create your admin account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2 text-black">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  className={`pl-10 ${errors.name ? "border-red-500 focus:ring-red-500" : ""}`}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="space-y-2 text-black">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@example.com"
                  className={`pl-10 ${errors.email ? "border-red-500 focus:ring-red-500" : ""}`}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="space-y-2 text-black">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="1234567890"
                  className={`pl-10 ${errors.phone ? "border-red-500 focus:ring-red-500" : ""}`}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            
            <div className="space-y-2 text-black">
              <Label htmlFor="role">Role</Label>
              <Select 
                value={formData.role} 
                onValueChange={handleRoleChange}
              >
                <SelectTrigger 
                  className={`bg-gray-200 text-black ${errors.role ? "border-red-500 focus:ring-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-gray-200 text-black">
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Super Admin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
            </div>

            <div className="space-y-2 text-black">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className={`pl-10 ${errors.password ? "border-red-500 focus:ring-red-500" : ""}`}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 8 characters long and include uppercase, lowercase, and numbers
              </p>
            </div>

            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
              Create Account
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/admin/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}