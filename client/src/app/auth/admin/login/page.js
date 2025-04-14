"use client"


import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import Axios from "../../../../../utils/Axios"
import {toast} from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import { Card,CardContent,CardDescription,CardHeader,CardTitle,CardFooter  } from "@/components/ui/card"


export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    
    console.log("Admin login attempt:", { email, password })
    try {
      const response = await Axios.post("/auth/login", { email, password })
      if(response.status == 200){
        toast.success("login Succesfully");
        router.push("/admin/dashboard");
      }

    }
    catch(e){
      toast.error("Invalid email or password");
    }

    

  }

  return (
    <>
   
      <div className="flex min-h-screen items-center justify-center  py-12 px-4 sm:px-6 lg:px-8 bg-orange-300">
     
     <Card className="w-full max-w-md border-orange-500  shadow-2xl">
       <CardHeader className="space-y-1">
         <div className="flex justify-center">
           <div className="h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xl">
             EM
           </div>
         </div>
         <CardTitle className="text-2xl font-bold text-center color text-black  ">Admin Login</CardTitle>
         <CardDescription className="text-center">Enter your credentials to access the admin portal</CardDescription>
       </CardHeader>
       <CardContent>
         <form onSubmit={handleLogin} className="space-y-4">
           <div className="space-y-2">
             <Label htmlFor="email">Email</Label>
             <div className="relative">
               <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
               <Input
                 id="email"
                 type="email"
                 placeholder="admin@example.com"
                 className="pl-10 text-black"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 required
               />
             </div>
           </div>
           <div className="space-y-2">
             <div className="flex items-center justify-between ">
               <Label htmlFor="password">Password</Label>
               <Link href="/auth/admin/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                 Forgot password?
               </Link>
             </div>
             <div className="relative">
               <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
               <Input
                 id="password"
                 type={showPassword ? "text" : "password"}
                 className="pl-10 text-black"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
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
           </div>
           <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
             Sign In
           </Button>
         </form>
       </CardContent>
       <CardFooter className="flex justify-center">
         <p className="text-sm text-gray-600">
           Don&apos;t have an account?{" "}
           <Link href="/auth/admin/signup" className="font-medium text-blue-600 hover:text-blue-500">
             Sign up
           </Link>
         </p>
       </CardFooter>
     </Card>
   </div>
    </>

    
  )
}