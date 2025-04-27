// import Link from "next/link"
// import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
import { BackgroundBoxesDemo } from "@/components/bg"
import { TestimonialsSection } from "@/components/testimonials-with-marquee"
import Navbar from "@/components/Navbar"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Enhanced Navbar */}
      {/* <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent hover:from-indigo-500 hover:to-blue-500 transition-all duration-300">EMS</h1>
              </Link>
            </div>
            <div className="flex space-x-4 items-center">
              <Link href="/about-us" >
                <Button className="bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-white font-medium px-5">
                  About Us
              </Button>
              </Link>
              <Link href="/auth/admin/login">
                <Button className="bg-gray-800 hover:bg-gray-900 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-white font-medium px-5">
                  Admin Portal
                </Button>
              </Link>
              <Link href="/auth/employee/login">
                <Button className="bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-white font-medium px-5">
                  Employee Portal
                </Button>
              </Link>
              <Link href="/contactus">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-white font-medium px-5">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav> */}
      <Navbar />

      <BackgroundBoxesDemo />

      {/* Content Sections */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <h2 className="text-2xl text-black font-bold mb-4">Easy Management</h2>
              <p className="text-gray-600">Efficiently manage your employees with our intuitive interface.</p>
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

      <TestimonialsSection />
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Employee Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}