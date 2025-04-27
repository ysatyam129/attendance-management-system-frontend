"use client"
import React from 'react'
import { TextField } from '@mui/material'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const ContactFooter = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Professional Navbar */}
      {/* <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent hover:from-indigo-500 hover:to-blue-500 transition-all duration-300">EMS</h1>
              </Link>
            </div>
            <div className="flex space-x-4 items-center">
              <Link href="/about-us">
                <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-white font-medium px-5">
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

      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074"
          alt="Contact Us"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/60">
          <div className="max-w-7xl mx-auto h-full flex items-center px-4">
            <div className="text-white space-y-6">
              <h1 className="text-5xl font-bold">Get In Touch</h1>
              <p className="text-xl max-w-2xl">We &apos; re here to answer your questions and help you get the most out of our employee management system.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information Cards */}
      <div className="max-w-7xl mx-auto px-4 py-16 -mt-20 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center justify-center h-16 w-16 bg-blue-100 text-blue-600 rounded-full mb-6 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center mb-4">Phone Support</h3>
            <p className="text-gray-600 text-center mb-4">Available 24/7 for urgent queries</p>
            <p className="text-blue-600 text-center font-medium">+91 (800) 123-4567</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center justify-center h-16 w-16 bg-purple-100 text-purple-600 rounded-full mb-6 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center mb-4">Email Us</h3>
            <p className="text-gray-600 text-center mb-4">We &apos; ll respond within 24 hours</p>
            <p className="text-purple-600 text-center font-medium">support@indibus.com</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center justify-center h-16 w-16 bg-green-100 text-green-600 rounded-full mb-6 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center mb-4">Office Location</h3>
            <p className="text-gray-600 text-center mb-4">Visit us during business hours</p>
            <p className="text-green-600 text-center font-medium">Mumbai, India</p>
          </div>
        </div>
      </div>

      {/* Enhanced Contact Form and Map Section */}
      <div className="bg-gradient-to-b from-white to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Form Section */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-lg shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">GET A FREE CASE EVALUATION TODAY!</h2>
                <p className="text-xl font-semibold text-indigo-600 mb-8">AVAILABLE 24 HOURS A DAY</p>
                
                <form className="space-y-6">
                  <TextField
                    className="w-full bg-gray-50"
                    id="name"
                    label="Enter your Name"
                    variant="outlined"
                    InputProps={{
                      style: { borderRadius: '0.5rem' }
                    }}
                  />
                  <TextField
                    className="w-full bg-gray-50"
                    id="email"
                    label="Enter your valid email"
                    variant="outlined"
                    InputProps={{
                      style: { borderRadius: '0.5rem' }
                    }}
                  />
                  <TextField
                    className="w-full bg-gray-50"
                    id="message"
                    label="Enter your Message"
                    variant="outlined"
                    multiline
                    rows={4}
                    InputProps={{
                      style: { borderRadius: '0.5rem' }
                    }}
                  />
                  <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    Submit
                  </Button>
                </form>
              </div>
            </div>
            
            {/* Map Section */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-lg shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">WE ARE HERE</h2>
                <p className="text-xl font-semibold text-indigo-600 mb-8">MON-FRI 8:30AM-5:00PM / PHONES ARE OPEN 24/7</p>
                
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    className="w-full h-[400px]"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.871892057373!2d77.44477937533559!3d28.63360137566421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cee3d4e3485ed%3A0xe0fe1689b57c7d2e!2sABESIT%20GROUP%20OF%20INSTITUTIONS!5e0!3m2!1sen!2sin!4v1744826379860!5m2!1sen!2sin"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-3">What are your support hours?</h3>
              <p className="text-gray-600">Our phone support is available 24/7 for urgent matters. Our office is open Monday through Friday from 8:30 AM to 5:00 PM IST.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-3">How quickly will I receive a response?</h3>
              <p className="text-gray-600">We aim to respond to all email inquiries within 24 hours during business days. For urgent matters, please call our support line.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Do you offer implementation assistance?</h3>
              <p className="text-gray-600">Yes, we provide comprehensive implementation support to ensure a smooth transition to our employee management system.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-3">How can I schedule a demo?</h3>
              <p className="text-gray-600">You can schedule a demo by filling out the contact form on this page, or by calling our sales team directly.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Indibus EMS</h3>
              <p className="text-gray-400">Leading the future of workforce management</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/documentation" className="text-gray-400 hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/api" className="text-gray-400 hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>contact@indibus.com</li>
                <li>+91 (800) 123-4567</li>
                <li>Mumbai, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 Indibus Employee Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ContactFooter