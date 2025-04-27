import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { BackgroundBoxesDemo } from "@/components/bg"
import { TestimonialsSection } from "@/components/testimonials-with-marquee"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">EMS</h1>
            </div>
            <div className="flex space-x-4 items-center">
              <Link href="/about-us">
                <Button className="bg-blue-600 hover:bg-blue-700">About Us</Button>
              </Link>
              <Link href="/auth/admin/login">
                <Button className="bg-orange-600 hover:bg-orange-700">Admin Portal</Button>
              </Link>
              <Link href="/auth/employee/login">
                <Button className="bg-green-600 hover:bg-green-700 ">Employee Portal</Button>
              </Link>
              <Link href="contactus">
                <Button className="bg-green-600 hover:bg-green-700 ">Contact Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <BackgroundBoxesDemo />

      {/* Hero Section with Background Image */}
      {/* <div className="relative h-[600px]">
        <Image
          src="https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Office background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h1 className="text-5xl font-bold mb-4">Employee Management System</h1>
            <p className="text-xl">Streamline your workforce management with our comprehensive solution</p>
          </div>
        </div>
      </div> */}

      {/* Content Sections */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <h2 className="text-2xl  text-black font-bold mb-4">Easy Management</h2>
              <p className="text-gray-600 ">Efficiently manage your employees with our intuitive interface.</p>
            </Card>
            <Card className="p-6">
              <h2 className="text-2xl text-black font-bold mb-4">Time Tracking</h2>
              <p className="text-gray-600">Monitor attendance and work hours with precision.</p>
            </Card>
            <Card className="p-6">
              <h2 className="text-2xl text-black font-bold mb-4">Performance Analytics</h2>
              <p className="text-gray-600">Track and analyze employee performance metrics.</p>
            </Card>
          </div>
        </div>
      </div>

      <TestimonialsSection/>
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Employee Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}