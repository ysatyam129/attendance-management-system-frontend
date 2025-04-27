import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-blue-700">EMS</h1>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <Link href="/about-us">
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-blue-700 hover:bg-gray-100"
              >
                About Us
              </Button>
            </Link>
            <Link href="/contactus">
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-blue-700 hover:bg-gray-100"
              >
                Contact Us
              </Button>
            </Link>
            <div className="h-6 border-l border-gray-300 mx-1"></div>
            <Link href="/auth/employee/login">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Employee Portal
              </Button>
            </Link>
            <Link href="/auth/admin/login">
              <Button className="bg-gray-800 hover:bg-gray-900 text-white">
                Admin Portal
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
